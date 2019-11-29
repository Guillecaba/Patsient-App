import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { Ficha } from 'src/app/models/ficha';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})

export class FichaPage implements OnInit {

  lista: Ficha[] = []

  desde:Date = null
  hasta:Date = null

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

  constructor(private service:FichaService) { }

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
    this.service.subcategorias(value).subscribe((response)=>{
      this.opciones.subcat = response['lista']
    })
  }

}
