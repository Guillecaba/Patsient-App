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
    this.agendaService.getReservas(this.emple, this.fecha, true).subscribe((res: any) => {
      this.agendas = res;
      console.log(res);
    });
  }

}