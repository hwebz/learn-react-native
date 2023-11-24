import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

import Colors from '../Utils/Colors'

import appThumbnail from './../../assets/images/app.jpg'
import googleIcon from './../../assets/images/google.png'

export default function LoginScreen() {
  return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%'
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
        padding: 20,
    }}>
        <Text style={{
            color: Colors.WHITE,
            fontSize: 60,
            fontFamily: 'OutfitBold',
            textAlign: 'center'
        }}>
            &lt;/&gt;
        </Text>
        <Text style={{
            color: Colors.WHITE,
            fontSize: 40,
            fontFamily: 'OutfitBold',
            textAlign: 'center',
            marginTop: -5
        }}>
            CodeBox
        </Text>
        <Text style={{
            marginTop: 20,
            marginBottom: 30,
            fontSize: 26,
            fontFamily: 'OutfitRegular',
            color: Colors.LIGHT_PRIMARY,
            textAlign: 'center'
        }}>
            Your Ultimate Programming Learning Box
        </Text>
        <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: Colors.WHITE,
            borderRadius: 50,
            padding: 10,
            paddingRight: 20,
            alignSelf: 'center'
        }}>
            <Image source={googleIcon} style={{}} />
            <Text style={{
                fontSize: 23,
                color: Colors.PRIMARY,
                fontFamily: 'OutfitRegular'
            }}>
            Login with Google
            </Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}