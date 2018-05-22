import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapsProvider {
  mapElement: any;
  pleaseConnect: any;
  map: GoogleMap;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver:any;
  apikey: string;
  currentMarker: any;

  constructor(public connectivityService: ConnectivityProvider, private geolocation:Geolocation) {
    console.log('Hello GoogleMapsProvider Provider');
  }

loadMap() {

   let mapOptions: GoogleMapOptions = {
     camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

   this.map = GoogleMaps.create('map_canvas', mapOptions);

   // Wait the MAP_READY before using any methods.
   this.map.one(GoogleMapsEvent.MAP_READY)
     .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            });
        });
     });
  }

  init(mapElement:any, pleaseConnect:any):Promise<any>{
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();

  }

  loadGoogleMaps():Promise<any>{
    return new Promise();

  }

  initMap():Promise<any>{

  }

  disableMap():void{

  }

  enableMap():void{

  }

  addConnectivityListeners():void{

  }

  changeMarker(lat:number, lng:number):void{

  }
}
