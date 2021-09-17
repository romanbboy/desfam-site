import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-field-notice',
  templateUrl: './field-notice.component.html',
  styleUrls: ['./field-notice.component.scss']
})
export class FieldNoticeComponent implements OnInit, OnDestroy {
  @Input('field') fieldProps: AbstractControl
  private fieldSubscription: Subscription
  error: string | null

  constructor() { }

  ngOnInit(): void {
    this.fieldSubscription = this.fieldProps.valueChanges.subscribe(() => {
      if (this.fieldProps.errors) {
        switch (Object.keys(this.fieldProps.errors)[0]) {
          case 'required': this.error = `Обязательное поле`; break;
          case 'email': this.error = `Не верный формат Email`; break;
          case 'minlength':this.error = `Не менее ${this.fieldProps.errors['minlength'].requiredLength} символов`; break;
          case 'maxlength': this.error = `Не более ${this.fieldProps.errors['maxlength'].requiredLength} символов`; break;

          default: this.error = 'Ошибка'
        }
      }
      else this.error = null
    })
  }

  ngOnDestroy(): void {
    this.fieldSubscription.unsubscribe();
  }
}
