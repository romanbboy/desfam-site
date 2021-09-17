import {createAction, props} from "@ngrx/store";
import {actionTypes} from "../actionTypes";
import {LoginRequestInterface} from "../../types/loginRequest.interface";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {NoticeType} from "../../../shared/types/notice.type";

export const loginAction = createAction(
  actionTypes.LOGIN,
  props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
  actionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
  actionTypes.LOGIN_FAILURE,
  props<{error: NoticeType}>()
)
