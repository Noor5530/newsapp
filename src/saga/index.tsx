import {all, takeEvery} from 'redux-saga/effects';

import * as types from '../actions/types';
import GetCategoryNewsSaga from './GetCategoryNewsSaga';
import GetConfigSaga from './GetConfigSaga';
import loginSaga from './LoginSaga';
import registerSaga from './RegisterSaga';

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, loginSaga),
    takeEvery(types.REGISTER_REQUEST, registerSaga),
    takeEvery(types.GET_CONFIG_REQUEST, GetConfigSaga),
    takeEvery(types.GET_CATEGORY_NEWS_REQUEST, GetCategoryNewsSaga),
  ]);
}
