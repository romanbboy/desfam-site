import {Action, createReducer, on} from "@ngrx/store";
import {DatebookStateInterface} from "../types/datebookState.interface";
import {getDatebookSuccessAction} from "./actions/getDatebook.action";
import {routerNavigationAction} from "@ngrx/router-store";
import {environment} from "../../../environments/environment";
import {deleteParticipantSuccessAction} from "./actions/deleteParticipant.action";

const initDatebookState: DatebookStateInterface = {
  info: null
}

const datebookReducer = createReducer(
  initDatebookState,
  on(getDatebookSuccessAction, (state, action): DatebookStateInterface => {
    let participants = action.datebook.participants;
    if (!environment.production) {
      participants = participants.map(el => ({...el, avatar: `${environment.devUrl}${el.avatar}`}));
    }

    return {...state, info: {...action.datebook, participants}};
  }),

  on(deleteParticipantSuccessAction, (state, action): DatebookStateInterface => ({
    ...state,
    info: {
      ...state.info,
      participants: state.info.participants.filter(el => el.id !== action.participant.id)
    }
  })),

  on(routerNavigationAction, (): DatebookStateInterface => initDatebookState)
)

export function reducers(state: DatebookStateInterface, action: Action) {
  return datebookReducer(state, action)
}
