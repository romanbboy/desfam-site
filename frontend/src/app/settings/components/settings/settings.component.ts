import {Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {Observable, Subscription} from "rxjs";
import {currentUserSelector} from "../../../auth/store/selectors";
import {filter} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {updateCurrentUserAction} from "../../../auth/store/actions/updateCurrentUser.action";
import {NoticeType} from "../../../shared/types/notice.type";
import {avatarSelector, errorsSelector, isSubmittingSelector, successSelector} from "../../store/selectors";
import {clearNoticeSettingsAction, setAvatarSettingsAction} from "../../store/actions/sync.action";
import {DomSanitizer} from "@angular/platform-browser";
import {AvatarType} from "../../../shared/types/avatar.type";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy{
  form: FormGroup

  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription

  isSubmitting$: Observable<boolean>
  errors$: Observable<NoticeType>
  success$: Observable<NoticeType>
  avatarSettings$: Observable<AvatarType>

  constructor(private store: Store, private fb: FormBuilder, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.initValues()
    this.initListeners()
  }

  ngOnDestroy(): void {
    this.store.dispatch(setAvatarSettingsAction({avatar: this.currentUser.avatar}))
    this.store.dispatch(clearNoticeSettingsAction())
    this.currentUserSubscription.unsubscribe();
  }

  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.errors$ = this.store.pipe(select(errorsSelector))
    this.success$ = this.store.pipe(select(successSelector))
    this.avatarSettings$ = this.store.pipe(select(avatarSelector))
  }

  initListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initForm();
      })
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [this.currentUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      position: [this.currentUser.position, [Validators.maxLength(20)]],
      avatar: '',
      password: ['', Validators.minLength(5)]
    })
  }

  getField (field) {
    return this.form.get(field);
  }

  onAvatarChange = (event) => {
    const [file] = event.target.files;
    const avatar = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))

    this.form.patchValue({avatar: file});
    this.store.dispatch(setAvatarSettingsAction({avatar}))
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(updateCurrentUserAction({currentUserInput: this.form.value}))
    }
  }
}

