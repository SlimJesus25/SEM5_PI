# UC 280

## 1. Requisitos

**UC280** - Editar elevador em edifício.

> Questão: Qual é a informação que o elevador deve manter?
>
> Resposta: edificio (obrigatório)
> número identificativo (obrigatório, único no edificio)
> lista de pisos do edificio servidos pelo elevador (obrigatório)
> marca (opcional, alfanumerico, 50 caracteres)
> modelo (opcional, mas obrigatório se marca for introduzido, alfanumerico, 50 caracteres)
> número de série do fabricante (opcional, alfanumerico, 50 caracteres)
> breve descrição (opcional, alfanumerico, 250 caracteres)

## 2. Análise

### 2.1 Identificar o problema

Editar um elevador é um requisito relevante do domínio que deve ser capaz de atualizar informação de um elevador já existente.

### 2.3 Testes ao requisito

**Teste 1:** *Editar elevador com sucesso (controlador, 201 PUT/PATCH)*

**Teste 2:** *Editar elevador com insucesso (controlador, 404 NOT FOUND)*

**Teste 3:** *Editar elevador com sucesso (controlador + serviço, 201 PUT/PATCH)*

**Teste 4:** *Editar elevador com insucesso (controlador + serviço, 404 NOT FOUND)*

## 3. Desenho

Para resolver o problema da edição de elevadores foi criado um agregado com a entidade "Elevador" e os respetivos value objects. Requisitos como este e o UC270, levaram a equipa a decidir que um agregado seria a melhor solução para garantir manutenabilidade e expansibilidade.

### 3.1. Realização

#### 3.3.1 Excerto de domínio

![excerto dominio](ed280.svg "ed_290.svg")

#### 3.3.1 Vista de processo - nível 3

![vista processo 3](vp280.svg "vp_280.svg")

#### 3.3.2 Vista lógica - nível 3

![vista logica 3](/docs/logical_view/level3/vl3.svg "Vista lógica - nível 3")

### 3.2. Padrões aplicados

Os padrões aplicados são:

- REST + ONION (padrões arquiteturais);
- DTO;
- Persistence;
- Controller;
- Service;
- Interfaces;
- Schema;
- Mapper;
- Repository;
- Modelo.
