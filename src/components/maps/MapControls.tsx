'use client'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleSidebar,
  isSidebarOpen,
}: MapControlsProps) {
  return (
    <>
      {/* Main Map Controls - Bottom Right */}
      <div className='absolute bottom-6 right-6 z-30 flex flex-col gap-2'>
        {/* Zoom Controls */}
        <div className='bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden'>
          <button
            type='button'
            onClick={e => {
              e.preventDefault()
              onZoomIn()
            }}
            className='block w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors border-b border-neutral-200 text-neutral-700'
            aria-label='Zoom in'
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
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={e => {
              e.preventDefault()
              onZoomOut()
            }}
            className='block w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-700'
            aria-label='Zoom out'
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
                d='M18 12H6'
              />
            </svg>
          </button>
        </div>

        {/* Reset/Home Button */}
        <button
          type='button'
          onClick={e => {
            e.preventDefault()
            onReset()
          }}
          className='w-10 h-10 bg-white rounded-lg shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-700'
          aria-label='Reset view'
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
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
          </svg>
        </button>
      </div>

      {/* Prominent Sidebar Toggle - Bottom Left */}
      <button
        type='button'
        onClick={e => {
          e.preventDefault()
          onToggleSidebar()
        }}
        className={`absolute bottom-6 left-6 z-30 w-14 h-14 rounded-full shadow-xl border-2 flex items-center justify-center transition-all duration-300 ${
          isSidebarOpen
            ? 'bg-red-500 border-red-600 text-white hover:bg-red-600'
            : 'bg-neutral-700 border-neutral-800 text-white hover:bg-neutral-800'
        }`}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isSidebarOpen ? (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2.5}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2.5}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>
    </>
  )
}
