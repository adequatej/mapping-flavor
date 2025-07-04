import { useAppSelector } from '@/store/hooks'
import { Market, Vendor } from '@/types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

interface MapProps {
  markets?: Market[]
  vendors?: Vendor[]
  selectedMarket?: Market | null
  selectedVendor?: Vendor | null
  viewMode?: 'markets' | 'vendors' | 'research'
  onMarketSelect?: (market: Market | null) => void
  onVendorSelect?: (vendor: Vendor | null) => void
  onMapLoad?: (zoom: number, center: [number, number]) => void
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
  onMapLoad,
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
        [bounds.west - 1.5, bounds.south - 1.0],
        [bounds.east + 1.5, bounds.north + 1.0],
      ],
      minZoom: 6, // Prevent zooming out past Taiwan - ensures Taiwan stays visible
      maxZoom: 18,
      // Mobile-optimized performance settings
      antialias: false,
      trackResize: true, // Enable for better mobile responsiveness
      attributionControl: false, // Remove attribution for cleaner mobile view
    })

    map.current.on('load', () => {
      setMapLoaded(true)
      if (onMapLoad) {
        const center = map.current!.getCenter()
        onMapLoad(map.current!.getZoom(), [center.lng, center.lat])
      }
    })

    // Don't add default navigation controls since we have custom ones

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- Map should only initialize once

  // Respond to zoom and center changes from Redux
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Update map zoom and center when Redux state changes
    map.current.easeTo({
      center: [lng, lat],
      zoom: zoom,
      duration: 300,
    })
  }, [lng, lat, zoom, mapLoaded])

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
        <div style="padding: 8px; min-width: 180px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1f2937;">${market.name}</h3>
          <p style="margin: 0; font-size: 12px; color: #4b5563;">${market.chineseName}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #6b7280;">${market.location}</p>
        </div>
      `)

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }, [markets, mapLoaded, selectedMarket, onMarketSelect, interactive])

  // Add vendor markers when in vendor mode
  useEffect(() => {
    if (
      !map.current ||
      !mapLoaded ||
      !interactive ||
      viewMode !== 'vendors' || // Only show vendor markers in vendors view mode
      vendors.length === 0
    )
      return

    clearMarkers()

    // Filter vendors for selected market
    const marketVendors = selectedMarket
      ? vendors.filter(vendor =>
          vendor.markets?.some(
            (marketRelation: any) =>
              marketRelation.market?.id === selectedMarket.id
          )
        )
      : vendors

    marketVendors.forEach(vendor => {
      // Skip vendors without coordinates
      if (!vendor.latitude || !vendor.longitude) return

      // Create marker element
      const el = document.createElement('div')
      el.className = 'vendor-marker'
      el.style.width = '32px'
      el.style.height = '32px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor =
        selectedVendor?.id === vendor.id ? '#e11d48' : '#ffffff'
      el.style.color = selectedVendor?.id === vendor.id ? '#ffffff' : '#1f2937'
      el.style.display = 'flex'
      el.style.alignItems = 'center'
      el.style.justifyContent = 'center'
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
      el.style.border = '2px solid'
      el.style.borderColor =
        selectedVendor?.id === vendor.id ? '#e11d48' : '#e5e7eb'
      el.style.cursor = 'pointer'
      el.style.transition = 'all 0.2s ease'
      el.style.fontSize = '16px'

      // Add food emoji based on specialty
      const getFoodEmoji = (specialties: string[]) => {
        const specialty = specialties[0]?.toLowerCase() || ''
        if (specialty.includes('noodle') || specialty.includes('soup'))
          return '🍜'
        if (specialty.includes('dumpling') || specialty.includes('bao'))
          return '🥟'
        if (
          specialty.includes('meat') ||
          specialty.includes('beef') ||
          specialty.includes('pork')
        )
          return '🍖'
        if (specialty.includes('seafood') || specialty.includes('fish'))
          return '🐟'
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
        if (specialty.includes('rice') || specialty.includes('fried'))
          return '🍚'
        return '🍽️' // Default food icon
      }

      el.innerHTML = getFoodEmoji(vendor.specialties)

      const marker = new mapboxgl.Marker(el)
        .setLngLat([vendor.longitude, vendor.latitude])
        .addTo(map.current!)

      // Click handler
      if (onVendorSelect) {
        el.addEventListener('click', () => {
          onVendorSelect(vendor)
        })
      }

      // Enhanced popup for vendors
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'vendor-popup',
      }).setHTML(`
        <div style="padding: 8px; min-width: 180px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 18px;">${getFoodEmoji(vendor.specialties)}</span>
            <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${vendor.name}</h3>
          </div>
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280;">${vendor.chineseName || ''}</p>
          <div style="display: flex; flex-wrap: gap: 4px;">
            ${vendor.specialties
              .slice(0, 2)
              .map(
                specialty =>
                  `<span style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 12px; font-size: 10px;">${specialty}</span>`
              )
              .join('')}
          </div>
        </div>
      `)

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }, [
    vendors,
    selectedMarket?.id,
    selectedVendor?.id,
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
        zoom: viewMode === 'vendors' ? 16 : 14, // Higher zoom for vendor view
        speed: 1.2,
        curve: 1.42,
        easing: t => t * (2 - t),
        essential: true,
      })
    } else if (viewMode === 'vendors' && vendors.length > 0) {
      // Only fit bounds if we're not already at a good zoom level
      if (map.current.getZoom() < 12) {
        // Increased minimum zoom for vendor view
        const vendorCoordinates = vendors
          .filter(vendor => vendor.latitude && vendor.longitude)
          .map(
            vendor => [vendor.longitude, vendor.latitude] as [number, number]
          )

        if (vendorCoordinates.length === 1) {
          map.current.flyTo({
            center: vendorCoordinates[0],
            zoom: 16, // Higher zoom for single vendor
            speed: 1.0,
            curve: 1.42,
            easing: t => t * (2 - t),
          })
        } else if (vendorCoordinates.length > 1) {
          const bounds = new mapboxgl.LngLatBounds()
          vendorCoordinates.forEach(coord => bounds.extend(coord))
          map.current.fitBounds(bounds, {
            padding: 50,
            duration: 1500,
            maxZoom: 16, // Limit maximum zoom when fitting bounds
          })
        }
      }
    } else if (viewMode === 'markets' && !selectedMarket) {
      // Only reset to overview when explicitly in markets mode without selection
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
          duration: 1500,
        })
      }
    }
  }, [selectedMarket, viewMode, mapLoaded, interactive, markets, vendors])

  return (
    <div className='relative h-full w-full'>
      <div ref={mapContainer} className='h-full w-full' />

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className='absolute inset-0 bg-neutral-800 flex items-center justify-center'>
          <div className='text-white'>Loading map...</div>
        </div>
      )}
    </div>
  )
}
