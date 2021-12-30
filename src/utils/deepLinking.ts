import React from 'react';
import { Linking } from 'react-native';
import Config from 'react-native-config';

import NavigationService from '../navigation/NavigationService';

// import SplashScreen from "react-native-splash-screen";

export function navigateToDeepLink() {
  //this one is for dynamic links created manually

  Linking.getInitialURL().then(url => {
    if (url) {
      let page = url.split(Config.LINKING_URL).pop().split('/');

      if (page) {
        switch (page[1]) {
          case 'shareNews':
            NavigationService.navigate('ShareNews', {id: page[2]});
            break;
          default:
            NavigationService.navigate('Home', '');
        }
      }
    }
  });
}
