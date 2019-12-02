import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { Ficha } from 'src/app/models/ficha';
import { Router } from '@angular/router';
import { SearchPage } from './search/search.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ficha-form',
  templateUrl: './fichaForm.page.html',
  styleUrls: ['./ficha.page.scss'],
})

export class FichaFormPage implements OnInit {

  lista: Ficha[] = []

  paciente_name = ""
  empleado_name = ""

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
      idPersona:null
    },
    idEmpleado:{
      idPersona:null
    },
    motivoConsulta:'',
    diagnostico:'',
    observacion:'',
  }

  constructor(private service:FichaService,
    private modalController:ModalController,
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

  async selectPersona(tipo){
    let props = {tipo : tipo}
    if(tipo == 'Paciente'){
      props['callback'] = (id, name) => {
        this.paciente_name = name
        this.form.idCliente.idPersona = id
        this.can_next()
      }
      props['prev'] = this.form.idCliente.idPersona
    }
    if(tipo == 'Empleado'){
      props['callback'] = (id, name) => {
        this.empleado_name = name
        this.form.idEmpleado.idPersona = id
        this.can_next()
      }
      props['prev'] = this.form.idEmpleado.idPersona
    }

    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: props
    });

   
    await modal.present();

    let { data }  = await modal.onWillDismiss()

    if(data['update'])props['callback'](data.value,data.name)

  }
}
