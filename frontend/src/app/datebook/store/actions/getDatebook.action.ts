import {createAction, props} from "@ngrx/store";
import {DatebookInterface} from "../../../shared/types/datebook.interface";

export const getDatebookAction = createAction(
  '[Datebook] GET_DATEBOOK',
  props<{id: string}>()
)

export const getDatebookSuccessAction = createAction(
  '[Datebook] GET_DATEBOOK_SUCCESS',
  props<{datebook: DatebookInterface}>()
)

export const getDatebookFailureAction = createAction(
  '[Datebook] GET_DATEBOOK_FAILURE',
  props<{error}>()
)
