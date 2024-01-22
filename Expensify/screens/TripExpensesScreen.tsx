import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../theme';
import {getImage} from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackButton from '../components/backButton';
import ExpenseCard from '../components/ExpenseCard';
import {getDocs, query, where} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';

// const expenses = [
//   {
//     id: 1,
//     title: 'ate sandwich',
//     amount: 4,
//     category: 'food',
//   },
//   {
//     id: 2,
//     title: 'bought a jacket',
//     amount: 50,
//     category: 'shopping',
//   },
//   {
//     id: 3,
//     title: 'watched a movie',
//     amount: 100,
//     category: 'entertainment',
//   },
// ];

const TripExpensesScreen = (props: any) => {
  const navigation = useNavigation();
  const {id, place, country} = props.route.params;

  const [expenses, setExpenses] = useState<any[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripId', '==', id));
    const querySnapshot = await getDocs(q);
    const data: any[] = [];
    querySnapshot.forEach(doc => {
      console.log('doc = ', doc.data());
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    setExpenses(data);
  };

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative mt-5">
          <View className="absolute top-0 left-0 z-[1]">
            <BackButton />
          </View>
          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {country}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center items-center rounded-xl mx-4 mx-4 mb-4">
          <Image source={getImage('7')} className="w-80 h-80" />
        </View>
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddExpense', {id, place, country})
              }
              className="p-2 px-3 bg-white border border-gray-200 rounded-full">
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 430,
            }}>
            <FlatList
              data={expenses}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyList message="You haven't recorded any expenses yet" />
              }
              className="mx-1"
              renderItem={({item}) => {
                return <ExpenseCard expense={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TripExpensesScreen;
