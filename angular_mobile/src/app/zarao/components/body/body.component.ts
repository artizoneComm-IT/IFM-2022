import { Component, OnInit } from '@angular/core';
import { dropdownMenu, listMenu } from './list_menu';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  menu!: { icone: string, label: string , route: string }[];
  dropdown!: { icone: string, label: string }[];
  constructor() { }

  ngOnInit(): void {
    this.menu = listMenu;
    this.dropdown = dropdownMenu;
  }

}
