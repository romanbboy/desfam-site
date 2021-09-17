import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {NoticeType} from "../../shared/types/notice.type";

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser?: CurrentUserInterface
  error?: NoticeType
}
