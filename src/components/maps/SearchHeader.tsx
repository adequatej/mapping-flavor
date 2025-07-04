'use client'

import { useState } from 'react'

// Search functionality for filtering markets and vendors
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    />
  </svg>
)

interface SearchHeaderProps {
  viewMode: 'markets' | 'vendors' | 'research'
  onViewModeChange: (mode: 'markets' | 'vendors' | 'research') => void
  onSearch: (query: string) => void
  searchQuery: string
  isSidebarOpen: boolean
  selectedMarket: any | null
  onMarketFilter?: (marketId: string | null) => void
}

const filterOptions = [
  { mode: 'markets' as const, label: 'Markets', icon: '🏮' },
]

// Food heritage option that only shows when a market is selected
const foodHeritageOption = {
  mode: 'vendors' as const,
  label: 'Vendors',
  icon: '🥢',
}

// Additional research categories for collapsed sidebar view
const researchCategories = [
  { id: 'traditional', label: 'Traditional', icon: '🏛️' },
  { id: 'documented', label: 'Documented', icon: '📸' },
  { id: 'ethnographic', label: 'Ethnographic', icon: '🔍' },
  { id: 'historical', label: 'Historical', icon: '📜' },
  { id: 'contemporary', label: 'Contemporary', icon: '🌟' },
]

export default function SearchHeader({
  viewMode,
  onViewModeChange,
  onSearch,
  searchQuery,
  isSidebarOpen,
  selectedMarket,
  onMarketFilter,
}: SearchHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const getPositioning = () => {
    // Mobile: Always use responsive positioning
    // Desktop: Adjust based on sidebar state
    if (isSidebarOpen) {
      return 'left-4 md:left-[400px] right-4 md:right-auto z-50'
    }
    return 'left-4 md:left-24 right-4 md:right-auto z-50'
  }

  const getPlaceholder = () => {
    if (selectedMarket) {
      return `Viewing ${selectedMarket.name} - Search markets and vendors...`
    }
    return 'Search markets and vendors...'
  }

  return (
    <div
      className={`absolute top-4 flex flex-col md:flex-row gap-3 transition-all duration-300 ${getPositioning()}`}
    >
      {/* Search Bar */}
      <div className='relative w-full md:w-80'>
        <div
          className={`bg-white rounded-lg shadow-lg border transition-all duration-200 w-full ${
            isSearchFocused
              ? 'border-primary shadow-xl'
              : 'border-neutral-200 hover:shadow-xl'
          }`}
        >
          <div className='flex items-center px-4 py-3'>
            <SearchIcon className='w-5 h-5 text-neutral-400 mr-3' />
            <input
              type='text'
              placeholder={getPlaceholder()}
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className='flex-1 text-neutral-800 placeholder-neutral-400 bg-transparent outline-none text-sm'
            />
          </div>

          {/* Mock Suggestions Dropdown (shown when focused and has query) */}
          {isSearchFocused && searchQuery && (
            <div className='border-t border-neutral-100 py-2'>
              <div className='px-4 py-2 text-xs text-neutral-500'>
                Suggestions
              </div>
              <div className='px-4 py-2 hover:bg-neutral-50 cursor-pointer text-sm text-neutral-700'>
                <SearchIcon className='w-4 h-4 inline mr-2' />
                {searchQuery} in night markets
              </div>
              <div className='px-4 py-2 hover:bg-neutral-50 cursor-pointer text-sm text-neutral-700'>
                <SearchIcon className='w-4 h-4 inline mr-2' />
                {searchQuery} vendors
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Pills */}
      <div className='flex flex-wrap gap-2 items-start'>
        {filterOptions.map(({ mode, label, icon }) => (
          <button
            key={mode}
            type='button'
            onClick={() => onViewModeChange(mode)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-lg ${
              viewMode === mode
                ? 'bg-primary text-white shadow-xl'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 hover:shadow-xl'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}

        {/* Only show Food Heritage button when a market is selected */}
        {selectedMarket && (
          <button
            type='button'
            onClick={() => onViewModeChange(foodHeritageOption.mode)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-lg ${
              viewMode === foodHeritageOption.mode
                ? 'bg-primary text-white shadow-xl'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 hover:shadow-xl'
            }`}
          >
            <span>{foodHeritageOption.icon}</span>
            <span>{foodHeritageOption.label}</span>
          </button>
        )}

        {/* Market Filter for Vendor Mode */}
        {viewMode === 'vendors' && onMarketFilter && (
          <div className='relative'>
            <select
              onChange={e => onMarketFilter(e.target.value || null)}
              value={selectedMarket?.id || ''}
              className='appearance-none bg-white text-neutral-700 px-4 py-3 rounded-lg text-sm font-medium shadow-lg border border-neutral-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-[140px]'
            >
              <option value=''>All Markets</option>
              <option value='shilin-night-market'>🍜 Shilin</option>
              <option value='raohe-street-market'>🥟 Raohe</option>
              <option value='huaxi-street-market'>🍲 Huaxi</option>
              <option value='kenting-night-market'>🦐 Kenting</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-neutral-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
