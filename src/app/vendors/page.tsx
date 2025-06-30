'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Vendor {
  id: string
  name: string
  chineseName?: string
  description: string
  specialties: string[]
  latitude?: number
  longitude?: number
  images: string[]
  contactPhone?: string
  contactInstagram?: string
  contactFacebook?: string
  contactLine?: string
  operatingHours?: string
  researchNotes?: string
  culturalSignificance?: string
  isActive: boolean
  markets?: Array<{
    market: {
      id: string
      name: string
      chineseName: string
      location: string
    }
  }>
}

interface ApiResponse {
  success: boolean
  data: Vendor[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMarket, setSelectedMarket] = useState<string>('')
  const [markets, setMarkets] = useState<Array<{ id: string; name: string }>>(
    []
  )

  // Helper function to truncate descriptions for card display
  const truncateDescription = (
    description: string,
    maxLength: number = 120
  ) => {
    if (description.length <= maxLength) return description

    // Find the last complete sentence within the limit
    const truncated = description.substring(0, maxLength)
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?')
    )

    if (lastSentenceEnd > maxLength * 0.6) {
      return description.substring(0, lastSentenceEnd + 1)
    }

    // If no good sentence break, find the last space
    const lastSpace = truncated.lastIndexOf(' ')
    if (lastSpace > maxLength * 0.7) {
      return description.substring(0, lastSpace) + '...'
    }

