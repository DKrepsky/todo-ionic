import { Component, OnChanges, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToDoItemList } from 'src/app/models/types/todo-list.type';
import { TodoService } from '../../services/todo/todo.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ToDoItem } from 'src/app/models/interfaces/todo-item.interface';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  todos: ToDoItemList;
  todoTitle: string;
  loading: any;
  todoId = 0;

  constructor(
    public toastController: ToastController,
    private todoService: TodoService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getTodo();
    this.todoTitle = '';
    this.todoService.sincStorageforServer(this.todos)   
  }

  async getTodo() {
    await this.presentLoading();

    this.todoService.list()
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      ).subscribe((todos: ToDoItemList) => { this.todos = todos; })
  }


  add() {
    this.presentLoading();

    if (this.isToDoValid(this.todoTitle.trim())) {
      try {
        this.todoService.addTodo(this.buildToDoItem(), this.todos)
          .pipe(
            finalize(async () => {
              this.loading.dismiss();
            })
          ).subscribe();
        this.todos.push(this.buildToDoItem());

        this.todoService.sincStorageforServer(this.todos);
          console.log(this.todoId)
        ++this.todoId;
      } catch (err) {
        this.Toast('Não foi possível criar um ToDo!', 'warning');
        this.loading.dismiss();
      }
    } else {
      this.loading.dismiss();
    }
  }

  buildToDoItem(): ToDoItem {
    const today = new Date();
    return {
      id: this.todoId,
      name: this.todoTitle,
      done: false,
      created_at: today,
      updated_at: today,
      deleted_at: false,
    };
  }

  isToDoValid(toDoTitle: string): boolean {
    if (toDoTitle.length === 0) {
      this.Toast('Seu ToDo deve conter um nome.', 'warning');
      return false;
    } else if (toDoTitle.length > 64) {
      this.Toast('O Nome do seu ToDo está muito grande!', 'warning');
      return false;
    }
    return true;
  }

  async remove(todoid: number, toDoItem: ToDoItem) {

    await this.presentLoading();
    try {
      toDoItem.deleted_at = true;
      this.todos = this.todos.filter(todo => todo.id !== todoid);
      this.todoService.removeTodo(todoid, toDoItem).pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      ).subscribe();

      this.Toast('Seu ToDo foi excluído com sucesso!', 'success');

    } catch (err) {
      await this.loading.dismiss();
      this.Toast('Não foi possível excluir seu ToDo!', 'warning');
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
