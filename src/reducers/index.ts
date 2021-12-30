/*
 * combines all th existing reducers
 */
import { combineReducers } from 'redux';

import appReducer from './appReducer';
import loadingReducer from './loadingReducer';
import snackbarReducer from './snackbarReducer';
import saveNewsReducer from './userReducer';

// export default Object.assign(loginReducer, loadingReducer);

// const rootReducer = combineReducers({ loginReducer, loadingReducer });
// import counterReducer from './counterReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  loading: loadingReducer,
  snackbar: snackbarReducer,
  app: appReducer,
  user: saveNewsReducer,
});

// Exports
export default rootReducer;
