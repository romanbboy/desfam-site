import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {
  addNewIssueAction,
  addNewIssueFailureAction,
  addNewIssueSuccessAction,
  changeStatusAction,
  changeStatusFailureAction,
  changeStatusSuccessAction,
  deleteIssueAction,
  deleteIssueFailureAction,
  deleteIssueSuccessAction
} from "../actions/issue.action";
import {IssueFullInterface, IssueInterface} from "../../../../types/issue.interface";
import {AlertService} from "../../../../services/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IssueService} from "../../services/issue.service";

@Injectable()
export class IssueEffect {
  addNewIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewIssueAction),
      switchMap(({issueRequest}) => {
        return this.issueService.add(issueRequest).pipe(
          map((issue: IssueFullInterface) => {
            return addNewIssueSuccessAction({issue})
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error)
            return of(addNewIssueFailureAction())
          })
        )
      })
    )
  );

  changeStatusIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeStatusAction),
      switchMap(({issue}) => {
        return this.issueService.status(issue).pipe(
          map((issue: IssueFullInterface) => {
            return changeStatusSuccessAction({issue})
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error)
            return of(changeStatusFailureAction())
          })
        )
      })
    )
  );

  deleteIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteIssueAction),
      switchMap(({issue}) => {
        return this.issueService.delete(issue).pipe(
          map(() => {
            return deleteIssueSuccessAction({issue});
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error)
            return of(deleteIssueFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private issueService: IssueService, private alertService: AlertService) {
  }
}
