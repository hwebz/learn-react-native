import {View, StatusBar, Platform} from 'react-native';
import React from 'react';

const ScreenWrapper = ({children}: any) => {
  let statusBarHeight = StatusBar.currentHeight
    ? StatusBar.currentHeight
    : Platform.OS === 'ios'
    ? 45
    : 0;

  if (Platform.OS === 'ios') {
  }
  return (
    <View
      style={{
        paddingTop: statusBarHeight,
      }}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
