import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// import Image from 'react-native-fast-image';
export type NewsCardShimmerProps = {
  loading?: boolean;
};

const NewsCardShimmer = (props: NewsCardShimmerProps) => {
  const {loading} = props;
  const {colors} = useTheme();

  return (
    <ScrollView style={{flex: 1, marginTop: hp('1')}}>
      <View
        style={{
          backgroundColor: colors.generic,
          flex: 1,
        }}>
        {/* First Card */}
        {/* Image */}
        <View
          style={{
            width: '100%',
            height: hp('25'),
            backgroundColor: colors.shimmerColor,
            marginBottom: hp('3%'),
          }}></View>

        {/* Title */}
        <View
          style={{
            width: '85%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('3%'),
            marginRight: wp('5%'),
          }}></View>

        {/* Summary */}
        <View
          style={{
            width: '50%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('1%'),
            marginRight: wp('5%'),
          }}></View>

        <View
          style={{
            width: '50%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('4%'),
            marginRight: wp('5%'),
          }}></View>

        {/* Second card */}

        {/* Image */}
        <View
          style={{
            width: '100%',
            height: hp('25'),
            backgroundColor: colors.shimmerColor,
            marginBottom: hp('3%'),
          }}></View>

        {/* Title */}
        <View
          style={{
            width: '85%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('3%'),
            marginRight: wp('5%'),
          }}></View>

        {/* Summary */}
        <View
          style={{
            width: '50%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('1%'),
            marginRight: wp('5%'),
          }}></View>

        <View
          style={{
            width: '50%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('4%'),
            marginRight: wp('5%'),
          }}></View>

        {/* Third card */}

        {/* Image */}
        <View
          style={{
            width: '100%',
            height: hp('25'),
            backgroundColor: colors.shimmerColor,
            marginBottom: hp('3%'),
          }}></View>

        {/* Title */}
        <View
          style={{
            width: '85%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('3%'),
            marginRight: wp('5%'),
          }}></View>

        {/* Summary */}
        <View
          style={{
            width: '50%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('1%'),
            marginRight: wp('5%'),
          }}></View>

        <View
          style={{
            width: '50%',
            height: hp('3'),
            backgroundColor: colors.shimmerColor,
            alignSelf: 'flex-end',
            marginBottom: hp('4%'),
            marginRight: wp('5%'),
          }}></View>
      </View>
    </ScrollView>
  );
};

export default NewsCardShimmer;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // height: 100,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
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
});
