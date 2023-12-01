import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Content from '../Components/ChapterDetail/Content'
import { getUserEnrolledCourses, markChapterAsCompleted } from '../Services'
import { CompletedChapterContext } from '../Context/CompletedChapterContext'
import { ScrollView } from 'react-native-gesture-handler'
import { UserPointsContext } from '../Context/UserPointsContext'
import { useUser } from '@clerk/clerk-expo'

export default function ChapterDetailScreen() {
  const { params } = useRoute()
  const navigation = useNavigation()
  const { setIsChapterCompleted } = useContext(CompletedChapterContext)
  const { userPoints, setUserPoints } = useContext(UserPointsContext)
  const { user } = useUser()

  const onChapterFinish = async () => {
    try {
      const totalPoints = Number(userPoints) + params.content?.length * 10
      await markChapterAsCompleted(params.userCourseRecordId, params.chapterId, user.primaryEmailAddress.emailAddress, totalPoints)
      ToastAndroid.showWithGravity('Chapter completed successfully', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      setIsChapterCompleted(true)
      setUserPoints(totalPoints)
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return params.content && (
    <View style={{
      paddingTop: 50,
    }}>
      <Content
        content={params.content}
        onChapterFinish={onChapterFinish}
      />
    </View>
  )
}