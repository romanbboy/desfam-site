import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserInterface} from "../../../../types/user.interface";
import {IssueFullInterface} from "../../../../types/issue.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {DatebookInterface} from "../../../../types/datebook.interface";
import {
  addNewIssueAction,
  addNewIssueFailureAction,
  addNewIssueSuccessAction,
  editIssueAction, editIssueFailureAction, editIssueSuccessAction
} from "../../../issue/store/actions/issue.action";
import {IssueRequestInterface} from "../../../issue/types/issueRequest.interface";
import {Subscription} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";
import {
  acceptInvitationFailureAction,
  acceptInvitationSuccessAction, rejectInvitationFailureAction, rejectInvitationSuccessAction
} from "../../../../../main/store/actions/invitation.action";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit, OnDestroy {
  @Input() user: UserInterface;
  @Input() datebook: DatebookInterface;
  @Input() issues: IssueFullInterface[];
  @ViewChild('refAddNewIssue') refAddNewIssue: ElementRef
  @ViewChild('refEdit') refEdit: ElementRef

  addNewIssueForm: FormGroup;
  isSubmittingAddNewIssue: boolean = false;

  editIssueForm: FormGroup;
  isSubmittingEditIssue: boolean = false;
  editingIssue: IssueFullInterface | null = null

  showSettings: string = '';

  private subscription: Subscription = new Subscription()

  constructor(private fb: FormBuilder, private store: Store, private actions: Actions) { }

  ngOnInit(): void {
    this.initListeners();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initListeners(): void {
    this.subscription.add(
      this.actions
        .pipe( ofType(addNewIssueSuccessAction, addNewIssueFailureAction) )
        .subscribe(() => this.isSubmittingAddNewIssue = false)
    );

    this.subscription.add(
      this.actions
        .pipe( ofType(editIssueSuccessAction, editIssueFailureAction) )
        .subscribe(() => this.isSubmittingEditIssue = false)
    );
  }

  initForm(): void {
    this.addNewIssueForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });

    this.editIssueForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
  }

  closeSettingsBlock(): void {
    this.showSettings = '';
    this.editingIssue = null;
  }

  // добавление новой задачи
  setShowAddNewIssueSettings() {
    this.showSettings = 'addIssue';
    setTimeout(() => this.refAddNewIssue.nativeElement.focus(), 0);
  }

  onAddNewIssue(): void {
    if (this.addNewIssueForm.valid) {
      this.isSubmittingAddNewIssue = true;
      const issueRequest: IssueRequestInterface = {
        datebook: this.datebook.id,
        target: this.user.id,
        content: this.addNewIssueForm.value.description
      }

      this.store.dispatch(addNewIssueAction({issueRequest}))
    }
  }

  // редактирование задачи
  setShowEditSettings(e: {setting: string, issue: IssueFullInterface}) {
    this.showSettings = e.setting;
    this.editingIssue = e.issue;

    this.editIssueForm.setValue({ description: e.issue.content })

    setTimeout(() => this.refEdit.nativeElement.focus(), 0);
  }

  editIssue(): void {
    if (this.editIssueForm.valid) {
      this.isSubmittingEditIssue = true;
      this.store.dispatch(editIssueAction({
        issue: this.editingIssue,
        content: this.editIssueForm.value.description
      }))
    }
  }
}
