import 'moment/locale/ur';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import sendNotification from '../../api/methods/notification';
import React, {
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Share,
  Text,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
  View,
  ViewPagerAndroidComponent,
  ViewStyle,
  LayoutAnimation,
  Platform,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import Toast, {DURATION} from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/GetResponsiveHeight';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import {saveNewsResponse} from '../../actions/userAction';
import Image from '../../components/ImageBackground';
import {reducerState} from '../../utils/types';

moment.locale('ur');

export type NewsCardProps = {
  news?: any;
  style?: ViewStyle;
  admin: boolean;
  key: string;
};

const NewsCard = (props: NewsCardProps) => {
  const {colors, newsCard} = useTheme();
  const dispatch = useDispatch();
  const adUnitId =
    Platform.OS == 'ios'
      ? 'ca-app-pub-7665472428962479/2106734767'
      : 'ca-app-pub-7665472428962479/3298734492';

  const {news, toastRef} = props;
  const [isNewsSaved, setIsNewsSaved] = useState(false);
  const channels = useSelector((state: reducerState) => state.app?.channels);
  const saveNews = useSelector((state: reducerState) => state.user?.saveNews);
  const [summaryLines, setSummaryLines] = useState(3);
  const [imageHeight, setImageHeight] = useState(50);
  const [expandNews, setExpandNews] = useState(false);
  const adminCredentials = useSelector(
    (state: reducerState) => state.user.adminCredentials,
  );
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [t] = useTranslation();
  const i18 = (key: string) => {
    return t(key);
  };

  const navigation = useNavigation();
  useEffect(() => {
    checkNewsSaved(); // checkNewsFollow();
  }, [Object.keys(saveNews).length]);

  const checkNewsSaved = async () => {
    if (saveNews && saveNews[news._id]) {
      setIsNewsSaved(true);
    } else {
      setIsNewsSaved(false);
    }
  };
  const saveTheNews = () => {
    toastRef.current.show('خبر غیر محفوظ ہو گئی', 1000);

    let tempNewsSave = saveNews;
    if (isNewsSaved) {
      delete tempNewsSave[news._id];
      setIsNewsSaved(false);

      dispatch(saveNewsResponse({news: tempNewsSave}));
    } else {
      toastRef.current.show('خبر محفوظ ہو گئی', 1000);

      tempNewsSave[news._id] = news;
      setIsNewsSaved(true);

      dispatch(saveNewsResponse({news: tempNewsSave}));
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${Config.LINKING_URL}/shareNews/${news._id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandNews(prv => !prv);
  };
  const onTextLayout = useCallback(e => {
    setNumberOfLines(e.nativeEvent.lines.length);
    // setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  const askForConfirmation = () =>
    Alert.alert('Urdu Shorts', 'Do you want to send the notification?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          sendNotification({
            credentials: {
              userName: adminCredentials.userName,
              password: adminCredentials.password,
            },
            body: {
              newsId: news._id,
              topic: 'urdushort',
            },
          }).then(response => {
            console.log('response', response);

            if (response.status == 200) {
              toastRef.current.show('Notification sent', 1000);
            } else {
              toastRef.current.show('Failed to send notification', 1000);
            }
          });
        },
      },
    ]);

  const notificationSend = () => {
    askForConfirmation();
  };
  return (
    <>
      {((props?.index % 15 == 0 && props.index != 0) || props.index == 3) && (
        <View
          style={{width: '100%', alignItems: 'center', paddingVertical: 10}}>
          <BannerAd unitId={adUnitId} size={BannerAdSize.MEDIUM_RECTANGLE} />
        </View>
      )}
      <Pressable
        onPress={toggleExpand}
        style={[newsCard.container, props.style]}>
        <Image
          // resizeMode="cover"
          source={{
            uri: news?.image,
          }}
          style={[newsCard.image, {height: hp('30')}]}>
          {!expandNews && (
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: colors.generic,
                  marginBottom: -10,
                  width: '100%',
                }}>
                <Text
                  // onPress={toggleExpand}
                  onTextLayout={onTextLayout}
                  style={newsCard.title}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {news?.title}
                </Text>
              </View>
            </View>
          )}
        </Image>

        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
          <View
            style={{
              // position: 'absolute',
              bottom: 0,
              backgroundColor: colors.generic,

              width: '100%',
            }}>
            <View>
              {expandNews && (
                <Text
                  // onPress={toggleExpand}
                  onTextLayout={onTextLayout}
                  style={newsCard.title}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {news?.title}
                </Text>
              )}
              {!expandNews && (
                <View style={{height: wp('14')}}>
                  <Text
                    // onPress={toggleExpand}
                    style={[
                      newsCard.detail,
                      {color: colors.gray, fontSize: wp('2.8')},
                    ]}
                    {...(Platform.OS == 'ios' && {numberOfLines: 2})}
                    // ellipsizeMode="tail"
                  >
                    {news?.summary
                      .replace(/[a-z]/gi, '')
                      .replace(/(<([^>]+)>)/gi, '')}
                    {/* {news?.summary} */}
                  </Text>
                </View>
              )}
            </View>
            {!expandNews && (
              <View style={[newsCard.bottomTab, {paddingHorizontal: wp('3')}]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChannelNews', {
                      channel: channels[news.source],
                    });
                  }}
                  disabled={
                    channels[news.source]?.visible == 'false' ? true : false
                  }
                  style={{
                    flexDirection: 'row',
                    height: '100%',
                    alignItems: 'center',
                    // paddingVertical: 10,
                  }}>
                  <Image
                    source={{
                      uri: channels[news.source]?.image,
                    }}
                    style={{
                      height: imageHeight / 2,
                      width: imageHeight / 2,
                      borderRadius: 2,
                    }}
                    // resizeMode="cover"
                  />

                  <Text
                    style={[
                      newsCard.time,
                      {fontSize: imageHeight / 7, paddingLeft: wp('3')},
                    ]}>
                    {moment(news.updatedAt).fromNow()}
                  </Text>

                  <Text
                    style={[
                      newsCard.channelName,
                      {fontSize: imageHeight / 5, paddingLeft: wp('3')},
                    ]}>
                    {channels[news.source]?.name}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '100%',
                    alignItems: 'center',
                    // paddingVertical: 10,
                  }}>
                  <TouchableOpacity
                    style={[
                      newsCard.iconStyle,
                      {
                        paddingLeft: 10,
                        paddingVertical: 5,
                      },
                    ]}
                    onPress={onShare}>
                    <AntDesign
                      name="sharealt"
                      size={hp('2')}
                      color={colors.gray}
                    />
                    {/* <Text style={newsCard.heading}> شیئر </Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      newsCard.iconStyle,
                      {
                        marginLeft: 20,

                        paddingLeft: 10,
                        paddingVertical: 5,
                      },
                    ]}
                    onPress={saveTheNews}>
                    <FontAwesome
                      name={isNewsSaved ? 'bookmark' : 'bookmark-o'}
                      size={hp('2')}
                      color={isNewsSaved ? colors.primary : colors.gray}
                    />
                    {/* <Text style={newsCard.heading}>محفوظ</Text> */}
                  </TouchableOpacity>
                  {props.admin && (
                    <TouchableOpacity
                      style={[
                        newsCard.iconStyle,
                        {
                          marginLeft: 20,

                          paddingLeft: 10,
                          paddingVertical: 5,
                        },
                      ]}
                      onPress={notificationSend}>
                      <FontAwesome
                        name="bell"
                        size={hp('2')}
                        color={colors.primary}
                      />
                      {/* <Text style={newsCard.heading}>محفوظ</Text> */}
                    </TouchableOpacity>
                  )}
                </View>
                {/* <TouchableOpacity
                onPress={() => {
                  channels[news.source]?.visible != 'false'
                    ? navigation.navigate('Detail', {
                        id: news?.link,
                      })
                    : toastRef.current.show('تفصیل دستیاب نہیں ہے', 1000);
                }}
                style={[newsCard.iconStyle, {paddingRight: 10}]}>
                <FontAwesome
                  name="newspaper-o"
                  size={hp('2')}
                  color={colors.gray}
                />
                <Text style={newsCard.heading}>تفصیل</Text>
              </TouchableOpacity> */}
              </View>
            )}
          </View>
        </View>

        {expandNews && (
          <View>
            {/* <Text style={newsCard.title} numberOfLines={2} ellipsizeMode="tail">
            {news?.title}
          </Text> */}
            <Text
              // onPress={toggleExpand}
              style={newsCard.detail}
              ellipsizeMode="tail">
              {news?.summary
                .replace(/[a-z]/gi, '')
                .replace(/(<([^>]+)>)/gi, '')}
            </Text>
            <TouchableOpacity
              style={newsCard.detailTextArea}
              onPress={() =>
                navigation.navigate('Detail', {
                  id: news?.link,
                })
              }>
              <Text style={newsCard.detailText}>
                {i18('NewsCard.detailText')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {expandNews && (
          <View style={[newsCard.bottomTab, {paddingHorizontal: wp('3')}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChannelNews', {
                  channel: channels[news.source],
                });
              }}
              disabled={
                channels[news.source]?.visible == 'false' ? true : false
              }
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                // paddingVertical: 10,
              }}>
              <Image
                source={{
                  uri: channels[news.source]?.image,
                }}
                style={{
                  height: imageHeight / 2,
                  width: imageHeight / 2,
                  borderRadius: 2,
                }}
                // resizeMode="cover"
              />

              <Text
                style={[
                  newsCard.time,
                  {fontSize: imageHeight / 7, paddingLeft: wp('3')},
                ]}>
                {moment(news.updatedAt).fromNow()}
              </Text>

              <Text
                style={[
                  newsCard.channelName,
                  {fontSize: imageHeight / 5, paddingLeft: wp('3')},
                ]}>
                {channels[news.source]?.name}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                // paddingVertical: 10,
              }}>
              <TouchableOpacity
                style={[
                  newsCard.iconStyle,
                  {
                    paddingLeft: 10,
                    paddingVertical: 5,
                  },
                ]}
                onPress={onShare}>
                <AntDesign name="sharealt" size={hp('2')} color={colors.gray} />
                {/* <Text style={newsCard.heading}> شیئر </Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  newsCard.iconStyle,
                  {
                    marginLeft: 20,

                    paddingLeft: 10,
                    paddingVertical: 5,
                  },
                ]}
                onPress={saveTheNews}>
                <FontAwesome
                  name={isNewsSaved ? 'bookmark' : 'bookmark-o'}
                  size={hp('2')}
                  color={isNewsSaved ? colors.primary : colors.gray}
                />
                {/* <Text style={newsCard.heading}>محفوظ</Text> */}
              </TouchableOpacity>
              {props.admin && (
                <TouchableOpacity
                  style={[
                    newsCard.iconStyle,
                    {
                      marginLeft: 20,

                      paddingLeft: 10,
                      paddingVertical: 5,
                    },
                  ]}
                  onPress={notificationSend}>
                  <FontAwesome
                    name="bell"
                    size={hp('2')}
                    color={colors.primary}
                  />
                  {/* <Text style={newsCard.heading}>محفوظ</Text> */}
                </TouchableOpacity>
              )}
            </View>
            {/* <TouchableOpacity
            onPress={() => {
              channels[news.source]?.visible != 'false'
                ? navigation.navigate('Detail', {
                    id: news?.link,
                  })
                : toastRef.current.show('تفصیل دستیاب نہیں ہے', 1000);
            }}
            style={[newsCard.iconStyle, {paddingRight: 10}]}>
            <FontAwesome
              name="newspaper-o"
              size={hp('2')}
              color={colors.gray}
            />
            <Text style={newsCard.heading}>تفصیل</Text>
          </TouchableOpacity> */}
          </View>
        )}
      </Pressable>
    </>
  );
};

export default NewsCard;
