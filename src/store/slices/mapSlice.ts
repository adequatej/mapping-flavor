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
  lng: 121.5,
  lat: 23.5,
  zoom: 7,
  bounds: {
    north: 25.3,
    south: 21.9,
    west: 120.0,
    east: 122.0,
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
