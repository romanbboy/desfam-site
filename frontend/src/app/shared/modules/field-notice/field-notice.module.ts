import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldNoticeComponent } from './components/field-notice/field-notice.component';



@NgModule({
  declarations: [
    FieldNoticeComponent
  ],
  exports: [
    FieldNoticeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FieldNoticeModule { }
