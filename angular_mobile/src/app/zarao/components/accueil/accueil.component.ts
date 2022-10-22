import { Component, OnInit } from '@angular/core';
import { listCategories } from './list_categories';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  categories!: string[];
  constructor() { }

  ngOnInit(): void {
    this.categories = listCategories;
  }

}
