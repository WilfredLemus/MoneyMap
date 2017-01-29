import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// PAGES
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Transactions } from '../pages/transactions/transactions';
import { AddingPage } from '../pages/adding/adding';
import { MapPage } from '../pages/map/map';
import { WalletsPage } from '../pages/wallets/wallets';
import { NewWalletPage } from '../pages/new-wallet/new-wallet';

// SERVICE
import { GeolocationService } from '../services/geolocation.service';
import { WalletService } from '../services/wallet.service';
import { TransactionService } from '../services/transactions.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Transactions,
    AddingPage,
    MapPage,
    WalletsPage,
    NewWalletPage
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
    MapPage,
    WalletsPage,
    NewWalletPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    GeolocationService,
    WalletService,
    TransactionService
  ]
})
export class AppModule {}
