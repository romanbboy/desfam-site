import {AuthStateInterface} from "../../auth/types/authState.interface";
import {SettingsStateInterface} from "../../settings/types/settingsState.interface";
import {MainStateInterface} from "../../main/types/mainState.interface";

export interface AppStateInterface {
  auth: AuthStateInterface,
  settings: SettingsStateInterface,
  main: MainStateInterface
}
