import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserInterface} from "../../../../types/user.interface";
import {IssueFullInterface} from "../../../../types/issue.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {
  editIssueAction,
  editIssueFailureAction,
  editIssueSuccessAction
} from "../../../issue/store/actions/issue.action";
import {Observable, Subscription} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {currentUserSelector} from "../../../../../auth/store/selectors";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit, OnDestroy {
  @Input() user: UserInterface;
  @Input() issues: IssueFullInterface[];
  @ViewChild('refEdit') refEdit: ElementRef

  editIssueForm: FormGroup;
  isSubmittingEditIssue: boolean = false;
  editingIssue: IssueFullInterface | null = null

  showSettings: string = '';
  currentUser$: Observable<CurrentUserInterface> = this.store.select(currentUserSelector)

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
        .pipe( ofType(editIssueSuccessAction, editIssueFailureAction) )
        .subscribe(() => this.isSubmittingEditIssue = false)
    );
  }

  initForm(): void {
    this.editIssueForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
  }

  closeSettingsBlock(): void {
    this.showSettings = '';
    this.editingIssue = null;
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
