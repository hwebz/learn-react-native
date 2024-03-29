import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Touchable,
} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/login.png')}
            style={{width: 200, height: 200}}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="johndoe@gmail.com"
            placeholder="Enter email"
          />

          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value="123456"
            placeholder="Enter password"
            secureTextEntry
          />

          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-700">
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>

        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-4 bg-gray-100 rounded-2xl">
            <Image
              source={require('../assets/icons/google.png')}
              className="h-10 w-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 bg-gray-100 rounded-2xl">
            <Image
              source={require('../assets/icons/apple.png')}
              className="h-10 w-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 bg-gray-100 rounded-2xl">
            <Image
              source={require('../assets/icons/facebook.png')}
              className="h-10 w-10"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7 space-x-2">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp' as never)}>
            <Text className="font-semibold text-yellow-500">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
