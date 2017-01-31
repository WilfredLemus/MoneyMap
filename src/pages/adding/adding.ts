import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { Transaction } from '../../database';
import { GeolocationService } from '../../services/geolocation.service';
import { WalletService } from '../../services/wallet.service';
import { TransactionService } from '../../services/transactions.service';


@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html'
})
export class AddingPage {

  model: Transaction;
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;
  imageData: string;
  income: boolean = false;
  loader: any;
  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public geolocator: GeolocationService, 
              private walletService: WalletService,
              private transactionService: TransactionService) {
    this.model = this.cleanTransaction();
    this.loader = this.loadingCtrl.create({
      content: "Porfavor espere...",
    });
  }

  ionViewDidLoad() {
    
  }

  getLocation(){
    if(this.shouldGeolocate){
      this.loader.present();
      this.shouldSend = false;
      this.geolocator.get().then((resultado) => {
        this.model.setCoords(resultado.coords);
        console.log(this.model);
        this.shouldSend = true;
        this.loader.dismiss();
      }).catch((erro) => console.log(erro));
    }else{
      this.model.cleanCoords();
      console.log(this.model);
    }
  }

  getPhoto(){
    let cameraOptions: CameraOptions = {
      quality: 20,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      targetWidth: 100,
      targetHeight: 100
    };
    Camera.getPicture(cameraOptions).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      this.imageData = base64Image;
      this.model.imageURL = this.imageData;
    }).catch(erro => console.log(erro));
  }

  save(){
    if(this.shouldSend){
      this.model.amount = this.convertAmountToInt();
      this.transactionService.save(this.model).then(result => {
        this.model =  this.cleanTransaction();
        this.navCtrl.pop();
      });
      // this.model.save().then(result => {
      //   this.model =  this.cleanTransaction();
      //   this.navCtrl.pop();
      // });
    }
  }

  cleanTransaction(): Transaction{
    let transaction = new Transaction(null, "");
    transaction.walletId = this.walletService.getID();
    return transaction;
  }

  convertAmountToInt(){
    let amount = parseInt(this.model.amount+"");

    if(!this.income) amount = amount * -1; //Convertimos el monto a negativo
    
    return amount;
  }
}
