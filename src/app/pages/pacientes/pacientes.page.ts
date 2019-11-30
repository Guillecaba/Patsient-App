import { Component, OnInit} from "@angular/core";
import { PacienteService } from "src/app/services/paciente.service";
import {  ToastController, AlertController } from "@ionic/angular";
import { ActionSheetController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-pacientes",
  templateUrl: "./pacientes.page.html",
  styleUrls: ["./pacientes.page.scss"]
})
export class PacientesPage implements OnInit {
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pacientes;
  count = 0;
  private pagination = {
    inicio: 0,
    cantidad: 10
  };

  private orderBy = null;
  private orderDir = null;

  constructor(
    public pacienteService: PacienteService,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getData();
  }

  ionViewDidEnter() {
    this.pagination.inicio = 0;
    this.getData();
  }
  getData() {
    this.pacienteService
      .get({
        ...this.pagination,
        orderBy: this.orderBy,
        orderDir: this.orderDir
      })
      .subscribe(response => {
        this.pacientes = response["lista"];
        this.count = response["totalDatos"];
      });
  }

  doRefresh(event) {
    console.log("Begin async operation");
    this.pagination.inicio = 0;
    this.pacienteService
      .get({
        ...this.pagination
      })
      .subscribe(
        response => {
          this.pacientes = response["lista"];
          this.count = response["totalDatos"];
          event.target.complete();
        },
        error => event.target.complete()
      );
  }

  loadData(event) {
    this.pagination.inicio += Number(this.pagination.cantidad);
    setTimeout(() => {
      this.pacienteService
        .get({
          ...this.pagination,
          orderBy: this.orderBy,
          orderDir: this.orderDir
        })
        .subscribe(response => {
          this.pacientes = this.pacientes.concat(response["lista"]);
          this.count = response["totalDatos"];
          event.target.complete();
        });
    }, 1000);
  }

  onChange(event) {
    console.log("ola");
    this.pagination.inicio = 0;
    console.log();
    if (event.target.id == "cantidad") {
      this.pagination.inicio = 0;
    }
    this.getData();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentActionSheet(paciente) {
    console.log(paciente);
    const actionSheet = await this.actionSheetController.create({
      /* header: 'Albums', */
      buttons: [
        {
          text: "Ver detalle",
          icon: "eye",
          handler: () => {
            let navigationExtras: NavigationExtras = {
              state: {
                paciente: paciente
              }
            };
            this.router.navigate(
              ["/pacientes/detail-paciente"],
              navigationExtras
            );
            console.log("Ver clicked");
          }
        },
        {
          text: "Editar",
          icon: "create",
          handler: () => {
            let navigationExtras: NavigationExtras = {
              state: {
                paciente: paciente
              }
            };
            this.router.navigate(
              ["/pacientes/editor-paciente"],
              navigationExtras
            );
            console.log("Editar clicked");
          }
        },
        {
          text: "Borrar",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.presentAlertConfirm(paciente)
           

            console.log("Delete clicked");
          }
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancelar clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }



  async presentAlertConfirm(paciente) {
    
    const alert = await this.alertController.create({
      header: '',
      message: 'Estas seguro de borrar este paciente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.pacienteService.delete(paciente["idPersona"]).subscribe(
              () => {
                this.presentToast("Se borro correctamente");
                this.getData();
              },
              err => {
                this.presentToast("No se realizo con exito la operacion");
              }
            );
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  /* toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }  */
}
