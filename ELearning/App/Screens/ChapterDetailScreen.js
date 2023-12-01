import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Content from '../Components/ChapterDetail/Content'
import { getUserEnrolledCourses, markChapterAsCompleted } from '../Services'
import { CompletedChapterContext } from '../Context/CompletedChapterContext'

export default function ChapterDetailScreen() {
  const { params } = useRoute()
  const navigation = useNavigation()
  const { setIsChapterCompleted } = useContext(CompletedChapterContext)

  const onChapterFinish = async () => {
    try {
      await markChapterAsCompleted(params.userCourseRecordId, params.chapterId)
      ToastAndroid.showWithGravity('Chapter completed successfully', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      setIsChapterCompleted(true)
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