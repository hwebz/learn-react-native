import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import CourseList from '../Components/HomeScreen/CourseList'
import { useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services'
import { UserPointsContext } from '../Context/UserPointsContext'

export default function HomeScreen() {
  const { user } = useUser()
  const { setUserPoints } = useContext(UserPointsContext)

  useEffect(() => {
    if (user) {
      createUser()
    }
  }, [user])

  const createUser = async () => {
    try {
      // you can get point from createNewUser response
      // instead of calling getUserDetail
      await createNewUser(
        user.fullName,
        user.primaryEmailAddress.emailAddress,
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png"
      )
      await getUserPoints()
    } catch (error) {
      console.log(error)
    }
  }

  const getUserPoints = async () => {
    try {
      const point = await getUserDetail(
        user.primaryEmailAddress.emailAddress
      )
      setUserPoints(point)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <View style={{
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120
      }}>
        <Header />
      </View>
      <View>
        <View style={{
          marginTop: -80,
          marginBottom: 30
        }}>
          <CourseList level='Basic' color={Colors.WHITE} />
        </View>
        <View style={{
          marginBottom: 30
        }}>
          <CourseList level='Advance' />
        </View>
      </View>
    </ScrollView>
  )
}