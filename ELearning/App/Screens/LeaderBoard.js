import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../Services'
import Colors from '../Utils/Colors'
import GoldMedal from '../../assets/gold-medal.png'
import SilverMedal from '../../assets/silver-medal.png'
import BronzeMedal from '../../assets/bronze-medal.png'

export default function LeaderBoard() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsersDetail()
  }, [])

  const getAllUsersDetail = async () => {
    try {
      const usersDetail = await getAllUsers()
      setUsers(usersDetail)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View>
      <View style={{
        height: 160,
        backgroundColor: Colors.PRIMARY,
        padding: 30,
        paddingTop: 50,
      }}>
        <Text style={{
          fontFamily: 'OutfitBold',
          color: Colors.WHITE,
          fontSize: 30
        }}>
          LeaderBoard
        </Text>
      </View>

      <View style={{
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -50,
        height: '87%'
      }}>
        <FlatList
          data={users}
          key={users.id}
          renderItem={({ item, index }) => (
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              marginBottom: 20
            }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
              }}>
                <Text style={{
                  fontFamily: 'OutfitBold',
                  fontSize: 22,
                  color: Colors.GRAY
                }}>{index + 1}</Text>
                <Image
                  source={{ uri: item.profileImage }}
                  style={{ width: 60, height: 60 }}
                />
                <View style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}>
                  <Text style={{
                    fontFamily: 'OutfitBold',
                    fontSize: 20
                  }}>{item.userName}</Text>
                  <Text style={{
                    fontFamily: 'OutfitRegular',
                    fontSize: 16,
                    color: Colors.GRAY
                  }}>{item.point} points</Text>
                </View>
              </View>

              {index < 3 && (
                <Image
                  source={ index === 0 ? GoldMedal : index === 1 ? SilverMedal : BronzeMedal}
                  style={{
                    width: 40,
                    height: 40
                  }}
                />
              )}
            </View>
          )}
        />
      </View>
    </View>
  )
}