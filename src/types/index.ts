// Core types for the application so far

export interface Market {
  id: string
  name: string
  chineseName: string
  coordinates: [number, number]
  researchFocus: string
  description: string
  keyFindings: string[]
  analyticalNote: string
  established: string
  location: string
  image: string
  vendors: Vendor[]
}

export interface Vendor {
  id: string
  name: string
  specialty: string
  cultural_significance: string
  coordinates: [number, number]
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
}
