import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Transactions } from '../pages/transactions/transactions';
import { AddingPage } from '../pages/adding/adding';
import { MapPage } from '../pages/map/map';
import { GeolocationService } from '../services/geolocation.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Transactions,
    AddingPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Transactions,
    AddingPage,
    MapPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    GeolocationService
  ]
})
export class AppModule {}
