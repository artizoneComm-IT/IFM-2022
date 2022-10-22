import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZaraoRoutingModule } from './zarao-routing.module';
import { BodyComponent } from './components/body/body.component';
import { AccueilComponent } from './components/accueil/accueil.component';


@NgModule({
  declarations: [
    BodyComponent,
    AccueilComponent,
  ],
  imports: [
    CommonModule,
    ZaraoRoutingModule
  ],
  exports: [
    BodyComponent,
  ]
})
export class ZaraoModule { }
