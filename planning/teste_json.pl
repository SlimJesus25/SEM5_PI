% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
%:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

% Tipos de JSON que vão ser utilizados.
:- json_object piso(edificio:string, [pisos: string]).
:- json_object edificio(edificio:string).
:- json_object corredor(edificioA: string, edificioB: string, pisoA: string, pisoB: string).
:- json_object elevador(elevador: string, [piso: string]).

% Rela��o entre pedidos HTTP e predicados que os processam
:- http_handler('/processa_json', p_json, []).

% Cria��o de servidor HTTP em 'Port' que trata pedidos em JSON
server(Port) :-
        http_server(http_dispatch, [port(Port)]).


p_json(Request) :-
        http_read_json(Request, JSON, [json_object(dict)]),
%       R = json([name=joao,number=3000]),
        R = student("joao",JSON.set_user),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).


% Cliente consumidor de json

client(Number):-
        Term = json([set_user = Number]),
        http_post('http://localhost:5000/processa_json', json(Term), Reply, [json_object(dict)]),
        write('Client: '),write(Reply.name),nl,
        write('Client: '),write(Reply.number),nl.

