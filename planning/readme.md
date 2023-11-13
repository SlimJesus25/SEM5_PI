# Módulo Planeamento

## Objetivo

Calcular caminhos de um piso origem para um piso destino.

## Problema

Este módulo deve integrar-se e ser capaz de comunicar com o MDGD. Deve também ser capaz de filtrar a informação apropriadamente para esta tecnologia e calcular o melhor caminho com critérios (menor número de elevadores possível, por exemplo).

## Design

### Integração

Para integrar o Planeamento com o Backend, vai ser estabelecido um servidor que vai corrê-lo. Este módulo vai estar à escuta, no porto 5000, de pedidos do backend. Após receber pedidos, vai fazer pedidos ao Backend de dados relativos a edifícios, passagens, pisos e mapa de piso. Após receber as respostas, vai criar factos na memória principal (asserts) para depois aplicar o algoritmo solicitado (menor elevadores, menos edifícios, etc...).

### Algoritmo

Para o algoritmo gerar o melhor caminho para o robo seguir, deve ter capacidade de faze-lo de forma rápida. Inicialmente, vamos aplicar o algoritmo primeiro em profundidade que vai pesquisar todos os caminhos possíveis da origem até ao destino e, por defeito, o caminho solucionado como melhor, será o que tiver menos passos.

Inicialmente vai correr o algoritmo que indica o(s) elevador(es) e corredor(es) a percorrer aplicando o critério desejado. Após este algoritmo, vai ser calculado em cada piso da solução o algoritmo que demonstra o caminho da grelha (caminho entre a passagem B3_A2 (10, 6) até ao elevador 155 (5, 4), por exemplo).

### Localização do servidor

