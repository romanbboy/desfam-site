import {createAction, props} from "@ngrx/store";
import {actionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {NoticeType} from "../../../shared/types/notice.type";
import {CurrentUserInputInterface} from "../../../shared/types/currentUserInput.interface";

export const updateCurrentUserAction = createAction(
  actionTypes.UPDATE_CURRENT_USER,
  props<{currentUserInput: CurrentUserInputInterface}>()
)

export const updateCurrentUserSuccessAction = createAction(
  actionTypes.UPDATE_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const updateCurrentUserFailureAction = createAction(
  actionTypes.UPDATE_CURRENT_USER_FAILURE,
  props<{errors: NoticeType}>()
)
