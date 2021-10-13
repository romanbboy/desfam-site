import {createAction, props} from "@ngrx/store";
import {DatebookAddingInputInterface} from "../../types/datebookAddingInput.interface";
import {NoticeType} from "../../../shared/types/notice.type";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {InviteInterface} from "../../../shared/types/invite.interface";

export const getAllInvitationAction = createAction('[Main] GET_ALL_INVITATION');

export const getAllInvitationSuccessAction = createAction(
  '[Main] GET_ALL_INVITATION_SUCCESS',
  props<{invitations: InviteInterface[]}>()
);

export const getAllInvitationFailureAction = createAction(
  '[Main] GET_ALL_INVITATION_FAILURE',
  props<{error: NoticeType}>()
);
