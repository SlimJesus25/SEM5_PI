# Módulo Planeamento

## Objetivo

Calcular caminhos de um piso origem para um piso destino.

## Problema

Este módulo deve integrar-se e ser capaz de comunicar com o MDL. Deve também ser capaz de filtrar a informação apropriadamente para esta tecnologia e calcular o melhor caminho e se necessário, com critérios (menor número de elevadores possível, por exemplo).

## Design

### Integração

Para integrar o Planeamento com o Backend, vai ser estabelecido um servidor que vai corre-lo. Este módulo vai estar à escuta, no porto 5000, de pedidos do backend. Após receber pedidos, vai fazer pedidos ao Backend de dados relativos a edifícios, passagens, pisos e mapa de piso. Após receber as respostas, vai criar factos na memória principal (asserts) para depois aplicar o algoritmo solicitado.

### Algoritmo

Para o algoritmo gerar o melhor caminho para o robo seguir, deve ter capacidade de faze-lo de forma rápida. Inicialmente, vamos aplicar o algoritmo primeiro em profundidade que vai pesquisar todos os caminhos possíveis da origem até ao destino e, por defeito, o caminho solucionado como melhor, será o que tiver menos passos. Em caso de critério, aplicaremos o mesmo algoritmo, porém a seguir os pedidos do critério requisitado.

### Localização do servidor

