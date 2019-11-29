import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { PacienteService } from "src/app/services/paciente.service";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-editor-paciente",
  templateUrl: "./editor-paciente.page.html",
  styleUrls: ["./editor-paciente.page.scss"]
})
export class EditorPacientePage implements OnInit {
  action = "Nuevo";
  forma;
  routerData;

  constructor(
    public datePipe: DatePipe,
    public pacienteService: PacienteService,
    public router: Router,
    public route: ActivatedRoute,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      apellido: new FormControl("", [Validators.required]),
      telefono: new FormControl(""),
      ruc: new FormControl(""),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      cedula: new FormControl(""),
      tipoPersona: new FormControl("FISICA"),
      fechaNacimiento: new FormControl("")
    });
    if (this.router.getCurrentNavigation().extras["state"]) {
      this.routerData = this.router.getCurrentNavigation().extras.state[
        "paciente"
      ];
      if (this.routerData) {
        this.action = "Editar";
        this.forma.patchValue(this.routerData);
      }
    }
  }

  dateChange(event) {
    let fecha = this.datePipe.transform(
      event.target.value,
      "yyyy-MM-dd hh:mm:ss"
    );
    this.forma.patchValue({
      fechaNacimiento: fecha
      // formControlName2: myValue2 (can be omitted)
    });
    console.log(this.forma.value);
    console.log(this.forma);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  submit() {
    if (this.action == "Nuevo") {
      this.pacienteService.post(this.forma.value).subscribe(res => {
        console.log(res);
        this.presentToast("Creado correctamente");
        this.router.navigate(["pacientes"]);
      },(err)=>{
        this.presentToast("No se pudo realizar la operacion");
      });
    }
    if (this.action == "Editar") {
      let fecha = this.datePipe.transform(
        this.forma.fechaNacimiento,
        "yyyy-MM-dd hh:mm:ss"
      );
      this.forma.patchValue({
        fechaNacimiento: fecha
        // formControlName2: myValue2 (can be omitted)
      });
      let editado = {
        ...this.forma.value,
        idPersona: this.routerData.idPersona
      };
      console.log(editado);
      this.pacienteService.put(editado).subscribe(res => {
        console.log(res);
        this.router.navigate(["pacientes"]);
        this.presentToast("Editado correctamente");
      },(err)=> {
        this.presentToast("No se realizo la edicion");
      });
    }
  }
}
