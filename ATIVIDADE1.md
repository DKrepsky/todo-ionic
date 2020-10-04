# Atividade 1: Layout da página home

## Objetivo

Implementar o layout da página Home de forma estática utilizando componentes do Ionic.

## User Histories

### Título da página

Alterar o título da página no toolbar para "ToDo App".

### Lista de tarefas

Na página Home o usuário encontra uma lista estática com os items:

- [x] Conhecer o Ionic
- [ ] Conhecer o Angular
- [ ] Concluir as atividades

sendo cada item composto por um label com o nome da tarefa e um checkbox que indica a situação da tarefa (completa ou incompleta).

O "x" em "Conhecer o Ionic" denota que esta tarefa deve estar inicialmente como **completa**.

Ao clicar no checkbox ou no nome da tarefa, o estado da tarefa é comutado.

### Campo para adicionar tarefas

Na página Home o usuário encontra um input com o placeholder "Adicionar tarefa" e um botão ao lado direito com o ícone "+".

Ao clicar no botão "+" nada acontece.

## Instruções

No arquivo [home.page.html](src/app/pages/home/home.page.html), utilizar os componentes [ion-checkbox](https://ionicframework.com/docs/api/checkbox), [ion-button](https://ionicframework.com/docs/api/button), [ion-icon](https://ionicons.com/), [ion-list](https://ionicframework.com/docs/api/list) e [ion-input](https://ionicframework.com/docs/api/input) para implementar as user histories.

Utilizar o arquivo [home.page.scss](src/app/pages/home/home.page.scss) para ajustar o layout da página e dos componentes conforme necessário e remover os estilos que não estão sendo utilizados. Utilizar a linguagem [SCSS](https://sass-lang.com/guide).
