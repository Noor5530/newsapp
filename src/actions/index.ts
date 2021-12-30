// export action creators
import * as appAction from './appAction';
import * as loadingAction from './loadingAction';
import * as navigationActions from './navigationActions';
import * as snackbarActions from './snackbarActions';
import * as userAction from './userAction';

export const ActionCreators = Object.assign(
  {},
  loadingAction,
  navigationActions,
  snackbarActions,
  appAction,
  userAction,
);
