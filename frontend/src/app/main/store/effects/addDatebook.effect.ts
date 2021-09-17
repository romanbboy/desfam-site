import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {DatebookService} from "../../../shared/services/datebook.service";
import {addDatebookAction, addDatebookFailureAction, addDatebookSuccessAction} from "../actions/addDatebook.action";
import {HttpErrorResponse} from "@angular/common/http";
import {DatebookInterface} from "../../../shared/types/datebook.interface";

@Injectable()
export class AddDatebookEffect {
  addDatebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDatebookAction),
      switchMap(({datebook}) => {
        return this.datebookService.add(datebook).pipe(
          map((datebook: DatebookInterface) => {
            return addDatebookSuccessAction({datebook})
          }),

          catchError((errors: HttpErrorResponse) => {
            return of(addDatebookFailureAction({error: errors.error}))
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private datebookService: DatebookService) {
  }
}
