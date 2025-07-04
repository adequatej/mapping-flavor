'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function About() {
  const [showAdvancedFramework, setShowAdvancedFramework] = useState(false)
  const [readingMode, setReadingMode] = useState<'academic' | 'accessible'>(
    'accessible'
  )
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

          {/* Reading Guide and Mode Toggle */}
          <div className='bg-neutral-900 rounded-xl p-6 mb-12'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              {/* Navigation Hints */}
              <div className='flex-1'>
                <p className='text-neutral-300 text-sm leading-relaxed'>
                  <span className='text-white font-medium'>
                    New to this research?
                  </span>{' '}
                  Start with{' '}
                  <Link
                    href='/markets'
                    className='text-primary hover:text-primary-light underline'
                  >
                    Market Case Studies
                  </Link>{' '}
                  for accessible cultural stories, or continue reading for
                  complete academic context.
                </p>
              </div>

              {/* Reading Level Toggle */}
              <div className='flex items-center gap-3'>
                <span className='text-neutral-400 text-sm'>Reading Level:</span>
                <div className='flex bg-neutral-800 rounded-lg p-1'>
                  <button
                    onClick={() => setReadingMode('accessible')}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      readingMode === 'accessible'
                        ? 'bg-primary text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Accessible
                  </button>
                  <button
                    onClick={() => setReadingMode('academic')}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      readingMode === 'academic'
                        ? 'bg-primary text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Academic
                  </button>
                </div>
              </div>
            </div>
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
                  {readingMode === 'accessible' ? (
                    <p className='text-lg text-neutral-300 leading-relaxed'>
                      Taiwan's night markets are complex cultural spaces where
                      vendors balance tradition with modern business needs.
                      Walking through these markets, you'll notice vendors
                      switching languages and serving different foods to
                      tourists versus locals. This shows how cultural identity
                      isn't fixed but performed differently depending on the
                      audience and economic pressures.
                    </p>
                  ) : (
                    <p className='text-lg text-neutral-300 leading-relaxed'>
                      Taiwan's night markets are officially promoted as
                      democratic cultural spaces and community hubs (Su 2023)
                      where traditional food practices exist alongside modern
                      business pressures (Wu and Lin 2013). But this view hides
                      the complex power dynamics that decide which versions of
                      "Taiwanese identity" get noticed, celebrated, or pushed
                      aside in these spaces. Walking through Shilin Night
                      Market, watching vendors switch between Taiwanese and
                      broken English while serving different menus to tourists
                      versus locals, shows how cultural identity works not as
                      something fixed but as a performance shaped by
                      post-colonial politics, economic needs, and competing
                      claims about what's authentic.
                    </p>
                  )}
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
                    <span>Vendor Profiles:</span>
                    <span className='font-medium text-white'>12</span>
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
                    Taiwan's night markets work as contested cultural spaces
                    where different versions of "Taiwanese identity" are
                    negotiated, performed, and sometimes erased. This shows how
                    post-colonial food politics work in everyday commercial
                    spaces while showing digital documentation's potential to
                    democratize cultural representation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Sites - Moved up earlier in flow */}
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
                    Tourism vs. Authenticity
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    How vendors strategically perform "authentic Taiwanese
                    culture" for tourist consumption while maintaining separate
                    cultural practices for locals, revealing the gap between
                    commodified identity and lived cultural experience.
                  </p>
                </div>

                <div className='border-l-4 border-accent pl-6 bg-accent/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Raohe Street Night Market
                  </h3>
                  <p className='text-accent text-sm mb-3 font-medium'>
                    Ethnic Identity Competition
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    How Hakka vendors negotiate space for their distinct
                    identity within mainstream "Taiwanese culture," revealing
                    that Taiwan's cultural identity is contested between
                    different ethnic communities rather than being unified.
                  </p>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='border-l-4 border-primary pl-6 bg-primary/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Huaxi Street Night Market
                  </h3>
                  <p className='text-primary text-sm mb-3 font-medium'>
                    Authentic vs Commodified Culture
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    How working-class vendors maintain authentic versions of
                    Taiwanese cultural practices that resist both tourist
                    expectations and middle-class cultural trends, creating
                    alternative definitions of "authentic Taiwan."
                  </p>
                </div>

                <div className='border-l-4 border-accent pl-6 bg-accent/5 rounded-r-xl p-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>
                    Kenting Night Market
                  </h3>
                  <p className='text-accent text-sm mb-3 font-medium'>
                    Tourism & Regional Identity
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    How seasonal tourism economies shape regional food identity
                    in southern Taiwan, showing adaptation strategies that
                    balance local traditions with visitor expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consolidated Theoretical Framework */}
        <section className='mb-20'>
          <div className='bg-secondary-light rounded-xl p-8'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-8'>
              <h2 className='font-bold text-4xl text-white mb-4 md:mb-0'>
                Theoretical <span className='text-primary'>Framework</span>
              </h2>
              <button
                onClick={() => setShowAdvancedFramework(!showAdvancedFramework)}
                className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors self-start md:self-center'
              >
                {showAdvancedFramework
                  ? 'Hide Advanced Theory'
                  : 'Show Advanced Theory'}
              </button>
            </div>

            {/* Post-Colonial Foundation - Always visible */}
            <div className='mb-8'>
              <h3 className='text-2xl font-bold text-white mb-6'>
                Post-Colonial{' '}
                <span className='text-primary'>Food Politics</span>
              </h3>
              <div className='grid md:grid-cols-2 gap-8 items-center'>
                <div className='space-y-4'>
                  <p className='text-neutral-300 leading-relaxed'>
                    This investigation builds on Yu-Jen Chen's analysis of
                    ethnic politics in Taiwan's national cuisine (Chen 2011),
                    which shows how state institutions choose to promote certain
                    foods as "authentically Taiwanese" while pushing aside
                    others.
                  </p>
                  <p className='text-neutral-300 leading-relaxed'>
                    Watching night market vendor practices shows a complex
                    negotiation between post-colonial resistance and economic
                    survival, revealing cultural identity as an active,
                    strategic performance.
                  </p>
                </div>
                <div className='relative h-64 rounded-xl overflow-hidden'>
                  <Image
                    src='/images/vendors/IMG_1192.jpg'
                    alt='Taiwan night market cultural identity research'
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
              </div>
            </div>

            {showAdvancedFramework && (
              <div className='border-t border-neutral-700 pt-8'>
                <h3 className='text-xl font-bold text-white mb-8 text-center'>
                  Key Theoretical Approaches
                </h3>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div className='bg-neutral-900 rounded-xl p-6'>
                    <h4 className='text-lg font-semibold text-white mb-4'>
                      Primary Framework
                    </h4>
                    <div className='space-y-4 text-sm'>
                      <p className='text-neutral-300 leading-relaxed'>
                        <strong className='text-white'>
                          Edward Said's orientalism (1978):
                        </strong>{' '}
                        How "Taiwanese culture" gets performed for tourist
                        consumption, potentially reinforcing certain narratives
                        about Taiwan. Applied with attention to Taiwan's complex
                        postcolonial context involving multiple colonial layers.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        <strong className='text-white'>
                          Pierre Bourdieu's cultural capital (1984):
                        </strong>{' '}
                        How economic constraints shape which cultural narratives
                        vendors can express in market spaces. Examines whether
                        night markets truly function as "democratic cultural
                        spaces."
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        <strong className='text-white'>
                          James Scott's hidden transcripts (1990):
                        </strong>{' '}
                        How vendors navigate between public cultural
                        performances and private preservation of authentic
                        practices within complex power relationships.
                      </p>
                    </div>
                  </div>

                  <div className='bg-neutral-900 rounded-xl p-6'>
                    <h4 className='text-lg font-semibold text-white mb-4'>
                      Application & Analysis
                    </h4>
                    <div className='space-y-4 text-sm'>
                      <p className='text-neutral-300 leading-relaxed'>
                        <strong className='text-white'>
                          Market Case Studies:
                        </strong>{' '}
                        Each of the four market analyses demonstrates these
                        theoretical concepts through specific vendor strategies
                        and cultural negotiations in practice.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        <strong className='text-white'>Vendor Evidence:</strong>{' '}
                        Individual vendor profiles provide concrete examples of
                        how these theoretical frameworks play out in daily
                        entrepreneurial decisions and cultural performances.
                      </p>
                      <p className='text-neutral-300 leading-relaxed'>
                        <strong className='text-white'>
                          Critical Assessment:
                        </strong>{' '}
                        Analysis includes counterevidence and limitations of
                        these approaches, examined through detailed case study
                        evidence throughout the research site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                This research uses critical observational analysis across four
                Taiwan night markets, following Chen and Huang's (2014)
                framework for analyzing vendor behaviors while using
                postcolonial and cultural studies approaches that look at power
                dynamics in everyday cultural spaces.
              </p>
            </div>

            {/* Research Process Flow - Moved to top */}
            <div className='bg-gradient-to-r from-secondary-light to-neutral-800 rounded-xl p-8 mb-16'>
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
                  Observational analysis focusing on cultural identity
                  performance: language switching, menu variations for different
                  audiences, spatial organization of stalls, and vendor-customer
                  interactions that reveal power dynamics and cultural
                  negotiations.
                </p>
                <div className='text-sm text-primary font-medium'>
                  Critical Analysis Approach
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
                  Using orientalism framework and cultural capital theory to
                  analyze how cultural authenticity is built, performed, and
                  contested within commercial spaces shaped by colonial and
                  postcolonial power relations (Said 1978; Bourdieu 1984).
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
                  simultaneous cultural stories that traditional heritage
                  documentation often flattens or erases (Srinivasan and Luther
                  2016), looking at technology's potential for democratizing
                  cultural representation.
                </p>
                <div className='text-sm text-primary font-medium'>
                  Digital Innovation
                </div>
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
                      community-driven cultural representation (Giglitto and
                      Ciolfi 2023).
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
                  • Wu and Lin (2013). Night Markets Culture and Tourism
                  Experience
                </li>
                <li className='leading-relaxed'>
                  • Chen and Huang (2014). Tourism Night Markets Supply-Side
                  Analysis
                </li>
                <li className='leading-relaxed'>
                  • Su (2023). Democratic Cultural Spaces and Community Hubs
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
          <div className='mt-8'>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Digital Heritage Studies
            </h4>
            <ul className='space-y-3 text-neutral-300'>
              <li className='leading-relaxed'>
                • Srinivasan and Luther (2016). Digital Documentation and
                Cultural Heritage
              </li>
              <li className='leading-relaxed'>
                • Giglitto and Ciolfi (2023). Participatory Heritage
                Preservation
              </li>
            </ul>
          </div>
          <div className='text-center mt-8'>
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

        {/* Navigation Guidance */}
        <section className='mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Explore the Research
          </h3>
          <div className='grid md:grid-cols-2 gap-8 mb-8'>
            <div className='bg-neutral-900 rounded-lg p-6'>
              <h4 className='text-lg font-semibold text-white mb-4'>
                Start with the Case Studies
              </h4>
              <p className='text-neutral-300 text-sm mb-4 leading-relaxed'>
                Explore the four market case studies to see how these
                theoretical concepts work in practice. Each market demonstrates
                different cultural dynamics and strategies.
              </p>
              <Link
                href='/markets'
                className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block text-sm'
              >
                View Market Case Studies
              </Link>
            </div>
            <div className='bg-neutral-900 rounded-lg p-6'>
              <h4 className='text-lg font-semibold text-white mb-4'>
                See Individual Evidence
              </h4>
              <p className='text-neutral-300 text-sm mb-4 leading-relaxed'>
                Read detailed vendor profiles that provide specific evidence for
                the theoretical arguments. Each profile shows how individual
                entrepreneurs navigate cultural identity politics.
              </p>
              <Link
                href='/vendors'
                className='bg-accent hover:bg-accent-dark text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block text-sm'
              >
                Browse Vendor Profiles
              </Link>
            </div>
          </div>
          <div className='text-center'>
            <p className='text-neutral-400 text-sm leading-relaxed'>
              Or use the{' '}
              <Link
                href='/explorer'
                className='text-primary hover:text-primary-light underline'
              >
                Interactive Map
              </Link>{' '}
              to explore markets and vendors geographically
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
