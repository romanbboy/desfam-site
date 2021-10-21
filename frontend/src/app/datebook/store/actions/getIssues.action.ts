import {createAction, props} from "@ngrx/store";
import {IssueFullInterface, IssueInterface} from "../../../shared/types/issue.interface";
import {Moment} from "moment";

export const getIssuesAction = createAction(
  '[Datebook] GET_ISSUES',
  props<{ idDatebook: string, date: Moment }>()
);

export const getIssuesSuccessAction = createAction(
  '[Datebook] GET_ISSUES_SUCCESS',
  props<{issues: IssueFullInterface[]}>()
);

export const getIssuesFailureAction = createAction('[Datebook] GET_ISSUES_FAILURE');
