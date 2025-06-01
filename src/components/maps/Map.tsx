import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

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
  const [lng] = useState(121.5)
  const [lat] = useState(23.5)
  const [zoom] = useState(7)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [
        [TAIWAN_BOUNDS.west, TAIWAN_BOUNDS.south],
        [TAIWAN_BOUNDS.east, TAIWAN_BOUNDS.north],
      ],
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.current?.remove()
    }
  }, [lng, lat, zoom])

  return (
    <div className='relative h-full w-full'>
      <div ref={mapContainer} className='h-full w-full' />
    </div>
  )
}
