# Atividade 4: Utilizando service como provider para as tarefas

## Objetivo

O objetivo desta atividade é mover toda a lógica da aplicação para dentro de um [Service](https://angular.io/guide/architecture-services).

## Keywords

- Angular Service;
- Observables;
- RxJs;
- Dependency injection;
- Async pipe Angular;

## User Histories

## Instruções

Crie um novo serviço através do comando `ionic g service services/todo/todo`. O serviço TodoService severá possuir três funções com o seguinte protótipo:

```typescript
/**
 * Retorna um Observable que emite uma lista de todos cada vez que uma
 * tarefa é adicionada ou removida da lista de todos.
 */
getTodo(): Observable<TodoItem[]> {

}

/**
 * Adiciona uma nova tarefa a lista de todos.
 *
 * @note: @p name deve seguir as regras definidas nas user histories.
 *
 * @throw "O nome da tarefa não pode ser vazio."
 * @throw "O nome da tarefa não pode possuir mais que 64 caracteres."
 */
addTodo(name: string): void {

}

/**
 * Remove uma tarefa da lista de tarefas.
 *
 * @note o parâmetro @p index poderá ser ajustado para o tipo de identifica
 * ção implementado nas atividades anteriores.
 */
removeTodo(index: number): void {

}
```

O serviço deverá manter uma lista de tarefas em uma variável e a cada update (inserção/remoção) deverá emitir um evento através de um [Observable]https://angular.io/guide/observables) com a lista atualizada. O objeto Observable retornado pela função getTodo() deverá ser implementado utilizando a classe [BehaviorSubject](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject).

A função addTodo deverá gerar exceções caso uma das regras definidas na user history seja violada. Tais exceções deverão ser tratadas com blocos try/catch nos pontos de consumo da função para notificar o usuário.

Ná página HomePage, alterar o código de modo a utilizar o serviço TodoService para obtenção e gerenciamento da lista de tarefas. Empregar o pipe [async](https://angular.io/api/common/AsyncPipe) no arquivo **home.page.html** para renderização da lista de tarefas.

## Extra

- deixar um comentário na classe TodoService descrevendo o que seria [Dependency Injection](https://angular.io/guide/dependency-injection) e qual sua utilidade.
