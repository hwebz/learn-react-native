import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import BackButton from '../components/backButton';
import {getImage} from '../assets/images/randomImage';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import Snackbar from 'react-native-snackbar';
import { setUserLoading } from '../redux/slices/user';
import { useDispatch } from 'react-redux';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (email && password && password === confirmPassword && fullName) {
      // navigation.goBack();
      // navigation.navigate('Home' as never);
      try {
        try {
          dispatch(setUserLoading(true));
          await await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
          console.log('error', error);
          Snackbar.show({
            text: 'Please provide valid email/password!',
            backgroundColor: 'red',
          });
        } finally {
          dispatch(setUserLoading(false));
        }
      } catch (error: any) {
        console.log('error', error);
        Snackbar.show({
          text: "Can't sign up with provided email/password!",
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please provide all required information!',
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
            Sign Up
          </Text>
        </View>
        <ScrollView>
          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-72 w-72" source={getImage('signup')} />
          </View>
          <View className="grow">
            <Text className={`${colors.heading} text-lg font-bold mb-2`}>
              Full Name
            </Text>
            <TextInput
              value={fullName}
              placeholder="Enter your name"
              onChangeText={value => setFullName(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
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
            <Text className={`${colors.heading} text-lg font-bold mb-2`}>
              Confirm Your Password
            </Text>
            <TextInput
              value={confirmPassword}
              placeholder="Confirm your password"
              onChangeText={value => setConfirmPassword(value)}
              className="p-4 bg-white rounded-full mb-3"
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>
        </ScrollView>

        <View>
          <TouchableOpacity
            onPress={handleSignIn}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 shadow-sm">
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
