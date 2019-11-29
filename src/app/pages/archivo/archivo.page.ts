import { Component, OnInit } from '@angular/core';
import { ArchivoService } from '../../services/archivo.service';
import { Archivo } from '../../models/file';
import { AlertController, LoadingController } from '@ionic/angular';

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

  idFicha: string = null;

  selectedFile: any;

  realInput: any;

  archis: any[];
  cantArchivos: number;

  constructor(
    public _archivoService: ArchivoService,
    public alertCtrl: AlertController,
    public loading: LoadingController
  ) { }

  ngOnInit() {
    this._archivoService.getArchivos().subscribe(res => {
      this.archis = res.lista;
      this.cantArchivos = res.totalDatos;
    });
    this.realInput = document.getElementById('fileSelect');
  }

  actualizarLista() {
    if (this.idFicha !== '' && this.idFicha !== null) {
      this._archivoService.getArchivos(this.idFicha).subscribe(res => {
        this.archis = res.lista;
        this.cantArchivos = res.totalDatos;
        this.archivo.idFichaClinica = this.idFicha;
      });
    } else {
      this._archivoService.getArchivos().subscribe(res => {
        this.archis = res.lista;
        this.cantArchivos = res.totalDatos;
        this.archivo.idFichaClinica = null;
      });
    }

  }

  abrirArchivo() {
    this.realInput.click();
  }

  abrirArchivo2(event) {
    this.archivo.file = event.target.files[0];
    this.archivo.nombre = event.target.files[0].name;
    this.archivo.idFichaClinica = this.idFicha;
  }

  async subirArchivo() {
    const formImagen = new FormData();
    formImagen.append('file', this.archivo.file);
    formImagen.append('nombre', this.archivo.nombre);
    formImagen.append('idFichaClinica', this.archivo.idFichaClinica);
    const loading = await this.loading.create({
      spinner: 'crescent',
      message: 'Subiendo archivo...'
    });
    await loading.present();
    this._archivoService.postArchivo(formImagen).subscribe(e => {
      loading.dismiss();
      this.showExitoAdd();
      this.actualizarLista();
    }, err => {
      if (err.status === 200) {
        loading.dismiss();
        this.showExitoAdd();
        this.actualizarLista();
      } else {
        loading.dismiss();
        this.showErrorAdd();
      }
    });
  }

  quitarArchivo() {
    this.archivo.nombre = '';
    this.archivo.file = null;
    this.archivo.idFichaClinica = null;
    this.idFicha = null;
    this.actualizarLista();
  }

  async borrarArchivo(id) {
    const loading = await this.loading.create({
      spinner: 'crescent',
      message: 'Eliminando...'
    });
    await loading.present();
    this._archivoService.deleteArchivo(id).then(e => {
      loading.dismiss();
      this.showExitoDel();
      this.actualizarLista();
    }, err => {
      loading.dismiss();
      this.showErrorDel();
    });
  }

  async confirmarBorrar(id) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar archivo',
      message: '¿Está seguro de que quiere eliminar este archivo?',
      buttons: [{
        text: 'Eliminar',
        handler: () => {
          this.borrarArchivo(id);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      }]
    });
    await alert.present();
  }

  async showExitoAdd() {
    const alert = await this.alertCtrl.create({
      header: '¡Subida exitosa!',
      message: 'El archivo se ha subido exitosamente',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async showExitoDel() {
    const alert = await this.alertCtrl.create({
      header: '¡Borrado exitoso!',
      message: 'El archivo se ha borrado exitosamente',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async showErrorAdd() {
    const alert = await this.alertCtrl.create({
      header: '¡Error!',
      message: 'Se ha producido un error al intentar subir el archivo',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async showErrorDel() {
    const alert = await this.alertCtrl.create({
      header: '¡Error!',
      message: 'Se ha producido un error al intentar borrar el archivo',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
