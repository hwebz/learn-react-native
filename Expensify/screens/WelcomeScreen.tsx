import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {getImage} from '../assets/images/randomImage';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../config/firebase';

GoogleSignin.configure({
  webClientId:
    '451571285915-jpb07dabhv6e1vpbthns57onm2o3hgep.apps.googleusercontent.com',
});

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
    } catch (error: any) {
      console.log('error = ', error);
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.IN_PROGRESS:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          break;
        default:
      }
    }
  };

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
            onPress={() => navigation.navigate('SignUp' as never)}
            style={{backgroundColor: colors.button}}
            className="shadow p-3 rounded-full mb-5">
            <Text className="text-center text-white font-bold text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn' as never)}
            style={{backgroundColor: colors.button}}
            className="shadow p-3 rounded-full mb-5">
            <Text className="text-center text-white font-bold text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signIn}
            className="shadow p-3 rounded-full bg-white">
            <View className="flex-row justify-center itemes-center space-x-3">
              <Image source={getImage('googleIcon')} className="w-8 h-8" />
              <Text className="text-center font-bold text-lg font-bold">
                Sign In With Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
