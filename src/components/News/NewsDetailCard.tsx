import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Share, Text, TouchableOpacity, View} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';

import Config from 'react-native-config';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/GetResponsiveHeight';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';

import {saveNewsResponse} from '../../actions/userAction';
import Image from '../../components/Image';
import {reducerState} from '../../utils/types';

export type NewsDetailCardProps = {
  news?: object;
  user?: object;
};

const NewsDetailCard = (props: NewsDetailCardProps) => {
  const {news, user} = props;
  const toastRef = useRef();

  const {colors, newsDetailCard, newsCard} = useTheme();
  const dispatch = useDispatch();
  const channels = useSelector((state: reducerState) => state.app?.channels);
  const saveNews = useSelector((state: reducerState) => state.user?.saveNews);

  const [isNewsSaved, setIsNewsSaved] = useState(false);
  const [lessLine, setLessLine] = useState(false);
  const [imageHeight, setImageHeight] = useState(60);

  const [t] = useTranslation();
  const i18 = (key: string) => {
    return t(key);
  };
  const navigation = useNavigation();
  useEffect(() => {
    checkNewsSaved(); // checkNewsFollow();
  }, [isNewsSaved]);

  const checkNewsSaved = async () => {
    if (saveNews[news._id]) {
      setIsNewsSaved(true);
    } else {
      setIsNewsSaved(false);
    }
  };
  const saveTheNews = () => {
    let tempNewsSave = saveNews;
    if (isNewsSaved) {
      delete tempNewsSave[news._id];
      setIsNewsSaved(false);
      toastRef.current.show('خبر غیر محفوظ ہو گئی', 1000);

      dispatch(saveNewsResponse({news: tempNewsSave}));
    } else {
      tempNewsSave[news._id] = news;
      setIsNewsSaved(true);
      toastRef.current.show('خبر محفوظ ہو گئی', 1000);

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
  const onTextLayout = useCallback(e => {
    setLessLine(e.nativeEvent.lines.length > 1);
    // setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);
  return (
    <View style={newsDetailCard.container}>
      <ScrollView style={{height: hp('80')}}>
        <View>
          <Image
            source={{
              uri: news?.image,
            }}
            style={newsDetailCard.image}
          />

          <Text
            style={newsCard.title}
            onTextLayout={onTextLayout}
            numberOfLines={2}
            ellipsizeMode="tail">
            {news?.title}
          </Text>
          <Text style={newsCard.detail} ellipsizeMode="tail">
            {news?.summary}
            {news?.summary}
          </Text>
          {channels[news.source]?.visible != 'false' && (
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
          )}
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
              <TouchableOpacity style={newsCard.iconStyle} onPress={onShare}>
                <AntDesign name="sharealt" size={hp('2')} color={colors.gray} />
                {/* <Text style={newsCard.heading}> شیئر </Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={[newsCard.iconStyle, {marginLeft: 30}]}
                onPress={saveTheNews}>
                <FontAwesome
                  name={isNewsSaved ? 'bookmark' : 'bookmark-o'}
                  size={hp('2')}
                  color={isNewsSaved ? colors.primary : colors.gray}
                />
                {/* <Text style={newsCard.heading}>محفوظ</Text> */}
              </TouchableOpacity>
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
        </View>
      </ScrollView>
      <Toast
        ref={toastRef}
        position="center"
        style={{
          backgroundColor: colors.generic == '#FFFFFF' ? 'black' : 'white',
          borderRadius: 20,
          marginTop: hp('10'),
        }}
        textStyle={{color: colors.generic}}
      />
    </View>
  );
};

export default NewsDetailCard;
