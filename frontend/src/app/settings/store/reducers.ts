import {SettingsStateInterface} from "../types/settingsState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from "../../auth/store/actions/updateCurrentUser.action";
import {getCurrentUserSuccessAction} from "../../auth/store/actions/getCurrentUser.action";
import {clearNoticeSettingsAction, setAvatarSettingsAction} from "./actions/sync.action";
import {environment} from "../../../environments/environment";
import {loginSuccessAction} from "../../auth/store/actions/login.action";

const initSettingsState: SettingsStateInterface = {
  isSubmitting: false,
  avatar: null,
  error: null,
  success: null
}

const settingsReducer = createReducer(
  initSettingsState,
  on(loginSuccessAction, (state, action): SettingsStateInterface => {
    let avatar = action.currentUser.avatar;
    if (!environment.production && action.currentUser.avatar) avatar = `${environment.devUrl}${avatar}`

    return {...initSettingsState, avatar}
  }),
  on(getCurrentUserSuccessAction, (state, action): SettingsStateInterface => {
    let avatar = action.currentUser.avatar;
    if (!environment.production && action.currentUser.avatar) avatar = `${environment.devUrl}${avatar}`

    return {...initSettingsState , avatar}
  }),

  on(setAvatarSettingsAction, (state, action): SettingsStateInterface => ({
    ...state,
    avatar: action.avatar
  })),

  on(updateCurrentUserAction, (state): SettingsStateInterface => ({
    ...state,
    isSubmitting: true,
    error: null,
    success: null
  })),
  on(updateCurrentUserSuccessAction, (state): SettingsStateInterface => ({
    ...state,
    error: null,
    success: 'Изменения сохранены',
    isSubmitting: false
  })),
  on(updateCurrentUserFailureAction, (state, action): SettingsStateInterface => ({
    ...state,
    error: action.error,
    success: null,
    isSubmitting: false
  })),

  on(clearNoticeSettingsAction, (state): SettingsStateInterface => ({
    ...state,
    error: null,
    success: null
  })),
)

export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action)
}
