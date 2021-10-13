import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {InvitationService} from "../../../shared/services/invitation.service";
import {
  acceptInvitationAction,
  acceptInvitationFailureAction,
  acceptInvitationSuccessAction,
  rejectInvitationAction,
  rejectInvitationFailureAction,
  rejectInvitationSuccessAction
} from "../actions/invitation.action";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {AlertService} from "../../../shared/services/alert.service";

@Injectable()
export class InvitationEffect {
  acceptInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptInvitationAction),
      switchMap(({invitation}) => {
        return this.invitationService.accept(invitation).pipe(
          map((datebook: DatebookInterface) => {
            this.alertService.success('Задачник добавлен в конец списка');
            return acceptInvitationSuccessAction({datebook, invitation});
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error);
            return of(acceptInvitationFailureAction())
          })
        )
      })
    )
  );

  rejectInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rejectInvitationAction),
      switchMap(({invitation}) => {
        return this.invitationService.reject(invitation).pipe(
          map(() => {
            return rejectInvitationSuccessAction({invitation});
          }),

          catchError((errors: HttpErrorResponse) => {
            this.alertService.error(errors.error);
            return of(rejectInvitationFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private invitationService: InvitationService, private alertService: AlertService) {
  }
}
