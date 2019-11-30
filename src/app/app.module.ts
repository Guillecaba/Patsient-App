import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FichaService } from './services/ficha.service';
import { HttpClientModule } from '@angular/common/http';
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
    StatusBar,
    FichaService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
