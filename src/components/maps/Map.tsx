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
      // Minimal performance settings
      antialias: false,
      trackResize: false,
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
        <div>
          <h3>${market.name}</h3>
          <p>${market.chineseName}</p>
        </div>
      `)

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }, [markets, mapLoaded, selectedMarket, onMarketSelect, interactive])

  // Add vendor markers when in vendor mode
  useEffect(() => {
    if (!map.current || !mapLoaded || !interactive || viewMode !== 'vendors')
      return

    // Clear existing vendor markers
    const vendorMarkers = markersRef.current.filter(marker =>
      marker.getElement().classList.contains('vendor-marker')
    )
    vendorMarkers.forEach(marker => marker.remove())
    markersRef.current = markersRef.current.filter(
      marker => !marker.getElement().classList.contains('vendor-marker')
    )

    // Get vendors - all vendors if no market selected, or filtered by market
    const marketVendors = vendors.filter(vendor => {
      const hasMarkets = vendor.markets && vendor.markets.length > 0
      if (!hasMarkets) {
        console.log(`Vendor ${vendor.name} has no markets relationship`)
        return false
      }

      // If no market is selected, show all vendors
      if (!selectedMarket) {
        return true
      }

      // If market is selected, filter by that market
      const isMatch = vendor.markets!.some((m: any) => {
        console.log(`Checking vendor ${vendor.name} market relationship:`, {
          marketRelation: m,
          marketId: m.market?.id,
          selectedMarketId: selectedMarket.id,
          matches: m.market?.id === selectedMarket.id,
        })
        return m.market?.id === selectedMarket.id
      })

      return isMatch
    })

    // Debug logging
    console.log('=== VENDOR DEBUGGING ===')
    console.log('Selected market:', selectedMarket?.id, selectedMarket?.name)
    console.log('Total vendors available:', vendors.length)
    console.log(
      'All vendors:',
      vendors.map(v => ({
        name: v.name,
        id: v.id,
        markets: v.markets,
        lat: v.latitude,
        lng: v.longitude,
      }))
    )
    console.log('Market vendors found:', marketVendors.length)
    console.log(
      'Filtered vendors:',
      marketVendors.map(v => v.name)
    )
    console.log('=========================')

    marketVendors.forEach((vendor, index) => {
      // Use vendor coordinates if available, otherwise use market coordinates as fallback
      const baseLat = vendor.latitude || selectedMarket?.latitude
      const baseLng = vendor.longitude || selectedMarket?.longitude

      if (!baseLat || !baseLng) {
        console.log(
          'No coordinates available for vendor:',
          vendor.name,
          'Vendor coords:',
          [vendor.latitude, vendor.longitude],
          'Market coords:',
          selectedMarket
            ? [selectedMarket.latitude, selectedMarket.longitude]
            : 'No market selected'
        )
        return
      }

      // Add slight offset to coordinates to spread them around the market
      // This prevents overlapping and makes them more visible
      const offsetRadius = 0.002 // About 200 meters
      const angle =
        index * (360 / Math.max(marketVendors.length, 1)) * (Math.PI / 180)
      const offsetLat = baseLat + offsetRadius * Math.cos(angle)
      const offsetLng = baseLng + offsetRadius * Math.sin(angle)

      // Debug logging
      console.log('Vendor coordinates:', {
        name: vendor.name,
        vendorCoords: [vendor.longitude, vendor.latitude],
        marketCoords: selectedMarket
          ? [selectedMarket.longitude, selectedMarket.latitude]
          : null,
        baseCoords: [baseLng, baseLat],
        finalCoords: [offsetLng, offsetLat],
        angle: angle,
        index: index,
      })

      // Get market-specific color for vendor
      const getVendorColor = (vendor: any, isSelected: boolean) => {
        const marketId = vendor.markets?.[0]?.market?.id
        if (isSelected) {
          return '#dc2626' // Red when selected
        }

        switch (marketId) {
          case 'shilin-night-market':
            return '#ea580c' // Orange
          case 'raohe-street-market':
            return '#2563eb' // Blue
          case 'huaxi-street-market':
            return '#16a34a' // Green
          case 'kenting-night-market':
            return '#9333ea' // Purple
          default:
            return '#fb923c' // Default orange
        }
      }

      // Create custom vendor marker element (food cart style)
      const el = document.createElement('div')
      el.className = 'vendor-marker'
      el.style.cssText = `
        width: 32px;
        height: 32px;
        background: ${getVendorColor(vendor, selectedVendor?.id === vendor.id)};
        border: 3px solid white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        transform: ${selectedVendor?.id === vendor.id ? 'scale(1.2)' : 'scale(1)'};
        position: relative;
      `

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
        .setLngLat([offsetLng, offsetLat])
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
          ${vendor.operatingHours ? `<p style="margin: 6px 0 0 0; font-size: 11px; color: #6b7280;">⏰ ${vendor.operatingHours}</p>` : ''}
        </div>
      `)

      marker.setPopup(popup)
      markersRef.current.push(marker)
    })
  }, [
    vendors,
    selectedMarket?.id, // Only depend on market ID to avoid unnecessary re-renders
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
        zoom: viewMode === 'vendors' ? 15 : 12,
        speed: 1.2, // Animation speed (1 = default, higher = faster)
        curve: 1.42, // Animation curve (1 = linear, higher = more curved)
        easing: t => t * (2 - t), // Easing function for smooth deceleration
        essential: true, // Animation not affected by user's prefers-reduced-motion setting
      })
    } else if (viewMode === 'vendors' && vendors.length > 0) {
      // Show all vendors when in vendor mode without market selection
      const vendorCoordinates = vendors
        .filter(vendor => vendor.latitude && vendor.longitude)
        .map(
          vendor => [vendor.longitude!, vendor.latitude!] as [number, number]
        )

      if (vendorCoordinates.length > 0) {
        const bounds = new mapboxgl.LngLatBounds()
        vendorCoordinates.forEach(coord => bounds.extend(coord))
        map.current.fitBounds(bounds, {
          padding: 80, // More padding to ensure all vendors are visible
          duration: 1500,
        })
      } else {
        // Fallback to Taiwan overview if no vendor coordinates
        map.current.flyTo({
          center: [121.0, 23.8],
          zoom: 8,
          speed: 1.0,
          curve: 1.42,
          easing: t => t * (2 - t),
        })
      }
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
  }, [selectedMarket, viewMode, mapLoaded, interactive, markets, vendors])

  return (
    <div className='relative h-full w-full'>
      <div ref={mapContainer} className='h-full w-full' />

      {/* Map Legend - only show when interactive */}
      {interactive && (
        <div className='absolute bottom-4 left-4 bg-black/80 rounded-lg p-3 text-white text-sm'>
          {viewMode === 'markets' && (
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-primary rounded-full'></div>
              <span>Cultural Sites</span>
            </div>
          )}
          {viewMode === 'vendors' && (
            <div className='space-y-2'>
              <div className='text-xs text-gray-300 font-medium'>
                Food Heritage by Market:
              </div>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-3 h-3 rounded border border-white'
                  style={{ backgroundColor: '#ea580c', borderRadius: '4px' }}
                ></div>
                <span className='text-xs'>Shilin 🍜</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-3 h-3 rounded border border-white'
                  style={{ backgroundColor: '#2563eb', borderRadius: '4px' }}
                ></div>
                <span className='text-xs'>Raohe 🥟</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-3 h-3 rounded border border-white'
                  style={{ backgroundColor: '#16a34a', borderRadius: '4px' }}
                ></div>
                <span className='text-xs'>Huaxi 🍲</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-3 h-3 rounded border border-white'
                  style={{ backgroundColor: '#9333ea', borderRadius: '4px' }}
                ></div>
                <span className='text-xs'>Kenting 🦐</span>
              </div>
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
