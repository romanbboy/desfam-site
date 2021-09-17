import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {showAddNewDatebookAction} from "../../store/actions/sync.action";
import {
  datebookListSelector, errorAddNewDatebookSelector,
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
  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription
  addDatebookSuccessSubscription: Subscription

  constructor(private store: Store, private fb: FormBuilder, private actions: Actions) { }

  ngOnInit(): void {
    this.initValues();
    this.initForm();
    this.initListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.addDatebookSuccessSubscription.unsubscribe();
  }

  initValues(): void {
    this.showAddNewDatebook$ = this.store.pipe(select(showAddNewDatebookSelector));
    this.errorAddNewDatebook$ = this.store.pipe(select(errorAddNewDatebookSelector));
    this.isSubmittingAddNewDatebook$ = this.store.pipe(select(isSubmittingAddNewDatebookSelector));
    this.datebookList$ = this.store.pipe(select(datebookListSelector));
  }

  initForm(): void {
    this.form = this.fb.group({
      datebook: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  initListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.fetchData();
      })

    this.addDatebookSuccessSubscription = this.actions
      .pipe(ofType(addDatebookSuccessAction))
      .subscribe(() => this.form.reset())
  }

  fetchData(): void {
    this.store.dispatch(getAllDatebooksAction())
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

}
