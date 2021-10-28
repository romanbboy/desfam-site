import {Action, createReducer, on} from "@ngrx/store";
import {DatebookStateInterface} from "../types/datebookState.interface";
import {getDatebookSuccessAction} from "./actions/getDatebook.action";
import {routerNavigationAction} from "@ngrx/router-store";
import {environment} from "../../../environments/environment";
import {deleteParticipantSuccessAction} from "./actions/deleteParticipant.action";
import {getIssuesAction, getIssuesSuccessAction} from "./actions/getIssues.action";
import {
  addNewIssueSuccessAction,
  changeStatusSuccessAction,
  deleteIssueSuccessAction, editIssueSuccessAction
} from "../../shared/modules/issue/store/actions/issue.action";

const initDatebookState: DatebookStateInterface = {
  info: null,
  issues: null
};

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

  on(getIssuesAction, (state): DatebookStateInterface => ({
    ...state,
    issues: null
  })),
  on(getIssuesSuccessAction, (state, action): DatebookStateInterface => {

    let issues = action.issues.map(issue => {
      let creator = issue.creator;
      let target = issue.target;
      if (!environment.production) {
        if (creator.avatar) creator = {...creator, avatar: `${environment.devUrl}${creator.avatar}`};
        if (target.avatar) target = {...target, avatar: `${environment.devUrl}${target.avatar}`};
      }

      return {...issue, creator, target};
    });

    return {...state, issues}
  }),

  on(addNewIssueSuccessAction, (state, action): DatebookStateInterface => {
    let issue = {...action.issue};

    if (!environment.production) {
      if (issue.creator.avatar) issue.creator = {...issue.creator, avatar: `${environment.devUrl}${issue.creator.avatar}`};
      if (issue.target.avatar) issue.target = {...issue.target, avatar: `${environment.devUrl}${issue.target.avatar}`};
    }

    return {
      ...state,
      issues: [...state.issues, issue]
    }
  }),

  on(changeStatusSuccessAction, (state, action): DatebookStateInterface => ({
    ...state,
    issues: [...state.issues].map(el => {
      let issue = {...el};
      if (issue.id === action.issue.id) issue.status = action.issue.status;
      return issue;
    })
  })),

  on(editIssueSuccessAction, (state, action): DatebookStateInterface => ({
    ...state,
    issues: state.issues.map(el => {
      let issue = {...el};
      if (issue.id === action.issue.id) issue.content = action.issue.content;
      return issue;
    })
  })),

  on(deleteIssueSuccessAction, (state, action): DatebookStateInterface => ({
    ...state,
    issues: [...state.issues].filter(el => el.id !== action.issue.id)
  })),

  on(routerNavigationAction, (): DatebookStateInterface => initDatebookState)
);

export function reducers(state: DatebookStateInterface, action: Action) {
  return datebookReducer(state, action)
}
