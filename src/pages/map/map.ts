import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';
import { GeolocationService } from '../../services/geolocation.service';
import { TransactionService } from '../../services/transactions.service';
import { Transaction } from '../../database';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap = null;
  loader: any;

  constructor(public navCtrl: NavController, 
              public geolocator: GeolocationService,
              private transactionService: TransactionService,
              public loadingCtrl: LoadingController) 
  {
    this.loader = this.loadingCtrl.create({
      content: "Porfavor espere...",
    });
  }

  ionViewDidEnter() {
    this.loader.present();
    this.geolocator.get().then((resultado) => {
      this.loadMap(resultado.coords.latitude, resultado.coords.longitude);
      this.loader.dismiss();
    }).catch((erro) => console.log(erro));
  }

  loadMarkers(){
    this.loader.present();
    this.transactionService.all().then((resultado) => this.loadTransactionMarkers(resultado));
  }

  loadTransactionMarkers(transactions){
    for(var i = 0; i < transactions.length; ++i){
      let transaction =  transactions[i];

      if(!transaction.hasLocation()) continue;

      let markerLocation: GoogleMapsLatLng = new GoogleMapsLatLng(transaction.lat, transaction.lng);
      let marketOptions: GoogleMapsMarkerOptions = {
        position: markerLocation,
        title: transaction.title,
        icon: transaction.getImage()
      }

      this.map.addMarker(marketOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      }).catch(erro => console.log(erro));
    }
    this.loader.dismiss();
  }

  loadMap(lat, lng){
    let location: GoogleMapsLatLng = new GoogleMapsLatLng(lat, lng);
    this.map = new GoogleMap("map", {
      'controls':{
        'compass':true,
        'myLocationButton':true,
        'indoorPicker':true,
        'zoom':true
      },
      'gestures':{
        'scroll':true,
        'tilt':true,
        'rotate':true,
        'zoom':true
      },
      'camera':{
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => this.loadMarkers());
  }

}
