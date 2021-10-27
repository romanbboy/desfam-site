import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {infoDatebookSelector, issuesSelector} from "../../store/selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../../../auth/store/selectors";
import {getDatebookAction} from "../../store/actions/getDatebook.action";
import {ActivatedRoute} from "@angular/router";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, tap} from "rxjs/operators";
import {UserService} from "../../../shared/services/user.service";
import {SettingsAddParticipantInterface} from "../../types/settingsAddParticipant.interface";
import {InvitationService} from "../../../shared/services/invitation.service";
import {AlertService} from "../../../shared/services/alert.service";
import {ConfirmService} from "../../../shared/modules/confirm/services/confirm.service";
import {DatebookService} from "../../../shared/services/datebook.service";
import {deleteParticipantAction} from "../../store/actions/deleteParticipant.action";
import {escapeDatebookAction} from "../../store/actions/escapeDatebook.action";
import * as moment from "moment";
import {Moment} from "moment";
import {getIssuesAction} from "../../store/actions/getIssues.action";
import {IssueFullInterface} from "../../../shared/types/issue.interface";
import {UsersIssuesInterface} from "../../types/usersIssues.interface";
import {UserInterface} from "../../../shared/types/user.interface";


interface IssuesMapInterface {
  [key: string]: {
    user: UserInterface,
    issues: IssueFullInterface[]
  }
}

@Component({
  selector: 'app-datebook',
  templateUrl: './datebook.component.html',
  styleUrls: ['./datebook.component.scss']
})
export class DatebookComponent implements OnInit, OnDestroy {
  settingsShow: boolean = false;
  settingsTarget: string | null = null;
  settingsAddParticipant: SettingsAddParticipantInterface = {};

  showIssueCreator: boolean = true;

  date: Moment;

  private subscription: Subscription = new Subscription();

  id: string;
  addParticipantForm: FormGroup;
  infoDatebook: DatebookInterface;

  currentUser$: Observable<CurrentUserInterface>;
  infoDatebook$: Observable<DatebookInterface | null>;
  issues$: Observable<IssueFullInterface[]>;

  usersIssues: UsersIssuesInterface[];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datebookService: DatebookService,
    private userService: UserService,
    private invitationService: InvitationService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {
    moment.locale('ru');
    this.date = moment();
  }

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
    this.issues$ = this.store.pipe(select(issuesSelector));
  }

  fetchData(): void {
    this.store.dispatch(getDatebookAction({id: this.id}));
    this.store.dispatch(getIssuesAction({idDatebook: this.id, date: moment()}));
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
    );

    this.subscription.add(
      this.infoDatebook$.subscribe(datebook => {
        this.infoDatebook = datebook;
      })
    );

    this.subscription.add(
      this.issues$.subscribe(issues => {
        const issuesMap: IssuesMapInterface = issues.reduce((res, item) => {
          if (!res[item.target.id]) res[item.target.id] = {user: item.target, issues: []};
          res[item.target.id].issues.push(item);

          return res;
        }, {});

        this.usersIssues = Object.entries(issuesMap).map(([key, obj]) => ({user: obj.user, issues: obj.issues}));
      })
    )
  }

  closeSettings(): void {
    this.settingsShow = false;
    this.settingsTarget = null;
  }

  // Блок добавления нового участника
  searchParticipant(email) {
    this.settingsAddParticipant = {notice: 'Ищем...', typeNotice: 'standard'};
    this.userService.findOne('email', email).subscribe(user => {
      let participant = user;
      let notice = user ? `${user.username} найден` : 'Пользователь не найден';
      let typeNotice = user ? 'success' : 'error';

      if (user && this.infoDatebook.participants.find(el => el.id === user.id)) {
        participant = null;
        notice = `${user.username} уже участник этого ежедневника`;
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

  // Блок Покинуть ежедневник
  confirmEscape(datebook: DatebookInterface): void {
    this.confirmService.confirm({
      msg: `Точно покинуть задачник?`,
      accept: () => {
        this.store.dispatch(escapeDatebookAction({datebook}));
      }
    });
  }

  // Изменить дату
  onSetDate(date: Date): void {
    const stringDate = moment(date).format('YYYY-MM-DD');
    const stringDateToday = moment().format('YYYY-MM-DD');

    this.showIssueCreator = !moment(stringDate).isBefore(stringDateToday);

    this.date = moment(date);
    this.store.dispatch(getIssuesAction({idDatebook: this.id, date: moment(date)}));
  }
}
