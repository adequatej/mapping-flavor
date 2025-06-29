import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative min-h-[90vh] flex items-center'>
        {/* Background Overlay */}
        <div className='absolute inset-0 bg-black/40 z-10' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-secondary/60 z-10' />

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
          <div className='max-w-3xl'>
            <div className='mb-6'>
              <div className='inline-block bg-white/80 backdrop-blur-sm text-neutral-700 px-4 py-2 rounded-full text-xs font-medium mb-6 shadow-sm'>
                🎓 Academic Research
              </div>
            </div>
            <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6'>
              Taiwan&apos;s <span className='text-primary'>Night Markets</span>
            </h1>
            <p className='text-xl md:text-2xl text-neutral-200 mb-6 font-light leading-relaxed'>
              A critical examination of cultural identity through food spaces
            </p>
            <p className='text-lg text-neutral-300 mb-10 leading-relaxed max-w-2xl'>
              Exploring how vendors preserve cultural memory and navigate
              identity politics in Taiwan's post-colonial commercial spaces
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/explorer'
                className='group bg-primary hover:bg-primary-dark text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/25'
              >
                Explore Interactive Map
                <svg
                  className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
              <Link
                href='/about'
                className='group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-4 px-8 rounded-xl border border-white/20 transition-all duration-300 text-center flex items-center justify-center gap-2'
              >
                Research Framework
                <svg
                  className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className='py-24 bg-neutral-900'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='font-bold text-4xl md:text-5xl text-white mb-6'>
                Research <span className='text-primary'>Focus</span>
              </h2>
              <p className='text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed'>
                This project investigates how night markets function as
                contested sites where different versions of "Taiwanese identity"
                are negotiated, performed, and sometimes erased
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              {/* Card 1 - What This Research Explores */}
              <div className='relative'>
                <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-700/50 h-full'>
                  {/* Icon with improved design */}
                  <div className='relative mb-6'>
                    <div className='w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20'>
                      <svg
                        className='w-7 h-7 text-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                      </svg>
                    </div>
                    {/* Decorative element */}
                    <div className='absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full blur-sm'></div>
                  </div>

                  <h3 className='text-xl font-bold text-white mb-4'>
                    What This Research Explores
                  </h3>
                  <p className='text-neutral-300 leading-relaxed text-sm'>
                    Taiwan's night markets as vibrant cultural spaces where
                    different versions of identity, tradition, and authenticity
                    are negotiated through food, language, and daily
                    interactions
                  </p>

                  {/* Bottom accent */}
                  <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent rounded-b-2xl'></div>
                </div>
              </div>

              {/* Card 2 - Why It Matters */}
              <div className='relative'>
                <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-700/50 h-full'>
                  {/* Icon with improved design */}
                  <div className='relative mb-6'>
                    <div className='w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center border border-accent/20'>
                      <svg
                        className='w-7 h-7 text-accent'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        />
                      </svg>
                    </div>
                    {/* Decorative element */}
                    <div className='absolute -top-2 -right-2 w-4 h-4 bg-accent/20 rounded-full blur-sm'></div>
                  </div>

                  <h3 className='text-xl font-bold text-white mb-4'>
                    Why It Matters
                  </h3>
                  <p className='text-neutral-300 leading-relaxed text-sm'>
                    Understanding how culture actually works in everyday
                    commercial spaces, not just official heritage sites, and how
                    ordinary people navigate questions of identity, belonging,
                    and authenticity
                  </p>

                  {/* Bottom accent */}
                  <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent rounded-b-2xl'></div>
                </div>
              </div>

              {/* Card 3 - What You Can Discover */}
              <div className='relative'>
                <div className='bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-700/50 h-full'>
                  {/* Icon with improved design */}
                  <div className='relative mb-6'>
                    <div className='w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20'>
                      <svg
                        className='w-7 h-7 text-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                        />
                      </svg>
                    </div>
                    {/* Decorative element */}
                    <div className='absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full blur-sm'></div>
                  </div>

                  <h3 className='text-xl font-bold text-white mb-4'>
                    What You Can Discover
                  </h3>
                  <p className='text-neutral-300 leading-relaxed text-sm'>
                    Detailed profiles of four distinct markets, stories from
                    individual vendors, an interactive map for exploration, and
                    insights into how digital documentation can capture cultural
                    complexity
                  </p>

                  {/* Bottom accent */}
                  <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent rounded-b-2xl'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets Section */}
      <section className='py-24 bg-secondary'>
        <div className='container mx-auto px-4'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between mb-16'>
              <div>
                <h2 className='font-bold text-4xl md:text-5xl text-white mb-4'>
                  Research <span className='text-primary'>Case Studies</span>
                </h2>
                <p className='text-xl text-neutral-300 max-w-2xl'>
                  Four distinct markets revealing different aspects of cultural
                  identity negotiation
                </p>
              </div>
              <Link
                href='/markets'
                className='group text-primary hover:text-primary-light font-medium flex items-center gap-2 mt-6 md:mt-0'
              >
                View All Markets
                <svg
                  className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </div>

            {/* Markets Grid - Wider Cards */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10'>
              {[
                {
                  id: 'shilin-night-market',
                  name: 'Shilin Night Market',
                  focus: 'Tourism vs. Authenticity',
                  description:
                    'Analyzing how cultural identity adapts to commercial pressures and tourist expectations while maintaining traces of authentic local practices.',
                  highlight: 'Most visited night market in Taiwan',
                },
                {
                  id: 'raohe-street-market',
                  name: 'Raohe Street Market',
                  focus: 'Hakka Heritage & Visibility',
                  description:
                    'Exploring minority culture preservation within urban commercial spaces and how Hakka vendors navigate cultural visibility.',
                  highlight: 'Historic traditional market setting',
                },
                {
                  id: 'huaxi-street-market',
                  name: 'Huaxi Street Market',
                  focus: 'Working Class Food Culture',
                  description:
                    'Examining democratic cultural spaces and community formation through accessible pricing and working-class food traditions.',
                  highlight: 'Affordable local community hub',
                },
                {
                  id: 'kenting-night-market',
                  name: 'Kenting Night Market',
                  focus: 'Tourism & Regional Identity',
                  description:
                    'Examining how beach resort tourism shapes regional food culture and identity performance in southern Taiwan.',
                  highlight: 'Coastal tourism-driven market',
                },
              ].map((market, index) => (
                <Link
                  key={market.id}
                  href={`/markets/${market.id}`}
                  className='group bg-gradient-to-br from-secondary to-secondary-light rounded-3xl overflow-hidden border border-neutral-700/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-1'
                >
                  {/* Enhanced Image Section */}
                  <div className='relative h-44 overflow-hidden'>
                    <Image
                      src={`https://picsum.photos/900/500?random=${index + 1}`}
                      alt={`${market.name} research case study`}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-500'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

                    {/* Subtle Badges */}
                    <div className='absolute top-4 left-4 flex flex-col gap-2'>
                      <div className='bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium'>
                        Case Study {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className='bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium'>
                        {market.highlight}
                      </div>
                    </div>

                    {/* Market Name Overlay */}
                    <div className='absolute bottom-4 left-4 right-4'>
                      <h3 className='text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-primary/90 transition-colors'>
                        {market.name}
                      </h3>
                    </div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className='p-6'>
                    {/* Research Focus Tag */}
                    <div className='flex items-center justify-between mb-4'>
                      <div className='bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium border border-primary/20'>
                        Focus: {market.focus}
                      </div>
                      <svg
                        className='w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </div>

                    {/* Description */}
                    <p className='text-neutral-300 leading-relaxed text-sm mb-4'>
                      {market.description}
                    </p>

                    {/* Action Footer */}
                    <div className='flex items-center justify-between pt-3 border-t border-neutral-700/50'>
                      <span className='text-xs text-neutral-500'>
                        Detailed Analysis Available
                      </span>
                      <div className='flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all'>
                        Explore Market
                        <svg
                          className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 8l4 4m0 0l-4 4m4-4H3'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='py-24 bg-neutral-800'>
        <div className='container mx-auto px-4'>
          <div className='max-w-5xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='font-bold text-4xl md:text-5xl text-white mb-6'>
                Beyond the <span className='text-primary'>Food</span>
              </h2>
              <div className='w-24 h-1 bg-primary mx-auto mb-8'></div>
            </div>

            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <p className='text-xl text-neutral-300 mb-6 leading-relaxed'>
                  Taiwan's night markets aren't just food destinations. They're
                  contested cultural sites where identity, memory, and community
                  intersect in complex ways.
                </p>
                <p className='text-lg text-neutral-400 mb-8 leading-relaxed'>
                  Through critical ethnographic research, this project explores
                  how vendors serve as cultural actors navigating between
                  tourist expectations, economic pressures, and authentic
                  cultural preservation.
                </p>
                <Link
                  href='/about'
                  className='group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25'
                >
                  Explore Research Framework
                  <svg
                    className='w-5 h-5 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>

              <div className='relative'>
                <div className='bg-secondary-light rounded-2xl p-8 border border-neutral-700/50'>
                  <h3 className='text-2xl font-semibold text-white mb-6'>
                    Research Questions
                  </h3>
                  <div className='space-y-4'>
                    {[
                      'How do vendors negotiate cultural authenticity with commercial viability?',
                      'What power dynamics determine cultural visibility in these spaces?',
                      'How do night markets function as sites of cultural resistance or conformity?',
                    ].map((question, index) => (
                      <div key={index} className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                        <p className='text-neutral-300'>{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
