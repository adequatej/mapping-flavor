import { ApiResponse, Vendor, VendorFilters } from '@/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Async thunks for API calls
export const fetchVendors = createAsyncThunk(
  'vendors/fetchVendors',
  async (filters?: VendorFilters) => {
    const params = new URLSearchParams()

    if (filters?.search) params.append('search', filters.search)
    if (filters?.marketId) params.append('marketId', filters.marketId)
    if (filters?.specialty) params.append('specialty', filters.specialty)
    if (filters?.isActive !== undefined)
      params.append('isActive', filters.isActive.toString())

    // Set high limit to get all vendors
    params.append('limit', '100')

    const url = `/api/vendors${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch vendors')
    }

    const data: ApiResponse<Vendor[]> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch vendors')
    }

    return data.data
  }
)

export const fetchVendorById = createAsyncThunk(
  'vendors/fetchVendorById',
  async (id: string) => {
    const response = await fetch(`/api/vendors/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Vendor not found')
      }
      throw new Error('Failed to fetch vendor')
    }

    const data: ApiResponse<Vendor> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch vendor')
    }

    return data.data
  }
)

export const createVendor = createAsyncThunk(
  'vendors/createVendor',
  async (vendorData: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/vendors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    })

    if (!response.ok) {
      throw new Error('Failed to create vendor')
    }

    const data: ApiResponse<Vendor> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to create vendor')
    }

    return data.data
  }
)

export const updateVendor = createAsyncThunk(
  'vendors/updateVendor',
  async ({ id, updates }: { id: string; updates: Partial<Vendor> }) => {
    const response = await fetch(`/api/vendors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update vendor')
    }

    const data: ApiResponse<Vendor> = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to update vendor')
    }

    return data.data
  }
)

export const deleteVendor = createAsyncThunk(
  'vendors/deleteVendor',
  async (id: string) => {
    const response = await fetch(`/api/vendors/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete vendor')
    }

    const data: ApiResponse<{ id: string }> = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to delete vendor')
    }

    return id
  }
)

interface VendorsState {
  vendors: Vendor[]
  selectedVendor: Vendor | null
  filters: VendorFilters
  loading: boolean
  error: string | null
  selectedVendorLoading: boolean
  selectedVendorError: string | null
}

const initialState: VendorsState = {
  vendors: [],
  selectedVendor: null,
  filters: {
    search: '',
    marketId: '',
    specialty: '',
    isActive: true,
  },
  loading: false,
  error: null,
  selectedVendorLoading: false,
  selectedVendorError: null,
}

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setSelectedVendor: (state, action: PayloadAction<Vendor | null>) => {
      state.selectedVendor = action.payload
      state.selectedVendorError = null
    },
    setFilters: (state, action: PayloadAction<Partial<VendorFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearError: state => {
      state.error = null
      state.selectedVendorError = null
    },
    clearSelectedVendor: state => {
      state.selectedVendor = null
      state.selectedVendorError = null
    },
  },
  extraReducers: builder => {
    // Fetch vendors
    builder
      .addCase(fetchVendors.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false
        state.vendors = action.payload
        state.error = null
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch vendors'
      })

    // Fetch vendor by ID
    builder
      .addCase(fetchVendorById.pending, state => {
        state.selectedVendorLoading = true
        state.selectedVendorError = null
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.selectedVendorLoading = false
        state.selectedVendor = action.payload
        state.selectedVendorError = null
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.selectedVendorLoading = false
        state.selectedVendorError =
          action.error.message || 'Failed to fetch vendor'
      })

    // Create vendor
    builder.addCase(createVendor.fulfilled, (state, action) => {
      state.vendors.push(action.payload)
    })

    // Update vendor
    builder.addCase(updateVendor.fulfilled, (state, action) => {
      const index = state.vendors.findIndex(v => v.id === action.payload.id)
      if (index !== -1) {
        state.vendors[index] = action.payload
      }
      if (state.selectedVendor?.id === action.payload.id) {
        state.selectedVendor = action.payload
      }
    })

    // Delete vendor
    builder.addCase(deleteVendor.fulfilled, (state, action) => {
      state.vendors = state.vendors.filter(v => v.id !== action.payload)
      if (state.selectedVendor?.id === action.payload) {
        state.selectedVendor = null
      }
    })
  },
})

export const {
  setSelectedVendor,
  setFilters,
  clearError,
  clearSelectedVendor,
} = vendorsSlice.actions

export default vendorsSlice.reducer
