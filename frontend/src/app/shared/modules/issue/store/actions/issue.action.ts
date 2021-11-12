import {createAction, props} from "@ngrx/store";
import {IssueRequestInterface} from "../../types/issueRequest.interface";
import {IssueFullInterface, IssueInterface} from "../../../../types/issue.interface";

// add new issue
export const addNewIssueAction = createAction(
  '[Notepad] ADD_NEW_ISSUE',
  props<{issueRequest: IssueRequestInterface, targetDayDatebook: Date}>()
);

export const addNewIssueSuccessAction = createAction(
  '[Notepad] ADD_NEW_ISSUE_SUCCESS',
  props<{issue: IssueFullInterface}>()
);
export const addNewIssueNotEffectSuccessAction = createAction('[Notepad] ADD_NEW_ISSUE_NOT_EFFECT_SUCCESS');

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


// edit issue
export const editIssueAction = createAction(
  '[Issue] EDIT_ISSUE',
  props<{content: string, issue: IssueFullInterface}>()
);

export const editIssueSuccessAction = createAction(
  '[Issue] EDIT_ISSUE_SUCCESS',
  props<{issue: IssueFullInterface}>()
);

export const editIssueFailureAction = createAction('[Issue] EDIT_ISSUE_FAILURE');
