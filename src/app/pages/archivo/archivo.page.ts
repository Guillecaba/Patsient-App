import { Component, OnInit } from '@angular/core';
import { ArchivoService } from '../../services/archivo.service';
import { Archivo } from '../../models/file';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
})
export class ArchivoPage implements OnInit {

  archivo: Archivo = {
    nombre: '',
    file: null,
    idFichaClinica: null,
  };

  idFicha: string;

  selectedFile: any;

  realInput: any;

  archis: any[];
  cantArchivos: number;

  constructor(
    public _archivoService: ArchivoService
  ) { }

  ngOnInit() {
    this._archivoService.getArchivos().subscribe(res => {
      this.archis = res.lista;
      this.cantArchivos = res.totalDatos;
    });
    this.realInput = document.getElementById('fileSelect');
    console.log(this.realInput);
  }

  actualizarLista() {
    if (this.idFicha !== '' && this.idFicha !== null) {
      this._archivoService.getArchivos(this.idFicha).subscribe(res => {
        this.archis = res.lista;
        this.cantArchivos = res.totalDatos;
      });
    } else {
      this._archivoService.getArchivos().subscribe(res => {
        this.archis = res.lista;
        this.cantArchivos = res.totalDatos;
      });
    }

  }

  abrirArchivo() {
    this.realInput.click();
  }

  abrirArchivo2(event) {
    const formImagen = new FormData();
    this.archivo.file = event.target.files[0];
    this.archivo.nombre = event.target.files[0].name;
    this.archivo.idFichaClinica = this.idFicha;
    formImagen.append('file', this.archivo.file);
    formImagen.append('nombre', this.archivo.nombre);
    formImagen.append('idFichaClinica', this.archivo.idFichaClinica);
    this._archivoService.postArchivo(formImagen).then(e => { this.actualizarLista(); });
  }

  borrarArchivo(id) {
    this._archivoService.deleteArchivo(id).then(e => { this.actualizarLista(); });
  }

}
