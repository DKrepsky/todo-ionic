import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { TodoItem } from "src/app/models/interfaces/todo-item.interface";
import { TodoService } from "src/app/services/todo/todo.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public newTodoName: string = "";
  public todos$: Observable<TodoItem[]> = this.todoService.getTodo();

  constructor(
    private todoService: TodoService,
    private toastCtrl: ToastController
  ) {}

  add() {
    try {
      this.todoService.addTodo(this.newTodoName);
      this.newTodoName = "";
    } catch (err) {
      this.notify(err.message);
    }
  }

  remove(index: number) {
    this.todoService.removeTodo(index);
    this.notify("Tarefa removida com sucesso.");
  }

  async notify(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      buttons: [
        {
          role: "ok",
          text: "OK",
        },
      ],
      duration: 3000,
    });

    toast.present();
  }
}
