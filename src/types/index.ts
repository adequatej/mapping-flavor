// Core types for the application so far

export interface Market {
  id: string
  name: string
  description: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  image: string
  openingHours: string
  status: 'active' | 'inactive'
  vendors: string[] // vendor IDs
  createdAt: Date
  updatedAt: Date
}

export interface Vendor {
  id: string
  marketId: string
  name: string
  description: string
  specialty: string
  image: string
  contact?: {
    phone?: string
    email?: string
  }
  rating?: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
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
