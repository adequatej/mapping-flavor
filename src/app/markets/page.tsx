import Link from 'next/link'

// Temporary placeholder - will be replaced with API call
const markets: any[] = []

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

        {/* Temporary message */}
        <div className='text-center text-neutral-400'>
          <p>Markets data will be loaded from API soon...</p>
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
