import {Action, createReducer, on} from "@ngrx/store";
import {DatebookStateInterface} from "../types/datebookState.interface";
import {getDatebookSuccessAction} from "./actions/getDatebook.action";
import {routerNavigationAction} from "@ngrx/router-store";

const initDatebookState: DatebookStateInterface = {
  info: null
}

const datebookReducer = createReducer(
  initDatebookState,
  on(getDatebookSuccessAction, (state, action): DatebookStateInterface => ({
    ...state,
    info: action.datebook
  })),

  on(routerNavigationAction, (): DatebookStateInterface => initDatebookState)
)

export function reducers(state: DatebookStateInterface, action: Action) {
  return datebookReducer(state, action)
}
