import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public form = [
    { val: 'Conhecer o Ionic', isChecked: true},
    { val: 'Conhecer o Angular', isChecked: false},
    { val: 'Concluir as atividades', isChecked: false}
  ]

  constructor() { }

}
