import {NavigationContainer} from '@react-navigation/native';
import {Toast} from 'native-base';
import React, {useEffect} from 'react';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';
import {BannerView} from 'react-native-fbads';

import {Platform, View} from 'react-native';
import {disableSnackbar} from '../actions/snackbarActions';
import LightTheme from '../utils/LightTheme';
import {reducerState} from '../utils/types';
import NavigationService from './NavigationService';
import NavigationStack from './NavigationStack';
import VersionCheckController from '../components/VersionCheckController';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
const AppNavigator = () => {
  const adUnitId =
    Platform.OS == 'ios'
      ? 'ca-app-pub-7665472428962479/2106734767'
      : 'ca-app-pub-7665472428962479/3298734492';
  const dispatch = useDispatch();
  const linking = {
    prefixes: [Config.LINKING_URL],

    config: {
      screens: {
        App: {
          path: 'app',
          initialRouteName: 'Home',
          screens: {
            Home: {
              path: 'Home',
              initialRouteName: 'Home',
              screens: {
                ShareNews: 'shareNews/:id',
              },
            },
          },
        },
      },
    },
  };
  const message = useSelector((state: reducerState) => state.snackbar.message);
  const isSnackbarVisible = useSelector(
    (state: reducerState) => state.snackbar.isSnackbarVisible,
  );

  useEffect(() => {
    if (message != '' && isSnackbarVisible) {
      Toast.show({
        text: message,

        duration: 4000,
        position: 'bottom',
        onClose: () => {
          dispatch(disableSnackbar());
        },
      });
    }
    setTimeout(() => {
      dispatch(disableSnackbar());
    }, 2000);
  }, [message, isSnackbarVisible]);

  return (
    <>
      <VersionCheckController />

      <NavigationContainer
        theme={LightTheme}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}>
        <NavigationStack />
      </NavigationContainer>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'transparent',
          // height: hp('15'),
        }}>
        <BannerAd unitId={adUnitId} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View>
    </>
  );
};

export default AppNavigator;