    return truncated + '...'
  }

  // Fetch markets for filter dropdown first
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('/api/markets')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setMarkets(data.data.map((m: any) => ({ id: m.id, name: m.name })))
          }
        }
      } catch (err) {
        console.error('Failed to fetch markets:', err)
      }
    }
    fetchMarkets()
  }, [])

  // Get market filter from URL after markets are loaded
  useEffect(() => {
    if (markets.length > 0) {
      const urlParams = new URLSearchParams(window.location.search)
      const marketParam = urlParams.get('market')
      if (marketParam && markets.find(m => m.id === marketParam)) {
        setSelectedMarket(marketParam)
      }
    }
  }, [markets])

  // Update URL when market filter changes (but not on initial load)
  useEffect(() => {
    // Only update URL if we're not on initial load
    if (selectedMarket) {
      const url = new URL(window.location.href)
      url.searchParams.set('market', selectedMarket)
      window.history.replaceState({}, '', url.toString())
    }
  }, [selectedMarket])

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (selectedMarket) {
          params.append('marketId', selectedMarket)
        }

        const url = `/api/vendors${params.toString() ? `?${params.toString()}` : ''}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch vendors')
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setVendors(data.data)
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [selectedMarket])

  if (loading) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto text-center'>
            <div className='animate-pulse'>
              <div className='h-12 bg-neutral-800 rounded mb-4'></div>
              <div className='h-6 bg-neutral-800 rounded mb-8'></div>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className='h-96 bg-neutral-800 rounded-xl'></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <h1 className='text-4xl font-bold text-white mb-6'>
              Something went wrong!
            </h1>
            <p className='text-neutral-300 mb-8'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='font-bold text-4xl md:text-5xl text-white mb-6'>
            Vendor <span className='text-primary'>Analysis</span>
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed mb-4'>
            Individual Entrepreneurs Navigating Cultural Identity Politics
          </p>
          <p className='text-neutral-400 leading-relaxed'>
            These vendor profiles provide detailed evidence for how individual
            entrepreneurs navigate the cultural dynamics identified in each
            market case study. Each vendor demonstrates specific strategies for
            managing cultural authenticity, economic viability, and identity
            politics within Taiwan's contested cultural spaces.
          </p>
        </div>

        {/* Market Filter */}
        <div className='max-w-4xl mx-auto mb-8'>
          <div className='bg-neutral-900 rounded-xl p-6'>
            <div className='flex flex-wrap items-center gap-4'>
              <label className='text-white font-medium'>
                Filter by Market:
              </label>
              <select
                value={selectedMarket}
                onChange={e => setSelectedMarket(e.target.value)}
                className='bg-neutral-800 text-white px-4 py-2 rounded-lg border border-neutral-600 focus:border-primary focus:outline-none min-w-[200px]'
              >
                <option value=''>All Markets</option>
                {markets.map(market => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </select>
              {selectedMarket && (
                <div className='flex items-center gap-2'>
                  <span className='text-neutral-400 text-sm'>
                    Showing vendors from:{' '}
                    {markets.find(m => m.id === selectedMarket)?.name}
                  </span>
                  <button
                    onClick={() => setSelectedMarket('')}
                    className='bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 rounded-full text-sm transition-colors'
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Framework */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>Theoretical Framework</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            Following Chen and Huang's (2014) methodology for analyzing vendor
            behavior patterns, these profiles document how individual
            entrepreneurs navigate the cultural identity politics identified in
            Taiwan's night market case studies. Each vendor profile demonstrates
            specific strategies for managing what Said (1978) calls
            "orientalist" cultural performance, Scott's (1990) "public and
            hidden transcripts," and Bourdieu's (1984) deployment of cultural
            capital within contested commercial spaces.
          </p>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            These vendors provide concrete evidence for the broader theoretical
            argument that Taiwan's night markets function as contested cultural
            spaces where different versions of "Taiwanese identity" are
            negotiated, performed, and sometimes erased through individual
            entrepreneurial strategies.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Methodology:</strong> All vendor information was collected
            through ethnographic fieldwork with informed consent. Names and
            identifying details may be anonymized to protect participant privacy
            while maintaining analytical integrity.
          </p>
        </div>

        {/* Vendors Grid */}
        {vendors.length > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {vendors.map(vendor => (
              <div
                key={vendor.id}
                className='bg-secondary-light rounded-xl overflow-hidden hover:bg-neutral-700 transition-colors'
              >
                {/* Vendor Image */}
                <div className='relative h-48 bg-neutral-800'>
                  {vendor.images && vendor.images.length > 0 ? (
                    <Image
                      src={vendor.images[0]}
                      alt={`${vendor.name} vendor stall`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-full text-neutral-500'>
                      <div className='text-center'>
                        <div className='text-4xl mb-2'>🏪</div>
                        <p className='text-sm'>No image available</p>
                      </div>
                    </div>
                  )}
                  <div className='absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs'>
                    Vendor
                  </div>
                </div>

                {/* Vendor Info */}
                <div className='p-6'>
                  <div className='mb-4'>
                    <h3 className='text-xl font-bold text-white mb-1'>
                      {vendor.name}
                    </h3>
                    {vendor.chineseName && (
                      <p className='text-neutral-400 text-sm mb-2'>
                        {vendor.chineseName}
                      </p>
                    )}
                    {vendor.markets && vendor.markets.length > 0 && (
                      <p className='text-primary text-sm'>
                        📍 {vendor.markets[0].market.name}
                      </p>
                    )}
                  </div>

                  {/* Specialties */}
                  {vendor.specialties && vendor.specialties.length > 0 && (
                    <div className='mb-4'>
                      <div className='flex flex-wrap gap-2'>
                        {vendor.specialties.slice(0, 3).map((specialty, i) => (
                          <span
                            key={i}
                            className='bg-primary/20 text-primary px-2 py-1 rounded-full text-xs'
                          >
                            {specialty}
                          </span>
                        ))}
                        {vendor.specialties.length > 3 && (
                          <span className='text-neutral-500 text-xs'>
                            +{vendor.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className='text-neutral-300 text-sm leading-relaxed mb-4'>
                    {truncateDescription(vendor.description)}
                  </p>

                  {/* Operating Hours */}
                  {vendor.operatingHours && (
                    <div className='mb-4 text-xs text-neutral-400'>
                      🕒 {vendor.operatingHours}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className='flex space-x-3'>
                    <Link
                      href={`/vendors/${vendor.id}`}
                      className='flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-center text-sm'
                    >
                      View Details
                    </Link>
                    {vendor.markets && vendor.markets.length > 0 && (
                      <Link
                        href={`/markets/${vendor.markets[0].market.id}`}
                        className='bg-secondary hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-lg border border-neutral-600 transition-colors text-center text-sm'
                      >
                        Visit Market
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center text-neutral-400 py-16'>
            <div className='text-6xl mb-4'>🏪</div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              No Vendors Found
            </h3>
            <p>
              No vendor profiles have been documented yet. Check back soon as we
              continue our fieldwork!
            </p>
          </div>
        )}

        {/* Research Context */}
        <div className='mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 max-w-4xl mx-auto'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Analytical Framework: Vendor Evidence for Market Case Studies
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Supporting Evidence Structure
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                Each vendor profile provides detailed evidence for the cultural
                dynamics identified in the four market case studies: identity
                commodification (Shilin), minority culture preservation (Raohe),
                working-class autonomy (Huaxi), and regional adaptation
                (Kenting). Individual entrepreneurial strategies demonstrate how
                broader theoretical concepts operate in practice.
              </p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Ethnographic Methodology
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                Following standard ethnographic practices for studying contested
                cultural spaces, this research documents vendor navigation of
                cultural identity politics through participant observation,
                informal interviews, and behavioral analysis. All documentation
                maintains ethical standards while preserving analytical depth
                necessary for academic analysis.
              </p>
            </div>
          </div>
          <div className='mt-8 bg-neutral-900 rounded-lg p-6'>
            <h4 className='text-white font-semibold mb-3 text-center'>
              Connection to Thesis Argument
            </h4>
            <p className='text-neutral-300 text-sm text-center'>
              <strong>
                These vendor profiles demonstrate how Taiwan's night markets
                function as contested cultural spaces where different versions
                of "Taiwanese identity" are negotiated, performed, and sometimes
                erased
              </strong>{' '}
              - with each individual entrepreneur employing specific strategies
              to navigate post-colonial food politics and cultural
              representation within commercial contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
