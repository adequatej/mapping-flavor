'use client'

import { Market, Vendor } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface MapSidebarProps {
  isOpen: boolean
  viewMode: 'markets' | 'vendors' | 'research'
  markets: Market[]
  vendors: Vendor[]
  selectedMarket: Market | null
  selectedVendor: Vendor | null
  onMarketSelect: (market: Market) => void
  onVendorSelect: (vendor: Vendor) => void
  onToggle: () => void
  searchQuery: string
  isDetailView: boolean
  onBackToList: () => void
}

// Compact Market Card for collapsed state
function CompactMarketCard({
  market,
  isSelected,
  onClick,
}: {
  market: Market
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`w-full p-2 cursor-pointer border-l-4 transition-all duration-200 ${
        isSelected
          ? 'border-l-primary bg-primary/5'
          : 'border-l-transparent hover:border-l-neutral-300 hover:bg-neutral-50'
      }`}
    >
      <div className='flex flex-col items-center space-y-1'>
        <div className='relative w-10 h-10 rounded overflow-hidden flex-shrink-0'>
          <Image
            src={market.image}
            alt={market.name}
            fill
            className='object-cover'
            sizes='40px'
          />
        </div>
        <div className='text-center'>
          <h3 className='font-medium text-neutral-800 text-xs truncate w-12'>
            {market.name.split(' ')[0]}
          </h3>
          <div className='w-2 h-2 bg-primary rounded-full mx-auto mt-1'></div>
        </div>
      </div>
    </div>
  )
}

// Expanded Market Card for open state
function ExpandedMarketCard({
  market,
  isSelected,
  onClick,
  onDetailsClick,
}: {
  market: Market
  isSelected: boolean
  onClick: () => void
  onDetailsClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
        isSelected
          ? 'border-primary shadow-lg'
          : 'border-transparent hover:border-neutral-200'
      }`}
    >
      <div className='relative h-32 rounded-t-lg overflow-hidden'>
        <Image
          src={market.image}
          alt={market.name}
          fill
          className='object-cover'
          sizes='320px'
        />
        <div className='absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs'>
          Est. {market.established}
        </div>
      </div>
      <div className='p-4'>
        <h3 className='font-semibold text-neutral-800 mb-1'>{market.name}</h3>
        <p className='text-neutral-600 text-sm mb-2'>{market.chineseName}</p>
        <div className='inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium mb-2'>
          {market.researchFocus}
        </div>
        <p className='text-neutral-600 text-sm line-clamp-2 mb-2'>
          {market.description}
        </p>
        <div className='flex items-center justify-between'>
          <span className='text-neutral-500 text-xs'>{market.location}</span>
          <button
            onClick={e => {
              e.stopPropagation()
              onDetailsClick?.()
            }}
            className='text-primary text-sm font-medium hover:underline'
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  )
}

// Compact Vendor Card for collapsed state
function CompactVendorCard({
  vendor,
  isSelected,
  onClick,
}: {
  vendor: Vendor
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`w-full p-2 cursor-pointer border-l-4 transition-all duration-200 ${
        isSelected
          ? 'border-l-orange-500 bg-orange-50'
          : 'border-l-transparent hover:border-l-neutral-300 hover:bg-neutral-50'
      }`}
    >
      <div className='flex flex-col items-center space-y-1'>
        <div className='relative w-10 h-10 rounded overflow-hidden flex-shrink-0'>
          {vendor.images && vendor.images.length > 0 ? (
            <Image
              src={vendor.images[0]}
              alt={vendor.name}
              fill
              className='object-cover'
              sizes='40px'
            />
          ) : (
            <div className='w-full h-full bg-neutral-200 flex items-center justify-center'>
              <span className='text-lg'>🍜</span>
            </div>
          )}
        </div>
        <div className='text-center'>
          <h3 className='font-medium text-neutral-800 text-xs truncate w-12'>
            {vendor.name.split(' ')[0]}
          </h3>
          <div className='w-2 h-2 bg-orange-500 rounded-full mx-auto mt-1'></div>
        </div>
      </div>
    </div>
  )
}

// Expanded Vendor Card for open state
function ExpandedVendorCard({
  vendor,
  isSelected,
  onClick,
  onDetailsClick,
}: {
  vendor: Vendor
  isSelected: boolean
  onClick: () => void
  onDetailsClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
        isSelected
          ? 'border-orange-500 shadow-lg'
          : 'border-transparent hover:border-neutral-200'
      }`}
    >
      <div className='relative h-24 rounded-t-lg overflow-hidden'>
        {vendor.images && vendor.images.length > 0 ? (
          <Image
            src={vendor.images[0]}
            alt={vendor.name}
            fill
            className='object-cover'
            sizes='320px'
          />
        ) : (
          <div className='w-full h-full bg-neutral-200 flex items-center justify-center'>
            <span className='text-2xl'>🍜</span>
          </div>
        )}
      </div>
      <div className='p-3'>
        <h3 className='font-semibold text-neutral-800 mb-1 text-sm'>
          {vendor.name}
        </h3>
        <p className='text-neutral-600 text-xs mb-2'>
          {vendor.chineseName || ''}
        </p>
        <div className='flex flex-wrap gap-1 mb-2'>
          {vendor.specialties.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className='bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs'
            >
              {specialty}
            </span>
          ))}
          {vendor.specialties.length > 2 && (
            <span className='text-neutral-500 text-xs'>
              +{vendor.specialties.length - 2} more
            </span>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-neutral-500 text-xs'>
            {vendor.operatingHours || 'Hours vary'}
          </span>
          <button
            onClick={e => {
              e.stopPropagation()
              onDetailsClick?.()
            }}
            className='text-orange-600 text-sm font-medium hover:underline'
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  )
}

