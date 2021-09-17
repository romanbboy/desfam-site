import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  @Input('title') titleProps: string
  @Input('accept') acceptProps: string | null
  @Input('onChange') onChangeProps: Function
}
