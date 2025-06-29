import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const markets = [
  {
    id: 'shilin-night-market',
    name: 'Shilin Night Market',
    chineseName: '士林夜市',
    location: 'Shilin District, Taipei',
    latitude: 25.0877,
    longitude: 121.524,
    established: '1899',
    researchFocus: 'Tourism vs. Authenticity',
    description:
      'Taiwan\'s largest and most famous night market, serving as a primary case study for examining how vendors create "attractiveness" for tourists through cultural commodification.',
    analyticalNote:
      'Analysis focuses on language switching patterns, dual pricing strategies, and spatial tourism infrastructure. Vendors demonstrate sophisticated audience recognition and cultural performance adaptation.',
    keyFindings: [
      'Language switching patterns between Mandarin and English for tourists',
      'Dual pricing strategies with tourist-oriented portions',
      'Spatial tourism infrastructure with designated photo spots',
      'Cultural commodification through "authentic" performance',
    ],
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    isActive: true,
  },
  {
    id: 'raohe-street-market',
    name: 'Raohe Street Market',
    chineseName: '饒河街觀光夜市',
    location: 'Songshan District, Taipei',
    latitude: 25.0515,
    longitude: 121.5768,
    established: '1987',
    researchFocus: 'Hakka Heritage & Visibility',
    description:
      'A critical site for examining minority culture preservation within mainstream commercial spaces, focusing on how Hakka vendors navigate cultural visibility and authenticity.',
    analyticalNote:
      'Research documents Hakka cultural markers, intergenerational knowledge transfer, and audience-specific marketing strategies that preserve minority cultural identity.',
    keyFindings: [
      'Hakka cultural markers maintained despite commercial pressures',
      'Intergenerational knowledge transfer through family recipes',
      'Audience-specific marketing preserving cultural authenticity',
      'Strategic visibility of minority culture within dominant narratives',
    ],
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    isActive: true,
  },
  {
    id: 'huaxi-street-market',
    name: 'Huaxi Street Market',
    chineseName: '華西街夜市',
    location: 'Wanhua District, Taipei',
    latitude: 25.0376,
    longitude: 121.5009,
    established: '1950',
    researchFocus: 'Working Class Food Culture',
    description:
      'Demonstrates how night markets function as democratic cultural spaces transcending economic boundaries, serving as community formation sites for working-class populations.',
    analyticalNote:
      'Analysis reveals economic accessibility patterns, traditional preparation methods, and community formation dynamics that resist gentrification pressures.',
    keyFindings: [
      'Economic accessibility patterns serving working-class communities',
      'Traditional preparation methods preserved through necessity',
      'Community formation through shared dining experiences',
      'Resistance to gentrification through cultural authenticity',
    ],
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    isActive: true,
  },
  {
    id: 'kenting-night-market',
    name: 'Kenting Night Market',
    chineseName: '墾丁夜市',
    location: 'Hengchun Township, Pingtung County',
    latitude: 22.0038,
    longitude: 120.7471,
    established: '1980',
    researchFocus: 'Tourism & Regional Identity',
    description:
      'Examines how beach resort tourism shapes regional food identity and cultural performance, demonstrating adaptation strategies for seasonal tourism economies.',
    analyticalNote:
      'Research focuses on seasonal tourism impacts, regional vs. tourist-oriented offerings, and beach town cultural adaptations that balance local identity with visitor expectations.',
    keyFindings: [
      'Seasonal tourism impacts on vendor strategies and menu adaptation',
      'Regional vs. tourist-oriented offerings creating dual identities',
      'Beach town cultural adaptations maintaining local character',
      'Tourism economy effects on traditional food culture preservation',
    ],
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    isActive: true,
  },
]

