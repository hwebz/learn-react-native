import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../Utils/Colors'
import coinIcon from './../../../assets/images/coin.png'
import { StatusBar } from 'expo-status-bar'
import { UserPointsContext } from '../../Context/UserPointsContext'

export default function Header() {
  const {
    isLoaded,
    isSignedIn,
    user
  } = useUser()
  const { userPoints } = useContext(UserPointsContext)
  
  return isLoaded && (
    <View>
      <StatusBar style="light" />
      <View style={{
        ...styles.row,
        justifyContent: 'space-between',
      }}>
        <View style={styles.row}>
          <Image source={{ uri: user?.imageUrl }} style={{
            width: 50,
            height: 50,
            borderRadius: 50
          }} />
          <View>
            <Text style={{
              color: Colors.WHITE,
              fontSize: 15,
              fontFamily: 'OutfitRegular'
            }}>Welcome,</Text>
            <Text style={styles.mainText}>{user?.fullName}</Text>
          </View>
        </View>

        <View style={styles.row}>
            <Image source={coinIcon} style={{
              width: 40,
              height: 40
            }} />
            <Text style={styles.mainText}>{userPoints}</Text>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Search projects'
          style={styles.searchInput}
        />
        <Ionicons name="search" style={styles.searchIcon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: 'OutfitBold'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  inputWrapper: {
    backgroundColor: Colors.WHITE,
    height: 64,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 60,
    borderRadius: 50,
    color: Colors.GRAY,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    fontSize: 20
  },
  searchIcon: {
    fontSize: 30,
    color: Colors.WHITE,
    backgroundColor: Colors.SECONDARY,
    padding: 5,
    borderRadius: 50,
    marginRight: -50
  }
})