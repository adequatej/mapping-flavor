import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MapState {
  lng: number
  lat: number
  zoom: number
  bounds: {
    north: number
    south: number
    west: number
    east: number
  }
}

const initialState: MapState = {
  lng: 121.0,
  lat: 23.8,
  zoom: 6,
  bounds: {
    north: 25.8,
    south: 21.8,
    west: 119.3,
    east: 122.7,
  },
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<{ lng: number; lat: number }>) => {
      state.lng = action.payload.lng
      state.lat = action.payload.lat
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
    setBounds: (
      state,
      action: PayloadAction<{
        north: number
        south: number
        west: number
        east: number
      }>
    ) => {
      state.bounds = action.payload
    },
  },
})

export const { setCenter, setZoom, setBounds } = mapSlice.actions

export default mapSlice.reducer
