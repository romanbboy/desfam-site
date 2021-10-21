import {IssueFullInterface, IssueInterface} from "../../shared/types/issue.interface";
import {UserInterface} from "../../shared/types/user.interface";

export interface UsersIssuesInterface {
  user: UserInterface,
  issues: IssueFullInterface[]
}
