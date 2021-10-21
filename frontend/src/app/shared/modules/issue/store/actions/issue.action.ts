import {createAction, props} from "@ngrx/store";
import {IssueRequestInterface} from "../../types/issueRequest.interface";
import {IssueFullInterface, IssueInterface} from "../../../../types/issue.interface";

// add new issue
export const addNewIssueAction = createAction(
  '[Notepad] ADD_NEW_ISSUE',
  props<{issueRequest: IssueRequestInterface}>()
);

export const addNewIssueSuccessAction = createAction(
  '[Notepad] ADD_NEW_ISSUE_SUCCESS',
  props<{issue: IssueFullInterface}>()
);

export const addNewIssueFailureAction = createAction('[Notepad] ADD_NEW_ISSUE_FAILURE');


// change status
export const changeStatusAction = createAction(
  '[Issue] CHANGE_STATUS',
  props<{issue: IssueFullInterface}>()
);

export const changeStatusSuccessAction = createAction(
  '[Issue] CHANGE_STATUS_SUCCESS',
  props<{issue: IssueFullInterface}>()
);

export const changeStatusFailureAction = createAction('[Issue] CHANGE_STATUS_FAILURE');


// delete issue
export const deleteIssueAction = createAction(
  '[Issue] DELETE_ISSUE',
  props<{issue: IssueFullInterface}>()
);

export const deleteIssueSuccessAction = createAction(
  '[Issue] DELETE_ISSUE_SUCCESS',
  props<{issue: IssueFullInterface}>()
);

export const deleteIssueFailureAction = createAction('[Issue] DELETE_ISSUE_FAILURE');
