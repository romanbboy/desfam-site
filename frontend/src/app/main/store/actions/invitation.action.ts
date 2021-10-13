import {createAction, props} from "@ngrx/store";
import {InviteInterface} from "../../../shared/types/invite.interface";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {NoticeType} from "../../../shared/types/notice.type";

// accept invitation
export const acceptInvitationAction = createAction(
  '[Main] ACCEPT_INVITATION',
  props<{invitation: InviteInterface}>()
);

export const acceptInvitationSuccessAction = createAction(
  '[Main] ACCEPT_INVITATION_SUCCESS',
  props<{datebook: DatebookInterface, invitation: InviteInterface}>()
);

export const acceptInvitationFailureAction = createAction('[Main] ACCEPT_INVITATION_FAILURE');


// reject
export const rejectInvitationAction = createAction(
  '[Main] REJECT_INVITATION',
  props<{invitation: InviteInterface}>()
);

export const rejectInvitationSuccessAction = createAction(
  '[Main] REJECT_INVITATION_SUCCESS',
  props<{invitation: InviteInterface}>()
);

export const rejectInvitationFailureAction = createAction('[Main] REJECT_INVITATION_FAILURE');