// Detailed Market View Component
function DetailedMarketView({
  market,
  onBackToList,
}: {
  market: Market
  onBackToList: () => void
}) {
  const router = useRouter()

  const handleViewFullDetails = () => {
    router.push(`/markets/${market.id}`)
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header with back button */}
      <div className='flex-shrink-0 border-b border-neutral-200 bg-white p-4'>
        <div className='flex items-center space-x-3 mb-3'>
          <button
            type='button'
            onClick={onBackToList}
            className='p-2 hover:bg-neutral-100 rounded-full transition-colors'
          >
            <svg
              className='w-5 h-5 text-neutral-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <div>
            <h2 className='font-semibold text-neutral-800'>{market.name}</h2>
            <p className='text-neutral-500 text-sm'>{market.chineseName}</p>
          </div>
        </div>

        {/* View Full Details Button */}
        <button
          type='button'
          onClick={handleViewFullDetails}
          className='w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
          <span>View Full Details</span>
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4 space-y-6'>
        {/* Hero Image */}
        <div className='relative h-48 rounded-lg overflow-hidden'>
          <Image
            src={market.image}
            alt={market.name}
            fill
            className='object-cover'
            sizes='320px'
          />
          <div className='absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm'>
            Est. {market.established}
          </div>
        </div>

        {/* Basic Info */}
        <div className='space-y-3'>
          <div className='inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium'>
            {market.researchFocus}
          </div>

          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>Location</h3>
            <p className='text-neutral-600 text-sm'>{market.location}</p>
          </div>

          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>About</h3>
            <p className='text-neutral-600 text-sm leading-relaxed'>
              {market.description}
            </p>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>Hours</h3>
            <div className='bg-neutral-50 rounded-lg p-3'>
              <p className='text-neutral-600 text-sm'>
                🕐 Daily: 5:00 PM - 12:00 AM
              </p>
              <p className='text-neutral-500 text-xs mt-1'>
                Peak hours: 7:00 PM - 10:00 PM
              </p>
            </div>
          </div>

          {/* Research Notes */}
          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>
              Research Notes
            </h3>
            <div className='bg-blue-50 rounded-lg p-3'>
              <p className='text-blue-800 text-sm'>
                📝 Cultural significance: This market represents traditional
                Taiwanese night market culture with strong community ties.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>Quick Stats</h3>
            <div className='grid grid-cols-2 gap-3'>
              <div className='bg-neutral-50 rounded-lg p-3 text-center'>
                <div className='text-lg font-semibold text-neutral-800'>
                  50+
                </div>
                <div className='text-xs text-neutral-500'>Vendors</div>
              </div>
              <div className='bg-neutral-50 rounded-lg p-3 text-center'>
                <div className='text-lg font-semibold text-neutral-800'>
                  Local
                </div>
                <div className='text-xs text-neutral-500'>Favorite</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Detailed Vendor View Component
function DetailedVendorView({
  vendor,
  onBackToList,
}: {
  vendor: Vendor
  onBackToList: () => void
}) {
  const router = useRouter()

  const handleViewFullDetails = () => {
    router.push(`/vendors/${vendor.id}`)
  }

  // Get food emoji based on specialty
  const getFoodEmoji = (specialties: string[]) => {
    const specialty = specialties[0]?.toLowerCase() || ''
    if (specialty.includes('noodle') || specialty.includes('soup')) return '🍜'
    if (specialty.includes('dumpling') || specialty.includes('bao')) return '🥟'
    if (
      specialty.includes('meat') ||
      specialty.includes('beef') ||
      specialty.includes('pork')
    )
      return '🍖'
    if (specialty.includes('seafood') || specialty.includes('fish')) return '🐟'
    if (specialty.includes('dessert') || specialty.includes('sweet'))
      return '🧁'
    if (
      specialty.includes('drink') ||
      specialty.includes('tea') ||
      specialty.includes('juice')
    )
      return '🧋'
    if (specialty.includes('vegetable') || specialty.includes('tofu'))
      return '🥬'
    if (specialty.includes('rice') || specialty.includes('fried')) return '🍚'
    return '🍽️' // Default food icon
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header with back button */}
      <div className='flex-shrink-0 border-b border-neutral-200 bg-white p-4'>
        <div className='flex items-center space-x-3 mb-3'>
          <button
            type='button'
            onClick={onBackToList}
            className='p-2 hover:bg-neutral-100 rounded-full transition-colors'
          >
            <svg
              className='w-5 h-5 text-neutral-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <div className='flex items-center space-x-2'>
            <span className='text-2xl'>{getFoodEmoji(vendor.specialties)}</span>
            <div>
              <h2 className='font-semibold text-neutral-800'>{vendor.name}</h2>
              <p className='text-neutral-500 text-sm'>{vendor.chineseName}</p>
            </div>
          </div>
        </div>

        {/* View Full Details Button */}
        <button
          type='button'
          onClick={handleViewFullDetails}
          className='w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
          <span>View Full Details</span>
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4 space-y-6'>
        {/* Hero Image */}
        {vendor.images && vendor.images.length > 0 && (
          <div className='relative h-48 rounded-lg overflow-hidden'>
            <Image
              src={vendor.images[0]}
              alt={vendor.name}
              fill
              className='object-cover'
              sizes='320px'
            />
            <div className='absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1'>
              <span>{getFoodEmoji(vendor.specialties)}</span>
              <span>Food Heritage</span>
            </div>
          </div>
        )}

        {/* Specialties */}
        <div>
          <h3 className='font-semibold text-neutral-800 mb-3'>Specialties</h3>
          <div className='flex flex-wrap gap-2'>
            {vendor.specialties.map((specialty, index) => (
              <span
                key={index}
                className='bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium'
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        {vendor.operatingHours && (
          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>
              Operating Hours
            </h3>
            <div className='bg-neutral-50 rounded-lg p-3'>
              <p className='text-neutral-600 text-sm flex items-center space-x-2'>
                <span>🕐</span>
                <span>{vendor.operatingHours}</span>
              </p>
            </div>
          </div>
        )}

        {/* Description */}
        {vendor.description && (
          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>About</h3>
            <p className='text-neutral-600 text-sm leading-relaxed'>
              {vendor.description}
            </p>
          </div>
        )}

        {/* Cultural Heritage Notes */}
        <div>
          <h3 className='font-semibold text-neutral-800 mb-2'>
            Cultural Heritage
          </h3>
          <div className='bg-amber-50 rounded-lg p-3'>
            <p className='text-amber-800 text-sm'>
              🏮 Traditional preparation methods passed down through
              generations, representing authentic Taiwanese street food culture.
            </p>
          </div>
        </div>

        {/* Market Locations */}
        {vendor.markets && vendor.markets.length > 0 && (
          <div>
            <h3 className='font-semibold text-neutral-800 mb-2'>Found At</h3>
            <div className='space-y-2'>
              {vendor.markets
                .slice(0, 3)
                .map((marketVendor: any, index: number) => (
                  <div
                    key={index}
                    className='bg-neutral-50 rounded-lg p-3 flex items-center space-x-3'
                  >
                    <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center'>
                      <span className='text-primary text-sm'>🏮</span>
                    </div>
                    <div>
                      <p className='font-medium text-neutral-800 text-sm'>
                        {marketVendor.market?.name || 'Market'}
                      </p>
                      <p className='text-neutral-500 text-xs'>
                        {marketVendor.market?.location || 'Location'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Research Notes */}
        <div>
          <h3 className='font-semibold text-neutral-800 mb-2'>
            Research Notes
          </h3>
          <div className='bg-blue-50 rounded-lg p-3'>
            <p className='text-blue-800 text-sm'>
              📝 Cultural analysis: This vendor represents traditional food
              preparation techniques and community gathering patterns typical of
              Taiwan's night market culture.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h3 className='font-semibold text-neutral-800 mb-2'>Quick Stats</h3>
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-neutral-50 rounded-lg p-3 text-center'>
              <div className='text-lg font-semibold text-neutral-800'>
                {vendor.specialties.length}
              </div>
              <div className='text-xs text-neutral-500'>Specialties</div>
            </div>
            <div className='bg-neutral-50 rounded-lg p-3 text-center'>
              <div className='text-lg font-semibold text-neutral-800'>
                Traditional
              </div>
              <div className='text-xs text-neutral-500'>Heritage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MapSidebar({
  isOpen,
  viewMode,
  markets,
  vendors,
  selectedMarket,
  selectedVendor,
  onMarketSelect,
  onVendorSelect,
  onToggle,
  searchQuery,
  isDetailView,
  onBackToList,
}: MapSidebarProps) {
  // Filter markets and vendors based on search query
  const filteredMarkets = markets.filter(
    market =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.chineseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredVendors = vendors.filter(
    vendor =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.chineseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.specialties.some(specialty =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  // Get vendors for selected market when in vendor mode
  const marketVendors =
    viewMode === 'vendors' && selectedMarket
      ? vendors.filter(vendor =>
          vendor.markets?.some((m: any) => m.market?.id === selectedMarket.id)
        )
      : []

  // Show detail view if enabled
  if (isDetailView) {
    if (selectedMarket && viewMode === 'markets') {
      return (
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-2xl transition-all duration-300 ease-in-out z-30 ${
            isOpen ? 'w-96' : 'w-0'
          } overflow-hidden`}
        >
          <DetailedMarketView
            market={selectedMarket}
            onBackToList={onBackToList}
          />
        </div>
      )
    }

    if (selectedVendor && viewMode === 'vendors') {
      return (
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-2xl transition-all duration-300 ease-in-out z-30 ${
            isOpen ? 'w-96' : 'w-0'
          } overflow-hidden`}
        >
          <DetailedVendorView
            vendor={selectedVendor}
            onBackToList={onBackToList}
          />
        </div>
      )
    }
  }

  const handleMarketDetailsClick = (market: Market) => {
    onMarketSelect(market)
  }

  const handleVendorDetailsClick = (vendor: Vendor) => {
    onVendorSelect(vendor)
  }

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-2xl transition-all duration-300 ease-in-out z-30 ${
        isOpen ? 'w-96' : 'w-16'
      }`}
    >
      {/* Content based on view mode */}
      {viewMode === 'markets' && (
        <div className='h-full flex flex-col'>
          {/* Header */}
          <div className='flex-shrink-0 border-b border-neutral-200 bg-white p-4'>
            <div className='flex items-center justify-between'>
              <h2
                className={`font-semibold text-neutral-800 transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Cultural Sites ({filteredMarkets.length})
              </h2>
            </div>
          </div>

          {/* Markets List */}
          <div className='flex-1 overflow-y-auto'>
            {isOpen ? (
              <div className='p-4 space-y-4'>
                {filteredMarkets.map(market => (
                  <ExpandedMarketCard
                    key={market.id}
                    market={market}
                    isSelected={selectedMarket?.id === market.id}
                    onClick={() => onMarketSelect(market)}
                    onDetailsClick={() => handleMarketDetailsClick(market)}
                  />
                ))}
              </div>
            ) : (
              <div className='p-2 space-y-2'>
                {filteredMarkets.slice(0, 8).map(market => (
                  <CompactMarketCard
                    key={market.id}
                    market={market}
                    isSelected={selectedMarket?.id === market.id}
                    onClick={() => onMarketSelect(market)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'vendors' && (
        <div className='h-full flex flex-col'>
          {/* Header */}
          <div className='flex-shrink-0 border-b border-neutral-200 bg-white p-4'>
            <div className='flex items-center justify-between'>
              <h2
                className={`font-semibold text-neutral-800 transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {selectedMarket
                  ? `${selectedMarket.name} Vendors (${marketVendors.length})`
                  : `Food Heritage (${filteredVendors.length})`}
              </h2>
            </div>
            {selectedMarket && isOpen && (
              <p className='text-neutral-500 text-sm mt-1'>
                {selectedMarket.chineseName}
              </p>
            )}
          </div>

          {/* Vendors List */}
          <div className='flex-1 overflow-y-auto'>
            {isOpen ? (
              <div className='p-4 space-y-4'>
                {(selectedMarket ? marketVendors : filteredVendors).map(
                  vendor => (
                    <ExpandedVendorCard
                      key={vendor.id}
                      vendor={vendor}
                      isSelected={selectedVendor?.id === vendor.id}
                      onClick={() => onVendorSelect(vendor)}
                      onDetailsClick={() => handleVendorDetailsClick(vendor)}
                    />
                  )
                )}
              </div>
            ) : (
              <div className='p-2 space-y-2'>
                {(selectedMarket ? marketVendors : filteredVendors)
                  .slice(0, 8)
                  .map(vendor => (
                    <CompactVendorCard
                      key={vendor.id}
                      vendor={vendor}
                      isSelected={selectedVendor?.id === vendor.id}
                      onClick={() => onVendorSelect(vendor)}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'research' && (
        <div className='h-full flex flex-col'>
          {/* Header */}
          <div className='flex-shrink-0 border-b border-neutral-200 bg-white p-4'>
            <div className='flex items-center justify-between'>
              <h2
                className={`font-semibold text-neutral-800 transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Research Framework
              </h2>
            </div>
          </div>

          {/* Research Content */}
          <div className='flex-1 overflow-y-auto'>
            {isOpen ? (
              <div className='p-4 space-y-6'>
                <div className='bg-blue-50 rounded-lg p-4'>
                  <h3 className='font-semibold text-blue-800 mb-2'>
                    Methodology
                  </h3>
                  <p className='text-blue-700 text-sm leading-relaxed'>
                    Following Wu & Lin (2013) and Chen & Huang (2014), this
                    research analyzes vendor behaviors and cultural performances
                    from a supply-side perspective.
                  </p>
                </div>

                <div className='bg-amber-50 rounded-lg p-4'>
                  <h3 className='font-semibold text-amber-800 mb-2'>
                    Digital Heritage
                  </h3>
                  <p className='text-amber-700 text-sm leading-relaxed'>
                    Using Barbash et al. (2024) framework for participatory
                    digital documentation to preserve underrepresented cultural
                    practices.
                  </p>
                </div>

                <div className='bg-green-50 rounded-lg p-4'>
                  <h3 className='font-semibold text-green-800 mb-2'>
                    Key Findings
                  </h3>
                  <p className='text-green-700 text-sm leading-relaxed'>
                    Night markets serve as sites where cultural identity is both
                    performed and commodified for different audiences.
                  </p>
                </div>

                <div className='bg-purple-50 rounded-lg p-4'>
                  <h3 className='font-semibold text-purple-800 mb-2'>
                    Theoretical Framework
                  </h3>
                  <p className='text-purple-700 text-sm leading-relaxed'>
                    Applying Giaccardi's participatory heritage model to
                    understand how night markets balance commercial appeal with
                    cultural authenticity.
                  </p>
                </div>
              </div>
            ) : (
              <div className='p-2 space-y-2'>
                <div className='w-12 h-12 bg-blue-100 rounded flex items-center justify-center'>
                  <span className='text-blue-600'>📊</span>
                </div>
                <div className='w-12 h-12 bg-amber-100 rounded flex items-center justify-center'>
                  <span className='text-amber-600'>💾</span>
                </div>
                <div className='w-12 h-12 bg-green-100 rounded flex items-center justify-center'>
                  <span className='text-green-600'>🔍</span>
                </div>
                <div className='w-12 h-12 bg-purple-100 rounded flex items-center justify-center'>
                  <span className='text-purple-600'>🧠</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
