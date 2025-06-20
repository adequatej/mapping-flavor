import { Market } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketsState {
  markets: Market[]
  selectedMarket: Market | null
  filterCategory: string
  loading: boolean
  error: string | null
}

const initialState: MarketsState = {
  markets: [],
  selectedMarket: null,
  filterCategory: 'all',
  loading: false,
  error: null,
}

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {
    setMarkets: (state, action: PayloadAction<Market[]>) => {
      state.markets = action.payload
    },
    setSelectedMarket: (state, action: PayloadAction<Market | null>) => {
      state.selectedMarket = action.payload
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setMarkets,
  setSelectedMarket,
  setFilterCategory,
  setLoading,
  setError,
} = marketsSlice.actions

export default marketsSlice.reducer
