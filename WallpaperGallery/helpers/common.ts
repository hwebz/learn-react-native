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

/**
 * Returns the number of columns based on the device width.
 * @returns The number of columns.
 */
export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    return 4
  } else if (deviceWidth >= 768) {
    return 3
  } else {
    return 2
  }
}

/**
 * Returns the size of the image based on its width and height.
 * @param width - The width of the image.
 * @param height - The height of the image.
 * @returns The size of the image.
 */
export const getImageSize = (width: number, height: number) => {
  if (width > height) return 250
  if (width < height) return 300
  return 200
}