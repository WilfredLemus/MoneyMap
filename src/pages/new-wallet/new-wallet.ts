import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Wallet, IWallet } from '../../database';


@Component({
  selector: 'page-new-wallet',
  templateUrl: 'new-wallet.html'
})
export class NewWalletPage {

  model: Wallet = new Wallet(null, "");
  // model: Wallet;
  EditWallet: Wallet;
  wallet: IWallet[];

  constructor(public navCtrl: NavController, public params:NavParams, public toastCtrl: ToastController,) {
    if(params.get("EditWallet")){
      this.EditWallet = params.get("EditWallet");
      Wallet.getWalletId(this.EditWallet).then((data) => {
        this.wallet = data;
        // this.model = new Wallet(this.wallet[0].amount, this.wallet[0].name, this.wallet[0].id);
        this.model.id = this.wallet[0].id;
        this.model.name = this.wallet[0].name;
        this.model.amount = this.wallet[0].amount;
      });
    }     
  }

  ionViewDidLoad() {}

  save(){
    if(this.wallet){
      this.model.updateWallet(this.model).then(() => {
        this.showToast('Cartera Editada', 'top');
        this.navCtrl.pop();
      });
    }else{
      this.model.save().then(() =>{
        this.showToast('Cartera Creada', 'top');
        this.navCtrl.pop();
      });
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
