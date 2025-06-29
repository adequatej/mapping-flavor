import Image from 'next/image'

export default function About() {
  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Academic Introduction - Enhanced */}
        <div className='max-w-5xl mx-auto mb-24'>
          {/* Title Section */}
          <div className='text-center mb-16'>
            <h1 className='font-bold text-5xl md:text-6xl text-white mb-6 leading-tight'>
              Cultural Identity Negotiation in{' '}
              <span className='text-primary'>Taiwan's Night Markets</span>
            </h1>
            <div className='w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto'></div>
          </div>

          {/* Main Content Grid */}
          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Introduction Text - Takes up 2 columns */}
            <div className='lg:col-span-2'>
              <div className='bg-gradient-to-br from-secondary-light to-neutral-800 rounded-2xl p-8 h-full'>
                <div className='mb-8'>
                  <h2 className='text-2xl font-semibold text-white mb-6 flex items-center'>
                    <div className='w-2 h-8 bg-primary rounded-full mr-4'></div>
                    Introduction
                  </h2>
                  <p className='text-lg text-neutral-300 leading-relaxed'>
                    Taiwan's night markets have long been celebrated as
                    democratic cultural spaces where traditional food practices
                    flourish alongside modern commercial pressures (Wu & Lin,
                    2013). However, this characterization obscures the complex
                    power dynamics that determine which versions of "Taiwanese
                    identity" become visible, celebrated, or marginalized within
                    these spaces. Walking through Shilin Night Market, watching
                    vendors switch between Taiwanese and broken English while
                    serving different menus to tourists versus locals, reveals
                    how cultural identity operates not as a fixed essence but as
                    a contested performance shaped by post-colonial politics,
                    economic necessity, and competing claims to authenticity.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Elements Sidebar */}
            <div className='space-y-6'>
              {/* Research Question */}
              <div className='bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-6'>
                <div className='flex items-center mb-4'>
                  <div className='w-3 h-3 bg-accent rounded-full mr-3'></div>
                  <h3 className='text-lg font-semibold text-white'>
                    Central Question
                  </h3>
                </div>
                <p className='text-neutral-300 leading-relaxed'>
                  How do Taiwan's night markets function as sites of cultural
                  identity negotiation, particularly in the preservation and
                  evolution of Taiwanese and Hakka culinary traditions versus
                  broader Chinese food culture?
                </p>
              </div>

              {/* Quick Stats or Visual Element */}
              <div className='bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6'>
                <div className='flex items-center mb-4'>
                  <div className='w-3 h-3 bg-primary rounded-full mr-3'></div>
                  <h3 className='text-lg font-semibold text-white'>
                    Research Scope
                  </h3>
                </div>
                <div className='space-y-3 text-neutral-300'>
                  <div className='flex justify-between'>
                    <span>Markets Studied:</span>
                    <span className='font-medium text-white'>4</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Theoretical Frameworks:</span>
                    <span className='font-medium text-white'>4</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Focus Areas:</span>
                    <span className='font-medium text-white'>6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thesis Statement - Full Width */}
          <div className='mt-12'>
            <div className='bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 border border-primary/20 rounded-2xl p-8'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 mr-6'>
                  <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center'>
                    <span className='text-white font-bold text-lg'>📝</span>
                  </div>
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Thesis Statement
                  </h3>
                  <p className='text-xl text-neutral-200 leading-relaxed'>
                    Taiwan's night markets function as contested cultural spaces
                    where different versions of "Taiwanese identity" are
                    negotiated, performed, and sometimes erased—revealing how
                    post-colonial food politics operate in everyday commercial
                    spaces while demonstrating digital documentation's potential
                    to democratize cultural representation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Analysis Framework */}
        <section className='mb-20'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='font-bold text-4xl text-white mb-8'>
                Post-Colonial{' '}
                <span className='text-primary'>Food Politics</span>
              </h2>
              <div className='space-y-6'>
                <p className='text-neutral-300 leading-relaxed'>
                  This investigation builds on Yu-Jen Chen's analysis of ethnic
                  politics in Taiwan's national cuisine (Chen, 2011), which
                  shows how state institutions selectively promote certain foods
                  as "authentically Taiwanese" while marginalizing others,
                  particularly Indigenous foodways. Yet Chen's work focuses
                  primarily on official discourse, leaving questions about how
                  these dynamics play out in everyday commercial spaces where
                  vendors must navigate competing cultural claims.
                </p>
                <p className='text-neutral-300 leading-relaxed'>
                  What emerges from observing night market vendor practices is a
                  complex negotiation between post-colonial resistance and
                  economic survival. Vendors simultaneously resist Chinese
                  culinary hegemony while adapting to tourist expectations,
                  preserve Hakka heritage while appealing to mainstream tastes,
                  and maintain family recipes while responding to market
                  pressures—showing cultural identity as an active, strategic
                  performance rather than passive tradition.
                </p>
              </div>
            </div>
            <div className='relative h-80 rounded-xl overflow-hidden'>
              <Image
                src='https://picsum.photos/600/400?random=10'
                alt='Taiwan night market cultural identity research'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>
        </section>

        {/* Critical Analysis Focus Areas */}
        <section className='mb-20'>
          <div className='bg-secondary-light rounded-xl p-8'>
            <h2 className='font-bold text-4xl text-white mb-10 text-center'>
              Critical Analysis <span className='text-primary'>Framework</span>
            </h2>
            <div className='grid md:grid-cols-2 gap-10'>
              <div className='space-y-8'>
                <div className='border-l-4 border-primary pl-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Post-Colonial Food Identity
                  </h3>
                  <p className='text-neutral-300 leading-relaxed'>
                    How night markets resist and/or embrace Chinese culinary
                    hegemony, showing tensions between official "One China"
                    cultural narratives and everyday Taiwanese cultural
                    practices. Analysis draws on Edward Said's orientalism
                    framework (Said, 1978) applied to food tourism and cultural
                    commodification.
                  </p>
                </div>

                <div className='border-l-4 border-accent pl-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Indigenous vs. Settler Foodways
                  </h3>
                  <p className='text-neutral-300 leading-relaxed'>
                    Examining how Taiwanese Aboriginal influences compete with
                    Han migration patterns in night market food culture, showing
                    which cultural narratives gain visibility and which remain
                    marginalized in these supposedly "democratic" spaces.
                  </p>
                </div>

                <div className='border-l-4 border-primary pl-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Hakka Cultural Preservation
                  </h3>
                  <p className='text-neutral-300 leading-relaxed'>
                    Night markets as sites where minority Hakka culture
                    negotiates survival within dominant Minnan and Chinese
                    cultural frameworks, showing how economic spaces become
                    vehicles for cultural resistance and adaptation.
                  </p>
                </div>
              </div>

              <div className='space-y-8'>
                <div className='border-l-4 border-accent pl-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Generational Memory
                  </h3>
                  <p className='text-neutral-300 leading-relaxed'>
                    How family recipes encode political and cultural history,
                    particularly the transmission of pre-1949 mainland Chinese
                    traditions, Japanese colonial influences, and distinctly
                    Taiwanese innovations across generations of night market
                    vendors.
                  </p>
                </div>

                <div className='border-l-4 border-primary pl-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Economic Democratization
                  </h3>
                  <p className='text-neutral-300 leading-relaxed'>
                    Critiquing Wu and Lin's (2013) characterization of night
                    markets as "democratic cultural spaces" by examining how
                    economic constraints, spatial politics, and cultural capital
                    still determine whose voices are heard and whose remain
                    invisible.
                  </p>
                </div>

                <div className='border-l-4 border-accent pl-6'>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Digital Democratization Potential
                  </h3>
                  <p className='text-neutral-300 leading-relaxed'>
                    Exploring how digital documentation might show and
                    potentially democratize cultural representation by capturing
                    the multiple, contested versions of "Taiwanese identity"
                    that coexist within night market spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Methodology - Clean Professional */}
        <section className='mb-20'>
          <div className='max-w-5xl mx-auto'>
            {/* Section Header */}
            <div className='text-center mb-16'>
              <h2 className='font-bold text-4xl text-white mb-6'>
                Research <span className='text-primary'>Methodology</span>
              </h2>
              <div className='w-16 h-0.5 bg-primary mx-auto mb-8'></div>
            </div>

            {/* Overview */}
            <div className='bg-secondary-light rounded-xl p-8 mb-16'>
              <p className='text-lg text-neutral-300 leading-relaxed text-center'>
                This research uses critical ethnographic observation across four
                Taiwan night markets, following Chen and Huang's (2014)
                framework for analyzing vendor behaviors while incorporating
                postcolonial and cultural studies approaches that examine power
                dynamics in everyday cultural spaces.
              </p>
            </div>

            {/* Clean Methodology Grid */}
            <div className='grid md:grid-cols-3 gap-8 mb-16'>
              {/* Critical Observation */}
              <div className='bg-neutral-900 rounded-xl p-8 border-l-4 border-primary'>
                <div className='mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4'>
                    <span className='text-white font-bold text-xl'>👁️</span>
                  </div>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Critical Observation
                  </h3>
                </div>
                <p className='text-neutral-300 leading-relaxed mb-4'>
                  Participant observation focusing on cultural identity
                  performance: language switching, menu variations for different
                  audiences, spatial organization of stalls, and vendor-customer
                  interactions that reveal power dynamics and cultural
                  negotiations.
                </p>
                <div className='text-sm text-primary font-medium'>
                  Ethnographic Approach
                </div>
              </div>

              {/* Postcolonial Analysis */}
              <div className='bg-neutral-900 rounded-xl p-8 border-l-4 border-accent'>
                <div className='mb-6'>
                  <div className='w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4'>
                    <span className='text-white font-bold text-xl'>🏛️</span>
                  </div>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Postcolonial Analysis
                  </h3>
                </div>
                <p className='text-neutral-300 leading-relaxed mb-4'>
                  Applying Edward Said's (1978) orientalism framework and Pierre
                  Bourdieu's (1984) cultural capital theory to analyze how
                  cultural authenticity is constructed, performed, and contested
                  within commercial spaces shaped by colonial and postcolonial
                  power relations.
                </p>
                <div className='text-sm text-accent font-medium'>
                  Theoretical Framework
                </div>
              </div>

              {/* Digital Documentation */}
              <div className='bg-neutral-900 rounded-xl p-8 border-l-4 border-primary'>
                <div className='mb-6'>
                  <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4'>
                    <span className='text-white font-bold text-xl'>💻</span>
                  </div>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Digital Documentation
                  </h3>
                </div>
                <p className='text-neutral-300 leading-relaxed mb-4'>
                  Experimental use of digital platforms to capture multiple,
                  simultaneous cultural narratives that traditional heritage
                  documentation often flattens or erases, exploring technology's
                  potential for democratizing cultural representation.
                </p>
                <div className='text-sm text-primary font-medium'>
                  Digital Innovation
                </div>
              </div>
            </div>

            {/* Research Process Flow - Improved */}
            <div className='bg-gradient-to-r from-secondary-light to-neutral-800 rounded-xl p-8'>
              <h3 className='text-2xl font-semibold text-white text-center mb-12'>
                Research Process
              </h3>

              <div className='relative'>
                {/* Connection Line */}
                <div className='hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-0.5 bg-gradient-to-r from-primary via-accent to-primary'></div>

                {/* Process Steps */}
                <div className='grid md:grid-cols-3 gap-8 relative z-10'>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-secondary-light'>
                      <span className='text-white font-bold text-lg'>1</span>
                    </div>
                    <h4 className='text-white font-semibold text-lg mb-2'>
                      Observe
                    </h4>
                    <p className='text-neutral-400'>
                      Cultural performances and vendor-customer interactions
                    </p>
                  </div>

                  <div className='text-center'>
                    <div className='w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-secondary-light'>
                      <span className='text-white font-bold text-lg'>2</span>
                    </div>
                    <h4 className='text-white font-semibold text-lg mb-2'>
                      Analyze
                    </h4>
                    <p className='text-neutral-400'>
                      Power dynamics and cultural politics using postcolonial
                      theory
                    </p>
                  </div>

                  <div className='text-center'>
                    <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-secondary-light'>
                      <span className='text-white font-bold text-lg'>3</span>
                    </div>
                    <h4 className='text-white font-semibold text-lg mb-2'>
                      Document
                    </h4>
                    <p className='text-neutral-400'>
                      Multiple cultural narratives through digital platforms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis Preview */}
        <section className='mb-20'>
          <div className='bg-neutral-900 rounded-xl p-8'>
            <h2 className='font-bold text-4xl text-white mb-8 text-center'>
              Research <span className='text-primary'>Sites</span>
            </h2>
            <p className='text-lg text-neutral-300 leading-relaxed mb-10 text-center max-w-3xl mx-auto'>
              Each market represents a different aspect of cultural identity
              negotiation in contemporary Taiwan:
            </p>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-6'>
                <div className='border-l-4 border-primary pl-6 bg-primary/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Shilin Night Market
                  </h3>
                  <p className='text-primary text-sm mb-3 font-medium'>
                    Identity Commodification
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    Tourism vs. authenticity dynamics, cultural performance for
                    outsiders, application of Said's (1978) orientalism to food
                    tourism.
                  </p>
                </div>

                <div className='border-l-4 border-accent pl-6 bg-accent/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Raohe Street Night Market
                  </h3>
                  <p className='text-accent text-sm mb-3 font-medium'>
                    Hakka Heritage Preservation
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    Minority culture survival in majority spaces, economic
                    strategies for cultural preservation.
                  </p>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='border-l-4 border-primary pl-6 bg-primary/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Huaxi Street Night Market
                  </h3>
                  <p className='text-primary text-sm mb-3 font-medium'>
                    Working-Class Food Culture
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    Economic accessibility and community formation, examining
                    how working-class food culture operates within broader power
                    structures.
                  </p>
                </div>

                <div className='border-l-4 border-accent pl-6 bg-accent/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Kenting Night Market
                  </h3>
                  <p className='text-accent text-sm mb-3 font-medium'>
                    Tourist-Local Cultural Negotiation
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    Southern Taiwan's tourist dynamics, how vendors navigate
                    between local Taiwanese identity and tourist expectations in
                    a resort context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Theoretical Framework */}
        <section className='mb-20'>
          <h2 className='font-bold text-4xl text-white mb-10 text-center'>
            Theoretical <span className='text-primary'>Framework</span>
          </h2>
          <div className='grid md:grid-cols-2 gap-10'>
            <div className='bg-secondary-light rounded-xl p-8'>
              <h3 className='text-xl font-semibold text-white mb-6'>
                Primary Framework
              </h3>
              <div className='space-y-6'>
                <p className='text-neutral-300 leading-relaxed'>
                  This analysis draws primarily on Yu-Jen Chen's work on ethnic
                  politics in Taiwan's national cuisine (Chen, 2011), which
                  reveals how state institutions shape cultural representation
                  through selective promotion of certain foods while
                  marginalizing others. Chen's framework provides important
                  context for understanding the political dynamics that
                  influence vendor cultural choices.
                </p>
                <p className='text-neutral-300 leading-relaxed'>
                  Edward Said's foundational work on orientalism (Said, 1978) is
                  particularly relevant for analyzing how night markets become
                  sites where "Taiwanese culture" is performed for tourist
                  consumption. Said argued that Western representations of the
                  "Orient" serve to justify power relations, a framework that
                  helps explain how tourist-oriented cultural performances in
                  night markets may reinforce certain narratives about Taiwan.
                </p>
              </div>
            </div>

            <div className='bg-secondary-light rounded-xl p-8'>
              <h3 className='text-xl font-semibold text-white mb-6'>
                Supporting Theory
              </h3>
              <div className='space-y-6'>
                <p className='text-neutral-300 leading-relaxed'>
                  French sociologist Pierre Bourdieu's concept of cultural
                  capital (Bourdieu, 1984) shows how economic constraints shape
                  which cultural narratives can be expressed in night market
                  spaces. Bourdieu argued that cultural knowledge and tastes
                  function as forms of capital that determine social position,
                  helping explain why certain vendor cultural performances
                  become visible while others remain marginalized.
                </p>
                <p className='text-neutral-300 leading-relaxed'>
                  Political scientist James C. Scott's theory of "hidden
                  transcripts" (Scott, 1990) provides a framework for
                  understanding how vendors navigate between public performances
                  of culture and private preservation of authentic practices.
                  Scott argued that subordinated groups develop hidden forms of
                  resistance and cultural preservation that operate beneath
                  dominant power structures, making his theory especially
                  relevant for analyzing how night market vendors maintain
                  cultural authenticity while adapting to commercial and
                  political pressures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Contribution - Clean */}
        <section className='mb-20'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='font-bold text-4xl text-white mb-12 text-center'>
              Research <span className='text-primary'>Contribution</span>
            </h2>

            <div className='bg-secondary-light rounded-xl p-8'>
              <div className='grid md:grid-cols-2 gap-10'>
                {/* Academic Contribution */}
                <div>
                  <h3 className='text-xl font-semibold text-white mb-6 flex items-center'>
                    <div className='w-2 h-6 bg-primary rounded-full mr-3'></div>
                    Academic Contribution
                  </h3>
                  <div className='space-y-4'>
                    <p className='text-neutral-300 leading-relaxed'>
                      This research contributes to Taiwan studies, food studies,
                      and digital humanities by showing how cultural identity
                      works as a contested political performance rather than a
                      fixed tradition.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      By examining the gap between official cultural narratives
                      and lived cultural practices, this analysis reveals the
                      power dynamics that determine cultural visibility and
                      marginalization.
                    </p>
                  </div>
                </div>

                {/* Methodological Contribution */}
                <div>
                  <h3 className='text-xl font-semibold text-white mb-6 flex items-center'>
                    <div className='w-2 h-6 bg-accent rounded-full mr-3'></div>
                    Methodological Innovation
                  </h3>
                  <div className='space-y-4'>
                    <p className='text-neutral-300 leading-relaxed'>
                      Methodologically, this study shows how digital
                      documentation can capture the multiple, simultaneous
                      versions of cultural identity that coexist within single
                      spaces.
                    </p>
                    <p className='text-neutral-300 leading-relaxed'>
                      This suggests new directions for participatory heritage
                      preservation that move beyond institutional control toward
                      community-driven cultural representation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sources Preview */}
        <section className='bg-secondary-light rounded-xl p-8'>
          <h2 className='font-bold text-4xl text-white mb-8 text-center'>
            Theoretical <span className='text-primary'>Sources</span>
          </h2>
          <div className='grid md:grid-cols-2 gap-8 mb-8'>
            <div>
              <h4 className='text-lg font-semibold text-white mb-4'>
                Taiwan Studies & Food Politics
              </h4>
              <ul className='space-y-3 text-neutral-300'>
                <li className='leading-relaxed'>
                  • Chen, Y.-J. (2011). Ethnic Politics in the Framing of
                  National Cuisine
                </li>
                <li className='leading-relaxed'>
                  • Wu & Lin (2013). Night Markets Culture and Tourism
                  Experience
                </li>
                <li className='leading-relaxed'>
                  • Chen & Huang (2014). Tourism Night Markets Supply-Side
                  Analysis
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold text-white mb-4'>
                Postcolonial & Cultural Theory
              </h4>
              <ul className='space-y-3 text-neutral-300'>
                <li className='leading-relaxed'>
                  • Said, E. (1978). Orientalism
                </li>
                <li className='leading-relaxed'>
                  • Bourdieu, P. (1984). Distinction: A Social Critique of Taste
                </li>
                <li className='leading-relaxed'>
                  • Scott, J. C. (1990). Domination and the Arts of Resistance
                </li>
              </ul>
            </div>
          </div>
          <div className='text-center'>
            <p className='text-neutral-400 text-sm mb-4'>
              Complete bibliography with additional postcolonial food studies
              sources available on the{' '}
              <a
                href='/sources'
                className='text-primary hover:text-primary-light transition-colors'
              >
                Sources page
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
