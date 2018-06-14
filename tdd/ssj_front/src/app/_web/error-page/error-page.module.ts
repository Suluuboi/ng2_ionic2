import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { ErroPageRoutingModule } from './erro-page.routing';

@NgModule({
  imports: [
    CommonModule,
    ErroPageRoutingModule
  ],
  declarations: [
    ErrorPageComponent
  ]
})
export class ErrorPageModule { }
