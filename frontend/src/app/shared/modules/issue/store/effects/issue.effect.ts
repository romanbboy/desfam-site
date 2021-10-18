import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {addNewIssueAction, addNewIssueFailureAction, addNewIssueSuccessAction} from "../actions/issue.action";
import {IssueInterface} from "../../../../types/issue.interface";
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
          map((issue: IssueInterface) => {
            return addNewIssueSuccessAction({issue})
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error)
            return of(addNewIssueFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private issueService: IssueService, private alertService: AlertService) {
  }
}
