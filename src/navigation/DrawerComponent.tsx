import messaging from '@react-native-firebase/messaging';
import {DrawerItem} from '@react-navigation/drawer';
import {useLinkTo, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState, useRef} from 'react';
import Toast, {DURATION} from 'react-native-easy-toast';

import {
  LayoutAnimation,
  Linking,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  UIManager,
  useColorScheme,
  View,
  Share,
  Modal,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Config from 'react-native-config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../src/utils/GetResponsiveHeight';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import NewsLogo from '../assets/images/PakistanUrduNewsLogoRound.png';
import {
  disableNightMode,
  enableNightMode,
  offNotification,
  onNotification,
  setAdminCredentials,
} from '../actions/userAction';
import loginAdmin from './../api/methods/loginAdmin';
import Image from '../components/Image';
import {reducerState} from '../utils/types';

const DrawerComponent = props => {
  const navigation = useNavigation();
  const {drawerStack, colors} = useTheme();
  const isNotification = useSelector(
    (state: reducerState) => state.user.isNotification,
  );
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const channels = useSelector((state: reducerState) => state.app?.channels);
  const nightMode = useSelector((state: reducerState) => state.user.nightMode);
  const adminCredentials = useSelector(
    (state: reducerState) => state.user.adminCredentials,
  );
  const linkTo = useLinkTo();
  const toastRef = useRef();
  const [adminModal, setAdminModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    setAdminError(false);
    setAdminModal(false);
    setPassword('');
    setUserName('');
  }, []);

  useEffect(() => {
    setAdminError(false);
    setPassword('');
    setUserName('');
  }, [adminModal]);
  const openStore = useCallback(() => {
    if (Platform.OS != 'ios') {
      Linking.openURL(`market://details?id=${Config.PACKAGE_NAME}`).catch(err =>
        alert('Please check for Google Play Store'),
      );
    } else {
      Linking.openURL(
        `https://apps.apple.com/pk/app/urdu-shorts/id1565184003`,
      ).catch(err => alert('Please check for the App Store'));
    }
  }, [Platform.OS]);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpand(!expand);
  }, [setExpand, expand]);

  const toggleNightMode = useCallback(() => {
    if (nightMode) {
      dispatch(disableNightMode());
      toastRef.current.show('نائٹ موڈ آف', 1000);
    } else {
      dispatch(enableNightMode());
      toastRef.current.show('نائٹ موڈ ان', 1000);
    }
  }, [nightMode, dispatch]);
  const toggleNotification = useCallback(() => {
    if (isNotification) {
      dispatch(offNotification());
      messaging()
        .unsubscribeFromTopic(Config.NotificationTopic)
        .then(() => {
          toastRef.current.show('نوٹیفکیشن اف', 1000);
        });
    } else {
      dispatch(onNotification());
      messaging()
        .subscribeToTopic(Config.NotificationTopic)
        .then(() => {
          toastRef.current.show('نوٹیفیکیشن آن', 1000);
        });
    }
  }, [isNotification, dispatch]);

  const openMailBox = useCallback(() => {
    Linking.openURL('mailto:newsapp.gsoft@gmail.com');
  }, []);
  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message:
          Platform.OS == 'ios'
            ? 'https://apps.apple.com/pk/app/urdu-shorts/id1565184003'
            : 'https://play.google.com/store/apps/details?id=com.gsoft.newsapp',
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
  }, []);

  const handleAdminLogin = () => {
    loginAdmin({userName, password}).then(response => {
      console.log('resp>>', response.status);

      if (response.status == 200) {
        toastRef.current.show('Admin Mode On', 1000);

        dispatch(setAdminCredentials({userName, password}));
        setAdminModal(false);
      } else {
        console.log('error');
        setAdminError(true);
      }
    });
    // dispatch(appAction.logInAdminRequest({userName, password}))
    // if (use == 'g@123') {
    //   setAdminModal(false);
    // } else {
    //   setAdminError(true);
    // }
  };
  const navigateToPrivacyPolicy = useCallback(() => {
    navigation.navigate('PrivacyPolicy');
  }, [navigation]);

  const handleAdmin = async () => {
    if (adminCredentials?.userName?.length > 0) {
      toastRef.current.show('Admin Mode Off', 1000);

      dispatch(setAdminCredentials({}));
    } else {
      setAdminModal(true);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      contentContainerStyle={{paddingTop: 20, paddingBottom: hp('10')}}
      {...props}>
      <TouchableOpacity
        onLongPress={handleAdmin}
        style={drawerStack.userContainer}>
        <Image source={NewsLogo} style={drawerStack.userImage} resizeMode="cover" />
      </TouchableOpacity>

      <DrawerItem
        style={drawerStack.itemStyle}
        onPress={() => {
          navigation.navigate('Home');
        }}
        label={() => <Text style={drawerStack.drawerLabel}>صفحۂ اول</Text>}
        icon={() => (
          <MaterialCommunityIcons
            name="home"
            size={wp('6')}
            color={colors.gray}
          />
        )}
      />
      <DrawerItem
        style={drawerStack.itemStyle}
        onPress={() => {
          navigation.navigate('SavedNews');
        }}
        label={() => <Text style={drawerStack.drawerLabel}>محفوظ خبریں</Text>}
        icon={() => (
          <MaterialIcons name="save" size={wp('6')} color={colors.gray} />
        )}
      />
      <DrawerItem
        style={{
          paddingHorizontal: 0,
          marginHorizontal: 0,
          marginVertical: 2,
        }}
        onPress={toggleNotification}
        label={() => <Text style={drawerStack.logoutLabel}>نوٹیفکیشن</Text>}
        icon={() => (
          <Switch
            trackColor={{false: '#767577', true: 'lightgray'}}
            thumbColor={isNotification ? colors.primary : colors.gray}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotification}
            value={isNotification}
          />
        )}
      />
      <DrawerItem
        style={{paddingHorizontal: 0, marginHorizontal: 0}}
        onPress={toggleNightMode}
        label={() => <Text style={drawerStack.logoutLabel}> نائٹ موڈ</Text>}
        icon={() => (
          <Switch
            trackColor={{false: '#767577', true: 'lightgray'}}
            thumbColor={nightMode ? colors.primary : colors.gray}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNightMode}
            value={nightMode}
          />
        )}
      />
      <DrawerItem
        style={drawerStack.itemStyle}
        onPress={toggleExpand}
        label={() => <Text style={drawerStack.logoutLabel}>چینلز</Text>}
        icon={() => (
          <MaterialIcons
            name={expand ? 'expand-less' : 'expand-more'}
            size={wp('6')}
            color={colors.gray}
          />
        )}
      />

      {expand &&
        channels &&
        Object.values(channels).map((item, index) => {
          if (item?.visible != 'false') {
            return (
              <DrawerItem
                key={index.toString()}
                style={drawerStack.itemStyle}
                onPress={() => {
                  navigation.navigate('ChannelNews', {
                    channel: item,
                  });
                }}
                label={() => (
                  <Text style={drawerStack.logoutLabel}>{item?.name}</Text>
                )}
                icon={() => (
                  <Image
                    source={{uri: item?.image}}
                    resizeMode={'stretch'}
                    style={{
                      width: 34,
                      height: 35,
                      borderRadius: 5,
                    }}
                    color={colors.gray}
                  />
                )}
              />
            );
          }
        })}
      <DrawerItem
        style={drawerStack.itemStyle}
        label={() => <Text style={drawerStack.logoutLabel}>ایپ شیئر کریں</Text>}
        onPress={onShare}
        icon={() => (
          <MaterialIcons name="share" size={wp('6')} color={colors.gray} />
        )}
      />
      <DrawerItem
        style={drawerStack.itemStyle}
        label={() => (
          <Text style={drawerStack.logoutLabel}>{' ہم سے رابطہ کریں'}</Text>
        )}
        onPress={openMailBox}
        icon={() => (
          <MaterialIcons name="email" size={wp('6')} color={colors.gray} />
        )}
      />

      <View
        style={{
          borderTopColor: colors.gray,
          borderTopWidth: 1,
          paddingTop: 20,
        }}>
        <Text
          style={[
            drawerStack.logoutLabel,

            {
              paddingHorizontal: 15,
              color: colors.gray,
              alignSelf: 'flex-start',
            },
          ]}>
          More:
        </Text>
        <TouchableOpacity onPress={openStore} style={{paddingHorizontal: 15}}>
          <Text style={[drawerStack.logoutLabel, {alignSelf: 'flex-start'}]}>
            Rate This App
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MaterialIcons name="star-rate" size={wp('6')} color={'#F5D133'} />
            <MaterialIcons name="star-rate" size={wp('6')} color={'#F5D133'} />
            <MaterialIcons name="star-rate" size={wp('6')} color={'#F5D133'} />
            <MaterialIcons name="star-rate" size={wp('6')} color={'#F5D133'} />

            <MaterialIcons name="star-rate" size={wp('6')} color={'#F5D133'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToPrivacyPolicy}
          style={{paddingHorizontal: 15, paddingBottom: 10}}>
          <Text style={[drawerStack.logoutLabel, {alignSelf: 'flex-start'}]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
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
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={adminModal}
        onRequestClose={() => {}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View
            style={{
              width: 300,
              // height: hp('35'),
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'gray',
                paddingHorizontal: 10,
              }}
              onChangeText={value => {
                setUserName(value);
              }}
              onFocus={() => setAdminError(false)}
              value={userName}
              placeholder="username"
            />
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'gray',
                paddingHorizontal: 10,
              }}
              onChangeText={value => {
                setPassword(value);
              }}
              onFocus={() => setAdminError(false)}
              value={password}
              placeholder="password"
            />
            {adminError && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'center',
                }}>
                Invalid Username or Password
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp('10'),
                paddingVertical: hp('2'),
              }}>
              <TouchableOpacity
                onPress={handleAdminLogin}
                style={{padding: 10, backgroundColor: 'red', borderRadius: 10}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'black',
                  borderRadius: 10,
                }}
                onPress={() => setAdminModal(false)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default memo(DrawerComponent);
