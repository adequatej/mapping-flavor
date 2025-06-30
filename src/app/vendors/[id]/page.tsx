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
  const [showAcademicAnalysis, setShowAcademicAnalysis] = useState(false)

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
          <div className='max-w-4xl mx-auto space-y-12'>
            {/* About This Vendor - Personal Story */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-6'>
                About This Vendor
              </h2>
              <div className='prose prose-lg prose-invert max-w-none'>
                <p className='text-neutral-300 leading-relaxed text-lg'>
                  {vendor.description}
                </p>
              </div>
            </section>

            {/* Cultural Significance */}
            {vendor.culturalSignificance && (
              <section className='bg-secondary-light rounded-xl p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  🏮 Cultural Heritage & Traditions
                </h2>
                <div className='prose prose-lg prose-invert max-w-none'>
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    {vendor.culturalSignificance}
                  </p>
                </div>
              </section>
            )}

            {/* Research Observations */}
            {vendor.researchNotes && (
              <section>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  👁️ Field Research Observations
                </h2>
                <div className='bg-neutral-900 rounded-lg p-6 border-l-4 border-primary'>
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    {vendor.researchNotes}
                  </p>
                </div>

                {/* Transition to academic analysis */}
                <div className='bg-accent/10 rounded-lg p-4 mt-6'>
                  <p className='text-neutral-300 text-sm leading-relaxed'>
                    <strong className='text-white'>Academic Context:</strong>{' '}
                    These observations connect to broader theoretical frameworks
                    about cultural identity politics in Taiwan's night markets.
                    The detailed academic analysis below shows how this vendor's
                    strategies demonstrate complex cultural dynamics within
                    commercial spaces.
                  </p>
                </div>
              </section>
            )}

            {/* Key Insight Box - Always Visible */}
            <section className='bg-primary/10 rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                How This Vendor Demonstrates Market Dynamics
              </h2>
              {vendor.markets && vendor.markets.length > 0 && (
                <p className='text-neutral-300 leading-relaxed'>
                  <strong className='text-white'>{vendor.name}</strong> provides
                  concrete evidence of{' '}
                  {vendor.markets[0].market.id === 'shilin-night-market' &&
                    'identity commodification and cultural performance strategies'}
                  {vendor.markets[0].market.id === 'raohe-street-market' &&
                    'Hakka heritage preservation through strategic visibility'}
                  {vendor.markets[0].market.id === 'huaxi-street-market' &&
                    'working-class cultural autonomy and economic accessibility'}
                  {vendor.markets[0].market.id === 'kenting-night-market' &&
                    'regional cultural adaptation to tourism demands'}{' '}
                  at{' '}
                  <Link
                    href={`/markets/${vendor.markets[0].market.id}`}
                    className='text-primary hover:text-primary-light underline'
                  >
                    {vendor.markets[0].market.name}
                  </Link>
                  . This individual case study demonstrates how the theoretical
                  patterns identified in market analysis work in practice.
                </p>
              )}
            </section>

            {/* Collapsible Academic Analysis */}
            <section className='bg-secondary-light rounded-xl p-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-white'>
                  📚{' '}
                  <span className='text-primary'>
                    Detailed Academic Analysis
                  </span>
                </h2>
                <button
                  onClick={() => setShowAcademicAnalysis(!showAcademicAnalysis)}
                  className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
                >
                  {showAcademicAnalysis
                    ? 'Hide Analysis'
                    : 'Show Academic Analysis'}
                </button>
              </div>

              {showAcademicAnalysis && (
                <div className='border-t border-neutral-700 pt-6'>
                  <h3 className='text-xl font-bold text-white mb-4'>
                    Cultural Identity Politics Framework
                  </h3>

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
                                Said's (1978) orientalist dynamics by
                                constructing tourist-friendly versions of
                                "authentic Taiwanese culture." This vendor
                                exhibits what Scott (1990) calls "public
                                transcripts" - performing cultural authenticity
                                for tourist consumption while potentially
                                maintaining different practices for local
                                customers.
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
                                {vendor.name} exemplifies how Hakka vendors
                                deploy Bourdieu's (1984) concept of cultural
                                capital within minority cultural contexts. This
                                vendor maintains cultural distinctiveness
                                through specialties (
                                {vendor.specialties.slice(0, 3).join(', ')})
                                that mark Hakka identity while making it
                                accessible to broader audiences.
                              </p>
                              <p className='text-neutral-300 leading-relaxed'>
                                <strong className='text-white'>
                                  Resistance Evidence:
                                </strong>{' '}
                                The vendor navigates Gramsci's (2006) hegemonic
                                structures that privilege mainstream cultural
                                practices by strategically highlighting Hakka
                                cultural markers. This demonstrates minority
                                culture preservation through strategic
                                visibility rather than isolation, showing active
                                resistance to cultural erasure.
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
                                {vendor.name} embodies Lefebvre's (1968) "right
                                to the city" concept through economic
                                accessibility that creates genuine cultural
                                participation. This vendor's specialties (
                                {vendor.specialties.slice(0, 3).join(', ')})
                                represent working-class cultural practices that
                                resist gentrification through affordable pricing
                                and authentic community engagement.
                              </p>
                              <p className='text-neutral-300 leading-relaxed'>
                                <strong className='text-white'>
                                  Class Politics Evidence:
                                </strong>{' '}
                                The vendor demonstrates Scott's (1990) concept
                                of working-class cultural autonomy by
                                maintaining practices that serve local community
                                needs rather than tourist expectations. This
                                supports the argument that genuine cultural
                                democracy requires economic accessibility, not
                                just cultural inclusion.
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
                                represent southern Taiwan's distinct food
                                culture adapted for seasonal tourism while
                                maintaining connections to local traditions.
                              </p>
                              <p className='text-neutral-300 leading-relaxed'>
                                <strong className='text-white'>
                                  Hybrid Identity Evidence:
                                </strong>{' '}
                                The vendor demonstrates Robertson's (1995)
                                "glocal" cultural forms that are simultaneously
                                local and tourism-oriented, creating cultural
                                adaptations that satisfy both resident
                                communities and visitors without sacrificing
                                essential regional identity markers.
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
                          {vendor.name} provides concrete evidence for the
                          broader theoretical argument that Taiwan's night
                          markets function as contested cultural spaces where
                          different versions of "Taiwanese identity" are
                          negotiated, performed, and sometimes erased. This
                          vendor's specific strategies demonstrate how
                          individual entrepreneurs navigate post-colonial food
                          politics and cultural representation within commercial
                          contexts, supporting the{' '}
                          {vendor.markets[0].market.name} case study's analysis
                          of{' '}
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
                </div>
              )}
            </section>

            {/* Simple Conclusion */}
            <section className='bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                What This Vendor Demonstrates
              </h2>
              <div className='prose prose-invert max-w-none'>
                {vendor.markets && vendor.markets.length > 0 && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    <strong className='text-white'>{vendor.name}</strong>{' '}
                    demonstrates how individual vendors navigate the cultural
                    dynamics of{' '}
                    <Link
                      href={`/markets/${vendor.markets[0].market.id}`}
                      className='text-primary hover:text-primary-light underline'
                    >
                      {vendor.markets[0].market.name}
                    </Link>
                    {vendor.markets[0].market.id === 'shilin-night-market' &&
                      ', showing how vendors strategically perform culture for different audiences while balancing economic survival with cultural authenticity.'}
                    {vendor.markets[0].market.id === 'raohe-street-market' &&
                      ", showing how Hakka vendors maintain cultural visibility and community connection within Taiwan's diverse urban landscape."}
                    {vendor.markets[0].market.id === 'huaxi-street-market' &&
                      ', showing how working-class vendors create genuine community spaces through economic accessibility and authentic cultural practices.'}
                    {vendor.markets[0].market.id === 'kenting-night-market' &&
                      ', showing how local vendors adapt regional traditions to tourism while maintaining connections to community and place.'}{' '}
                    This case study provides concrete evidence for how Taiwan's
                    night markets function as contested cultural spaces where
                    vendors actively negotiate identity, economics, and cultural
                    representation.
                  </p>
                )}
              </div>
            </section>

            {/* Research Ethics and Methodology */}
            <section className='bg-neutral-900 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Research Ethics & Methodology
              </h2>

              <div className='grid md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Ethical Research Practices
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <p className='text-neutral-300 leading-relaxed'>
                      This vendor profile was created with full consent and
                      represents observations from my fieldwork in Taiwan's
                      night markets. The vendor was informed about the research
                      purpose and agreed to participate.
                    </p>
                    <p className='text-neutral-400'>
                      <strong className='text-neutral-300'>
                        Privacy Protection:
                      </strong>{' '}
                      Personal identifying information may be anonymized to
                      protect vendor privacy while preserving the cultural and
                      academic value of the documentation.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Research Context
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <p className='text-neutral-300 leading-relaxed'>
                      This vendor documentation is part of a broader
                      ethnographic study of Taiwan's night market culture and
                      cultural identity politics in commercial spaces.
                    </p>
                    <Link
                      href='/about'
                      className='text-primary hover:text-primary-light transition-colors inline-block'
                    >
                      Learn more about this research methodology →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            {/* Vendor Information - Inline */}
            <section className='bg-neutral-900 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Vendor Information & Contact
              </h2>

              <div className='grid md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Operating Details
                  </h3>
                  <div className='space-y-3 text-sm'>
                    {vendor.operatingHours && (
                      <div>
                        <p className='text-neutral-400'>Operating Hours</p>
                        <p className='text-neutral-300'>
                          {vendor.operatingHours}
                        </p>
                      </div>
                    )}
                    {vendor.latitude && vendor.longitude && (
                      <div>
                        <p className='text-neutral-400'>Location Coordinates</p>
                        <p className='text-neutral-300'>
                          {vendor.latitude.toFixed(6)},{' '}
                          {vendor.longitude.toFixed(6)}
                        </p>
                      </div>
                    )}
                    {vendor.markets && vendor.markets.length > 0 && (
                      <div>
                        <p className='text-neutral-400'>Market Location</p>
                        <p className='text-neutral-300'>
                          {vendor.markets[0].market.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {(vendor.contactPhone ||
                  vendor.contactInstagram ||
                  vendor.contactFacebook ||
                  vendor.contactLine) && (
                  <div>
                    <h3 className='text-lg font-bold text-white mb-4'>
                      Contact Information
                    </h3>
                    <div className='space-y-3 text-sm'>
                      {vendor.contactPhone && (
                        <div className='flex items-center space-x-3'>
                          <span className='text-neutral-400'>📞</span>
                          <span className='text-neutral-300'>
                            {vendor.contactPhone}
                          </span>
                        </div>
                      )}
                      {vendor.contactInstagram && (
                        <div className='flex items-center space-x-3'>
                          <span className='text-neutral-400'>📷</span>
                          <span className='text-neutral-300'>
                            @{vendor.contactInstagram}
                          </span>
                        </div>
                      )}
                      {vendor.contactFacebook && (
                        <div className='flex items-center space-x-3'>
                          <span className='text-neutral-400'>📘</span>
                          <span className='text-neutral-300'>
                            {vendor.contactFacebook}
                          </span>
                        </div>
                      )}
                      {vendor.contactLine && (
                        <div className='flex items-center space-x-3'>
                          <span className='text-neutral-400'>💬</span>
                          <span className='text-neutral-300'>
                            {vendor.contactLine}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Navigation Actions */}
            <section className='text-center space-y-4'>
              <div className='flex flex-wrap justify-center gap-4'>
                {vendor.markets && vendor.markets.length > 0 && (
                  <Link
                    href={`/markets/${vendor.markets[0].market.id}`}
                    className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
                  >
                    Visit {vendor.markets[0].market.name}
                  </Link>
                )}
                <Link
                  href={`/explorer?market=${vendor.markets?.[0]?.market?.id || ''}`}
                  className='bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
                >
                  Explore on Interactive Map
                </Link>
                <Link
                  href='/vendors'
                  className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors'
                >
                  All Vendor Profiles
                </Link>
              </div>
            </section>
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
