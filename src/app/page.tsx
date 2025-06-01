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
            <p className='text-lg md:text-xl text-neutral-200 mb-4'>
              A critical examination of Taiwanese cultural identity through
              night market food culture
            </p>
            <p className='text-md text-neutral-300 mb-8'>
              Exploring how food vendors preserve cultural memory and navigate
              identity in post-colonial Taiwan
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/explore'
                className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors text-center'
              >
                Explore the Map
              </Link>
              <Link
                href='/about'
                className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors text-center'
              >
                Research Framework
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className='py-16 bg-gradient-to-br from-secondary via-muted to-primary/5'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='font-bold text-3xl text-white mb-4'>
                Academic <span className='text-primary'>Research</span>
              </h2>
              <p className='text-lg text-neutral-300 max-w-3xl mx-auto'>
                This project investigates how night markets function as sites of
                cultural identity negotiation, examining the preservation of
                Taiwanese and Hakka culinary traditions
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary'>
                  <span className='text-primary font-bold text-2xl'>🍜</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Cultural Identity
                </h3>
                <p className='text-neutral-400'>
                  How do recipes encode political history and resist cultural
                  homogenization in Taiwan&apos;s post-colonial context?
                </p>
              </div>

              <div className='text-center'>
                <div className='w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent'>
                  <span className='text-accent font-bold text-2xl'>👥</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Community Memory
                </h3>
                <p className='text-neutral-400'>
                  Examining how family recipes and cooking techniques serve as
                  repositories of collective memory and cultural continuity
                </p>
              </div>

              <div className='text-center'>
                <div className='w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary'>
                  <span className='text-primary font-bold text-2xl'>🏛️</span>
                </div>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Democratic Spaces
                </h3>
                <p className='text-neutral-400'>
                  Analyzing night markets as accessible cultural venues that
                  transcend economic and social boundaries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets Section */}
      <section className='py-16 bg-secondary'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between mb-10'>
            <h2 className='font-bold text-3xl text-white'>
              Featured <span className='text-primary'>Case Studies</span>
            </h2>
            <Link
              href='/markets'
              className='text-primary hover:text-primary-light font-medium'
            >
              View All Markets
            </Link>
          </div>

          {/* Markets Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                id: 1,
                name: 'Shilin Night Market',
                focus: 'Tourism vs. Authenticity',
                description:
                  'Analyzing how cultural identity adapts to commercial pressures and tourist expectations',
              },
              {
                id: 2,
                name: 'Raohe Street Market',
                focus: 'Hakka Heritage',
                description:
                  'Exploring minority culture preservation within urban commercial spaces',
              },
              {
                id: 3,
                name: 'Kenting Night Market',
                focus: 'Regional Tourism Identity',
                description:
                  'Examining how beach resort tourism shapes regional food culture and identity performance',
              },
            ].map(market => (
              <div
                key={market.id}
                className='bg-secondary-light rounded-xl overflow-hidden border border-neutral-700 group hover:border-primary transition-colors'
              >
                <div className='relative h-48'>
                  <Image
                    src={`https://picsum.photos/800/400?random=${market.id}`}
                    alt={`${market.name} research case study`}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium'>
                    Case Study
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-white mb-1'>
                    {market.name}
                  </h3>
                  <p className='text-primary text-sm font-medium mb-3'>
                    Focus: {market.focus}
                  </p>
                  <p className='text-neutral-400 text-sm'>
                    {market.description}
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
              Taiwan's night markets aren't just food destinations, they're
              cultural sites where identity, memory, and community intersect.
              Through ethnographic research and cultural analysis, I explore how
              vendors serve as keepers of cultural heritage and how recipes
              encode generations of history.
            </p>
            <Link
              href='/about'
              className='inline-block bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-lg transition-colors'
            >
              Learn More About My Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
