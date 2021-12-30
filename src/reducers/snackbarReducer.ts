import * as types from "../actions/types";
import { snackBarAction,snackBarState } from '../utils/types';


const initialState:snackBarState = {
  isSnackbarVisible: false,
  message: "",

};

const snackbarReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case types.ENABLE_SNACKBAR: {
      return {
        ...state,
        isSnackbarVisible: true,
        message: action.message
      };
    }
    case types.DISABLE_SNACKBAR: {
      return {
        ...state,
        isSnackbarVisible: false,
        message: ""
      };
    }

    default: {
      return state;
    }
  }
};

export default snackbarReducer;
