import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useMemo, useState} from 'react';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const buttonDisabled = useMemo(() => {
    return !email || !password || !fullName;
  }, [email, password, fullName]);

  const handleSubmit = async () => {
    try {
      if (email && password && fullName) {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            source={require('../assets/images/signup.png')}
            style={{width: 165, height: 110}}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter full name"
            value={fullName}
            onChangeText={(value: any) => setFullName(value)}
          />

          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter email"
            value={email}
            onChangeText={(value: any) => setEmail(value)}
            autoCapitalize="none"
          />

          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={(value: any) => setPassword(value)}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={buttonDisabled}
            className={`py-3 ${
              buttonDisabled ? 'bg-gray-200 opacity-40' : 'bg-yellow-400'
            } rounded-xl`}>
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
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
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}>
            <Text className="font-semibold text-yellow-500">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
