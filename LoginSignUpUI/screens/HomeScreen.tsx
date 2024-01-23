import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';

const HomeScreen = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="flex-row items-center space-x-2">
        <Text>Dashboard</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className="p-3 rounded-xl bg-red-200">
          <Text className="text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
