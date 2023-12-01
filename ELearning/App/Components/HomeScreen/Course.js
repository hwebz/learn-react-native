import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Feather } from '@expo/vector-icons'
import CourseProgressBar from './CourseProgressBar'

export default function Course({
    course,
    completedChapters = []
}) {
  return (
    <View style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#acacac',
        padding: 8,
        marginRight: 15,
        width: 260
    }}>
      <Image source={{ uri: course?.banner?.url }} style={{
        width: '100%',
        height: 156,
        borderRadius: 10
      }} />
      <View style={{
        padding: 10
      }}>
        <Text style={{
          fontFamily: 'OutfitMedium',
          fontSize: 20,
          color: Colors.BLACK,
          marginBottom: 10
        }}>{course?.name}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 5
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}>
            <Feather name="book-open" size={18} color="black" />
            <Text style={{
              fontFamily: 'OutfitRegular',
              fontSize: 13,
              color: Colors.BLACK,
            }}>{course?.chapters?.length} chapters</Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}>
            <Feather name="clock" size={18} color="black" />
            <Text style={{
              fontFamily: 'OutfitRegular',
              fontSize: 13,
              color: Colors.BLACK,
            }}>{course?.time} min</Text>
          </View>
        </View>
        <Text style={{
          marginTop: 5,
          color: Colors.PRIMARY,
          fontFamily: 'OutfitMedium',
        }}>{course?.price > 0 ? `$${course?.price}` : 'Free'}</Text>
      </View>
      {completedChapters?.length > 0 && (
        <CourseProgressBar
          totalChapters={course.chapters.length}
          completedChapters={completedChapters.length}
        />
      )}
    </View>
  )
}