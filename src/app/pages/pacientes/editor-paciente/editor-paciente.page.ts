import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
@Component({
  selector: 'app-editor-paciente',
  templateUrl: './editor-paciente.page.html',
  styleUrls: ['./editor-paciente.page.scss'],
})
export class EditorPacientePage implements OnInit {

  action="Nuevo";
  forma;
  
  constructor(public datePipe: DatePipe,public pacienteService:PacienteService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'nombre':new FormControl('',[Validators.required]),
      'apellido': new FormControl('',[Validators.required]),
      'telefono': new FormControl(''),
      'ruc': new FormControl(''),
      'email': new FormControl(
        '',
        [ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]),
        'cedula': new FormControl(''),
        'tipoPersona':new FormControl('FISICA'),
        'fechaNacimiento':new FormControl(''),

    })
  }

  dateChange(event){
    
    let fecha = this.datePipe.transform(event.target.value, 'yyyy-MM-dd hh:mm:ss');
    this.forma.patchValue({
      fechaNacimiento: fecha, 
      // formControlName2: myValue2 (can be omitted)
    });
    console.log(this.forma.value)
    console.log(this.forma)
  }

  submit(){
    this.pacienteService.post(this.forma.value).subscribe((res)=>{
      console.log(res)
    })
  }

  print() {
    console.log(this.forma)
    console.log(this.forma.value)
  }

}
