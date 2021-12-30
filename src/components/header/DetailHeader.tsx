/* eslint-disable react/prop-types */
import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NewsLogo from '../../assets/images/HeaderIcon.png';
import Logo from '../../assets/images/PakistanUrduNewsLogo.png';
import Image from '../Image';
import { useTheme } from 'react-native-paper';


interface props {
  style?: object;
  goBackShare?: boolean;
}

function DetailHeader(props: props) {
  const navigation = useNavigation();
  const { colors, detailHeader, menuHeader } = useTheme();
  const [t] = useTranslation();

  const i18 = (key: string) => {
    return t(key);
  };
  const goBack = () => {
    props.goBackShare ? navigation.navigate('Home') : navigation.goBack();
  };

  return (
    <View style={detailHeader.container}>
      <TouchableOpacity onPress={goBack} style={detailHeader.back}>
        <MaterialIcons
          name="arrow-back"
          size={wp('6')}
          color={colors.primaryTextColor}
        />
      </TouchableOpacity>
      <Image source={NewsLogo} style={detailHeader.logoImage} />

      {/* <Text style={detailHeader.text}>{i18('DetailHeader.title')}</Text> */}
      <View style={detailHeader.image} />
    </View>
  );
}

export default memo(DetailHeader);
