import {call, delay, put, select} from 'redux-saga/effects';

import * as appAction from '../actions/appAction';
import * as loadingAction from '../actions/loadingAction';
import * as snackbarActions from '../actions/snackbarActions';
import getCategoryNews from '../api/methods/getCategoryNews';
import {reducerState, requestAction} from '../utils/types';

// Our worker Saga that logins the user
export default function* AllNewsAsync(action: requestAction) {
  try {
    yield put(loadingAction.enableLoading());
    let news = yield select((state: reducerState) => state.app.newsStoreData);
    let response = yield call(getCategoryNews, action.data, 1, 30);
    console.log('responsegetNews', response);
    // response = response;
    if (response && response.status == true) {
      if (response?.data.length > 0) {
        news[action.data.category] = response.data;

        yield put(
          appAction.getCategoryNewsResponse({
            news: news,
            key: action.data.category,
          }),
        );
      }
      yield delay(1000);
      yield put(loadingAction.disableLoading());
    } else if (response.message == 'Network request failed') {
      yield put(loadingAction.disableLoading());

      yield put(snackbarActions.enableSnackbar('اپنا انٹرنیٹ کنکشن چیک کریں'));
    } else {
      yield put(loadingAction.disableLoading());
      let data = 'سرور سے رابطہ منقطع ہوگیا ہے';
      yield put(snackbarActions.enableSnackbar(data));
    }
  } catch (error) {
    yield put(loadingAction.disableLoading());
    let data = 'سرور سے رابطہ منقطع ہوگیا ہے';
    yield put(snackbarActions.enableSnackbar(data));
  }
}
