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
:-dynamic m/4. % m(col, lin, valor, piso) => m(0, 0, 0, A1)...
:-dynamic ligacel/3. % ligacel(cel1, cel2, piso) => ligacel(cel(1,3), cel(2,3), A1)...
:-dynamic cel/2. % cel(x, y) => cel(0, 3)...
:-dynamic liga/2. % liga(EdificioA, EdificioB)...
:-dynamic node/5. % node(Id, Col, Lin, Valor, Piso)...
:-dynamic edge/4. % edge(Id1, Id2, Custo, Piso)...

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
  request_mapa_pisos(),
  melhor_caminho_pisos(PisoOr, PisoDest, Cam, PisosPer),
  aStar_piso(PisosPer),

  reply_json('{}', [json_object(dict)]).

% Vai aplicar o A-Star a cada um dos pisos da solução de melhor_caminho_pisos ou caminho_pisos.
% 1º - Lista de pisos da solução.
% 2º - Lista de listas contendo as soluções do A-Star para cada piso.
aStar_piso([], _):-!.

aStar_piso([PisoAct|ProxPisos], [CamPiso|Restante]):-
  aStar(Orig, Dest, CamPiso, Custo, PisoAct),
  aStar_piso(ProxPisos, Restante).

% Vai fazer o GET e fazer os asserts para criar os factos.
% São aproveitados o edifício a que pertence o piso e a sua designação: pisos(B, [B1, B2, B3]). pisos(C, [C1, C2]).
request_pisos():-
  destroi_pisos(),
  http_open('http://localhost:3000/api/piso/listPisosGeral', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_pisos(ResObj, ResVal),
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
  assertz(liga(EdificioA, EdificioB)),
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
request_mapa_pisos():-
  destroi_mapa_pisos(),
  http_open('http://localhost:3000/api/mapaPiso/listMapasPiso', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_mapa_pisos(ResObj, ResVal),
  cria_mapa_pisos(ResVal, 0),
  write('Mapa'),
  findall(node(A, B, C, D, E), node(A, B, C, D, E), Z),nl,nl,
  write(Z),nl,nl,
  write('Ligações'),nl,
  findall(edge(E, F, G, H), edge(E, F, G, H), Y),
  write(Y).

destroi_mapa_pisos():-
  %findall(m(X, Y, V, P), m(X, Y, V, P), Mapa),
  %findall(ligacel(A, B, C), ligacel(A, B, C), Ligacoes),
  findall(node(K, L, M, N, O), node(K, L, M, N, O), Nodes),
  findall(edge(A1, B1, C1, D1), edge(A1, B1, C1, D1), Edges),
  %destroi(Ligacoes),
  destroi(Nodes),
  destroi(Edges).
  %destroi(Mapa).

extrai_mapa_pisos([], []).
extrai_mapa_pisos([H|T], [[H.piso, [H.largura, H.profundidade], H.mapa, H.saidas, H.elevador, H.saidaLocalizacao]|T2]):-
  extrai_mapa_pisos(T, T2).


cria_mapa_pisos([], _):-!.

cria_mapa_pisos([[Piso, [Largura, Profundidade], Mapa, Saidas, Elevador, SaidaLocalizacao]|T], Id):-
  cria_mapa(Mapa, Piso, 1, 1, 1),
  L1 is Largura+1,
  P1 is Profundidade+1,
  cria_grafo(L1, P1, Piso),
  cria_mapa_pisos(T, 1).

cria_mapa([], _, _, _, _):-!.

cria_mapa([Array|Restantes], Piso, Col, Lin, Id):-
  cria_linha(Array, Piso, Col, Lin, Id, LId),
  Col2 is 1,
  Lin2 is Lin+1,
  cria_mapa(Restantes, Piso, Col2, Lin2, LId).


cria_linha([], _, _, _, Id, Id):-!.

cria_linha([Valor|Restantes], Piso, Col, Lin, Id, LId):-
  %assertz(m(Col, Lin, Valor, Piso)),
  assertz(node(Id, Col, Lin, Valor, Piso)),
  Id2 is Id+1,
  Col2 is Col+1,
  cria_linha(Restantes, Piso, Col2, Lin, Id2, LId).

% Faz retract a todos os predicados que fez assert dinamicamente antes do novo request.
destroi([]).
destroi([H|T]):-
  retract(H),
  destroi(T).

% Algoritmo que vai retornar os caminhos do piso origem para o piso destino. Em LEdCam vai armazenar os edifícios e o LLig vai retornar pormenorizado.
caminho_pisos(PisoOr,PisoDest,LEdCam,LLig,LPiCam):-
  pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
  pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
  caminho_edificios(EdOr,EdDest,LEdCam),
  segue_pisos(PisoOr,PisoDest,LEdCam,LLig,LPiCam2),
  append([PisoOr],LPiCam2,LPiCam).
  %nl,
  %write(LPiCam2),nl,nl.

segue_pisos(PisoDest,PisoDest,_,[],[]).

segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)],[PisoDest|ListaPisos]):-
  PisoDest\==PisoDest1,
  elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig],[PisoSeg|ListaPisos]):-
  (corredor(EdAct,EdSeg,PisoAct,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
  segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig,ListaPisos).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig],[PisoAct1,PisoSeg|ListaPisos]):-
  (corredor(EdAct,EdSeg,PisoAct1,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct1)),
  PisoAct1\==PisoAct,
  elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
  segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig,ListaPisos).

caminho_edificios(EdOr,EdDest,LEdCam):-
  caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).

caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-
  !,reverse(LEdInv,LEdCam).

caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-
  (liga(EdAct,EdInt);liga(EdInt,EdAct)),
  \+member(EdInt,LEdPassou),
  caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).

% Algoritmo que vai retornar os caminhos com o critério de preferência sem elevadores.
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor,LPiCam):-
findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig,LPiCam),LLLig),
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


%%%%% Criação de grafo (mapa do piso) %%%%%
% m(col, lin, valor, piso) => m(0, 0, 0, A1)...
% node(Id, Col, Lin, Valor, Piso)...
% edge(Id1, Id2, Custo, Piso)...
cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,Piso):-
  cria_grafo_lin(Col,Lin,Piso),
  Lin1 is Lin-1,
  cria_grafo(Col,Lin1,Piso).


cria_grafo_lin(0,_,_):-!.

cria_grafo_lin(Col,Lin,Piso):-
  node(Id1,Col,Lin,0,Piso),
  !,
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  ((node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id2, 1, Piso));true)), % Verifca à direita.
  ((node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id3, 1, Piso));true)), % Verifca à esquerda.
  ((node(Id4,Col,LinS,0,Piso), assertz(edge(Id1, Id4, 1, Piso));true)), % Verifica abaixo.
  ((node(Id5,Col,LinA,0,Piso), assertz(edge(Id1, Id5, 1, Piso));true)), % Verifica acima.
  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin,Piso).

cria_grafo_lin(Col,Lin,Piso):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).


% A-star.
aStar(Orig,Dest,Cam,Custo,Piso):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo,Piso).

% Se for preciso apenas o melhor caminho, colocar cut a seguir ao reverse.
aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,Piso):-
	reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Piso):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,edge(Act,X,CustoX,Piso),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX,Piso),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo,Piso).

% substituir a chamada edge(Act,X,CustoX)
% por (edge(Act,X,CustoX);edge(X,Act,CustoX))
% se quiser ligacoes bidirecionais


estimativa(Nodo1,Nodo2,Estimativa,Piso):-
	node(Nodo1,X1,Y1,_,Piso),
	node(Nodo2,X2,Y2,_,Piso),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

