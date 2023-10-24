# US 180

## 1. Requisitos

**US180** -  Listar edifícios com min e max de pisos

**Critérios de aceitação** - This US has no specific acceptance criteria

## 2. Análise

### 2.1 Indentificar o problema
In order to implement this functionality, we divided the documentation in 3 parts:

**Respostas do cliente:**

Pergunta: pode, por favor, explicar o que se pretende com esta US ? 

Resposta: permitir pesquisar que edificios tem no minimo X pisos e no máximo Y pisos

### 2.2 Excerto do MD
![excerpt diagram](domain_excerpt_1001.svg "domain_excerpt_3004.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Ensure Username can't be null*

**Test 2:** *Ensure Password can't be null*

**Test 3:** *Ensure FirstName can't be null*

**Test 4:** *Ensure LastName can't be null*

**Test 5:** *Ensure Email can't be null*

**Test 6:** *Ensure User can't be null*

**Test 7:** *Ensure list of users can't be null*



## 3. Design

To solve this problem it is necessary to ask for the parameters for the user (in case we're adding a user), make sure 
they persist in the database to make sure we can solve the US1001_2 and US1001_3.

### 3.1. Realização

### US1001_1 Add User
* **Sequence Diagram**

![sequence diagram](us1001_1/sequence_diagram_addUser.svg "sequence_diagram_1001_1")

* **Class Diagram**

![class diagram](us1001_1/class_diagram_addUser.svg "class_diagram_1001_1")

### US1001_2 Deactivate  User

* **Sequence Diagram**
 
![sequence diagram](us1001_2/sequence_diagram_deactivateUser.svg "sequence_diagram_1001_2")

* **Class Diagram**

![class diagram](us1001_2/class_diagram_deactivateUser.svg "class_diagram_1001_2")

#### US1001_3 List User

* **Sequence Diagram**

![sequence diagram](us1001_3/sequence_diagram_listUser.svg "sequence_diagram_1001_3")

* **Class Diagram**

![class diagram](us1001_3/class_diagram_listUser.svg "class_diagram_1001_3")

### 3.2. Padrões aplicados
The applied patters are:
* DTO;
* Persistence;
* Application;
* Controller;
* Service;
* Domain;
* UI;