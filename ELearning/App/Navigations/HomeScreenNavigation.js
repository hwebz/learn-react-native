import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CourseDetailScreen from '../Screens/CourseDetailScreen'
import HomeScreen from '../Screens/HomeScreen'
import ChapterDetailScreen from '../Screens/ChapterDetailScreen'

const Stack = createStackNavigator()

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
    </Stack.Navigator>
  )
}