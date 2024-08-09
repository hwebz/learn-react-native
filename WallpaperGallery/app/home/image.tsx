import { View, Text, StyleSheet, Button, Platform, ActivityIndicator, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { hp, wp } from '@/helpers/common'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { theme } from '@/constants/theme'
import { Octicons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import Toast from 'react-native-toast-message'

const ImageScreen = () => {
  const router = useRouter()
  const item = useLocalSearchParams()

  const uri = item?.webformatURL
  const fileName = (typeof item?.previewURL === 'string' ? item?.previewURL : '')?.split('/').pop()
  const [status, setStatus] = useState('loading')

  const toastConfig = {
    success: ({ text1, props, ...rest }: any) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      )
    }
  }
  const showToast = ({ message } : any) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom'
    })
  }

  const getSize = () => {
    const aspectRatio = parseInt(item?.imageWidth as any, 10) / parseInt(item?.imageHeight as any, 10)

    const maxWidth = Platform.OS === 'web' ? wp(50) : wp(92)
    const calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth

    if (aspectRatio < 1) { // portrait image
      calculatedWidth = calculatedHeight * aspectRatio
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight
    }
  }

  const onLoad = () => {
    setStatus('')
  }

  const handleDownloadImage = async () => {
    setStatus('downloading')
    let uri = await downloadFile()
    if (uri) {
      console.log("Image downloaded: ", uri)
      showToast({ message: 'Image downloaded successfully' })
      // Alert.alert('Success', 'Image downloaded successfully')
    }
    await downloadFile()
  }

  const handleShareImage = async () => {
    setStatus('sharing')
    const uri = await downloadFile()
    if (uri) {
      console.log("Image downloaded and ready to share", uri)
      await Sharing.shareAsync(uri)
      setStatus('')
    }
  }

  const downloadFile = async () => {
    try {
      const imageUrl = item?.webformatURL as string
      const filePath = `${FileSystem.documentDirectory}${fileName}`
      const response = await FileSystem.downloadAsync(imageUrl, filePath)

      return response?.uri ?? null
    } catch (err: any) {
      Alert.alert('Error', err.message)
      return null
    } finally {
      setStatus('')
    }
  }

  return (
    <BlurView
      tint='dark'
      intensity={60}
      style={styles.container}
    >
      <View style={[getSize()]}>
        <View style={styles.loading}>
          {
            status == 'loading' && <ActivityIndicator size='large' color='white' />
          }
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
          <Animated.View entering={FadeInDown.springify()}>
            <Pressable
              onPress={() => router.back()}
              style={styles.button}
            >
              <Octicons name='x' size={24} color='white' />
            </Pressable>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            {status === 'downloading' ? (
              <View style={styles.button}>
                <ActivityIndicator size='small' color='white' />
              </View>
            ) : (
              <Pressable
                onPress={handleDownloadImage}
                style={styles.button}
              >
                <Octicons name='download' size={24} color='white' />
              </Pressable>
            )}
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            {status === 'sharing' ? (
              <View style={styles.button}>
                <ActivityIndicator size='small' color='white' />
              </View>
            ) : (
              <Pressable
                onPress={handleShareImage}
                style={styles.button}
              >
                <Octicons name='share' size={24} color='white' />
              </Pressable>
            )}
          </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4)
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous'
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: `${theme.fontWeights.semibold}` as any,
    color: theme.colors.white
  }
})

export default ImageScreen