import React, {useEffect, useState} from 'react';
import {Linking, Platform, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';

const IOS_LINK_URL = 'https://apps.apple.com/pk/app/urdu-shorts/id1565184003';
const ANDROID_LINK_URL = 'market://details?id=com.gsoft.newsapp';

const VersionCheckController: React.FC = () => {
  const [shouldShowModalUpdate, setShouldModalUpdate] = useState<boolean>();
  const {versionController} = useTheme();
  const checkVersion = async () => {
    const latestVersion = await VersionCheck.getLatestVersion({
      provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
    });
    const currentVersion = await VersionCheck.getCurrentVersion();

    if (currentVersion < latestVersion) {
      setShouldModalUpdate(true);
    }
  };

  useEffect(() => {
    checkVersion();
  }, []);

  const onUpdateNewVersionInStore = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(ANDROID_LINK_URL);
    } else {
      Linking.openURL(IOS_LINK_URL);
    }
  };

  const onSkipUpgradeVersionApp = () => {
    setShouldModalUpdate(false);
  };
  if (!shouldShowModalUpdate) {
    return null;
  } else {
    return (
      <View
        testID={'ModalRequireVersionUpdate'}
        style={versionController.container}>
        <View style={versionController.modal}>
          <Text style={versionController.modalText}>
            We have made some {'\n'}
            improvements to the app. {'\n'}
            Please hit update to {'\n'}
            access the latest version!
          </Text>

          <View style={versionController.groupButtons}>
            <View style={versionController.space} />
            <TouchableOpacity
              testID={'UpgradeAppVersion'}
              style={versionController.updateButtonStyle}
              onPress={onUpdateNewVersionInStore}>
              <Text style={versionController.updateTextStyle}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={'SkipUpgradeVersionApp'}
              style={versionController.buttonStyle}
              onPress={onSkipUpgradeVersionApp}>
              <Text style={versionController.dismissTextStyle}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};
export default VersionCheckController;
