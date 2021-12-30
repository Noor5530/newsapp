/* eslint-disable react/prop-types */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import { reducerState } from '../utils/types';

interface props {}

const BottomTab: React.FC<props> = (props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const language = useSelector((state: reducerState) => state.app.language);
  const [t, i18n] = useTranslation();
  const [keyBoardVisible, setKeyBoardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const activeTab = useSelector((state: reducerState) => state.app.activeTab);
  useEffect(() => {
    let keyboardDidShowListener: any;

    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );

    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      if (keyboardDidShowListener) {
        keyboardDidShowListener.remove();
      }
    };
  }, []);

  const i18 = (key: string) => {
    return t(key);
  };

  const keyboardDidHide = (e: any) => {
    setKeyBoardVisible(false);
    setKeyboardHeight(0); // sets the height after opening the keyboard
  };

  const keyboardDidShow = (e: any) => {
    setKeyBoardVisible(true);
    setKeyboardHeight(e.endCoordinates.height); // sets the height after opening the keyboard
  };

  return (
    <>
      {keyBoardVisible == false && (
        <View>
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#f5f5f5',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor:
                  activeTab == 'home' || activeTab == 'contact'
                    ? colors.primary
                    : 'transparent',
              }}>
              <AntDesign
                name="home"
                size={30}
                color={
                  activeTab == 'home' || activeTab == 'contact'
                    ? colors.section
                    : colors.profileTextColor
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  activeTab == 'myDonations' ? colors.primary : 'transparent',
              }}>
              <Feather
                name="box"
                size={30}
                color={
                  activeTab == 'myDonations'
                    ? colors.section
                    : colors.profileTextColor
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  activeTab == 'myAccount' ? colors.primary : 'transparent',
              }}>
              <MaterialIcons
                name="person-outline"
                size={30}
                color={
                  activeTab == 'myAccount'
                    ? colors.section
                    : colors.profileTextColor
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  activeTab == 'favorite' ? colors.primary : 'transparent',
              }}>
              <FontAwesome
                name="heart-o"
                size={25}
                color={
                  activeTab == 'favorite'
                    ? colors.section
                    : colors.profileTextColor
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  activeTab == 'about' ? colors.primary : 'transparent',
              }}>
              <Ionicons
                name="ios-information-circle-outline"
                size={30}
                color={
                  activeTab == 'about'
                    ? colors.section
                    : colors.profileTextColor
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default BottomTab;
