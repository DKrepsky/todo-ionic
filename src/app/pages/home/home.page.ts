import { Component, OnInit } from '@angular/core';
import  {ToDoItemList}  from '../../models/types/todo-list.type';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  todos: ToDoItemList;
  todoTitle: string;
  idForTodo: number;
  error: string;
  error2: string;
  success: string;
  

  

  constructor(public toastController: ToastController) { }
  

  ngOnInit(){
    this.todoTitle = '';
    this.idForTodo = 4;
    this.error = 'Seu ToDo deve ter um nome!';
    this.error2 = 'O nome de seu ToDo está muito grande!'
    this.success = 'Seu ToDo foi removido com sucesso!'
    this.todos = [
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
    ];
  }

  async ErrorToast(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }

  async SuccessToast(success) {
    const toast = await this.toastController.create({
      message: success,
      duration: 2000
    });
    toast.present();
  }

  addTodo(): void {
      
    if(this.todoTitle.trim().length === 0){
      this.ErrorToast(this.error);
    } else if(this.todoTitle.trim().length > 64){
      this.ErrorToast(this.error2);
    } else {
      this.todos.push(
        {
          id: this.idForTodo,
          title: this.todoTitle,
          completed: false,
        }  
    )
    }

    

    this.todoTitle = '';
    this.idForTodo++;
  }

  removeTodo(id: number): void {
    
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.SuccessToast(this.success);

  }

}
