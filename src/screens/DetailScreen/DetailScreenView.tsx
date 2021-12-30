import {useRoute, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

import DetailHeader from '../../components/header/DetailHeader';

interface props {}

const DetailScreenView: React.FC<props> = props => {
  const route = useRoute();
  const {rootContainer, colors} = useTheme();
  const isFocused = useIsFocused();
  const [link, setLink] = useState(null);
  const [noInternet, setNoInternet] = useState(false);
  const webViewRef = useRef(WebView);

  useFocusEffect(
    React.useCallback(() => {
      setLink(route.params.id);

      return () => {
        setNoInternet(false);
        setLink(null);
      };
    }, [route.params.id]),
  );

  return (
    <View key="DetailScreenView" style={rootContainer}>
      <DetailHeader />
      {link && noInternet ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>اپنا انٹرنیٹ کنکشن چیک کریں</Text>
        </View>
      ) : (
        link && (
          <WebView
            source={{
              uri: link,
            }}
            onError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              if (
                nativeEvent?.description == 'net::ERR_INTERNET_DISCONNECTED'
              ) {
                setNoInternet(true);
              }
            }}
            style={rootContainer}
            startInLoadingState={true}
            renderLoading={() => {
              return (
                <View
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
        )
      )}
    </View>
  );
};

export default DetailScreenView;
