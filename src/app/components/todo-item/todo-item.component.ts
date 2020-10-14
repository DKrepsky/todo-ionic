import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
import {TodoService} from '../../services/todo/todo.service';
import {Observable} from 'rxjs';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  public _todos: Observable<ToDoItemList> = this.TodoService.getTodo();

  todos: ToDoItemList;
  idForTodo: number;

  
  todoTitle: string;
  


  constructor(public toastController: ToastController, private TodoService: TodoService) { 
    this.getTodo();
  }

  ngOnInit() {
    this.todoTitle = '';
    this.idForTodo = 1;
    this.TodoService.list().subscribe(dados => this.todos = dados);
    
  }

  getTodo(){
    this.TodoService.list().
      subscribe
      ((todos: ToDoItemList) => {this.todos = todos});
  }

 
  add() {
    
    console.log(this.todoTitle);
    try{
      
      this.TodoService.addTodo(this.todoTitle).subscribe(() => this.getTodo());
      
    } catch (err){
      console.log('deu ruim');
    }
    //this.idForTodo++;
  }

  remove(todo: ToDoItemList) {
    
    this.TodoService.removeTodo(todo).subscribe(() => this.getTodo());
  }
  

}
