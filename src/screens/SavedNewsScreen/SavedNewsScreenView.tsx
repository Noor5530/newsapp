import {useIsFocused} from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {heightPercentageToDP as hp} from '../../utils/GetResponsiveHeight';
import {useSelector} from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';

import MenuHeader from '../../components/header/MenuHeader';
import NewsCard from '../../components/News/NewsCard';
import NewsCardShimmer from '../../components/Shimmer/NewsCardShimmer';
import {UserContext} from '../../Context/globals';
import {reducerState} from '../../utils/types';

interface props {}

const SavedNewsScreenView: React.FC<props> = props => {
  const {rootContainer, savedNewsScreen, colors, screen} = useTheme();
  const [t] = useTranslation();
  const toastRef = useRef();

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const context = useContext(UserContext);
  const saveNews = useSelector((state: reducerState) => state.user.saveNews);
  const [news, setNews] = useState([]);
  const {loggedIn, loginAlert} = context;
  const i18 = (key: string) => {
    return t(key);
  };
  useLayoutEffect(() => {
    setNews(Object.values(saveNews)?.reverse());
  }, [isFocused, Object.values(saveNews)?.length]);

  const renderNews = useCallback(({item, index}) => {
    return <NewsCard key={`id_${index}`} news={item} toastRef={toastRef} />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <Text style={savedNewsScreen.emptyText}>{i18('SavedNews.empty1')}</Text>
    );
  }, []);
  return (
    <View
      key="SavedNewsScreenView"
      style={{
        flex: 1,
        backgroundColor: colors.generic,
      }}>
      <MenuHeader />

      <FlatList
        // getItemLayout={(data, index) => ({
        //   length: hp('94%'),
        //   offset: hp('94%') * index,
        //   index,
        // })}
        // disableIntervalMomentum
        // disableScrollViewPanResponder
        style={{flex: 1, marginBottom: hp('9')}}
        // pagingEnabled={true}
        // updateCellsBatchingPeriod={10}
        // windowSize={5}
        // legacyImplementation={true}
        // decelerationRate={'fast'}
        data={news}
        keyExtractor={(item, index) => `id_${index}`}
        // initialNumToRender={8}
        // snapToInterval={hp('94%')}
        // maxToRenderPerBatch={5}
        // snapToAlignment="center"
        renderItem={renderNews}
        // removeClippedSubviews={true}
        ListEmptyComponent={ListEmptyComponent}></FlatList>
      <Toast
        ref={toastRef}
        position="center"
        style={{
          backgroundColor: colors.generic == '#FFFFFF' ? 'black' : 'white',
          borderRadius: 20,
          marginTop: hp('10'),
        }}
        textStyle={{color: colors.generic}}
        opacity={0.8}
      />
    </View>
  );
};

export default SavedNewsScreenView;
