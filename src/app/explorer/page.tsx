'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setFilterCategory,
  setSelectedMarket,
} from '@/store/slices/marketsSlice'
import { setActivePanel, setViewMode } from '@/store/slices/uiSlice'
import { setSelectedVendor } from '@/store/slices/vendorsSlice'
import { Market, Vendor } from '@/types'
import Image from 'next/image'

interface ResearchPanel {
  id: string
  title: string
  content: string
  category: 'methodology' | 'findings' | 'theory' | 'sources'
}

const markets: Market[] = [
  {
    id: 'shilin',
    name: 'Shilin Night Market',
    chineseName: '士林夜市',
    coordinates: [121.5244, 25.0881],
    location: 'Shilin District, Taipei',
    established: '1899',
    researchFocus: 'Tourism vs. Authenticity',
    description:
      'Taiwan\'s largest night market, examining how vendors create "attractiveness" for tourists through cultural commodification (Chen & Huang, 2014).',
    analyticalNote:
      'Following Chen & Huang\'s supply-side analysis, this market exemplifies how vendors create "attractiveness" for tourists through cultural commodification.',
    keyFindings: [
      'Visual documentation of dual pricing strategies',
      'Language switching patterns in vendor interactions',
      'Spatial organization reflecting tourism infrastructure',
    ],
    image: 'https://picsum.photos/800/400?random=1',
    vendors: [
      {
        id: 'v1',
        name: "Chen's Stinky Tofu",
        specialty: 'Fermented Tofu',
        cultural_significance: 'Traditional fermentation techniques',
        coordinates: [121.5244, 25.0881],
      },
      {
        id: 'v2',
        name: "Lin's Bubble Tea",
        specialty: 'Taiwanese Tea Culture',
        cultural_significance: 'Modern Taiwanese innovation',
        coordinates: [121.5245, 25.0882],
      },
    ],
  },
  {
    id: 'raohe',
    name: 'Raohe Street Night Market',
    chineseName: '饒河街觀光夜市',
    coordinates: [121.5763, 25.0508],
    location: 'Songshan District, Taipei',
    established: '1987',
    researchFocus: 'Hakka Heritage & Digital Preservation',
    description:
      "Historic market demonstrating minority culture navigation in mainstream commercial spaces, relevant to Chen's ethnic politics framework.",
    analyticalNote:
      'Critical site for understanding how digital documentation can preserve underrepresented cultural practices (Barbash et al., 2024).',
    keyFindings: [
      'Photographic documentation of Hakka cooking methods',
      'Intergenerational knowledge transfer patterns',
      'Analysis of Hakka dishes marketed to different audiences',
    ],
    image: 'https://picsum.photos/800/400?random=2',
    vendors: [
      {
        id: 'v3',
        name: "Wang's Hakka Lei Cha",
        specialty: 'Traditional Hakka Tea Rice',
        cultural_significance: 'Hakka cultural preservation',
        coordinates: [121.5763, 25.0508],
      },
      {
        id: 'v4',
        name: 'Traditional Pork Pepper Buns',
        specialty: 'Pepper Buns',
        cultural_significance: 'Cross-cultural adaptation',
        coordinates: [121.5764, 25.0509],
      },
    ],
  },
  {
    id: 'huaxi',
    name: 'Huaxi Street Night Market',
    chineseName: '華西街夜市',
    coordinates: [121.5005, 25.0377],
    location: 'Wanhua District, Taipei',
    established: '1962',
    researchFocus: 'Democratic Cultural Spaces',
    description:
      "One of Taiwan's oldest markets, demonstrating how food accessibility creates inclusive cultural participation (Wu & Lin, 2013).",
    analyticalNote:
      'Essential for analyzing how night markets function as democratic spaces challenging class-based exclusions.',
    keyFindings: [
      'Economic accessibility patterns and community formation',
      'Social interactions across demographics',
      'Traditional preparation methods in working-class context',
    ],
    image: 'https://picsum.photos/800/400?random=3',
    vendors: [
      {
        id: 'v5',
        name: 'Old Taipei Snake Soup',
        specialty: 'Traditional Medicine Food',
        cultural_significance: 'Traditional Chinese medicine practices',
        coordinates: [121.5005, 25.0377],
      },
      {
        id: 'v6',
        name: 'Family Noodle Stand',
        specialty: 'Beef Noodle Soup',
        cultural_significance: 'Post-war cultural adaptation',
        coordinates: [121.5006, 25.0378],
      },
    ],
  },
  {
    id: 'kenting',
    name: 'Kenting Night Market',
    chineseName: '墾丁夜市',
    coordinates: [120.8069, 21.9594],
    location: 'Kenting, Pingtung County',
    established: '1980s',
    researchFocus: 'Tourism & Regional Identity',
    description:
      'Beach resort night market exploring how tourism shapes regional food identity and cultural performance in vacation destinations.',
    analyticalNote:
      "Testing ground for Giaccardi's participatory heritage model, examining how tourist-oriented markets balance commercial appeal with cultural authenticity.",
    keyFindings: [
      'Visual documentation of beach town food adaptations',
      'Photographic evidence of seasonal tourism impact',
      'Analysis of regional vs. tourist-oriented cultural offerings',
    ],
    image: 'https://picsum.photos/800/400?random=4',
    vendors: [
      {
        id: 'v7',
        name: 'Pingtung Specialty Stands',
        specialty: 'Regional Southern Taiwan Cuisine',
        cultural_significance: 'Local Pingtung food traditions',
        coordinates: [120.8069, 21.9594],
      },
      {
        id: 'v8',
        name: 'Beach Resort Fusion',
        specialty: 'Tourist-Oriented Fusion Food',
        cultural_significance: 'Tourism-adapted local cuisine',
        coordinates: [120.807, 21.9595],
      },
    ],
  },
]

