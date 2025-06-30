interface Source {
  citation: string
  summary: string
  relevance: string
  doi?: string
  url?: string
}

interface SourceCategory {
  category: string
  sources: Source[]
}

export default function Sources() {
  const sources: SourceCategory[] = [
    {
      category: 'Postcolonial Theory & Cultural Studies',
      sources: [
        {
          citation:
            'Appadurai, A. (1996). Modernity at Large: Cultural Dimensions of Globalization. University of Minnesota Press.',
          summary:
            'Examines how global cultural flows create new forms of local adaptation, introducing concepts of "glocalization" where local practices adapt to global pressures while maintaining distinctiveness.',
          relevance:
            'Provides theoretical framework for understanding how night market vendors balance local cultural authenticity with global tourism expectations, particularly relevant for southern Taiwan markets.',
        },
        {
          citation:
            'Bourdieu, P. (1984). Distinction: A Social Critique of the Judgement of Taste. Harvard University Press.',
          summary:
            'Shows how cultural knowledge and tastes function as forms of capital that determine social position, explaining how economic constraints shape cultural expression and access.',
          relevance:
            'Shows how economic pressures in night markets determine which cultural narratives vendors can express, revealing that cultural democracy is more limited than it appears.',
        },
        {
          citation:
            'Gramsci, A. (2006). Prison Notebooks: Selections from Cultural Writings. Harvard University Press.',
          summary:
            'Develops the concept of cultural hegemony, examining how dominant cultural practices maintain power through consent rather than force, and how subordinated groups navigate these structures.',
          relevance:
            'Essential for understanding how mainstream Taiwanese/Chinese cultural practices dominate night market spaces, requiring minority cultures like Hakka to strategically navigate visibility and adaptation.',
        },
        {
          citation:
            'Lefebvre, H. (1968). The Right to the City. In E. Kofman & E. Lebas (Eds.), Writings on Cities. Blackwell.',
          summary:
            'Argues that urban spaces should be accessible to all citizens regardless of economic status, and that genuine democratic participation requires spaces where economic barriers are minimized.',
          relevance:
            'Provides framework for analyzing how night markets function as working-class cultural spaces that resist gentrification and maintain economic accessibility for cultural participation.',
        },
        {
          citation:
            'Robertson, R. (1995). Glocalization: Time-Space and Homogeneity-Heterogeneity. In M. Featherstone, S. Lash, & R. Robertson (Eds.), Global Modernities (pp. 25-44). Sage.',
          summary:
            'Introduces the concept of "glocalization" - the simultaneous occurrence of universalizing and particularizing tendencies in contemporary cultural processes, showing how global and local forces interact.',
          relevance:
            'Explains how night market vendors create cultural forms that are simultaneously local (maintaining regional distinctiveness) and global (oriented toward tourism markets).',
        },
        {
          citation: 'Said, E. W. (1978). Orientalism. Pantheon Books.',
          summary:
            'Foundational work examining how Western representations of the "Orient" serve to justify and maintain power relations, showing how cultural representations are political acts that reinforce hierarchies.',
          relevance:
            'Important for analyzing how tourist-oriented cultural performances in night markets may reinforce certain narratives about Taiwan and its relationship to broader Asian cultural dynamics.',
        },
        {
          citation:
            'Scott, J. C. (1990). Domination and the Arts of Resistance: Hidden Transcripts. Yale University Press.',
          summary:
            'Examines how subordinated groups develop "hidden transcripts" - forms of resistance and cultural preservation that operate beneath dominant power structures, distinct from public performances required by those in power.',
          relevance:
            'Provides framework for understanding how night market vendors navigate between public cultural performances for tourists/authorities and private preservation of authentic cultural practices.',
        },
      ],
    },
    {
      category: 'Taiwan Studies & Food Politics',
      sources: [
        {
          citation:
            'Chen, Y.-J. (2011). Ethnic Politics in the Framing of National Cuisine: State Banquets and the Proliferation of Ethnic Cuisine in Taiwan. Food, Culture & Society, 14(3), 315–333.',
          doi: 'https://doi.org/10.2752/175174411X12961586033483',
          summary:
            "Examines how Taiwan's government has used food as a tool for building national identity, particularly through the promotion of Minnan and Hakka cuisines while marginalizing Indigenous foods.",
          relevance:
            'Provides important framework for understanding which cuisines are promoted and why, informing analysis of night market cultural politics and state influence on cultural representation.',
        },
      ],
    },
    {
      category: 'Digital Heritage & Cultural Preservation',
      sources: [
        {
          citation:
            'Srinivasan, R., & Luther, A. (2016). Digital Museums and Diverse Cultural Knowledges: Moving Past the Traditional Catalog. Museum Anthropology Review, 10(2), 47–71.',
          url: 'https://www.researchgate.net/publication/220175180_Digital_Museums_and_Diverse_Cultural_Knowledges_Moving_Past_the_Traditional_Catalog',
          summary:
            'Argues for participatory, inclusive digital heritage models that allow communities to define and share their own cultural narratives, challenging traditional museum cataloging systems.',
          relevance:
            'Supports my approach of creating culturally respectful digital platforms that empower community voices in heritage preservation.',
        },
        {
          citation:
            'Giaccardi, E. (2012). Heritage and Social Media: Understanding Heritage in a Participatory Culture. Routledge.',
          summary:
            'Examines how social media transforms cultural heritage preservation, enabling participatory curation and community-driven cultural narratives.',
          relevance:
            'Provides theoretical foundation for integrating social features and community participation in digital cultural documentation.',
        },
        {
          citation:
            'Barbash, M., Petrenko, N., & Yepyk, L. (2024). Cultural Preservation and Digital Heritage: Challenges and Opportunities. Amazonia Investiga, 13(75), 262–274.',
          summary:
            'Explores both opportunities and challenges in digital cultural preservation, emphasizing the importance of community collaboration and accuracy in representation.',
          relevance:
            'Guides development of preservation features while highlighting the need for authentic, community-collaborative approaches.',
        },
      ],
    },
    {
      category: 'Night Market Studies & Vendor Behavior',
      sources: [
        {
          citation:
            'Chen, Y.-C., & Huang, H.-L. (2014). The Attractiveness of Tourist Night Markets in Taiwan – A Supply-Side View. Asia Pacific Journal of Tourism Research, 19(6), 687–705.',
          summary:
            'Analyzes how vendors create "attractiveness" for tourists through cultural performances and market experiences, examining the business motivations behind cultural commodification.',
          relevance:
            'Provides framework for analyzing vendor behavior and cultural performance strategies, particularly relevant for understanding identity commodification at Shilin Night Market.',
        },
        {
          citation:
            'Wu, C.-H., & Lin, Y.-H. (2013). To Explore Taiwanese Night Markets Culture and Tourism Experience and Behaviour. Procedia - Social and Behavioral Sciences, 40, 435–440.',
          summary:
            'Explores tourist engagement with night markets, focusing on behaviors, consumption patterns, and cultural interactions as social spaces for cultural exchange.',
          relevance:
            'Provides framework for "democratic cultural spaces" claim that this research critiques, showing gaps between idealized and actual power dynamics in night market interactions.',
        },
      ],
    },

    {
      category: 'Participatory Culture & Inclusion',
      sources: [
        {
          citation:
            'Giglitto, D., & Ciolfi, L. (2023). Digital Approaches to Inclusion and Participation in Cultural Heritage: Insights from Research and Practice in Europe. International Journal of Heritage Studies, 29(1), 1–17.',
          summary:
            'Explores digital strategies for promoting inclusivity in cultural heritage projects, highlighting case studies where marginalized communities contribute their perspectives.',
          relevance:
            'Provides framework for ensuring the platform is accessible and engaging for diverse users, emphasizing inclusive representation.',
        },
      ],
    },
    {
      category: 'Popular & Cultural Sources',
      sources: [
        {
          citation:
            "Tang, C. (2025). Taiwan's Night Market Culture; How to Enjoy Taiwanese Night Markets Like a Local. ABTaiwanProject.",
          summary:
            'Provides practical insights into night market culture, focusing on must-try dishes and social dynamics from a local perspective.',
          relevance:
            'Offers grounded, practical knowledge that enhances the authenticity of platform content and user guidance.',
        },
        {
          citation:
            "Su, S. (2023). Let's Go to the Night Market! A Movable Feast of Taiwanese Treats. Ministry of Foreign Affairs, Republic of China (Taiwan).",
          summary:
            "Official overview of Taiwan's night markets emphasizing their role as cultural hubs and community spaces for both locals and tourists.",
          relevance:
            "Provides official perspective on night market cultural significance, supporting the platform's educational and cultural preservation goals.",
        },
      ],
    },
  ]

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='font-bold text-4xl md:text-5xl text-white mb-6'>
            Bibliography
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed mb-4'>
            Academic sources for "Cultural Identity Negotiation in Taiwan's
            Night Markets"
          </p>
          <p className='text-neutral-400'>
            Sources listed alphabetically by author within categories, following
            standard academic bibliography format
          </p>
        </div>

        {/* Academic Note */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>Theoretical Framework</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            This research uses critical ethnographic observation combined with
            postcolonial and cultural studies theory to examine how cultural
            identity operates in Taiwan's night market spaces. The analysis
            draws primarily on Edward Said's orientalism framework, Pierre
            Bourdieu's cultural capital theory, and James C. Scott's concept of
            hidden transcripts to understand power dynamics in cultural
            representation.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Methodology:</strong> Evidence gathered through participant
            observation at four Taiwan night markets, analyzed using Chen and
            Huang's (2014) vendor behavior framework while incorporating
            postcolonial approaches that examine power dynamics in everyday
            cultural spaces.
          </p>
        </div>

        {/* Sources by Category */}
        <div className='space-y-12'>
          {sources.map((category, categoryIndex) => (
            <section
              key={categoryIndex}
              className='bg-neutral-900 rounded-xl p-8'
            >
              <h2 className='text-2xl font-bold text-white mb-8 border-b border-primary pb-3'>
                {category.category}
              </h2>

              <div className='space-y-8'>
                {category.sources.map((source, sourceIndex) => (
                  <div
                    key={sourceIndex}
                    className='border-l-4 border-accent pl-6'
                  >
                    <div className='mb-4'>
                      <p className='text-neutral-200 font-medium leading-relaxed mb-2'>
                        {source.citation}
                      </p>
                      {source.doi && (
                        <a
                          href={source.doi}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-primary hover:text-primary-light text-sm transition-colors'
                        >
                          DOI: {source.doi}
                        </a>
                      )}
                      {source.url && (
                        <a
                          href={source.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-primary hover:text-primary-light text-sm transition-colors'
                        >
                          Available at: {source.url}
                        </a>
                      )}
                    </div>

                    <div className='space-y-3'>
                      <div>
                        <h4 className='text-white font-semibold text-sm mb-1'>
                          Summary:
                        </h4>
                        <p className='text-neutral-400 text-sm leading-relaxed'>
                          {source.summary}
                        </p>
                      </div>

                      <div>
                        <h4 className='text-primary font-semibold text-sm mb-1'>
                          Relevance to Project:
                        </h4>
                        <p className='text-neutral-300 text-sm leading-relaxed'>
                          {source.relevance}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Research Limitations & Future Directions */}
        <div className='mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Research Limitations & Future Directions
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Current Limitations
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                This research represents observations from a specific time
                period and perspective. The analysis would benefit from
                longer-term ethnographic work and direct collaboration with
                vendor communities to capture their own perspectives on cultural
                identity negotiation.
              </p>
              <p className='text-neutral-400 text-sm'>
                Indigenous food cultures remain largely absent from these
                tourist-facing markets, representing a significant gap in
                understanding Taiwan's complete culinary landscape and power
                dynamics.
              </p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Future Research Areas
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                Future research should incorporate Indigenous food studies
                scholarship and examine how digital documentation might
                democratize cultural representation beyond current institutional
                frameworks.
              </p>
              <p className='text-neutral-400 text-sm'>
                Comparative analysis with other post-colonial commercial
                cultural spaces could reveal broader patterns of how cultural
                identity operates under economic and political pressures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
