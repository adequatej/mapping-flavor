import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ResearchPanel {
  id: string
  title: string
  content: string
  category: 'methodology' | 'findings' | 'theory' | 'sources'
}

interface UIState {
  viewMode: 'markets' | 'vendors' | 'research'
  activePanel: ResearchPanel | null
  isSidebarOpen: boolean
  searchQuery: string
  isDetailView: boolean
}

const initialState: UIState = {
  viewMode: 'markets',
  activePanel: null,
  isSidebarOpen: true,
  searchQuery: '',
  isDetailView: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode: (
      state,
      action: PayloadAction<'markets' | 'vendors' | 'research'>
    ) => {
      state.viewMode = action.payload
    },
    setActivePanel: (state, action: PayloadAction<ResearchPanel | null>) => {
      state.activePanel = action.payload
    },
    toggleSidebar: state => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setDetailView: (state, action: PayloadAction<boolean>) => {
      state.isDetailView = action.payload
    },
  },
})

export const {
  setViewMode,
  setActivePanel,
  toggleSidebar,
  setSearchQuery,
  setDetailView,
} = uiSlice.actions

export default uiSlice.reducer
