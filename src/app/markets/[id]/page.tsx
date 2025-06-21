// market detail page
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Market {
  id: string
  name: string
  chineseName: string
  location: string
  established: string
  researchFocus: string
  description: string
  analyticalNote: string
  keyFindings: string[]
  image: string
  isActive: boolean
  latitude?: number
  longitude?: number
}

interface ApiResponse {
  success: boolean
  data: Market
}

export default function MarketDetail() {
  const params = useParams()
  const marketId = params.id as string

  const [market, setMarket] = useState<Market | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!marketId) return

    const fetchMarket = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/markets/${marketId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Market not found')
          }
          throw new Error('Failed to fetch market')
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setMarket(data.data)
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMarket()
  }, [marketId])

  if (loading) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='animate-pulse'>
              <div className='h-8 bg-neutral-800 rounded mb-4'></div>
              <div className='h-12 bg-neutral-800 rounded mb-6'></div>
              <div className='h-80 bg-neutral-800 rounded-xl mb-8'></div>
              <div className='space-y-4'>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className='h-6 bg-neutral-800 rounded'></div>
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
              {error === 'Market not found'
                ? 'Market Not Found'
                : 'Something went wrong!'}
            </h1>
            <p className='text-neutral-300 mb-8'>{error}</p>
            <div className='space-x-4'>
              <Link
                href='/markets'
                className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
              >
                Back to Markets
              </Link>
              {error !== 'Market not found' && (
                <button
                  onClick={() => window.location.reload()}
                  className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors'
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!market) {
    return null
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <Link
              href='/markets'
              className='text-primary hover:text-primary-light transition-colors text-sm'
            >
              ← Back to Markets
            </Link>
          </nav>

          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              {market.name}
            </h1>
            <p className='text-xl text-neutral-300 mb-2'>
              {market.chineseName}
            </p>
            <p className='text-neutral-400 mb-4'>
              {market.location} • Established {market.established}
            </p>
            <div className='inline-block bg-primary/20 text-primary px-4 py-2 rounded-full font-medium'>
              Research Focus: {market.researchFocus}
            </div>
          </div>

          {/* Hero Image */}
          <div className='relative h-96 rounded-xl overflow-hidden mb-12'>
            <Image
              src={market.image}
              alt={`${market.name} observation site`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 1024px'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-6 left-6 text-white'>
              <p className='text-sm opacity-90'>Field Research Site</p>
              <p className='text-2xl font-bold'>{market.name}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid md:grid-cols-3 gap-12'>
            {/* Primary Content */}
            <div className='md:col-span-2 space-y-8'>
              {/* Description */}
              <section>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  Initial Observations
                </h2>
                <p className='text-neutral-300 leading-relaxed text-lg'>
                  {market.description}
                </p>
              </section>

              {/* Theoretical Framework */}
              <section className='bg-secondary-light rounded-xl p-8'>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  <span className='text-accent'>Theoretical Framework</span>
                </h2>
                <p className='text-neutral-300 leading-relaxed'>
                  {market.analyticalNote}
                </p>
              </section>

              {/* Key Findings */}
              <section>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Detailed Findings
                </h2>
                <div className='space-y-4'>
                  {market.keyFindings.map((finding, index) => (
                    <div
                      key={index}
                      className='bg-neutral-900 rounded-lg p-6 border-l-4 border-primary'
                    >
                      <div className='flex items-start space-x-4'>
                        <div className='bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1'>
                          {index + 1}
                        </div>
                        <p className='text-neutral-300 leading-relaxed'>
                          {finding}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Research Methods Note */}
              <section className='bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8'>
                <h3 className='text-xl font-bold text-white mb-4'>
                  <span className='text-accent'>Methodological Note</span>
                </h3>
                <p className='text-neutral-300 text-sm leading-relaxed mb-4'>
                  These observations were collected through participant
                  observation during multiple visits to {market.name}. I
                  documented interactions, spatial arrangements, language use,
                  and cultural performances while being mindful of my position
                  as an outsider researcher.
                </p>
                <p className='text-neutral-400 text-xs'>
                  <strong>Limitations:</strong> This analysis represents my
                  perspective as a non-Taiwanese researcher and should be
                  considered alongside voices from the community itself.
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className='space-y-8'>
              {/* Quick Facts */}
              <div className='bg-neutral-900 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-white mb-4'>
                  Quick Facts
                </h3>
                <div className='space-y-3'>
                  <div>
                    <p className='text-neutral-400 text-sm'>Location</p>
                    <p className='text-white'>{market.location}</p>
                  </div>
                  <div>
                    <p className='text-neutral-400 text-sm'>Established</p>
                    <p className='text-white'>{market.established}</p>
                  </div>
                  <div>
                    <p className='text-neutral-400 text-sm'>Research Focus</p>
                    <p className='text-white'>{market.researchFocus}</p>
                  </div>
                  {market.latitude && market.longitude && (
                    <div>
                      <p className='text-neutral-400 text-sm'>Coordinates</p>
                      <p className='text-white text-xs'>
                        {market.latitude.toFixed(6)},{' '}
                        {market.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className='space-y-4'>
                <Link
                  href={`/explorer?market=${market.id}`}
                  className='block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors text-center'
                >
                  Explore Interactive Map
                </Link>
                <Link
                  href='/markets'
                  className='block w-full bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-lg border border-neutral-600 transition-colors text-center'
                >
                  View All Markets
                </Link>
              </div>

              {/* Research Context */}
              <div className='bg-neutral-900 rounded-xl p-6'>
                <h3 className='text-lg font-bold text-white mb-3'>
                  Research Context
                </h3>
                <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                  This market analysis is part of a broader study examining
                  cultural identity and authenticity in Taiwan's night market
                  spaces.
                </p>
                <Link
                  href='/about'
                  className='text-primary hover:text-primary-light text-sm transition-colors'
                >
                  Learn more about this research →
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='mt-16 pt-8 border-t border-neutral-800'>
            <div className='flex justify-between items-center'>
              <Link
                href='/markets'
                className='text-primary hover:text-primary-light transition-colors'
              >
                ← Back to All Markets
              </Link>
              <Link
                href={`/explorer?market=${market.id}`}
                className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
              >
                Explore in Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
