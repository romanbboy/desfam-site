// Мы назвали файл sync потому что тут мы будем хранить только СИНХРОННЫЕ экшены
// У нас никаких сайд эффектов не происходит в связке с апи сервера, поэтому сразу выполняем код

import {createAction} from "@ngrx/store";
import {actionTypes} from "../actionTypes";

export const logoutAction = createAction(actionTypes.LOGOUT)
