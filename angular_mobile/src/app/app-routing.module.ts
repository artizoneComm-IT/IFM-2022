import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'zarao', 
    loadChildren: () => import('./zarao/zarao.module').then(m => m.ZaraoModule)
  },
  { path: '', redirectTo: 'zarao', pathMatch: 'full' },
  { path: '**', redirectTo: 'zarao', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
