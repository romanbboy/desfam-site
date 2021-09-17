import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {registrationAction} from "../../store/actions/registration.action";
import {errorSelector, isSubmittingSelector} from "../../store/selectors";
import {NoticeType} from "../../../shared/types/notice.type";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  form: FormGroup

  isSubmitting$: Observable<boolean>
  error$: Observable<NoticeType>

  constructor (private fb: FormBuilder, private store: Store) {
  }

  ngOnInit (): void {
    this.initValues();
    this.initForm();
  }

  initValues (): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  initForm (): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  getField (field) {
    return this.form.get(field);
  }

  onSubmit (): void {
    if (this.form.valid) {
      this.store.dispatch(registrationAction({request: this.form.value}))
    }
  }
}
