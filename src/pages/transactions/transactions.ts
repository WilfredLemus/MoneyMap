import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Transaction, IWallet } from '../../database';
import { AddingPage } from '../adding/adding';
import { WalletService } from '../../services/wallet.service';
import { TransactionService } from '../../services/transactions.service';

/*
  Generated class for the Transactions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class Transactions {

  transactions: any;
  walletActive: IWallet = {amount:0, name:""};
  carteraActName: string = "";
  carteraActAmount: number = 0;
  addingPage = AddingPage;

  constructor(public navCtrl: NavController, 
              private walletService: WalletService,
              private transactionService: TransactionService) {}

  ionViewWillEnter() {
    if(this.walletService.empty()){
      this.walletService.validateFirstWallet();
    }
    
    this.loadTransactions();
    this.loadWallet();
  }

  loadWallet(){
    this.walletService.getActive().then((wallet) => {
      this.walletActive = wallet;
    });
  }

  loadTransactions(){
    this.transactionService.all()
              .then((resultados) => {
                this.transactions = resultados
                // console.log(this.transactions);
              });
  }

}
