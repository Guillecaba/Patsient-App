import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaArchivo } from '../models/file';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArchivoService {
    private baseUrl = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo';
    constructor(private http: HttpClient) { }

    postArchivo(archivo: any) {
        const URL = this.baseUrl + '/archivo';
        return this.http.post(URL, archivo);
    }

    getArchivos(idFicha?: string) {
        let URL = this.baseUrl;
        if (idFicha != null) {
            URL = URL + '?idFichaClinica=' + idFicha;
        }
        return this.http.get(URL) as Observable<ListaArchivo>;
    }

    deleteArchivo(idArchivo: number) {
        const URL = this.baseUrl + '/' + idArchivo.toString();
        return this.http.delete(URL).toPromise().catch(this.handleError);
    }

    private handleError(error: any) {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

        return Promise.reject(error.message || error);
    }
}
