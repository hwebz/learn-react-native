import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CourseDetailScreen from '../Screens/CourseDetailScreen'
import HomeScreen from '../Screens/HomeScreen'

const Stack = createStackNavigator()

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  )
}