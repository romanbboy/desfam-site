import {DatebookInterface} from "../../shared/types/datebook.interface";
import {NoticeType} from "../../shared/types/notice.type";

export interface MainStateInterface {
  showAddNewDatebook: boolean,
  errorAddNewDatebook: NoticeType
  isSubmittingAddNewDatebook: boolean,
  datebookList: Array<DatebookInterface> | null
}
