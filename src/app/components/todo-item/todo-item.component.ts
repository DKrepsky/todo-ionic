import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
import {TodoService} from '../../services/todo/todo.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  public _todos: Observable<ToDoItemList> = this.TodoService.getTodo();

  todosTest: ToDoItemList;

  @Input() todos: Array<any>;
  @Input() todoTitle: string;
  @Input() idForTodo: 4;
  @Input() error: string;
  @Input() error2: string;
  @Input() success: string;

  @Input() ErrorToast: (error) => void;
  @Input() SuccessToast: (success) => void;


  constructor(public toastController: ToastController, private TodoService: TodoService,) { 
    
  }

  ngOnInit() {}

 
  add() {
      
    try{
      this.TodoService.addTodo(this.todoTitle, this.idForTodo);
    } catch (err){
      console.log('deu ruim');
    }
  }

  remove(index: number) {
    this.TodoService.removeTodo(index);
    //this.notify("Tarefa removida com sucesso.");
  }
  

}
