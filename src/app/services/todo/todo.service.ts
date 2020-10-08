import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rx';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos: BehaviorSubject<Array<ToDoItem>>

  constructor() { }

  public getTodo(): Observable<ToDoItem> {
    
    const data = this._todos.next([
      {
        'id': 1,
        'title': 'Conhecer o Ionic',
        'completed': true,
      },
      {
        'id': 2,
        'title': 'Conhecer o Angular',
        'completed': false,
      },
      {
        'id': 3,
        'title': 'Concluir as atividades',
        'completed': false,
      },
    ])
    console.log(this._todos);

    return data;
    
    
  }
}
