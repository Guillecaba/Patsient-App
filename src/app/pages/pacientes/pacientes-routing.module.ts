import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesPage } from './pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: PacientesPage
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'editor-paciente',
    loadChildren: () => import('./editor-paciente/editor-paciente.module').then( m => m.EditorPacientePageModule)
  },
  {
    path: 'detail-paciente',
    loadChildren: () => import('./detail-paciente/detail-paciente.module').then( m => m.DetailPacientePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesPageRoutingModule {}
