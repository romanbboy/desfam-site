import {AvatarType} from "../../shared/types/avatar.type";
import {NoticeType} from "../../shared/types/notice.type";

export interface SettingsStateInterface {
  isSubmitting: boolean,
  avatar: AvatarType
  error?: NoticeType
  success?: NoticeType
}
