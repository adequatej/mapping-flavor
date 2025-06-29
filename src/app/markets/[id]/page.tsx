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
  const getMarketTheory = (marketId: string, marketName: string) => {
    switch (marketId) {
      case 'shilin-night-market':
        return {
          title: 'Identity Commodification and Cultural Performance',
          topicSentence: `${marketName} shows how vendors strategically perform "authentic Taiwanese culture" for tourist consumption while maintaining separate cultural practices for local customers, revealing the gap between commodified identity and lived cultural experience.`,
          theoreticalConnection: `This cultural performance dynamic aligns with Edward Said's (1978) analysis of orientalism, where cultural representations serve tourist expectations rather than reflecting actual cultural practices. Vendors at ${marketName} navigate what Said identifies as the power relationship between observer and observed, adapting their cultural presentations to match tourist assumptions about "authentic Taiwan" while preserving different cultural practices in interactions with local customers. This demonstrates how tourism creates what James C. Scott (1990) calls "public transcripts" - performances of cultural authenticity that conceal more complex cultural practices maintained in private interactions.`,
          evidenceTitle:
            'Evidence: Cultural Performance and Tourist Adaptation',
          conclusionFocus:
            'identity commodification and the performance of authenticity in tourist-oriented commercial spaces',
        }
      case 'raohe-street-market':
        return {
          title: 'Hakka Heritage Preservation in Urban Commercial Spaces',
          topicSentence: `${marketName} functions as a critical site for Hakka cultural preservation within Taiwan's urban commercial landscape, showing how minority vendors maintain cultural distinctiveness while adapting to mainstream market pressures and diverse customer expectations.`,
          theoreticalConnection: `This preservation dynamic illustrates Pierre Bourdieu's (1984) concept of cultural capital operating within minority cultural contexts. Hakka vendors at ${marketName} deploy their distinct cultural knowledge - traditional preparation methods, regional dialects, family recipes - as forms of cultural capital that differentiate their offerings within Taiwan's broader culinary landscape. However, this cultural capital operates within what Antonio Gramsci would identify as hegemonic structures that privilege mainstream Taiwanese/Chinese cultural practices, requiring strategic navigation of cultural visibility and adaptation.`,
          evidenceTitle:
            'Evidence: Hakka Cultural Markers and Intergenerational Knowledge Transfer',
          conclusionFocus:
            'minority culture preservation and the strategic visibility of Hakka identity within dominant cultural spaces',
        }
      case 'huaxi-street-market':
        return {
          title: 'Working-Class Food Culture and Economic Accessibility',
          topicSentence: `${marketName} demonstrates how night markets function as democratic cultural spaces that transcend economic boundaries, serving as community formation sites for working-class populations while resisting gentrification pressures through accessible pricing and authentic cultural practices.`,
          theoreticalConnection: `This working-class cultural space challenges Wu and Lin's (2013) characterization of night markets as simply "democratic cultural spaces" by revealing how class-based economic accessibility creates genuinely inclusive cultural participation. Following Henri Lefebvre's concept of "the right to the city," ${marketName} represents a space where economic barriers to cultural participation are actively minimized, creating what James C. Scott (1990) would recognize as a space for working-class cultural autonomy that operates outside middle-class cultural institutions.`,
          evidenceTitle:
            'Evidence: Economic Accessibility and Community Formation',
          conclusionFocus:
            'working-class cultural autonomy and the role of economic accessibility in creating genuinely democratic cultural spaces',
        }
      case 'kenting-night-market':
        return {
          title: 'Tourism Economy and Regional Cultural Adaptation',
          topicSentence: `${marketName} reveals how seasonal tourism economies shape regional food identity and cultural performance in southern Taiwan, demonstrating adaptation strategies that balance local fishing and agricultural traditions with visitor expectations from Taiwan's beach resort economy.`,
          theoreticalConnection: `This regional adaptation process reflects what Arjun Appadurai calls "glocalization" - the adaptation of local cultural practices to global tourism flows while maintaining regional distinctiveness. Vendors at ${marketName} navigate between preserving southern Taiwan's distinct food culture and adapting to tourism expectations, creating what Roland Robertson would identify as "glocal" cultural forms that are simultaneously local and oriented toward global tourism markets.`,
          evidenceTitle:
            'Evidence: Seasonal Tourism Impacts and Regional Identity Adaptation',
          conclusionFocus:
            'regional cultural adaptation to tourism economies and the negotiation between local identity and visitor expectations',
        }
      default:
        return {
          title: 'Cultural Identity Negotiation',
          topicSentence: `${marketName} shows how vendors strategically navigate cultural identity performance while maintaining authentic cultural practices.`,
          theoreticalConnection: `This cultural dynamic illustrates broader patterns of identity negotiation in commercial spaces.`,
          evidenceTitle:
            'Evidence: Cultural Performance and Identity Navigation',
          conclusionFocus: 'cultural identity negotiation in commercial spaces',
        }
    }
  }

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

  const theory = getMarketTheory(market.id, market.name)

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
                <h2 className='text-2xl font-bold text-white mb-6'>
                  {theory.title}
                </h2>
                <div className='prose prose-lg prose-invert max-w-none'>
                  <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                    <strong className='text-white'>Topic Sentence:</strong>{' '}
                    {theory.topicSentence}
                  </p>

                  <p className='text-neutral-300 leading-relaxed mb-6'>
                    {market.description}
                  </p>

                  <p className='text-neutral-300 leading-relaxed'>
                    {theory.theoreticalConnection}
                  </p>
                </div>
              </section>

              {/* Evidence and Analysis */}
              <section className='bg-secondary-light rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  {theory.evidenceTitle}
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

              {/* Vendors Documentation */}
              {market.vendors && market.vendors.length > 0 && (
                <section>
                  <h2 className='text-2xl font-bold text-white mb-6'>
                    Vendor Profiles and Cultural Analysis
                  </h2>

                  <div className='prose prose-invert max-w-none mb-8'>
                    <p className='text-neutral-300 leading-relaxed'>
                      The vendors at {market.name} represent an interesting
                      cross-section of how individual entrepreneurs handle
                      broader cultural and economic pressures. Following Wu and
                      Lin's (2013) methodology, I focused on understanding how
                      each vendor creates what they call "attractiveness" for
                      different audiences while keeping their own cultural
                      identity.
                    </p>
                  </div>

                  <div className='space-y-8'>
                    {market.vendors.map((vendorData, index) => (
                      <div
                        key={vendorData.vendor.id}
                        className='bg-neutral-900 rounded-lg p-6'
                      >
                        <div className='flex items-start space-x-6'>
                          {/* Vendor Image */}
                          <div className='relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0'>
                            {vendorData.vendor.images &&
                            vendorData.vendor.images.length > 0 ? (
                              <Image
                                src={vendorData.vendor.images[0]}
                                alt={`${vendorData.vendor.name} stall`}
                                fill
                                className='object-cover'
                                sizes='80px'
                              />
                            ) : (
                              <div className='flex items-center justify-center h-full text-neutral-500'>
                                <div className='text-2xl'>🏪</div>
                              </div>
                            )}
                          </div>

                          {/* Vendor Analysis */}
                          <div className='flex-1'>
                            <div className='flex items-start justify-between mb-4'>
                              <div>
                                <h3 className='text-lg font-semibold text-white mb-1'>
                                  {vendorData.vendor.name}
                                </h3>
                                {vendorData.vendor.chineseName && (
                                  <p className='text-neutral-400 text-sm mb-3'>
                                    {vendorData.vendor.chineseName}
                                  </p>
                                )}
                                <div className='flex flex-wrap gap-2 mb-4'>
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
                                      {vendorData.vendor.specialties.length - 3}{' '}
                                      more
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Link
                                href={`/vendors/${vendorData.vendor.id}`}
                                className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
                              >
                                Full Profile
                              </Link>
                            </div>

                            <div className='prose prose-sm prose-invert max-w-none'>
                              <p className='text-neutral-300 leading-relaxed'>
                                {truncateDescription(
                                  vendorData.vendor.description,
                                  150
                                )}
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
                      className='inline-flex items-center text-primary hover:text-primary-light transition-colors'
                    >
                      Read detailed analysis of all {market.vendors.length}{' '}
                      vendors →
                    </Link>
                  </div>
                </section>
              )}

              {/* Conclusion and Broader Implications */}
              <section className='bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Conclusion: {theory.conclusionFocus}
                </h2>
                <div className='prose prose-invert max-w-none space-y-4'>
                  <p className='text-neutral-300 leading-relaxed'>
                    <strong className='text-white'>Thesis Connection:</strong>{' '}
                    The evidence from {market.name} shows how Taiwan's night
                    markets work as contested cultural spaces where different
                    versions of "Taiwanese identity" are negotiated and
                    performed. Rather than preserving authentic culture, vendors
                    strategically adapt their cultural presentations to handle
                    post-colonial power dynamics and economic pressures.
                  </p>

                  <p className='text-neutral-300 leading-relaxed'>
                    <strong className='text-white'>Counter-argument:</strong>{' '}
                    Critics might argue that this analysis overlooks real
                    cultural preservation happening in night market spaces,
                    pointing to Wu and Lin's (2013) description of these markets
                    as "democratic cultural spaces." However, the evidence shows
                    that even when cultural practices are preserved, they work
                    within power structures that decide which cultural stories
                    become visible and which stay hidden.
                  </p>

                  <p className='text-neutral-300 leading-relaxed'>
                    <strong className='text-white'>
                      Broader Implications:
                    </strong>{' '}
                    This analysis of {market.name} contributes to understanding{' '}
                    {theory.conclusionFocus}. The vendor strategies documented
                    here show how cultural capital works in everyday
                    interactions, supporting larger points about the political
                    nature of cultural representation in modern Taiwan.
                  </p>
                </div>
              </section>

              {/* Methodology and Reflexivity */}
              <section className='bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-8'>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Research Methodology and Reflexive Notes
                </h2>

                <div className='prose prose-invert max-w-none space-y-4'>
                  <p className='text-neutral-300 leading-relaxed'>
                    My fieldwork at {market.name} followed the participant
                    observation methods outlined by Wu and Lin (2013), with
                    multiple visits during different times and days to capture
                    the full range of vendor-customer interactions. I documented
                    language use, spatial arrangements, and what Chen and Huang
                    (2014) call "cultural performance adaptation" while being
                    mindful of my position as an outsider researcher.
                  </p>

                  <p className='text-neutral-300 leading-relaxed'>
                    Following Barbash et al.'s (2024) framework for ethical
                    cultural documentation, I approached each interaction with
                    respect for vendor privacy and cultural sensitivity. Where
                    possible, I engaged in informal conversations rather than
                    formal interviews, allowing vendors to share what they felt
                    comfortable discussing about their work and cultural
                    practices.
                  </p>

                  <div className='bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6'>
                    <p className='text-neutral-400 text-sm mb-0'>
                      <strong className='text-accent'>
                        Researcher Position:
                      </strong>{' '}
                      This analysis represents my perspective as a non-Taiwanese
                      researcher studying cultural preservation and identity in
                      night market spaces. These observations should be
                      considered alongside voices from the vendor community
                      itself, and I acknowledge the limitations built into any
                      outside perspective on cultural practices.
                    </p>
                  </div>
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
                <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                  This market analysis contributes to a broader study examining
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
