import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {IssueFullInterface} from "../../../../types/issue.interface";
import {Store} from "@ngrx/store";
import {changeStatusAction, deleteIssueAction} from "../../store/actions/issue.action";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, OnDestroy{
  @Input() issue: IssueFullInterface;
  @Input() currentUser: CurrentUserInterface;
  @Output('setEditSettings') setEditSettingsEvent = new EventEmitter();
  @ViewChild('refIssue') refIssue: ElementRef;

  showSettings: boolean = false;

  private handler: any = e => {
    if ((e.target as HTMLElement).closest('.issue') !== this.refIssue.nativeElement) {
      this.showSettings = false;
    }
  };

  constructor(private store: Store) {
  }

  ngOnInit() {
    document.addEventListener('click', this.handler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handler);
  }

  setShowSettings(): void {
    if ([this.issue.target.id, this.issue.creator.id].includes(this.currentUser.id)) {
      this.showSettings = !this.showSettings;
    }
  }

  changeStatus(issue: IssueFullInterface): void {
    this.store.dispatch(changeStatusAction({issue}))
  }

  delete(issue: IssueFullInterface): void {
    this.store.dispatch(deleteIssueAction({issue}))
  }

  showEditIssueNotepad(setting: string, issue: IssueFullInterface): void {
    this.setEditSettingsEvent.emit({setting, issue});
    this.showSettings = false;
  }
}
