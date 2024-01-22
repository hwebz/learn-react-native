import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import banner from '../assets/images/banner.png';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';

// const trips = [
//   {
//     id: 1,
//     place: 'Gujrat',
//     country: 'Pakistan',
//   },
//   {
//     id: 2,
//     place: 'London Eye',
//     country: 'England',
//   },
//   {
//     id: 3,
//     place: 'Washington dc',
//     country: 'America',
//   },
//   {
//     id: 4,
//     place: 'New york',
//     country: 'America',
//   },
//   {
//     id: 5,
//     place: 'Gujrat',
//     country: 'Pakistan',
//   },
//   {
//     id: 6,
//     place: 'London Eye',
//     country: 'England',
//   },
//   {
//     id: 7,
//     place: 'Washington dc',
//     country: 'America',
//   },
//   {
//     id: 8,
//     place: 'New york',
//     country: 'America',
//   },
// ];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [trips, setTrips] = useState<any[]>([]);
  const {user} = useSelector((state: any) => state.user);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const data: any[] = [];
    querySnapshot.forEach(doc => {
      console.log('doc = ', doc.data());
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    setTrips(data);
  };

  const handleLogOut = async () => {
    // navigation.navigate('Welcome' as never);
    await signOut(auth);
  };

  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-3">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Expensify
        </Text>
        <TouchableOpacity
          onPress={handleLogOut}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image source={banner} className="w-60 h-60" />
      </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip' as never)}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={trips}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            ListEmptyComponent={
              <EmptyList message="You haven't recorded any trips yet" />
            }
            className="mx-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpenses', {...item})}
                  className="mb-[3%] w-[48.5%]">
                  <View className="bg-white p-3 rounded-2xl shadow-sm w-full">
                    <Image
                      source={randomImage()}
                      className="w-full h-40 mb-2"
                    />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} text-xs`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
