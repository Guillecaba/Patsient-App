import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-paciente',
  templateUrl: './detail-paciente.page.html',
  styleUrls: ['./detail-paciente.page.scss'],
})
export class DetailPacientePage implements OnInit {
  paciente
  routerData
  constructor(public router: Router) { }

  ngOnInit() {
    if(this.router.getCurrentNavigation().extras['state']) {
      this.paciente = this.router.getCurrentNavigation().extras.state['paciente']
      
    }
  }

}
