import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import BackButton from '../components/backButton';
import {getImage} from '../assets/images/randomImage';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {auth} from '../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/loading';
import { setUserLoading } from '../redux/slices/user';

const SignInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {userLoading} = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (email && password) {
      // navigation.goBack();
      // navigation.navigate('Home' as never);

      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        console.log('error', error);
        Snackbar.show({
          text: 'Please provide valid email/password!',
          backgroundColor: 'red',
        });
      } finally {
        dispatch(setUserLoading(false));
      }
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        backgroundColor: 'red',
      });
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
            autoCapitalize="none"
          />
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            Password
          </Text>
          <TextInput
            value={password}
            placeholder="Enter your password"
            onChangeText={value => setPassword(value)}
            className="p-4 bg-white rounded-full mb-3"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TouchableOpacity className="flex-row justify-end mt-2">
            <Text className="text-blue-500">Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSignIn}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm">
              <Text className="text-center text-white text-lg font-bold">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignInScreen;
