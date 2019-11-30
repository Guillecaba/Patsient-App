import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  pacientes;
  count;
  usuarioSistema
  busquedaExacta=false;
  like="S";
  constructor(public pacienteService :PacienteService, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  onChange(event) {
    const value = event.target.value
    /* this.busqueda */
    console.log(value)
  }

  toggleExacta(event){
    this.usuarioSistema = false;
    /* this.busquedaExacta = event */
  }

  toggleFisio(event){
    this.busquedaExacta = false;
    console.log(this.usuarioSistema)
    if(this.usuarioSistema){
      this.pacienteService.get({
        
       
        ejemplo:encodeURIComponent(JSON.stringify({
          soloUsuariosDelSistema:this.usuarioSistema
        }))
      })
      .subscribe((response)=>{
        this.pacientes = response['lista']
        this.count = response['totalDatos']
      })
    } else{
      this.pacienteService.get({
      })
      .subscribe((response)=>{
        this.pacientes = response['lista']
        this.count = response['totalDatos']
      })
    }
  }

  searchByName (event) {
    this.usuarioSistema = false;
    const name= event.target.value;
    /* /stock-pwfe/persona?ejemplo={"soloUsuariosDelSistema":true} */  
    if(this.busquedaExacta) {
      this.pacienteService.get({ejemplo:encodeURIComponent(JSON.stringify({
        nombre:name
      }))})
      .subscribe((response)=>{
        this.pacientes = response['lista']
        this.count = response['totalDatos']
      })
    } else {
      console.log("Busque")
      this.pacienteService.get({like:this.like,ejemplo:encodeURIComponent(JSON.stringify({
        nombre: name
      }))})
      .subscribe((response)=> {
        this.pacientes = response['lista']
        this.count = response['totalDatos']
      })
    } 

  }




  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      /* header: 'Albums', */
      buttons: [{
        text: 'Ver detalle',
        icon: 'eye',
        handler: () => {
          console.log('Ver clicked');
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          console.log('Editar clicked');
        }
      },{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
