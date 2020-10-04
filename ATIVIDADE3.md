# Atividade 3: Componente TodoItem

## Objetivo

Encapsular as funcionalidades de um TodoItem em um componente.

## User Histories

Esta atividade é um _refactor_ do código para encapsular as funcionalidades do TodoItem em um [component](https://angular.io/guide/architecture-components#introduction-to-components-and-templates) do Angular e sua validação deve ser realizada conforme as user histories implementadas até o momento.

## Instruções

Para iniciar crie um novo component através do terminal: `ionic g component components/todo-item". Um novo componente TodoItemComponent será criado no diretório "src/app/components/todo-item".

Antes de utilizar o componente é necessário adiciona-lo a uma [module](https://angular.io/guide/architecture-modules). Consulte a documentação do Angular e adicione o componente a module Home.

No arquivo [home.page.html](src/app/pages/home/home.page.html), substitua o código referente a renderização da tarefa pelo novo componente e re-implemente no arquivo [todo-item.component.html](src/app/components/todo-item/todo-item.component.html)

Utilize [_Two Way Binding_](https://angular.io/guide/binding-syntax) para passagem da tarefa da home para o TodoItemComponent.

Exporte os eventos "changed" (quando o estado da tarefa muda) e "deleted" (quando há um click no botão de remover) no componente TodoItemComponent e utilize [Event Bind](https://angular.io/guide/event-binding) na HomePage para executar as funções addTodoItem e removeTodoItem, respectivamente.
