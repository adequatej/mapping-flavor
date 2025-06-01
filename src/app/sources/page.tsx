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
      category: 'Food Studies & National Identity',
      sources: [
        {
          citation:
            'Chen, Y.-J. (2011). Ethnic Politics in the Framing of National Cuisine: State Banquets and the Proliferation of Ethnic Cuisine in Taiwan. Food, Culture & Society, 14(3), 315–333.',
          doi: 'https://doi.org/10.2752/175174411X12961586033483',
          summary:
            "Examines how Taiwan's government has used food as a tool for building national identity, particularly through the promotion of Minnan and Hakka cuisines while marginalizing Indigenous foods.",
          relevance:
            'Provides crucial framework for understanding which cuisines are promoted and why, informing my analysis of night market cultural politics.',
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
      category: 'Tourism Studies & Night Market Analysis',
      sources: [
        {
          citation:
            'Chen, Y.-C., & Huang, H.-L. (2014). The Attractiveness of Tourist Night Markets in Taiwan – A Supply-Side View. Asia Pacific Journal of Tourism Research, 19(6), 687–705.',
          summary:
            'Analyzes how vendors create "attractiveness" for tourists through cultural performances and market experiences, examining the business motivations behind cultural commodification.',
          relevance:
            'Informs my understanding of vendor strategies and tourist-local dynamics, particularly relevant for Shilin Night Market analysis.',
        },
        {
          citation:
            'Wu, C.-H., & Lin, Y.-H. (2013). To Explore Taiwanese Night Markets Culture and Tourism Experience and Behaviour. Procedia - Social and Behavioral Sciences, 40, 435–440.',
          summary:
            'Explores tourist engagement with night markets, focusing on behaviors, consumption patterns, and cultural interactions as social spaces for cultural exchange.',
          relevance:
            'Provides data on tourist experiences and satisfaction, informing my analysis of night markets as democratic cultural spaces.',
        },
        {
          citation:
            'Liu, C., Chou, S., & Lin, J. (2021). Implementation and Evaluation of Tourism Industry: Evidentiary Case Study of Night Market Development in Taiwan. Evaluation and Program Planning, 84, 101961.',
          summary:
            "Evaluates night market development in Taiwan's tourism industry, examining economic benefits and cultural preservation within commercial contexts.",
          relevance:
            'Helps balance cultural preservation with tourism promotion, informing decisions about market and vendor selection for the platform.',
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
            Academic <span className='text-primary'>Sources</span>
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed mb-4'>
            Scholarly foundation for the critical analysis of Taiwanese night
            market culture and digital heritage preservation
          </p>
          <p className='text-neutral-400'>
            This research draws upon interdisciplinary scholarship in food
            studies, digital heritage, tourism studies, and Taiwan studies
          </p>
        </div>

        {/* Methodology Note */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>Research Framework</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            This project uses observational research methods combined with
            critical cultural analysis, drawing on established scholarship in
            food studies, digital heritage, and tourism research. The
            interdisciplinary approach allows for comprehensive examination of
            night markets as sites of cultural identity negotiation and digital
            preservation experimentation.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Note:</strong> All observations and analysis are grounded in
            existing scholarly frameworks, with particular attention to
            participatory heritage models and community-centered approaches to
            cultural documentation.
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

        {/* Additional Research Areas */}
        <div className='mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Future Research Directions
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Expanding the Framework
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                Future research could incorporate Indigenous food studies
                scholarship and postcolonial food theory to further examine
                power dynamics in Taiwan's culinary landscape.
              </p>
              <p className='text-neutral-400 text-sm'>
                Additional fieldwork could include comparative analysis with
                other Asian night market cultures and deeper investigation of
                vendor family histories.
              </p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Community Collaboration
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                This platform serves as a foundation for community-driven
                research, inviting vendors, customers, and cultural
                practitioners to contribute their perspectives and experiences.
              </p>
              <p className='text-neutral-400 text-sm'>
                Following participatory heritage models, future development will
                prioritize community agency in cultural representation and
                narrative creation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
