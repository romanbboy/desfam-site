import {UserInterface} from "../../shared/types/user.interface";

export interface SettingsAddParticipantInterface {
  user?: UserInterface
  notice?: string,
  typeNotice?: string
}
