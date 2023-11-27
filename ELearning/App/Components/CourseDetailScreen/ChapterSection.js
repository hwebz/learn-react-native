import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

export default function ChapterSection({
    chapters = []
}) {
  return (
    <View style={{
      padding: 20,
      backgroundColor: Colors.WHITE,
      borderRadius: 15,
      marginTop: 15
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'OutfitMedium',
        marginBottom: 10
      }}>Chapters</Text>
      {chapters.map((chapter, index) => {
        const isDisabled = index == 2
        const isCompleted = index == 0
        const selectedColor = isDisabled ? Colors.GREY : (isCompleted ? Colors.GREEN : Colors.PRIMARY)
        const selectedIcon = isDisabled ? 'lock-closed' : 'ios-play-circle-sharp'
        return (
          <View key={chapter.id} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
            borderWidth: 1,
            borderColor: selectedColor,
            borderStyle: 'solid',
            borderRadius: 15,
            backgroundColor: `${selectedColor}11`,
            marginBottom: 10,
            height: 70
          }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
              }}>
                {isCompleted ? (
                  <MaterialIcons name="check-circle" size={24} color={selectedColor} />
                ) : (
                  <Text style={{
                    fontSize: 35,
                    color: `${selectedColor}56`,
                    fontFamily: 'OutfitRegular'
                  }}>{index < 10 ? '0' : ''}{index + 1}</Text>
                )}
                <Text style={{
                  color: selectedColor,
                  fontSize: 20,
                  fontFamily: 'OutfitRegular',
                  maxWidth: '80%'
                }} numberOfLines={1}>{chapter.title}</Text>
              </View>
              <Ionicons name={selectedIcon} size={24} color={selectedColor} />
          </View>
        )
      })}
    </View>
  )
}