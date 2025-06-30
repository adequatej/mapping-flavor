'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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
      latitude: number
      longitude: number
    }
  }>
}

interface ApiResponse {
  success: boolean
  data: Vendor
}

export default function VendorDetail() {
  const params = useParams()
  const vendorId = params.id as string

  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!vendorId) return

    const fetchVendor = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/vendors/${vendorId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Vendor not found')
          }
          throw new Error('Failed to fetch vendor')
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setVendor(data.data)
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchVendor()
  }, [vendorId])

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
              {error === 'Vendor not found'
                ? 'Vendor Not Found'
                : 'Something went wrong!'}
            </h1>
            <p className='text-neutral-300 mb-8'>{error}</p>
            <div className='space-x-4'>
              <Link
                href='/vendors'
                className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
              >
                Back to Vendors
              </Link>
              {error !== 'Vendor not found' && (
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

  if (!vendor) {
    return null
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <div className='flex items-center space-x-2 text-sm'>
              <Link
                href='/vendors'
                className='text-primary hover:text-primary-light transition-colors'
              >
                Vendors
              </Link>
              <span className='text-neutral-500'>→</span>
              <span className='text-neutral-300'>{vendor.name}</span>
            </div>
          </nav>

          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              {vendor.name}
            </h1>
            {vendor.chineseName && (
              <p className='text-xl text-neutral-300 mb-4'>
                {vendor.chineseName}
              </p>
            )}
            {vendor.markets && vendor.markets.length > 0 && (
              <div className='mb-4'>
                <Link
                  href={`/markets/${vendor.markets[0].market.id}`}
                  className='inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full font-medium hover:bg-primary/30 transition-colors'
                >
                  📍 {vendor.markets[0].market.name}
                </Link>
              </div>
            )}
            {vendor.specialties && vendor.specialties.length > 0 && (
              <div className='flex flex-wrap justify-center gap-2'>
                {vendor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className='bg-accent/20 text-accent px-3 py-1 rounded-full text-sm'
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          {vendor.images && vendor.images.length > 0 && (
            <div className='mb-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {vendor.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden ${
                      index === 0 && vendor.images.length > 1
                        ? 'md:row-span-2 h-96'
                        : 'h-48'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${vendor.name} - Image ${index + 1}`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className='grid md:grid-cols-3 gap-12'>
            {/* Primary Content */}
            <div className='md:col-span-2 space-y-8'>
              {/* Description */}
              <section>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  About This Vendor
                </h2>
                <p className='text-neutral-300 leading-relaxed text-lg'>
                  {vendor.description}
                </p>
              </section>

              {/* Cultural Significance */}
              {vendor.culturalSignificance && (
                <section className='bg-secondary-light rounded-xl p-8'>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    <span className='text-accent'>Cultural Significance</span>
                  </h2>
                  <p className='text-neutral-300 leading-relaxed'>
                    {vendor.culturalSignificance}
                  </p>
                </section>
              )}

              {/* Research Notes */}
              {vendor.researchNotes && (
                <section>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    Research Observations
                  </h2>
                  <div className='bg-neutral-900 rounded-lg p-6 border-l-4 border-primary'>
                    <p className='text-neutral-300 leading-relaxed'>
                      {vendor.researchNotes}
                    </p>
                  </div>
                </section>
              )}

              {/* Theoretical Analysis */}
              <section className='bg-secondary-light rounded-xl p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  <span className='text-primary'>Theoretical Analysis</span>:
                  Cultural Identity Politics
                </h2>

                {/* Determine market context for analysis */}
                {vendor.markets && vendor.markets.length > 0 && (
                  <div className='space-y-6'>
                    <div className='bg-neutral-900 rounded-lg p-6'>
                      <h3 className='text-lg font-semibold text-white mb-3'>
                        Market Context: {vendor.markets[0].market.name}
                      </h3>
                      <p className='text-neutral-300 text-sm leading-relaxed'>
                        <strong className='text-white'>
                          Case Study Connection:
                        </strong>{' '}
                        This vendor operates within the{' '}
                        <Link
                          href={`/markets/${vendor.markets[0].market.id}`}
                          className='text-primary hover:text-primary-light underline'
                        >
                          {vendor.markets[0].market.name}
                        </Link>{' '}
                        case study, which examines{' '}
                        {vendor.markets[0].market.id ===
                          'shilin-night-market' &&
                          'identity commodification and cultural performance for tourist consumption.'}
                        {vendor.markets[0].market.id ===
                          'raohe-street-market' &&
                          'Hakka heritage preservation and strategic minority culture visibility.'}
                        {vendor.markets[0].market.id ===
                          'huaxi-street-market' &&
                          'working-class cultural autonomy and economic accessibility as democratic practice.'}
                        {vendor.markets[0].market.id ===
                          'kenting-night-market' &&
                          'regional cultural adaptation to tourism economies and local identity negotiation.'}
                      </p>
                    </div>

                    <div className='bg-neutral-900 rounded-lg p-6'>
                      <h3 className='text-lg font-semibold text-white mb-4'>
                        Individual Navigation Strategies
                      </h3>
                      <div className='prose prose-invert max-w-none'>
                        {vendor.markets[0].market.id ===
                          'shilin-night-market' && (
                          <div className='space-y-4'>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Strategic Performance Analysis:
                              </strong>{' '}
                              {vendor.name} demonstrates how vendors navigate
                              Said's (1978) orientalist dynamics by constructing
                              tourist-friendly versions of "authentic Taiwanese
                              culture." This vendor exhibits what Scott (1990)
                              calls "public transcripts" - performing cultural
                              authenticity for tourist consumption while
                              potentially maintaining different practices for
                              local customers.
                            </p>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Commodification Evidence:
                              </strong>{' '}
                              The vendor's specialties (
                              {vendor.specialties.slice(0, 3).join(', ')})
                              represent commodified cultural markers that
                              satisfy tourist expectations of "real Taiwan"
                              while the vendor's actual cultural practices may
                              remain hidden from commercial display. This
                              supports the argument that cultural identity at
                              Shilin operates as strategic performance rather
                              than preservation.
                            </p>
                          </div>
                        )}
                        {vendor.markets[0].market.id ===
                          'raohe-street-market' && (
                          <div className='space-y-4'>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Strategic Visibility Analysis:
                              </strong>{' '}
                              {vendor.name} exemplifies how Hakka vendors deploy
                              Bourdieu's (1984) concept of cultural capital
                              within minority cultural contexts. This vendor
                              maintains cultural distinctiveness through
                              specialties (
                              {vendor.specialties.slice(0, 3).join(', ')}) that
                              mark Hakka identity while making it accessible to
                              broader audiences.
                            </p>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Resistance Evidence:
                              </strong>{' '}
                              The vendor navigates Gramsci's (2006) hegemonic
                              structures that privilege mainstream cultural
                              practices by strategically highlighting Hakka
                              cultural markers. This demonstrates minority
                              culture preservation through strategic visibility
                              rather than isolation, showing active resistance
                              to cultural erasure.
                            </p>
                          </div>
                        )}
                        {vendor.markets[0].market.id ===
                          'huaxi-street-market' && (
                          <div className='space-y-4'>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Economic Democracy Analysis:
                              </strong>{' '}
                              {vendor.name} embodies Lefebvre's (1968) "right to
                              the city" concept through economic accessibility
                              that creates genuine cultural participation. This
                              vendor's specialties (
                              {vendor.specialties.slice(0, 3).join(', ')})
                              represent working-class cultural practices that
                              resist gentrification through affordable pricing
                              and authentic community engagement.
                            </p>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Class Politics Evidence:
                              </strong>{' '}
                              The vendor demonstrates Scott's (1990) concept of
                              working-class cultural autonomy by maintaining
                              practices that serve local community needs rather
                              than tourist expectations. This supports the
                              argument that genuine cultural democracy requires
                              economic accessibility, not just cultural
                              inclusion.
                            </p>
                          </div>
                        )}
                        {vendor.markets[0].market.id ===
                          'kenting-night-market' && (
                          <div className='space-y-4'>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Regional Adaptation Analysis:
                              </strong>{' '}
                              {vendor.name} illustrates Appadurai's (1996)
                              "glocalization" concept through hybrid cultural
                              forms that balance local identity with tourism
                              demands. This vendor's specialties (
                              {vendor.specialties.slice(0, 3).join(', ')})
                              represent southern Taiwan's distinct food culture
                              adapted for seasonal tourism while maintaining
                              connections to local traditions.
                            </p>
                            <p className='text-neutral-300 leading-relaxed'>
                              <strong className='text-white'>
                                Hybrid Identity Evidence:
                              </strong>{' '}
                              The vendor demonstrates Robertson's (1995)
                              "glocal" cultural forms that are simultaneously
                              local and tourism-oriented, creating cultural
                              adaptations that satisfy both resident communities
                              and visitors without sacrificing essential
                              regional identity markers.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='bg-primary/10 rounded-lg p-6'>
                      <h3 className='text-lg font-semibold text-white mb-3'>
                        Contribution to Thesis Argument
                      </h3>
                      <p className='text-neutral-300 text-sm leading-relaxed'>
                        <strong className='text-white'>
                          Supporting Evidence:
                        </strong>{' '}
                        {vendor.name} provides concrete evidence for the broader
                        theoretical argument that Taiwan's night markets
                        function as contested cultural spaces where different
                        versions of "Taiwanese identity" are negotiated,
                        performed, and sometimes erased. This vendor's specific
                        strategies demonstrate how individual entrepreneurs
                        navigate post-colonial food politics and cultural
                        representation within commercial contexts, supporting
                        the {vendor.markets[0].market.name} case study's
                        analysis of{' '}
                        {vendor.markets[0].market.id ===
                          'shilin-night-market' &&
                          'identity commodification and cultural performance.'}
                        {vendor.markets[0].market.id ===
                          'raohe-street-market' &&
                          'minority culture preservation and strategic visibility.'}
                        {vendor.markets[0].market.id ===
                          'huaxi-street-market' &&
                          'working-class cultural autonomy and economic democracy.'}
                        {vendor.markets[0].market.id ===
                          'kenting-night-market' &&
                          'regional cultural adaptation and hybrid identity formation.'}
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Methodological Note */}
              <section className='bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8'>
                <h3 className='text-xl font-bold text-white mb-4'>
                  <span className='text-accent'>Research Ethics</span>
                </h3>
                <p className='text-neutral-300 text-sm leading-relaxed mb-4'>
                  This vendor profile was created with full consent and
                  represents observations from my fieldwork in Taiwan's night
                  markets. The vendor was informed about the research purpose
                  and agreed to participate.
                </p>
                <p className='text-neutral-400 text-xs'>
                  <strong>Privacy:</strong> Personal identifying information may
                  be anonymized to protect vendor privacy while preserving the
                  cultural and academic value of the documentation.
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className='space-y-8'>
              {/* Quick Info */}
              <div className='bg-neutral-900 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-white mb-4'>
                  Vendor Information
                </h3>
                <div className='space-y-3'>
                  {vendor.operatingHours && (
                    <div>
                      <p className='text-neutral-400 text-sm'>
                        Operating Hours
                      </p>
                      <p className='text-white'>{vendor.operatingHours}</p>
                    </div>
                  )}
                  {vendor.latitude && vendor.longitude && (
                    <div>
                      <p className='text-neutral-400 text-sm'>Location</p>
                      <p className='text-white text-xs'>
                        {vendor.latitude.toFixed(6)},{' '}
                        {vendor.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                  {vendor.markets && vendor.markets.length > 0 && (
                    <div>
                      <p className='text-neutral-400 text-sm'>Market</p>
                      <p className='text-white'>
                        {vendor.markets[0].market.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              {(vendor.contactPhone ||
                vendor.contactInstagram ||
                vendor.contactFacebook ||
                vendor.contactLine) && (
                <div className='bg-neutral-900 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Contact Information
                  </h3>
                  <div className='space-y-3'>
                    {vendor.contactPhone && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>📞</span>
                        <span className='text-white text-sm'>
                          {vendor.contactPhone}
                        </span>
                      </div>
                    )}
                    {vendor.contactInstagram && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>📷</span>
                        <span className='text-white text-sm'>
                          @{vendor.contactInstagram}
                        </span>
                      </div>
                    )}
                    {vendor.contactFacebook && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>📘</span>
                        <span className='text-white text-sm'>
                          {vendor.contactFacebook}
                        </span>
                      </div>
                    )}
                    {vendor.contactLine && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>💬</span>
                        <span className='text-white text-sm'>
                          {vendor.contactLine}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className='space-y-4'>
                {vendor.markets && vendor.markets.length > 0 && (
                  <Link
                    href={`/markets/${vendor.markets[0].market.id}`}
                    className='block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors text-center'
                  >
                    Visit {vendor.markets[0].market.name}
                  </Link>
                )}
                <Link
                  href='/vendors'
                  className='block w-full bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-lg border border-neutral-600 transition-colors text-center'
                >
                  View All Vendors
                </Link>
              </div>

              {/* Research Context */}
              <div className='bg-neutral-900 rounded-xl p-6'>
                <h3 className='text-lg font-bold text-white mb-3'>
                  Research Context
                </h3>
                <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                  This vendor documentation is part of a broader ethnographic
                  study of Taiwan's night market culture and food heritage.
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
                href='/vendors'
                className='text-primary hover:text-primary-light transition-colors'
              >
                ← Back to All Vendors
              </Link>
              {vendor.markets && vendor.markets.length > 0 && (
                <Link
                  href={`/explorer?market=${vendor.markets[0].market.id}`}
                  className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
                >
                  Explore in Map
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
