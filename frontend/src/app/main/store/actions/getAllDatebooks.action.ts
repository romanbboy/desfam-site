import {createAction, props} from "@ngrx/store";
import {DatebookAddingInputInterface} from "../../types/datebookAddingInput.interface";
import {NoticeType} from "../../../shared/types/notice.type";
import {DatebookInterface} from "../../../shared/types/datebook.interface";

export const getAllDatebooksAction = createAction(
  '[Main] GET_ALL_DATEBOOKS'
)

export const getAllDatebooksSuccessAction = createAction(
  '[Main] GET_ALL_DATEBOOKS_SUCCESS',
  props<{datebooks: DatebookInterface[]}>()
)

export const getAllDatebooksFailureAction = createAction(
  '[Main] GET_ALL_DATEBOOKS_FAILURE',
  props<{error: NoticeType}>()
)
