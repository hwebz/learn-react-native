import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { theme } from '@/constants/theme'
import { hp, wp } from '@/helpers/common'
import Categories from '@/components/categories'
import { Category, PixabayImage, PixabayRequest, apiCall } from '@/api'
import ImageGrid from '@/components/images'
import { debounce } from 'lodash'
import Filters from '@/components/filters'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { filters as predefinedFilters } from '@/constants/data'

const Home = () => {
  const { top } = useSafeAreaInsets()
  const searchInputRef = useRef<TextInput>(null)
  const paddingTop = top > 0 ? top + 10 : 30
  const [search, setSearch] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<Category>(Category.All)
  const [images, setImages] = useState<PixabayImage[]>([])
  const [filters, setFilters] = useState<any>({})

  const modalRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    fetchPixabayImages()
  }, [])

  const fetchPixabayImages = async ({
    query,
    category,
    ...rest
  }: any = {}) => {
    const params: PixabayRequest = {
      page: 1,
      per_page: 25,
      ...rest
    }
    if (query?.length > 2) {
      params.q = query
    }
    if (category && category !== Category.All) {
      params.category = category
    }
    setImages([])
    const response = await apiCall(params)
    
    if (response.success) {
      setImages(response.data?.hits || [])
    }
  }

  const handleSearch = async (text: string = '') => {
    console.log('Searching for: ', text)
    setSearch(text)
    setImages([])

    await fetchPixabayImages({ query: text })
  }

  const handleSearchDebounce = useCallback(debounce(handleSearch, 500), [])

  const clearSearch = () => {
    searchInputRef?.current?.clear()
    handleSearch()
  }
  
  const handleChangeCategory = async (category: Category) => {
    setActiveCategory(category)
    clearSearch()
    setImages([])
    const params: PixabayRequest = {
      ...filters,
      page: 1,
      category: category === Category.All ? '' : category
    }
    await fetchPixabayImages(params)
  }

  const openFilters = useCallback(() => {
    modalRef.current?.present()
  }, [])

  const closeFilters = useCallback(() => {
    modalRef.current?.close()
  }, [])

  const applyFilters = async () => {
    const params: PixabayRequest = {
      page: 1,
      ...filters
    }
    if (activeCategory) params.category = activeCategory
    if (search) params.query = search
      
    closeFilters()
    await fetchPixabayImages(params)
  }

  const resetFilters = () => {
    setFilters({})
    closeFilters()
    clearSearch()
    setActiveCategory(Category.All)

    applyFilters()
  }

  const clearFilter = (key: string) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    setFilters(newFilters)

    const params: PixabayRequest = {
      page: 1,
      ...newFilters
    }
    if (activeCategory) params.category = activeCategory
    if (search) params.query = search
      
    fetchPixabayImages(params)
  }

  return (
    <View style={[styles.container, {paddingTop}]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>
            Pixels
          </Text>
        </Pressable>
        <Pressable onPress={openFilters}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 15 }}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
          </View>
          <TextInput
            ref={searchInputRef}
            placeholder='Search for photos...'
            style={styles.searchInput}
            onChangeText={handleSearchDebounce}
          />
          {!!search && (
            <Pressable style={styles.closeIcon} onPress={clearSearch}>
              <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <View>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Applied Filters */}
        {Object.keys(filters).length > 0 && (
          <View style={styles.filters}>
            <Text>Filters:</Text>
            <FlatList
              horizontal
              contentContainerStyle={styles.filters}
              showsHorizontalScrollIndicator={false}
              data={Object.keys(filters)}
              keyExtractor={item => item}
              renderItem={({ item, index }: any) => {
                const selectedFilter = predefinedFilters.find(f => f.key === item)
                const filterValue = filters[item]
                return (
                  <View key={item} style={styles.filterItem}>
                    <Text style={styles.filterItemText}>{selectedFilter?.title ?? item}: {filterValue}</Text>
                    <Pressable onPress={() => clearFilter(item)} style={styles.filterCloseIcon}>
                      <Ionicons name="close" size={14} color={theme.colors.neutral(0.9)} />
                    </Pressable>
                  </View>
                )
              }}
            />
          </View>
        )}

        {/* Image Mansory Grid */}
        <View>
          {
            images.length > 0 && (
              <ImageGrid images={images} />
            )
          }
        </View>

        {/* Loading */}
        <View style={{ marginBottom: 70, marginTop: 20 }}>
          <ActivityIndicator size="large" />
        </View>

      </ScrollView>

      {/* Filters */}
      <Filters
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: hp(4),
    fontWeight: `${theme.fontWeights.semibold}` as any,
    color: theme.colors.neutral(0.9)
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grahBG,
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: theme.radius.lg
  },
  searchIcon: {
    padding: 8
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    fontSize: hp(1.8)
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    gap: 10
  },
  filterItem: {
    backgroundColor: theme.colors.neutral(0.1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.sm,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10
  },
  filterItemText: {
    fontSize: hp(1.9)
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: theme.radius.sm
  }
})

export default Home