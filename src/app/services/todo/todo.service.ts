import { Injectable } from '@angular/core';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

//  Dependency Injection: Primeiramente a função do DI é tornar os aplicativos Angular mais robustos, flexíveis e eficientes, bem como testáveis e sustentáveis.
//  A estrutura da Dependency Injection fornece dados a um componente a partir de uma classe de serviço que é definida em seu próprio arquivo. 
//  Um exemplo em nosso código: A classe serviço Todo.Service.ts consegue fornecer os serviços de adicionar e remover toDo para nossa aplicação e tendo um observável como o Array dos ToDos.
//  No arquivo TS de nosso componente fazemos a importação da classe e fazemos uma Dependency Injection no construtor ('private TodoService: TodoService') para podermos consumir as funções que o Service nos proporciona.

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  
  idForTodo: number;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private url = `https://api-todo-hausenn.herokuapp.com/v1/todo`;

  constructor(private http: HttpClient) { }

  list(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.url);  
  }

  addTodo(todoTitle: string): Observable<ToDoItem[]> {
       
      return this.http.post<ToDoItem[]>(this.url,
      {
        name: todoTitle,
        done: false,
      }, 
      this.httpOptions  
      );    
  }

  removeTodo(idtodo: number): Observable<Boolean> {         
      return this.http.delete<ToDoItem>
      (this.url + '/' + idtodo, this.httpOptions)
        .pipe(map( success => 
          true
        ));    
  }

  


}
