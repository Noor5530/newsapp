import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import NewsLogo from '../../assets/images/HeaderIcon.png';

import Logo from '../../assets/images/PakistanUrduNewsLogo.png';
import {enableRefreshing} from '../../actions/loadingAction';
import Image from '../Image';

/* eslint-disable react/prop-types */
interface props {
  style?: object;
  refresh?: boolean;
  setRefreshing?: (data: boolean) => void;
  title?: string;
  backButton?: boolean;
  goBack?: () => void;
}
function MenuHeader(props: props) {
  const navigation = useNavigation();
  const {colors, menuHeader, detailHeader} = useTheme();
  const [t] = useTranslation();
  const i18 = (key: string) => {
    return t(key);
  };
  const dispatch = useDispatch();

  const refreshing = useCallback(() => {
    dispatch(enableRefreshing());
  }, []);
  return (
    <View style={props.refresh ? menuHeader.container : menuHeader.containerWithShadow}>
      <TouchableOpacity
        onPress={() => {
          if (props.backButton) {
            props.goBack();
          } else {
            navigation.openDrawer();
          }
        }}
        style={menuHeader.back}>
        {!props.backButton ? (
          <MaterialIcons
            name="menu"
            size={wp('6')}
            color={colors.primary}
          />
        ) : (
          <AntDesign
            name="left"
            size={wp('6')}
            color={colors.primaryTextColor}
          />
        )}
      </TouchableOpacity>
        <Image source={NewsLogo} style={menuHeader.image} />
        {/* <Text style={menuHeader.text}>
          {props.title && props.title != ''
            ? props.title
            : t('MenuHeader.title')}
        </Text> */}
      {props.refresh ? (
        <TouchableOpacity onPress={refreshing}>
          <MaterialIcons name="refresh" size={wp('6')} color={colors.primary} />
        </TouchableOpacity>
      ) : (
          <View style={detailHeader.image} />
      )}
    </View>
  );
}

export default memo(MenuHeader);
