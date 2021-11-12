import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssueRequestInterface} from "../../../issue/types/issueRequest.interface";
import {
  addNewIssueAction,
  addNewIssueFailureAction, addNewIssueNotEffectSuccessAction,
  addNewIssueSuccessAction
} from "../../../issue/store/actions/issue.action";
import {Store} from "@ngrx/store";
import {UserInterface} from "../../../../types/user.interface";
import {DatebookInterface} from "../../../../types/datebook.interface";
import {Actions, ofType} from "@ngrx/effects";
import {Subscription} from "rxjs";
import {Moment} from "moment";
import * as moment from "moment";

@Component({
  selector: 'app-issue-creator-form',
  templateUrl: './issue-creator-form.component.html',
  styleUrls: ['./issue-creator-form.component.scss']
})
export class IssueCreatorFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() executors: UserInterface[] = [];
  @Input() datebook: DatebookInterface;
  @Input() date: Moment

  addNewIssueForm: FormGroup;
  isSubmittingAddNewIssue: boolean = false;

  executor: UserInterface;

  today: Date = moment().toDate();
  dateForm: Date;
  targetDayDatebook: Date;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private actions: Actions) { }

  ngOnInit(): void {
    this.executor = this.executors[0];
    this.initForm();
    this.initListeners();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) {
      this.targetDayDatebook = changes.date.currentValue.toDate();
      this.dateForm = changes.date.currentValue.toDate();
    }
  }

  initForm(): void {
    this.addNewIssueForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
  }

  initListeners(): void {
    this.subscription.add(
      this.actions
        .pipe( ofType(addNewIssueSuccessAction, addNewIssueNotEffectSuccessAction, addNewIssueFailureAction) )
        .subscribe(() => {
          this.isSubmittingAddNewIssue = false;
          this.addNewIssueForm.reset();
        })
    );

    this.subscription.add(
      this.actions
        .pipe( ofType(addNewIssueSuccessAction) )
        .subscribe(() => this.addNewIssueForm.reset())
    );
  }

  onAddNewIssue(): void {
    if (this.addNewIssueForm.valid && this.executor) {
      this.isSubmittingAddNewIssue = true;
      const issueRequest: IssueRequestInterface = {
        date: this.dateForm,
        datebook: this.datebook.id,
        target: this.executor.id,
        content: this.addNewIssueForm.value.description
      };

      this.store.dispatch(addNewIssueAction({issueRequest, targetDayDatebook: this.targetDayDatebook}))
    }
  }

}
