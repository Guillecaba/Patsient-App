import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPacientePageRoutingModule } from './detail-paciente-routing.module';

import { DetailPacientePage } from './detail-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPacientePageRoutingModule
  ],
  declarations: [DetailPacientePage]
})
export class DetailPacientePageModule {}
