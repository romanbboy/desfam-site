import {createAction, props} from "@ngrx/store";
import {IssueRequestInterface} from "../../types/issueRequest.interface";
import {IssueInterface} from "../../../../types/issue.interface";

export const addNewIssueAction = createAction(
  '[Notepad] ADD_NEW_ISSUE',
  props<{issueRequest: IssueRequestInterface}>()
);

export const addNewIssueSuccessAction = createAction(
  '[Notepad] ADD_NEW_ISSUE_SUCCESS',
  props<{issue: IssueInterface}>()
);

export const addNewIssueFailureAction = createAction('[Notepad] ADD_NEW_ISSUE_FAILURE');
