import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert.component';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    AlertComponent
  ],
  exports: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class AlertModule { }
