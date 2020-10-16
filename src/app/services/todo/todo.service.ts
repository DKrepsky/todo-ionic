import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

//  Dependency Injection: Primeiramente a função do DI é tornar os aplicativos Angular mais robustos, flexíveis e eficientes, bem como testáveis e sustentáveis.
//  A estrutura da Dependency Injection fornece dados a um componente a partir de uma classe de serviço que é definida em seu próprio arquivo. 
//  Um exemplo em nosso código: A classe serviço Todo.Service.ts consegue fornecer os serviços de adicionar e remover toDo para nossa aplicação e tendo um observável como o Array dos ToDos.
//  No arquivo TS de nosso componente fazemos a importação da classe e fazemos uma Dependency Injection no construtor ('private TodoService: TodoService') para podermos consumir as funções que o Service nos proporciona.


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
