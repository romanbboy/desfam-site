import {UserInterface} from "./user.interface";
import {DatebookInterface} from "./datebook.interface";

export interface InviteInterface {
  id: string,
  referrer: UserInterface,
  referral: UserInterface,
  type: string,
  target: DatebookInterface
}
