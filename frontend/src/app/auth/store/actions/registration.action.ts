import {createAction, props} from "@ngrx/store";
import {actionTypes} from "../actionTypes";
import {RegistrationRequestInterface} from "../../types/registrationRequest.interface";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {NoticeType} from "../../../shared/types/notice.type";

export const registrationAction = createAction(
  actionTypes.REGISTRATION,
  props<{request: RegistrationRequestInterface}>()
)

export const registrationSuccessAction = createAction(
  actionTypes.REGISTRATION_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const registrationFailureAction = createAction(
  actionTypes.REGISTRATION_FAILURE,
  props<{errors: NoticeType}>()
)
