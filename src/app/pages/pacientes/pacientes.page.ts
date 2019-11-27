import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
 // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pacientes;
  count=0;
  private pagination = {
    inicio: 0,
    cantidad: 10,
  }

  private orderBy = null;
  private orderDir = null;

  constructor(public pacienteService :PacienteService, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.getData()
      
    }
    getData(){
     

      this.pacienteService.get({
        ...this.pagination,
        orderBy:this.orderBy,
        orderDir:this.orderDir,
       
      })
      .subscribe((response)=>{
        this.pacientes = response['lista']
        this.count = response['totalDatos']
      })
    }

    doRefresh(event) {
      console.log('Begin async operation');
      this.pagination.inicio = 0;
      this.pacienteService.get({
        ...this.pagination
       
      })
      .subscribe((response)=>{
        this.pacientes = response['lista']
        this.count = response['totalDatos']
        event.target.complete();
      },(error)=>event.target.complete())
     
    }

    loadData(event) {

      this.pagination.inicio+=Number(this.pagination.cantidad);
      setTimeout(()=>{
        this.pacienteService.get({
          ...this.pagination
         
        })
        .subscribe((response)=>{
          this.pacientes = this.pacientes.concat(response['lista'])
          this.count = response['totalDatos']
          event.target.complete();
        })},1000

      )
      
        
        

      
    }

    onChange(event){
      console.log('ola')
      console.log()
      if(event.target.id =="cantidad"){
        this.pagination.inicio=0;
      }
      this.getData()
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        /* header: 'Albums', */
        buttons: [{
          text: 'Ver detalle',
          icon: 'eye',
          handler: () => {
            console.log('Ver clicked');
          }
        }, {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            console.log('Editar clicked');
          }
        },{
          text: 'Borrar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  
    /* toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }  */
  }


