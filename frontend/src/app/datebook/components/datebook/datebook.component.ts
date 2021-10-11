import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {infoDatebookSelector} from "../../store/selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../../../auth/store/selectors";
import {getDatebookAction} from "../../store/actions/getDatebook.action";
import {ActivatedRoute} from "@angular/router";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, map, take, tap} from "rxjs/operators";
import {UserService} from "../../../shared/services/user.service";
import {SettingsAddParticipantInterface} from "../../types/settingsAddParticipant.interface";
import {InvitationService} from "../../../shared/services/invitation.service";
import {AlertService} from "../../../shared/services/alert.service";
import {ConfirmService} from "../../../shared/modules/confirm/services/confirm.service";
import {DatebookService} from "../../../shared/services/datebook.service";
import {deleteParticipantAction} from "../../store/actions/deleteParticipant.action";

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
  infoDatebook: DatebookInterface

  currentUser$: Observable<CurrentUserInterface>
  infoDatebook$: Observable<DatebookInterface | null>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datebookService: DatebookService,
    private userService: UserService,
    private invitationService: InvitationService,
    private alertService: AlertService,
    private confirmService: ConfirmService
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
        .pipe(
          tap(() => {
            this.settingsAddParticipant = {};
          }),
          debounceTime(800)
        )
        .subscribe(v => {
          if (this.addParticipantForm.valid) this.searchParticipant(v.email);
        })
    )

    this.subscription.add(
      this.infoDatebook$.subscribe(datebook => {
        this.infoDatebook = datebook;
      })
    );
  }

  closeSettings(): void {
    this.settingsShow = false;
    this.settingsTarget = null;
  }

  // Блок добавления нового участника
  searchParticipant(email) {
    this.settingsAddParticipant = {notice: 'Ищем...', typeNotice: 'standard'}
    this.userService.findOne('email', email).subscribe(user => {
      let participant = user;
      let notice = user ? `${user.username} найден` : 'Пользователь не найден';
      let typeNotice = user ? 'success' : 'error';

      if (user && this.infoDatebook.participants.find(el => el.id === user.id)) {
        participant = null;
        notice = `${user.username} уже участник этого ежедневника`
        typeNotice = 'error';
      }

      this.settingsAddParticipant = {
        user: participant,
        notice, typeNotice
      }
    })
  }

  closeAddParticipant(): void {
    this.settingsShow = false;
    this.settingsTarget = null;
    this.settingsAddParticipant = {};
    this.addParticipantForm.reset();
  }

  onAddParticipant(): void {
    if (this.settingsAddParticipant.user) {
      this.settingsAddParticipant = {...this.settingsAddParticipant, isSubmitting: true};
      const invite = {
        datebook: this.infoDatebook,
        referral: this.settingsAddParticipant.user
      };

      this.invitationService.add(invite)
        .subscribe(res => {
          this.alertService.success(res);
          this.settingsAddParticipant = {};
          this.addParticipantForm.reset();
        }, err => {
          this.alertService.error(err.error);
        }, () => {
          this.settingsAddParticipant = {...this.settingsAddParticipant, isSubmitting: false};
        })
    }
  }

  // Блок удаления участника
  confirmRemove({datebook, participant}): void {
    this.confirmService.confirm({
      msg: `Убрать ${participant.username} из ежедневника?`,
      accept: () => {
        this.store.dispatch(deleteParticipantAction({datebook, participant}));
      }
    });
  }

}
