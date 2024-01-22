import {
  View,
  Text,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import BackButton from '../components/backButton';
import {getImage} from '../assets/images/randomImage';
import {useNavigation} from '@react-navigation/native';

const AddTripScreen = () => {
  const navigation = useNavigation();

  const [place, setPlace] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const handleAddTrip = () => {
    if (place && country) {
      navigation.navigate('Home' as never);
    } else {
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View className="relative mt-5">
          <View className="absolute top-0 left-0 z-[1]">
            <BackButton />
          </View>
          <Text className={`${colors.heading} text-xl font-bold text-center`}>
            Add Trips
          </Text>
        </View>

        <View className="flex-row justify-center my-3 mt-5">
          <Image className="h-72 w-72" source={getImage('4')} />
        </View>
        <View className="grow">
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            Where on Earth?
          </Text>
          <TextInput
            value={place}
            onChangeText={value => setPlace(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            Which Country?
          </Text>
          <TextInput
            value={country}
            onChangeText={value => setCountry(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleAddTrip}
            className={`bg-[${colors.button}] my-6 rounded-full p-3 shadow-sm`}>
            <Text className="text-center text-white text-lg font-bold">
              Add Trip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddTripScreen;
