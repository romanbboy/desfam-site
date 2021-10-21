import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {DatebookStateInterface} from "../types/datebookState.interface";

const datebookFeatureSelector = createFeatureSelector<AppStateInterface, DatebookStateInterface>('datebook')

export const infoDatebookSelector = createSelector(
  datebookFeatureSelector,
  (state: DatebookStateInterface) => state.info
);

export const issuesSelector = createSelector(
  datebookFeatureSelector,
  (state: DatebookStateInterface) => state.issues
)
