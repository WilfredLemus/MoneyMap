import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from 'ionic-native';

@Injectable()
export class GeolocationService{
    get(){
        // Return promise
        return Geolocation.getCurrentPosition();
    }
}