import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaPage } from './ficha.page';
import { FichaFormPage } from './fichaForm.page';


const routes: Routes = [
  {
    path: '',
    component: FichaPage
  },
  {
    path: 'form',
    component: FichaFormPage
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaPageRoutingModule {}
