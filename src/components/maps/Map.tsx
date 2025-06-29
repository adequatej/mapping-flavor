import { useAppSelector } from '@/store/hooks'
import { Market, Vendor } from '@/types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

// Initialize Mapbox
// You can get a free token at https://account.mapbox.com/
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

interface MapProps {
  markets?: Market[]
  vendors?: Vendor[]
  selectedMarket?: Market | null
  selectedVendor?: Vendor | null
  viewMode?: 'markets' | 'vendors' | 'research'
  onMarketSelect?: (market: Market | null) => void
  onVendorSelect?: (vendor: Vendor | null) => void
  interactive?: boolean
}

export default function Map({
  markets = [],
  vendors = [],
  selectedMarket = null,
  selectedVendor = null,
  viewMode = 'markets',
  onMarketSelect,
  onVendorSelect,
  interactive = false,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Get map state from Redux
  const { lng, lat, zoom, bounds } = useAppSelector(state => state.map)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Lighter style for better performance
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [
        [bounds.west, bounds.south],
        [bounds.east, bounds.north],
      ],
      // Minimal performance settings
      antialias: false,
      trackResize: false,
    })

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [lng, lat, zoom, bounds])

  // Clear all markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
  }

  // Add market markers when interactive - simplified version
  useEffect(() => {
    if (!map.current || !mapLoaded || !interactive || markets.length === 0)
      return

    clearMarkers()

    markets.forEach((market, index) => {
      // Use simple Mapbox marker without custom styling
      const marker = new mapboxgl.Marker({
        color: selectedMarket?.id === market.id ? '#e11d48' : '#6b7280',
        scale: selectedMarket?.id === market.id ? 1.2 : 1.0,
      })
        .setLngLat([market.longitude, market.latitude])
        .addTo(map.current!)

      // Simple click handler
      if (onMarketSelect) {
        marker.getElement().addEventListener('click', () => {
          onMarketSelect(market)
        })
      }

      // Simple popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`
        <div>
          <h3>${market.name}</h3>
          <p>${market.chineseName}</p>
        </div>
      `)

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }, [markets, mapLoaded, selectedMarket, onMarketSelect, interactive])

  // Add vendor markers when in vendor mode and market is selected
  useEffect(() => {
    if (
      !map.current ||
      !mapLoaded ||
      !interactive ||
      viewMode !== 'vendors' ||
      !selectedMarket
    )
      return

    // Clear existing vendor markers
    const vendorMarkers = markersRef.current.filter(marker =>
      marker.getElement().classList.contains('vendor-marker')
    )
    vendorMarkers.forEach(marker => marker.remove())
    markersRef.current = markersRef.current.filter(
      marker => !marker.getElement().classList.contains('vendor-marker')
    )

    // Get vendors for selected market
    const marketVendors = vendors.filter(vendor =>
      vendor.markets?.some((m: any) => m.market?.id === selectedMarket.id)
    )

    marketVendors.forEach(vendor => {
      if (!vendor.latitude || !vendor.longitude) return

      // Use simple Mapbox marker for vendors
      const marker = new mapboxgl.Marker({
        color: selectedVendor?.id === vendor.id ? '#f97316' : '#a3a3a3',
        scale: selectedVendor?.id === vendor.id ? 1.1 : 0.8,
      })
        .setLngLat([vendor.longitude, vendor.latitude])
        .addTo(map.current!)

      // Simple click handler
      if (onVendorSelect) {
        marker.getElement().addEventListener('click', () => {
          onVendorSelect(vendor)
        })
      }

      // Simple popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`
        <div>
          <h3>${vendor.name}</h3>
          <p>${vendor.specialties.join(', ')}</p>
        </div>
      `)

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }, [
    vendors,
    selectedMarket,
    selectedVendor,
    viewMode,
    mapLoaded,
    onVendorSelect,
    interactive,
  ])

  // Handle map view changes with smooth animations
  useEffect(() => {
    if (!map.current || !mapLoaded || !interactive) return

    if (selectedMarket) {
      // Smooth fly to selected market with animation
      map.current.flyTo({
        center: [selectedMarket.longitude, selectedMarket.latitude],
        zoom: viewMode === 'vendors' ? 15 : 12,
        speed: 1.2, // Animation speed (1 = default, higher = faster)
        curve: 1.42, // Animation curve (1 = linear, higher = more curved)
        easing: t => t * (2 - t), // Easing function for smooth deceleration
        essential: true, // Animation not affected by user's prefers-reduced-motion setting
      })
    } else if (markets.length > 0) {
      // Show all markets with smooth animation
      const coordinates = markets.map(
        m => [m.longitude, m.latitude] as [number, number]
      )

      if (coordinates.length === 1) {
        map.current.flyTo({
          center: coordinates[0],
          zoom: 10,
          speed: 1.0,
          curve: 1.42,
          easing: t => t * (2 - t),
        })
      } else if (coordinates.length > 1) {
        const bounds = new mapboxgl.LngLatBounds()
        coordinates.forEach(coord => bounds.extend(coord))
        map.current.fitBounds(bounds, {
          padding: 50,
          duration: 1500, // Animation duration in milliseconds
        })
      }
    }
  }, [selectedMarket, viewMode, mapLoaded, interactive, markets])

  return (
    <div className='relative h-full w-full'>
      <div ref={mapContainer} className='h-full w-full' />

      {/* Map Legend - only show when interactive */}
      {interactive && (
        <div className='absolute bottom-4 left-4 bg-black/80 rounded-lg p-3 text-white text-sm'>
          <div className='flex items-center space-x-2 mb-2'>
            <div className='w-3 h-3 bg-primary rounded-full'></div>
            <span>Night Markets</span>
          </div>
          {viewMode === 'vendors' && (
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
              <span>Vendors</span>
            </div>
          )}
        </div>
      )}

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className='absolute inset-0 bg-neutral-800 flex items-center justify-center'>
          <div className='text-white'>Loading map...</div>
        </div>
      )}
    </div>
  )
}
