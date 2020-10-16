import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
import {TodoService} from '../../services/todo/todo.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  
  todos: ToDoItemList; 
  todosOffline: ToDoItemList;
  todoTitle: string;
  connected: boolean;
  loading: any;
  
  constructor(
    public toastController: ToastController, 
    private TodoService: TodoService, 
    public loadingController: LoadingController) 
    { 
      this.getTodo();
      this.connected = true;
    }


  ngOnInit() {
    this.todoTitle = '';   
    this.TodoService.list().subscribe(dados => this.todos = dados); 
      
    
  }

  getTodoOffline(){
    this.TodoService.getItem().then(data => this.todos = data);
     
  }

  async getTodo(){
    
    await this.presentLoading();
    
    
    this.TodoService.list().pipe(
      finalize(async () => {
          await this.loading.dismiss();
      })
    ).
      subscribe
      ((todos: ToDoItemList) => {this.todos = todos})

      //Verifica a conexão com a Api
      if(this.todos === undefined){
        
        this.getTodoOffline()
      } else {
        
        console.log('teste')
        
        
      }
    
  }

 
  async add() {
    await this.presentLoading();

    if(this.todoTitle.trim().length === 0){
      this.Toast('Seu ToDo deve conter um nome.', 'warning');
      await this.loading.dismiss();
      return
    } else if(this.todoTitle.trim().length > 64){
      this.Toast("O Nome do seu ToDo está muito grande!", 'warning');
      await this.loading.dismiss();
      return
    } 
      try{       
        this.TodoService.addTodo(this.todoTitle).pipe(
          finalize(async () => {
            await this.loading.dismiss();
        })
        ).subscribe(() => this.getTodo());
      }catch (err){
        this.Toast("Não foi possível criar um ToDo!", 'warning');
      }       
    }

  async remove(todoid: number) {
    await this.presentLoading();
    try{
     const data = this.TodoService.removeTodo(todoid).pipe(
      finalize(async () => {
        await this.loading.dismiss();
      })
      ).subscribe(() => this.getTodo());
      if(data){
        this.Toast("Seu ToDo foi excluído com sucesso!", 'success');
      }
    }catch(err){
      await this.loading.dismiss();
      this.Toast("Não foi possível excluir seu ToDo!", 'warning');
    }    
  }

  async presentLoading() {   
      this.loading = await this.loadingController.create({
          message: 'Conectando...'
      });    
      await this.loading.present();  
  }

  async Toast(msg, color) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 3000,
        color: `${color}`,
      });
      toast.present();
  }
  
}
