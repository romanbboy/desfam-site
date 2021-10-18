import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../../../types/user.interface";
import {IssueInterface} from "../../../../types/issue.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {DatebookInterface} from "../../../../types/datebook.interface";
import {addNewIssueAction} from "../../../issue/store/actions/issue.action";
import {IssueRequestInterface} from "../../../issue/types/issueRequest.interface";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {
  @Input() user: UserInterface;
  @Input() datebook: DatebookInterface;
  @Input() issues: IssueInterface[];

  addNewIssueForm: FormGroup;
  isSubmittingAddNewIssue: boolean = false;

  showSettings: string = '';

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addNewIssueForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    })
  }

  onAddNewIssue(): void {
    if (this.addNewIssueForm.valid) {
      const issueRequest: IssueRequestInterface = {
        datebook: this.datebook.id,
        target: this.user.id,
        content: this.addNewIssueForm.value.description
      }

      this.store.dispatch(addNewIssueAction({issueRequest}))
    }
  }

}
