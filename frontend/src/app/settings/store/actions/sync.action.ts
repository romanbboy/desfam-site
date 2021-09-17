import {createAction, props} from "@ngrx/store";
import {AvatarType} from "../../../shared/types/avatar.type";

export const setAvatarSettingsAction = createAction(
  '[Settings] SET_AVATAR_SETTINGS',
  props<{avatar: AvatarType}>()
)

export const clearNoticeSettingsAction = createAction(
  '[Settings] CLEAR_NOTICE_SETTINGS'
)
