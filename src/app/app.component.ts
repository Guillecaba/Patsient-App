import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Pacientes',
      url: '/pacientes',
      icon: 'contact'
    },
    {
      title: 'Reserva',
      url: '/home',
      icon: 'bookmark'
    },
    {
      title: 'Ficha',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Reservas',
      url: '/reserva',
      icon: 'clipboard'
    },
    {
      title: 'Añadir archivo',
      url: '/archivo',
      icon: 'image'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router
  ) {
    this.initializeApp();
  }

  logout() {
    localStorage.setItem('logged',null);
    this.router.navigate(['login'])
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
