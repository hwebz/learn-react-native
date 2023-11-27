import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function DetailSection({
    course,
    enrollCourse
}) {
  return (
    <View style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        marginTop: 10
    }}>
      <Image source={{ uri: course?.banner?.url }} style={{
        width: '100%',
        height: 190,
        borderRadius: 15
      }} />
      <View style={{
        padding: 10
      }}>
        <Text style={{
            fontFamily: 'OutfitMedium',
            fontSize: 25
        }}>{course?.name}</Text>
        <Text style={{
            marginTop: 5,
            fontSize: 18,
            color: Colors.PRIMARY,
            fontFamily: 'OutfitMedium',
        }}>{course?.price > 0 ? `$${course?.price}` : 'Free'}</Text>

        <View style={{
            marginTop: 10,
            gap: 5,
            padding: 15
        }}>
            <View style={styles.rowStyle}>
                <OptionItem style={{
                    width: Dimensions.get('screen').width * 0.45
                }} icon={'book-outline'} label={`${course?.chapters?.length} chapters`} />
                <OptionItem icon={'md-time-outline'} label={`${course?.time} min`} />
            </View>
            <View style={styles.rowStyle}>
                <OptionItem style={{
                    width: Dimensions.get('screen').width * 0.45
                }} icon={'person-circle-outline'} label={course?.author} />
                <OptionItem icon={'cellular-outline'} label={course?.level} />
            </View>
        </View>

        <View>
            <Text style={{
                fontFamily: 'OutfitMedium',
                fontSize: 20,
                marginTop: 10
            }}>Description</Text>
            <Text style={{
                color: Colors.GRAY,
                fontSize: 16,
                marginTop: 10,
                lineHeight: 21,
                fontFamily: 'OutfitRegular'
            }}>
                {course?.description?.markdown}
            </Text>
        </View>

        <View style={styles.rowStyle}>
            <TouchableOpacity>
                <Text style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    color: Colors.WHITE,
                    fontSize: 14,
                    fontFamily: 'OutfitRegular'
                }} onPress={enrollCourse}>Enroll For Free</Text>
            </TouchableOpacity>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity>
                    <Text style={{
                        padding: 15,
                        backgroundColor: Colors.LIGHT_BLUE,
                        borderRadius: 15,
                        color: Colors.WHITE,
                        fontSize: 14,
                        fontFamily: 'OutfitRegular',
                        textAlign: 'center'
                    }}>Membership $29/Mon</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }
})