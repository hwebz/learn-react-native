import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { hp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { capitalize } from 'lodash'

interface SectionViewProps {
  title: string
  content: React.ReactNode
}

export const SectionView = ({ title, content }: SectionViewProps ) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>
        {content}
      </View>
    </View>
  )
}

interface CommonFilterRowProps {
  data: any
  filterName: string
  filters: any
  setFilters: (filters: any) => void
}

export const CommonFilterRow = ({
  data,
  filterName,
  filters,
  setFilters
}: CommonFilterRowProps) => {

  const onSelect = (item: string) => {
    setFilters({
      ...filters,
      [filterName]: item
    })
  }

  return (
    <View style={styles.flexRowWrap}>
      {
        data?.map((item: string) => {
          const isActive = filters && filters[filterName] === item
          const backgroundColor = isActive ? theme.colors.neutral(0.7) : theme.colors.white
          const color = isActive ? theme.colors.white : theme.colors.neutral(0.7)
          return (
            <Pressable
              onPress={() => onSelect(item)}
              key={item}
              style={[styles.outlinedButton, { backgroundColor }]}
            >
              <Text style={{ color }}>{capitalize(item)}</Text>
            </Pressable>
          )
        })
      }
    </View>
  )
}

export const ColorFilterRow = ({
  data,
  filterName,
  filters,
  setFilters
}: CommonFilterRowProps) => {

  const onSelect = (item: string) => {
    setFilters({
      ...filters,
      [filterName]: item
    })
  }

  return (
    <View style={styles.flexRowWrap}>
      {
        data?.map((item: string) => {
          const isActive = filters && filters[filterName] === item
          const borderColor = isActive ? theme.colors.neutral(0.7) : theme.colors.white
          return (
            <Pressable
              onPress={() => onSelect(item)}
              key={item}
            >
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, {backgroundColor: item}]} />
              </View>
            </Pressable>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: `${theme.fontWeights.medium}` as any,
    color: theme.colors.neutral(0.8),
    marginBottom: 2
  },
  flexRowWrap: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grahBG,
    borderRadius: theme.radius.xs,
    borderCurve: 'continuous'
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderCurve: 'continuous'
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.xs,
    borderCurve: 'continuous'
  }
})

export default SectionView