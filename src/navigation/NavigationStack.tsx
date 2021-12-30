import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import VersionCheckController from '../components/VersionCheckController';

import ChannelNewsScreen from '../screens/ChannelNewsScreen';
import DetailScreen from '../screens/DetailScreen';
import MyFeedScreen from '../screens/MyFeedScreen';
import PrivacyPolicy from '../screens/PrivacyPolicyScreen';
import SavedNewsScreen from '../screens/SavedNewsScreen';
import ShareNewsScreen from '../screens/ShareNewsScreen';
import DrawerComponent from './DrawerComponent';

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ApplicationStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const MainStackScreens = () => {
  return (
    <AppStack.Navigator initialRouteName={'Home'} headerMode="none">
      <AppStack.Screen name="Home" component={MyFeedScreen} />
      <AppStack.Screen name="Detail" component={DetailScreen} />
      <AppStack.Screen name="ShareNews" component={ShareNewsScreen} />
    </AppStack.Navigator>
  );
};

const DrawerStackScreens = () => {
  const {drawerStack, colors} = useTheme();

  return (
    <DrawerStack.Navigator
      initialRouteName="Home"
      drawerContentOptions={drawerStack.drawerContentOptions}
      drawerStyle={drawerStack.drawerStyle}
      drawerContent={props => <DrawerComponent />}>
      <DrawerStack.Screen name="Home" component={MyFeedScreen} />
      <DrawerStack.Screen name="ChannelNews" component={ChannelNewsScreen} />
      <DrawerStack.Screen name="SavedNews" component={SavedNewsScreen} />
      <DrawerStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <DrawerStack.Screen name="Detail" component={DetailScreen} />
      <DrawerStack.Screen name="ShareNews" component={ShareNewsScreen} />
    </DrawerStack.Navigator>
  );
};

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
      {/* <ApplicationStack.Screen name="SplashScreen" component={SplashScreen} /> */}

      <AppStack.Screen name="SignIn" component={SignInScreen} />
      <AppStack.Screen name="SignUp" component={SignUpScreen} />
      <AppStack.Screen name="Conformation" component={ConformationScreen} />
    </AuthStack.Navigator>
  );
};

const NavigationStack = () => {
  return (
    <ApplicationStack.Navigator headerMode="none" initialRouteName="App">
      <ApplicationStack.Screen name="App" component={DrawerStackScreens} />
    </ApplicationStack.Navigator>
  );
};

export default NavigationStack;
