import { Market, markets } from '@/data/markets'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface MarketDetailPageProps {
  params: {
    id: string
  }
}

export default function MarketDetailPage({ params }: MarketDetailPageProps) {
  const market = markets.find((m: Market) => m.id === params.id)

  if (!market) {
    notFound()
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Back Button */}
        <Link
          href='/markets'
          className='inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors'
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Markets
        </Link>

        {/* Market Header */}
        <div className='max-w-4xl mx-auto'>
          <div className='relative h-96 rounded-xl overflow-hidden mb-8'>
            <Image
              src={market.image}
              alt={`${market.name} observation site`}
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 p-8'>
              <h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
                {market.name}
              </h1>
              <p className='text-xl text-neutral-300'>
                {market.chineseName} • {market.location}
              </p>
              <div className='mt-4 inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium'>
                Established {market.established}
              </div>
            </div>
          </div>

          {/* Research Focus */}
          <div className='bg-secondary-light rounded-xl p-6 mb-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Research Focus
            </h2>
            <p className='text-neutral-300 leading-relaxed'>
              {market.researchFocus}
            </p>
          </div>

          {/* Description */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Market Description
            </h2>
            <p className='text-neutral-300 leading-relaxed'>
              {market.description}
            </p>
          </div>

          {/* Analytical Note */}
          <div className='bg-neutral-900 rounded-xl p-6 mb-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Analytical Reflection
            </h2>
            <p className='text-neutral-300 leading-relaxed'>
              {market.analyticalNote}
            </p>
          </div>

          {/* Key Findings */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>Key Findings</h2>
            <ul className='space-y-4'>
              {market.keyFindings.map((finding: string, index: number) => (
                <li
                  key={index}
                  className='flex items-start space-x-3 text-neutral-300'
                >
                  <span className='text-primary mt-1'>•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className='flex space-x-4'>
            <Link
              href={`/explorer?market=${market.id}`}
              className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
            >
              Explore in Interactive Map
            </Link>
            <Link
              href='/markets'
              className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors'
            >
              View All Markets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
