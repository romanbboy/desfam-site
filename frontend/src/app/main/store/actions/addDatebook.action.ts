import {createAction, props} from "@ngrx/store";
import {DatebookAddingInputInterface} from "../../types/datebookAddingInput.interface";
import {NoticeType} from "../../../shared/types/notice.type";
import {DatebookInterface} from "../../../shared/types/datebook.interface";

export const addDatebookAction = createAction(
  '[Main] ADD_DATEBOOK',
  props<{datebook: DatebookAddingInputInterface}>()
)

export const addDatebookSuccessAction = createAction(
  '[Main] ADD_DATEBOOK_SUCCESS',
  props<{datebook: DatebookInterface}>()
)

export const addDatebookFailureAction = createAction(
  '[Main] ADD_DATEBOOK_FAILURE',
  props<{error: NoticeType}>()
)
