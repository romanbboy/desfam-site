import {UserInterface} from "./user.interface";

export interface CurrentUserInterface extends UserInterface{
  accessToken: string
}
