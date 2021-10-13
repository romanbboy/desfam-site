import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginAction, loginFailureAction, loginSuccessAction} from "../actions/login.action";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            localStorage.setItem('accessToken', currentUser.accessToken)
            return loginSuccessAction({currentUser})
          }),

          catchError((errors: HttpErrorResponse) => {
            return of(loginFailureAction({error: errors.error}))
          })
        )
      })
    )
  )

  loginAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ),
  {dispatch: false}
  )

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
  }
}
