import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {
  addNewIssueAction,
  addNewIssueFailureAction, addNewIssueNotEffectSuccessAction,
  addNewIssueSuccessAction,
  changeStatusAction,
  changeStatusFailureAction,
  changeStatusSuccessAction,
  deleteIssueAction,
  deleteIssueFailureAction,
  deleteIssueSuccessAction, editIssueAction, editIssueFailureAction, editIssueSuccessAction
} from "../actions/issue.action";
import {IssueFullInterface, IssueInterface} from "../../../../types/issue.interface";
import {AlertService} from "../../../../services/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IssueService} from "../../services/issue.service";
import * as moment from "moment";

@Injectable()
export class IssueEffect {
  addNewIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewIssueAction),
      switchMap(({issueRequest, targetDayDatebook}) => {
        return this.issueService.add(issueRequest).pipe(
          map((issue: IssueFullInterface) => {
            const matchDate = moment(issue.date).isSame(targetDayDatebook);
            const postfixMsg = !matchDate ? `на ${moment(issue.date).format('DD.MM.YYYY')}` : '';

            this.alertService.success(`Задача добавлена ${postfixMsg}`);

            return matchDate ? addNewIssueSuccessAction({issue}) : addNewIssueNotEffectSuccessAction()
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
  );

  editIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editIssueAction),
      switchMap(({content, issue}) => {
        return this.issueService.edit({issue, content}).pipe(
          map((issue: IssueFullInterface) => {
            return editIssueSuccessAction({issue});
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error)
            return of(editIssueFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private issueService: IssueService, private alertService: AlertService) {
  }
}
