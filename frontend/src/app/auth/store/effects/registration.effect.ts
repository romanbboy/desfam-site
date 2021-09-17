import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registrationAction, registrationFailureAction, registrationSuccessAction} from "../actions/registration.action";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class RegistrationEffect {
  registration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registrationAction),
      switchMap(({request}) => {
        return this.authService.registration(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            localStorage.setItem('accessToken', currentUser.accessToken)
            return registrationSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registrationFailureAction({errors: errorResponse.error})
            )
          })
        )
      })
    )
  )

  registrationAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registrationSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
  }
}
