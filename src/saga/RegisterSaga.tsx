import {put, call} from 'redux-saga/effects';
import registerUser from '../api/methods/Register';
import {enableLoading, disableLoading} from '../actions/loadingAction';
import {enableSnackbar} from '../actions/snackbarActions';
import * as navigationActions from '../actions/navigationActions';
import {requestAction} from '../utils/types';

export default function* registerAsync(action: requestAction) {
  yield put(enableLoading());
  let response = yield call(registerUser, action.data);
  response = response;
  yield put(disableLoading());

  if (response && response.status == true) {
    yield call(navigationActions.navigateToLogin, action.data);
    let data = response.message;
    yield put(enableSnackbar(data));
  } else if (response && response.status && response.status == 400) {
    let data = 'validation Error';

    yield put(enableSnackbar(data));
  } else if (response && response.value) {
    let data = response.value.message;
    yield put(enableSnackbar(data));
  } else {
    // let data ="something went wrong"
    // yield put(enableSnackbar(data));
  }
}
