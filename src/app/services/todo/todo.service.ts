import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  
  idForTodo: number;
  public aux: ToDoItem[] = [];
  private _todos: BehaviorSubject<Array<ToDoItem>> = new BehaviorSubject(this.aux);

  constructor(public toastController: ToastController) { }

  public getTodo(): Observable<Array<ToDoItem>> {   
    return this._todos.asObservable();
        
  }

  addTodo(todoTitle: string, idForTodo: number): void {
      
    if(todoTitle.trim().length === 0){
      this.Toast('Seu ToDo deve conter um nome.', 'warning');
    } else if(todoTitle.trim().length > 64){
      this.Toast("O Nome do seu ToDo está muito grande!", 'warning');
    } else {
      this.aux.push(
        {
          id: idForTodo,
          title: todoTitle,
          completed: false,
        }  
    )
    }
    todoTitle = '';
    this._todos.next(this.aux);
  }

  removeTodo(index: number) {
    this.aux = this.aux.filter(todo => todo.id !== index);
    this._todos.next(this.aux);
    this.Toast("Seu ToDo foi excluído com sucesso!", 'success');
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
