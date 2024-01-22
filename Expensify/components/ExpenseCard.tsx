import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../theme';
import {Category, categories} from '../constants';

const ExpenseCard = ({expense}: any) => {
  const selectedCategory = categories.find(
    (category: Category) => category.value === expense.category,
  );
  // console.log(categoryBG[expense.category as never]);
  return (
    <View
      style={{backgroundColor: selectedCategory?.color}}
      className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl">
      <View>
        <Text className={`${colors.heading} font-bold`}>{expense.title}</Text>
        <Text className={`${colors.heading} font-bold`}>
          {expense.category}
        </Text>
      </View>
      <View>
        <Text>${expense.amount}</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;
