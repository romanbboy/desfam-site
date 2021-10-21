import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {IssueService} from "../../../shared/modules/issue/services/issue.service";
import {getIssuesAction, getIssuesFailureAction, getIssuesSuccessAction} from "../actions/getIssues.action";
import {IssueFullInterface, IssueInterface} from "../../../shared/types/issue.interface";

@Injectable()
export class GetIssuesEffect {
  getIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIssuesAction),
      switchMap(({idDatebook, date}) => {
        return this.issueService.get({idDatebook, date}).pipe(
          map((issues: IssueFullInterface[]) => {
            return getIssuesSuccessAction({issues})
          }),

          catchError((errors: HttpErrorResponse) => {
            return of(getIssuesFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private issueService: IssueService) {
  }
}
