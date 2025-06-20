import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice'
import marketsReducer from './slices/marketsSlice'
import uiReducer from './slices/uiSlice'
import vendorsReducer from './slices/vendorsSlice'

export const store = configureStore({
  reducer: {
    markets: marketsReducer,
    vendors: vendorsReducer,
    ui: uiReducer,
    map: mapReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
