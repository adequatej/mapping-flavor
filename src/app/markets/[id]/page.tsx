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
  const [showAcademicAnalysis, setShowAcademicAnalysis] = useState(false)
  const [showResearchDetails, setShowResearchDetails] = useState(false)

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
          {/* Simple Breadcrumb with Progress */}
          <nav className='mb-8'>
            <div className='flex items-center justify-between'>
              <Link
                href='/markets'
                className='text-primary hover:text-primary-light transition-colors text-sm'
              >
                ← Back to Research Sites
              </Link>
              <div className='text-xs text-neutral-400'>
                Case Study{' '}
                {market.id === 'shilin-night-market'
                  ? '1'
                  : market.id === 'raohe-street-market'
                    ? '2'
                    : market.id === 'huaxi-street-market'
                      ? '3'
                      : '4'}{' '}
                of 4
              </div>
            </div>
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
          <div className='max-w-4xl mx-auto space-y-12'>
            {/* Cultural Story/Description - Engaging Opener */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-6'>
                What Makes This Market Special
              </h2>
              <div className='prose prose-lg prose-invert max-w-none'>
                {market.id === 'shilin-night-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    Walk into Shilin Night Market after sunset and you enter
                    Taiwan's most famous food theater. Bright neon signs flash
                    above steaming stalls. Vendors call out in Mandarin,
                    Taiwanese, and broken English. The air fills with sizzling
                    sounds and sweet, spicy smells. Tourists line up for
                    Instagram-worthy food while locals navigate quickly to their
                    favorite spots (Tang, 2024). This is where Taiwan's food
                    culture meets the world, creating a unique space where
                    tradition and performance blend together every night.
                  </p>
                )}
                {market.id === 'raohe-street-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    Raohe Street Market hums with a different energy than
                    Taiwan's tourist spots. Here, Hakka grandmothers work
                    alongside their daughters, preparing traditional foods with
                    techniques families pass down through generations. You hear
                    conversations in Hakka dialect mixed with Mandarin. The
                    stalls showcase distinct flavors and cooking methods that
                    tell the story of Taiwan's Hakka community. This market
                    preserves cultural traditions while adapting to modern city
                    life, creating a bridge between past and present.
                  </p>
                )}
                {market.id === 'huaxi-street-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    Huaxi Street Market serves Taipei's working community with
                    no pretense or fancy presentation. Construction workers grab
                    quick breakfast before dawn shifts. Office employees stop
                    for affordable dinners after long days. Students stretch
                    tight budgets with filling meals. The vendors know their
                    regular customers by name and dietary preferences. This
                    market creates community through accessible food, proving
                    that cultural spaces don't need high prices to have high
                    value.
                  </p>
                )}
                {market.id === 'kenting-night-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    Kenting Night Market transforms with Taiwan's beach season,
                    swelling with surfers, families, and tourists escaping
                    Taipei's heat. Local fishing families sell fresh seafood
                    alongside traditional snacks adapted for visitor tastes.
                    Seasonal workers from across Taiwan bring their regional
                    specialties. The market balances southern Taiwan's laid-back
                    coastal culture with the energy of temporary tourism,
                    creating a unique blend of local tradition and seasonal
                    adaptation.
                  </p>
                )}
              </div>
            </section>

            {/* Key Insight - Main Argument Accessible */}
            <section className='bg-primary/10 rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                Key Research Finding
              </h2>
              <div className='prose prose-lg prose-invert max-w-none'>
                {market.id === 'shilin-night-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    <strong className='text-white'>
                      This market shows how vendors put on a show of "real
                      Taiwanese culture" for tourists while acting completely
                      different with local customers.
                    </strong>{' '}
                    This reveals how cultural identity becomes a performance
                    rather than something authentic.
                  </p>
                )}
                {market.id === 'raohe-street-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    <strong className='text-white'>
                      This market shows how Hakka vendors negotiate space for
                      their distinct identity within mainstream "Taiwanese
                      culture" by strategically showing and hiding cultural
                      differences.
                    </strong>{' '}
                    It reveals how Taiwan's cultural identity is actually
                    contested between different ethnic communities rather than
                    being unified.
                  </p>
                )}
                {market.id === 'huaxi-street-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    <strong className='text-white'>
                      This market shows how working-class vendors maintain
                      authentic Taiwanese cultural practices that resist both
                      tourist expectations and middle-class cultural trends.
                    </strong>{' '}
                    Here vendors preserve traditional community-focused food
                    culture instead of performing "authentic Taiwan" for
                    outsiders.
                  </p>
                )}
                {market.id === 'kenting-night-market' && (
                  <p className='text-neutral-300 leading-relaxed text-lg'>
                    <strong className='text-white'>
                      This market shows how beach season tourism changes what
                      local food vendors sell and how they present their
                      culture.
                    </strong>{' '}
                    Vendors balance keeping their local traditions with giving
                    tourists what they expect.
                  </p>
                )}
              </div>
            </section>

            {/* Observable Evidence - What You Can See */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-6'>
                What You Can Observe
              </h2>
              <div className='prose prose-lg prose-invert max-w-none'>
                <p className='text-neutral-300 leading-relaxed mb-6'>
                  Following Chen and Huang's vendor behavior analysis framework
                  (Chen and Huang 45-67), these observable patterns reveal how
                  vendors navigate cultural identity politics in their daily
                  interactions:
                </p>
                {market.id === 'shilin-night-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Tourist Interactions:
                      </strong>{' '}
                      Vendors switch to English or slow Mandarin when serving
                      tourists. They point to picture menus and demonstrate how
                      to eat certain foods. They often recommend the most
                      Instagram-friendly dishes and help tourists take photos.
                    </p>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Local Customer Interactions:
                      </strong>{' '}
                      With local customers, vendors speak rapid Taiwanese
                      dialect. They recommend different dishes, often simpler
                      and less expensive. Conversations include personal updates
                      and jokes. Service is much faster with less explanation.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Language Switching:
                      </strong>{' '}
                      You can watch the same vendor completely change their
                      communication style within minutes as different customer
                      types approach their stall.
                    </p>
                  </>
                )}
                {market.id === 'raohe-street-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Strategic Language Switching:
                      </strong>{' '}
                      Vendors speak Hakka with Hakka customers but immediately
                      switch to Mandarin with non-Hakka customers. Hakka
                      cultural markers are highlighted when serving Hakka
                      customers but downplayed with mainstream Taiwanese
                      customers.
                    </p>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Cultural Negotiation:
                      </strong>{' '}
                      Vendors must decide when to emphasize Hakka
                      distinctiveness versus when to present their food as
                      generally "Taiwanese." Some dishes are labeled as Hakka
                      specialties while others are presented as standard
                      Taiwanese food.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Competing Identity Claims:
                      </strong>{' '}
                      You can observe vendors navigating between preserving
                      Hakka traditions and fitting into mainstream ideas about
                      "authentic Taiwanese food." Different vendors make
                      different choices about cultural visibility.
                    </p>
                  </>
                )}
                {market.id === 'huaxi-street-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Authentic Community Practices:
                      </strong>{' '}
                      Vendors serve the same simple, traditional foods to
                      everyone without special tourist menus or presentations.
                      No English signs or Instagram-friendly styling. Food
                      preparation follows family traditions rather than tourist
                      expectations.
                    </p>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Local Customer Relationships:
                      </strong>{' '}
                      Vendors know regular customers by name and remember their
                      usual orders. Conversations happen in local dialects about
                      work, family, and neighborhood news. People eat standing
                      together regardless of job or income level.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Resistance to Commodification:
                      </strong>{' '}
                      Vendors reject tourist-oriented changes and maintain
                      consistent community-focused practices. They prioritize
                      serving local working people over attracting visitors or
                      higher-income customers.
                    </p>
                  </>
                )}
                {market.id === 'kenting-night-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>Seasonal Changes:</strong>{' '}
                      During peak beach season, vendors offer more seafood and
                      cold drinks. Menu boards include English translations.
                      Portion sizes increase for tourist appetites.
                    </p>
                    <p className='text-neutral-300 leading-relaxed mb-4'>
                      <strong className='text-white'>
                        Local vs Tourist Service:
                      </strong>{' '}
                      Local surfers and fishing families get quick service and
                      local-style preparations. Tourists receive more
                      explanation about regional specialties and photo
                      opportunities with their food.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Regional Adaptations:
                      </strong>{' '}
                      Vendors combine traditional southern Taiwan ingredients
                      with tourist-friendly presentation. Fresh seafood displays
                      cater to beach visitors while maintaining local
                      preparation methods.
                    </p>
                  </>
                )}
              </div>

              {/* Evidence Bridge - Links Observable to Theoretical */}
              <div className='bg-accent/10 rounded-lg p-4 mt-6'>
                <p className='text-neutral-300 text-sm leading-relaxed'>
                  <strong className='text-white'>Why This Matters:</strong>{' '}
                  {market.id === 'shilin-night-market' &&
                    'These different behaviors with tourists versus locals prove that cultural identity becomes strategic performance rather than authentic expression. The language switching demonstrates what postcolonial theorists call "orientalist dynamics" in action.'}
                  {market.id === 'raohe-street-market' &&
                    'The strategic use of Hakka language and cultural markers reveals how "Taiwanese identity" is actually contested between different ethnic groups. This shows that even local identity is not unified but involves ongoing negotiation about which traditions count as "authentically Taiwanese."'}
                  {market.id === 'huaxi-street-market' &&
                    'The consistent pricing and authentic community practices show how working-class vendors create alternative versions of "Taiwanese identity" that resist commodification. This demonstrates cultural authenticity operating outside tourist and middle-class expectations.'}
                  {market.id === 'kenting-night-market' &&
                    'The seasonal adaptations show how local communities maintain cultural autonomy while responding to tourism pressures. This demonstrates successful "glocalization" rather than cultural loss.'}
                </p>
              </div>
            </section>

            {/* Collapsible Academic Analysis */}
            <section className='bg-neutral-900 rounded-lg p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-white'>
                  📚 Detailed Academic Analysis
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
                  {market.id === 'shilin-night-market' && (
                    <>
                      <h3 className='text-xl font-bold text-white mb-4'>
                        Identity Commodification and Cultural Performance
                      </h3>
                      <div className='prose prose-lg prose-invert max-w-none'>
                        <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                          <strong className='text-white'>
                            Academic Argument:
                          </strong>{' '}
                          Shilin Night Market shows how vendors strategically
                          perform "authentic Taiwanese culture" for tourist
                          consumption while maintaining separate cultural
                          practices for local customers, revealing the gap
                          between commodified identity and lived cultural
                          experience.
                        </p>

                        <p className='text-neutral-300 leading-relaxed'>
                          This cultural performance dynamic reflects how
                          cultural representations serve tourist expectations
                          rather than reflecting actual cultural practices.
                          Vendors at Shilin Night Market navigate the power
                          relationship between observer and observed, adapting
                          their cultural presentations to match tourist
                          assumptions about "authentic Taiwan" while preserving
                          different cultural practices in interactions with
                          local customers (Said 1-28). This demonstrates how
                          tourism creates "public transcripts," performances of
                          cultural authenticity that conceal more complex
                          cultural practices maintained in private interactions
                          (Scott 2-16).
                        </p>
                      </div>
                    </>
                  )}

                  {market.id === 'raohe-street-market' && (
                    <>
                      <h3 className='text-xl font-bold text-white mb-4'>
                        Hakka Heritage Preservation in Urban Commercial Spaces
                      </h3>
                      <div className='prose prose-lg prose-invert max-w-none'>
                        <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                          <strong className='text-white'>
                            Academic Argument:
                          </strong>{' '}
                          Raohe Street Market functions as a critical site for
                          Hakka cultural preservation within Taiwan's urban
                          commercial landscape, showing how minority vendors
                          maintain cultural distinctiveness while adapting to
                          mainstream market pressures and diverse customer
                          expectations.
                        </p>

                        <p className='text-neutral-300 leading-relaxed'>
                          This preservation dynamic illustrates how cultural
                          knowledge operates as a form of social power within
                          minority cultural contexts (Bourdieu 114-25). Hakka
                          vendors at Raohe Street Market deploy their distinct
                          cultural knowledge: traditional preparation methods,
                          regional dialects, family recipes as forms of cultural
                          capital that differentiate their offerings within
                          Taiwan's broader culinary landscape. However, this
                          cultural capital operates within hegemonic structures
                          that privilege mainstream Taiwanese/Chinese cultural
                          practices, requiring strategic navigation of cultural
                          visibility and adaptation (Gramsci 12-43).
                        </p>
                      </div>
                    </>
                  )}

                  {market.id === 'huaxi-street-market' && (
                    <>
                      <h3 className='text-xl font-bold text-white mb-4'>
                        Working-Class Food Culture and Economic Accessibility
                      </h3>
                      <div className='prose prose-lg prose-invert max-w-none'>
                        <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                          <strong className='text-white'>
                            Academic Argument:
                          </strong>{' '}
                          Huaxi Street Market shows how night markets function
                          as spaces where everyone can participate regardless of
                          income level, serving working-class populations while
                          maintaining affordable pricing and authentic cultural
                          practices.
                        </p>

                        <p className='text-neutral-300 leading-relaxed'>
                          This working-class cultural space challenges common
                          characterizations of night markets by revealing how
                          affordable pricing creates genuinely inclusive
                          cultural participation (Wu and Lin 45-67). Following
                          the concept of "the right to the city," Huaxi Street
                          Market represents a space where vendors actively
                          minimize economic barriers to cultural participation
                          (Lefebvre 147-59), creating a space for working-class
                          cultural autonomy that operates outside middle-class
                          cultural institutions (Scott 183-201).
                        </p>
                      </div>
                    </>
                  )}

                  {market.id === 'kenting-night-market' && (
                    <>
                      <h3 className='text-xl font-bold text-white mb-4'>
                        Tourism Economy and Regional Cultural Adaptation
                      </h3>
                      <div className='prose prose-lg prose-invert max-w-none'>
                        <p className='text-neutral-300 leading-relaxed text-lg mb-6'>
                          <strong className='text-white'>
                            Academic Argument:
                          </strong>{' '}
                          Kenting Night Market reveals how seasonal tourism
                          economies shape regional food identity and cultural
                          performance in southern Taiwan, demonstrating
                          adaptation strategies that balance local fishing and
                          agricultural traditions with visitor expectations from
                          Taiwan's beach resort economy.
                        </p>

                        <p className='text-neutral-300 leading-relaxed'>
                          This regional adaptation process reflects
                          "glocalization," the adaptation of local cultural
                          practices to global tourism flows while maintaining
                          regional distinctiveness (Appadurai 178-99). Vendors
                          at Kenting Night Market navigate between preserving
                          southern Taiwan's distinct food culture and adapting
                          to tourism expectations, creating "glocal" cultural
                          forms that are simultaneously local and oriented
                          toward global tourism markets (Robertson 25-44).
                        </p>
                      </div>
                    </>
                  )}

                  {/* Counter-Arguments and Broader Implications - Required for Academic Rigor */}
                  <div className='mt-8 pt-6 border-t border-neutral-700'>
                    <h3 className='text-xl font-bold text-white mb-4'>
                      Counter-Arguments and Broader Implications
                    </h3>

                    {market.id === 'shilin-night-market' && (
                      <div className='space-y-4'>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Counter-argument:
                          </strong>{' '}
                          Tourism advocates might argue that Shilin Night Market
                          successfully preserves Taiwanese culture by making it
                          accessible to global audiences. They point to the
                          market's role in cultural diplomacy and economic
                          development. However, what tourists consume isn't
                          preservation but simulation. The "authentic"
                          performances vendors create for visitors often replace
                          actual cultural practices, leading to cultural
                          hollowing rather than preservation.
                        </p>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Broader Implications:
                          </strong>{' '}
                          This analysis challenges common assumptions about
                          cultural tourism as preservation. It reveals how
                          global tourism markets create pressure for "authentic"
                          performances that may actually undermine the cultural
                          practices they claim to preserve. This pattern appears
                          in tourist destinations worldwide, suggesting the need
                          for tourism policies that support genuine cultural
                          autonomy rather than performative authenticity.
                        </p>
                      </div>
                    )}

                    {market.id === 'raohe-street-market' && (
                      <div className='space-y-4'>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Counter-argument:
                          </strong>{' '}
                          Critics might argue that any commercial adaptation
                          compromises authentic Hakka culture, making markets
                          poor sites for cultural preservation. However, this
                          view assumes culture must remain static to stay
                          "authentic." Raohe Street Market demonstrates that
                          strategic cultural adaptation can actually strengthen
                          minority identity by creating economic sustainability
                          and community visibility.
                        </p>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Broader Implications:
                          </strong>{' '}
                          This case study contributes to debates about minority
                          cultural survival in urban environments. It shows how
                          commercial spaces can serve cultural preservation when
                          controlled by community members rather than external
                          developers. This model offers insights for minority
                          communities worldwide facing cultural marginalization
                          in urban commercial development.
                        </p>
                      </div>
                    )}

                    {market.id === 'huaxi-street-market' && (
                      <div className='space-y-4'>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Counter-argument:
                          </strong>{' '}
                          Some scholars argue that affordable markets like Huaxi
                          lack the cultural sophistication found in upscale food
                          establishments. This view privileges middle-class
                          cultural consumption over working-class practices.
                          However, Huaxi's accessibility creates more genuine
                          cultural participation than exclusive spaces that
                          require economic capital for entry.
                        </p>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Broader Implications:
                          </strong>{' '}
                          This analysis challenges academic theories about
                          cultural capital by demonstrating how working-class
                          communities create genuine cultural democracy through
                          economic accessibility. The community solidarity
                          documented here provides an alternative to
                          market-based approaches to cultural development. This
                          analysis contributes to debates about gentrification,
                          cultural preservation, and economic justice by
                          demonstrating how working-class communities create
                          genuine cultural democracy through collective action
                          rather than consumer choice.
                        </p>
                      </div>
                    )}

                    {market.id === 'kenting-night-market' && (
                      <div className='space-y-4'>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Counter-argument:
                          </strong>{' '}
                          Tourism development critics might argue that any
                          adaptation to visitor expectations corrupts local
                          culture. However, this assumes that cultural
                          authenticity requires isolation from economic change.
                          Kenting demonstrates how communities can adapt to
                          tourism while maintaining cultural autonomy and local
                          economic control.
                        </p>
                        <p className='text-neutral-300 leading-relaxed'>
                          <strong className='text-white'>
                            Broader Implications:
                          </strong>{' '}
                          Kenting's cultural adaptation model offers insights
                          for tourism-dependent communities worldwide. It
                          demonstrates how local control over cultural
                          representation can create sustainable tourism that
                          benefits resident communities rather than external
                          developers. This case contributes to debates about
                          sustainable tourism development and community economic
                          autonomy.
                        </p>
                      </div>
                    )}

                    {/* Additional Critical Counter-Arguments */}
                    <div className='mt-8 pt-6 border-t border-neutral-700'>
                      <h4 className='text-lg font-bold text-white mb-4'>
                        Additional Scholarly Debates
                      </h4>

                      {market.id === 'shilin-night-market' && (
                        <div className='space-y-4'>
                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Tourism and Cultural Representation:
                            </strong>{' '}
                            The tension between orientalist dynamics and tourism
                            development presents a key theoretical challenge.
                            While tourism can provide economic benefits, this
                            research demonstrates how tourist expectations for
                            "authentic" experiences can replace genuine cultural
                            practices rather than preserving them, creating
                            distorted cultural representations (Said 1-28).
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Agency within Power Structures:
                            </strong>{' '}
                            This analysis builds on concepts of resistance
                            within power structures to show how vendors maintain
                            significant agency in cultural representation
                            despite tourism economic pressures. The documented
                            strategies reveal active cultural negotiation rather
                            than passive response to market demands (Scott
                            2-16).
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Performance and Power Dynamics:
                            </strong>{' '}
                            Following critiques of cultural representation (Said
                            1-28) and analysis of public transcripts (Scott
                            2-16), this research recognizes all culture involves
                            performance while distinguishing between
                            community-chosen versus externally-demanded
                            performances. This distinction proves crucial for
                            understanding power dynamics in tourist spaces.
                          </p>
                        </div>
                      )}

                      {market.id === 'raohe-street-market' && (
                        <div className='space-y-4'>
                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Cultural Capital and Minority Identity:
                            </strong>{' '}
                            Building on theories of cultural capital, this
                            research demonstrates how Hakka vendors deploy their
                            distinct cultural knowledge as economic assets while
                            maintaining cultural authenticity. When controlled
                            by community members, commercial spaces can provide
                            economic sustainability for cultural preservation
                            that traditional preservation methods often lack
                            (Bourdieu 114-25).
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Hegemonic Structures and Adaptation:
                            </strong>{' '}
                            Following analysis of hegemonic structures, this
                            research shows how Hakka vendors navigate dominant
                            cultural systems without losing cultural
                            distinctiveness. Strategic adaptation can actually
                            strengthen minority identity by creating economic
                            viability and community visibility within dominant
                            cultural frameworks (Gramsci 12-43).
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Cultural Resistance and Resilience:
                            </strong>{' '}
                            The evidence demonstrates how Hakka vendors maintain
                            distinct cultural markers while participating in
                            broader economic systems, supporting concepts of
                            cultural resistance within hegemonic structures.
                            This reveals cultural resilience rather than loss,
                            challenging assumptions about inevitable cultural
                            assimilation (Gramsci 12-43).
                          </p>
                        </div>
                      )}

                      {market.id === 'huaxi-street-market' && (
                        <div className='space-y-4'>
                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Challenging Wu & Lin's Democratic Spaces:
                            </strong>{' '}
                            This research builds on Wu & Lin's (2013)
                            characterization of night markets as democratic
                            spaces while revealing deeper mechanisms. Economic
                            accessibility creates conditions for cultural
                            participation without determining cultural content,
                            demonstrating how working-class communities create
                            cultural autonomy beyond simple market access.
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Right to the City Framework:
                            </strong>{' '}
                            Following Lefebvre's (1968) "right to the city"
                            concept, this research shows how working-class
                            cultural practices create genuine community
                            participation that elite cultural spaces cannot
                            replicate. Vendors actively minimize economic
                            barriers to cultural participation, creating
                            inclusive spaces.
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Cultural Autonomy and Resistance:
                            </strong>{' '}
                            The documented community solidarity and economic
                            practices support Scott's (1990) analysis of
                            working-class resistance strategies. This provides
                            models for cultural preservation through collective
                            action rather than institutional protection,
                            demonstrating cultural autonomy within economic
                            constraints.
                          </p>
                        </div>
                      )}

                      {market.id === 'kenting-night-market' && (
                        <div className='space-y-4'>
                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Glocalization and Cultural Adaptation:
                            </strong>{' '}
                            Following Appadurai's (1996) concept of
                            "glocalization," this research demonstrates how
                            communities can maintain cultural autonomy while
                            adapting to tourism when they control the terms of
                            cultural representation. Local cultural practices
                            adapt to global tourism flows while maintaining
                            regional distinctiveness.
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Seasonal Adaptation Strategies:
                            </strong>{' '}
                            The evidence supports Appadurai's (1996) analysis of
                            cultural flows by showing how vendors maintain
                            year-round cultural practices while adapting
                            seasonal presentations for tourism. This
                            demonstrates sustainable cultural adaptation rather
                            than cultural replacement, challenging assumptions
                            about tourism's inevitably destructive impact.
                          </p>

                          <p className='text-neutral-300 leading-relaxed'>
                            <strong className='text-white'>
                              Glocal Cultural Forms:
                            </strong>{' '}
                            Building on Robertson's (1995) theory of "glocal"
                            cultural forms, this analysis demonstrates how
                            communities can successfully navigate global tourism
                            pressures while maintaining local cultural
                            distinctiveness. The documented strategies reveal
                            genuine cultural evolution rather than cultural
                            compromise.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Case Study Evidence: Vendors */}
            {market.vendors && market.vendors.length > 0 && (
              <section>
                <h2 className='text-2xl font-bold text-white mb-6'>
                  Case Study Evidence: Vendors
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
                    entrepreneurs navigate the cultural dynamics analyzed above.
                    These case studies show the theoretical concepts working in
                    real situations.
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
                                    +{vendorData.vendor.specialties.length - 3}
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
                              <strong className='text-white'>Analysis:</strong>{' '}
                              {market.id === 'shilin-night-market' && (
                                <>
                                  {vendorData.vendor.name ===
                                    'Big Sausage Uncle' &&
                                    'Demonstrates tourist-focused presentation with traditional preparation methods, showing sophisticated audience recognition.'}
                                  {vendorData.vendor.name ===
                                    "Mei-Li's Stinky Tofu" &&
                                    'Serves as cultural ambassador, introducing challenging traditional foods to international audiences while preserving authentic methods.'}
                                  {vendorData.vendor.name ===
                                    'Night Market Bubble Tea King' &&
                                    'Shows how traditional Taiwanese drinks adapt to global social media culture while maintaining cultural identity.'}
                                  {![
                                    'Big Sausage Uncle',
                                    "Mei-Li's Stinky Tofu",
                                    'Night Market Bubble Tea King',
                                  ].includes(vendorData.vendor.name) &&
                                    'Demonstrates strategic cultural performance for tourist consumption.'}
                                </>
                              )}
                              {market.id === 'raohe-street-market' && (
                                <>
                                  {vendorData.vendor.name ===
                                    "Grandma Chen's Hakka Noodles" &&
                                    'Critical site for Hakka cultural preservation, demonstrating how minority cultures maintain identity through food traditions.'}
                                  {vendorData.vendor.name ===
                                    'Heritage Pepper Buns' &&
                                    'Preserves traditional baking methods while demonstrating Hakka cultural distinctiveness within Taiwanese food culture.'}
                                  {vendorData.vendor.name ===
                                    'Three Generations Tea Eggs' &&
                                    'Shows how simple dishes carry complex cultural knowledge and serve as ways to preserve minority culture.'}
                                  {![
                                    "Grandma Chen's Hakka Noodles",
                                    'Heritage Pepper Buns',
                                    'Three Generations Tea Eggs',
                                  ].includes(vendorData.vendor.name) &&
                                    'Shows Hakka cultural preservation through strategic visibility.'}
                                </>
                              )}
                              {market.id === 'huaxi-street-market' && (
                                <>
                                  {vendorData.vendor.name ===
                                    "Old Wang's Snake Soup" &&
                                    'Maintains traditional food culture that resists gentrification, serving as authentic community gathering space.'}
                                  {vendorData.vendor.name ===
                                    "Workers' Noodle Stand" &&
                                    'Shows night markets as democratic spaces where economic barriers to cultural participation are reduced.'}
                                  {vendorData.vendor.name ===
                                    'Night Shift Dumplings' &&
                                    'Shows how night markets support working-class community needs beyond tourism, serving essential social infrastructure role.'}
                                  {![
                                    "Old Wang's Snake Soup",
                                    "Workers' Noodle Stand",
                                    'Night Shift Dumplings',
                                  ].includes(vendorData.vendor.name) &&
                                    'Embodies working-class cultural autonomy through economic accessibility.'}
                                </>
                              )}
                              {market.id === 'kenting-night-market' && (
                                <>
                                  {vendorData.vendor.name ===
                                    'Beach BBQ Seafood' &&
                                    'Demonstrates how regional food culture adapts to tourism while maintaining connections to local fishing traditions.'}
                                  {vendorData.vendor.name ===
                                    'Tropical Fruit Smoothies' &&
                                    'Shows how regional agricultural identity adapts to tourism economy while preserving connections to local farming traditions.'}
                                  {vendorData.vendor.name ===
                                    "Surfer's Late Night Noodles" &&
                                    'Demonstrates how local food culture adapts to international beach and surf culture while maintaining Taiwanese identity.'}
                                  {![
                                    'Beach BBQ Seafood',
                                    'Tropical Fruit Smoothies',
                                    "Surfer's Late Night Noodles",
                                  ].includes(vendorData.vendor.name) &&
                                    'Illustrates regional cultural adaptation to tourism demands.'}
                                </>
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
                    className='inline-flex items-center text-primary hover:text-primary-light transition-colors font-medium'
                  >
                    Read detailed case study evidence →
                  </Link>
                </div>
              </section>
            )}

            {/* Conclusion with Strong Thesis Connection */}
            <section className='bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                What This Market Proves About Cultural Identity
              </h2>
              <div className='prose prose-invert max-w-none'>
                {market.id === 'shilin-night-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed text-lg mb-4'>
                      Shilin Night Market proves that Taiwan's night markets are{' '}
                      <strong className='text-white'>
                        contested cultural spaces
                      </strong>{' '}
                      where vendors strategically perform different versions of
                      "authentic Taiwan" for different audiences. Rather than
                      preserving culture, tourism creates pressure for cultural
                      simulation that can replace genuine cultural practices.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Significance:
                      </strong>{' '}
                      This challenges assumptions about cultural tourism as
                      preservation, revealing how global tourism markets can
                      undermine the cultural practices they claim to celebrate.
                    </p>
                  </>
                )}

                {market.id === 'raohe-street-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed text-lg mb-4'>
                      Raohe Street Market proves that{' '}
                      <strong className='text-white'>
                        "Taiwanese identity" is contested between different
                        ethnic communities
                      </strong>{' '}
                      rather than being unified. Hakka vendors must
                      strategically negotiate space for their distinct
                      traditions within mainstream ideas about what counts as
                      "authentically Taiwanese."
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Significance:
                      </strong>{' '}
                      This reveals that cultural identity negotiation happens
                      not just between locals and tourists, but also between
                      different groups within Taiwanese society competing for
                      cultural recognition.
                    </p>
                  </>
                )}

                {market.id === 'huaxi-street-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed text-lg mb-4'>
                      Huaxi Street Market proves that working-class communities
                      maintain{' '}
                      <strong className='text-white'>
                        authentic versions of Taiwanese cultural identity
                      </strong>{' '}
                      that operate outside tourist performances and middle-class
                      cultural institutions. These vendors preserve traditional
                      community practices that resist cultural commodification.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Significance:
                      </strong>{' '}
                      This shows how different social classes create competing
                      versions of "authentic" Taiwanese culture, revealing that
                      cultural identity is contested even within local
                      communities.
                    </p>
                  </>
                )}

                {market.id === 'kenting-night-market' && (
                  <>
                    <p className='text-neutral-300 leading-relaxed text-lg mb-4'>
                      Kenting Night Market proves that communities can maintain{' '}
                      <strong className='text-white'>
                        cultural autonomy while adapting to tourism economies
                      </strong>{' '}
                      when they control the terms of cultural representation.
                      Vendors create successful "glocal" forms that serve both
                      local needs and visitor expectations.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      <strong className='text-white'>
                        Broader Significance:
                      </strong>{' '}
                      This demonstrates sustainable tourism development that
                      benefits resident communities rather than external
                      developers.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Research Methodology and Sources - Required for Academic Rigor */}
            <section className='bg-neutral-900 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Research Methodology and Sources
              </h2>

              <div className='grid md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Research Details
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <div>
                      <p className='text-neutral-400'>Location</p>
                      <p className='text-neutral-300'>{market.location}</p>
                    </div>
                    <div>
                      <p className='text-neutral-400'>Established</p>
                      <p className='text-neutral-300'>{market.established}</p>
                    </div>
                    <div>
                      <p className='text-neutral-400'>Research Focus</p>
                      <p className='text-neutral-300'>{market.researchFocus}</p>
                    </div>
                    <div>
                      <p className='text-neutral-400'>Vendors Documented</p>
                      <p className='text-neutral-300'>
                        {market.vendors?.length || 0}
                      </p>
                    </div>
                  </div>

                  <h4 className='text-md font-bold text-white mt-6 mb-3'>
                    Research Approach
                  </h4>
                  <div className='space-y-2 text-sm'>
                    <p className='text-neutral-400'>
                      <strong className='text-neutral-300'>Method:</strong>{' '}
                      Critical observational analysis
                    </p>
                    <p className='text-neutral-400'>
                      <strong className='text-neutral-300'>Scope:</strong>{' '}
                      Public behavior patterns and cultural interactions
                    </p>
                    <p className='text-neutral-400'>
                      <strong className='text-neutral-300'>Focus:</strong>{' '}
                      Language use, customer interactions, spatial organization
                    </p>
                  </div>

                  <h4 className='text-md font-bold text-white mt-6 mb-3'>
                    Research Limitations
                  </h4>
                  <div className='space-y-2 text-sm text-neutral-400'>
                    <p>
                      • Limited time frame may not capture seasonal variations
                    </p>
                    <p>
                      • Observer effect: vendor behavior may change when studied
                    </p>
                    <p>
                      • Language barriers may limit understanding of some
                      interactions
                    </p>
                    <p>• Outsider perspective may miss cultural nuances</p>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Theoretical Sources
                  </h3>
                  <div className='space-y-3 text-sm'>
                    {market.id === 'shilin-night-market' && (
                      <>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Said, Edward (1978)
                          </p>
                          <p className='text-neutral-400'>
                            Orientalism - power dynamics in cultural
                            representation
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Scott, James C. (1990)
                          </p>
                          <p className='text-neutral-400'>
                            Hidden transcripts and resistance strategies
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Chen & Huang (2014)
                          </p>
                          <p className='text-neutral-400'>
                            Vendor behavior analysis framework
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Tang, C. (2024)
                          </p>
                          <p className='text-neutral-400'>
                            Taiwan's night market culture guide
                          </p>
                        </div>
                      </>
                    )}

                    {market.id === 'raohe-street-market' && (
                      <>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Bourdieu, Pierre (1984)
                          </p>
                          <p className='text-neutral-400'>
                            Cultural capital theory and social distinction
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Gramsci, Antonio (1971)
                          </p>
                          <p className='text-neutral-400'>
                            Hegemonic structures and cultural resistance
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Chen & Huang (2014)
                          </p>
                          <p className='text-neutral-400'>
                            Vendor behavior analysis framework
                          </p>
                        </div>
                      </>
                    )}

                    {market.id === 'huaxi-street-market' && (
                      <>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Wu & Lin (2013)
                          </p>
                          <p className='text-neutral-400'>
                            Night markets as democratic spaces (critiqued)
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Lefebvre, Henri (1968)
                          </p>
                          <p className='text-neutral-400'>
                            The right to the city concept
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Scott, James C. (1990)
                          </p>
                          <p className='text-neutral-400'>
                            Hidden transcripts and resistance strategies
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Chen & Huang (2014)
                          </p>
                          <p className='text-neutral-400'>
                            Vendor behavior analysis framework
                          </p>
                        </div>
                      </>
                    )}

                    {market.id === 'kenting-night-market' && (
                      <>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Appadurai, Arjun (1996)
                          </p>
                          <p className='text-neutral-400'>
                            Glocalization and cultural flows
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Robertson, Roland (1995)
                          </p>
                          <p className='text-neutral-400'>
                            Glocal cultural forms theory
                          </p>
                        </div>
                        <div>
                          <p className='text-neutral-300 font-medium'>
                            Chen & Huang (2014)
                          </p>
                          <p className='text-neutral-400'>
                            Vendor behavior analysis framework
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <h4 className='text-md font-bold text-white mt-6 mb-3'>
                    Replication Guidelines
                  </h4>
                  <div className='space-y-2 text-sm text-neutral-400'>
                    <p>Future researchers should focus on:</p>
                    <p>
                      • Peak hours: 7-10 PM for maximum vendor-customer
                      interaction
                    </p>
                    <p>
                      • Language documentation: Recording code-switching
                      patterns
                    </p>
                    <p>
                      • Customer type variation: Weekday vs. weekend
                      demographics
                    </p>
                    <p>
                      • Seasonal comparison: Tourist vs. local customer seasons
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Continue Your Research Journey */}
            <section className='bg-accent/10 rounded-lg p-6 text-center'>
              <p className='text-neutral-300 leading-relaxed mb-4'>
                <strong className='text-white'>
                  Continue Your Research Journey:
                </strong>{' '}
                This market analysis is one of four case studies. For the
                complete argument, explore all markets or dive deeper into the
                vendor evidence that supports these theoretical claims.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Link
                  href={`/vendors?market=${market.id}`}
                  className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
                >
                  View Vendor Evidence
                </Link>
                <Link
                  href='/markets'
                  className='bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
                >
                  All Market Case Studies
                </Link>
                <Link
                  href={`/explorer?market=${market.id}`}
                  className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors'
                >
                  Interactive Map
                </Link>
              </div>
            </section>
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
