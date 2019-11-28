import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPacientePage } from './detail-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPacientePageRoutingModule {}
