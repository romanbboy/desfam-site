import {AuthStateInterface} from "../types/authState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {registrationAction, registrationFailureAction, registrationSuccessAction} from "./actions/registration.action";
import {loginAction, loginFailureAction, loginSuccessAction} from "./actions/login.action";
import {getCurrentUserFailureAction, getCurrentUserSuccessAction} from "./actions/getCurrentUser.action";
import {logoutAction} from "./actions/sync.action";
import {routerNavigationAction} from "@ngrx/router-store";
import {updateCurrentUserSuccessAction} from "./actions/updateCurrentUser.action";
import {environment} from "../../../environments/environment";

const initAuthState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  errors: []
}

const authReducer = createReducer(
  initAuthState,
  on(registrationAction, (state: AuthStateInterface) => ({
    ...initAuthState,
    isSubmitting: true
  })),
  on(registrationSuccessAction, (state, action): AuthStateInterface => ({
    ...initAuthState,
    currentUser: action.currentUser
  })),
  on(registrationFailureAction, (state, action): AuthStateInterface => {
    return ({
      ...initAuthState,
      errors: action.errors
    })
  }),

  on(loginAction, (state: AuthStateInterface) => ({
    ...initAuthState,
    isSubmitting: true
  })),
  on(loginSuccessAction, (state, action): AuthStateInterface => {
    let currentUser = {...action.currentUser};
    if (!environment.production && currentUser.avatar) currentUser.avatar = `${environment.devUrl}${currentUser.avatar}`

    return {...initAuthState, currentUser}
  }),
  on(loginFailureAction, (state, action): AuthStateInterface => {
    return ({
      ...initAuthState,
      errors: action.errors
    })
  }),

  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => {
    let currentUser = {...action.currentUser};
    if (!environment.production && currentUser.avatar) currentUser.avatar = `${environment.devUrl}${currentUser.avatar}`

    return {...initAuthState, currentUser}
  }),
  on(getCurrentUserFailureAction, (): AuthStateInterface => {
    return ({
      ...initAuthState
    })
  }),

  on(updateCurrentUserSuccessAction, (state, action): AuthStateInterface => {
    let currentUser = {...action.currentUser}
    if (!environment.production && currentUser.avatar) currentUser.avatar = `${environment.devUrl}${currentUser.avatar}`

    return {...state, currentUser}
  }),

  on(logoutAction, (): AuthStateInterface => {
    return ({
      ...initAuthState
    })
  }),

  on(routerNavigationAction, (state): AuthStateInterface => ({
    ...state,
    errors: []
  }))
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
