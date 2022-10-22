import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AssociationsComponent } from './components/associations/associations.component';
import { BodyComponent } from './components/body/body.component';
import { DonationComponent } from './components/donation/donation.component';
import { MessagesComponent } from './components/messages/messages.component';
import { VendeursComponent } from './components/vendeurs/vendeurs.component';

const routes: Routes = [
  { 
    path: '', component: BodyComponent,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'donation', component: DonationComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'associations', component: AssociationsComponent },
      { path: 'vendeurs', component: VendeursComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZaraoRoutingModule { }
