import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Persona } from 'src/app/models/persona';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-search-ficha',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  tipo:string = null
  value:Number = null
  opciones: Persona[] = []
  onUpdate:(id:Number,name:string)=> void = null

  constructor(private modalCtrl: ModalController,
    private service:FichaService,
    private navParams: NavParams) { 
      this.tipo = this.navParams.get('tipo')
      this.value = this.navParams.get('prev')
      this.onUpdate = this.navParams.get('callback')
    }

  ngOnInit() {
    this.getPersonas(null)
  }
  getPersonas(like){
    let tipo = this.tipo == "Empleado"
    this.service.persona(like,tipo).subscribe((response:any)=>{
      this.opciones = response['lista']
    })
  }

  cerrar(ejecutar){
    let name = null;
    if(ejecutar){
      for(let i = 0; i< this.opciones.length; i++){
        let persona:Persona = this.opciones[i]
        if(persona.idPersona == this.value){
          name = persona.apellido + ', ' + persona.nombre
        }        
      }
      this.onUpdate(this.value,name)
    }
    this.modalCtrl.dismiss()
  }

}
