// Individual market analysis - detailed academic examination of cultural identity negotiation
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
  vendors?: Array<{
    vendor: {
      id: string
      name: string
      chineseName?: string
      description: string
      specialties: string[]
      images: string[]
      latitude?: number
      longitude?: number
    }
  }>
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

  // Helper function to truncate descriptions for card display
  const truncateDescription = (
    description: string,
    maxLength: number = 100
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

  // Market-specific theoretical frameworks

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
        <div className='max-w-5xl mx-auto'>
          {/* Simple Breadcrumb */}
          <nav className='mb-8'>
            <Link
              href='/markets'
              className='text-primary hover:text-primary-light transition-colors text-sm'
            >
              ← Back to Research Sites
            </Link>
          </nav>

          {/* Header */}
          <div className='mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              {market.name}
            </h1>
            <p className='text-xl text-neutral-300 mb-2'>
              {market.chineseName}
            </p>
            <p className='text-neutral-400 mb-4'>
              {market.location} • Established {market.established}
            </p>
            <div className='inline-block bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium'>
              Research Focus: {market.researchFocus}
            </div>
          </div>

          {/* Main Image */}
          <div className='relative h-80 rounded-lg overflow-hidden mb-12'>
            <Image
              src={market.image}
              alt={`${market.name} field site`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 1024px'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
            <div className='absolute bottom-4 left-4 text-white'>
              <p className='text-sm opacity-90'>Field Research Site</p>
              <p className='text-xl font-bold'>{market.name}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid md:grid-cols-3 gap-12'>
            {/* Primary Content */}
            <div className='md:col-span-2 space-y-12'>
              {/* Main Argument Section */}
              <section>
                {market.id === 'shilin-night-market' && (
                  <>
                    <h2 className='text-2xl font-bold text-white mb-6'>
                      Identity Commodification and Cultural Performance
                    </h2>
                    <div className='prose prose-lg prose-invert max-w-none'>
                      <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                        <strong className='text-white'>Topic Sentence:</strong>{' '}
                        Shilin Night Market shows how vendors strategically
                        perform "authentic Taiwanese culture" for tourist
                        consumption while maintaining separate cultural
                        practices for local customers, revealing the gap between
                        commodified identity and lived cultural experience.
                      </p>

                      <p className='text-neutral-300 leading-relaxed mb-6'>
                        {market.description}
                      </p>

                      <p className='text-neutral-300 leading-relaxed'>
                        This cultural performance dynamic aligns with Edward
                        Said's (1978) analysis of orientalism, where cultural
                        representations serve tourist expectations rather than
                        reflecting actual cultural practices. Vendors at Shilin
                        Night Market navigate what Said identifies as the power
                        relationship between observer and observed, adapting
                        their cultural presentations to match tourist
                        assumptions about "authentic Taiwan" while preserving
                        different cultural practices in interactions with local
                        customers. This demonstrates how tourism creates what
                        James C. Scott (1990) calls "public transcripts" -
                        performances of cultural authenticity that conceal more
                        complex cultural practices maintained in private
                        interactions.
                      </p>
                    </div>
                  </>
                )}

                {market.id === 'raohe-street-market' && (
                  <>
                    <h2 className='text-2xl font-bold text-white mb-6'>
                      Hakka Heritage Preservation in Urban Commercial Spaces
                    </h2>
                    <div className='prose prose-lg prose-invert max-w-none'>
                      <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                        <strong className='text-white'>Topic Sentence:</strong>{' '}
                        Raohe Street Market functions as a critical site for
                        Hakka cultural preservation within Taiwan's urban
                        commercial landscape, showing how minority vendors
                        maintain cultural distinctiveness while adapting to
                        mainstream market pressures and diverse customer
                        expectations.
                      </p>

                      <p className='text-neutral-300 leading-relaxed mb-6'>
                        {market.description}
                      </p>

                      <p className='text-neutral-300 leading-relaxed'>
                        This preservation dynamic illustrates Pierre Bourdieu's
                        (1984) concept of cultural capital operating within
                        minority cultural contexts. Hakka vendors at Raohe
                        Street Market deploy their distinct cultural knowledge -
                        traditional preparation methods, regional dialects,
                        family recipes - as forms of cultural capital that
                        differentiate their offerings within Taiwan's broader
                        culinary landscape. However, this cultural capital
                        operates within what Antonio Gramsci (2006) would
                        identify as hegemonic structures that privilege
                        mainstream Taiwanese/Chinese cultural practices,
                        requiring strategic navigation of cultural visibility
                        and adaptation.
                      </p>
                    </div>
                  </>
                )}

                {market.id === 'huaxi-street-market' && (
                  <>
                    <h2 className='text-2xl font-bold text-white mb-6'>
                      Working-Class Food Culture and Economic Accessibility
                    </h2>
                    <div className='prose prose-lg prose-invert max-w-none'>
                      <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                        <strong className='text-white'>Topic Sentence:</strong>{' '}
                        Huaxi Street Market demonstrates how night markets
                        function as democratic cultural spaces that transcend
                        economic boundaries, serving as community formation
                        sites for working-class populations while resisting
                        gentrification pressures through accessible pricing and
                        authentic cultural practices.
                      </p>

                      <p className='text-neutral-300 leading-relaxed mb-6'>
                        {market.description}
                      </p>

                      <p className='text-neutral-300 leading-relaxed'>
                        This working-class cultural space challenges Wu and
                        Lin's (2013) characterization of night markets as simply
                        "democratic cultural spaces" by revealing how
                        class-based economic accessibility creates genuinely
                        inclusive cultural participation. Following Henri
                        Lefebvre's (1968) concept of "the right to the city,"
                        Huaxi Street Market represents a space where economic
                        barriers to cultural participation are actively
                        minimized, creating what James C. Scott (1990) would
                        recognize as a space for working-class cultural autonomy
                        that operates outside middle-class cultural
                        institutions.
                      </p>
                    </div>
                  </>
                )}

                {market.id === 'kenting-night-market' && (
                  <>
                    <h2 className='text-2xl font-bold text-white mb-6'>
                      Tourism Economy and Regional Cultural Adaptation
                    </h2>
                    <div className='prose prose-lg prose-invert max-w-none'>
                      <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                        <strong className='text-white'>Topic Sentence:</strong>{' '}
                        Kenting Night Market reveals how seasonal tourism
                        economies shape regional food identity and cultural
                        performance in southern Taiwan, demonstrating adaptation
                        strategies that balance local fishing and agricultural
                        traditions with visitor expectations from Taiwan's beach
                        resort economy.
                      </p>

                      <p className='text-neutral-300 leading-relaxed mb-6'>
                        {market.description}
                      </p>

                      <p className='text-neutral-300 leading-relaxed'>
                        This regional adaptation process reflects what Arjun
                        Appadurai (1996) calls "glocalization" - the adaptation
                        of local cultural practices to global tourism flows
                        while maintaining regional distinctiveness. Vendors at
                        Kenting Night Market navigate between preserving
                        southern Taiwan's distinct food culture and adapting to
                        tourism expectations, creating what Roland Robertson
                        (1995) would identify as "glocal" cultural forms that
                        are simultaneously local and oriented toward global
                        tourism markets.
                      </p>
                    </div>
                  </>
                )}
              </section>

              {/* Evidence and Analysis */}
              <section className='bg-secondary-light rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  {market.id === 'shilin-night-market' &&
                    'Evidence: Cultural Performance and Tourist Adaptation'}
                  {market.id === 'raohe-street-market' &&
                    'Evidence: Hakka Cultural Markers and Intergenerational Knowledge Transfer'}
                  {market.id === 'huaxi-street-market' &&
                    'Evidence: Economic Accessibility and Community Formation'}
                  {market.id === 'kenting-night-market' &&
                    'Evidence: Seasonal Tourism Impacts and Regional Identity Adaptation'}
                </h2>
                <div className='prose prose-lg prose-invert max-w-none'>
                  <p className='text-neutral-300 leading-relaxed mb-4'>
                    <strong className='text-white'>Supporting Evidence:</strong>{' '}
                    {market.analyticalNote}
                  </p>

                  <p className='text-neutral-300 leading-relaxed'>
                    Following Chen and Huang's (2014) framework for analyzing
                    vendor behaviors, observations at {market.name} document
                    systematic patterns that support this theoretical analysis.
                    This evidence demonstrates how cultural identity operates as
                    both economic strategy and authentic cultural practice,
                    revealing the complex negotiations vendors make between
                    market pressures and cultural preservation.
                  </p>
                </div>
              </section>

              {/* Detailed Evidence Analysis */}
              <section>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Detailed Evidence Analysis
                </h2>
                <div className='space-y-6'>
                  {market.keyFindings.map((finding, index) => (
                    <div
                      key={index}
                      className='bg-neutral-900 rounded-lg p-6 border-l-4 border-primary'
                    >
                      <div className='flex items-start space-x-4'>
                        <div className='bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1'>
                          {index + 1}
                        </div>
                        <div className='prose prose-invert max-w-none'>
                          <p className='text-neutral-300 leading-relaxed mb-0'>
                            <strong className='text-white'>Observation:</strong>{' '}
                            {finding}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-8 prose prose-invert max-w-none'>
                  <p className='text-neutral-300 leading-relaxed'>
                    <strong className='text-white'>Analysis:</strong> These
                    observations support the central argument that cultural
                    identity at {market.name} works as strategic performance
                    rather than authentic preservation. The evidence shows how
                    vendors navigate what James C. Scott (1990) calls "hidden
                    transcripts." This means maintaining private cultural
                    practices while performing public versions adapted to
                    tourist expectations. This shows how post-colonial power
                    dynamics shape cultural representation in commercial spaces,
                    with vendors using cultural capital strategically to
                    maximize economic outcomes while preserving authentic
                    practices in private interactions.
                  </p>
                </div>
              </section>

              {/* Supporting Evidence: Vendors */}
              {market.vendors && market.vendors.length > 0 && (
                <section>
                  <h2 className='text-2xl font-bold text-white mb-6'>
                    Supporting Evidence: Vendor Examples
                  </h2>

                  <div className='prose prose-invert max-w-none mb-8'>
                    <p className='text-neutral-300 leading-relaxed'>
                      The vendors at {market.name} provide concrete examples of{' '}
                      <strong className='text-white'>
                        {market.id === 'shilin-night-market' &&
                          'identity commodification and cultural performance'}
                        {market.id === 'raohe-street-market' &&
                          'hakka heritage preservation strategies'}
                        {market.id === 'huaxi-street-market' &&
                          'working-class cultural practices'}
                        {market.id === 'kenting-night-market' &&
                          'regional cultural adaptation'}
                      </strong>{' '}
                      in practice. Each vendor demonstrates how individual
                      entrepreneurs navigate the cultural dynamics analyzed
                      above.
                    </p>
                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>
                    {market.vendors.map((vendorData, index) => (
                      <div
                        key={vendorData.vendor.id}
                        className='bg-neutral-900 rounded-lg p-6'
                      >
                        <div className='flex items-start space-x-4'>
                          {/* Vendor Image */}
                          <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0'>
                            {vendorData.vendor.images &&
                            vendorData.vendor.images.length > 0 ? (
                              <Image
                                src={vendorData.vendor.images[0]}
                                alt={`${vendorData.vendor.name} stall`}
                                fill
                                className='object-cover'
                                sizes='64px'
                              />
                            ) : (
                              <div className='flex items-center justify-center h-full text-neutral-500'>
                                <div className='text-2xl'>🏪</div>
                              </div>
                            )}
                          </div>

                          {/* Vendor Info */}
                          <div className='flex-1'>
                            <div className='flex items-start justify-between mb-3'>
                              <div>
                                <h3 className='text-lg font-semibold text-white mb-1'>
                                  {vendorData.vendor.name}
                                </h3>
                                {vendorData.vendor.chineseName && (
                                  <p className='text-neutral-400 text-sm mb-2'>
                                    {vendorData.vendor.chineseName}
                                  </p>
                                )}
                                <div className='flex flex-wrap gap-1 mb-3'>
                                  {vendorData.vendor.specialties
                                    .slice(0, 3)
                                    .map((specialty, i) => (
                                      <span
                                        key={i}
                                        className='bg-primary/20 text-primary px-2 py-1 rounded text-xs'
                                      >
                                        {specialty}
                                      </span>
                                    ))}
                                  {vendorData.vendor.specialties.length > 3 && (
                                    <span className='text-neutral-500 text-xs'>
                                      +
                                      {vendorData.vendor.specialties.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Link
                                href={`/vendors/${vendorData.vendor.id}`}
                                className='bg-primary hover:bg-primary-dark text-white font-medium py-1 px-3 rounded text-sm transition-colors'
                              >
                                Details
                              </Link>
                            </div>

                            <p className='text-neutral-300 text-sm leading-relaxed mb-3'>
                              {truncateDescription(
                                vendorData.vendor.description,
                                120
                              )}
                            </p>

                            <div className='bg-primary/10 rounded p-3'>
                              <p className='text-neutral-300 text-xs'>
                                <strong className='text-white'>
                                  Analysis:
                                </strong>{' '}
                                {market.id === 'shilin-night-market' &&
                                  'Demonstrates strategic cultural performance for tourist consumption.'}
                                {market.id === 'raohe-street-market' &&
                                  'Shows Hakka cultural preservation through strategic visibility.'}
                                {market.id === 'huaxi-street-market' &&
                                  'Embodies working-class cultural autonomy through economic accessibility.'}
                                {market.id === 'kenting-night-market' &&
                                  'Illustrates regional cultural adaptation to tourism demands.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='mt-8 text-center'>
                    <Link
                      href={`/vendors?market=${market.id}`}
                      className='inline-flex items-center text-primary hover:text-primary-light transition-colors font-medium'
                    >
                      Read detailed vendor analysis →
                    </Link>
                  </div>
                </section>
              )}

              {/* Conclusion and Broader Implications */}
              <section className='bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Conclusion:
                  {market.id === 'shilin-night-market' &&
                    'Identity Commodification and the Performance of Authenticity'}
                  {market.id === 'raohe-street-market' &&
                    'Minority Culture Preservation and Strategic Visibility'}
                  {market.id === 'huaxi-street-market' &&
                    'Working-Class Cultural Autonomy and Democratic Spaces'}
                  {market.id === 'kenting-night-market' &&
                    'Regional Cultural Adaptation to Tourism Economies'}
                </h2>
                <div className='prose prose-invert max-w-none space-y-4'>
                  {market.id === 'shilin-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Thesis Connection:</strong>{' '}
                      At Shilin, authenticity becomes a performance. Vendors
                      don't preserve traditional culture. They create it nightly
                      for tourists who want to buy "real Taiwan." This approach
                      to cultural identity challenges the idea that night
                      markets preserve anything authentic. Instead, they show
                      how cultural identity works as a commercial product.
                      Vendors are skilled performers who know exactly which
                      version of Taiwanese culture each audience wants to buy.
                    </p>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Thesis Connection:</strong>{' '}
                      Raohe Street Market works as a cultural battleground where
                      Hakka vendors fight for visibility without giving up their
                      identity. Unlike other markets where culture adapts to
                      commerce, here we see strategic resistance. Vendors
                      maintain Hakka practices while translating them for
                      broader audiences. This market proves that cultural
                      preservation isn't passive. It requires active negotiation
                      with dominant cultural systems that would otherwise erase
                      minority voices entirely.
                    </p>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Thesis Connection:</strong>{' '}
                      Huaxi Street Market exposes the class issues hidden in
                      discussions of cultural democracy. When scholars celebrate
                      night markets as "democratic spaces," they ignore how
                      economic barriers determine who gets to participate.
                      Working-class vendors here create genuine community
                      through shared economic struggle, not romantic ideas of
                      cultural preservation. Their solidarity challenges
                      academic theories that overlook the real conditions
                      shaping cultural expression.
                    </p>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Thesis Connection:</strong>{' '}
                      Kenting represents cultural adaptation in action. Vendors
                      refuse to choose between local identity and tourist
                      appeal. Rather than losing authenticity to
                      commercialization, they create hybrid cultural forms that
                      satisfy both communities. This market demonstrates that
                      cultural identity isn't static. It evolves through contact
                      with outside forces while maintaining connections to local
                      traditions that matter to resident communities.
                    </p>
                  )}

                  {market.id === 'shilin-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Counter-argument:</strong>{' '}
                      Tourism advocates might argue that Shilin Night Market
                      successfully preserves Taiwanese culture by making it
                      accessible to global audiences. They point to the market's
                      role in cultural diplomacy and economic development.
                      However, what tourists consume isn't preservation but
                      simulation. The "authentic" performances vendors create
                      for visitors often replace actual cultural practices,
                      leading to cultural hollowing rather than preservation.
                    </p>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Counter-argument:</strong>{' '}
                      Multiculturalism supporters might claim that Taiwan's
                      inclusive policies already protect Hakka culture, making
                      special advocacy unnecessary. They argue that night
                      markets naturally reflect Taiwan's cultural diversity. Yet
                      this view ignores how "inclusion" often means
                      assimilation. Without active resistance and strategic
                      visibility, minority cultures become background elements
                      in a dominant narrative rather than distinct cultural
                      voices.
                    </p>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Counter-argument:</strong>{' '}
                      Free market advocates might argue that economic
                      accessibility naturally creates democratic spaces,
                      pointing to low barriers to entry for vendors and
                      customers. They see market forces as inherently
                      democratic. This argument misses how economic democracy
                      requires more than low prices. It needs community
                      ownership, worker autonomy, and freedom from exploitation
                      by tourism industries that extract value from
                      working-class cultural practices.
                    </p>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>Counter-argument:</strong>{' '}
                      Development proponents might argue that tourism brings
                      necessary economic growth to southern Taiwan, and cultural
                      adaptation is a natural part of economic progress. They
                      view market changes as evolution, not loss. This
                      perspective overlooks how tourism development often
                      displaces local residents and replaces community-centered
                      practices with visitor-oriented performances, benefiting
                      outside investors more than local communities.
                    </p>
                  )}

                  {market.id === 'shilin-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Implications:
                      </strong>{' '}
                      Shilin's performance of authenticity reveals how cultural
                      identity becomes a commodity in global tourism markets.
                      This matters beyond night markets because it shows how
                      cultural diplomacy can accidentally destroy the cultures
                      it claims to promote. When countries use cultural sites to
                      attract foreign investment, they risk replacing living
                      traditions with profitable simulations. The vendor
                      strategies here provide a model for understanding cultural
                      commodification in tourist destinations worldwide.
                    </p>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Implications:
                      </strong>{' '}
                      Raohe Street Market's Hakka cultural resistance offers
                      lessons for minority communities facing cultural erasure
                      in globalized cities. The strategic visibility tactics
                      documented here show how marginalized groups can maintain
                      cultural distinctiveness without isolation. This research
                      contributes to understanding how minority cultures survive
                      in urban environments where dominant narratives threaten
                      to erase cultural differences through claims of inclusion
                      and multiculturalism.
                    </p>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Implications:
                      </strong>{' '}
                      Huaxi Street Market challenges academic theories about
                      cultural democracy by showing how class politics shape
                      cultural participation. The community solidarity
                      documented here provides an alternative to market-based
                      approaches to cultural development. This analysis
                      contributes to debates about gentrification, cultural
                      preservation, and economic justice by demonstrating how
                      working-class communities create genuine cultural
                      democracy through collective action rather than consumer
                      choice.
                    </p>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Implications:
                      </strong>{' '}
                      Kenting's cultural adaptation model shows how communities
                      can engage with tourism economies without losing local
                      identity. The hybrid cultural forms documented here offer
                      strategies for regions facing pressure from tourism
                      development. This research contributes to understanding
                      how peripheral areas can benefit from global economic
                      integration while maintaining cultural autonomy and
                      community control over development processes.
                    </p>
                  )}
                </div>
              </section>

              {/* Methodology and Reflexivity */}
              <section className='bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Research Methodology and Reflexive Notes
                </h2>

                <div className='prose prose-invert max-w-none space-y-4'>
                  {market.id === 'shilin-night-market' && (
                    <>
                      <p className='text-neutral-300 leading-relaxed'>
                        My research at Shilin focused on performance analysis,
                        tracking how vendors shift between different cultural
                        presentations for tourists versus local customers. I
                        used Edward Said's orientalism framework to analyze
                        tourist-vendor interactions, documenting language
                        switching, menu modifications, and spatial arrangements
                        designed for different audiences. Multiple evening
                        visits captured peak tourist hours alongside quieter
                        local dining periods.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        The methodology emphasized observing authenticity
                        performances rather than seeking "real" culture,
                        following James C. Scott's work on public transcripts. I
                        documented the theatrical elements vendors use to create
                        touristic experiences, including costume choices,
                        English-language signage, and price differentials
                        between tourist and local versions of similar foods.
                      </p>
                      <div className='bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6'>
                        <p className='text-neutral-400 text-sm mb-0'>
                          <strong className='text-accent'>
                            Researcher Position:
                          </strong>{' '}
                          As a foreign researcher, I was often categorized as a
                          tourist by vendors, giving me direct access to
                          tourist-oriented performances. This positioning
                          allowed me to document commodification processes but
                          limited access to vendor perspectives on cultural
                          authenticity.
                        </p>
                      </div>
                    </>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <>
                      <p className='text-neutral-300 leading-relaxed'>
                        Research at Raohe Street Market required careful
                        attention to language dynamics and cultural visibility
                        strategies. I documented Hakka language use, traditional
                        food preparation methods, and how vendors navigate
                        between Hakka identity maintenance and broader
                        commercial appeal. This involved mapping vendor
                        locations, analyzing signage choices, and tracking
                        cultural code-switching in customer interactions.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        Following Pierre Bourdieu's cultural capital framework,
                        I analyzed how Hakka vendors translate cultural
                        practices for different audiences without losing
                        cultural distinctiveness. The methodology emphasized
                        understanding strategic resistance rather than simple
                        cultural preservation, documenting active cultural
                        negotiation processes.
                      </p>
                      <div className='bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6'>
                        <p className='text-neutral-400 text-sm mb-0'>
                          <strong className='text-accent'>
                            Researcher Position:
                          </strong>{' '}
                          My limited Hakka language skills meant relying on
                          Mandarin interactions, potentially missing cultural
                          nuances in Hakka community conversations. This
                          research should be supplemented by Hakka community
                          voices with fuller access to internal cultural
                          discussions.
                        </p>
                      </div>
                    </>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <>
                      <p className='text-neutral-300 leading-relaxed'>
                        Fieldwork at Huaxi Street Market focused on economic
                        accessibility and community formation patterns. I
                        documented pricing structures, customer demographics,
                        and vendor support networks, using Henri Lefebvre's
                        "right to the city" framework to analyze how
                        working-class communities create cultural spaces.
                        Research emphasized community economics rather than
                        individual vendor strategies.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        The methodology prioritized understanding collective
                        action and mutual aid systems among vendors, following
                        James C. Scott's work on working-class autonomy. I
                        tracked how vendors share resources, coordinate
                        schedules, and resist tourism industry pressures that
                        would raise prices or change community character.
                      </p>
                      <div className='bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6'>
                        <p className='text-neutral-400 text-sm mb-0'>
                          <strong className='text-accent'>
                            Researcher Position:
                          </strong>{' '}
                          My middle-class background may have limited access to
                          working-class vendor networks and community
                          discussions. This analysis benefits from worker
                          perspective research and should be evaluated alongside
                          labor organizing and community development voices.
                        </p>
                      </div>
                    </>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <>
                      <p className='text-neutral-300 leading-relaxed'>
                        Research at Kenting Night Market examined cultural
                        adaptation processes and tourism-local community
                        negotiations. I used Arjun Appadurai's glocalization
                        framework to analyze how vendors create hybrid cultural
                        forms that satisfy both local traditions and visitor
                        expectations. This involved tracking seasonal changes,
                        tourist vs. local customer patterns, and regional
                        cultural maintenance.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        The methodology emphasized understanding cultural
                        evolution rather than loss, following Roland Robertson's
                        work on glocal cultural formation. I documented how
                        southern Taiwan regional identity adapts to tourism
                        pressures while maintaining community connections and
                        local cultural practices.
                      </p>
                      <div className='bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6'>
                        <p className='text-neutral-400 text-sm mb-0'>
                          <strong className='text-accent'>
                            Researcher Position:
                          </strong>{' '}
                          As a temporary visitor to Kenting, I may have missed
                          seasonal community dynamics and long-term cultural
                          changes. This research would benefit from longitudinal
                          local community perspectives on tourism development
                          impacts.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Digital Democratization Conclusion */}
              <section className='bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Digital Documentation and Cultural Democratization
                </h2>

                <div className='prose prose-invert max-w-none space-y-6'>
                  {market.id === 'shilin-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Digital documentation of Shilin Night Market reveals the
                      gap between tourist marketing and vendor realities. Unlike
                      promotional materials that emphasize "authentic Taiwanese
                      culture," this platform documents the performance
                      strategies vendors actually use. By making visible the
                      commercial nature of cultural authenticity, digital
                      platforms can help tourists engage more honestly with
                      cultural sites rather than consuming manufactured
                      authenticity.
                    </p>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Digital platforms offer Hakka vendors new opportunities
                      for cultural visibility outside mainstream media
                      representation. This documentation approach allows
                      minority voices to represent themselves directly rather
                      than being interpreted through dominant cultural
                      narratives. Digital tools can support strategic visibility
                      efforts by providing platforms for cultural expression
                      that don't depend on mainstream approval or commercial
                      viability.
                    </p>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Digital documentation of Huaxi Street Market challenges
                      academic theories about cultural access by making
                      working-class cultural practices visible to broader
                      audiences. This approach supports community organizing
                      efforts by documenting vendor solidarity and mutual aid
                      networks that resist tourism industry exploitation.
                      Digital platforms can democratize cultural representation
                      by prioritizing community voices over tourist convenience.
                    </p>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Digital documentation of Kenting Night Market provides a
                      model for representing cultural adaptation without
                      romanticizing either tradition or change. This platform
                      documents how communities negotiate tourism development
                      while maintaining cultural autonomy. Digital tools can
                      support regional communities by documenting successful
                      adaptation strategies that other tourism-dependent areas
                      might adopt.
                    </p>
                  )}

                  {market.id === 'shilin-night-market' && (
                    <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
                      <h3 className='text-xl font-semibold text-white mb-4'>
                        Digital Documentation and Tourist Education
                      </h3>
                      <div className='space-y-4 text-neutral-300'>
                        <p>
                          <strong className='text-primary'>
                            Performance Transparency:
                          </strong>{' '}
                          Digital platforms can help tourists understand
                          cultural performance as skilled work rather than
                          authentic tradition, creating more honest tourism
                          relationships.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Vendor Agency Recognition:
                          </strong>{' '}
                          Documentation that reveals vendor strategies
                          challenges tourist assumptions about cultural
                          authenticity while respecting vendor economic needs.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Cultural Labor Visibility:
                          </strong>{' '}
                          Digital tools can document the skilled cultural work
                          vendors perform without romanticizing cultural
                          commodification processes.
                        </p>
                      </div>
                    </div>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
                      <h3 className='text-xl font-semibold text-white mb-4'>
                        Digital Platforms and Minority Cultural Support
                      </h3>
                      <div className='space-y-4 text-neutral-300'>
                        <p>
                          <strong className='text-primary'>
                            Strategic Visibility Tools:
                          </strong>{' '}
                          Digital platforms can support Hakka cultural
                          resistance by providing spaces for
                          community-controlled representation outside mainstream
                          media.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Cultural Defense Documentation:
                          </strong>{' '}
                          Online tools can preserve minority cultural practices
                          while supporting strategic negotiations with dominant
                          cultural systems.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Community Network Building:
                          </strong>{' '}
                          Digital spaces can connect dispersed minority
                          communities and support cultural preservation through
                          community organizing rather than external exhibition.
                        </p>
                      </div>
                    </div>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
                      <h3 className='text-xl font-semibold text-white mb-4'>
                        Digital Documentation and Working-Class Organizing
                      </h3>
                      <div className='space-y-4 text-neutral-300'>
                        <p>
                          <strong className='text-primary'>
                            Community Solidarity Documentation:
                          </strong>{' '}
                          Digital platforms can document working-class mutual
                          aid networks and collective action strategies that
                          resist tourism commodification.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Economic Justice Focus:
                          </strong>{' '}
                          Online documentation can prioritize vendor economic
                          rights and community organizing over cultural
                          preservation that benefits academic or tourist
                          consumption.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Anti-Gentrification Tools:
                          </strong>{' '}
                          Digital platforms can support community resistance to
                          gentrification by documenting working-class cultural
                          practices without making them appealing to
                          middle-class consumers.
                        </p>
                      </div>
                    </div>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <div className='bg-primary/5 border border-primary/20 rounded-lg p-6'>
                      <h3 className='text-xl font-semibold text-white mb-4'>
                        Digital Tools for Regional Community Control
                      </h3>
                      <div className='space-y-4 text-neutral-300'>
                        <p>
                          <strong className='text-primary'>
                            Local Development Support:
                          </strong>{' '}
                          Digital platforms can help regional communities
                          maintain control over tourism development by
                          documenting successful adaptation strategies.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Cultural Autonomy Documentation:
                          </strong>{' '}
                          Online tools can preserve regional cultural practices
                          while supporting community capacity to negotiate with
                          external tourism pressures.
                        </p>
                        <p>
                          <strong className='text-primary'>
                            Economic Independence Building:
                          </strong>{' '}
                          Digital documentation can support local economic
                          development that benefits resident communities rather
                          than external tourism industries.
                        </p>
                      </div>
                    </div>
                  )}

                  {market.id === 'shilin-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Tourist-oriented digital platforms risk reproducing the
                      same performance dynamics they claim to document. At
                      Shilin, creating genuine transparency requires
                      acknowledging that any external documentation participates
                      in the commodification process. Digital tools succeed when
                      they help tourists recognize cultural performance rather
                      than pretending to offer access to "authentic" culture.
                    </p>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Digital documentation of minority cultures must avoid
                      tokenism and cultural appropriation. For Hakka
                      communities, external documentation only supports cultural
                      preservation when it amplifies rather than replaces
                      community-controlled representation. Digital platforms
                      succeed when they provide tools for strategic visibility
                      rather than treating minority cultures as exotic subjects.
                    </p>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Working-class cultural documentation must resist academic
                      extraction and tourism commodification. At Huaxi, digital
                      platforms risk gentrification if they make working-class
                      spaces appealing to middle-class consumers. Responsible
                      documentation prioritizes community organizing and
                      economic justice over cultural preservation that benefits
                      outside observers.
                    </p>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <p className='text-neutral-300 leading-relaxed'>
                      Regional communities need control over how their cultural
                      adaptation gets represented to outside audiences. Digital
                      documentation of Kenting must avoid romanticizing either
                      tradition or change, instead supporting community capacity
                      to negotiate tourism development on their own terms.
                      Effective platforms provide tools for local economic
                      development rather than external cultural consumption.
                    </p>
                  )}

                  {market.id === 'shilin-night-market' && (
                    <div className='bg-accent/5 border border-accent/20 rounded-lg p-4'>
                      <p className='text-neutral-400 text-sm'>
                        <strong className='text-accent'>
                          Critical Reflection:
                        </strong>{' '}
                        This platform participates in the cultural
                        commodification it analyzes by making Shilin's
                        performance strategies visible to tourists. The
                        documentation process itself becomes part of the tourism
                        economy, potentially helping vendors refine their
                        authenticity performances for better commercial results.
                      </p>
                    </div>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <div className='bg-accent/5 border border-accent/20 rounded-lg p-4'>
                      <p className='text-neutral-400 text-sm'>
                        <strong className='text-accent'>
                          Critical Reflection:
                        </strong>{' '}
                        External documentation of Hakka cultural strategies
                        risks exposing defensive tactics to dominant cultural
                        systems that might adapt to counter them. This research
                        should be evaluated by Hakka community members who can
                        determine whether academic visibility supports or
                        undermines strategic cultural resistance.
                      </p>
                    </div>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <div className='bg-accent/5 border border-accent/20 rounded-lg p-4'>
                      <p className='text-neutral-400 text-sm'>
                        <strong className='text-accent'>
                          Critical Reflection:
                        </strong>{' '}
                        Academic documentation of working-class cultural
                        practices can contribute to gentrification by making
                        these spaces attractive to middle-class consumers. This
                        research must prioritize vendor economic interests over
                        academic publishing goals and should support community
                        organizing rather than cultural tourism.
                      </p>
                    </div>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <div className='bg-accent/5 border border-accent/20 rounded-lg p-4'>
                      <p className='text-neutral-400 text-sm'>
                        <strong className='text-accent'>
                          Critical Reflection:
                        </strong>{' '}
                        Regional cultural documentation can influence tourism
                        development in ways that benefit external developers
                        more than local communities. This research should
                        support local control over development processes rather
                        than providing marketing materials for tourism
                        industries that extract value from regional cultural
                        practices.
                      </p>
                    </div>
                  )}

                  {market.id === 'shilin-night-market' && (
                    <p className='text-neutral-400 text-sm mt-6'>
                      This Shilin analysis demonstrates how digital
                      documentation can reveal cultural commodification
                      processes while acknowledging its own participation in
                      those dynamics. The goal is transparency about
                      authenticity performance rather than claims of cultural
                      preservation.
                    </p>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <p className='text-neutral-400 text-sm mt-6'>
                      This Raohe analysis shows how digital platforms can
                      support minority cultural visibility when controlled by
                      communities themselves. The documentation emphasizes
                      strategic resistance rather than cultural exhibition for
                      external audiences.
                    </p>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <p className='text-neutral-400 text-sm mt-6'>
                      This Huaxi analysis demonstrates how digital documentation
                      can support working-class community organizing when it
                      prioritizes economic justice over cultural preservation.
                      The focus is community solidarity rather than academic or
                      tourist consumption.
                    </p>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <p className='text-neutral-400 text-sm mt-6'>
                      This Kenting analysis shows how digital documentation can
                      support regional community control over tourism
                      development. The emphasis is local economic autonomy
                      rather than external cultural representation.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className='space-y-8'>
              {/* Research Details */}
              <div className='bg-neutral-900 rounded-lg p-6'>
                <h3 className='text-lg font-bold text-white mb-4'>
                  Research Details
                </h3>
                <div className='space-y-3 text-sm'>
                  <div>
                    <p className='text-neutral-400'>Location</p>
                    <p className='text-white'>{market.location}</p>
                  </div>
                  <div>
                    <p className='text-neutral-400'>Established</p>
                    <p className='text-white'>{market.established}</p>
                  </div>
                  <div>
                    <p className='text-neutral-400'>Research Focus</p>
                    <p className='text-white'>{market.researchFocus}</p>
                  </div>
                  <div>
                    <p className='text-neutral-400'>Vendors Documented</p>
                    <p className='text-white'>{market.vendors?.length || 0}</p>
                  </div>
                  <div>
                    <p className='text-neutral-400'>Key Findings</p>
                    <p className='text-white'>{market.keyFindings.length}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className='space-y-3'>
                <Link
                  href={`/vendors?market=${market.id}`}
                  className='block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors text-center'
                >
                  View All Vendor Profiles
                </Link>
                <Link
                  href={`/explorer?market=${market.id}`}
                  className='block w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-4 rounded-lg transition-colors text-center'
                >
                  Explore on Interactive Map
                </Link>
                <Link
                  href='/markets'
                  className='block w-full bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-lg border border-neutral-600 transition-colors text-center'
                >
                  All Research Sites
                </Link>
              </div>

              {/* Sources */}
              <div className='bg-neutral-900 rounded-lg p-6'>
                <h3 className='text-lg font-bold text-white mb-4'>
                  Theoretical Sources
                </h3>
                <div className='space-y-3 text-sm'>
                  <div>
                    <p className='text-white font-medium'>
                      Said, Edward (1978)
                    </p>
                    <p className='text-neutral-400'>
                      Orientalism - power dynamics in cultural representation
                    </p>
                  </div>
                  <div>
                    <p className='text-white font-medium'>
                      Bourdieu, Pierre (1984)
                    </p>
                    <p className='text-neutral-400'>
                      Cultural capital theory and social distinction
                    </p>
                  </div>
                  <div>
                    <p className='text-white font-medium'>
                      Scott, James C. (1990)
                    </p>
                    <p className='text-neutral-400'>
                      Hidden transcripts and resistance strategies
                    </p>
                  </div>
                  <div>
                    <p className='text-white font-medium'>
                      Chen & Huang (2014)
                    </p>
                    <p className='text-neutral-400'>
                      Vendor behavior analysis framework
                    </p>
                  </div>
                  <div>
                    <p className='text-white font-medium'>Wu & Lin (2013)</p>
                    <p className='text-neutral-400'>
                      Night markets as democratic spaces (critiqued)
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Research */}
              <div className='bg-neutral-900 rounded-lg p-6'>
                <h3 className='text-lg font-bold text-white mb-3'>
                  Related Research
                </h3>
                {market.id === 'shilin-night-market' && (
                  <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                    This Shilin analysis connects to broader research on
                    cultural commodification in tourist destinations and the
                    performance of authenticity in global tourism markets.
                  </p>
                )}
                {market.id === 'raohe-street-market' && (
                  <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                    This Raohe analysis contributes to studies of minority
                    cultural preservation and strategic resistance in urban
                    environments with dominant cultural systems.
                  </p>
                )}
                {market.id === 'huaxi-street-market' && (
                  <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                    This Huaxi analysis connects to research on working-class
                    cultural autonomy, economic justice, and community
                    organizing in gentrifying urban areas.
                  </p>
                )}
                {market.id === 'kenting-night-market' && (
                  <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                    This Kenting analysis contributes to studies of regional
                    cultural adaptation, tourism development, and community
                    control over economic change processes.
                  </p>
                )}
                <Link
                  href='/about'
                  className='text-primary hover:text-primary-light text-sm transition-colors'
                >
                  Learn more about this research →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className='mt-16 pt-8 border-t border-neutral-800'>
            <div className='flex justify-between items-center'>
              <Link
                href='/markets'
                className='text-primary hover:text-primary-light transition-colors'
              >
                ← Back to All Research Sites
              </Link>
              <Link
                href={`/explorer?market=${market.id}`}
                className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
              >
                View on Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
