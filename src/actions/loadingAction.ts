import { loadingAction } from '../utils/types';
import * as types from './types';

export function enableLoading(): loadingAction {
  return {
    type: types.LOADING_ENABLE_LOADER,
  };
}
export function disableLoading(): loadingAction {
  return {
    type: types.LOADING_DISABLE_LOADER,
  };
}
export function enableRefreshing(): loadingAction {
  return {
    type: types.ENABLE_REFRESHING,
  };
}
export function disableRefreshing(): loadingAction {
  return {
    type: types.DISABLE_REFRESHING,
  };
}
