import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Ficha } from '../models/ficha';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  private url_base = 'http://gy7228.myfoscam.org:8080/stock-pwfe/';

  constructor(private http: HttpClient) { }

  listado (filtros:any){

    let query:any = {}
    for (let k in filtros){
      let filtro = filtros[k]
      if( (k == 'idCliente' || k == 'idEmpleado') && filtro.idPersona){
        query[k] = filtro
      }else if( k == 'idTipoProducto' && filtro.idTipoProducto){
        query[k] = filtro
      }else if(typeof filtro === 'string'){
        query[k] = filtro
      }
    }

    let url:string = this.url_base + 'fichaClinica?ejemplo=' + encodeURIComponent(JSON.stringify(query))

    return this.http.get<Ficha []>(url)
  }

  categorias(){
    let url = this.url_base + "categoria"
    return this.http.get(url)
  }

  subcategorias(id_cat){
    let url = this.url_base + 'tipoProducto?ejemplo=' + encodeURIComponent(JSON.stringify({
      idCategoria:{
        idCategoria: id_cat
      }
    }))
    return this.http.get(url)
  }

  crear(form){
    let url = this.url_base + 'fichaClinica'
    return this.http.post(url,form,{
      headers:{
        'Content-Type':'application/json',
        usuario:'gustavo'
      }
    })
  }

}
