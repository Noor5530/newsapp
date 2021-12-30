import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

import MenuHeader from '../../components/header/MenuHeader';
import NewsList from '../../components/News/NewsList';
import NewsCardShimmer from '../../components/Shimmer/NewsCardShimmer';
import {reducerState} from '../../utils/types';

interface props {}
const Tab = createMaterialTopTabNavigator();

const ChannelNewsView: React.FC<props> = props => {
  const {colors, tabBar, rootContainer} = useTheme();
  const route = useRoute();
  const {channel} = route.params;
  const [exitApp, setExitApp] = useState(false);

  const {name, key} = channel;
  const [categories, setCategories] = useState(null);
  const loading = useSelector(
    (state: reducerState) => state.loading.isLoadingVisible,
  );
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    setCategories(null);
    setTimeout(() => {
      setCategories(channel.categories);
    }, 2000);

    return () => {
      setCategories(null);
      route.params.categories = null;
    };
  }, [name, navigation, route.params.categories?.toString()]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const backAction = () => {
  //       if (!exitApp) {
  //         setExitApp(true);
  //       } else if (exitApp == true) {
  //         BackHandler.exitApp();
  //       }

  //       setTimeout(() => {
  //         setExitApp(false);
  //       }, 1700);
  //       return true;
  //     };
  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );
  //     return () => backHandler.remove();
  //   }, [exitApp]),
  // );

  return (
    <View key="ChannelNewsView" style={rootContainer}>
      <MenuHeader title={name} refresh={true} />
      {!categories || categories?.length == 0 || !isFocused ? (
        <View style={{flex: 1}}>
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 20,
              zIndex: 5,
              alignSelf: 'center',
            }}
            size="small"
            color={colors.primaryTextColor}
          />
          <NewsCardShimmer />
        </View>
      ) : (
        <Tab.Navigator
          // removeClippedSubviews
          lazy={true}
          lazyPreloadDistance={0}
          lazyPlaceholder={() => <NewsCardShimmer />}
          initialLayout={{width: Dimensions.get('window').width}}
          tabBarOptions={{
            labelStyle: [tabBar.title, {color: colors.primary}],
            tabStyle: tabBar.tabStyle,
            scrollEnabled: true,
            style: tabBar.tabBarStyle,
          }}
          screenOptions={({route}) => ({
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={[
                    tabBar.title,
                    {color: focused ? colors.primary : colors.gray},
                  ]}>
                  {route.params.title}
                </Text>
              );
            },
          })}>
          {categories?.map(route => {
            return (
              <Tab.Screen
                key={route.index + channel}
                name={route.index}
                component={NewsList}
                initialParams={{
                  categories: route.categories,
                  index: route.index,
                  title: route.title,
                  key: route.key,
                  channel: key,
                }}
              />
            );
          })}
        </Tab.Navigator>
      )}
    </View>
  );
};

export default ChannelNewsView;
