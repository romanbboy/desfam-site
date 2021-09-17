import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
  @Input('disabled') disabledProps: boolean
  @Input('isSubmitting') isSubmittingProps: boolean
  @Input('classes') classesProps: string[]
}
