# Atividade 2: Adição, remoção e atualização de tarefas

## Objetivo

Implementar as funcionalidades básicas de uma aplicação ToDo utilizando a renderização dinâmica do Angular e typescript.

## User Histories

### Lista de tarefas

Na página Home, o usuário encontra uma lista de tarefas gerada de forma dinâmica a partir de um array de tarefas, inicialmente vazio.

### Lista de tarefas vazia

Na página Home, caso a lista de tarefas esteja vazia, o usuário encontra a seguinte mensagem: "Você não possui nenhuma tarefa"

### Adição de tarefas

Na lista de tarefas da página Home, quando o usuário clicar no botão "+", uma nova tarefa deve ser adicionada a lista de tarefas com o nome sendo o valor do input "Adicionar tarefa". A tarefa deverá ser adicionada no estado "incompleta".

Após adicionar a tarefa, o valor do input deverá ser restaurado para "" (string vazia).

#### Regras:

1. O nome da tarefa não pode ser vazio.
2. O nome da tarefa não pode possuir mais que 64 caracteres.

Caso alguma regra seja violada, o usuário é notificado sobre qual regra foi violada.

### Remoção de tarefas

Na lista de tarefas da página Home, o usuário ao clicar em um botão com ícone de lixeira ao lado direito do nome da tarefa, faz com que a tarefa seja removida da lista de tarefas.

Após remover a tarefa, o usuário é informado que a tarefa foi removida com sucesso.

## Instruções

Toda a implementação lógica deverá ser implementada em TypeScript. Para isso, crie um arquivo "todo-item.interface.ts" no diretório "src/app/models/interfaces/", com o seguinte conteúdo:

```typescript
export interface ToDoItem {
  // definir a interface ToDoItem com base nas user histories.
}
```

Nota: Utilize a documentação do [TypeScript](https://www.typescriptlang.org/docs) para entender a sintaxe para [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).

No arquivo [home.page.ts](src/app/pages/home/home.page.ts), utilize as definições acima para construir a lista de tarefas e implemente as funções **addTodo** e **removeTodo**. Lembre-se de validar os dados na função addTask conforme as regras definidas na user history "Adição de tarefas".

No arquivo [home.page.html](src/app/pages/home/home.page.html), utilize a diretiva [ngIf](https://angular.io/guide/built-in-directives#ngif) para mostrar a mensagem quando a lista estiver vazia e [ngFor](https://angular.io/guide/built-in-directives#ngfor) para gerar a lista de tarefas.

Nas tarefas, utilize [interpolação](https://angular.io/guide/interpolation) para renderizar o nome da tarefa e [_Two Way Binding_](https://angular.io/guide/binding-syntax) para o estado da checkbox.

Nos botões para adicionar e remover tarefa, utilize [Event Binding](https://angular.io/guide/event-binding) no evento "click" mapeando para as funções addTodo e removeTodo, respectivamente. No input, utilize o evento "keyup.enter" mapeando para a função addTodo.

Utilizar o componente [ion-toast](https://ionicframework.com/docs/api/toast) para notificar o usuário de violações nas regras da history "Adição de tarefas" e para notificar que a tarefa foi removido com sucesso na history "Remoção de tarefas".

Utilizar o arquivo [home.page.scss](src/app/pages/home/home.page.scss) para ajustar o layout da página se necessário.
