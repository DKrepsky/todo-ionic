import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodo(): Observable<ToDoItemList> {

  }
}
