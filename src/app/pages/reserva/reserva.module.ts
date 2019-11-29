import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaPageRoutingModule } from './reserva-routing.module';
import { RouterModule } from '@angular/router';
import { ReservaPage } from './reserva.page';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@NgModule({
  entryComponents: [ModalComponent],
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
  declarations: [ReservaPage, ModalComponent]
})
export class ReservaPageModule { }
