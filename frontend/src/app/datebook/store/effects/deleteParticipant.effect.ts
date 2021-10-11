import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {DatebookService} from "../../../shared/services/datebook.service";
import {HttpErrorResponse} from "@angular/common/http";
import {
  deleteParticipantAction,
  deleteParticipantFailureAction,
  deleteParticipantSuccessAction
} from "../actions/deleteParticipant.action";
import {AlertService} from "../../../shared/services/alert.service";

@Injectable()
export class DeleteParticipantEffect {
  deleteParticipant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteParticipantAction),
      switchMap(({datebook, participant}) => {
        return this.datebookService.deleteParticipant({datebook, participant}).pipe(
          map(() => {
            this.alertService.success('Участник удален');
            return deleteParticipantSuccessAction({participant})
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error);
            return of(deleteParticipantFailureAction());
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private datebookService: DatebookService,
    private alertService: AlertService
  ) {
  }
}
