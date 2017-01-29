import { Injectable } from '@angular/core';
import { Transaction } from '../database';
import { WalletService } from './wallet.service';



@Injectable()
export class TransactionService{
  constructor(private wallerService: WalletService){

  }

  all(): any{
    return Transaction.all(this.wallerService.getID());
  }


}