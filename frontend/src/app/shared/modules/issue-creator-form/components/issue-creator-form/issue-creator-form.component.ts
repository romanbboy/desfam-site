import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssueRequestInterface} from "../../../issue/types/issueRequest.interface";
import {
  addNewIssueAction,
  addNewIssueFailureAction,
  addNewIssueSuccessAction
} from "../../../issue/store/actions/issue.action";
import {Store} from "@ngrx/store";
import {UserInterface} from "../../../../types/user.interface";
import {DatebookInterface} from "../../../../types/datebook.interface";
import {Actions, ofType} from "@ngrx/effects";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-issue-creator-form',
  templateUrl: './issue-creator-form.component.html',
  styleUrls: ['./issue-creator-form.component.scss']
})
export class IssueCreatorFormComponent implements OnInit, OnDestroy {
  @Input() executors: UserInterface[] = [];
  @Input() datebook: DatebookInterface;
  @Input() date: Date;

  addNewIssueForm: FormGroup;
  isSubmittingAddNewIssue: boolean = false;

  executor: UserInterface;

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

  initForm(): void {
    this.addNewIssueForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
  }

  initListeners(): void {
    this.subscription.add(
      this.actions
        .pipe( ofType(addNewIssueSuccessAction, addNewIssueFailureAction) )
        .subscribe(() => this.isSubmittingAddNewIssue = false)
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
        date: this.date,
        datebook: this.datebook.id,
        target: this.executor.id,
        content: this.addNewIssueForm.value.description
      };

      this.store.dispatch(addNewIssueAction({issueRequest}))
    }
  }

}
