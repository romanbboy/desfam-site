import {DatebookInterface} from "../../shared/types/datebook.interface";
import {IssueFullInterface} from "../../shared/types/issue.interface";

export interface DatebookStateInterface {
  info?: DatebookInterface,
  issues?: IssueFullInterface[]
}
