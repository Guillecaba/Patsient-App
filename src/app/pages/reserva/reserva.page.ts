import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  reservas: any;
  pacientes: any;
  empleados: any;
  categorias: any;

  // inputs
  pacie = null;
  emple = null;
  fIni = null;
  fFin = null;

  mes = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  constructor(
    public reservaService: ReservaService,
    public pacienteService: PacienteService,
    public categoriaService: CategoriaService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    /*this.reservaService.getTodasLasReservas().subscribe((res: any) => {
      this.reservas = res.lista;
      console.log(this.reservas);
    });*/
    let hoy: string;

    /*this.categoriaService.all().subscribe((res: any) => {
      this.categorias = res.lista;
      console.log(this.categorias);
    });*/
    this.pacienteService.getTodos().subscribe((res: any) => {
      this.pacientes = res.lista;
      console.log(this.pacientes);
    });
    this.pacienteService.getTodosEmpleados().subscribe((res: any) => {
      this.empleados = res.lista;
      console.log(this.empleados);
    });
    hoy = new Date().toJSON('yyyy/MM/dd').substr(0, 10);
    hoy = hoy.substr(0, 4) + hoy.substr(5, 2) + hoy.substr(8, 2);
    console.log(hoy);
    // carga todas las reservas de hoy
    this.reservaService.getReservas(hoy, hoy, null, null).subscribe((res: any) => (
      this.reservas = res.lista
    ));
  }

  buscar() {
    const fInicio = this.datePipe.transform(this.fIni, 'yyyyMMdd');
    const fFinal = this.datePipe.transform(this.fFin, 'yyyyMMdd');
    this.reservaService.getReservas(fInicio, fFinal, this.pacie, this.emple).subscribe((res: any) => {
      this.reservas = res.lista;
    });
  }

}
