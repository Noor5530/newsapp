/*
 * Reducer actions related with login
 */
import * as types from './types';
import {requestAction, responseAction} from '../utils/types';

export function requestLogin(data: object): requestAction {
  return {
    type: types.LOGIN_REQUEST,
    data,
  };
}
export function requestRegister(data: object): requestAction {
  return {
    type: types.REGISTER_REQUEST,
    data,
  };
}
export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}
export function logOut() {
  return {
    type: types.LOGOUT,
  };
}
export function onLoginResponse(payload: object): responseAction {
  return {
    type: types.LOGIN_RESPONSE,
    payload,
  };
}
