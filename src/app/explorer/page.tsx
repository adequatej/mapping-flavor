'use client'

import MapControls from '@/components/maps/MapControls'
import MapSidebar from '@/components/maps/MapSidebar'
import SearchHeader from '@/components/maps/SearchHeader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCenter, setZoom } from '@/store/slices/mapSlice'
import { fetchMarkets, setSelectedMarket } from '@/store/slices/marketsSlice'
import {
  setDetailView,
  setSearchQuery,
  setViewMode,
  toggleSidebar,
} from '@/store/slices/uiSlice'
import { fetchVendors, setSelectedVendor } from '@/store/slices/vendorsSlice'
import { Market, Vendor } from '@/types'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/maps/Map'), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 bg-neutral-800 flex items-center justify-center'>
      <div className='text-white'>Loading map...</div>
    </div>
  ),
})

interface ResearchPanel {
  id: string
  title: string
  content: string
  category: 'methodology' | 'findings' | 'theory' | 'sources'
}

const researchPanels: ResearchPanel[] = [
  {
    id: 'methodology',
    title: 'Observational Methodology',
    category: 'methodology',
    content:
      'Following Wu & Lin (2013) and Chen & Huang (2014), I analyze vendor behaviors and cultural performances from a supply-side perspective.',
  },
  {
    id: 'digital-heritage',
    title: 'Digital Heritage Preservation',
    category: 'methodology',
    content:
      'Using Barbash et al. (2024) framework for participatory digital documentation to preserve underrepresented cultural practices.',
  },
  {
    id: 'cultural-identity',
    title: 'Cultural Identity & Food Tourism',
    category: 'findings',
    content:
      'Night markets serve as sites where cultural identity is both performed and commodified for different audiences.',
  },
  {
    id: 'democratic-spaces',
    title: 'Democratic Cultural Spaces',
    category: 'theory',
    content:
      'Following Wu & Lin (2013), night markets function as democratic spaces that challenge class-based cultural exclusions.',
  },
  {
    id: 'theoretical-framework',
    title: 'Theoretical Framework',
    category: 'theory',
    content:
      "Applying Giaccardi's participatory heritage model to understand how night markets balance commercial appeal with cultural authenticity.",
  },
  {
    id: 'sources',
    title: 'Key Sources',
    category: 'sources',
    content:
      'Chen & Huang (2014), Wu & Lin (2013), Barbash et al. (2024), and Giaccardi (2012) provide the theoretical foundation for this research.',
  },
]

export default function Explorer() {
  const dispatch = useAppDispatch()

  // Get state from Redux
  const marketsState = useAppSelector(state => state.markets)
  const vendorsState = useAppSelector(state => state.vendors)
  const uiState = useAppSelector(state => state.ui)
  const mapState = useAppSelector(state => state.map)

  const markets = marketsState.markets
  const marketsLoading = marketsState.loading
  const selectedMarket = marketsState.selectedMarket

  const vendors = vendorsState.vendors
  const vendorsLoading = vendorsState.loading
  const selectedVendor = vendorsState.selectedVendor

  const viewMode = uiState.viewMode
  const isSidebarOpen = uiState.isSidebarOpen
  const searchQuery = uiState.searchQuery
  const isDetailView = uiState.isDetailView

  // Load data on mount
  useEffect(() => {
    dispatch(fetchMarkets())
    dispatch(fetchVendors())
  }, [dispatch])

  // Map event handlers
  const handleZoomIn = () => {
    const newZoom = Math.min(mapState.zoom + 1, 18)
    dispatch(setZoom(newZoom))
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(mapState.zoom - 1, 6) // Match the map's minZoom limit - prevents zooming out past Taiwan
    dispatch(setZoom(newZoom))
  }

  const handleReset = () => {
    dispatch(setCenter({ lng: 121.0, lat: 23.8 }))
    dispatch(setZoom(6)) // Match the new minZoom level
    dispatch(setSelectedMarket(null))
    dispatch(setSelectedVendor(null))
  }

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  // Search and filter handlers
  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  const handleViewModeChange = (mode: 'markets' | 'vendors' | 'research') => {
    dispatch(setViewMode(mode))
    // Auto-open sidebar when changing view mode
    if (!isSidebarOpen) {
      dispatch(toggleSidebar())
    }
  }

  // Selection handlers
  const handleMarketSelect = (market: Market | null) => {
    dispatch(setSelectedMarket(market))

    // Auto-open sidebar and enable detail view when a market is selected
    if (market && !isSidebarOpen) {
      dispatch(toggleSidebar())
    }

    // Enable detail view when a market is selected from map
    dispatch(setDetailView(!!market))

    if (market && viewMode === 'vendors') {
      // Auto-focus on market when selecting for vendor view
      dispatch(setCenter({ lng: market.longitude, lat: market.latitude }))
    }
  }

  const handleVendorSelect = (vendor: Vendor | null) => {
    dispatch(setSelectedVendor(vendor))

    // Auto-open sidebar and enable detail view when a vendor is selected
    if (vendor && !isSidebarOpen) {
      dispatch(toggleSidebar())
    }

    // Enable detail view when a vendor is selected from map
    dispatch(setDetailView(!!vendor))
  }

  const handleBackToList = () => {
    dispatch(setDetailView(false))
    dispatch(setSelectedMarket(null))
  }

  const handleMapLoad = (zoom: number, center: [number, number]) => {
    // Sync Redux state with actual map state when map loads
    dispatch(setZoom(zoom))
    dispatch(setCenter({ lng: center[0], lat: center[1] }))
  }

  if (marketsLoading || vendorsLoading) {
    return (
      <div className='h-screen flex items-center justify-center bg-neutral-800'>
        <div className='text-white text-xl'>Loading research data...</div>
      </div>
    )
  }

  return (
    <div className='fixed inset-0 top-16 bg-neutral-800 overflow-hidden'>
      {/* Full-screen Map */}
      <div className='absolute inset-0'>
        <Map
          markets={markets || []}
          vendors={vendors || []}
          selectedMarket={selectedMarket}
          selectedVendor={selectedVendor}
          viewMode={viewMode}
          onMarketSelect={handleMarketSelect}
          onVendorSelect={handleVendorSelect}
          onMapLoad={handleMapLoad}
          interactive={true}
        />

        {/* Floating Search Header - Top Left of Map */}
        <SearchHeader
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          isSidebarOpen={isSidebarOpen}
          selectedMarket={selectedMarket}
        />
      </div>

      {/* Floating Sidebar - Left */}
      <MapSidebar
        isOpen={isSidebarOpen}
        viewMode={viewMode}
        markets={markets || []}
        vendors={vendors || []}
        selectedMarket={selectedMarket}
        selectedVendor={selectedVendor}
        onMarketSelect={handleMarketSelect}
        onVendorSelect={handleVendorSelect}
        onToggle={handleToggleSidebar}
        searchQuery={searchQuery}
        isDetailView={isDetailView}
        onBackToList={handleBackToList}
      />

      {/* Floating Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Optional: Status Bar - Bottom */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 text-white px-4 py-2 rounded-full text-sm hidden md:block'>
        Taiwan Night Markets Research • {markets?.length || 0} Markets •{' '}
        {vendors?.length || 0} Vendors
      </div>
    </div>
  )
}
