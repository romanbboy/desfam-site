import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {SettingsStateInterface} from "../types/settingsState.interface";

const settingsFeatureSelector = createFeatureSelector<AppStateInterface, SettingsStateInterface>('settings')

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (state: SettingsStateInterface) => state.isSubmitting
)

export const errorsSelector = createSelector(
  settingsFeatureSelector,
  (state: SettingsStateInterface) => state.errors
)

export const successSelector = createSelector(
  settingsFeatureSelector,
  (state: SettingsStateInterface) => state.success
)

export const avatarSelector = createSelector(
  settingsFeatureSelector,
  (state: SettingsStateInterface) => state.avatar
)
