import {DatebookInterface} from "../../shared/types/datebook.interface";
import {NoticeType} from "../../shared/types/notice.type";
import {InviteInterface} from "../../shared/types/invite.interface";

export interface MainStateInterface {
  showAddNewDatebook: boolean,
  errorAddNewDatebook: NoticeType
  isSubmittingAddNewDatebook: boolean,
  datebookList: Array<DatebookInterface> | null,
  invitations: InviteInterface[]
}
