import { Vendor } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VendorsState {
  vendors: Vendor[]
  selectedVendor: Vendor | null
  loading: boolean
  error: string | null
}

const initialState: VendorsState = {
  vendors: [],
  selectedVendor: null,
  loading: false,
  error: null,
}

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setVendors: (state, action: PayloadAction<Vendor[]>) => {
      state.vendors = action.payload
    },
    setSelectedVendor: (state, action: PayloadAction<Vendor | null>) => {
      state.selectedVendor = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setVendors, setSelectedVendor, setLoading, setError } =
  vendorsSlice.actions

export default vendorsSlice.reducer
