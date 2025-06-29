'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchMarkets, setSelectedMarket } from '@/store/slices/marketsSlice'
import { setActivePanel, setViewMode } from '@/store/slices/uiSlice'
import { fetchVendors, setSelectedVendor } from '@/store/slices/vendorsSlice'
import { Market, Vendor } from '@/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect } from 'react'

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/maps/Map'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-full bg-neutral-800 flex items-center justify-center'>
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

  const markets = marketsState.markets
  const marketsLoading = marketsState.loading
  const selectedMarket = marketsState.selectedMarket

  const vendors = vendorsState.vendors
  const vendorsLoading = vendorsState.loading
  const selectedVendor = vendorsState.selectedVendor

  const viewMode = uiState.viewMode
  const activePanel = uiState.activePanel

  // Load data on mount
  useEffect(() => {
    dispatch(fetchMarkets())
    dispatch(fetchVendors())
  }, [dispatch])

  const handleMarketSelect = (market: Market | null) => {
    dispatch(setSelectedMarket(market))
  }

  const handleVendorSelect = (vendor: Vendor | null) => {
    dispatch(setSelectedVendor(vendor))
  }

  const handleViewModeChange = (mode: 'markets' | 'vendors' | 'research') => {
    dispatch(setViewMode(mode))
  }

  const handlePanelToggle = (panel: ResearchPanel | null) => {
    dispatch(setActivePanel(activePanel?.id === panel?.id ? null : panel))
  }

  // Filter markets based on research focus if needed
  const filteredMarkets = markets || []

  if (marketsLoading || vendorsLoading) {
    return (
      <div className='h-screen flex items-center justify-center bg-secondary'>
        <div className='text-white text-xl'>Loading research data...</div>
      </div>
    )
  }

  return (
    <div className='h-screen flex flex-col overflow-hidden bg-secondary'>
      {/* Header */}
      <header className='bg-secondary-light border-b border-neutral-700 px-6 py-4 flex-shrink-0'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-white'>
              Taiwan Night Markets{' '}
              <span className='text-primary'>Research Explorer</span>
            </h1>
            <p className='text-sm text-neutral-400'>
              Interactive analysis of cultural identity and digital heritage
              preservation
            </p>
          </div>

          <div className='flex items-center space-x-4'>
            {/* View Mode Toggle */}
            <div className='flex bg-neutral-800 rounded-lg p-1'>
              {[
                { mode: 'markets' as const, label: 'Markets', icon: '🏪' },
                { mode: 'vendors' as const, label: 'Vendors', icon: '👨‍🍳' },
                { mode: 'research' as const, label: 'Research', icon: '📚' },
              ].map(({ mode, label, icon }) => (
                <button
                  key={mode}
                  onClick={() => handleViewModeChange(mode)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? 'bg-primary text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* Market Count */}
            <div className='text-sm text-neutral-400'>
              {filteredMarkets.length} Markets • {vendors?.length || 0} Vendors
            </div>
          </div>
        </div>
      </header>

      <div className='flex-1 flex overflow-hidden'>
        {/* Map Area */}
        <div className='flex-1 relative bg-neutral-800'>
          <Map
            markets={filteredMarkets}
            vendors={vendors || []}
            selectedMarket={selectedMarket}
            selectedVendor={selectedVendor}
            viewMode={viewMode}
            onMarketSelect={handleMarketSelect}
            onVendorSelect={handleVendorSelect}
            interactive={true}
          />
        </div>

        {/* Dynamic Side Panel */}
        <div className='w-96 bg-secondary-light border-l border-neutral-700 overflow-y-auto flex-shrink-0'>
          {viewMode === 'research' ? (
            /* Research Panel */
            <div className='p-6'>
              <h2 className='text-xl font-bold text-white mb-6'>
                Research Framework
              </h2>
              <div className='space-y-4'>
                {researchPanels.map(panel => (
                  <button
                    key={panel.id}
                    onClick={() => handlePanelToggle(panel)}
                    className='w-full text-left bg-neutral-800 hover:bg-neutral-700 rounded-lg p-4 transition-colors'
                  >
                    <h3 className='font-semibold text-white mb-2'>
                      {panel.title}
                    </h3>
                    <div
                      className={`text-neutral-400 text-sm transition-all duration-300 ${
                        activePanel?.id === panel.id
                          ? 'max-h-96 opacity-100'
                          : 'max-h-16 opacity-75'
                      } overflow-hidden`}
                    >
                      {panel.content}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : selectedMarket ? (
            /* Market Detail Panel */
            <div className='p-6'>
              <div className='relative h-48 rounded-lg overflow-hidden mb-4'>
                <Image
                  src={selectedMarket.image}
                  alt={selectedMarket.name}
                  fill
                  className='object-cover'
                  sizes='384px'
                />
                <div className='absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded text-sm'>
                  Est. {selectedMarket.established}
                </div>
              </div>

              <h2 className='text-xl font-bold text-white mb-1'>
                {selectedMarket.name}
              </h2>
              <p className='text-neutral-400 text-sm mb-2'>
                {selectedMarket.chineseName} • {selectedMarket.location}
              </p>
              <div className='inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4'>
                {selectedMarket.researchFocus}
              </div>

              <p className='text-neutral-300 text-sm mb-4 leading-relaxed'>
                {selectedMarket.description}
              </p>

              <div className='bg-neutral-800 rounded-lg p-4 mb-4'>
                <h4 className='text-accent font-semibold mb-2 text-sm'>
                  Analytical Framework
                </h4>
                <p className='text-neutral-400 text-sm leading-relaxed'>
                  {selectedMarket.analyticalNote}
                </p>
              </div>

              <div className='mb-6'>
                <h4 className='text-white font-semibold mb-3 text-sm'>
                  Key Research Findings
                </h4>
                <ul className='space-y-2'>
                  {selectedMarket.keyFindings.map(
                    (finding: string, index: number) => (
                      <li
                        key={index}
                        className='flex items-start space-x-2 text-sm'
                      >
                        <span className='text-primary mt-1'>📷</span>
                        <span className='text-neutral-400'>{finding}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Vendor List */}
              <div>
                <h4 className='text-white font-semibold mb-3 text-sm'>
                  Documented Vendors (
                  {vendors?.filter((v: Vendor) =>
                    v.markets?.some(
                      (m: any) => m.market?.id === selectedMarket.id
                    )
                  ).length || 0}
                  )
                </h4>
                <div className='space-y-2'>
                  {vendors
                    ?.filter((vendor: Vendor) =>
                      vendor.markets?.some(
                        (m: any) => m.market?.id === selectedMarket.id
                      )
                    )
                    .map((vendor: Vendor) => (
                      <button
                        key={vendor.id}
                        onClick={() => {
                          handleVendorSelect(vendor)
                          handleViewModeChange('vendors')
                        }}
                        className='w-full text-left bg-neutral-800 hover:bg-neutral-700 rounded-lg p-3 transition-colors'
                      >
                        <div className='font-medium text-white text-sm'>
                          {vendor.name}
                        </div>
                        <div className='text-neutral-400 text-xs'>
                          {vendor.specialties.join(', ')}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          ) : selectedVendor ? (
            /* Vendor Detail Panel */
            <div className='p-6'>
              <div className='relative h-48 rounded-lg overflow-hidden mb-4'>
                {selectedVendor.images && selectedVendor.images.length > 0 ? (
                  <Image
                    src={selectedVendor.images[0]}
                    alt={selectedVendor.name}
                    fill
                    className='object-cover'
                    sizes='384px'
                  />
                ) : (
                  <div className='w-full h-full bg-neutral-700 flex items-center justify-center'>
                    <span className='text-4xl'>🍜</span>
                  </div>
                )}
              </div>

              <h2 className='text-xl font-bold text-white mb-2'>
                {selectedVendor.name}
              </h2>
              <p className='text-neutral-400 text-sm mb-2'>
                {selectedVendor.chineseName}
              </p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {selectedVendor.specialties.map(
                  (specialty: string, index: number) => (
                    <span
                      key={index}
                      className='bg-primary/20 text-primary px-2 py-1 rounded-full text-xs'
                    >
                      {specialty}
                    </span>
                  )
                )}
              </div>

              <p className='text-neutral-300 text-sm mb-4 leading-relaxed'>
                {selectedVendor.description}
              </p>

              {selectedVendor.culturalSignificance && (
                <div className='bg-neutral-800 rounded-lg p-4 mb-4'>
                  <h4 className='text-accent font-semibold mb-2'>
                    Cultural Significance
                  </h4>
                  <p className='text-neutral-400 text-sm leading-relaxed'>
                    {selectedVendor.culturalSignificance}
                  </p>
                </div>
              )}

              {selectedVendor.researchNotes && (
                <div className='bg-neutral-800 rounded-lg p-4 mb-4'>
                  <h4 className='text-accent font-semibold mb-2'>
                    Research Notes
                  </h4>
                  <p className='text-neutral-400 text-sm leading-relaxed'>
                    {selectedVendor.researchNotes}
                  </p>
                </div>
              )}

              {selectedVendor.operatingHours && (
                <div className='text-sm text-neutral-400 mb-4'>
                  <strong>Hours:</strong> {selectedVendor.operatingHours}
                </div>
              )}

              <button
                onClick={() => handleVendorSelect(null)}
                className='mt-4 w-full bg-secondary hover:bg-neutral-700 text-white py-2 px-4 rounded-lg transition-colors'
              >
                Back to Market View
              </button>
            </div>
          ) : (
            /* Default Panel */
            <div className='p-6'>
              <h2 className='text-xl font-bold text-white mb-4'>
                {viewMode === 'markets'
                  ? 'Select a Market'
                  : 'Select a Market First'}
              </h2>
              <p className='text-neutral-400 text-sm mb-6'>
                Click on a market marker to explore detailed research findings
                and cultural analysis.
              </p>

              <div className='space-y-3'>
                {filteredMarkets.map((market: Market) => (
                  <button
                    key={market.id}
                    onClick={() => handleMarketSelect(market)}
                    className='w-full text-left bg-neutral-800 hover:bg-neutral-700 rounded-lg p-4 transition-colors'
                  >
                    <h3 className='font-semibold text-white text-sm'>
                      {market.name}
                    </h3>
                    <p className='text-primary text-xs mb-1'>
                      {market.researchFocus}
                    </p>
                    <p className='text-neutral-400 text-xs line-clamp-2'>
                      {market.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
