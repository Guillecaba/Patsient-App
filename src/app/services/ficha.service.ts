import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Ficha } from '../models/ficha';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  private url_base = 'https://gy7228.myfoscam.org:8443/stock-pwfe/fichaClinica';

  constructor(private http: HttpClient) { }

  listado (filtros:any){

    let query:any = {}
    for (let k in filtros){
      let filtro = filtros[k]
      if(filtro){
        query[k] = filtro
      }
    }

    let url:string = this.url_base + '?ejemplo=' + encodeURIComponent(JSON.stringify(query))

    return this.http.get<Ficha []>(url)
  }


}
