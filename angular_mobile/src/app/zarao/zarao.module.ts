import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZaraoRoutingModule } from './zarao-routing.module';
import { BodyComponent } from './components/body/body.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DonationComponent } from './components/donation/donation.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AssociationsComponent } from './components/associations/associations.component';
import { VendeursComponent } from './components/vendeurs/vendeurs.component';


@NgModule({
  declarations: [
    BodyComponent,
    AccueilComponent,
    DonationComponent,
    MessagesComponent,
    AssociationsComponent,
    VendeursComponent,
  ],
  imports: [
    CommonModule,
    ZaraoRoutingModule
  ],
  exports: [
    BodyComponent,
    AccueilComponent,
    DonationComponent,
    MessagesComponent,
    AssociationsComponent,
    VendeursComponent,
  ]
})
export class ZaraoModule { }
