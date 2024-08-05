import { Dimensions } from 'react-native'

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

/**
 * Calculates the width in pixels based on a percentage of the device width.
 * @param percentage - The percentage of the device width.
 * @returns The calculated width in pixels.
 */
export const wp = (percentage: number) => {
  const width = deviceWidth
  return (percentage * width) / 100
}

/**
 * Calculates the height in pixels based on a percentage of the device height.
 * @param percentage - The percentage of the device height.
 * @returns The calculated height in pixels.
 */
export const hp = (percentage: number) => {
  const height = deviceHeight
  return (percentage * height) / 100
}