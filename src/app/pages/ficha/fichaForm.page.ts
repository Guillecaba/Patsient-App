import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { Ficha } from 'src/app/models/ficha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ficha-form',
  templateUrl: './fichaForm.page.html',
  styleUrls: ['./ficha.page.scss'],
})

export class FichaFormPage implements OnInit {

  lista: Ficha[] = []

  cat_id = null
  can_submit = false

  opciones = {
    'cat': [],
    'subcat' : []
  }

  form = {
    idTipoProducto:{
      idTipoProducto:null,
    },
    idCliente:{
      idPersona:15
    },
    idEmpleado:{
      idPersona:3
    },
    motivoConsulta:'',
    diagnostico:'',
    observacion:'',
  }

  constructor(private service:FichaService,
    private router:Router) { }

  ngOnInit() {
    this.service.categorias().subscribe((response)=>{
      this.opciones.cat = response['lista']
    })
  }

  getSub(value: Number){    
    this.cat_id = value
    this.form.idTipoProducto.idTipoProducto = 
    this.can_next()
    this.service.subcategorias(value).subscribe((response)=>{
      this.opciones.subcat = response['lista']
    })
  }

  can_next(){
    let can = true;
    can = can && this.form.idTipoProducto.idTipoProducto != null
    can = can && this.form.idCliente.idPersona != null
    can = can && this.form.idEmpleado.idPersona != null
    can = can && this.form.motivoConsulta.length > 0
    can = can && this.form.diagnostico.length > 0

    this.can_submit = can
  }

  submit(){
    this.service.crear(this.form).subscribe((res)=>{
      this.router.navigate(['/ficha'])
    })
  }

}
