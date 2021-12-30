import { call, put } from 'redux-saga/effects';

import * as appAction from '../actions/appAction';
import * as loadingAction from '../actions/loadingAction';
import getAllNews from '../api/methods/getAllNews';
import { requestAction } from '../utils/types';

// Our worker Saga that logins the user
export default function* AllNewsAsync(action: requestAction) {
  yield put(loadingAction.enableLoading());

  //how to call api
  let response = yield call(getAllNews);

  response = response;

  if (response && response.status == 'ok') {
    yield put(
      appAction.getAllNewsResponse({
        articles: response?.articles,
      }),
    );
  }
  yield put(loadingAction.enableLoading());

  //   AsyncStorage.setItem("@token", response.result.token);
  //   yield put(loadingAction.disableLoading());
  //   yield put(
  //     authActions.onLoginResponse({
  //       email: action.data.Email,
  //       token: response.result.token
  //     })
  //   );
  //   yield call(navigationActions.navigateToHome,"");
  //   let data =response.message
  //   yield put(snackbarActions.enableSnackbar(data));
  // } else if (response && response.status == false) {
  //   yield put(loadingAction.disableLoading());
  //   let data =response.message
  //   yield put(snackbarActions.enableSnackbar(data));
  // } else {
  //   yield put(loadingAction.disableLoading());
  //   let data = "something went wrong";
  //   yield put(snackbarActions.enableSnackbar(data));
  // }
}
