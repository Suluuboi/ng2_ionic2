import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideShowPage } from './slide-show';

@NgModule({
  declarations: [
    SlideShowPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideShowPage),
  ],
})
export class SlideShowPageModule {}
