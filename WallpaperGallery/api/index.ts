import axios from 'axios'
import Constants from 'expo-constants'

const API_KEY = Constants.expoConfig?.extra?.apiKey
const API_URL = Constants.expoConfig?.extra?.apiUrl

enum Language {
  CS = "cs",
  DA = "da",
  DE = "de",
  EN = "en",
  ES = "es",
  FR = "fr",
  ID = "id",
  IT = "it",
  HU = "hu",
  NL = "nl",
  NO = "no",
  PL = "pl",
  PT = "pt",
  RO = "ro",
  SK = "sk",
  FI = "fi",
}

enum ImageType {
  All = "all",
  Photo = "photo",
  Illustration = "illustration",
  Vector = "vector"
}

enum Orientation {
  All = "all",
  Horizontal = "horizontal",
  Vertical = "vertical"
}

export enum Category {
  All = "all",
  Backgrounds = "backgrounds",
  Fashion = "fashion",
  Nature = "nature",
  Science = "science",
  Education = "education",
  Feelings = "feelings",
  Health = "health",
  People = "people",
  Religion = "religion",
  Places = "places",
  Animals = "animals",
  Industry = "industry",
  Computer = "computer",
  Food = "food",
  Sports = "sports",
  Transportation = "transportation",
  Travel = "travel",
  Buildings = "buildings",
  Business = "business",
  Music = "music"
}

enum Color {
  Grayscale = "grayscale",
  Transparent = "transparent",
  Red = "red",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Turquoise = "turquoise",
  Blue = "blue",
  Lilac = "lilac",
  Pink = "pink",
  White = "white",
  Gray = "gray",
  Black = "black",
  Brown = "brown"
}

enum Order {
  Popular = "popular",
  Latest = "latest"
}

interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

export interface PixabayRequest extends QueryParams {
  key?: string
  q?: string
  lang?: Language
  id?: string
  per_page: number
  page: number
  image_type?: ImageType
  orientation?: Orientation
  category?: Category
  min_width?: number
  min_height?: number
  colors?: Color
  editors_choice?: boolean
  safesearch?: boolean
  order?: Order
  callback?: string
  pretty?: boolean
  append?: boolean
}

export interface PixabayImage extends QueryParams {
  id: string
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: string
  previewHeight: string
  webformatURL: string
  webformatWidth: string
  webformatHeight: string
  largeImageURL: string
  fullHDURL: string
  imageURL: string
  imageWidth: string
  imageHeight: string
  imageSize: string
  views: string
  downloads: string
  likes: string
  comments: string
  user_id: string
  user: string
  userImageURL: string
}

export interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

export interface APIResponse {
  success: boolean
  data?: PixabayResponse
  message?: string
}

function buildRequestURL(params: QueryParams): string {

  const urlParams = new URLSearchParams();

  params.key = API_KEY
  Object.keys(params).forEach(key => {
    const paramValue = (params?.[key] || '').toString()
    if (paramValue) urlParams.append(key, paramValue);
  });

  const finalUrl = `${API_URL}?${urlParams.toString()}`
  console.log('Final URL', finalUrl)

  return finalUrl
}

export const apiCall = async (params: QueryParams): Promise<APIResponse> => {
  try {
    const response = await axios.get<PixabayResponse>(buildRequestURL(params))

    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
      console.log("Error: ", error)
      return {
        success: false,
        message: error.message || 'Unable to make api call to Pixabay'
      }
  }
}