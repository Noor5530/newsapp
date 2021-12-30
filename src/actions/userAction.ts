import { responseAction } from '../utils/types';
import * as types from './types';

export function saveNewsResponse(payload: object): responseAction {
  return {
    type: types.SAVE_NEWS_RESPONSE,
    payload,
  };
}
export function unSaveNewsResponse(payload: object): responseAction {
  return {
    type: types.UNSAVE_NEWS_RESPONSE,
    payload,
  };
}
export function onNotification(): {type: string} {
  return {
    type: types.ON_NOTIFICATION,
  };
}
export function offNotification(): {type: string} {
  return {
    type: types.OFF_NOTIFICATION,
  };
}

export function enableNightMode(): {type: string} {
  return {
    type: types.ENABLE_NIGHT_MODE,
  };
}
export function disableNightMode(): {type: string} {
  return {
    type: types.DISABLE_NIGHT_MODE,
  };
}

export function manualEnableNightMode(): {type: string} {
  return {
    type: types.MANUAL_ENABLE_NIGHT_MODE,
  };
}
export function manualDisableNightMode(): {type: string} {
  return {
    type: types.MANUAL_DISABLE_NIGHT_MODE,
  };
}
export function logInAdminRequest(data: object): requestAction {
  return {
    type: types.LOGIN_ADMIN_REQUEST,
    data,
  };
}
export function logInAdminResponse(payload: object): responseAction {
return {
  type: types.LOGIN_ADMIN_RESPONSE,
  payload,
};
}

export function setAdminCredentials(payload: {username:string, password:string}): responseAction {
return {
  type: types.SET_ADMIN_CREDENTIALS,
  payload,
};

}

