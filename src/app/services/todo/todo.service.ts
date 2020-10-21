import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';

import { ConnectionService } from 'ng-connection-service';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
const { Storage } = Plugins;

//  Dependency Injection: Primeiramente a função do DI é tornar os aplicativos Angular mais robustos, flexíveis e eficientes, bem como testáveis e sustentáveis.
//  A estrutura da Dependency Injection fornece dados a um componente a partir de uma classe de serviço que é definida em seu próprio arquivo. 
//  Um exemplo em nosso código: A classe serviço Todo.Service.ts consegue fornecer os serviços de adicionar e remover toDo para nossa aplicação e tendo um observável como o Array dos ToDos.
//  No arquivo TS de nosso componente fazemos a importação da classe e fazemos uma Dependency Injection no construtor ('private TodoService: TodoService') para podermos consumir as funções que o Service nos proporciona.


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: ToDoItem[];
  hasConnection = 'Online';

  private url = `https://api-todo-hausenn.herokuapp.com/v1/todo`;

  constructor(private http: HttpClient, private connectionCheck: ConnectionService) {
    this.connectionCheck.monitor().subscribe((hasConnection) => {
      this.hasConnection = hasConnection ? 'Online' : 'Offline';
    });
    this.clear()
  }

  list(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.url)
      .pipe(
        map((res: ToDoItem[]) => this.todos = res)
      );
      
  }

  addTodo(toDoItem: ToDoItem, toDoItemList: ToDoItemList): Observable<ToDoItem> {
    

    return this.http.post<ToDoItem>(this.url, toDoItem)
      .pipe(
        map(toDoList => toDoList),
        catchError(() => this.setTodos(toDoItem, toDoItem.id))
      );
  }

  sincTodos(toDoItemList: ToDoItemList): Observable<ToDoItemList> {
    try {
      Storage.set({
        key: `todos`,
        value: JSON.stringify(toDoItemList)
      });
      return of(toDoItemList);
    } catch (err) {
      console.log('nao salvou');
    }
  }

  setTodos(toDoItem: ToDoItem, toDoItemId: number): Observable<ToDoItem> {
    try {
      Storage.set({
        key: `${toDoItemId}`,
        value: JSON.stringify(toDoItem)
      });
      console.log('Salvo no Storage o Todo =>  id: ', `${toDoItemId}`, `${toDoItem}`)
      return of(toDoItem);
    } catch (err) {
      console.log('nao salvou');
    }
  }

  async sincStorageforServer(aux: ToDoItemList) {
    console.log('Iniciando Sincronização com Servidor')
    //aux = array mostrado para o usuário no componente.
    this.list().subscribe((todos: ToDoItem[]) => {this.todos = todos;})

    if(JSON.stringify(aux) === JSON.stringify(this.todos)){

      console.log('Sincronização entre Servidor e Storage ja está feita!');
      return this.todos

    } else if (this.hasConnection === 'Online') {

      const id0 = this.todos.map((i) => `${i.id}`)

      id0.forEach(
        async (index) => {
          const ret = await Storage.get({ key: `${index}` });
          const todo = JSON.parse(ret.value);

          
          if(todo.deleted_at === true){
            this.removeTodo(todo.id, todo).subscribe()
            this.removeStorage(todo.id)
            console.log('ToDo do Storage removido Servidor')
          }
          
        }
      )

      const id = aux.map((i) => `${i.id}`)

      id.forEach(
        async (index) => {
          const ret = await Storage.get({ key: `${index}` });
          const todo = JSON.parse(ret.value);

          if(todo !== null && todo.deleted_at !== true){
            
            this.addTodo(todo, aux).subscribe()
            this.removeStorage(todo.id)
            console.log('ToDo do Storage adicionado ao Servidor')
          }
        }
      )

      



      
    }
    
  }

  removeTodo(idtodo: number, ToDoItem: ToDoItem): Observable<boolean> {
    
    return this.http.delete<ToDoItem>(this.url + '/' + idtodo)
      .pipe(
        map(() => true),
        catchError(() => {
          this.setTodos(ToDoItem, idtodo);
          return of(false);
        })
      );
  }

  removeAllTodo() {
    return this.http.delete<ToDoItem>(this.url)
      .pipe(
        map(() => console.log('removeu todos todos do server'))
      );
  }

  async removeStorage(id) {
    await Storage.remove({ key: `${id}` });
    console.log('ToDo', `${id}` , 'removido do Storage!')
  }

  async clear() {
    await Storage.clear();
    console.log('Storage foi formatado!');
  }
}
