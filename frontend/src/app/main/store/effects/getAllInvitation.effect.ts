import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {InvitationService} from "../../../shared/services/invitation.service";
import {
  getAllInvitationAction,
  getAllInvitationFailureAction,
  getAllInvitationSuccessAction
} from "../actions/getAllInvitation.action";
import {InviteInterface} from "../../../shared/types/invite.interface";

@Injectable()
export class GetAllInvitationEffect {
  getAllInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllInvitationAction),
      switchMap(() => {
        return this.invitationService.getAll().pipe(
          map((invitations: InviteInterface[] ) => {
            return getAllInvitationSuccessAction({invitations})
          }),

          catchError((errors: HttpErrorResponse) => {
            return of(getAllInvitationFailureAction({error: errors.error}))
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private invitationService: InvitationService) {
  }
}
