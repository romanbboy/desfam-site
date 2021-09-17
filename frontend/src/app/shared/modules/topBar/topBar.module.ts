import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TopBarComponent} from "./components/topBar/topBar.component";
import {PicshowModule} from "../picshow/picshow.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PicshowModule
  ],
  declarations: [TopBarComponent],
  exports: [TopBarComponent]
})
export class TopBarModule {}
