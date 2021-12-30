import * as types from '../actions/types';
import { loadingState, responseAction } from '../utils/types';

const initialState: loadingState = {
  isLoadingVisible: false,
  refreshing: true,
};

// Redux: Counter Reducer
const loadingReducer = (state = initialState, action: responseAction) => {
  switch (action.type) {
    case types.LOADING_ENABLE_LOADER: {
      return {
        ...state,
        isLoadingVisible: true,
      };
    }
    case types.LOADING_DISABLE_LOADER: {
      return {
        ...state,
        isLoadingVisible: false,
      };
    }
    case types.DISABLE_REFRESHING: {
      return {
        ...state,
        refreshing: false,
      };
    }
    case types.ENABLE_REFRESHING: {
      return {
        ...state,
        refreshing: true,
      };
    }

    default: {
      return state;
    }
  }
};

// Exports
export default loadingReducer;
