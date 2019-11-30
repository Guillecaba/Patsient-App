import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPacientePage } from './editor-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: EditorPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPacientePageRoutingModule {}
