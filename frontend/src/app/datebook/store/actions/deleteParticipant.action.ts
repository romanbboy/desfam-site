import {createAction, props} from "@ngrx/store";
import {DatebookInterface} from "../../../shared/types/datebook.interface";
import {UserInterface} from "../../../shared/types/user.interface";

export const deleteParticipantAction = createAction(
  '[Datebook] DELETE_PARTICIPANT',
  props<{datebook: DatebookInterface, participant: UserInterface}>()
);

export const deleteParticipantSuccessAction = createAction(
  '[Datebook] DELETE_PARTICIPANT_SUCCESS',
  props<{participant: UserInterface}>()
);

export const deleteParticipantFailureAction = createAction('[Datebook] DELETE_PARTICIPANT_FAILURE');
