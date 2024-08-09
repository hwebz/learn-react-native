import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { categories } from '@/constants/data'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { Category } from '@/api'

interface CategoriesProps {
  activeCategory: Category
  handleChangeCategory: (category: Category) => void
}

interface CategoryItem {
  isActive: boolean
  title: string
  index: number
  onClick: (category: Category) => void
}

const Categories = ({
  activeCategory,
  handleChangeCategory
}: CategoriesProps) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={item => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          key={index}
          index={index}
          isActive={activeCategory === item}
          onClick={handleChangeCategory}
          title={item}
        />
      )}
    />
  )
}

const CategoryItem = ({ isActive, title, index, onClick }: CategoryItem) => {
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8)
  const backgroundColor = isActive ? theme.colors.neutral(0.8) : theme.colors.white
  return (
    <Animated.View entering={FadeInRight.delay(index * 200)}>
      <Pressable style={[styles.category, {backgroundColor}]} onPress={() => onClick(title as Category)}>
          <Text style={[styles.title, {color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 8
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grahBG,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous'
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: `${theme.fontWeights.medium}` as any
  }
})

export default Categories