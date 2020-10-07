import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { TodoItem } from "src/app/models/interfaces/todo-item.interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public todos: Array<TodoItem> = [];
  public newTodoName: string = "";

  constructor(private toastCtrl: ToastController) {}

  addTodo() {
    if (this.newTodoName.trim().length == 0) {
      this.notify("O nome da tarefa não pode ser vazio.");
    } else if (this.newTodoName.trim().length > 64) {
      this.notify(" O nome da tarefa não pode possuir mais que 64 caracteres.");
    } else {
      this.todos.push({
        name: this.newTodoName,
        done: false,
      });

      this.newTodoName = "";
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);

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
