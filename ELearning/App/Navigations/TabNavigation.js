import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen'
import LeaderBoard from '../Screens/LeaderBoard'
import MyCourse from '../Screens/MyCourse'
import ProfileScreen from '../Screens/ProfileScreen'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'

const Tab =  createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
        <Tab.Screen name="Home" options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }} component={HomeScreen} />
        <Tab.Screen name="MyCourse" options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book-open" size={size} color={color} />
          )
        }} component={MyCourse} />
        <Tab.Screen name="LeaderBoard" options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-stats-chart" size={size} color={color} />
          )
        }} component={LeaderBoard} />
        <Tab.Screen name="Profile" options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        
        }} component={ProfileScreen} />
    </Tab.Navigator>
  )
}