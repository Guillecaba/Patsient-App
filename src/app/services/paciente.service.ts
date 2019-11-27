import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private  URL = "https://gy7228.myfoscam.org:8443/stock-pwfe/"

  constructor(public http: HttpClient) { }


  public get(filters) {
    let separator = '?'
    let url = this.URL + "persona"
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
}
