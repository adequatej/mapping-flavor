import Image from 'next/image'
import Link from 'next/link'

const markets = [
  {
    id: 'shilin',
    name: 'Shilin Night Market',
    chineseName: '士林夜市',
    location: 'Shilin District, Taipei',
    established: '1899',
    researchFocus: 'Tourism vs. Authenticity',
    description:
      "Taiwan's most famous night market, where I got to observe the fascinating (and sometimes uncomfortable) dance between vendors and tourists. The way food becomes a cultural performance here raises serious questions about authenticity.",
    analyticalNote:
      'Chen and Huang\'s "supply-side" analysis really clicked for me here. Vendors aren\'t just selling food, they\'re selling an experience of "Taiwaneseness." But who decides what that looks like?',
    keyFindings: [
      'Different menu boards in Chinese vs. English (sometimes completely different items)',
      'Vendors switching languages mid-conversation based on customer appearance',
      'Tourist areas vs. local sections with totally different vibes and prices',
    ],
    image: 'https://picsum.photos/800/400?random=1',
  },
  {
    id: 'raohe',
    name: 'Raohe Street Night Market',
    chineseName: '饒河街觀光夜市',
    location: 'Songshan District, Taipei',
    established: '1987',
    researchFocus: 'Hakka Heritage & Visibility',
    description:
      'This market made me think about which cultures get to be visible and which stay hidden. Some vendors proudly displayed their Hakka heritage, while others seemed to downplay it. Why?',
    analyticalNote:
      'Chen\'s work on ethnic politics in national cuisine is so relevant here. I kept wondering: which Hakka dishes make it onto the "Taiwan tourism" menu, and which ones don\'t?',
    keyFindings: [
      'Hakka lei cha (thunder tea) marketed very differently to tourists vs. locals',
      'Visual markers of Hakka identity, some subtle, some obvious',
      'Hakka dishes are not always marketed as Hakka dishes',
    ],
    image: 'https://picsum.photos/800/400?random=2',
  },
  {
    id: 'huaxi',
    name: 'Huaxi Street Night Market',
    chineseName: '華西街夜市',
    location: 'Wanhua District, Taipei',
    established: '1962',
    researchFocus: 'Class & Cultural Access',
    description:
      'The oldest night market I visited, and definitely the grittiest. But also the most "real"? I\'m still unpacking what that means and whether it\'s a fair comparison.',
    analyticalNote:
      'Wu and Lin call night markets "democratic spaces," but Huaxi really tested that idea for me. Sure, the food is affordable, but there are still barriers: cultural, linguistic, social.',
    keyFindings: [
      'Much less English signage compared to touristy markets',
      'Different social dynamics, more local families, older crowd',
      'Traditional cooking methods still visible (not just for show)',
    ],
    image: 'https://picsum.photos/800/400?random=3',
  },
  {
    id: 'kenting',
    name: 'Kenting Night Market',
    chineseName: '墾丁夜市',
    location: 'Kenting, Pingtung County',
    established: '1980s',
    researchFocus: 'Tourism & Regional Identity',
    description:
      "Located in Taiwan's southernmost beach resort town, this market explores how tourism shapes regional food identity and cultural performance in vacation destinations.",
    analyticalNote:
      "This is where Giaccardi's ideas about participatory heritage really resonated. How do I document tourist-oriented cultural spaces while capturing authentic local practices?",
    keyFindings: [
      'Beach town adaptations of traditional night market foods',
      'Seasonal tourism patterns affecting vendor operations',
      'Mix of local Pingtung specialties with tourist-friendly offerings',
    ],
    image: 'https://picsum.photos/800/400?random=4',
  },
]

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