const vendors = [
  // Shilin Night Market vendors
  {
    name: 'Big Sausage Uncle',
    chineseName: '大腸包小腸阿伯',
    description:
      'Famous for Taiwanese sausage (da chang bao xiao chang), this vendor exemplifies tourist-friendly presentation while maintaining traditional preparation methods. Demonstrates sophisticated audience recognition and cultural performance adaptation.',
    specialties: [
      'Taiwanese Sausage',
      'Da Chang Bao Xiao Chang',
      'Tourist Photography',
    ],
    latitude: 25.0877,
    longitude: 121.5241,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '6:00 PM - 1:00 AM',
    researchNotes:
      'Observed language switching between Mandarin and basic English for tourists. Uses visual presentation techniques specifically for social media photography.',
    culturalSignificance:
      'Represents the commodification of traditional street food for tourism while maintaining authentic preparation methods.',
    marketId: 'shilin-night-market',
  },
  {
    name: "Mei-Li's Stinky Tofu",
    chineseName: '美麗臭豆腐',
    description:
      'Traditional fermented tofu stand with dual-language signage catering to both locals and international tourists. Demonstrates cultural bridge-building through food education and patient explanation of traditional fermentation processes.',
    specialties: ['Stinky Tofu', 'Fermented Foods', 'Cultural Education'],
    latitude: 25.0878,
    longitude: 121.5239,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '7:00 PM - 12:30 AM',
    researchNotes:
      'Notable for patient cultural education of tourists about fermentation processes. Maintains traditional preparation while explaining cultural significance.',
    culturalSignificance:
      'Serves as cultural ambassador, introducing challenging traditional foods to international audiences while preserving authentic methods.',
    marketId: 'shilin-night-market',
  },
  {
    name: 'Night Market Bubble Tea King',
    chineseName: '夜市珍奶王',
    description:
      'Modern bubble tea stand with Instagram-worthy presentation, representing the evolution of traditional Taiwanese drinks for social media culture. Demonstrates innovation within cultural tradition.',
    specialties: ['Bubble Tea', 'Instagram Photography', 'Modern Presentation'],
    latitude: 25.0876,
    longitude: 121.5242,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '6:30 PM - 1:30 AM',
    researchNotes:
      'Specifically designs drinks for social media photography. Represents evolution of traditional Taiwanese beverages for contemporary culture.',
    culturalSignificance:
      'Shows how traditional Taiwanese drinks adapt to global social media culture while maintaining cultural identity.',
    marketId: 'shilin-night-market',
  },

  // Raohe Street Market vendors
  {
    name: "Grandma Chen's Hakka Noodles",
    chineseName: '陳阿嬤客家麵',
    description:
      'Third-generation family business preserving traditional Hakka flat noodle recipes and preparation methods. Represents intergenerational knowledge transfer and minority culture preservation within commercial spaces.',
    specialties: [
      'Hakka Flat Noodles',
      'Traditional Recipes',
      'Family Heritage',
    ],
    latitude: 25.0515,
    longitude: 121.5769,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '6:00 PM - 11:30 PM',
    researchNotes:
      'Documents three generations of recipe preservation. Grandmother actively teaches traditional Hakka cooking techniques to family members.',
    culturalSignificance:
      'Critical site for Hakka cultural preservation, demonstrating how minority cultures maintain identity through food traditions.',
    marketId: 'raohe-street-market',
  },
  {
    name: 'Heritage Pepper Buns',
    chineseName: '傳統胡椒餅',
    description:
      'Traditional clay oven pepper buns with Hakka-style preparation methods. Maintains traditional baking techniques while serving diverse clientele, representing cultural preservation through authentic preparation.',
    specialties: ['Pepper Buns', 'Clay Oven Baking', 'Hakka Preparation'],
    latitude: 25.0516,
    longitude: 121.5767,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '5:30 PM - 12:00 AM',
    researchNotes:
      'Uses traditional clay oven techniques increasingly rare in modern Taiwan. Hakka-style spice blend distinguishes from mainstream versions.',
    culturalSignificance:
      'Preserves traditional baking methods while demonstrating Hakka cultural distinctiveness within Taiwanese food culture.',
    marketId: 'raohe-street-market',
  },
  {
    name: 'Three Generations Tea Eggs',
    chineseName: '三代茶葉蛋',
    description:
      'Family-run tea egg stand with traditional Hakka spice blends passed down through three generations. Demonstrates cultural continuity and the role of family recipes in preserving minority cultural identity.',
    specialties: ['Tea Eggs', 'Hakka Spices', 'Traditional Preparation'],
    latitude: 25.0514,
    longitude: 121.577,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '6:00 PM - 11:00 PM',
    researchNotes:
      'Three generations share cooking responsibilities, with active knowledge transfer. Uses traditional Hakka spice combinations distinct from mainstream preparations.',
    culturalSignificance:
      'Exemplifies how simple dishes carry complex cultural knowledge and serve as vehicles for minority culture preservation.',
    marketId: 'raohe-street-market',
  },

  // Huaxi Street Market vendors
  {
    name: "Old Wang's Snake Soup",
    chineseName: '老王蛇肉湯',
    description:
      'Traditional snake soup serving working-class clientele, representing authentic working-class food culture and traditional Chinese medicine principles. Demonstrates economic accessibility and community formation.',
    specialties: ['Snake Soup', 'Traditional Medicine', 'Working Class Food'],
    latitude: 25.0376,
    longitude: 121.501,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '8:00 PM - 2:00 AM',
    researchNotes:
      'Serves primarily working-class customers, many regulars. Represents traditional Chinese medicine principles in daily food consumption.',
    culturalSignificance:
      'Maintains traditional food culture that resists gentrification, serving as authentic community gathering space.',
    marketId: 'huaxi-street-market',
  },
  {
    name: "Workers' Noodle Stand",
    chineseName: '工人麵攤',
    description:
      'Affordable beef noodle soup serving as community gathering spot for working-class populations. Demonstrates democratic cultural space transcending economic boundaries through accessible pricing and communal dining.',
    specialties: [
      'Beef Noodle Soup',
      'Affordable Meals',
      'Community Gathering',
    ],
    latitude: 25.0377,
    longitude: 121.5008,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '7:00 PM - 3:00 AM',
    researchNotes:
      'Functions as community center with shared tables fostering social interaction. Pricing specifically maintained for working-class accessibility.',
    culturalSignificance:
      'Exemplifies night markets as democratic spaces where economic barriers to cultural participation are minimized.',
    marketId: 'huaxi-street-market',
  },
  {
    name: 'Night Shift Dumplings',
    chineseName: '夜班水餃',
    description:
      '24-hour dumpling stand serving night workers and late-shift employees. Represents night market role in supporting working-class schedules and community formation outside traditional hours.',
    specialties: ['Dumplings', '24-Hour Service', 'Night Workers'],
    latitude: 25.0375,
    longitude: 121.5011,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '24 Hours',
    researchNotes:
      'Serves night shift workers from nearby industries. Demonstrates night market function in supporting non-traditional work schedules.',
    culturalSignificance:
      'Shows how night markets support working-class community needs beyond tourism, serving essential social infrastructure role.',
    marketId: 'huaxi-street-market',
  },

  // Kenting Night Market vendors
  {
    name: 'Beach BBQ Seafood',
    chineseName: '海灘烤海鮮',
    description:
      'Fresh local seafood with beach tourism appeal, demonstrating adaptation of traditional preparation methods for seasonal tourism economy. Balances local fishing culture with visitor expectations.',
    specialties: ['Fresh Seafood', 'Beach BBQ', 'Local Fishing'],
    latitude: 22.0038,
    longitude: 120.7472,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '6:00 PM - 12:00 AM (Seasonal)',
    researchNotes:
      'Sources from local fishing boats, adapts preparation for tourist preferences. Seasonal operation reflects tourism economy impacts.',
    culturalSignificance:
      'Demonstrates how regional food culture adapts to tourism while maintaining connections to local fishing traditions.',
    marketId: 'kenting-night-market',
  },
  {
    name: 'Tropical Fruit Smoothies',
    chineseName: '熱帶水果冰沙',
    description:
      'Local tropical fruits prepared as smoothies for beach tourists, representing regional agricultural identity and adaptation to tourism preferences. Uses indigenous fruit varieties with modern presentation.',
    specialties: ['Tropical Fruits', 'Smoothies', 'Regional Agriculture'],
    latitude: 22.0039,
    longitude: 120.747,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '5:00 PM - 11:00 PM',
    researchNotes:
      'Uses local tropical fruits including indigenous varieties. Adapts traditional fruit consumption for beach tourism context.',
    culturalSignificance:
      'Shows how regional agricultural identity adapts to tourism economy while preserving connections to local farming traditions.',
    marketId: 'kenting-night-market',
  },
  {
    name: "Surfer's Late Night Noodles",
    chineseName: '衝浪客宵夜麵',
    description:
      'Casual noodles popular with surfers and beach-goers, representing cultural adaptation to beach lifestyle and international surf culture. Demonstrates local-global cultural intersection.',
    specialties: ['Late Night Noodles', 'Surf Culture', 'Beach Lifestyle'],
    latitude: 22.0037,
    longitude: 120.7473,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ],
    operatingHours: '8:00 PM - 2:00 AM',
    researchNotes:
      'Serves both local and international surf community. Represents intersection of traditional Taiwanese food culture with global beach lifestyle.',
    culturalSignificance:
      'Demonstrates how local food culture adapts to international beach and surf culture while maintaining Taiwanese identity.',
    marketId: 'kenting-night-market',
  },
]

