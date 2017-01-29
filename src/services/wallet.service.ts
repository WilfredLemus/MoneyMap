import { Injectable } from '@angular/core';
import { Wallet } from '../database';

export const StorageKey = "walletID";

@Injectable()
export class WalletService{

  setID(walletID){
    localStorage.setItem(StorageKey, walletID);
  }

  getID() : number{
    return parseInt(localStorage.getItem(StorageKey));
  }

  empty(): boolean{
    return !localStorage.getItem(StorageKey);
  }

  validateFirstWallet(){
    // Devuelve una promesa
    return new Promise((resolve, reject) => {
      // Pedimos la Primera cartera
      Wallet.first().then((wallet) => {
        // Comprobamos si existe la primera cartera
        if(!wallet){
          //Crea la primera cartera
          console.log("NO existe primera cartera");
          Wallet.createFirst().then((newwallet) => {
            this.setID(newwallet);
            resolve();
          });
        }else{
          console.log("Existe primera cartera");
          this.setID(wallet.id);
          resolve();
        }
      });
    });
  }
  
}