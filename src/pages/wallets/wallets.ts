import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { Wallet, IWallet } from '../../database';
import { NewWalletPage } from '../new-wallet/new-wallet';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html'
})
export class WalletsPage {

  wallets: IWallet[];
  addingWallet = NewWalletPage;
  walletSelect = this.walletService.getID();

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              private walletService: WalletService) {}

  ionViewWillEnter() {
    Wallet.all().then(results => this.wallets = results);
  }

  setWallet(wallet: Wallet){
    this.walletService.setID(wallet.id);
    this.ionViewWillEnter();
  }

  optionWallet(wallet: Wallet){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cartera: '+wallet.name,
      buttons: [
        {
          text: 'Editar',
          role: 'editwallet',
          icon: 'create',
          handler: () => {
            this.NewWallet(wallet);
          }
        },{
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Destructive clicked');
            this.deleteConfirm(wallet);
          }
        }
      ]
    });
    actionSheet.present();
  }

  NewWallet(wallet?: Wallet){
    let editWallet: Wallet;
    if(wallet) editWallet = wallet;
    this.navCtrl.push(this.addingWallet,{
            EditWallet: editWallet,
          });
  }

  deleteWallet(wallet: Wallet){
    Wallet.deleteWallet(wallet).then(() => {
      this.showToast('Cartera Eliminada', 'top');
      this.ionViewWillEnter();
    });
  }

  deleteConfirm(wallet: Wallet) {
    if(this.wallets.length == 1){
      this.showToast('Lo siento, no puede eliminar todas las carteras.', 'middle');
    }else{
      let confirm = this.alertCtrl.create({
        title: 'Eliminar Cartera?',
        message: 'Esta seguro de eliminar la cartera <b>'+wallet.name+'</b>?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.deleteWallet(wallet);
            }
          }
        ]
      });
    confirm.present();
    }
  }


  showToast(message: string, position: string){
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: position
      });
    toast.present();
  }
}
