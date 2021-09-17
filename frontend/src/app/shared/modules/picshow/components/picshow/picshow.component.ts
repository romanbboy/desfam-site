import {AfterViewChecked, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import {LightGallery} from "lightgallery/lightgallery";
import {AvatarType} from "../../../../types/avatar.type";

@Component({
  selector: 'app-picshow',
  templateUrl: './picshow.component.html',
  styleUrls: ['./picshow.component.scss']
})
export class PicshowComponent implements OnChanges, AfterViewChecked{
  @Input('picture') pictureProps: AvatarType
  private lightGallery!: LightGallery;
  private needRefresh: boolean = false

  settings = {
    counter: false,
    download: false,
    backdropDuration: 200,
    enableDrag: false,
    plugins: [lgZoom],
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pictureProps && !changes.pictureProps.firstChange) this.needRefresh = true
  }

  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false
    }
  }

  onInitGallery = (detail): void => {
    this.lightGallery = detail.instance
  }


}
