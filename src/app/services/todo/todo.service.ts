import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { TodoItem } from "src/app/models/interfaces/todo-item.interface";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  public todos: TodoItem[] = [];
  public todos$: Subject<TodoItem[]> = new BehaviorSubject(this.todos);

  getTodo(): Observable<TodoItem[]> {
    return this.todos$.asObservable();
  }

  addTodo(name: string): void {
    if (name.trim().length == 0)
      throw new Error("O nome da tarefa não pode ser vazio.");

    if (name.trim().length > 64)
      throw new Error(
        "O nome da tarefa não pode possuir mais que 64 caracteres."
      );

    this.todos.push({
      name,
      done: false,
    });

    this.todos$.next(this.todos);
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.todos$.next(this.todos);
  }
}
