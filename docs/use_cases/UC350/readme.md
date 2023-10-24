# US 350

## 1. Requisitos

**US350** -  Como gestor de frota pretendo adicionar um novo tipo de robot indicando a sua designação e que tipos de tarefas pode executar da lista prédefinida de tarefas

**Critérios de aceitação** - This US has no specific acceptance criteria

## 2. Análise

### 2.1 Indentificar o problema
In order to implement this functionality, we divided the documentation in 3 parts:

**Respostas do cliente:**

Pergunta: A minha dúvida é em relação às tarefas e às suas definições.
Existem diferentes tipos de tarefas, por isso, cada uma terá os seus atributos. No entanto, que atributos definem uma tarefa em geral? Apenas a sua designação?
Em relação às tarefas existentes (vigilância de um piso e transporte de um objeto) existem algum requerimento especial? Para além da especificação do piso na vigilância e especificação do objeto e local de recolha e entrega no caso do transporte.

Resposta: de momento todos os robots da frota apenas suportam estes dois tipos de tarefas. a existirem novos tipos de tarefas será necessáiro desenvolvimento especifico para tal. Em consequência não existem "tarefas em geral"
As tarefas de vigilância caracterizam-se por indicar qual o edificio e piso(s) que se pretende vigiar bem como o número de contacto em caso de incidente. tipicamente o segurança irá requisitar que um robot "dê uma volta pelos pisos X, Y e Z do edificio N". Caso o robot detete alguma situação anómala, o robot irá enviar um SMS para o contacto indicado (*)
As tarefas de "piclup & delivery" caracterizam-se por indicar qual a sala que se pretende de pickup e qual a sala de delivery, bem como um nome e um contacto para pickup e outro para delivery. deve também ser indicado um código de confirmação que a pessoa que receberá deverá introduzir no painel do robot. adicionalmente deve ser indicada uma descrição da entrega, ex., "Marcadores de cor vermelha (1x) e azul (2x)"
(*) fora do âmbito do protótipo

Pergunta: A US 350 (Como gestor de frota pretendo adicionar um novo tipo de robot indicando a sua designação e que tipos de tarefas pode executar da lista prédefinida de tarefas) - adicionar um tipo é indicar qual é a marca, o modelo e as tarefas que pode desempenhar um robot?

Resposta: no requisito 350 definimos tipos de robots e no requisito 360 definimos robots desses tipos.
se ajudar, fica aqui uma analogia.

definir tipos de viaturas:
tipo 1: renault clio 5 portas gasolina
tipo 2: renault megane 5 portas diesel
definir viaturas
viatura com matricula AA-00-01 do tipo 1
viatura com matricula BB-10-CC do tipo 2

Pergunta: Relativamente à US350 foi referido numa resposta anterior "o requisito 350 permite definir que tipos de robots existem. por exemplo "Tipo A: Robot marca X modelo Y com capacidade de executar tarefas de vigilância"
Pretende alguma regra de negócio para o limite de caracteres para o tipo, marca e modelo?

Resposta: tipo de robot: obrigatório, alfanum+ericos, maximo 25 caracteres
marca: obrigatório, maximo 50 caracteres
modelo: obrigatório, máximo 100 caracteres



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