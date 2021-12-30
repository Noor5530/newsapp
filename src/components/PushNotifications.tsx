import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import Config from 'react-native-config';
import NotificationPopup from 'react-native-push-notification-popup';
import {useDispatch, useSelector} from 'react-redux';

import NavigationService from '../navigation/NavigationService';
import {reducerState} from '../utils/types';

const PushNotification = () => {
  const dispatch = useDispatch();
  const isNotification = useSelector(
    (state: reducerState) => state.user.isNotification,
  );
  const popup = useRef(NotificationPopup);

  useEffect(() => {
    checkPermission();
    createNotificationListeners();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      console.log('remote', remoteMessage);
      // showAlert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body,
      // );
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    var fcm_token = await messaging().getToken();
    console.log('getToken', fcm_token);
    await AsyncStorage.setItem('@fcm_token', fcm_token);
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    console.log('enabled', enabled, isNotification);
    if (enabled != -1 && isNotification) {
      messaging()
        .subscribeToTopic(Config.NotificationTopic)
        .then(() => console.log('Subscribed to topic!'));
      messaging()
        .subscribeToTopic(Config.AppNotificationTopic)
        .then(() => console.log('Subscribed to topic ff !'));
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled && isNotification) {
      messaging()
        .subscribeToTopic(Config.NotificationTopic)
        .then(() => console.log('Subscribed to topic!'));
      messaging()
        .subscribeToTopic(Config.AppNotificationTopic)
        .then(() => console.log('Subscribed to topic!'));
    }
  };

  const showAlert = (title: string, body: string) => {
    popup.current.show({
      onPress: function () {
        console.log('Pressed');
      },
      //  appIconSource: require('./assets/icon.jpg'),
      appTitle: 'News App',
      timeText: 'Now',
      title: title,
      body: body,
    });
  };

  const createNotificationListeners = async () => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.id) {
          NavigationService.navigate('ShareNews', {
            id: remoteMessage?.data?.id,
          });
        } else if (remoteMessage?.data?.url) {
          Linking.openURL(remoteMessage?.data?.url);
        }
      });
  };

  return <NotificationPopup ref={popup} />;
};

export default PushNotification;
