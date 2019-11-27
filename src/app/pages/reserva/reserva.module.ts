import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPageRoutingModule } from './reserva-routing.module';
import { RouterModule } from '@angular/router';
import { ReservaPage } from './reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReservaPage
      }
    ])
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule {}