async function main() {
  console.log('Starting database seeding with research data...')

  try {
    // Create markets
    for (const market of markets) {
      await prisma.market.upsert({
        where: { id: market.id },
        update: market,
        create: market,
      })
      console.log(`✓ Created/updated market: ${market.name}`)
    }

    // Create vendors and link to markets
    for (const vendor of vendors) {
      const { marketId, ...vendorData } = vendor

      // Use upsert to prevent duplicate vendors based on name and market
      const createdVendor = await prisma.vendor.upsert({
        where: {
          // Create a unique constraint based on name - we'll need to add this to schema
          // For now, let's use a combination approach
          id: `${vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${marketId}`,
        },
        update: vendorData,
        create: {
          id: `${vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${marketId}`,
          ...vendorData,
        },
      })
      console.log(`✓ Created/updated vendor: ${vendor.name}`)

      // Link vendor to market (check if relationship already exists)
      const existingRelation = await prisma.marketVendor.findUnique({
        where: {
          marketId_vendorId: {
            marketId: marketId,
            vendorId: createdVendor.id,
          },
        },
      })

      if (!existingRelation) {
        await prisma.marketVendor.create({
          data: {
            marketId: marketId,
            vendorId: createdVendor.id,
          },
        })
        console.log(
          `  → Linked to ${markets.find(m => m.id === marketId)?.name}`
        )
      } else {
        console.log(
          `  → Already linked to ${markets.find(m => m.id === marketId)?.name}`
        )
      }
    }

    console.log('\n🎉 Database seeding completed successfully!')
    console.log(
      `📊 Created ${markets.length} markets and ${vendors.length} vendors`
    )
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
