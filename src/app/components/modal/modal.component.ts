import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() reserva;

  obser;
  asist;
  constructor(private router: Router, public reservaService: ReservaService) { }

  ngOnInit() {
    this.asist = false;
    this.obser = '';
    console.log(this.reserva);
  }

  guardar() {
    console.log(this.obser);
    console.log(this.asist);
    // location.reload();
    let datos = '{"idReserva":';
    datos = datos + this.reserva.idReserva + ',"observacion":"';
    datos = datos + this.obser + '","flagAsistio":"';
    if (this.asist) {
      datos = datos + 'S';
    } else {
      datos = datos + 'N';
    }
    datos = datos + '"}';
    console.log(datos);
    this.reservaService.putReserva(datos).subscribe(res => {
      if (res) {
        console.log('Reservación modificada con éxito!');
        location.reload();
      }
    });
  }


}
