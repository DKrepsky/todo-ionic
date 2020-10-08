import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public aux: ToDoItem[] = [];
  private _todos: BehaviorSubject<Array<ToDoItem>> = new BehaviorSubject(this.aux);

  constructor() { }

  public getTodo(): Observable<Array<ToDoItem>> {   
    return this._todos.asObservable();
        
  }
}
