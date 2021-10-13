import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {MainStateInterface} from "../types/mainState.interface";

const mainFeatureSelector = createFeatureSelector<AppStateInterface, MainStateInterface>('main')

export const showAddNewDatebookSelector = createSelector(
  mainFeatureSelector,
  (state: MainStateInterface) => state.showAddNewDatebook
);

export const errorAddNewDatebookSelector = createSelector(
  mainFeatureSelector,
  (state: MainStateInterface) => state.errorAddNewDatebook
);

export const isSubmittingAddNewDatebookSelector = createSelector(
  mainFeatureSelector,
  (state: MainStateInterface) => state.isSubmittingAddNewDatebook
);

export const datebookListSelector = createSelector(
  mainFeatureSelector,
  (state: MainStateInterface) => state.datebookList
);

export const invitationsSelector = createSelector(
  mainFeatureSelector,
  (state: MainStateInterface) => state.invitations
)
