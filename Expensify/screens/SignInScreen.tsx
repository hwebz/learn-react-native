import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import BackButton from '../components/backButton';
import {getImage} from '../assets/images/randomImage';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    if (email && password) {
      navigation.goBack();
      navigation.navigate('Home' as never);
    } else {
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View className="relative mt-[-20]">
          <View className="absolute top-0 left-0 z-[1]">
            <BackButton />
          </View>
          <Text className={`${colors.heading} text-xl font-bold text-center`}>
            Sign In
          </Text>
        </View>

        <View className="flex-row justify-center my-3 mt-5">
          <Image className="h-72 w-72" source={getImage('login')} />
        </View>
        <View className="grow">
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            Email
          </Text>
          <TextInput
            value={email}
            placeholder="Enter your email"
            onChangeText={value => setEmail(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            Password
          </Text>
          <TextInput
            value={password}
            placeholder="Enter your password"
            onChangeText={value => setPassword(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <TouchableOpacity className="flex-row justify-end mt-2">
            <Text className="text-blue-500">Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleSignIn}
            className={`bg-[${colors.button}] my-6 rounded-full p-3 shadow-sm`}>
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignInScreen;
