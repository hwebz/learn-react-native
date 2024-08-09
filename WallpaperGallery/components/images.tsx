import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import { PixabayImage } from '@/api'
import { getColumnCount, getImageSize, wp } from '@/helpers/common'
import { Image } from 'expo-image'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'

interface ImageGridProps {
  images: PixabayImage[]
}

interface ImageCardProps {
  image: PixabayImage
  index: number
  isLastItemInRow: boolean
}

const ImageGrid = ({
  images = []
}: ImageGridProps) => {
  const columns = getColumnCount()
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard
            image={item}
            index={index}
            isLastItemInRow={(index + 1) % columns === 0}
          />
      )}
        estimatedItemSize={200}
      />
    </View>
  )
}

const ImageCard = ({ image, isLastItemInRow, index }: ImageCardProps ) => {
  const router = useRouter()
  const getImageHeight = () => {
    const {
      imageHeight: height,
      imageWidth: width
    } = image

    return {
      height: getImageSize(parseInt(width, 10), parseInt(height, 10))
    }
  }
  return (
    <Pressable
      onPress={() => router.push({ pathname: 'home/image' as any, params: { ...image } as any })}
      style={[styles.imageWrapper, !isLastItemInRow && styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={image?.webformatURL}
        transition={100}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100)
  },
  listContainerStyle: {
    paddingHorizontal: wp(4)
  },
  image: {
    height: 300,
    width: '100%'
  },
  imageWrapper: {
    backgroundColor: theme.colors.grahBG,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    marginBottom: wp(2)
  },
  spacing: {
    marginRight: wp(2)
  }
})

export default ImageGrid