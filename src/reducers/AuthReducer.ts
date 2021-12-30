/* Login Reducer
 * handles login states in the app
 */
import * as types from "../actions/types";
import { responseAction, authState } from '../utils/types';


const initialState:authState = {
  isLoggedIn: false,
  id: -1,
  username: "",
  password: "",
  token: "",
  email: ""
};

const loginReducer = (state = initialState, action:responseAction) => {
  switch (action.type) {
    case types.LOGIN_RESPONSE: {
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        isLoggedIn: true
      };
    }
    case types.REGISTER_RESPONSE: {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        provider: "email",
        isLoggedIn: true
      };
    }
    case types.REGISTER_RESPONSE: {
      return {
        ...state,
        username: "",
        email: "",
        token: "",
        provider: "email",
        isLoggedIn: false
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
