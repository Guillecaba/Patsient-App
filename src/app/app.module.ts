import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { FichaService } from './services/ficha.service';
import { SearchPage } from './pages/ficha/search/search.page';
import { SearchPageModule } from './pages/ficha/search/search.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    SearchPage
  ],
  imports: [
    BrowserModule,
    SearchPageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    StatusBar,
    FichaService,
    SplashScreen,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
