'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Map component to avoid SSR issues with Mapbox as its complicated
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
