import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data/data';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';


import { HttpClientModule } from '@angular/common/http';

// import { LocationPage } from '../pages/location/location';
// import { MyDetailsPage } from '../pages/my-details/my-details';
// import { CampDetailsPage } from '../pages/camp-details/camp-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage
    // LocationPage,
    // MyDetailsPage,
    // CampDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
    // LocationPage,
    // MyDetailsPage,
    // CampDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    GoogleMapsProvider,
    ConnectivityProvider
  ]
})
export class AppModule {}
