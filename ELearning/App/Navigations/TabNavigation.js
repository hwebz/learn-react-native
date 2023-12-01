import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LeaderBoard from '../Screens/LeaderBoard'
import MyCourse from '../Screens/MyCourse'
import ProfileScreen from '../Screens/ProfileScreen'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import HomeScreenNavigation from './HomeScreenNavigation'
import { UserPointsContext } from '../Context/UserPointsContext'

const Tab =  createBottomTabNavigator()

export default function TabNavigation() {
  const [userPoints, setUserPoints] = useState(0)
  return (
    <UserPointsContext.Provider value={{
      userPoints,
      setUserPoints
    }}>
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
          <Tab.Screen name="Home" options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }} component={HomeScreenNavigation} />
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
    </UserPointsContext.Provider>
  )
}