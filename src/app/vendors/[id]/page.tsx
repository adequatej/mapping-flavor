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
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)

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

  // Vendor-specific content based on vendor name and market
  const getVendorSpecificContent = () => {
    const marketId = vendor.markets?.[0]?.market?.id

    // Shilin Night Market Vendors
    if (vendor.name === 'Hot Sausage Stand') {
      return {
        keyInsight:
          'Hot Sausage Stand demonstrates how traditional Taiwanese street food maintains authentic preparation methods while adapting presentation for diverse customer bases.',
        specificEvidence:
          'Observed the vendor using consistent grilling techniques with high-quality sausages, serving both locals who order quickly and tourists who need explanations. The preparation remains the same but the service style adapts to customer familiarity.',
        culturalStrategy:
          'This vendor maintains traditional sausage preparation while providing multilingual service and explanations. The food authenticity remains constant while communication adapts to different audiences.',
        theoreticalConnection:
          'Demonstrates how food authenticity can be preserved through consistent preparation methods while service approaches adapt to different customer needs.',
        marketConnection:
          'As a traditional sausage vendor in Shilin Night Market, this stall shows how classic Taiwanese street foods maintain their identity while serving diverse customers. The consistent preparation demonstrates authentic food culture preservation.',
        researchContribution:
          'This vendor provides evidence for how food authenticity operates through preparation consistency rather than customer presentation. The documented service adaptations show cultural preservation through culinary practice.',
        vendorDemonstrates:
          'Through consistent preparation methods and adapted service, this vendor shows how traditional foods maintain authenticity while serving diverse audiences. The focus on food quality demonstrates genuine cultural preservation.',
        researchMethodology:
          'Observations focused on preparation techniques, ingredient quality, and service variations, documenting how traditional foods maintain authenticity across different customer interactions.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable preparation and service patterns rather than personal details, maintaining appropriate academic boundaries while preserving research value.',
      }
    }

    if (vendor.name === 'Korean Corn Dogs') {
      return {
        keyInsight:
          'Korean Corn Dogs represents how international foods integrate into traditional night markets while adapting to local tastes and preferences.',
        specificEvidence:
          'Observed Korean-style preparation methods adapted with local ingredients and flavors. Popular with younger customers who appreciate both Korean trends and familiar Taiwanese tastes.',
        culturalStrategy:
          'This vendor successfully integrates Korean food trends with local preferences, creating fusion items that appeal to both international food enthusiasts and traditional night market customers.',
        theoreticalConnection:
          'Shows how global food trends adapt to local contexts, demonstrating cultural exchange and adaptation in commercial food spaces.',
        marketConnection:
          "Operating in Shilin Night Market's modern food section, this vendor demonstrates how night markets evolve to include international cuisines while maintaining their essential character as diverse food destinations.",
        researchContribution:
          'This vendor provides evidence for how international foods successfully integrate into traditional food spaces. The documented adaptation strategies provide evidence for cultural evolution in commercial settings.',
        vendorDemonstrates:
          'Through adapted Korean preparations and local appeal, this vendor shows how international foods can enhance rather than replace traditional night market offerings.',
        researchMethodology:
          'Research focused on preparation adaptations, customer demographics, and cultural integration patterns, documenting how international foods adapt to local contexts.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and food preparation practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'Bubble Tea Corner') {
      return {
        keyInsight:
          "Bubble Tea Corner represents Taiwan's most successful culinary export, showing how local innovations become global phenomena while maintaining authentic preparation.",
        specificEvidence:
          'Observed traditional tea brewing methods combined with modern presentation techniques. Serves both classic preparations for local customers and trendy variations for tourists.',
        culturalStrategy:
          'This vendor balances traditional Taiwanese tea culture with modern bubble tea innovations, maintaining authentic brewing while offering contemporary variations.',
        theoreticalConnection:
          'Demonstrates how local culinary innovations can achieve global success while maintaining cultural authenticity through consistent preparation methods.',
        marketConnection:
          "Located in Shilin Night Market's beverage section, this vendor showcases Taiwan's most famous food export while maintaining traditional tea preparation methods that define authentic bubble tea.",
        researchContribution:
          'This vendor provides evidence for how local food innovations can maintain authenticity while achieving global recognition. The documented preparation methods reveal authentic bubble tea culture.',
        vendorDemonstrates:
          'Through traditional brewing methods and quality ingredients, this vendor shows how Taiwanese bubble tea maintains its cultural identity despite global popularization.',
        researchMethodology:
          'Observations centered on tea preparation techniques, ingredient quality, and cultural preservation methods, documenting authentic bubble tea practices.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable preparation methods and cultural practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    // Raohe Street Market Vendors
    if (vendor.name === 'Chinese Hamburger House') {
      return {
        keyInsight:
          "Chinese Hamburger House preserves traditional Shaanxi-style rou jia mo preparation, demonstrating how regional Chinese cuisines maintain identity within Taiwan's diverse food culture.",
        specificEvidence:
          'Observed traditional braising techniques requiring hours of preparation for tender pork filling. Family recipes and preparation methods preserved across generations through hands-on teaching.',
        culturalStrategy:
          'This vendor maintains authentic regional Chinese preparation methods while adapting to night market setting, preserving traditional techniques within commercial context.',
        theoreticalConnection:
          "Shows how regional Chinese culinary traditions maintain distinctiveness within Taiwan's broader Chinese cultural context, demonstrating cultural preservation through food.",
        marketConnection:
          "As a traditional Chinese regional food vendor in Raohe Street Market, this stall exemplifies how diverse Chinese culinary traditions find expression within Taiwan's night market culture.",
        researchContribution:
          'This vendor provides evidence for how regional Chinese cuisines maintain distinctiveness within Taiwan. The documented preparation methods reveal traditional culinary knowledge preservation.',
        vendorDemonstrates:
          "Through authentic preparation methods and family recipes, this vendor shows how regional Chinese foods maintain cultural identity within Taiwan's diverse culinary landscape.",
        researchMethodology:
          'Research focused on preparation techniques, family knowledge transmission, and cultural preservation methods, documenting traditional Chinese regional cuisine practices.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable preparation methods and cultural practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'Fresh Pancakes') {
      return {
        keyInsight:
          'Fresh Pancakes demonstrates how traditional breakfast foods adapt to night market dining, showing temporal flexibility in Chinese food culture.',
        specificEvidence:
          'Observed skilled preparation requiring precise timing for thin, crispy pancakes with fresh eggs and savory fillings. Popular with customers seeking familiar comfort food in evening setting.',
        culturalStrategy:
          'This vendor successfully adapts traditional breakfast preparation for evening dining, maintaining authentic cooking methods while serving different meal contexts.',
        theoreticalConnection:
          'Shows how traditional foods adapt to different temporal contexts while maintaining cultural authenticity through consistent preparation methods.',
        marketConnection:
          "Operating in Raohe Street Market's traditional food section, this vendor demonstrates how classic Chinese breakfast foods find new contexts within night market dining culture.",
        researchContribution:
          'This vendor provides evidence for how traditional foods maintain authenticity while adapting to different dining contexts. The documented preparation methods show cultural flexibility.',
        vendorDemonstrates:
          'Through skilled preparation and authentic methods, this vendor shows how traditional breakfast foods can successfully transition to different meal contexts.',
        researchMethodology:
          'Observations centered on preparation techniques, timing requirements, and cultural adaptation patterns, documenting traditional food flexibility.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable preparation methods and cultural practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'King Oyster Mushroom Grill') {
      return {
        keyInsight:
          'King Oyster Mushroom Grill represents evolving dietary preferences within traditional night markets, showing adaptation to vegetarian and health-conscious dining.',
        specificEvidence:
          'Observed specialized grilling techniques that highlight natural mushroom flavors and textures. Growing customer base includes both vegetarians and health-conscious diners seeking plant-based options.',
        culturalStrategy:
          'This vendor adapts traditional grilling methods for vegetarian ingredients, maintaining authentic cooking techniques while serving evolving dietary preferences.',
        theoreticalConnection:
          'Demonstrates how traditional cooking methods can adapt to contemporary dietary trends while maintaining cultural authenticity through technique preservation.',
        marketConnection:
          "Located in Raohe Street Market's grilled food section, this vendor shows how night markets evolve to serve changing dietary preferences while maintaining traditional cooking methods.",
        researchContribution:
          'This vendor provides evidence for how traditional cooking methods adapt to contemporary dietary trends. The documented techniques show cultural evolution through food.',
        vendorDemonstrates:
          'Through traditional grilling methods and quality ingredients, this vendor shows how night markets can serve evolving dietary preferences while maintaining cultural authenticity.',
        researchMethodology:
          'Research focused on cooking techniques, ingredient selection, and cultural adaptation patterns, documenting traditional methods applied to contemporary preferences.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cooking methods and cultural practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    // Huaxi Street Market Vendors
    if (vendor.name === 'Fried Bread Kitchen') {
      return {
        keyInsight:
          'Fried Bread Kitchen maintains traditional fried dough preparation while serving essential affordable nutrition for working-class communities.',
        specificEvidence:
          'Observed consistent quality and generous portions despite rising ingredient costs. Regular customers include construction workers, taxi drivers, and local residents seeking affordable, filling meals.',
        culturalStrategy:
          'This vendor prioritizes community service over profit maximization, maintaining affordable pricing and traditional preparation to serve local working populations.',
        theoreticalConnection:
          'Demonstrates how traditional food vendors can resist market pressures by prioritizing community needs over profit maximization.',
        marketConnection:
          "As an affordable food vendor in Huaxi Street Market, this stall exemplifies the market's role in providing essential nutrition for working-class communities through traditional foods.",
        researchContribution:
          'This vendor provides evidence for how traditional food vendors serve essential community functions. The documented pricing and service patterns reveal community-focused business practices.',
        vendorDemonstrates:
          'Through affordable pricing and consistent quality, this vendor shows how traditional food businesses can prioritize community service while maintaining cultural authenticity.',
        researchMethodology:
          "Observations centered on pricing strategies, customer demographics, and community service patterns, documenting traditional food's community role.",
        ethicalConsiderations:
          'This analysis focuses on publicly observable business practices and community interactions rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'Pork Bun Express') {
      return {
        keyInsight:
          "Pork Bun Express provides essential quick, affordable meals for working communities, demonstrating night markets' role in urban food security.",
        specificEvidence:
          'Observed efficient operations serving construction workers, taxi drivers, and local residents who need quick, affordable, nutritious meals. Known for generous portions and consistent quality.',
        culturalStrategy:
          'This vendor focuses on efficient service and value pricing to meet working community needs, maintaining traditional bun preparation while optimizing for quick service.',
        theoreticalConnection:
          'Shows how traditional food vendors adapt to urban working schedules while maintaining cultural food practices and community service functions.',
        marketConnection:
          "Operating in Huaxi Street Market's quick service section, this vendor demonstrates how traditional foods serve essential urban community needs through efficient, affordable operations.",
        researchContribution:
          "This vendor provides evidence for how traditional food vendors serve essential urban community functions. The documented service patterns show food's role in working-class support systems.",
        vendorDemonstrates:
          'Through efficient operations and community focus, this vendor shows how traditional foods serve essential urban community needs while maintaining cultural authenticity.',
        researchMethodology:
          "Research focused on service efficiency, community demographics, and urban food security patterns, documenting traditional food's community role.",
        ethicalConsiderations:
          'This analysis focuses on publicly observable service patterns and community interactions rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'Simple Noodle Bowl') {
      return {
        keyInsight:
          'Simple Noodle Bowl maintains traditional noodle shop culture within night market setting, serving essential community dining needs through authentic preparation.',
        specificEvidence:
          'Observed straightforward operations focusing on value and nutrition rather than presentation. Regular customers include local workers and elderly residents seeking familiar, affordable meals.',
        culturalStrategy:
          'This vendor maintains traditional noodle shop practices within night market context, prioritizing authentic preparation and community service over tourist appeal.',
        theoreticalConnection:
          'Demonstrates how traditional food culture maintains authenticity through community focus rather than commercial presentation, showing genuine cultural preservation.',
        marketConnection:
          "Located in Huaxi Street Market's traditional food section, this vendor shows how authentic noodle shop culture persists within night market settings through community-focused operations.",
        researchContribution:
          'This vendor provides evidence for authentic traditional food culture operating through community service rather than commercial appeal. The documented practices show genuine cultural preservation.',
        vendorDemonstrates:
          'Through traditional preparation and community focus, this vendor shows how authentic food culture maintains itself through genuine community service rather than tourist presentation.',
        researchMethodology:
          'Observations centered on preparation methods, community interactions, and cultural authenticity patterns, documenting traditional noodle shop culture.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable preparation methods and community interactions rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    // Kenting Night Market Vendors
    if (vendor.name === 'Beach Seafood Grill') {
      return {
        keyInsight:
          'Beach Seafood Grill connects night market dining to local fishing economy, showcasing regional coastal food culture through fresh, local ingredients.',
        specificEvidence:
          'Observed direct sourcing from local fishing boats with preparation adapting to seasonal availability. Simple grilling methods highlight natural seafood flavors rather than heavy seasonings.',
        culturalStrategy:
          'This vendor maintains connections to local fishing economy while adapting to tourism dining, balancing authentic coastal preparation with visitor accessibility.',
        theoreticalConnection:
          'Demonstrates how local food systems can maintain authenticity while serving tourism markets through emphasis on local sourcing and traditional preparation.',
        marketConnection:
          'As a seafood vendor in Kenting Night Market, this stall shows how coastal food culture adapts to tourism while maintaining connections to local fishing traditions and seasonal availability.',
        researchContribution:
          'This vendor provides evidence for how local food systems can serve tourism while maintaining authentic connections to regional economy and traditional preparation methods.',
        vendorDemonstrates:
          'Through local sourcing and traditional preparation, this vendor shows how coastal food culture can serve tourism while maintaining authentic connections to local fishing economy.',
        researchMethodology:
          'Research focused on sourcing practices, seasonal adaptation, and traditional preparation methods, documenting coastal food culture and local economic connections.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable sourcing and preparation practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'Tropical Fruit Stand') {
      return {
        keyInsight:
          "Tropical Fruit Stand highlights southern Taiwan's agricultural abundance while adapting to beach tourism economy through fresh, local produce.",
        specificEvidence:
          'Observed emphasis on local tropical fruits including seasonal varieties, adapting presentation for tourist preferences while showcasing regional agricultural products.',
        culturalStrategy:
          'This vendor balances tourist appeal with agricultural authenticity, highlighting local farming traditions while adapting service to visitor preferences and beach dining needs.',
        theoreticalConnection:
          'Shows how agricultural traditions can thrive within tourism economies through emphasis on local quality and seasonal availability rather than exotic presentation.',
        marketConnection:
          "Operating in Kenting Night Market's fresh food section, this vendor demonstrates how local agricultural traditions adapt to tourism while maintaining connections to regional farming.",
        researchContribution:
          'This vendor provides evidence for how agricultural vendors can serve tourism while maintaining authentic connections to local farming. The documented practices show regional food culture adaptation.',
        vendorDemonstrates:
          'Through local sourcing and seasonal adaptation, this vendor shows how agricultural traditions can serve tourism while maintaining authentic connections to regional farming economy.',
        researchMethodology:
          'Observations centered on sourcing practices, seasonal availability, and tourism adaptation patterns, documenting agricultural culture within tourism contexts.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable sourcing and service practices rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    if (vendor.name === 'Late Night Beef Noodles') {
      return {
        keyInsight:
          'Late Night Beef Noodles adapts traditional Taiwanese comfort food for beach climate and late-night dining, showing regional and temporal food culture adaptation.',
        specificEvidence:
          'Observed lighter broth preparations and smaller portions adapted for warm coastal weather and late-night beach dining. Popular with surfers and late-night beach visitors.',
        culturalStrategy:
          'This vendor adapts traditional beef noodle soup for regional climate and tourism patterns while maintaining authentic preparation methods and familiar flavors.',
        theoreticalConnection:
          'Demonstrates how traditional comfort foods can adapt to regional climate and tourism patterns while maintaining cultural authenticity through consistent preparation methods.',
        marketConnection:
          "Located in Kenting Night Market's late-night section, this vendor shows how traditional Taiwanese comfort foods adapt to coastal climate and beach tourism dining patterns.",
        researchContribution:
          'This vendor provides evidence for how traditional comfort foods maintain authenticity while adapting to regional climate and tourism patterns through preparation modifications.',
        vendorDemonstrates:
          'Through adapted preparation and maintained authenticity, this vendor shows how traditional comfort foods can serve different regional and temporal contexts while preserving cultural identity.',
        researchMethodology:
          'Research focused on preparation adaptations, climate considerations, and tourism pattern accommodation, documenting traditional food flexibility.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable preparation methods and adaptation strategies rather than personal details, maintaining appropriate academic boundaries.',
      }
    }

    // Default content for any other vendors
    return {
      keyInsight: `${vendor.name} demonstrates how individual vendors navigate cultural identity politics within Taiwan's night markets.`,
      specificEvidence:
        vendor.researchNotes ||
        "This vendor shows specific strategies for balancing cultural authenticity with economic survival in Taiwan's contested cultural spaces.",
      culturalStrategy:
        vendor.culturalSignificance ||
        'This vendor maintains cultural practices while adapting to market demands, showing how individual entrepreneurs navigate complex cultural dynamics.',
      theoreticalConnection:
        'This vendor provides concrete evidence for how Taiwan\'s night markets function as contested cultural spaces where different versions of "Taiwanese identity" are negotiated and performed.',
      marketConnection: `Operating in ${vendor.markets?.[0]?.market?.name || 'the night market'}, this vendor demonstrates specific strategies for navigating cultural identity politics in commercial spaces.`,
      researchContribution:
        'This vendor provides evidence for how individual entrepreneurs navigate cultural dynamics in night markets, demonstrating specific strategies for balancing tradition with market demands.',
      vendorDemonstrates:
        'Through balanced adaptation and maintained traditions, this vendor shows how individual entrepreneurs navigate complex cultural dynamics in night markets.',
      researchMethodology:
        'Research focused on vendor practices and customer interactions, documenting how individual entrepreneurs navigate cultural dynamics in commercial spaces.',
      ethicalConsiderations:
        'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
    }
  }

  const vendorContent = getVendorSpecificContent()

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
              <div className='relative h-96 rounded-xl overflow-hidden'>
                <Image
                  src={vendor.images[0]}
                  alt={`${vendor.name}`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 75vw'
                />
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

            {/* Specific Evidence - Vendor Specific */}
            <section>
              <h2 className='text-2xl font-bold text-white mb-6'>
                What I Observed
              </h2>
              <div className='bg-neutral-900 rounded-lg p-6 border-l-4 border-accent'>
                <p className='text-neutral-300 leading-relaxed text-lg'>
                  {vendorContent.specificEvidence}
                </p>
              </div>
            </section>

            {/* Key Insight - Vendor Specific */}
            <section className='bg-primary/10 rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                Key Research Finding
              </h2>
              <p className='text-neutral-300 leading-relaxed text-lg'>
                {vendorContent.keyInsight}
              </p>
            </section>

            {/* Collapsible Detailed Analysis */}
            <section className='bg-secondary-light rounded-xl p-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-white'>
                  📚 Detailed Analysis
                </h2>
                <button
                  onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                  className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
                >
                  {showDetailedAnalysis
                    ? 'Hide Analysis'
                    : 'Show Detailed Analysis'}
                </button>
              </div>

              {showDetailedAnalysis && (
                <div className='border-t border-neutral-700 pt-6'>
                  <h3 className='text-xl font-bold text-white mb-4'>
                    Theoretical Connection
                  </h3>
                  <p className='text-neutral-300 leading-relaxed mb-6'>
                    {vendorContent.theoreticalConnection}
                  </p>

                  {/* Market Context */}
                  {vendor.markets && vendor.markets.length > 0 && (
                    <div className='bg-neutral-900 rounded-lg p-6'>
                      <h3 className='text-lg font-semibold text-white mb-3'>
                        Connection to {vendor.markets[0].market.name}
                      </h3>
                      <p className='text-neutral-300 text-sm leading-relaxed'>
                        {vendorContent.marketConnection}
                      </p>
                    </div>
                  )}

                  {/* Contribution to Research */}
                  <div className='bg-primary/10 rounded-lg p-6 mt-6'>
                    <h3 className='text-lg font-semibold text-white mb-3'>
                      Contribution to Research
                    </h3>
                    <p className='text-neutral-300 text-sm leading-relaxed'>
                      {vendorContent.researchContribution}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Simple Conclusion */}
            <section className='bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                What This Vendor Demonstrates
              </h2>
              <div className='prose prose-invert max-w-none'>
                <p className='text-neutral-300 leading-relaxed text-lg'>
                  {vendorContent.vendorDemonstrates}
                </p>
              </div>
            </section>

            {/* Vendor Information - Inline */}
            <section className='bg-neutral-900 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Vendor Information
              </h2>

              <div className='grid md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Location Details
                  </h3>
                  <div className='space-y-3 text-sm'>
                    {vendor.markets && vendor.markets.length > 0 && (
                      <div>
                        <p className='text-neutral-400'>Market</p>
                        <p className='text-neutral-300'>
                          {vendor.markets[0].market.name}
                        </p>
                      </div>
                    )}
                    {vendor.operatingHours && (
                      <div>
                        <p className='text-neutral-400'>Operating Hours</p>
                        <p className='text-neutral-300'>
                          {vendor.operatingHours}
                        </p>
                      </div>
                    )}
                    {vendor.specialties && vendor.specialties.length > 0 && (
                      <div>
                        <p className='text-neutral-400'>Specialties</p>
                        <div className='flex flex-wrap gap-2 mt-2'>
                          {vendor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className='bg-accent/20 text-accent px-3 py-1 rounded-full text-xs'
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Contact Information
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <p className='text-neutral-400'>
                      Visit this vendor at their stall in{' '}
                      {vendor.markets?.[0]?.market?.name || 'the night market'}.
                      Hours and availability may vary based on weather and
                      seasonal factors.
                    </p>
                    {vendor.contactPhone && (
                      <div>
                        <p className='text-neutral-400'>Phone</p>
                        <p className='text-neutral-300'>
                          {vendor.contactPhone}
                        </p>
                      </div>
                    )}
                    {vendor.contactInstagram && (
                      <div>
                        <p className='text-neutral-400'>Instagram</p>
                        <a
                          href={`https://instagram.com/${vendor.contactInstagram}`}
                          className='text-primary hover:text-primary-light transition-colors'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          @{vendor.contactInstagram}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
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
                {vendor.markets && vendor.markets.length > 0 && (
                  <Link
                    href={`/explorer?market=${vendor.markets[0].market.id}`}
                    className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
                  >
                    Explore in Map
                  </Link>
                )}
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
                <Link href={`/explorer?market=${vendor.markets[0].market.id}`}>
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
