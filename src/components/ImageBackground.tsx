import React, {useState} from 'react';
import {memo} from 'react';
import {View, Pressable, ImageBackground} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import errorImage from '../../assets/images/no-image.png';

const BackgroundImage = (props: FastImageProps) => {
  const {style, onPress} = props;
  const [isLoading, setIsLoading] = useState(props.source.uri ? true : false);
  const [isError, setIsError] = useState(false);
  const {colors} = useTheme();
  return (
    <View
      style={[style, {backgroundColor: colors.shimmerColor, borderRadius: 10}]}>
      <ImageBackground
        imageStyle={{borderRadius: 10}}
        blurRadius={isLoading ? 10 : 0}
        {...props}
        source={isError ? errorImage : props.source}
        // source={props?.source}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          // setIsLoading(true);
          setIsError(true);
        }}
      />
    </View>
  );
};

export default memo(BackgroundImage);
