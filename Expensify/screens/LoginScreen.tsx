import {Text, View} from 'react-native';
import React, {Component} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';

export class LoginScreen extends Component {
  render() {
    return (
      <ScreenWrapper className="flex-1">
        <View>
          <Text className={`${colors.heading}`}>LoginScreen</Text>
        </View>
      </ScreenWrapper>
    );
  }
}

export default LoginScreen;
