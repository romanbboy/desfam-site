import {AvatarType} from "../../shared/types/avatar.type";
import {NoticeType} from "../../shared/types/notice.type";

export interface SettingsStateInterface {
  isSubmitting: boolean,
  avatar: AvatarType
  errors: NoticeType
  success: NoticeType
}
