import {Action, createReducer, on} from "@ngrx/store";
import {showAddNewDatebookAction} from "./actions/sync.action";
import {MainStateInterface} from "../types/mainState.interface";
import {addDatebookAction, addDatebookFailureAction, addDatebookSuccessAction} from "./actions/addDatebook.action";
import {getAllDatebooksSuccessAction} from "./actions/getAllDatebooks.action";
import {logoutAction} from "../../auth/store/actions/sync.action";
import {getAllInvitationSuccessAction} from "./actions/getAllInvitation.action";
import {acceptInvitationSuccessAction, rejectInvitationSuccessAction} from "./actions/invitation.action";

const initMainState: MainStateInterface = {
  showAddNewDatebook: false,
  errorAddNewDatebook: null,
  isSubmittingAddNewDatebook: false,
  datebookList: null,
  invitations: []
}

const mainReducer = createReducer(
  initMainState,
  on(showAddNewDatebookAction, (state): MainStateInterface => ({
    ...state,
    showAddNewDatebook: !state.showAddNewDatebook
  })),

  on(logoutAction, (): MainStateInterface => ({
    ...initMainState
  })),

  on(addDatebookAction, (state): MainStateInterface => ({
    ...state,
    errorAddNewDatebook: null,
    isSubmittingAddNewDatebook: true
  })),
  on(addDatebookSuccessAction, (state, action): MainStateInterface => ({
    ...state,
    showAddNewDatebook: false,
    errorAddNewDatebook: null,
    isSubmittingAddNewDatebook: false,
    datebookList: [...state.datebookList, action.datebook]
  })),
  on(addDatebookFailureAction, (state, action): MainStateInterface => ({
    ...state,
    errorAddNewDatebook: action.error,
    isSubmittingAddNewDatebook: false
  })),

  on(getAllDatebooksSuccessAction, (state, action): MainStateInterface => ({
    ...state,
    datebookList: action.datebooks
  })),

  on(getAllInvitationSuccessAction, (state, action): MainStateInterface => ({
    ...state,
    invitations: action.invitations
  })),

  on(acceptInvitationSuccessAction, (state, action): MainStateInterface => ({
    ...state,
    invitations: [...state.invitations].filter(el => el.id !== action.invitation.id),
    datebookList: [...state.datebookList, action.datebook]
  })),
  on(rejectInvitationSuccessAction, (state, action): MainStateInterface => ({
    ...state,
    invitations: [...state.invitations].filter(el => el.id !== action.invitation.id)
  })),
)

export function reducers(state: MainStateInterface, action: Action) {
  return mainReducer(state, action)
}
