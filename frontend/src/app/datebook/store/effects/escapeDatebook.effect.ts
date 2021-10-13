import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {DatebookService} from "../../../shared/services/datebook.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../../../shared/services/alert.service";
import {
  escapeDatebookAction,
  escapeDatebookFailureAction,
  escapeDatebookSuccessAction
} from "../actions/escapeDatebook.action";
import {Router} from "@angular/router";

@Injectable()
export class EscapeDatebookEffect {
  escapeDatebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(escapeDatebookAction),
      switchMap(({datebook}) => {
        return this.datebookService.escape(datebook).pipe(
          map(() => {
            this.alertService.success('Вы покинули задачник');
            return escapeDatebookSuccessAction();
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error);
            return of(escapeDatebookFailureAction());
          })
        )
      })
    )
  );

  escapeAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(escapeDatebookSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ),
  {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private datebookService: DatebookService,
    private alertService: AlertService,
    private router: Router
  ) {
  }
}
