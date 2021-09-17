import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {NoticeType} from "../../../shared/types/notice.type";
import {select, Store} from "@ngrx/store";
import {errorsSelector, isSubmittingSelector} from "../../store/selectors";
import {loginAction} from "../../store/actions/login.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup

  isSubmitting$: Observable<boolean>
  errors$: Observable<NoticeType>

  constructor (private fb: FormBuilder, private store: Store) {
  }

  ngOnInit (): void {
    this.initValues();
    this.initForm();
  }

  initValues (): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(errorsSelector))
  }

  initForm (): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  getField (field) {
    return this.form.get(field);
  }

  onSubmit (): void {
    if (this.form.valid) {
      this.store.dispatch(loginAction({request: this.form.value}))
    }
  }
}
