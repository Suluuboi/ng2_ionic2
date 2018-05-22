import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /* Initialize the map only when Ion View is loaded */
  ionViewDidLoad(){
      this.initializeMap();
  }

  initializeMap() {
 
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 
    this.geolocation.getCurrentPosition(locationOptions).then((position) => {
 
        let options = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        /* Show our lcoation */
        this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
 
        /* We can show our location only if map was previously initialized */
        this.showMyLocation();
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /*
 * This function will create and show a marker representing your location
 */
showMyLocation(){
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
    });
 
    let markerInfo = "<h4>You are here!</h4>";         
 
    let infoModal = new google.maps.InfoWindow({
        content: markerInfo
    });
 
    google.maps.event.addListener(marker, 'click', () => {
        infoModal.open(this.map, marker);
    });
  }
}
