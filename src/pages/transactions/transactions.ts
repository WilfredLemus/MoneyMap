import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Transaction } from '../../database';
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
  addingPage = AddingPage;

  constructor(public navCtrl: NavController, 
              private walletService: WalletService,
              private transactionService: TransactionService) {}

  ionViewWillEnter() {
    if(this.walletService.empty()){
      this.walletService.validateFirstWallet();
    }
    
    this.loadTransactions();
  }

  loadTransactions(){
    this.transactionService.all()
              .then((resultados) => {
                this.transactions = resultados
                // console.log(this.transactions);
              });
  }

}
