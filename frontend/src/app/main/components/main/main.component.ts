import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {showAddNewDatebookAction} from "../../store/actions/sync.action";
import {
  datebookListSelector, errorAddNewDatebookSelector, invitationsSelector,
  isSubmittingAddNewDatebookSelector,
  showAddNewDatebookSelector
} from "../../store/selectors";
import {Observable, Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {addDatebookAction, addDatebookSuccessAction} from "../../store/actions/addDatebook.action";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {NoticeType} from "../../../shared/types/notice.type";
import {getAllDatebooksAction} from "../../store/actions/getAllDatebooks.action";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../../../auth/store/selectors";
import {filter} from "rxjs/operators";
import {Actions, ofType} from "@ngrx/effects";
import {InviteInterface} from "../../../shared/types/invite.interface";
import {getAllInvitationAction} from "../../store/actions/getAllInvitation.action";
import {
  acceptInvitationAction, acceptInvitationFailureAction,
  acceptInvitationSuccessAction,
  rejectInvitationAction, rejectInvitationFailureAction, rejectInvitationSuccessAction
} from "../../store/actions/invitation.action";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  form: FormGroup
  showAddNewDatebook$: Observable<boolean>
  errorAddNewDatebook$: Observable<NoticeType>
  isSubmittingAddNewDatebook$: Observable<boolean>
  datebookList$: Observable<Array<DatebookInterface>>
  invitations$: Observable<InviteInterface[]>
  currentUser: CurrentUserInterface

  invitations: Array<InviteInterface>
  submitInvite: string | null;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store, private fb: FormBuilder, private actions: Actions) { }

  ngOnInit(): void {
    this.initValues();
    this.initForm();
    this.initListeners();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initValues(): void {
    this.showAddNewDatebook$ = this.store.pipe(select(showAddNewDatebookSelector));
    this.errorAddNewDatebook$ = this.store.pipe(select(errorAddNewDatebookSelector));
    this.isSubmittingAddNewDatebook$ = this.store.pipe(select(isSubmittingAddNewDatebookSelector));
    this.datebookList$ = this.store.pipe(select(datebookListSelector));
    this.invitations$ = this.store.pipe(select(invitationsSelector));
  }

  initForm(): void {
    this.form = this.fb.group({
      datebook: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  initListeners(): void {
    this.subscription.add(
      this.store
        .pipe(select(currentUserSelector), filter(Boolean))
        .subscribe((currentUser: CurrentUserInterface) => {
          this.currentUser = currentUser;
          this.fetchData();
        })
    );

    this.subscription.add(
      this.actions
        .pipe(ofType(addDatebookSuccessAction))
        .subscribe(() => this.form.reset())
    );

    this.subscription.add(
      this.actions
        .pipe(
          ofType(
            acceptInvitationSuccessAction,
            acceptInvitationFailureAction,
            rejectInvitationSuccessAction,
            rejectInvitationFailureAction
          )
        )
        .subscribe(() => this.submitInvite = null)
    );
  }

  fetchData(): void {
    this.store.dispatch(getAllDatebooksAction());
    this.store.dispatch(getAllInvitationAction());
  }

  getField (field): AbstractControl {
    return this.form.get(field);
  }

  onShowAddNewDatebook (): void {
    this.store.dispatch(showAddNewDatebookAction())
  }

  submitNewDatebook(): void {
    if (this.form.valid) {
      this.store.dispatch(addDatebookAction({datebook: this.form.value}))
    }
  }

  // Приглашение в ежедневник
  acceptInvitation(invitation: InviteInterface): void {
    this.submitInvite = invitation.id;
    this.store.dispatch(acceptInvitationAction({invitation}));
  }

  rejectInvitation(invitation: InviteInterface): void {
    this.submitInvite = invitation.id;
    this.store.dispatch(rejectInvitationAction({invitation}));
  }

}
