import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {getImage} from '../assets/images/randomImage';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image source={getImage('welcome')} className="h-96 w-96 shadow" />
        </View>
        <View className="mx-5 mb-20">
          <Text
            className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>
            Expensify
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn' as never)}
            className={`shadow p-3 rounded-full bg-[${colors.button}] mb-5`}>
            <Text className="text-center text-white font-bold text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp' as never)}
            className={`shadow p-3 rounded-full bg-[${colors.button}]`}>
            <Text className="text-center text-white font-bold text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
