import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';

import DetailHeader from '../../components/header/DetailHeader';

interface props {}

const PrivacyPolicyView: React.FC<props> = props => {
  const route = useRoute();
  const {rootContainer, colors} = useTheme();

  return (
    <View key="PrivacyPolicy" style={rootContainer}>
      <DetailHeader />

      <WebView
        style={rootContainer}
        source={{
          uri: 'http://news-9d3f2.web.app/',
        }}
        startInLoadingState={true}
        renderLoading={() => {
          return (
            <View
              key="PrivacyPolicyLoading"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: hp('100'),
                width: wp('100'),
              }}>
              <ActivityIndicator color={colors.primary} size="large" />
            </View>
          );
        }}
      />
    </View>
  );
};

export default PrivacyPolicyView;
