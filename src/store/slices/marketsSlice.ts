import { ApiResponse, Market, MarketFilters } from '@/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Async thunks for API calls
export const fetchMarkets = createAsyncThunk(
  'markets/fetchMarkets',
  async (filters?: MarketFilters) => {
    const params = new URLSearchParams()

    if (filters?.search) params.append('search', filters.search)
    if (filters?.location) params.append('location', filters.location)
    if (filters?.researchFocus)
      params.append('researchFocus', filters.researchFocus)
    if (filters?.isActive !== undefined)
      params.append('isActive', filters.isActive.toString())

    const url = `/api/markets${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch markets')
    }

    const data: ApiResponse<Market[]> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch markets')
    }

    return data.data
  }
)

export const fetchMarketById = createAsyncThunk(
  'markets/fetchMarketById',
  async (id: string) => {
    const response = await fetch(`/api/markets/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Market not found')
      }
      throw new Error('Failed to fetch market')
    }

    const data: ApiResponse<Market> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch market')
    }

    return data.data
  }
)

export const createMarket = createAsyncThunk(
  'markets/createMarket',
  async (marketData: Omit<Market, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/markets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marketData),
    })

    if (!response.ok) {
      throw new Error('Failed to create market')
    }

    const data: ApiResponse<Market> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to create market')
    }

    return data.data
  }
)

export const updateMarket = createAsyncThunk(
  'markets/updateMarket',
  async ({ id, updates }: { id: string; updates: Partial<Market> }) => {
    const response = await fetch(`/api/markets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update market')
    }

    const data: ApiResponse<Market> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to update market')
    }

    return data.data
  }
)

export const deleteMarket = createAsyncThunk(
  'markets/deleteMarket',
  async (id: string) => {
    const response = await fetch(`/api/markets/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete market')
    }

    const data: ApiResponse<{ id: string }> = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to delete market')
    }

    return id
  }
)

interface MarketsState {
  markets: Market[]
  selectedMarket: Market | null
  filters: MarketFilters
  loading: boolean
  error: string | null
  selectedMarketLoading: boolean
  selectedMarketError: string | null
}

const initialState: MarketsState = {
  markets: [],
  selectedMarket: null,
  filters: {
    search: '',
    location: '',
    researchFocus: '',
    isActive: true,
  },
  loading: false,
  error: null,
  selectedMarketLoading: false,
  selectedMarketError: null,
}

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {
    setSelectedMarket: (state, action: PayloadAction<Market | null>) => {
      state.selectedMarket = action.payload
      state.selectedMarketError = null
    },
    setFilters: (state, action: PayloadAction<Partial<MarketFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearError: state => {
      state.error = null
      state.selectedMarketError = null
    },
    clearSelectedMarket: state => {
      state.selectedMarket = null
      state.selectedMarketError = null
    },
  },
  extraReducers: builder => {
    // Fetch markets
    builder
      .addCase(fetchMarkets.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMarkets.fulfilled, (state, action) => {
        state.loading = false
        state.markets = action.payload
        state.error = null
      })
      .addCase(fetchMarkets.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch markets'
      })

    // Fetch market by ID
    builder
      .addCase(fetchMarketById.pending, state => {
        state.selectedMarketLoading = true
        state.selectedMarketError = null
      })
      .addCase(fetchMarketById.fulfilled, (state, action) => {
        state.selectedMarketLoading = false
        state.selectedMarket = action.payload
        state.selectedMarketError = null
      })
      .addCase(fetchMarketById.rejected, (state, action) => {
        state.selectedMarketLoading = false
        state.selectedMarketError =
          action.error.message || 'Failed to fetch market'
      })

    // Create market
    builder.addCase(createMarket.fulfilled, (state, action) => {
      state.markets.push(action.payload)
    })

    // Update market
    builder.addCase(updateMarket.fulfilled, (state, action) => {
      const index = state.markets.findIndex(m => m.id === action.payload.id)
      if (index !== -1) {
        state.markets[index] = action.payload
      }
      if (state.selectedMarket?.id === action.payload.id) {
        state.selectedMarket = action.payload
      }
    })

    // Delete market
    builder.addCase(deleteMarket.fulfilled, (state, action) => {
      state.markets = state.markets.filter(m => m.id !== action.payload)
      if (state.selectedMarket?.id === action.payload) {
        state.selectedMarket = null
      }
    })
  },
})

export const {
  setSelectedMarket,
  setFilters,
  clearError,
  clearSelectedMarket,
} = marketsSlice.actions

export default marketsSlice.reducer
