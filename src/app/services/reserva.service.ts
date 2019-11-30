import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {
    private baseUrl = 'http://gy7228.myfoscam.org:8080/stock-pwfe/';
    idCliente: number;
    idProfesional: number;
    fechaInicio: string;
    fechaFin: string;
    urlActual: string;

    constructor(private http: HttpClient) {
        this.idCliente = null;
        this.idProfesional = null;
        this.fechaFin = null;
        this.fechaInicio = null;
    }

    getTodasLasReservas() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.idCliente = null;
        this.idProfesional = null;
        this.fechaFin = null;
        this.fechaInicio = null;
        this.crearURL();
        return this.http.get(this.urlActual, { headers });

    }
    getReservas(fechaI: string, fechaF: string, idCli: number, idEmp: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.fechaInicio = fechaI;
        this.fechaFin = fechaF;
        this.idCliente = idCli;
        this.idProfesional = idEmp;
        this.crearURL();
        return this.http.get(this.urlActual, { headers });
    }

    postReserva(datos) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'usuario': 'ana'
        });
        const URL = this.baseUrl + 'reserva/';
        return this.http.post(URL, datos, { headers });
    }
    deleteReserva(id) {
        const URL = this.baseUrl + 'reserva/' + id;
        return this.http.delete(URL);
    }
    putReserva(datos) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const URL = this.baseUrl + 'reserva/';
        /* const json = JSON.stringify(datos)
        console.log(json) */
        return this.http.put(URL, datos, { headers });
    }
    crearURL() {
        this.urlActual = this.baseUrl + 'reserva';
        // si existe algun filtro
        let coma = false;
        if (
            this.idCliente != null ||
            this.idProfesional != null ||
            this.fechaFin != null ||
            this.fechaInicio != null
        ) {
            this.urlActual = this.urlActual + '?ejemplo=%7B';
            if (this.idProfesional != null) {
                this.urlActual = this.urlActual + '"idEmpleado"%3A%7B"idPersona"%3A' + this.idProfesional + '%7D';
                coma = true;
            }
            if (this.idCliente != null) {
                if (coma) {
                    this.urlActual = this.urlActual + ',';
                }
                this.urlActual = this.urlActual + '"idCliente"%3A%7B"idPersona"%3A' + this.idCliente + '%7D';
                coma = true;
            }
            if (this.fechaInicio != null) {
                if (coma) {
                    this.urlActual = this.urlActual + ',';
                }
                this.urlActual = this.urlActual + '"fechaDesdeCadena"%3A"' + this.fechaInicio + '"';
                coma = true;
            }
            if (this.fechaFin != null) {
                if (coma) {
                    this.urlActual = this.urlActual + ',';
                }
                this.urlActual = this.urlActual + '"fechaHastaCadena"%3A"' + this.fechaFin + '"';
                coma = true;
            }
            this.urlActual = this.urlActual + '%7D';
        }
    }
}