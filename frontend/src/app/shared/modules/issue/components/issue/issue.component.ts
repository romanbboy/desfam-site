import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewRef} from "@angular/core";
import {IssueFullInterface, IssueInterface} from "../../../../types/issue.interface";
import {Store} from "@ngrx/store";
import {changeStatusAction, deleteIssueAction} from "../../store/actions/issue.action";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, OnDestroy{
  @Input() issue: IssueFullInterface
  @ViewChild('refIssue') refIssue: ElementRef

  showSettings: boolean = false

  private handler: any = e => {
    if ((e.target as HTMLElement).closest('.issue') !== this.refIssue.nativeElement) {
      this.showSettings = false;
    }
  }

  constructor(private store: Store) {
  }

  ngOnInit() {
    document.addEventListener('click', this.handler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handler)
  }

  changeStatus(issue: IssueFullInterface): void {
    this.store.dispatch(changeStatusAction({issue}))
  }

  delete(issue: IssueFullInterface): void {
    this.store.dispatch(deleteIssueAction({issue}))
  }
}
