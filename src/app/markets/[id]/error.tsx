'use client'

import Link from 'next/link'

export default function MarketError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl font-bold text-white mb-6'>
            Something went wrong!
          </h1>
          <p className='text-neutral-300 mb-8'>
            {error.message ||
              'An error occurred while loading the market details.'}
          </p>
          <div className='flex justify-center space-x-4'>
            <button
              onClick={reset}
              className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
            >
              Try again
            </button>
            <Link
              href='/markets'
              className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors'
            >
              Back to Markets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
