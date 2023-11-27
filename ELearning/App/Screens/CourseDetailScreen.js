import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import DetailSection from '../Components/CourseDetailScreen/DetailSection'
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection'
import { enrollCourse } from '../Services'
import { useUser } from '@clerk/clerk-expo'

export default function CourseDetailScreen() {
  const navigator = useNavigation()
  const { params } = useRoute()
  const { user } = useUser()

  useEffect(() => {
    console.log(params.course)
    if (!params.course) {
      navigator.navigate('Home')
    }
  }, [params.course])

  const userEnrollCourse = async () => {
    try {
      await enrollCourse(params.course?.id, user.primaryEmailAddress.emailAddress)
    } catch (error) {
      console.log("ERROR = ", error)
    }
  }

  return (
    <ScrollView>
      <View style={{
        padding: 20,
        paddingTop: 40
      }}>
        <StatusBar style="dark" />
        <TouchableOpacity onPress={() => {
            navigator.navigate('Home')
          }}>
          <Ionicons name="ios-arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <DetailSection course={params.course} enrollCourse={userEnrollCourse} />
        <ChapterSection chapters={params.course?.chapters} />
      </View>
    </ScrollView>
  )
}