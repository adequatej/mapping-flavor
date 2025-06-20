import { markets } from '@/data/markets'
import Image from 'next/image'
import Link from 'next/link'

export default function Markets() {
  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='font-bold text-4xl md:text-5xl text-white mb-6'>
            Market <span className='text-primary'>Observations</span>
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed mb-4'>
            Four nights, four markets, four different ways of being Taiwanese
          </p>
          <p className='text-neutral-400'>
            Each market told me something different about cultural identity,
            tourism, and who gets to define "authentic" Taiwan
          </p>
        </div>

        {/* Research Note */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>A Note on Method</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            I spent several evenings walking through these markets with my phone
            camera and notes, documenting what I saw, heard, and felt. This
            isn't formal ethnography. I didn't do structured interviews or
            systematic data collection other than the coordinates from pictures
            of certain vendors. Instead, I tried to pay attention to the small
            moments that reveal how culture actually works in these spaces.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Caveat:</strong> These are my observations as an outsider,
            shaped by my own perspective and the particular moments I happened
            to witness. They're starting points for thinking, not definitive
            conclusions.
          </p>
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
                <div className='flex space-x-4 pt-4'>
                  <Link
                    href={`/explorer?market=${market.id}`}
                    className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm'
                  >
                    Explore in Interactive Map
                  </Link>
                  <Link
                    href={`/markets/${market.id}`}
                    className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-2 px-4 rounded-lg border border-neutral-600 transition-colors text-sm'
                  >
                    Detailed Analysis
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reflection Section */}
        <div className='mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8'>
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
