import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  
  idForTodo: number;
  public aux: ToDoItem[] = [];
  private _todos: BehaviorSubject<Array<ToDoItem>> = new BehaviorSubject(this.aux);

  constructor() { }

  public getTodo(): Observable<Array<ToDoItem>> {   
    return this._todos.asObservable();
        
  }

  addTodo(todoTitle: string, idForTodo: number): void {
      
    if(todoTitle.trim().length === 0){
      console.log("Seu ToDo deve conter um nome!");
    } else if(todoTitle.trim().length > 64){
      console.log("O Nome do seu ToDo está muito grande!");
    } else {
      this.aux.push(
        {
          id: idForTodo,
          title: todoTitle,
          completed: false,
        }  
    )
    }
    todoTitle = '';
    this._todos.next(this.aux);
  }

  removeTodo(index: number) {
    this.aux.splice(index, 1);
    this._todos.next(this.aux);
  }

}
