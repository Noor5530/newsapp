import './utils/i18nNext';
import 'react-native-gesture-handler';
import {getConfigRequest} from '../src/actions/appAction';
import {enableRefreshing} from '../src/actions/loadingAction';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

import {firebase} from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import {Root} from 'native-base';
import React, {Suspense, useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  InteractionManager,
  Linking,
  SafeAreaView,
  useColorScheme,
  View,
  Platform,
  AsyncStorage,
} from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import {Provider as PaperProvider} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import DarkTheme from '../src/utils/DarkTheme';
import LightTheme from '../src/utils/LightTheme';
import {disableNightMode, enableNightMode} from './actions/userAction';
import PushNotifications from './components/PushNotifications';
import AppNavigator from './navigation';
import {persistor, store} from './store/store';
import {navigateToDeepLink} from './utils/deepLinking';
import { fetchServerConfig } from './utils/GetConfig';
import { reducerState } from './utils/types';

/* eslint-disable react/prop-types */
enableScreens();

const Loading = () => {
  return <View />;
};
const App = () => {
  const colorScheme = useColorScheme();
  const nightMode = useSelector((state: reducerState) => state.user.nightMode);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    fetchServerConfig()
    if (!nightMode && colorScheme == 'dark') {
      dispatch(enableNightMode());
    } else {
      dispatch(disableNightMode());
    }
  }, []);
  useEffect(() => {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }, []);
  const updateAlert = () =>
    Alert.alert(
      'Please Update',
      'You will have to update your app to latest version to continue using app',
      [
        {
          text: 'Update',
          onPress: () => {
            BackHandler.exitApp();
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.gsoft.newsapp',
            );
          },
        },
      ],
      {cancelable: false},
    );
  useLayoutEffect(() => {
    // dispatch(enableRefreshing());

    console.log('EntryPoint');
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      navigateToDeepLink();
      Linking.addEventListener('url', url => {});
      dispatch(getConfigRequest());

      setTimeout(() => {
        SplashScreen.hide();
      }, 5000);
    });
    return () => {
      interactionPromise.cancel();
    };
  }, []);
  const checkIfFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('HAS_LAUNCHED');
      if (hasLaunched === null) {
        AsyncStorage.setItem('HAS_LAUNCHED', 'true');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    checkIfFirstLaunch().then(data => {
      if (data == true)
        setTimeout(() => {
          console.log('I am appearing...', 'After 10 seconds!');
          dispatch(getConfigRequest());
        }, 4000);
    });
  }, []);
  useEffect(() => {
    const analytics = async () => {
      await firebase.analytics().setAnalyticsCollectionEnabled(true);
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 0,
      });
    };
    analytics();
  }, []);

  return (
    <PaperProvider theme={nightMode ? DarkTheme : LightTheme}>
      <AppNavigator />
      <PushNotifications />
    </PaperProvider>
  );
};

const codePushOptions = {
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const mainComponent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SafeAreaView style={{flex: 1}}>
        <Root>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </Root>
      </SafeAreaView>
    </Suspense>
  );
};

export default codePush(codePushOptions)(mainComponent);
// export default mainComponent;
