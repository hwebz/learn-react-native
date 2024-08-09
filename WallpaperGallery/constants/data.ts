import { Category } from '@/api/index'

export const categories = Object.values(Category)

export const filters = [
  {
    title: 'Colors',
    key: 'colors',
    options: ['red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'pink', 'gray', 'black', 'brown', 'white']
  },
  {
    title: 'Orientation',
    key: 'orientation',
    options: ['all', 'horizontal', 'vertical']
  },
  {
    title: 'Order',
    key: 'order',
    options: ['popular', 'latest']
  },
  {
    title: 'Type',
    key: 'type',
    options: ['all', 'photo', 'illustration', 'vector']
  }
]