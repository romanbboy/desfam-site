import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {DatebookService} from "../../../shared/services/datebook.service";
import {HttpErrorResponse} from "@angular/common/http";
import {getDatebookAction, getDatebookFailureAction, getDatebookSuccessAction} from "../actions/getDatebook.action";
import {Router} from "@angular/router";
import {DatebookInterface} from "../../../shared/types/datebook.interface";

@Injectable()
export class GetDatebookEffect {
  getDatebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDatebookAction),
      switchMap(({id}) => {
        return this.datebookService.get(id).pipe(
          map((datebook: DatebookInterface) => {
            return getDatebookSuccessAction({datebook})
          }),

          catchError((errors: HttpErrorResponse) => {
            const statusesErr = [301, 401];
            if (statusesErr.includes(errors.status)) this.router.navigate(['/login']);

            return of(getDatebookFailureAction({error: errors.error}))
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private datebookService: DatebookService, private router: Router) {
  }
}
