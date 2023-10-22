# UC 310

## 1. Requisitos

**UC310** - Criar sala de piso de edifício.

## 2. Análise

### 2.1 Identificar o problema

Criar uma sala é uma entidade relevante do domínio que é criada, simplesmente, através de um POST.

### 2.2 Excerto do MD

![excerpt diagram](ed310.svg "ed310.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Criar sala.*

**Test 2:** *Designação não pode ser vazia.*

**Test 3:** *Categoria não pode ser vazia.*

### Adicionar os restantes testes



## 3. Desenho

Para resolver o problema de sala de piso foi criado um agregado com a entidade "Sala" e três value objects "Designação", "CategoriaSala" e "DesignaçãoSala". Este requisito, levou a equipa a decidir que um agregado seria a melhor solução para garantir manutenabilidade.

### 3.1. Realização

#### 3.3.1 Diagrama de vista de processos

![vp](vp310.svg "vp310.svg")

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
