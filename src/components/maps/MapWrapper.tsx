'use client'

import dynamic from 'next/dynamic'

// Dynamic import wrapper for Map component - prevents server-side rendering conflicts with Mapbox GL
const Map = dynamic(() => import('@/components/maps/Map'), {
  ssr: false,
  loading: () => (
    <div className='flex h-[calc(100vh-4rem)] items-center justify-center'>
      <div className='text-lg'>Loading map...</div>
    </div>
  ),
})

export default function MapWrapper() {
  return (
    <div className='h-[calc(100vh-4rem)]'>
      <Map />
    </div>
  )
}
