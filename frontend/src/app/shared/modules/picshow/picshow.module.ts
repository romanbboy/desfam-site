import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PicshowComponent} from "./components/picshow/picshow.component";
import {LightgalleryModule} from "lightgallery/angular";

@NgModule({
  imports: [CommonModule, LightgalleryModule],
  declarations: [PicshowComponent],
  exports: [PicshowComponent]
})
export class PicshowModule {}
