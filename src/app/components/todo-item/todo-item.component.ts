import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  @Input() todos: Array<any>;
  @Input() todoTitle: string;
  @Input() idForTodo: 4;
  @Input() error: string;
  @Input() error2: string;
  @Input() success: string;

  @Input() adicionar: () => void;
  @Input() remover: (id: number) => void;

  @Input() ErrorToast: (error) => void;
  @Input() SuccessToast: (success) => void;


  constructor(public toastController: ToastController) { }

  ngOnInit() {}

  

}
