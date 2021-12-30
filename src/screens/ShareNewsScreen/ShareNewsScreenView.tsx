import {useIsFocused, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {enableSnackbar} from '../../actions/snackbarActions';
import getNewsdetail from '../../api/methods/getNewsdetail';
import DetailHeader from '../../components/header/DetailHeader';
import NewsDetailCard from '../../components/News/NewsDetailCard';
import NewsCardShimmer from '../../components/Shimmer/NewsCardShimmer';

interface props {}

const ShareNewsScreenView: React.FC<props> = props => {
  const {rootContainer, savedNewsScreen} = useTheme();
  const dispatch = useDispatch();
  const route = useRoute();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    setLoading(true);
    getNewsdetail(route?.params?.id)
      .then(response => {
        if (response && response.status == true && isFocused) {
          // setPost(response.data)s
          setNews(response.data);

          setLoading(false);
        } else {
          dispatch(enableSnackbar(' یہ خبر موجود نہیں '));
          setLoading(false);
        }
      })
      .catch(() => {});
  }, [route?.params.id]);
  return (
    <View key={'ShareNewsScreenView'} style={rootContainer}>
      <DetailHeader goBackShare={true} />
      {loading ? (
        <NewsCardShimmer loading={loading} />
      ) : news ? (
        <NewsDetailCard news={news} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ShareNewsScreenView;
