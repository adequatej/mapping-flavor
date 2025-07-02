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
    if (vendor.name === 'Big Sausage Uncle') {
      return {
        keyInsight:
          'Big Sausage Uncle demonstrates sophisticated audience recognition by maintaining traditional preparation methods while adapting presentation for tourist photography.',
        specificEvidence:
          'Observed the vendor switching between rapid-fire Taiwanese dialect with local customers and slower, more demonstrative Mandarin with tourists. He actively helps tourists take photos of their food, positioning dishes for optimal social media appeal while maintaining the same authentic preparation techniques.',
        culturalStrategy:
          'This vendor shows how traditional street food can be commodified for tourism without losing its cultural authenticity. The sausage preparation remains unchanged, but the presentation and customer interaction adapt to different audiences.',
        theoreticalConnection:
          'Demonstrates Scott\'s concept of "public transcripts" - performing cultural authenticity for tourist consumption while maintaining different practices for local customers.',
        marketConnection:
          "As a key vendor in Shilin Night Market's main food street, Big Sausage Uncle exemplifies how vendors adapt traditional foods for tourist consumption while maintaining authenticity. His strategic performance of cultural identity through language switching and photo assistance demonstrates the broader patterns of cultural commodification observed throughout Shilin.",
        researchContribution:
          'Through detailed observation of customer interactions and preparation methods, this vendor provides concrete evidence of how individual entrepreneurs navigate tourist expectations while preserving cultural authenticity. The documented language switching and presentation adaptations support broader arguments about strategic cultural performance in tourist-oriented night markets.',
        vendorDemonstrates:
          'This vendor shows how successful cultural commodification requires sophisticated audience awareness and strategic adaptation. By maintaining traditional preparation while modifying presentation and communication, Big Sausage Uncle demonstrates how vendors can satisfy tourist expectations without compromising cultural authenticity.',
        researchMethodology:
          'Observations focused on customer interactions, language use, and food preparation techniques, documenting how this vendor adapts presentation and communication for different audiences while maintaining traditional methods.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === "Mei-Li's Stinky Tofu") {
      return {
        keyInsight:
          'Mei-Li serves as a cultural ambassador, patiently introducing challenging traditional foods to international audiences while preserving authentic fermentation methods.',
        specificEvidence:
          'Watched Mei-Li spend 15 minutes explaining the fermentation process to a group of Japanese tourists, using both Mandarin and basic English. She demonstrated the traditional preparation method while explaining its cultural significance, showing how patience and education can bridge cultural gaps.',
        culturalStrategy:
          'Rather than adapting the food for tourist tastes, Mei-Li adapts her communication to make traditional food accessible. This preserves cultural authenticity while making it approachable for international visitors.',
        theoreticalConnection:
          'Shows how cultural education can resist orientalist dynamics by giving tourists genuine understanding rather than simplified performances.',
        marketConnection:
          "Operating in Shilin Night Market's cultural food section, Mei-Li demonstrates how vendors can maintain traditional practices while making them accessible to international audiences. Her educational approach aligns with the market's broader role in cultural transmission.",
        researchContribution:
          "This vendor's educational approach provides evidence for how cultural authenticity can be maintained through communication rather than adaptation. The documented interactions with tourists demonstrate strategies for cultural preservation in commercial spaces.",
        vendorDemonstrates:
          "Through patient cultural education and preserved traditional methods, this vendor shows how challenging traditional foods can be made accessible without compromising authenticity. Mei-Li's approach demonstrates the importance of communication in cultural preservation.",
        researchMethodology:
          'Research focused on vendor-customer educational interactions, documenting how traditional knowledge is transmitted across cultural and linguistic barriers while maintaining authentic practices.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === 'Night Market Bubble Tea King') {
      return {
        keyInsight:
          'The Bubble Tea King represents the evolution of traditional Taiwanese drinks for social media culture while maintaining cultural identity.',
        specificEvidence:
          'Observed the vendor creating elaborate drink presentations specifically designed for Instagram photography - colorful layers, decorative toppings, and branded cups. Yet the core tea preparation follows traditional methods, and he serves the same quality to local customers.',
        culturalStrategy:
          'This vendor shows how traditional beverages can evolve for contemporary culture without losing their cultural roots. The presentation adapts to social media trends while the essence remains authentically Taiwanese.',
        theoreticalConnection:
          "Demonstrates Appadurai's concept of cultural flows - how local traditions adapt to global digital culture while maintaining regional distinctiveness.",
        marketConnection:
          "Located in Shilin's modern beverage section, this vendor shows how traditional drinks evolve within contemporary digital culture. The adaptation of presentation while maintaining traditional preparation methods reflects broader patterns of cultural evolution in the market.",
        researchContribution:
          'This case study reveals how traditional beverages adapt to digital culture without losing authenticity. The documented balance between social media appeal and traditional methods provides evidence for cultural evolution in commercial spaces.',
        vendorDemonstrates:
          'Through strategic adaptation to digital culture, this vendor shows how traditional beverages can maintain cultural authenticity while embracing contemporary presentation styles. The balance achieved demonstrates successful cultural evolution.',
        researchMethodology:
          'Observations centered on preparation methods and presentation techniques, documenting how traditional practices adapt to contemporary digital culture while maintaining cultural authenticity.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    // Raohe Street Market Vendors
    if (vendor.name === "Grandma Chen's Hakka Noodles") {
      return {
        keyInsight:
          "Grandma Chen's three-generation family business preserves traditional Hakka flat noodle recipes, showing how minority cultures maintain identity through food traditions.",
        specificEvidence:
          'Observed three generations working together - Grandma Chen teaching her granddaughter the traditional kneading technique while her daughter manages customer interactions. The family speaks Hakka dialect among themselves but switches to Mandarin with customers.',
        culturalStrategy:
          'This vendor demonstrates strategic cultural preservation through family knowledge transfer. The Hakka identity is maintained through traditional preparation methods and family communication, while adaptation happens in customer service.',
        theoreticalConnection:
          'Shows how minority communities deploy distinct cultural knowledge as economic assets while preserving cultural authenticity (Bourdieu 1984).',
        marketConnection:
          "As a prominent Hakka vendor in Raohe Street Market, Grandma Chen's stall exemplifies how minority cultures maintain visibility through food traditions. The multi-generational operation demonstrates the market's role in cultural preservation.",
        researchContribution:
          'This vendor provides crucial evidence for how minority cultures maintain identity through family-based knowledge transmission. The documented intergenerational teaching and language use patterns reveal strategies for cultural preservation.',
        vendorDemonstrates:
          'Through family collaboration and maintained traditions, this vendor shows how minority cultures preserve identity within mainstream commercial spaces. The balance of tradition and adaptation demonstrates successful cultural resistance.',
        researchMethodology:
          'Research focused on family interactions, knowledge transmission, and language use patterns, documenting how cultural practices are preserved and passed between generations.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === 'Heritage Pepper Buns') {
      return {
        keyInsight:
          'Heritage Pepper Buns preserves traditional clay oven techniques and Hakka-style spice blends, maintaining cultural distinctiveness within Taiwanese food culture.',
        specificEvidence:
          "The vendor uses a traditional clay oven that's increasingly rare in modern Taiwan. The Hakka spice blend includes specific herbs and preparation methods that distinguish these buns from mainstream versions. Customers can taste the difference.",
        culturalStrategy:
          'This vendor maintains cultural distinctiveness through authentic preparation methods rather than marketing. The quality and traditional techniques speak for themselves, preserving Hakka identity through genuine cultural practice.',
        theoreticalConnection:
          "Demonstrates Gramsci's concept of cultural resistance, showing how minority cultures maintain distinct practices within dominant cultural systems while creating economic sustainability (Gramsci 1971).",
        marketConnection:
          "Operating in Raohe Street Market's traditional food section, this vendor maintains authentic Hakka preparation methods that distinguish their products. The preserved techniques demonstrate the market's role in maintaining cultural diversity.",
        researchContribution:
          'This case study shows how traditional techniques serve as markers of cultural identity. The documented preparation methods and spice combinations provide evidence for cultural distinctiveness in commercial spaces.',
        vendorDemonstrates:
          'Through preserved traditional techniques and authentic spice blends, this vendor shows how minority cultures maintain distinctiveness through genuine practice rather than performative display.',
        researchMethodology:
          'Observations centered on preparation techniques and ingredient selection, documenting how traditional methods serve as markers of cultural identity.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === 'Three Generations Tea Eggs') {
      return {
        keyInsight:
          'Three Generations Tea Eggs shows how simple dishes carry complex cultural knowledge and serve as vehicles for preserving minority culture.',
        specificEvidence:
          'Observed the family working together, with each generation contributing to the preparation. The grandmother oversees the spice blend, the mother manages timing, and the granddaughter handles customer service. The Hakka spice combination is distinct from mainstream preparations.',
        culturalStrategy:
          'This vendor preserves cultural identity through family collaboration and traditional recipes. The simple tea egg becomes a vehicle for cultural transmission and community connection.',
        theoreticalConnection:
          'Shows how working-class communities maintain practices that serve community needs rather than market demands (Scott 1990).',
        marketConnection:
          "Located in Raohe Street Market's snack section, this vendor demonstrates how simple foods carry complex cultural significance. The family operation shows the market's role in supporting intergenerational cultural transmission.",
        researchContribution:
          'This vendor reveals how everyday foods serve as vehicles for cultural preservation. The documented family dynamics and recipe maintenance provide evidence for cultural transmission through commercial practice.',
        vendorDemonstrates:
          'Through family collaboration and preserved recipes, this vendor shows how simple foods maintain complex cultural significance. The intergenerational operation demonstrates successful cultural preservation.',
        researchMethodology:
          'Research focused on family roles, recipe preservation, and preparation techniques, documenting how everyday foods serve as vehicles for cultural transmission.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    // Huaxi Street Market Vendors
    if (vendor.name === "Old Wang's Snake Soup") {
      return {
        keyInsight:
          "Old Wang's Snake Soup maintains traditional food culture that resists gentrification, serving as an authentic community gathering space for working-class customers.",
        specificEvidence:
          'Observed regular customers who know Old Wang by name, discussing work and family while eating. The soup follows traditional Chinese medicine principles, and the pricing remains accessible to working-class customers despite rising costs elsewhere.',
        culturalStrategy:
          'This vendor prioritizes community service over profit maximization, maintaining traditional practices and affordable pricing to serve the local working-class population.',
        theoreticalConnection:
          "Demonstrates Scott's concept of working-class cultural autonomy - maintaining practices that serve community needs rather than market demands.",
        marketConnection:
          "As a long-standing vendor in Huaxi Street Market, Old Wang's stall exemplifies the market's role in preserving working-class food culture. The maintained affordability and community atmosphere demonstrate resistance to gentrification.",
        researchContribution:
          'This vendor provides evidence for how traditional food practices resist market pressures. The documented community interactions and pricing strategies reveal mechanisms of cultural preservation.',
        vendorDemonstrates:
          'Through maintained affordability and community focus, this vendor shows how traditional practices resist gentrification. The preserved accessibility demonstrates successful cultural resistance.',
        researchMethodology:
          'Observations centered on customer interactions, pricing strategies, and community formation, documenting how traditional practices resist market pressures.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === "Workers' Noodle Stand") {
      return {
        keyInsight:
          "The Workers' Noodle Stand functions as a democratic cultural space where economic barriers to participation are minimized through affordable pricing and communal dining.",
        specificEvidence:
          'Observed shared tables where construction workers, office employees, and students eat together regardless of income level. The vendor knows regular customers by name and remembers their usual orders. Pricing is specifically maintained for working-class accessibility.',
        culturalStrategy:
          'This vendor creates genuine community through economic accessibility and authentic cultural practices, resisting the commodification of food culture.',
        theoreticalConnection:
          'Shows Lefebvre\'s "right to the city" concept - creating inclusive cultural spaces that serve community needs rather than tourist expectations.',
        marketConnection:
          "Operating in Huaxi Street Market's main food section, this vendor demonstrates the market's role in maintaining economic accessibility. The communal dining space shows how food culture creates social connections across class boundaries.",
        researchContribution:
          'This case study reveals how economic accessibility creates genuine cultural participation. The documented social interactions and pricing strategies provide evidence for democratic cultural spaces.',
        vendorDemonstrates:
          'Through maintained affordability and communal spaces, this vendor shows how food culture creates genuine community. The cross-class interactions demonstrate successful cultural democracy.',
        researchMethodology:
          'Research focused on social interactions, pricing strategies, and community formation, documenting how economic accessibility creates genuine cultural participation.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === 'Night Shift Dumplings') {
      return {
        keyInsight:
          'Night Shift Dumplings demonstrates how night markets support working-class community needs beyond tourism, serving essential social infrastructure for non-traditional work schedules.',
        specificEvidence:
          'Observed night shift workers from nearby industries gathering for meals at 2 AM. The vendor operates 24 hours to serve these workers, creating a community space for people who work outside traditional hours.',
        culturalStrategy:
          'This vendor adapts to community needs rather than market demands, serving working-class schedules and creating social connections for night workers.',
        theoreticalConnection:
          "Demonstrates Lefebvre's concept of social space production, showing how working-class communities create cultural spaces that serve their specific needs and schedules, resisting mainstream temporal and spatial organization (Lefebvre 1968).",
        marketConnection:
          "Located in Huaxi Street Market's 24-hour section, this vendor shows how the market serves diverse community needs. The night shift focus demonstrates adaptation to working-class schedules.",
        researchContribution:
          'This vendor reveals how night markets serve essential community functions. The documented late-night interactions provide evidence for cultural spaces adapting to working-class needs.',
        vendorDemonstrates:
          'Through 24-hour operation and community focus, this vendor shows how night markets serve essential social functions. The adapted schedule demonstrates successful community service.',
        researchMethodology:
          'Observations conducted during night shifts, focusing on community formation and social interactions during non-traditional hours.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    // Kenting Night Market Vendors
    if (vendor.name === 'Beach BBQ Seafood') {
      return {
        keyInsight:
          'Beach BBQ Seafood demonstrates how regional food culture adapts to tourism while maintaining connections to local fishing traditions.',
        specificEvidence:
          'Observed the vendor sourcing fresh seafood from local fishing boats and adapting preparation methods for beach tourists - larger portions, more seasoning, and beach-friendly presentation. Yet the core preparation methods remain traditional.',
        culturalStrategy:
          'This vendor balances local fishing culture with tourism expectations, creating adaptations that serve both communities without sacrificing cultural authenticity.',
        theoreticalConnection:
          'Demonstrates concepts of cultural flows and glocalization, showing how local traditions successfully hybridize with global influences while maintaining cultural distinctiveness (Appadurai 1996; Robertson 1995).',
        marketConnection:
          "As a prominent seafood vendor in Kenting Night Market, this stall shows how local fishing traditions adapt to tourism. The balanced approach demonstrates the market's role in cultural adaptation.",
        researchContribution:
          'This vendor provides evidence for successful cultural adaptation to tourism. The documented balance between local traditions and tourist expectations reveals strategies for cultural preservation.',
        vendorDemonstrates:
          'Through maintained fishing connections and adapted presentation, this vendor shows how local traditions evolve with tourism. The preserved authenticity demonstrates successful cultural adaptation.',
        researchMethodology:
          'Research focused on sourcing practices, preparation methods, and customer interactions, documenting how local traditions adapt to tourism demands.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === 'Tropical Fruit Smoothies') {
      return {
        keyInsight:
          'Tropical Fruit Smoothies shows how regional agricultural identity adapts to tourism economy while preserving connections to local farming traditions.',
        specificEvidence:
          'Observed the vendor using local tropical fruits including indigenous varieties, adapting traditional fruit consumption for beach tourism context. The smoothies incorporate local agricultural knowledge while appealing to tourist preferences.',
        culturalStrategy:
          'This vendor preserves regional agricultural identity through ingredient selection while adapting presentation for tourism, showing how local farming traditions can thrive in tourism economies.',
        theoreticalConnection:
          "Shows Appadurai's concept of cultural flows - how local agricultural practices adapt to global tourism while maintaining regional distinctiveness.",
        marketConnection:
          "Operating in Kenting Night Market's beverage section, this vendor demonstrates how local agricultural traditions adapt to tourism. The use of indigenous fruits shows the market's role in preserving regional identity.",
        researchContribution:
          'This case study reveals how agricultural traditions adapt to tourism economies. The documented ingredient selection and preparation methods provide evidence for cultural preservation.',
        vendorDemonstrates:
          'Through indigenous ingredient use and adapted presentation, this vendor shows how agricultural traditions evolve with tourism. The maintained connections demonstrate successful cultural adaptation.',
        researchMethodology:
          'Observations centered on ingredient sourcing, preparation methods, and cultural knowledge transmission, documenting how agricultural traditions adapt to tourism.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
      }
    }

    if (vendor.name === "Surfer's Late Night Noodles") {
      return {
        keyInsight:
          "Surfer's Late Night Noodles represents the intersection of traditional Taiwanese food culture with global beach and surf culture.",
        specificEvidence:
          'Observed both local and international surfers eating together, with the vendor adapting traditional noodle preparation for beach lifestyle - lighter seasoning, more vegetables, and casual presentation. The core Taiwanese identity remains through traditional preparation methods.',
        culturalStrategy:
          'This vendor creates cultural bridges between local traditions and international beach culture, showing how Taiwanese food can adapt to global lifestyles while maintaining cultural identity.',
        theoreticalConnection:
          'Demonstrates concepts of cultural flows and glocalization, showing how local traditions successfully hybridize with global influences while maintaining cultural distinctiveness (Appadurai 1996; Robertson 1995).',
        marketConnection:
          "Located in Kenting Night Market's late-night section, this vendor shows how local food culture adapts to international beach lifestyle. The hybrid approach demonstrates the market's evolution with global influences.",
        researchContribution:
          'This vendor reveals how local food culture successfully hybridizes with global influences. The documented adaptations provide evidence for cultural evolution in tourist economies.',
        vendorDemonstrates:
          'Through balanced adaptation and maintained traditions, this vendor shows how local food culture evolves with global influences. The successful hybridization demonstrates cultural resilience.',
        researchMethodology:
          'Research focused on cross-cultural interactions, preparation adaptations, and community formation, documenting how local traditions evolve with global influences.',
        ethicalConsiderations:
          'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.',
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
              </section>
            )}

            {/* Key Insight - Vendor Specific */}
            <section className='bg-primary/10 rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                Key Research Finding
              </h2>
              <p className='text-neutral-300 leading-relaxed text-lg'>
                {vendorContent.keyInsight}
              </p>
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

            {/* Cultural Strategy - Vendor Specific */}
            <section className='bg-accent/10 rounded-lg p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                Cultural Strategy
              </h2>
              <p className='text-neutral-300 leading-relaxed text-lg'>
                {vendorContent.culturalStrategy}
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

            {/* Research Ethics and Methodology */}
            <section className='bg-neutral-900 rounded-lg p-8'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Research Ethics & Methodology
              </h2>

              <div className='grid md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Research Approach
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <p className='text-neutral-300 leading-relaxed'>
                      {vendorContent.researchMethodology}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Ethical Considerations
                  </h3>
                  <div className='space-y-3 text-sm'>
                    <p className='text-neutral-300 leading-relaxed'>
                      {vendorContent.ethicalConsiderations ||
                        'This analysis focuses on publicly observable cultural patterns and practices rather than personal details, maintaining appropriate academic boundaries while preserving the research value of the observations.'}
                    </p>
                    <Link
                      href='/about'
                      className='text-primary hover:text-primary-light transition-colors inline-block'
                    >
                      Learn more about research ethics →
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
