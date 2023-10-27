# UC 150

## 1. Requisitos

**UC150** - Criar edifício.

> Questão: O nome do edifício tem limitações como, por exemplo, tem de ter uma letra e números? E para além do nome do edifício, que mais informação deve ser guardada sobre o edifício. Em relação à breve descrição, existe alguma regra em particular?
>
>
> Resposta: O código do edificio é obrigatório, no máximo 5 caracteres, letras e digitos, podendo conter espaços no meio, o nome do edificio é opcional, no máximo 50 caracteres alfanuméricos. É opcional, com o máximo de 255 caracteres

## 2. Análise

### 2.1 Identificar o problema

Criar um edifício é um conceito fundamental de criação de uma entidade importante para este negócio.

### 2.2 Excerto do MD

![excerpt diagram](domain_excerpt_150.svg "domain_excerpt_150.svg")

### 2.3 Testes ao requisito

**Test 1:** *Criar edifício com sucesso (controlador, 201 POST)*

**Test 2:** *Criar edifício com insucesso (controlador, 403 FORBIDDEN)*

**Test 3:** *Criar edifício com sucesso (controlador + serviço, 201 POST)*

**Test 4:** *Criar edifício com insucesso (controlador + serviço, 403 FORBIDDEN)*

**Test 5:** *Código de edifício segue regras de negócio.*

**Test 6:** *Nome opcional segue regras de negócio.*

**Test 7:** *Descrição seugue regras de negócio*

## 3. Desenho

Para solucionar este problema, foi pensado num agregado para esta entidade, Edifício. É um conceito existente por si só, deve garantir manutenabilidade e expansibilidade.

### 3.1. Realização

#### 3.3.1 Excerto de domínio

#### 3.3.1 Vista de processo - nível 3

![sequence diagram](sequence_diagram_150.svg "sequence_diagram_150.svg")

#### 3.3.2 Vista lógica - nível 3

![sequence diagram](/docs/logical_view/level3/vl3.svg "sequence_diagram_150.svg")

### 3.2. Padrões aplicados

Os padrões aplicados são:

- REST + ONION (padrões arquiteturais);
- DTO;
- Persistência;
- Aplicação;
- Controlador;
- Serviço;
- Modelo.
