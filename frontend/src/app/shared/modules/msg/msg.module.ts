import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsgComponent} from './components/msg/msg.component';
import {MessagesModule} from "primeng/messages";
import {SharedModule} from "primeng/api";


@NgModule({
  declarations: [
    MsgComponent
  ],
  exports: [
    MsgComponent
  ],
  imports: [
    CommonModule,
    MessagesModule,
    SharedModule
  ]
})
export class MsgModule { }
