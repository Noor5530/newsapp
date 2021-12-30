import React, {createContext, useState} from 'react';
import {Platform} from 'react-native';

export var paddingTop = Platform.OS == 'ios' ? 25 : 5;
export type UserContext = {
  loading: boolean;

  enableLoading: () => void;
  signOut: () => void;
  loggedIn: boolean;
  guestUser: boolean;
  userData: object;
  logIn: (user: any) => void;
  logOut: () => void;
  loginAlert: () => void;

  disableLoading: () => void;
  enableGuest: () => void;
  disableGuest: () => void;

  enableSnackBar: (
    type: 'success' | 'error' | 'info',
    heading: string,
    message: string,
  ) => void;
};

export const UserContext = createContext<UserContext>({});
