import React, {memo} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: wp('1'),
  },
  h1: {
    color: 'red',
    fontSize: wp('4'),
  },
});
interface TextErrorT {
  title: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const TextError = memo<TextErrorT>(({title, onPress, textStyle}) => {
  const {container, h1} = styles;
  return (
    <View style={container}>
      <Text style={[h1, textStyle]} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
});

export default TextError;
