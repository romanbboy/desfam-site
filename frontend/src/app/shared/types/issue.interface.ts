import {DatebookInterface} from "./datebook.interface";
import {UserInterface} from "./user.interface";

export interface IssueInterface {
  id: string
  date: Date,
  datebook: string,
  creator: string,
  target: string,
  status: boolean,
  content: string
}

export interface IssueFullInterface {
  id: string
  date: Date,
  datebook: DatebookInterface,
  creator: UserInterface,
  target: UserInterface,
  status: boolean,
  content: string
}
