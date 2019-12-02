import { Component, OnInit } from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  ToastController
} from "@ionic/angular";
import { PacienteService } from "src/app/services/paciente.service";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage implements OnInit {
  pacientes;
  count;
  usuarioSistema;
  busquedaExacta = false;
  like = "S";
  constructor(
    public pacienteService: PacienteService,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  onChange(event) {
    const value = event.target.value;
    /* this.busqueda */
    console.log(value);
  }

  toggleExacta(event) {
    this.usuarioSistema = false;
    /* this.busquedaExacta = event */
  }

  toggleFisio(event) {
    this.busquedaExacta = false;
    console.log(this.usuarioSistema);
    if (this.usuarioSistema) {
      this.pacienteService
        .get({
          ejemplo: encodeURIComponent(
            JSON.stringify({
              soloUsuariosDelSistema: this.usuarioSistema
            })
          )
        })
        .subscribe(response => {
          this.pacientes = response["lista"];
          this.count = response["totalDatos"];
        });
    } else {
      this.pacienteService.get({}).subscribe(response => {
        this.pacientes = response["lista"];
        this.count = response["totalDatos"];
      });
    }
  }

  

  searchByName(event) {
    this.usuarioSistema = false;
    const name = event.target.value;
    /* /stock-pwfe/persona?ejemplo={"soloUsuariosDelSistema":true} */

    if (this.busquedaExacta) {
      this.pacienteService
        .get({
          ejemplo: encodeURIComponent(
            JSON.stringify({
              nombre: name
            })
          )
        })
        .subscribe(response => {
          this.pacientes = response["lista"];
          this.count = response["totalDatos"];
        });
    } else {
      console.log("Busque");
      this.pacienteService
        .get({
          like: this.like,
          ejemplo: encodeURIComponent(
            JSON.stringify({
              nombre: name
            })
          )
        })
        .subscribe(response => {
          this.pacientes = response["lista"];
          this.count = response["totalDatos"];
        });
    }
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
      header: "",
      message: "Estas seguro de borrar este paciente?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Confirmar",
          handler: () => {
            this.pacienteService.delete(paciente["idPersona"]).subscribe(
              () => {
                this.presentToast("Se borro correctamente");
                this.pacientes=null;
                
              },
              err => {
                this.presentToast("No se realizo con exito la operacion");
              }
            );
            console.log("Confirm Okay");
          }
        }
      ]
    });

    await alert.present();
  }
}
