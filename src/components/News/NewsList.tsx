import analytics from '@react-native-firebase/analytics';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import Toast, {DURATION} from 'react-native-easy-toast';
import useHandleScroll from './../../hooks/scrollDirection';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';
import {BannerView} from 'react-native-fbads';

import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  AsyncStorage,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {heightPercentageToDP as hp} from '../../utils/GetResponsiveHeight';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {getCategoryNewsRequest} from '../../actions/appAction';
import {
  disableLoading,
  disableRefreshing,
  enableLoading,
} from '../../actions/loadingAction';
import {enableSnackbar} from '../../actions/snackbarActions';
import getCategoryNews from '../../api/methods/getCategoryNews';
import NewsCard from '../../components/News/NewsCard';
import NewsCardShimmer from '../../components/Shimmer/NewsCardShimmer';
import {reducerState} from '../../utils/types';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export type NewsListProps = {
  user?: object;
  id?: string;
  index: any;
  custom: boolean;
  categories: string;
  focusedTabs?: Array<any>;
  setFocusTabs?: (data: Array<any>) => void;
  refreshing: boolean;
  setRefreshing: (data: boolean) => void;
  channel?: string;
  focus?: number;
};
const NewsList = (props: NewsListProps) => {
  const {colors, newsList, rootContainer, screen} = useTheme();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const toastRef = useRef();
  const {handleScroll, showButton} = useHandleScroll();
  const [admin, setAdmin] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(2);
  const {index} = props;
  const adminCredentials = useSelector(
    (state: reducerState) => state.user.adminCredentials,
  );
  const adUnitId =
    Platform.OS == 'ios'
      ? 'ca-app-pub-7665472428962479/2106734767'
      : 'ca-app-pub-7665472428962479/3298734492';
  // const fbAdId =
  //   Platform.OS == 'ios'
  //     ? '4048601501858462_4705577276160878'
  //     : '4048601501858462_4129537150431563';
  const navigation = useNavigation();
  const [pagingLoading, setPagingLoading] = useState(false);
  const [paginationError, setPaginationError] = useState('');
  const loading = useSelector(
    (state: reducerState) => state.loading.isLoadingVisible,
  );
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const route = useRoute();
  const {categories, title, key, channel} = route.params;
  const newsStoreData = useSelector(
    (state: reducerState) => state.app?.newsStoreData[categories],
  );
  const [news, setNews] = useState(null);
  const refreshing = useSelector(
    (state: reducerState) => state.loading.refreshing,
  );
  const flatListRef = useRef(FlatList);
  const [t] = useTranslation();
  const i18 = (key: string) => {
    return t(key);
  };

  useLayoutEffect(() => {
    dispatch(disableRefreshing());
    analytics().logScreenView({
      screen_name: title,
      screen_class: channel,
    });
    if (!channel) {
      moveToTop();
      dispatch(
        getCategoryNewsRequest({
          category: categories,
          source: channel,
        }),
      );
      setPageNumber(2);
      setPaginationError('');
    }
  }, [channel]);

  const tempCheck = async () => {
    if (adminCredentials?.userName?.length > 0) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };
  useEffect(() => {
    tempCheck();
  }, [adminCredentials]);

  useEffect(() => {
    if (refreshing && !loading) {
      moveToTop();
      dispatch(
        getCategoryNewsRequest({
          category: categories,
          source: channel,
        }),
      );
      setPageNumber(2);
    }
  }, [refreshing]);

  useLayoutEffect(() => {
    const getChannelNews = async () => {
      setPaginationError('');
      setPageNumber(2);
      dispatch(enableLoading());
      let response = await getCategoryNews(
        {
          category: categories,
          source: channel,
        },
        1,
        20,
      );
      if (response && response.status == true) {
        setNews(response.data);
      }
      dispatch(disableLoading());
    };
    if (channel) {
      getChannelNews();
    } else {
      setNews(newsStoreData);
    }
  }, [newsStoreData, channel, title]);

  const onEndReach = async () => {
    if (!pagingLoading && news && news.length > 19 && paginationError == '') {
      setPagingLoading(true);

      let response = await getCategoryNews(
        {
          category: categories,
          source: channel,
        },
        pageNumber,
        30,
      );
      if (response && response.status == true && response.data) {
        setNews(prv => prv.concat(response.data));
        if (response.data.length > 0) {
          setPageNumber(prev => prev + 1);
          if (response.message) toastRef.current.show(response.message, 1000);
        } else {
          setPaginationError('0 news found');
        }
        setPagingLoading(false);
      } else {
        setPaginationError('0 news found');
        setPagingLoading(false);
      }
    }
  };
  const onRefresh = () => {
    dispatch(
      getCategoryNewsRequest({
        category: categories,
        source: channel,
      }),
    );
  };
  const moveToTop = () => {
    if (flatListRef.current && news) {
      flatListRef.current.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  };

  const renderNews = useCallback(
    ({item, index}) => {
      return (
        <View key={`id_${index}`}>
          <NewsCard
            key={`id_${index}`}
            admin={admin}
            news={item}
            moveToTop={moveToTop}
            index={index}
            toastRef={toastRef}
          />
          {/* {index > 2 && (
            <TouchableOpacity
              onPress={moveToTop}
              style={{
                position: 'absolute',
                bottom: hp('10'),
                left: widthPercentageToDP('4.3'),
                backgroundColor: '#ffffff',
                height: hp('4'),
                width: hp('4'),
                borderRadius: hp('2'),
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 8,
              }}>
              <AntDesign
                size={hp('3')}
                name={'arrowup'}
                color={colors.primary}
              />
            </TouchableOpacity>
          )} */}
        </View>
      );
    },
    [moveToTop],
  );
  const ListEmptyComponent = useMemo(() => {
    return loading || pagingLoading ? (
      <NewsCardShimmer loading={loading} />
    ) : (
      <Text style={newsList.emptyText}>{i18('NewsList.empty')}</Text>
    );
  }, [loading, pagingLoading]);

  // const memoizedValue = useMemo(() => renderItem, [productsState.product]);

  const ListFooterComponent = useMemo(() => {
    return pagingLoading ? (
      <View style={{padding: 20}}>
        <ActivityIndicator color={colors.primaryTextColor} size="small" />
      </View>
    ) : (
      <View style={{padding: 20}} />
    );
  }, [pagingLoading]);

  return (
    <SafeAreaView style={{backgroundColor: colors.scrollBackGround}}>
      {/* <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER} /> */}
      {/* <BannerView
        placementId={fbAdId}
        type="standard"
        onPress={() => console.log('click')}
        onLoad={() => console.log('loaded')}
        onError={err => console.log('error', err)}
        style={{height: 80, width: 400}}
      /> */}
      <FlatList
        ref={flatListRef}
        refreshing={loading}
        onRefresh={onRefresh}
        contentContainerStyle={{paddingBottom: hp('10')}}
        // getItemLayout={(data, index) => ({
        //   length: hp('88%'),
        //   offset: hp('88%') * index,
        //   index,
        // })}
        // disableIntervalMomentum
        // disableScrollViewPanResponder
        // pagingEnabled={true}
        // decelerationRate={'fast'}
        data={news}
        keyExtractor={(item, index) => `id_${index}`}
        // initialNumToRender={Platform.OS == 'android' ? 5 : 30}
        // updateCellsBatchingPeriod={Platform.OS == 'android' ? 10 : 30}
        // windowSize={Platform.OS == 'android' ? 5 : 30}
        // maxToRenderPerBatch={Platform.OS == 'android' ? 5 : 30}
        // disableVirtualization={true}
        onEndReached={onEndReach}
        // snapToInterval={hp('88%')}
        // snapToAlignment="start"
        renderItem={renderNews}
        // snapToOffsets={[...Array(news?.length)].map((x, i) => hp('88%') * i)}
        // removeClippedSubviews={true}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        onScroll={handleScroll}
        // onScroll={event => {
        //   console.log(event.nativeEvent);
        //   // setContentVerticalOffset(event.nativeEvent.contentOffset);
        // }}
      />
      {showButton && !loading && news?.length > 0 && (
        <TouchableOpacity
          onPress={moveToTop}
          style={{
            position: 'absolute',
            bottom: hp('10'),
            left: widthPercentageToDP('4.3'),
            backgroundColor: '#ffffff',
            height: hp('4'),
            width: hp('4'),
            borderRadius: hp('2'),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          <AntDesign size={hp('3')} name={'arrowup'} color={colors.primary} />
        </TouchableOpacity>
      )}
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
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'transparent',
          // height: hp('15'),
        }}>
        <BannerAd unitId={adUnitId} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View> */}
    </SafeAreaView>
  );
};

export default NewsList;
