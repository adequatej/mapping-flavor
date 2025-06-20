export default function MarketLoading() {
  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Back Button Skeleton */}
        <div className='h-6 w-32 bg-neutral-800 rounded animate-pulse mb-8' />

        {/* Market Header Skeleton */}
        <div className='max-w-4xl mx-auto'>
          <div className='relative h-96 rounded-xl bg-neutral-800 animate-pulse mb-8' />

          {/* Research Focus Skeleton */}
          <div className='bg-secondary-light rounded-xl p-6 mb-8'>
            <div className='h-8 w-48 bg-neutral-700 rounded animate-pulse mb-4' />
            <div className='h-4 w-full bg-neutral-700 rounded animate-pulse mb-2' />
            <div className='h-4 w-3/4 bg-neutral-700 rounded animate-pulse' />
          </div>

          {/* Description Skeleton */}
          <div className='mb-8'>
            <div className='h-8 w-48 bg-neutral-800 rounded animate-pulse mb-4' />
            <div className='space-y-2'>
              <div className='h-4 w-full bg-neutral-800 rounded animate-pulse' />
              <div className='h-4 w-full bg-neutral-800 rounded animate-pulse' />
              <div className='h-4 w-3/4 bg-neutral-800 rounded animate-pulse' />
            </div>
          </div>

          {/* Analytical Note Skeleton */}
          <div className='bg-neutral-900 rounded-xl p-6 mb-8'>
            <div className='h-8 w-48 bg-neutral-700 rounded animate-pulse mb-4' />
            <div className='space-y-2'>
              <div className='h-4 w-full bg-neutral-700 rounded animate-pulse' />
              <div className='h-4 w-full bg-neutral-700 rounded animate-pulse' />
              <div className='h-4 w-3/4 bg-neutral-700 rounded animate-pulse' />
            </div>
          </div>

          {/* Key Findings Skeleton */}
          <div className='mb-8'>
            <div className='h-8 w-48 bg-neutral-800 rounded animate-pulse mb-4' />
            <div className='space-y-4'>
              {[1, 2, 3].map(i => (
                <div key={i} className='flex items-start space-x-3'>
                  <div className='h-4 w-4 bg-neutral-800 rounded-full animate-pulse mt-1' />
                  <div className='h-4 w-full bg-neutral-800 rounded animate-pulse' />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className='flex space-x-4'>
            <div className='h-12 w-48 bg-neutral-800 rounded-lg animate-pulse' />
            <div className='h-12 w-48 bg-neutral-800 rounded-lg animate-pulse' />
          </div>
        </div>
      </div>
    </div>
  )
}
