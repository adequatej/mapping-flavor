import Image from 'next/image'

export default function About() {
  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Hero Section */}
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='font-bold text-4xl md:text-5xl text-white mb-6'>
            About <span className='text-primary'>Mapping Flavor</span>
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed'>
            A critical examination of Taiwanese cultural identity through the
            lens of night market food culture
          </p>
        </div>

        {/* Research Focus */}
        <section className='mb-16'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='font-bold text-3xl text-white mb-6'>
                Research <span className='text-primary'>Focus</span>
              </h2>
              <p className='text-neutral-300 mb-6 leading-relaxed'>
                Walking through Shilin Night Market on a humid Tuesday evening,
                I started wondering: whose Taiwan is being sold here? The
                vendors switching between Taiwanese (Traditional Chinese) and
                broken English depending on their customers made me think about
                Yu-Jen Chen's work on how the government picks and chooses which
                foods get to represent "authentic" Taiwan.
              </p>
              <p className='text-neutral-300 mb-6 leading-relaxed'>
                What struck me most was how these night markets operate as
                complex spaces where official cultural narratives collide with
                everyday practices. You have vendors selling "traditional
                Taiwanese" food to tourists while also serving completely
                different dishes to local families. It made me wonder how
                digital tools might capture these multiple layers of meaning,
                following Srinivasan and Luther's ideas about community-driven
                heritage.
              </p>
            </div>
            <div className='relative h-80 rounded-xl overflow-hidden'>
              <Image
                src='https://picsum.photos/600/400?random=10'
                alt='Taiwan night market cultural research'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>
        </section>

        {/* Research Questions */}
        <section className='mb-16 bg-secondary-light rounded-xl p-8'>
          <h2 className='font-bold text-3xl text-white mb-8 text-center'>
            Central <span className='text-primary'>Questions</span>
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-6'>
              <div className='border-l-4 border-primary pl-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Whose Food Gets to Be "Taiwanese"?
                </h3>
                <p className='text-neutral-400'>
                  Chen's analysis of state-promoted cuisine is fascinating, but
                  what does it look like on the ground? I noticed Hakka dishes
                  getting completely different treatment than Indigenous foods.
                  Why do some vendors proudly display their Hakka heritage while
                  others don't even mention it?
                </p>
              </div>
              <div className='border-l-4 border-accent pl-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Can Digital Preservation Be Democratic?
                </h3>
                <p className='text-neutral-400'>
                  I keep thinking about who gets to tell these food stories
                  online. Most museum digital collections are still pretty
                  top-down, but what if vendors could share their own family
                  histories? Would that change how I understand "authentic"
                  Taiwanese food?
                </p>
              </div>
            </div>
            <div className='space-y-6'>
              <div className='border-l-4 border-primary pl-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Tourism vs. "Real" Culture
                </h3>
                <p className='text-neutral-400'>
                  This is probably the most complicated question. Watching
                  vendors perform "Taiwaneseness" for tourists made me
                  uncomfortable at first, but then I realized it's far more
                  complex. Are they selling out, or are they cleverly adapting
                  traditions for survival?
                </p>
              </div>
              <div className='border-l-4 border-accent pl-6'>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Night Markets as Democratic Spaces?
                </h3>
                <p className='text-neutral-400'>
                  Wu and Lin call night markets "democratic cultural spaces,"
                  but I want to push that idea further. Sure, anyone can afford
                  a $2 bowl of noodles, but whose cultural narratives actually
                  get heard in these spaces?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className='mb-16'>
          <h2 className='font-bold text-3xl text-white mb-8 text-center'>
            Research <span className='text-primary'>Approach</span>
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>📸</span>
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>
                Photo Documentation
              </h3>
              <p className='text-neutral-400'>
                I spent several evenings walking through different markets with
                my camera, documenting vendor setups, customer interactions, and
                how spaces change throughout the night. Sometimes the most
                telling moments happened between the "official" tourist hours.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>👁️</span>
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>
                Observational Analysis
              </h3>
              <p className='text-neutral-400'>
                Rather than formal interviews, I focused on watching patterns:
                language switching, price differences, how vendors arrange their
                stalls differently for different customers. The everyday
                performance of culture, basically.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>🧠</span>
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>
                Critical Interpretation
              </h3>
              <p className='text-neutral-400'>
                Using food studies and postcolonial theory to make sense of what
                I observed. Honestly, sometimes I'm still figuring out what it
                all means, which feels appropriate for this kind of cultural
                analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Framework */}
        <section className='bg-neutral-900 rounded-xl p-8'>
          <h2 className='font-bold text-3xl text-white mb-6'>
            Theoretical <span className='text-primary'>Framework</span>
          </h2>
          <p className='text-neutral-300 mb-6 leading-relaxed'>
            I'm drawing heavily on Yu-Jen Chen's work on ethnic politics in
            Taiwan's national cuisine, which helped me understand why certain
            foods get promoted while others remain invisible. Her analysis of
            state banquets was particularly useful for thinking about how food
            becomes a tool for identity-making at the national level.
          </p>
          <p className='text-neutral-300 mb-6 leading-relaxed'>
            Srinivasan and Luther's ideas about democratic digital heritage have
            been crucial for thinking about this project's goals. Their critique
            of traditional museum cataloging made me realize how much gets lost
            when cultural institutions control the narrative. That's partly why
            I wanted to experiment with more open-ended digital documentation.
          </p>
          <p className='text-neutral-300 leading-relaxed'>
            I'm also influenced by broader work in food studies and postcolonial
            analysis, though I'm still working through how to apply some of
            these frameworks to Taiwan's specific historical context. The
            relationship between mainland Chinese, Taiwanese, and Indigenous
            food cultures is far more complex than I initially realized.
          </p>

          <div className='mt-6 text-sm text-neutral-400'>
            <p className='mb-2'>
              <strong>Key Sources I'm Working With:</strong>
            </p>
            <ul className='space-y-1 ml-4'>
              <li>
                • Chen, Y.-J. (2011). Ethnic Politics in the Framing of National
                Cuisine
              </li>
              <li>
                • Srinivasan, R. & Luther, A. (2016). Digital Museums and
                Diverse Cultural Knowledges
              </li>
              <li>
                • Chen & Huang (2014). Tourism Night Markets Supply-Side
                Analysis
              </li>
              <li>
                • Wu & Lin (2013). Night Markets Culture and Tourism Experience
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
