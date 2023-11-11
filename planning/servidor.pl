% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_json)).

:-dynamic edificio/1. % edificio(A), edificio(B)...
:-dynamic pisos/2. % pisos(A, [A1, A2, A3])...
:-dynamic corredor/4. % corredor(A, B, A1, B2)...
:-dynamic elevador/2. % elevador(A, [A1, A2, A3])...

:-json_object edificio(id:string, codigoEdificio: string, nomeOpcionalEdificio: string, descricaoEdificio: string, dimensaoMaximaPiso: list(integer)).

% Rela��o entre pedidos HTTP e predicados que os processam
:- http_handler('/path_between_floors', path_between_floors, []).

% Cria��o de servidor HTTP no porto 'Port'					
server(Port) :-						
  http_server(http_dispatch, [port(Port)]).
		

path_between_floors(Request):-
  json_read_dict(Request, ResObj),
  catch(request_edificios(),
        error(Err, _context),
        format('0 edifícios encontrados! ~w\n', [Err])),
  request_elevadores(), 
  request_pisos(),
  catch(request_passagens(),
        error(Err, _context),
        format('0 passagens encontradas! ~w\n', [Err])),
  % Ver os UC para chamar os diversos algoritmos.
  % prolog_to_json(A, B)
  reply_json('{}', [json_object(dict)]).

% Vai fazer o GET e fazer os asserts para criar os factos.
% São aproveitados o edifício a que pertence o piso e a sua designação: pisos(B, [B1, B2, B3]). pisos(C, [C1, C2]).
request_pisos():-
  destroi_pisos(),
  http_open('http://localhost:3000/api/piso/listPisosGeral', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_pisos(ResObj, ResVal),
  write('Aqui'),
  write(ResVal),
  cria_pisos(ResVal).

% Dada uma lista de JSONs, vai iterar e colocar na lista Codigos os codigos dos edifícios.
extrai_pisos([], []):-!.
extrai_pisos([H|T], [[H.edificio, H.pisos]|T2]):-
  extrai_pisos(T, T2).

% O piso vai ficar organizada da seguinte forma: [[A, [A1, A2, A3]], [B, [B1, B2]]]

% Caso base: Edifício não identificado.
arranja_piso(Designacao, Edificio, [Edificio, [Designacao]|[]]).

% Caso base: Edifício identificado.
arranja_piso(Designacao, Edificio, [[Edificio|T1]|T2]):-
  append(T1, Designacao, X).

arranja_piso(Designacao, Edificio, [_|LAtual]):-
  arranja_piso(Designacao, Edificio, Latual).

cria_pisos([]).

cria_pisos([[Edificio, Pisos|_]|T]):-
  assertz(pisos(Edificio, Pisos)),
  cria_pisos(T).

destroi_pisos():-
  findall(pisos(X, Y), pisos(X, Y), A),
  destroi(A).

request_passagens():-
  destroi_passagens(),
  http_open('http://localhost:3000/api/passagem/listPassagens', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_passagens(ResObj, ResVal),
  cria_passagens(ResVal),
  findall(corredor(A, B, C, D), corredor(A, B, C, D), X),
  write(X).

destroi_passagens():-
  findall(corredor(A, B, C, D), corredor(A, B, C, D), A),
  destroi(A).

extrai_passagens([], []).
extrai_passagens([H|T1], [[H.edificioA, H.edificioB, H.pisoA, H.pisoB]|T2]):-
  extrai_passagens(T1, T2).

cria_passagens([]).
cria_passagens([[EdificioA, EdificioB, PisoA, PisoB]|T]):-
  assertz(corredor(EdificioA, EdificioB, PisoA, PisoB)),
  cria_passagens(T).

% Vai fazer o GET e fazer os asserts para criar os factos.
% Vão ser aproveitadas as designações: edificio(A). edificio(B).
request_edificios():-
  destroi_edificios(),
  http_open('http://localhost:3000/api/edificio/listEdificios', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_edificio(ResObj, ResVal),
  cria_edificio(ResVal),
  findall(edificio(X), edificio(X), A),
  write(A).


% Dada uma lista de JSONs, vai iterar e colocar na lista Codigos os codigos dos edifícios.
extrai_edificio([], []).
extrai_edificio([H|T], [H.codigoEdificio|L]):-
  extrai_edificio(T, L).

cria_edificio([]).
cria_edificio([Code|T]):-
  assertz(edificio(Code)),
  cria_edificio(T).

destroi_edificios():-
  findall(edificio(X), edificio(X), Edificios),
  destroi(Edificios).


% Vai fazer o GET e fazer os asserts para criar os factos.
% Vão ser aproveitados o edifício a que pertence e os pisos servidos: elevador(B, [B1, B2]). elevador(C, [C1, C2]).
request_elevadores():-
  destroi_elevadores(),
  http_open('http://localhost:3000/api/elevador/listElevadores', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_elevadores(ResObj, ResVal),
  cria_elevadores(ResVal),
  findall(elevador(X, Y), elevador(X, Y), A),
  write(A).

extrai_elevadores([], []).
extrai_elevadores([H|T], [[H.edificio, H.pisosServidos]|T2]):-
  extrai_elevadores(T, T2).

cria_elevadores([]).
cria_elevadores([[Edificio, PisosServidos|_]|T]):-
  assertz(elevador(Edificio, PisosServidos)),
  cria_elevadores(T).

destroi_elevadores():-
  findall(elevador(X, Y), elevador(X, Y), Elevadores),
  destroi(Elevadores).

% Vai fazer o GET e fazer os asserts para criar os factos.
% Vão ser aproveitadas os mapas de cada piso: m(x,y,z), onde x é a coluna, y a linha e z o valor.
% Valores:
% - 0, é por onde o robo deve circular;
% - 1, paredes, não pode atravessa-las;
% - 2, elevadores;
% - 3, corredores;
% - 4, saídas;
%request_mapa_pisos():-
%  destroi_mapa_pisos(),
%  http_open('http://localhost:3000/api/mapaPiso/listMapaPisos', ResJSON, [cert_verify_hook(cert_accept_any)]),
%  json_read_dict(ResJSON, ResObj),
%  extrai_elevadores(ResObj, ResVal),
%  cria_elevadores(ResVal),
%  findall(elevador(X, Y), elevador(X, Y), A),
%  write(A).

% Faz retract a todos os predicados que fez assert dinamicamente antes do novo request.
destroi([]).
destroi([H|T]):-
  retract(H),
  destroi(T).

% Algoritmo que vai retornar os caminhos do piso origem para o piso destino. Em LEdCam vai armazenar os edifícios e o LLig vai retornar pormenorizado.
caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
caminho_edificios(EdOr,EdDest,LEdCam),
segue_pisos(PisoOr,PisoDest,LEdCam,LLig).
segue_pisos(PisoDest,PisoDest,_,[]).
segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
PisoDest\==PisoDest1,
elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
(corredor(EdAct,EdSeg,PisoAct,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
(corredor(EdAct,EdSeg,PisoAct1,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct1)),
PisoAct1\==PisoAct,
elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

% Algoritmo que vai retornar os caminhos com o critério de preferência sem elevadores.
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
menos_elevadores(LLLig,LLigMelhor,_,_).
menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
conta(LLig,NElev1,NCor1),
(((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
(NElevR is NElev,NCorR is NCor,LLigR=LLigM)).
conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.
