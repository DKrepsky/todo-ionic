import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
import {TodoService} from '../../services/todo/todo.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  
  todos: ToDoItemList;
  idForTodo: number;  
  todoTitle: string;
  connected: boolean;
  loading: any;
  
  constructor(public toastController: ToastController, private TodoService: TodoService, public loadingController: LoadingController) { 
    this.getTodo();
  }

  ngOnInit() {
    this.todoTitle = '';
    this.idForTodo = 1;
    this.TodoService.list().subscribe(dados => this.todos = dados);   
  }

  async getTodo(){
    
    await this.presentLoading();
    
    this.TodoService.list().pipe(
      finalize(async () => {
          // Hide the loading spinner on success or error
          await this.loading.dismiss();
      })
  ).
      subscribe
      ((todos: ToDoItemList) => {this.todos = todos})
    
  }

 
  async add() {
    await this.presentLoading();

    if(this.todoTitle.trim().length === 0){
      this.Toast('Seu ToDo deve conter um nome.', 'warning');
    } else if(this.todoTitle.trim().length > 64){
      this.Toast("O Nome do seu ToDo está muito grande!", 'warning');
    } 
      try{       
        this.TodoService.addTodo(this.todoTitle).pipe(
      finalize(async () => {
          // Hide the loading spinner on success or error
          await this.loading.dismiss();
      })
  ).subscribe(() => this.getTodo());     
    } catch (err){
      this.Toast("Não foi possível criar um ToDo!", 'warning');
    }
       
  }

  async remove(todoid: number) {
    await this.presentLoading();
    try{
     
      const data = this.TodoService.removeTodo(todoid).pipe(
        finalize(async () => {
            // Hide the loading spinner on success or error
            await this.loading.dismiss();
        })
    ).subscribe(() => this.getTodo());
      if(data){
        this.Toast("Seu ToDo foi excluído com sucesso!", 'success');
      }
    }catch(err){
      this.Toast("Não foi possível excluir seu ToDo!", 'warning');
    }    
  }

  async presentLoading() {
    
    this.loading = await this.loadingController.create({
        message: 'Loading...'
    });
    
  await this.loading.present();
  
}


  async Toast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: `${color}`,
    });
    toast.present();
  }
  

}
