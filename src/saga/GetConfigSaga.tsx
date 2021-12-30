import {call, put} from 'redux-saga/effects';

import * as appAction from '../actions/appAction';
import * as loadingAction from '../actions/loadingAction';
import {actionFetchRemoteConfig, fetchServerConfig} from '../utils/GetConfig';

// Our worker Saga that logins the user
export default function* ConfigAsync() {
  try {
    yield put(loadingAction.enableLoading());
    let data = yield call(actionFetchRemoteConfig);
    yield call(fetchServerConfig);
    let response = data ? JSON.parse(data) : {};

    if (response) {
      let tempTabIndex = [];
      var sortable = [];
      for (var category in response?.Category) {
        sortable.push([category, response?.Category[category]]);
      }
      sortable.sort(function (a, b) {
        return a[1].order - b[1].order;
      });
      sortable?.map((item, index) => {
        var tabItem = {};
        tabItem['key'] = index;
        tabItem['title'] = item[1].name;
        tabItem['index'] = item[0];
        tabItem['categories'] = item[1].categories;
        tempTabIndex.push(tabItem);
      });
      if (tempTabIndex.length > 0) {
        yield put(
          appAction.getConfigResponse({
            tabs: tempTabIndex,
            channels: response?.Channel,
          }),
        );
      } else {
        yield put(loadingAction.disableLoading());
      }
    }
    yield put(loadingAction.disableRefreshing());
  } catch (error) {
    // let data = 'something went wrong';
    // yield put(snackbarActions.enableSnackbar(data));
    yield put(loadingAction.disableLoading());
    yield put(loadingAction.disableRefreshing());
  }
}
