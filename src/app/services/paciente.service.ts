import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private  URL = "https://gy7228.myfoscam.org:8443/stock-pwfe/"
  constructor(public http: HttpClient) { }


  public all() {
    let url = this.URL + "persona"
    return this.http.get(url)
  }

  public get(filters) {
    let separator = '?';
    let url = this.URL + "persona";
    for (let k in filters) {
      if (filters[k] == null) {
        continue
      }
      url = url + separator + k + "=" + filters[k]
      separator = "&"
    }
    console.log(url)
    return this.http.get(url)
  }

  public getTodos() {
    let url = this.URL + 'persona?orderBy=apellido&orderDir=asc';
    return this.http.get(url);
  }

  public getTodosEmpleados() {
    let url = this.URL + 'persona?orderBy=apellido&orderDir=asc&ejemplo=%7B"soloUsuariosDelSistema"%3Atrue%7D';
    return this.http.get(url);
  }


  public post(data) {
    const body = JSON.stringify(data);
    let url = this.URL + "persona"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.post(url, data, { headers })
  }

  public put(data) {
    const body = JSON.stringify(data);
    let url = this.URL + "persona/"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.put(url, data, { headers })
  }

  public delete(id) {
    let url = this.URL + "persona/" + id
    return this.http.delete(url)
  }


}
