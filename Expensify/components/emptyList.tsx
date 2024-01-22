import {Image, Text, View} from 'react-native';
import React from 'react';
import {getImage} from '../assets/images/randomImage';

const EmptyList = ({message = ''}: any) => {
  return (
    <View className="flex justify-center items-center my-5">
      <Image className="w-36 h-36 shadow" source={getImage('empty')} />
      <Text className="font-bold text-gray-400 mt-3">
        {message || 'Data not found'}
      </Text>
    </View>
  );
};

export default EmptyList;
