# UC 290

## 1. Requisitos

**UC290** - Listar elevadores em edifício.

## 2. Análise

### 2.1 Identificar o problema

Listar elevadores de um edíficio deve apresentar o(s) elevador(es).

### 2.2 Excerto do MD

![excerpt diagram](ed290.svg "ed290.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Listar elevador.*

### Adicionar os restantes testes


## 3. Desenho

Para resolver o problema de listagem de elevadores foi criado um agregado com a entidade "Edificio" que tem uma ligação singular para o agregado "Elevador". Este requisito levou a equipa a decidir que agregados separados seria a melhor solução para garantir manutenabilidade.

### Respostas do cliente

>
>
>

### 3.1. Realização

#### 3.3.1 Diagrama de vista de processos

![vp](vp290.svg "vp290.svg")

#### 3.3.2 Vista lógica nível (3 ou 4 (verificar))


### 3.2. Padrões aplicados

Os padrões aplicados são:

- DTO;
- Persistence;
- Controller;
- Service;
- Interfaces;
- Schema;
- Mapper;
- Repository;
- Modelo.
