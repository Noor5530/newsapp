import {Dimensions, Platform, StatusBar} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../utils/GetResponsiveHeight';

const Width = Math.round(Dimensions.get('screen').width);
const Height =
  Platform.OS === 'android' && Platform.Version <= 28
    ? Dimensions.get('window').height - StatusBar.currentHeight
    : Dimensions.get('window').height;
const generic = '#000000';
const primary = '#228B22';
const gray = 'white';
const section = '#000000';
const errorColor = '#b71c1c';
const textColor = '#757575';
const fbColor = '#3B5999';
const gColor = '#DD4B39';
const profileTextColor = '#707070';
const primaryTextColor = '#FFFFFF';
const shimmerColor = '#272727';
const scrollBackGround = '#3A3B3C';
const updateModalBackground = '#707070';
const updateModalText = 'white';
const updateModalMainButton = 'green';

const family =
  Platform.OS == 'android' ? 'serif' : 'AmericanTypewriter-Condensed';
const urduFamily =
  Platform.OS == 'ios' ? 'Noto Nastaliq Urdu' : 'NotoNastaliqUrdu-Regular';
const theme = {
  fonts: {
    family,
  },
  colors: {
    generic,
    primary,
    section,
    gray,
    primaryTextColor,
    textColor,
    errorColor,
    fbColor,
    gColor,
    profileTextColor,
    shimmerColor,
    scrollBackGround,
  },

  screen: {
    width: Width,
    height: Height,
  },
  homeScreen: {
    emptyText: {
      color: primary,
      // backgroundColor: 'red',
      // height: wp('8'),
      margin: 20,
      fontSize: wp('3.5'),
      alignSelf: 'center',
      fontFamily: urduFamily,
    },
  },
  allNewsScreen: {
    emptyText: {
      color: primary,
      // backgroundColor: 'red',
      // height: wp('8'),
      margin: 20,
      fontSize: wp('3.5'),
      alignSelf: 'center',
      fontFamily: urduFamily,
    },
  },
  tabBar: {
    indicatorStyle: {
      borderBottomWidth: 3,
      borderRadius: 1,
      borderColor: 'blur',
      borderBottomColor: primary,
    },

    title: {
      fontSize: Platform.OS == 'ios' ? wp('3') : wp('4'),
      // fontFamily: 'notoserif',

      fontWeight: 'bold',
    },
    tabBarStyle: {
      width: '100%',
      height: hp('6%'),
      backgroundColor: generic,
    },
    tabStyle: {
      width: Platform.OS == 'ios' ? wp('25%') : wp('22%'),
      height: hp('6%'),
    },
  },
  rootContainer: {
    flex: 1,
    backgroundColor: generic,
  },
  categoryScreen: {
    flatList: {
      paddingVertical: 10,
    },
  },
  savedNewsScreen: {
    viewPager: {
      height: '95%',
    },
    emptyText: {
      alignSelf: 'center',
      paddingTop: 30,
      color: primary,
      fontFamily: urduFamily,
    },
  },
  shareNewsScreen: {},
  authScreen: {
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: section,
      width: '85%',
      height: 60,
      alignSelf: 'center',
      borderRadius: 30,
      alignItems: 'center',
      paddingLeft: 20,
      marginVertical: 5,
    },
    input: {
      width: '90%',
      paddingLeft: 15,
      color: primary,
      fontSize: 16,
      fontFamily: family,
    },
    error: {
      width: '85%',
      alignSelf: 'center',
      paddingLeft: 25,
    },
    button: {
      width: '85%',
      height: 60,
      borderRadius: 30,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '100%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  introScreen: {
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: generic,
      textAlign: 'center',
    },
    button: {
      width: '90%',
      height: 50,
      borderRadius: 30,
      shadowColor: primaryTextColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 2,
      alignSelf: 'center',
      justifyContent: 'center',

      alignItems: 'center',
      marginTop: 15,
    },
  },
  signInScreen: {
    scrollViewContainer: {
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: generic,
    },
    container: {
      // height: hp("85%"),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: wp(10),
    },

    logo: {
      width: wp('50'),
      height: hp('15'),
      marginVertical: hp('2.5'),
    },

    socialLoginIcons: {
      flexDirection: 'row',
      paddingVertical: hp('2'),
    },

    containerTextFeild: {
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
    },
    bottomViewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingTop: 20,
      justifyContent: 'center',
    },
    forgetPasswordText: {
      paddingVertical: hp('2'),
      fontSize: wp('3'),
      alignSelf: 'flex-end',
      color: primaryTextColor,
    },
    bottomIconBackground: {
      width: wp('100'),
      height: hp('18'),
    },
  },
  signUpScreen: {
    container: {
      // height: hp("85%"),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: wp(10),
    },

    logo: {
      width: wp('50'),
      height: hp('15'),
      marginVertical: hp('2.5'),
    },

    socialLoginIcons: {
      flexDirection: 'row',
      paddingVertical: hp('2'),
    },

    containerTextFeild: {
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
    },
    bottomViewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingTop: 20,
      justifyContent: 'center',
    },

    bottomIconBackground: {
      width: wp('100'),
      height: hp('18'),
    },
    forgetPasswordText: {
      paddingVertical: hp('2'),
      fontSize: wp('3'),
      alignSelf: 'flex-end',
      color: primaryTextColor,
    },
  },

  generalButton: {
    container: {
      flexDirection: 'row',
    },
    buttonText: {
      fontSize: hp('2.5'),
      color: generic,
      paddingRight: 5,
      fontWeight: 'bold',
    },
    buttonGreen: {
      backgroundColor: primary,
      height: hp('6'),
      width: wp('80'),
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: hp('2'),
    },
  },
  fbButton: {
    container: {
      backgroundColor: generic,
      width: hp('7'),
      height: hp('7'),
      borderRadius: hp('4'),

      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  googleButton: {
    container: {
      backgroundColor: generic,
      width: hp('7'),
      height: hp('7'),
      borderRadius: hp('4'),

      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp('2'),
    },
    image: {
      height: hp('4'),
      width: hp('4'),
    },
  },
  categoryCard: {
    container: {
      backgroundColor: '#F6F6F6',
      justifyContent: 'center',
      marginVertical: 2,
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: hp('8'),
      paddingHorizontal: 10,
    },
    text: {
      fontSize: wp('3.5'),
      lineHeight: hp('8'),
      paddingHorizontal: 20,
      fontFamily: urduFamily,
    },
  },
  categoryChannelCard: {
    container: {
      // paddingVertical: 10,
      // borderWidth: 10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: generic,
      paddingHorizontal: 15,
      paddingVertical: 7,
    },
    text: {
      fontSize: wp('4'),
      // height: 50,
      fontFamily:
        Platform.OS == 'ios'
          ? 'Noto Nastaliq Urdu'
          : 'NotoNastaliqUrdu-Regular',
    },
    pressArea: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  detailHeader: {
    container: {
      width: '100%',
      height: hp('6%'),
      flexDirection: 'row',
      paddingHorizontal: wp('3'),
      backgroundColor: generic,
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 5,
    },
    text: {
      color: primaryTextColor,
      fontSize: wp('4'),
      fontWeight: '700',
    },
    back: {
      // marginRight: 27,
    },
    topContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 3,
      height: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: hp('5'),
      height: hp('4'),
      borderRadius: hp('0.5'),
    },
    logoImage: {
      width: hp('12'),
      height: hp('4'),
      borderRadius: hp('0.5'),
    },
  },
  menuHeader: {
    container: {
      width: '100%',
      height: hp('7%'),
      flexDirection: 'row',
      paddingHorizontal: wp('3'),
      backgroundColor: generic,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    containerWithShadow: {
      width: '100%',
      height: hp('6%'),
      flexDirection: 'row',
      paddingHorizontal: wp('3'),
      backgroundColor: generic,
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 5,
    },
    text: {
      color: primaryTextColor,
      fontSize: wp('4'),
      fontWeight: '700',
    },
    back: {
      // marginRight: 27,
      paddingHorizontal: Platform.OS == 'ios' ? wp('3') : 0,
    },
    refresh: {
      alignItems: 'flex-end',
      backGroundColor: 'red',
    },
    topContainer: {
      flexDirection: 'row',
      // paddingHorizontal: 10,
      paddingVertical: 3,
      height: hp('5'),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: hp('12'),
      height: hp('4.2'),
      borderRadius: hp('0.5'),
    },
    imageContainer: {
      width: wp('24'),
      height: hp('4.85'),
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: 'red',
    },
  },
  newsCard: {
    container: {
      // padding: 10,
      // height: 100,
      // flex: 1,
      // height: hp('100%'),
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: generic,
      // flexGrow:1,

      // justifyContent: 'space-between',
      // width: '95%',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 2,
      borderTopColor: 'red',
      borderTopWidth: 0,
      borderRadius: 10,
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
    },

    message: {},

    heading: {
      fontSize: hp('1.3'),
      color: gray,
      paddingTop: 10,
      fontFamily: urduFamily,
      lineHeight: hp('2.5'),
    },
    iconStyle: {
      alignItems: 'center',
    },
    title: {
      textAlign: 'right',
      alignSelf: 'stretch',
      fontFamily:
        Platform.OS == 'ios'
          ? 'Noto Nastaliq Urdu'
          : 'NotoNastaliqUrdu-Regular',
      fontWeight: '600',
      fontSize: hp('2'),
      color: primaryTextColor,
      marginHorizontal: wp('2'),
      paddingTop: hp('1'),
      flexWrap: 'wrap',
    },
    detail: {
      textAlign: 'right',
      fontFamily:
        Platform.OS == 'ios'
          ? 'Noto Nastaliq Urdu'
          : 'NotoNastaliqUrdu-Regular',
      marginHorizontal: wp('2'),
      fontSize: hp('1.5'),
      // lineHeight: hp('4'),
      color: primaryTextColor,
    },
    detailText: {
      textAlign: 'right',
      fontFamily: urduFamily,
      marginHorizontal: hp('2'),
      fontSize: hp('1.5'),
      color: primary,
    },
    bottomTab: {
      // backgroundColor: '#F4F4F4',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('2'),
      justifyContent: 'space-between',
      // shadowColor: '#000',
      // shadowOffset: {width: 1, height: 1},
      // shadowOpacity: 0.4,
      // shadowRadius: 3,
      // elevation: 2,
      // borderTopColor: 'red',
      // borderTopWidth: 0,
    },
    bottomTabImage: {
      width: hp('4'),
      height: hp('4'),
      borderRadius: 50,
    },
    channelName: {
      color: primary,
      // backgroundColor: 'red',
      // height: wp('6'),
      fontSize: wp('2.8'),
      // alignSelf: 'flex-start',
      fontFamily: urduFamily,
    },
    time: {
      color: gray,
      fontSize: wp('2'),
      fontFamily: urduFamily,
    },
    timeDate: {
      color: gray,
      fontSize: wp('2'),
      fontFamily: urduFamily,
    },
    image: {width: '100%'},
    detailTextArea: {
      width: wp('24'),
      height: hp('4'),
      alignSelf: 'flex-end',
      marginHorizontal: wp('2'),
    },
  },
  newsDetailCard: {
    container: {
      marginVertical: 10,
      // height: 100,
      // height: '100%',
      // flex: 1,
      backgroundColor: generic,
      // justifyContent: 'space-between',
      width: '100%',
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
    },

    message: {},
    time: {
      alignSelf: 'flex-end',
      color: 'grey',
    },
    image: {width: '100%', height: hp('25%')},
    title: {
      textAlign: 'right',
      alignSelf: 'stretch',
      fontFamily: urduFamily,
      fontWeight: '600',
      fontSize: wp('4'),

      marginHorizontal: wp('2'),
    },
    detail: {
      textAlign: 'right',
      fontFamily: urduFamily,
      marginHorizontal: wp('2'),
      fontSize: wp('3.2'),
      lineHeight: hp('4'),
    },
    detailTextArea: {
      width: wp('20'),
      height: hp('8'),
      alignSelf: 'flex-end',
    },
    detailText: {
      textAlign: 'right',
      fontFamily: urduFamily,
      marginHorizontal: wp('2'),
      fontSize: wp('3.2'),
      color: primary,
    },
    bottomBar: {
      backgroundColor: generic,
      borderTopColor: 'gray',
      borderTopWidth: 1,
      height: hp('7'),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('2'),
      justifyContent: 'space-between',
    },
    bottomImage: {
      width: hp('5'),
      height: hp('5'),
      borderRadius: 50,
      // backgroundColor: 'red',
    },
    channelName: {
      color: primary,
      // backgroundColor: 'red',
      height: wp('8'),
      marginLeft: 20,
      fontSize: wp('3.5'),
      alignSelf: 'flex-start',
      fontFamily: urduFamily,
    },
    time: {
      color: gray,
      marginLeft: 20,
      fontSize: wp('2.2'),
      alignSelf: 'flex-start',
    },
  },
  newsList: {
    containerPopUp: {
      height: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 2,
      backgroundColor: generic,
      width: '100%',
    },
    textPopUp: {
      color: primary,
      fontSize: 14,
    },
    emptyText: {
      alignSelf: 'center',
      paddingTop: 30,
      fontFamily: urduFamily,
      color: primaryTextColor,
    },
  },
  drawerStack: {
    drawerContentOptions: {
      activeTintColor: primary,
      labelStyle: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
      },
      contentContainerStyle: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
      },
    },
    itemStyle: {
      paddingHorizontal: 5,
      marginHorizontal: 0,
    },
    drawerStyle: {
      backgroundColor: generic,
      width: wp('60'),
    },
    drawerLabel: {
      color: primaryTextColor,
      fontSize: wp('3.5'),
      lineHeight: wp('7'),
      fontFamily: urduFamily,
      alignSelf: 'flex-end',
    },
    userContainer: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: hp('3'),
    },
    userImage: {
      width: hp('12'),
      height: hp('12'),
      backgroundColor: generic,
    },
    userLabel: {
      color: primaryTextColor,
      fontSize: wp('3.5'),
      lineHeight: wp('7'),
      textAlign: 'right',
    },
    logoutLabel: {
      color: primaryTextColor,
      fontSize: wp('3.5'),
      lineHeight: wp('8.5'),
      fontFamily: urduFamily,
      alignSelf: 'flex-end',
    },

    groupButtons: {
      flexDirection: 'column',
      alignContent: 'space-between',
    },
    container: {
      backgroundColor: 'transparent',
      position: 'absolute',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
      zIndex: 3, // works on ios
      elevation: 3, // works on android
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    modal: {
      borderRadius: 10,
      width: 300,
      height: 315,
      backgroundColor: updateModalBackground,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    buttonStyle: {
      marginLeft: 10,
      marginTop: 20,
      borderRadius: 12,
      height: 30,
      width: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    updateButtonStyle: {
      width: 120,
      height: 48,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      borderWidth: 1,
      backgroundColor: updateModalMainButton,
      borderColor: updateModalText,
    },
    updateTextStyle: {
      fontSize: 20,
      color: updateModalText,
    },
    dismissTextStyle: {
      fontSize: 14,
      color: updateModalText,
    },
    modalText: {
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: updateModalText,
    },
    space: {
      height: 25,
    },
  },
  versionController: {
    groupButtons: {
      flexDirection: 'column',
      alignContent: 'space-between',
    },
    container: {
      backgroundColor: 'transparent',
      position: 'absolute',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
      zIndex: 3, // works on ios
      elevation: 3, // works on android
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    modal: {
      borderRadius: 10,
      width: 300,
      height: 315,
      backgroundColor: updateModalBackground,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    buttonStyle: {
      marginLeft: 10,
      marginTop: 20,
      borderRadius: 12,
      height: 30,
      width: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    updateButtonStyle: {
      width: 120,
      height: 48,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      borderWidth: 1,
      backgroundColor: updateModalMainButton,
      borderColor: updateModalText,
    },
    updateTextStyle: {
      fontSize: 20,
      color: updateModalText,
    },
    dismissTextStyle: {
      fontSize: 14,
      color: updateModalText,
    },
    modalText: {
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: updateModalText,
    },
    space: {
      height: 25,
    },
  },
};
export default theme;
