import { Injectable } from '@angular/core';
//mport { HttpClient, HttpHeaders } from "@angular/common/http";
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
/*
  Generated class for the ConnectivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityProvider {
  onDevice: boolean;

  constructor(public network: Network, public platform: Platform) {
    // console.log('Hello ConnectivityProvider Provider');
    this.onDevice = this.platform.is('cordova');
  }

  isOnline():boolean {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        //if (this.network.type === 'wifi') {
          console.log('this.network.type:'+ this.network.type);
        //}
      }, 3000);
      //connectSubscription.unsubscribe();
      return true;
    });
  }

  isOffline():boolean {
    let disconnectSubscription = this.network.onDisconnect()
    .subscribe(() => {
      console.log('network was disconnected :-(');
      //connectSubscription.unsubscribe();
      return false;
      }
    );
  }

}
