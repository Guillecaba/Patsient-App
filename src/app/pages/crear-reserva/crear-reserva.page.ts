import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';
import { AgendaService } from 'src/app/services/agenda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.page.html',
  styleUrls: ['./crear-reserva.page.scss'],
})
export class CrearReservaPage implements OnInit {

  pacie;
  emple;
  fecha;

  agendas;
  pacientes;
  empleados;
  // turno elegido de la agenda
  elegido;
  constructor(
    public reservaService: ReservaService,
    public pacienteService: PacienteService,
    public datePipe: DatePipe,
    public agendaService: AgendaService,
    private router: Router
  ) { }

  ngOnInit() {
    let hoy: string;
    this.pacienteService.getTodos().subscribe((res: any) => (
      this.pacientes = res.lista
    ));
    this.pacienteService.getTodosEmpleados().subscribe((res: any) => (
      this.empleados = res.lista
    ));
    hoy = new Date().toJSON('yyyy/MM/dd').substr(0, 10);
    hoy = hoy.substr(0, 4) + hoy.substr(5, 2) + hoy.substr(8, 2);
    console.log(hoy);
  }

  buscarAgenda() {
    const fechaCadena = this.datePipe.transform(this.fecha, 'yyyyMMdd');
    console.log(this.elegido);
    this.agendaService.getReservas(this.emple, fechaCadena, true).subscribe((res: any) => {
      this.agendas = res;
      console.log(this.agendas);
    });
  }
  actualizarAgenda() {
    console.log('PING!!');
    this.elegido = null;
    if (this.emple && this.fecha) {
      console.log('Debo buscar en mi agenda');
      this.buscarAgenda();
    }
  }

  postReserva() {
    // convierte la fecha en el formato fechaCadena yyyyMMdd
    const fechaCadena = this.datePipe.transform(this.fecha, 'yyyyMMdd');
    let datos = '{"fechaCadena": "';
    datos = datos + fechaCadena + '","horaInicioCadena":"';
    // extrae la hora en forma de cadena sin importar si usa datetime o time
    let horaInicio = this.elegido.horaInicio;
    if (horaInicio.length === 19) {
      horaInicio = horaInicio.substr(11, 2) + horaInicio.substr(14, 2);
    } else if (horaInicio.length === 8) {
      horaInicio = horaInicio.substr(0, 2) + horaInicio.substr(3, 2);
    } else {
      console.log('Error en el formato de fecha de la entrada (fecha inicial)');
    }
    console.log(horaInicio);

    // extrae la hora en forma de cadena sin importar si usa datetime o time
    let horaFin = this.elegido.horaFin;
    if (horaFin.length === 19) {
      horaFin = horaFin.substr(11, 2) + horaFin.substr(14, 2);
    } else if (horaFin.length === 8) {
      horaFin = horaFin.substr(0, 2) + horaFin.substr(3, 2);
    } else {
      console.log('Error en el formato de fecha de la entrada (fecha final)');
    }
    console.log(horaFin);
    datos = datos + horaInicio + '","horaFinCadena":"' + horaFin + '",';
    datos = datos + '"idEmpleado":{"idPersona":' + this.emple + '},"idCliente":{"idPersona":';
    datos = datos + this.pacie + '}}';
    this.reservaService.postReserva(datos).subscribe(res => {
      if (res) {
        console.log('Reservación creada con éxito!');
        this.router.navigateByUrl('/reserva');
      }
    });
  }

}
