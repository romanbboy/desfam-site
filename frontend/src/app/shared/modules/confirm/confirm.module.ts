import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmComponent } from './components/confirm.component';

@NgModule({
  declarations: [
    ConfirmComponent
  ],
  exports: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule
  ]
})
export class ConfirmModule { }
