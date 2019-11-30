import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { Ficha } from 'src/app/models/ficha';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchPage } from './search/search.page';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})

export class FichaPage implements OnInit {

  lista: Ficha[] = []

  desde:Date = null
  hasta:Date = null

  empleado_name:string = null
  paciente_name:string = null

  hoy:Date= new Date()
  cat_id = null

  opciones = {
    'cat': [],
    'subcat' : []
  }

  filtros = {
    idTipoProducto:{
      idTipoProducto:null,
    },
    idCliente:{
      idPersona:null
    },
    idEmpleado:{
      idPersona:null
    },
    fechaDesdeCadena:null,
    fechaHastaCadena:null,
  }

  constructor(
    private service:FichaService,
    private alert:AlertController,
    private modalController:ModalController,
    private router:Router
  ) { }

  ngOnInit() {
    this.getData()
    this.service.categorias().subscribe((response)=>{
      this.opciones.cat = response['lista']
    })
  }

  getData(){
    this.service.listado(this.filtros).subscribe((response)=>{
      this.lista = response['lista']
    })
  }

  setFiltro(key:string,value:string){
    let key_cap = 'fecha' + (key == 'desde' ? 'Desde' : 'Hasta') + 'Cadena'
    this.filtros[key_cap] = value.substring(0,10).replace('-','').replace('-','')
    this.getData()
  }

  getSub(value: Number){
    console.log(value)
    this.cat_id = value
    this.filtros.idTipoProducto.idTipoProducto = null
    this.service.subcategorias(value).subscribe((response)=>{
      this.opciones.subcat = response['lista']
    })
  }

  async edit(idFicha,observacion){
    
    const alert = await this.alert.create({
      header: 'Editar Observación',
      inputs: [
        {
          name: 'observacion',
          type: 'text',
          label: 'Observacion',
          value: observacion,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (form) => {
            form['idFichaClinica'] = idFicha
            if(form.observacion != null && form.observacion.length > 0){
              this.service.editar(form).subscribe((response)=>{
                this.getData()
              })
            }
          }
        }
      ]
    });

    await alert.present();

  }

  async selectPersona(tipo){
    let props = {tipo : tipo}
    if(tipo == 'Paciente'){
      props['callback'] = (id, name) => {
        this.paciente_name = name
        this.filtros.idCliente.idPersona = id
        this.getData()
      }
      props['prev'] = this.filtros.idCliente.idPersona
    }
    if(tipo == 'Empleado'){
      props['callback'] = (id, name) => {
        this.empleado_name = name
        this.filtros.idEmpleado.idPersona = id
        this.getData()
      }
      props['prev'] = this.filtros.idEmpleado.idPersona
    }

    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: props
    });
    return await modal.present();
  }
}
