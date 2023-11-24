import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import Colors from '../Utils/Colors'

import appThumbnail from '../../assets/images/app.jpg'
import googleIcon from '../../assets/images/google.png'

export default function LoginScreen() {
  return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    }}>
      <Image source={appThumbnail} style={{
        width: 250,
        height: 500,
        objectFit: 'contain',
        marginTop: 50
      }} />
      <View style={{
        height: 400,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        marginTop: -100,
        padding: 20
      }}>
        <Text style={{
            textAlign: 'center',
            fontSize: 60,
            color: Colors.WHITE,
            fontFamily: 'OutfitBold'
        }}>&lt;/&gt;</Text>
        <Text style={{
            textAlign: 'center',
            fontSize: 40,
            color: Colors.WHITE,
            fontFamily: 'OutfitBold',
            marginTop: -10,
        }}>CodeBox</Text>
        <Text style={{
            fontSize: 26,
            color: Colors.LIGHT_PRIMARY,
            marginTop: 20,
            marginBottom: 30,
            textAlign: 'center',
            fontFamily: 'OutfitRegular'
        }}>Your Ultimate Programming Learning Box</Text>

        <TouchableOpacity style={{
            backgroundColor: Colors.WHITE,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            paddingRight: 20,
            borderRadius: 30,
            gap: 10,
            marginBottom: 10,
            alignSelf: 'center',
        }}>
            <Image source={googleIcon} style={{
                width: 40, 
                height: 40
            }} />
            <Text style={{
                color: Colors.PRIMARY,
                fontFamily: 'OutfitRegular',
                fontSize: 23,
            }}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}