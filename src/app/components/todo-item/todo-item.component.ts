import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
import {TodoService} from '../../services/todo/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  todosTest: ToDoItemList;

  @Input() todos: Array<any>;
  @Input() todoTitle: string;
  @Input() idForTodo: 4;
  @Input() error: string;
  @Input() error2: string;
  @Input() success: string;

  @Input() adicionar: () => void;
  @Input() remover: (id: number) => void;

  @Input() ErrorToast: (error) => void;
  @Input() SuccessToast: (success) => void;


  constructor(public toastController: ToastController, private todoService: TodoService) { 
    this.getter();
  }

  ngOnInit() {}

  getter(){
    this.todoService.getTodo().subscribe(
      data => { 
        this.todosTest = [data];
        console.log(this.todosTest);
        console.log(data);
      }, 
      error => {
        console.log('deu ruim');
      })
  }

  

}
