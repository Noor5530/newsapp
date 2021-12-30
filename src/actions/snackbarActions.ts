import * as types from './types';
import { snackBarAction } from '../utils/types';

interface disableSnackbar{
  type:string

}

export function enableSnackbar(message:string):snackBarAction {
  return {
    type: types.ENABLE_SNACKBAR,
    message,
  };
}

export function disableSnackbar():disableSnackbar {
  return {
    type: types.DISABLE_SNACKBAR,
  };
}
