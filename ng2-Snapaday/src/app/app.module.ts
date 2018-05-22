import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SlideShowPage } from '../pages/slide-show/slide-show';
import { DataProvider } from '../providers/data/data';
import { AlertProvider } from '../providers/alert/alert';
import { DaysAgoPipe } from '../pipes/days-ago/days-ago';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SlideShowPage,
    DaysAgoPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SlideShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AlertProvider
  ]
})
export class AppModule {}
