# UC 270

## 1. Requisitos

**UC270** - Criar elevador em edifício.

## 2. Análise

### 2.1 Identificar o problema

Criar um elevador é uma entidade relevante do domínio que é criada, simplesmente, através de um POST.

### 2.2 Excerto do MD

![excerpt diagram](ed270.svg "ed270.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Criar elevador.*

**Test 2:** *Designação não pode ser nula.*

**Test 3:** *Designação não pode ser vazia.*

### Adicionar os restantes testes



## 3. Desenho

Para resolver o problema de criação de elevadores foi criado um agregado com a entidade "Elevador" e os respetivos value objects. Requisitos como este e o UC280, levou a equipa a decidir que um agregado seria a melhor solução para garantir manutenabilidade e capacidade de atualização. Consideramos ainda tratar o conceito "Elevador" como uma "Passagem". Sendo abstrato, faz sentido, porém optamos pela nossa escolha devido a simplicidade e naturalidade da resolução dos problemas.

### 3.1. Realização

#### 3.3.1 Diagrama de vista de processos

![vp](vp270.svg "vp270.svg")

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
