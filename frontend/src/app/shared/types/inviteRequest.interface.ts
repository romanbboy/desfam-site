import {DatebookInterface} from "./datebook.interface";
import {UserInterface} from "./user.interface";

export interface InviteRequestInterface {
  datebook: DatebookInterface,
  referral: UserInterface
}
