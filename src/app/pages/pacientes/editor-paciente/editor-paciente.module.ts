import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPacientePageRoutingModule } from './editor-paciente-routing.module';

import { EditorPacientePage } from './editor-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditorPacientePageRoutingModule
  ],
  declarations: [EditorPacientePage],
  providers:[ DatePipe ]
})
export class EditorPacientePageModule {}
