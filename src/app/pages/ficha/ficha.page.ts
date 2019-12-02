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

  loading:boolean = false

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
    this.loading = true
    this.service.listado(this.filtros).subscribe((response)=>{
      this.lista = response['lista']
    },
    null,
    ()=>{
      this.loading = false
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

  async view (ficha:Ficha){
    const alert = await this.alert.create({
      header: 'Ficha',
      message: `
        <ion-grid>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="person"></ion-icon>
              ${ ficha.idCliente.apellido + ', ' + ficha.idCliente.nombre }
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="contact"></ion-icon>
              ${ ficha.idEmpleado.apellido + ', ' + ficha.idEmpleado.nombre }
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="alarm"></ion-icon>
              ${ ficha.fechaHora }
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="pin"></ion-icon>
              ${ ficha.idLocal.nombre }
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="bookmarks"></ion-icon>
              ${ ficha.motivoConsulta }
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="paper"></ion-icon>
              ${ ficha.diagnostico }
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-align-self-center">
              <ion-icon class="icono" name="information-circle-outline"></ion-icon>
              ${ ficha.observacion  }
            </ion-col>
          </ion-row>
        </ion-grid>
      `,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
    
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

    await modal.present();

    let { data }  = await modal.onWillDismiss()

    if(data['update'])props['callback'](data.value,data.name)
  }
}
