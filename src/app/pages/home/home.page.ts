import { Component, OnInit } from '@angular/core';
import  {ToDoItemList}  from '../../models/types/todo-list.type';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  todos: ToDoItemList;
  todoTitle: string;
  idForTodo: number;

  

  

  constructor() { }

  ngOnInit(){
    this.todos = [
      {
        'id': 1,
        'title': 'Finish Angular Screencast',
        'completed': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
      },
    ];
  }

  addTodo(): void {

    if(this.todoTitle.trim().length === 0){
      return;
    }

    this.todos.push(
        {
          id: this.idForTodo,
          title: this.todoTitle,
          completed: false,
        }  
    )

    this.todoTitle = '';
    this.idForTodo++;
  }

}
