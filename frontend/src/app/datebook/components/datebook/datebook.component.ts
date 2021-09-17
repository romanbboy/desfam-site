import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {infoDatebookSelector} from "../../store/selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../../../auth/store/selectors";
import {getDatebookAction} from "../../store/actions/getDatebook.action";
import {ActivatedRoute} from "@angular/router";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {UserInterface} from "../../../shared/types/user.interface";
import {UserService} from "../../../shared/services/user.service";
import {SettingsAddParticipantInterface} from "../../types/settingsAddParticipant.interface";

@Component({
  selector: 'app-datebook',
  templateUrl: './datebook.component.html',
  styleUrls: ['./datebook.component.scss']
})
export class DatebookComponent implements OnInit, OnDestroy {
  settingsShow: boolean = false
  settingsTarget: string | null = null
  settingsAddParticipant: SettingsAddParticipantInterface = {}

  private subscription: Subscription = new Subscription()

  id: string
  addParticipantForm: FormGroup

  currentUser$: Observable<CurrentUserInterface>
  infoDatebook$: Observable<DatebookInterface | null>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initValues();
    this.fetchData();
    this.initForm();
    this.initListeners();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initValues(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.infoDatebook$ = this.store.pipe(select(infoDatebookSelector));
  }

  fetchData(): void {
    this.store.dispatch(getDatebookAction({id: this.id}))
  }

  initForm(): void {
    this.addParticipantForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  initListeners(): void {
    this.subscription.add(
      this.addParticipantForm
        .valueChanges
        .pipe(debounceTime(800))
        .subscribe(v => {
          if (this.addParticipantForm.valid) this.searchParticipant(v.email);
        })
    )
  }

  closeSettings(): void {
    this.settingsShow = false;
    this.settingsTarget = null;
  }

  searchParticipant(email) {
    this.settingsAddParticipant = {notice: 'Ищем...', typeNotice: 'standard'}
    this.userService.findOne('email', email).subscribe(user => {
      this.settingsAddParticipant = {
        user,
        notice: user ? `${user.username} найден` : 'Пользователь не найден',
        typeNotice: user ? 'success' : 'error'
      }
    })
  }

}
