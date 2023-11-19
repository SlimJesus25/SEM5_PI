# UC 1140

## 1. Requisitos

**UC1140** - Como gestor de Campus pretendo listar Elevadores em Edifício

## 2. Análise

### 2.1 Identificação do problema

### 2.2 Testes ao requisito (Alterar consoante necessidade!)

**Teste 1:** *Criar elevador com sucesso (controlador, 201 OK)*

**Teste 2:** *Criar elevador com insucesso (controlador, 404 NOT FOUND)*

**Teste 3:** *Criar elevador com sucesso (controlador + serviço, 201 OK)*

**Teste 4:** *Criar elevador com insucesso (controlador + serviço, 404 NOT FOUND)*

**Teste 5:** *Criar elevador com insucesso, novo edificio não existe (controlador + serviço, 404 NOT FOUND)*

**Teste 6:** *Criar elevador com insucesso, novos pisos servidos não existem/não pertecem ao edifício (controlador + serviço, 404 NOT FOUND)*

## 3. Desenho

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.1.2 Nível 2

![vista processo 2](vp2.svg "Vista processo - nível 2")

##### 3.1.1.3 Nível 3

![vista processo 3](vp3.svg "Vista processo - nível 3")

#### 3.1.2 Vista lógica

##### 3.1.2.1 Nível 1

![vista logica 1](/docs/logical_view/sprint2/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.2.2 Nível 2

![vista logica 2](/docs/logical_view/sprint2/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.2.3 Nível 3

![vista logica 3](/docs/logical_view/sprint2/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenario 1](/docs/scenario_view/level1/sv1.svg "Vista cenário - nível 1")

#### 3.1.4 Vista de implementação

##### 3.1.4.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

##### 3.1.5.1 Nível 3

![vista implementacao 3](/docs/implementation_view/sprint2/iv3.svg "Vista implementação - nível 3")

#### 3.1.6 Vista física

##### 3.1.6.1 Nível 2

![vista física 2](/docs/physical_view/level2/sprint2/vf2.svg "Vista física - nível 2")

### 3.2. Padrões aplicados

Os padrões aplicados são:

- ONION (padrões arquiteturais);
- DTO;
- Service;
- Interfaces;
- Modelo.