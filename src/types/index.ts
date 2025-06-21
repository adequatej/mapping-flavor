// Core types for the application

export interface Market {
  id: string
  name: string
  chineseName: string
  location: string
  established: string
  researchFocus: string
  description: string
  analyticalNote: string
  keyFindings: string[]
  image: string
  latitude: number
  longitude: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  vendors?: Vendor[]
}

export interface Vendor {
  id: string
  name: string
  specialty: string
  cultural_significance: string
  latitude: number
  longitude: number
  marketId: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: 'admin' | 'user'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Redux async state types
export interface AsyncState {
  loading: boolean
  error: string | null
}

export interface MarketFilters {
  search?: string
  location?: string
  researchFocus?: string
  isActive?: boolean
}
