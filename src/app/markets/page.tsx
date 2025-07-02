// Research sites overview - displays night markets with cultural analysis framework
'use client'

import Image from 'next/image'
import Link from 'next/link'
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
}

interface ApiResponse {
  success: boolean
  data: Market[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function Markets() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/markets')

        if (!response.ok) {
          throw new Error('Failed to fetch markets')
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setMarkets(data.data)
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='animate-pulse'>
              <div className='h-12 bg-neutral-800 rounded mb-4'></div>
              <div className='h-6 bg-neutral-800 rounded mb-8'></div>
              <div className='space-y-8'>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className='h-80 bg-neutral-800 rounded-xl'></div>
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
            Cultural Identity <span className='text-primary'>Negotiations</span>
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed mb-4'>
            Four markets, four different ways cultural identity gets performed,
            contested, and negotiated
          </p>
          <p className='text-neutral-400'>
            Each site shows how vendors navigate between tourist expectations,
            economic pressures, and cultural preservation
          </p>
        </div>

        {/* Argument Framework */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-6'>
            <span className='text-primary'>Research Framework</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-6'>
            Each night market in this study represents a different aspect of how
            cultural identity works in Taiwan's commercial spaces. Rather than
            treating these markets as simple tourist attractions or "authentic"
            cultural sites, this analysis examines how different versions of
            "Taiwanese identity" get negotiated, performed, and sometimes erased
            in everyday interactions between vendors and customers.
          </p>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-white font-semibold mb-3'>
                Identity Performance vs. Cultural Preservation
              </h3>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                Each market shows how vendors balance performing "authentic
                Taiwan" for tourists while maintaining actual cultural
                practices. This reveals the gap between what gets marketed as
                Taiwanese culture and what vendors actually preserve in their
                daily work.
              </p>
            </div>
            <div>
              <h3 className='text-white font-semibold mb-3'>
                Power Dynamics in Cultural Spaces
              </h3>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                These markets demonstrate how economic constraints, spatial
                politics, and cultural capital determine whose cultural
                narratives become visible and whose remain hidden, challenging
                claims about night markets as "democratic" cultural spaces.
              </p>
            </div>
          </div>
        </div>

        {/* Research Note */}
        <div className='bg-neutral-900 rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>Methodology</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            This research uses critical observational analysis across four
            Taiwan night markets, following Chen and Huang's (2014) framework
            for analyzing vendor behaviors while incorporating postcolonial
            approaches (Said, 1978; Scott, 1990) that examine power dynamics in
            cultural spaces. Analysis focuses on publicly observable patterns:
            language switching, menu variations for different audiences, spatial
            organization, and vendor-customer interactions.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Research Limitations:</strong> These observations represent
            specific moments in time and are shaped by my position as an outside
            researcher. They serve as evidence for broader patterns of cultural
            identity negotiation rather than definitive statements about vendor
            experiences.
          </p>
        </div>

        {/* Content Bridge */}
        <div className='bg-primary/10 rounded-lg p-6 mb-12 max-w-4xl mx-auto text-center'>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            <strong className='text-white'>The Four Case Studies Below</strong>{' '}
            each show a different way that "Taiwanese identity" gets contested
            and negotiated in night markets:
          </p>
          <div className='grid md:grid-cols-2 gap-4 text-sm'>
            <div className='text-left'>
              <p className='text-white font-medium'>Shilin:</p>
              <p className='text-neutral-400'>
                Identity performed differently for tourists vs locals
              </p>
            </div>
            <div className='text-left'>
              <p className='text-white font-medium'>Raohe:</p>
              <p className='text-neutral-400'>
                Ethnic minorities competing for space within "Taiwanese"
                identity
              </p>
            </div>
            <div className='text-left'>
              <p className='text-white font-medium'>Huaxi:</p>
              <p className='text-neutral-400'>
                Working-class authentic practices vs commodified culture
              </p>
            </div>
            <div className='text-left'>
              <p className='text-white font-medium'>Kenting:</p>
              <p className='text-neutral-400'>
                Local identity adapting to external tourism pressures
              </p>
            </div>
          </div>
        </div>

        {/* Markets Grid */}
        <div className='space-y-12'>
          {markets.map((market, index) => (
            <div
              key={market.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
            >
              {/* Image */}
              <div
                className={`relative h-80 rounded-xl overflow-hidden ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
              >
                <Image
                  src={market.image}
                  alt={`${market.name} observation site`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm'>
                  Est. {market.established}
                </div>
                <div className='absolute bottom-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs'>
                  Field Site
                </div>
              </div>

              {/* Content */}
              <div
                className={`space-y-4 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}
              >
                <div>
                  <h3 className='text-2xl font-bold text-white mb-1'>
                    {market.name}
                  </h3>
                  <p className='text-neutral-400 text-sm mb-2'>
                    {market.chineseName} • {market.location}
                  </p>
                  <div className='inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium'>
                    Focus: {market.researchFocus}
                  </div>
                </div>

                <p className='text-neutral-300 leading-relaxed'>
                  {market.description}
                </p>

                {/* Analytical Reflection */}
                <div className='bg-neutral-900 rounded-lg p-4'>
                  <h4 className='text-accent font-semibold mb-2'>
                    Theoretical Connection
                  </h4>
                  <p className='text-neutral-400 text-sm leading-relaxed'>
                    {market.analyticalNote}
                  </p>
                </div>

                {/* Observations */}
                <div>
                  <h4 className='text-white font-semibold mb-3'>
                    What I Noticed
                  </h4>
                  <ul className='space-y-2'>
                    {market.keyFindings.map((finding, i) => (
                      <li
                        key={i}
                        className='flex items-start space-x-2 text-sm'
                      >
                        <span className='text-primary mt-1'>•</span>
                        <span className='text-neutral-400'>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-wrap gap-3 pt-4'>
                  <Link
                    href={`/markets/${market.id}`}
                    className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
                  >
                    Detailed Analysis
                  </Link>
                  <Link
                    href={`/vendors?market=${market.id}`}
                    className='bg-accent hover:bg-accent-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
                  >
                    View Vendors
                  </Link>
                  <Link
                    href={`/explorer?market=${market.id}`}
                    className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-2 px-4 rounded-lg border border-neutral-600 transition-colors text-sm'
                  >
                    Interactive Map
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps Guidance */}
        <div className='mt-16 bg-accent/10 rounded-lg p-6 max-w-4xl mx-auto text-center'>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            <strong className='text-white'>Continue Reading:</strong> Each
            market page contains detailed cultural analysis and vendor case
            studies. For the complete argument, read all four markets or explore
            individual vendor stories that demonstrate these patterns in
            practice.
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            <Link
              href='/vendors'
              className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
            >
              View All Vendor Evidence
            </Link>
            <Link
              href='/explorer'
              className='bg-accent hover:bg-accent-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
            >
              Interactive Market Explorer
            </Link>
          </div>
        </div>

        {/* Reflection Section */}
        <div className='mt-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Still Figuring It Out
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h4 className='text-white font-semibold mb-3'>What's Next?</h4>
              <p className='text-neutral-300 text-sm mb-4'>
                These observations raise more questions than they answer, which
                feels right for this kind of cultural analysis. I want to dig
                deeper into the role of language, generational differences, and
                how digital representation might change these spaces.
              </p>
              <p className='text-neutral-400 text-sm'>
                I'm also thinking about Indigenous food cultures that are
                largely absent from these tourist-facing markets. Whose voices
                aren't heard in these "democratic" spaces?
              </p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Academic Honesty
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                This research is limited by my perspective as an outsider and
                the brief time I spent in each market. Real cultural
                understanding takes much longer and requires deeper
                relationships with vendors and community members.
              </p>
              <Link
                href='/about'
                className='inline-block bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
              >
                Read About My Approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
