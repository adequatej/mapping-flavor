import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative min-h-[85vh] flex items-center'>
        {/* Background Overlay */}
        <div className='absolute inset-0 bg-black/50 z-10' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-secondary z-10' />

        {/* Background Image */}
        <div
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=2874&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Hero Content */}
        <div className='container mx-auto px-4 relative z-20'>
          <div className='max-w-2xl'>
            <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4'>
              Discover Taiwan&apos;s{' '}
              <span className='text-primary'>Night Markets</span>
            </h1>
            <p className='text-lg md:text-xl text-neutral-200 mb-8'>
              Explore the vibrant flavors and cultural heritage of Taiwan&apos;s
              most beloved night markets
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/explore'
                className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors text-center'
              >
                Explore the Map
              </Link>
              <Link
                href='/markets'
                className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors text-center'
              >
                Browse Markets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets Section */}
      <section className='py-16 bg-secondary'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between mb-10'>
            <h2 className='font-bold text-3xl text-white'>
              Featured <span className='text-primary'>Night Markets</span>
            </h2>
            <Link
              href='/markets'
              className='text-primary hover:text-primary-light font-medium'
            >
              View All
            </Link>
          </div>

          {/* Markets Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className='bg-secondary-light rounded-xl overflow-hidden border border-neutral-700 group hover:border-primary transition-colors'
              >
                <div className='relative h-48'>
                  <Image
                    src={`https://picsum.photos/800/400?random=${i}`}
                    alt={`Featured night market ${i}`}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    Night Market {i}
                  </h3>
                  <p className='text-neutral-400'>
                    Experience the vibrant atmosphere and delicious street food
                    at this popular night market.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='py-16 bg-neutral-900'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='font-bold text-3xl text-white mb-6'>
              Discover the <span className='text-primary'>Culture</span> Behind
              the Food
            </h2>
            <p className='text-lg text-neutral-300 mb-8'>
              Taiwan&apos;s night markets are more than just food
              destinations—they&apos;re cultural experiences that bring
              communities together. From family recipes passed down through
              generations to innovative fusion dishes, each vendor has a unique
              story to tell.
            </p>
            <Link
              href='/about'
              className='inline-block bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-lg transition-colors'
            >
              Learn More About Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
