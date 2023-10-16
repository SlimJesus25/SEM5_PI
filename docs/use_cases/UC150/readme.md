# UC 150

## 1. Requisitos

**UC150** - Criar edifício

## 2. Análise

### 2.1 Identificar o problema

Criar um edifício é uma entidade relevante do domínio que é criada, simplesmente, através de um método POST.

### 2.2 Excerto do MD
![excerpt diagram](domain_excerpt_150.svg "domain_excerpt_150.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Ensure Username can't be null*

**Test 2:** *Ensure Password can't be null*

**Test 3:** *Ensure FirstName can't be null*

**Test 4:** *Ensure LastName can't be null*

**Test 5:** *Ensure Email can't be null*

**Test 6:** *Ensure User can't be null*

**Test 7:** *Ensure list of users can't be null*

### Adicionar os restantes testes



## 3. Desenho


To solve this problem it is necessary to ask for the parameters for the user (in case we're adding a user), make sure 
they persist in the database to make sure we can solve the US1001_2 and US1001_3.

### 3.1. Realização

#### 3.3.1 Diagrama de Sequência

![sequence diagram](sequence_diagram_150.svg "sequence_diagram_150.svg")

#### 3.3.2 Vista lógica nível (3 ou 4 (verificar))


### 3.2. Padrões aplicados
Os padrões aplicados são:
- DTO;
- Persistência;
- Aplicação;
- Controlador;
- Serviço;
- Modelo.