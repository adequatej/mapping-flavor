import { useAppSelector } from '@/store/hooks'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'

// Initialize Mapbox
// will put in token later
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Taiwan bounds
const TAIWAN_BOUNDS = {
  north: 25.3,
  south: 21.9,
  west: 120.0,
  east: 122.0,
}

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  // Get map state from Redux
  const { lng, lat, zoom, bounds } = useAppSelector(state => state.map)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [
        [bounds.west, bounds.south],
        [bounds.east, bounds.north],
      ],
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.current?.remove()
    }
  }, [lng, lat, zoom, bounds])

  return (
    <div className='relative h-full w-full'>
      <div ref={mapContainer} className='h-full w-full' />
    </div>
  )
}
