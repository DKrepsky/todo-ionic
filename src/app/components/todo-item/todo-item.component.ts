import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {

  @Input() todos: Array<any>

  @Input() adicionar: () => void;

  @Input() remover: (id: number) => void;

  @Input() notify: (id: number) => void;

  constructor() { }

  ngOnInit() {}

  

}
