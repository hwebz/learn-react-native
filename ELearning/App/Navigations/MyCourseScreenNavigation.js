import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CourseDetailScreen from '../Screens/CourseDetailScreen'
import { CompletedChapterContext } from '../Context/CompletedChapterContext'
import MyCourses from '../Screens/MyCourses'

const Stack = createStackNavigator()

export default function MyCourseScreenNavigation() {
  const [isChapterCompleted, setIsChapterCompleted] = React.useState(false)
  return (
    <CompletedChapterContext.Provider value={{ isChapterCompleted, setIsChapterCompleted }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyCourses" component={MyCourses} />
        <Stack.Screen name="MyCourseDetail" component={CourseDetailScreen} />
      </Stack.Navigator>
    </CompletedChapterContext.Provider>
  )
}