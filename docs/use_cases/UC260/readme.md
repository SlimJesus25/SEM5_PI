# UC 260

## 1. Requisitos

**UC260** - Listar passagens entre 2 edifícios.

## 2. Análise

### 2.1 Identificar o problema

Listar passagens entre 2 edifícios deve apresentar todas as passagens que conectem um edificio A a um edificio B (todas as passagens são bidirecionais).

### 2.2 Excerto do MD

![excerpt diagram](ed260.svg "ed260.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Listar passagem.*

**Test 2:** *Edifico A tem que existir.*

**Test 3:** *Edifico B tem que existir.*

### Adicionar os restantes testes



## 3. Desenho

Para solucionar este problema, existe um agregado designado por Passagem que tem como atributos um edificio A, outro edificio B, um piso do edificio A e outro piso do edificio B. Desta forma, é possível listar todos as passagens entre dois edificios especificos.

Nota de detalhe técnico: Tabela de dupla entrada.

### 3.1. Realização

#### 3.3.1 Diagrama de vista de processos

![vp](vp260.svg "vp260.svg")

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
