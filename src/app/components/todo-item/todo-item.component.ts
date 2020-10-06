import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from 'src/app/models/interfaces/todo-item.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: TodoItem;
  @Output() todoChange = new EventEmitter<TodoItem>();

  @Output() removeEvent = new EventEmitter<void>();

  constructor() { }

  changed() {
    this.todoChange.emit(this.todo);
  }

  remove() {
    this.removeEvent.emit();
  }
}
