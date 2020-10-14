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
  idForTodo: number;

  todos: Array<any>;
  todoTitle: string;
  


  constructor(public toastController: ToastController, private TodoService: TodoService) { 
    
  }

  ngOnInit() {
    this.todoTitle = '';
    this.idForTodo = 1;
    this.TodoService.list().subscribe(dados => this.todosTest = dados);
    
  }

 
  add() {
    
    console.log(this.todoTitle);
    try{
      
      this.TodoService.addTodo(this.todoTitle).subscribe();
      
    } catch (err){
      console.log('deu ruim');
    }
    //this.idForTodo++;
  }

  remove(index: number) {
    
    this.TodoService.removeTodo(index);
    
    //this.notify("Tarefa removida com sucesso.");
  }
  

}
