import * as types from '../actions/types';
import { appState, responseAction } from '../utils/types';

const initialState: appState = {
  language: 'en',
  channels: {},
  tabs: [],
  newsStoreData: {},
};

const appReducer = (state = initialState, action: responseAction) => {
  switch (action.type) {
    case types.GET_CONFIG_RESPONSE: {
      return {
        ...state,
        tabs: action.payload.tabs,
        channels: action.payload.channels,
      };
    }
    case types.GET_CATEGORY_NEWS_RESPONSE: {
      return {
        ...state,
        newsStoreData: action.payload.news,
      };
    }
  
    default: {
      return state;
    }
  }
};

export default appReducer;
