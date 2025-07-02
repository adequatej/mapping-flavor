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
            'Appadurai, Arjun. Modernity at Large: Cultural Dimensions of Globalization. University of Minnesota Press, 1996.',
          summary:
            'Shows how local cultures adapt to global influences while keeping their unique character, introducing the concept of "glocalization" where communities blend global trends with local traditions.',
          relevance:
            'Helps explain how night market vendors balance authentic local culture with tourist expectations, especially important for understanding southern Taiwan markets.',
        },
        {
          citation:
            'Bourdieu, Pierre. Distinction: A Social Critique of the Judgement of Taste. Harvard University Press, 1984.',
          summary:
            'Explains how cultural knowledge works like money having the "right" cultural knowledge gives you social advantages, while economic pressures limit what cultures can be expressed.',
          relevance:
            'Shows how money pressures in night markets control which cultural stories vendors can tell, revealing that cultural democracy is more limited than it appears.',
        },
        {
          citation:
            'Gramsci, Antonio. Selections from the Prison Notebooks. International Publishers, 1971.',
          summary:
            'Explains how dominant cultures stay in power not through force but by making their way of life seem "normal" and natural, while minority groups must find smart ways to survive within these systems.',
          relevance:
            'Essential for understanding how mainstream Taiwanese/Chinese culture dominates night market spaces, forcing minority cultures like Hakka to find strategic ways to stay visible.',
        },
        {
          citation:
            'Lefebvre, Henri. "The Right to the City." Writings on Cities, edited by Eleonore Kofman and Elizabeth Lebas, Blackwell, 1968.',
          summary:
            'Argues that city spaces should be open to everyone regardless of how much money they have, and that real democracy needs affordable spaces where all people can participate.',
          relevance:
            'Helps analyze how night markets work as working-class cultural spaces that fight against expensive development and keep culture accessible to everyone.',
        },
        {
          citation:
            'Robertson, Roland. "Glocalization: Time-Space and Homogeneity-Heterogeneity." Global Modernities, edited by Mike Featherstone, Scott Lash, and Roland Robertson, Sage, 1995, pp. 25-44.',
          summary:
            'Introduces "glocalization" the idea that cultures become both more global and more local at the same time, showing how worldwide trends and local traditions blend together.',
          relevance:
            'Explains how night market vendors create cultural practices that are both local (keeping regional traditions) and global (appealing to international tourists).',
        },
        {
          citation: 'Said, Edward W. Orientalism. Pantheon Books, 1978.',
          summary:
            'Groundbreaking work showing how Western stereotypes about "Eastern" cultures serve to maintain Western power, demonstrating that cultural representations are political acts that support inequality.',
          relevance:
            'Important for analyzing how tourist-focused cultural performances in night markets may reinforce stereotypes about Taiwan and shape how Taiwan relates to other Asian cultures.',
        },
        {
          citation:
            'Scott, James C. Domination and the Arts of Resistance: Hidden Transcripts. Yale University Press, 1990.',
          summary:
            'Shows how oppressed groups develop "hidden transcripts" private ways of resisting and preserving their culture that operate beneath what powerful groups can see, different from the public performances required by those in power.',
          relevance:
            'Helps understand how night market vendors balance public cultural performances for tourists and authorities with private preservation of authentic cultural practices.',
        },
      ],
    },
    {
      category: 'Taiwan Studies & Food Politics',
      sources: [
        {
          citation:
            'Chen, Yu-Jen. "Ethnic Politics in the Framing of National Cuisine: State Banquets and the Proliferation of Ethnic Cuisine in Taiwan." Food, Culture & Society, vol. 14, no. 3, 2011, pp. 315–333.',
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
            'Argues for digital heritage approaches where communities control how their own cultural stories are told and shared, challenging traditional museum systems that impose outside perspectives.',
          relevance:
            'Supports my approach of creating this culturally respectful digital platform that gives communities control over their heritage representation.',
        },
        {
          citation:
            'Giaccardi, E. (2012). Heritage and Social Media: Understanding Heritage in a Participatory Culture. Routledge.',
          summary:
            'Studies how social media changes cultural heritage preservation, allowing communities to participate in curating and sharing their own cultural stories.',
          relevance:
            'Provides theoretical framework for digital heritage approaches that respect community perspectives, informing the platform emphasis on culturally sensitive documentation methods.',
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
            'Chen, Yu-Chen, and Hsin-Ling Huang. "The Attractiveness of Tourist Night Markets in Taiwan: A Supply-Side View." Asia Pacific Journal of Tourism Research, vol. 19, no. 6, 2014, pp. 687–705.',
          summary:
            'Studies how vendors make their stalls appealing to tourists through cultural performances and market experiences, examining the business reasons behind turning culture into products.',
          relevance:
            'Provides framework for analyzing vendor behavior and cultural performance strategies, especially important for understanding identity commercialization at Shilin Night Market.',
        },
        {
          citation:
            'Wu, Chia-Hung, and Yu-Hsiang Lin. "To Explore Taiwanese Night Markets Culture and Tourism Experience and Behaviour." Procedia - Social and Behavioral Sciences, vol. 40, 2013, pp. 435–440.',
          summary:
            'Studies how tourists engage with night markets, looking at behaviors, buying patterns, and cultural interactions as social spaces for cultural exchange.',
          relevance:
            'Provides the "democratic cultural spaces" idea that this research challenges, helping reveal gaps between ideal visions and actual power dynamics in night market interactions.',
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
            'Studies digital methods for making cultural heritage projects more inclusive, highlighting examples where marginalized communities contribute their own perspectives.',
          relevance:
            'Helps ensure the platform is accessible to diverse users and emphasizes inclusive representation of different cultural perspectives.',
        },
      ],
    },
    {
      category: 'Cultural Context & Official Sources',
      sources: [
        {
          citation:
            "Tang, C. (2024). Taiwan's Night Market Culture; How to Enjoy Taiwanese Night Markets Like a Local. ABTaiwanProject.",
          summary:
            'Provides practical insights into night market culture, focusing on must-try dishes and social dynamics from a local perspective.',
          relevance:
            'Offers grounded, practical knowledge that enhances the authenticity of cultural descriptions and validates academic observations with local expertise.',
        },
        {
          citation:
            "Su, S. (2023). Let's Go to the Night Market! A Movable Feast of Taiwanese Treats. Ministry of Foreign Affairs, Republic of China (Taiwan).",
          summary:
            "Official overview of Taiwan's night markets emphasizing their role as cultural hubs and community spaces for both locals and tourists.",
          relevance:
            'Provides official government perspective on night market cultural significance, useful for understanding how cultural policy shapes market dynamics.',
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

        {/* Research Overview */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>How These Sources Work Together</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            This research observes how cultural identity works in Taiwan's night
            market spaces. The analysis uses Edward Said's ideas about cultural
            stereotypes, Pierre Bourdieu's concept of cultural knowledge as
            power, and James C. Scott's ideas about hidden resistance to
            understand how power shapes cultural representation.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Research Method:</strong> Evidence gathered by observing
            vendor behavior at four Taiwan night markets, analyzed using Chen
            and Huang's (2014) framework for understanding how vendors balance
            cultural authenticity with business needs.
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
