import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {DatebookService} from "../../../shared/services/datebook.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {
  getAllDatebooksAction,
  getAllDatebooksFailureAction,
  getAllDatebooksSuccessAction
} from "../actions/getAllDatebooks.action";

@Injectable()
export class GetAllDatebooksEffect {
  getAllDatebooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllDatebooksAction),
      switchMap(() => {
        return this.datebookService.getAll().pipe(
          map((datebooks: DatebookInterface[]) => {
            return getAllDatebooksSuccessAction({datebooks})
          }),

          catchError((errors: HttpErrorResponse) => {
            return of(getAllDatebooksFailureAction({errors: errors.error}))
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private datebookService: DatebookService) {
  }
}
