import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ContentItem from './ContentItem'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Content({
  content,
  onChapterFinish
}) {
  const navigation = useNavigation()
  let contentRef
  const [contentIndex, setContentIndex] = useState(0)

  const onNextPress = () => {
    const newIndex = contentIndex + 1
    if (content.length - 1 < newIndex) {
      onChapterFinish()
      // navigation.goBack()
      return
    }
    setContentIndex(newIndex)
    contentRef.scrollToIndex({ animated: true, index: newIndex })
  }

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <View style={{
        flex: 1
      }}>
        <ProgressBar
          contentLength={content?.length}
          contentIndex={contentIndex}
        />
        <FlatList
          data={content}
          pagingEnabled
          horizontal
          ref={(ref) => contentRef = ref}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{
              marginTop: 20
            }}>
              <ScrollView style={{
                width: Dimensions.get('screen').width,
                paddingLeft: 20,
                paddingRight: 20
              }}>
                <Text style={{
                  fontFamily: 'OutfitMedium',
                  fontSize: 22
                }}>{item.heading}</Text>
                <ContentItem
                  description={item?.description?.html}
                  output={item?.output?.html}
                />
              </ScrollView>
            </View>
          )}
        />
      </View>

      <View style={{
        paddingLeft: 20,
        paddingright: 20,
        paddingBottom: 20
      }}>
        <TouchableOpacity style={{
          marginTop: 10
        }} onPress={onNextPress}>
          <Text style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily: 'OutfitRegular',
            fontSize: 17
          }}>{content.length - 1 === contentIndex ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}