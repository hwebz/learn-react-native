import { Text, StyleSheet, View, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import Animated, { Extrapolation, FadeInDown, FadeInUp, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { filters as predefinedFilters } from '@/constants/data'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import SectionView, { ColorFilterRow, CommonFilterRow } from '@/components/sectionView'

interface FiltersProps {
  modalRef: any
  filters: string[]
  setFilters: (filters: string[]) => void
  onApply: () => void
  onReset: () => void
}

const Filters = ({
  modalRef,
  filters,
  setFilters,
  onApply,
  onReset
}: FiltersProps) => {

  const snapPoints = useMemo(() => ['75%'], [])
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName: string, index: number) => {
            const Section = sections[sectionName as keyof typeof sections]
            const section = predefinedFilters.find((filter) => filter.key === sectionName)
            return (
              <Animated.View
                key={sectionName}
                entering={FadeInDown.delay((index * 100) + 100).springify().damping(11)}
              >
                <SectionView
                  title={section?.title ?? ''}
                  content={Section({
                    data: section?.options ?? [],
                    filters,
                    setFilters,
                    filterName: sectionName
                  })}
                />
              </Animated.View>
            )
          })}

          {/* Buttons */}
          <Animated.View
            style={styles.buttonsWrapper}
            entering={FadeInDown.delay(500).springify().damping(11)}
          >
            <Pressable
              onPress={onReset}
              style={[styles.button, styles.resetButton]}
            >
              <Text style={[styles.buttonText, { color: theme.colors.neutral(0.9) }]}>Reset</Text>
            </Pressable>
            <Pressable
              onPress={onApply}
              style={[styles.button, styles.applyButton]}
            >
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>Apply</Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const sections = {
  order: (props: any) => <CommonFilterRow {...props} />,
  orientation: (props: any) => <CommonFilterRow {...props} />,
  type: (props: any) => <CommonFilterRow {...props} />,
  colors: (props: any) => <ColorFilterRow {...props} />
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP)
    return {
      opacity
    }
  })
  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle
  ]
  return (
    <Animated.View style={containerStyle}>
      <BlurView
        style={StyleSheet.absoluteFill}
        tint='dark'
        intensity={25}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: '100%'
  },
  filterText: {
    fontSize: wp(6),
    fontWeight: `${theme.fontWeights.semibold}` as any,
    marginBottom: 5
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    flex: 1,
  },
  button: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderCurve: 'continuous'
  },
  resetButton: {
    borderColor: theme.colors.grahBG,
    borderWidth: 1,
  },
  applyButton: {
    backgroundColor: theme.colors.neutral(0.7),
  },
  buttonText: {
    fontSize: hp(2.2)
  }
})

export default Filters