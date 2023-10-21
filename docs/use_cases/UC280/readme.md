# UC 280

## 1. Requisitos


**UC280** - Criar elevador em edifício.

> Q: "Qual é a informaçaõ que o elevador deve manter?"
>
> R: "
>    edificio (obrigatório)
>    número identificativo (obrigatório, único no edificio)
>    lista de pisos do edificio servidos pelo elevador (obrigatório)
>    marca (opcional, alfanumerico, 50 caracteres)
>    modelo (opcional, mas obrigatório se marca for introduzido, alfanumerico, 50 caracteres)
>    número de série do fabricante (opcional, alfanumerico, 50 caracteres)
>    breve descrição (opcional, alfanumerico, 250 caracteres)
>"

## 2. Análise

### 2.1 Identificar o problema

Editar um elevador é um requisito relevante do domínio que é feito, simplesmente, através de um PUT.

### 2.2 Excerto do MD

![excerpt diagram](ed280.svg "ed280.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Editar elevador.*

**Test 2:** *Designação não pode ser nula.*

**Test 3:** *Designação não pode ser vazia.*

**Teste 4:** *Código não pode existir.*

### Adicionar os restantes testes



## 3. Desenho

Para resolver o problema da edição de elevadores foi criado um agregado com a entidade "Elevador" e os respetivos value objects. Requisitos como este e o UC270, levaram a equipa a decidir que um agregado seria a melhor solução para garantir manutenabilidade e capacidade de atualização.

### 3.1. Realização

#### 3.3.1 Diagrama de vista de processos

![vp](vp280.svg "vp280.svg")

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
