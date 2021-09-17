import {createAction, props} from "@ngrx/store";
import {actionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {NoticeType} from "../../../shared/types/notice.type";

export const getCurrentUserAction = createAction(
  actionTypes.GET_CURRENT_USER
)

export const getCurrentUserSuccessAction = createAction(
  actionTypes.GET_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const getCurrentUserFailureAction = createAction(
  actionTypes.GET_CURRENT_USER_FAILURE
)
