import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html'
import Colors from '../../Utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ContentItem({
  description,
  output
}) {
  const { width } = useWindowDimensions()
  const [isRan, setIsRan] = useState(false)

  return description && (
    <View>
      <RenderHtml
        contentWidth={width}
        source={{
          html: description
        }}
        tagsStyles={tagsStyles}
      />

      {output != null && (
        <TouchableOpacity onPress={() => setIsRan(true)}>
          <Text style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            padding: 15,
            fontFamily: 'OutfitRegular',
            color: Colors.WHITE,
            textAlign: 'center'
          }}>Run</Text>
        </TouchableOpacity>
      )}

      {isRan && (
        <View>
          <Text style={{
            fontFamily: 'OutfitMedium',
            fontSize: 22,
            marginTop: 15
          }}>Output</Text>
          <RenderHtml
            contentWidth={width}
            source={{
              html: output
            }}
            tagsStyles={tagsStyles}
          />
        </View>
      )}
    </View>
  )
}

const tagsStyles = {
  body: {
    fontFamily: 'OutfitRegular',
    fontSize:  16
  },
  code: {
    backgroundColor: Colors.BLACK,
    color: Colors.WHITE,
    padding: 20,
    borderRadius: 15
  }
}