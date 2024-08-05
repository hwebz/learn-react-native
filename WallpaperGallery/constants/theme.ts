
interface Colors {
  white: string
  black: string
  grahBG: string
  neutral: (opacity: number) => string
}

interface FontWeights {
  medium: number
  bold: number
  semibold: number
}

interface Radius {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

interface Theme {
  colors: Colors
  fontWeights: FontWeights
  radius: Radius
}

export const theme: Theme = {
  colors: {
    white: '#fff',
    black: '#000',
    grahBG: '#e5e5e5',
    neutral: (opacity: number) => `rgba(10, 10, 10, ${opacity})`
  },
  fontWeights: {
    medium: 500,
    bold: 700,
    semibold: 600
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18
  }
}