const researchPanels: ResearchPanel[] = [
  {
    id: 'methodology',
    title: 'Observational Methodology',
    category: 'methodology',
    content:
      'Following Wu & Lin (2013) and Chen & Huang (2014), I analyze vendor behaviors and cultural performances from a supply-side perspective.',
  },
  {
    id: 'chen-framework',
    title: "Chen's National Cuisine Politics",
    category: 'theory',
    content:
      "Yu-Jen Chen's analysis of ethnic politics in Taiwan's national cuisine framing reveals how government promotion of certain foods (Minnan/Hakka) over others (Indigenous) shapes cultural identity. Night markets both reflect and resist these official narratives.",
  },
  {
    id: 'digital-heritage',
    title: 'Digital Heritage Theory',
    category: 'theory',
    content:
      'Following Srinivasan & Luther (2016) and Giaccardi (2012), this platform demonstrates how digital tools can democratize cultural preservation while maintaining community agency in representation, moving beyond traditional top-down heritage models.',
  },
  {
    id: 'tourism-commodification',
    title: 'Tourism & Cultural Commodification',
    category: 'findings',
    content:
      'Chen & Huang\'s supply-side analysis reveals how vendors create "attractiveness" for tourists through cultural performances, raising critical questions about authenticity in globalized cultural spaces.',
  },
]

