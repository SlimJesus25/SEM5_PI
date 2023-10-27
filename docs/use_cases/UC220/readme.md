# UC 220

## 1. Requisitos

**UC220** - Listar pisos de edifício com passagem para outros edifícios.

## 2. Análise

### 2.1 Identificar o problema

Listar pisos de um edifício que tenha passagem para outros edifícios é obtido através do GET, e deve listar todos os pisos que tenham as respetivas passagens para outros edificios.

### 2.2 Excerto do MD

![excerpt diagram](ed270.svg "ed270.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Listar passagem.*

**Test 2:** *Edifico A tem que existir.*

### 2.4 Testes de Integração

**Test 1:** 

## 3. Desenho

Para solucionar este problema, existe um agregado designado por Passagem que tem como atributos um edificio A, outro edificio B, um piso do edificio A e outro piso do edificio B. Desta forma, é possível listar todas as passagens do edificio A para outros edificios, e assim, listar os pisos correspondentes.

### 3.1. Realização

#### 3.3.1 Diagrama de vista de processos de nível 1

![vp](vp1.svg "vp1.svg")

#### 3.3.1 Diagrama de vista de processos de nível 2

![vp](vp2.svg "vp2.svg")

#### 3.3.1 Diagrama de vista de processos de nível 3

![vp](vp3.svg "vp3.svg")

#### 3.3.4 Vista lógica nível (3 ou 4 (verificar))


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
