import {createAction, props} from "@ngrx/store";
import {DatebookInterface} from "../../../shared/types/datebook.interface";

export const escapeDatebookAction = createAction(
  '[Datebook] ESCAPE_DATEBOOK',
  props<{datebook: DatebookInterface}>()
);

export const escapeDatebookSuccessAction = createAction('[Datebook] ESCAPE_DATEBOOK_SUCCESS');

export const escapeDatebookFailureAction = createAction('[Datebook] ESCAPE_DATEBOOK_FAILURE');