export default function Explorer() {
  const dispatch = useAppDispatch()

  const selectedMarket = useAppSelector(state => state.markets.selectedMarket)
  const selectedVendor = useAppSelector(state => state.vendors.selectedVendor)
  const activePanel = useAppSelector(state => state.ui.activePanel)
  const viewMode = useAppSelector(state => state.ui.viewMode)
  const filterCategory = useAppSelector(state => state.markets.filterCategory)
  const markets = useAppSelector(state => state.markets.markets)

  const filteredMarkets =
    filterCategory === 'all'
      ? markets
      : markets.filter(market =>
          market.researchFocus
            .toLowerCase()
            .includes(filterCategory.toLowerCase())
        )

  const handleMarketSelect = (market: Market | null) => {
    dispatch(setSelectedMarket(market))
  }

  const handleVendorSelect = (vendor: Vendor | null) => {
    dispatch(setSelectedVendor(vendor))
  }

  const handleViewModeChange = (mode: 'markets' | 'vendors' | 'research') => {
    dispatch(setViewMode(mode))
  }

  const handleFilterChange = (category: string) => {
    dispatch(setFilterCategory(category))
  }

  const handlePanelToggle = (panel: ResearchPanel | null) => {
    dispatch(setActivePanel(activePanel?.id === panel?.id ? null : panel))
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

            {/* Filter Dropdown */}
            <select
              value={filterCategory}
              onChange={e => handleFilterChange(e.target.value)}
              className='bg-neutral-800 text-white border border-neutral-600 rounded-lg px-3 py-2 text-sm'
            >
              <option value='all'>All Research Focuses</option>
              <option value='tourism'>Tourism vs. Authenticity</option>
              <option value='hakka'>Hakka Heritage</option>
              <option value='democratic'>Democratic Spaces</option>
              <option value='digital'>Digital Heritage</option>
            </select>
          </div>
        </div>
      </header>

      <div className='flex-1 flex overflow-hidden'>
        {/* Map Area */}
        <div className='flex-1 relative bg-neutral-800'>
          {/* Simulated Map */}
          <div className='w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden'>
            {/* Taiwan Island Shape (simplified) */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative w-96 h-96 bg-green-800 rounded-full transform rotate-12 opacity-30'></div>
            </div>

            {/* Market Markers */}
            {filteredMarkets.map(market => (
              <button
                key={market.id}
                onClick={() => handleMarketSelect(market)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  selectedMarket?.id === market.id
                    ? 'scale-125 z-20'
                    : 'hover:scale-110 z-10'
                }`}
                style={{
                  left: `${40 + (market.coordinates[0] - 121.5) * 1000}%`,
                  top: `${60 - (market.coordinates[1] - 25.0) * 1000}%`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white ${
                    selectedMarket?.id === market.id
                      ? 'bg-primary animate-pulse'
                      : 'bg-accent hover:bg-primary'
                  } shadow-lg`}
                ></div>
                <div className='absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap'>
                  {market.name}
                </div>
              </button>
            ))}

            {/* Vendor Markers (when market is selected) */}
            {selectedMarket &&
              viewMode === 'vendors' &&
              selectedMarket.vendors.map(vendor => (
                <button
                  key={vendor.id}
                  onClick={() => handleVendorSelect(vendor)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    selectedVendor?.id === vendor.id
                      ? 'scale-125'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${40 + (vendor.coordinates[0] - 121.5) * 1000}%`,
                    top: `${60 - (vendor.coordinates[1] - 25.0) * 1000}%`,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border border-white ${
                      selectedVendor?.id === vendor.id
                        ? 'bg-yellow-400'
                        : 'bg-orange-500 hover:bg-yellow-400'
                    } shadow-lg`}
                  ></div>
                </button>
              ))}

            {/* Map Controls */}
            <div className='absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-white text-sm'>
              <div className='flex items-center space-x-2 mb-2'>
                <div className='w-3 h-3 bg-accent rounded-full'></div>
                <span>Night Markets</span>
              </div>
              {viewMode === 'vendors' && (
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
                  <span>Vendors</span>
                </div>
              )}
            </div>
          </div>
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
                  {selectedMarket.keyFindings.map((finding, index) => (
                    <li
                      key={index}
                      className='flex items-start space-x-2 text-sm'
                    >
                      <span className='text-primary mt-1'>📷</span>
                      <span className='text-neutral-400'>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vendor List */}
              <div>
                <h4 className='text-white font-semibold mb-3 text-sm'>
                  Documented Vendors
                </h4>
                <div className='space-y-2'>
                  {selectedMarket.vendors.map(vendor => (
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
                        {vendor.specialty}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedVendor ? (
            /* Vendor Detail Panel */
            <div className='p-6'>
              <h2 className='text-xl font-bold text-white mb-2'>
                {selectedVendor.name}
              </h2>
              <p className='text-primary font-medium mb-4'>
                {selectedVendor.specialty}
              </p>

              <div className='bg-neutral-800 rounded-lg p-4'>
                <h4 className='text-accent font-semibold mb-2'>
                  Cultural Significance
                </h4>
                <p className='text-neutral-400 text-sm leading-relaxed'>
                  {selectedVendor.cultural_significance}
                </p>
              </div>

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
                {filteredMarkets.map(market => (
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
