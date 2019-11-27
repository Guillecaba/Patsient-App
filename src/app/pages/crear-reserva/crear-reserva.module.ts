import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearReservaPageRoutingModule } from './crear-reserva-routing.module';

import { CrearReservaPage } from './crear-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearReservaPageRoutingModule
  ],
  declarations: [CrearReservaPage]
})
export class CrearReservaPageModule {}
