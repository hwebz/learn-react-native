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
import {Category, categories} from '../constants';

const AddExpenseScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('food');

  const handleAddExpense = () => {
    if (title && amount && category) {
      navigation.goBack();
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
            Add Expense
          </Text>
        </View>

        <View className="flex-row justify-center my-3 mt-5">
          <Image className="h-72 w-72" source={getImage('expenseBanner')} />
        </View>
        <View className="grow">
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            For What?
          </Text>
          <TextInput
            value={title}
            onChangeText={value => setTitle(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} text-lg font-bold mb-2`}>
            How Much?
          </Text>
          <TextInput
            value={amount}
            onChangeText={value => setAmount(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
        </View>

        <View className="grow">
          <Text className="text-lg font-bold">Category</Text>
          <View className="flex-row flex-wrap items-center">
            {categories.map((cat: Category) => (
              <TouchableOpacity
                key={cat.value}
                onPress={() => setCategory(cat.value)}
                className={`rounded-full bg-white p-3 px-4 mb-2 mr-2 ${
                  cat.value === category ? 'bg-green-200' : 'bg-white'
                }`}>
                <Text>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleAddExpense}
            className={`bg-[${colors.button}] my-6 rounded-full p-3 shadow-sm`}>
            <Text className="text-center text-white text-lg font-bold">
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddExpenseScreen;
