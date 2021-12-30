import 'react-native-paper';

import {TextProps, ViewProps} from 'react-native';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      generic: string;
      string: string;
      section: string;
      white: string;
      black: string;
      textColor: string;
      errorColor: string;
      fbColor: string;
      gColor: string;
      profileTextColor: string;
      primaryTextColor: string;
      gray: string;
      shimmerColor: string;
    }

    interface Theme extends TextProps, ViewProps {
      myOwnProperty: boolean;
      Theme?: 'dark' | 'light';
      roundness: number;
      screen: {
        width: number;
        height: number;
      };
      homeScreen: {
        emptyText: ViewProps;
      };
      allNewsScreen: {
        emptyText: ViewProps;
      };
      tabBar: {
        indicatorStyle: ViewProps;
        title: Text;
        tabStyle: ViewProps;
      };
      rootContainer: {
        flex: number;
      };
      categoryScreen: {
        flatList: ViewProps;
      };
      savedNewsScreen: {
        viewPager: ViewProps;
        emptyText: ViewProps;
      };
      shareNewsScreen: ViewProps;
      authScreen: {
        inputContainer: ViewProps;
        input: ViewProps;
        error: ViewProps;
        button: ViewProps;
        logo: ViewProps;
      };
      introScreen: {
        buttonText: ViewProps;
        button: ViewProps;
      };
      signInScreen: {
        scrollViewContainer: ViewProps;
        container: ViewProps;

        logo: ViewProps;

        socialLoginIcons: ViewProps;

        containerTextFeild: ViewProps;
        bottomViewButton: ViewProps;
        forgetPasswordText: ViewProps;
        bottomIconBackground: ViewProps;
      };
      signUpScreen: {
        container: ViewProps;

        logo: ViewProps;

        socialLoginIcons: ViewProps;

        containerTextFeild: ViewProps;
        bottomViewButton: ViewProps;
        bottomIconBackground: ViewProps;
        forgetPasswordText: ViewProps;
      };
      generalButton: {
        container: ViewProps;
        buttonText: ViewProps;
        numbernGreen: ViewProps;
      };
      fbButton: {
        container: ViewProps;
      };
      googleButton: {
        container: ViewProps;
        image: ViewProps;
      };
      categoryCard: {
        container: ViewProps;
        innerContainer: ViewProps;
        text: Text;
      };
      categoryChannelCard: {
        container: ViewProps;
        text: Text;
        pressArea: ViewProps;
      };
      detailHeader: {
        container: ViewProps;
        text: Text;
        back: ViewProps;
        topContainer: ViewProps;
        image: ViewProps;
        logoImage: ViewProps;
      };
      menuHeader: {
        container: ViewProps;
        containerWithShadow: ViewProps;
        text: {
          color: string;
          fontSize: string | number;
          fontWeight: string | number;
        };
        back: {
          // marginRight: 27,
        };
        topContainer: ViewProps;
        image: ViewProps;
        imageContainer: ViewProps;
        newsCard: {
          container: ViewProps;
          messageBox: ViewProps;

          title: Text;
          detail: ViewProps;
          detailText: Text;
          bottomTab: ViewProps;
          bottomTabImage: ViewProps;
          channelName: Text;
          time: Text;
          image: ViewProps;
        };
        newsDetailCard: {
          container: ViewProps;
          messageBox: ViewProps;

          message: ViewProps;
          image: ViewProps;
          title: Text;
          detail: Text;
          detailText: Text;
          bottomBar: ViewProps;
          bottomImage: ViewProps;
          channelName: Text;
          time: Text;
        };
        newsList: {
          containerPopUp: ViewProps;
          textPopUp: ViewProps;
          emptyText: Text;
        };
        drawerStack: {
          drawerContentOptions: ViewProps;
          drawerStyle: ViewProps;
          drawerLabel: Text;
          userContainer: ViewProps;
          userImage: ViewProps;
          userLabel: Text;
          logoutLabel: TextProps;
        };
        versionController: {
          groupButtons: ViewProps;
          container: ViewProps;
          modal: ViewProps;
          buttonStyle: ViewProps;
          buttonText: TextProps;
          updateButtonStyle: ViewProps;
          updateTextStyle: TextProps;
          dismissTextStyle: TextProps;
          modalText: TextProps;
          space: ViewProps;
        };
      };
    }
  }
}
