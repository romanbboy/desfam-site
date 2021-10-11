import {UserInterface} from "./user.interface";

export interface DatebookInterface {
  id: string,
  title: string,
  creator: string,
  participants: Array<UserInterface>
}
