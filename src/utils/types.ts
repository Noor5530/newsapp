export interface requestAction {
  type: string;
  data: any;
}

export interface responseAction {
  type: string;
  payload: any;
}

export interface loadingAction {
  type: string;
}

export interface snackBarAction {
  type: string;
  message: any;
}

export interface snackBarState {
  isSnackbarVisible: boolean;
  message: string;
}

export interface loadingState {
  isLoadingVisible: boolean;
  refreshing: boolean;
}

export interface authState {
  isLoggedIn: boolean;
  id: number;
  username: string;
  password: string;
  token: string;
  email: string;
}

export interface appState {
  language: string;
  channels: Object;
  tabs: Array<any>;
  newsStoreData: Object;
}

export interface userState {
  saveNews: Object;
  isNotification: boolean;
  nightMode: boolean;
  adminCredentials: object;

}

export interface reducerState {
  loading: loadingState;
  app: appState;
  snackbar: snackBarState;
  user: userState;
}
export type Theme = {
  fonts: {
    family: string;
  };

  colors: {
    generic: string;
    primary: string;
    section: string;
    textColor: string;
    errorColor: string;
    fbColor: string;
    gColor: string;
    profileTextColor: string;
  };

  screen: {
    width: number;
    height: number;
  };

  authScreen: {
    inputContainer: {
      flexDirection: string;
      backgroundColor: string;
      width: number | string;
      height: number | string;
      alignSelf: string;
      borderRadius: number;
      alignItems: string;
      paddingLeft: number;
      marginVertical: number;
    };
    input: {
      width: number | string;
      paddingLeft: number;
      color: string;
      fontSize: number;
      fontFamily: string;
    };
    error: {
      width: number | string;
      alignSelf: string;
      paddingLeft: number;
    };
    button: {
      width: number | string;
      height: number;
      borderRadius: string;
      marginVertical: number;
      justifyContent: string;
      alignItems: string;
    };
    logo: {
      width: number | string;
      height: number | string;
      justifyContent: string;
      alignItems: string;
    };
  };
  introScreen: {
    buttonText: {
      fontSize: number;
      fontWeight: string;
      alignSelf: string;
      color: string;
      textAlign: string;
    };
    button: {
      width: number | string;
      height: number | string;
      borderRadius: number;
      shadowColor: string;
      shadowOffset: {
        width: number | string;
        height: number | string;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
      alignSelf: string;
      justifyContent: string;

      alignItems: string;
      marginTop: number;
    };
  };
};
