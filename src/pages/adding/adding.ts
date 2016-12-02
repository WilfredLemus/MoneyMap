import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Transaction } from '../../database';
import { GeolocationService } from '../../services/geolocation.service';
import { Camera, CameraOptions } from 'ionic-native';

/*
  Generated class for the Adding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html'
})
export class AddingPage {

  model: Transaction;
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;
  imageData: string;
  loader: any;
  
  constructor(public navCtrl: NavController, public geolocator: GeolocationService, public loadingCtrl: LoadingController) {
    this.model =  new Transaction(null, "");
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
      this.model.save().then(result => {
        this.model =  new Transaction(null, "");
        this.navCtrl.pop();
      });
    }
  }
}
