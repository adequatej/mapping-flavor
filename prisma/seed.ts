import { PrismaClient } from '@prisma/client'

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
      'Analysis focuses on language switching patterns, dual pricing strategies, and spatial tourism infrastructure. Vendors show sophisticated audience recognition and cultural performance adaptation.',
    keyFindings: [
      'Language switching patterns between Mandarin and English for tourists',
      'Dual pricing strategies with tourist-oriented portions',
      'Spatial tourism infrastructure with designated photo spots',
      'Cultural commodification through "authentic" performance',
    ],
    image: '/images/markets/shilin.jpg',
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
      'Strategic visibility of minority culture within dominant stories',
    ],
    image: '/images/markets/raohe.jpg',
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
      'Shows how night markets work as democratic cultural spaces crossing economic boundaries, serving as community formation sites for working-class populations.',
    analyticalNote:
      'Analysis shows economic accessibility patterns, traditional preparation methods, and community formation dynamics that resist gentrification pressures.',
    keyFindings: [
      'Economic accessibility patterns serving working-class communities',
      'Traditional preparation methods preserved through necessity',
      'Community formation through shared dining experiences',
      'Resistance to gentrification through cultural authenticity',
    ],
    image: '/images/markets/huaxi.jpg',
    isActive: true,
  },
  {
    id: 'kenting-night-market',
    name: 'Kenting Night Market',
    chineseName: '墾丁夜市',
    location: 'Hengchun Township, Pingtung County',
    latitude: 21.958753,
    longitude: 120.794328,
    established: '1980',
    researchFocus: 'Tourism & Regional Identity',
    description:
      'Looks at how beach resort tourism shapes regional food identity and cultural performance, showing adaptation strategies for seasonal tourism economies.',
    analyticalNote:
      'Research focuses on seasonal tourism impacts, regional vs. tourist-oriented offerings, and beach town cultural adaptations that balance local identity with visitor expectations.',
    keyFindings: [
      'Seasonal tourism impacts on vendor strategies and menu adaptation',
      'Regional vs. tourist-oriented offerings creating dual identities',
      'Beach town cultural adaptations maintaining local character',
      'Tourism economy effects on traditional food culture preservation',
    ],
    image: '/images/markets/kenting.jpg',
    isActive: true,
  },
]

const vendors = [
  // Shilin Night Market vendors
  {
    name: 'Hot Sausage Stand',
    chineseName: '熱狗香腸攤',
    description:
      'Popular sausage vendor serving grilled Taiwanese sausages with various toppings. Known for their perfectly charred exterior and juicy interior, served with garlic, pickled vegetables, and special sauce.',
    specialties: [
      'Grilled Taiwanese Sausage',
      'Garlic Sauce',
      'Pickled Vegetables',
    ],
    latitude: 25.0877,
    longitude: 121.5241,
    images: ['/images/vendors/IMG_1232.jpg'],
    operatingHours: '6:00 PM - 1:00 AM',
    researchNotes:
      'Observed consistent preparation methods with high-quality ingredients. Popular with both locals and tourists, with staff able to explain preparation in multiple languages.',
    culturalSignificance:
      'Represents traditional Taiwanese street food culture with simple, quality ingredients and time-tested preparation methods.',
    marketId: 'shilin-night-market',
  },
  {
    name: 'Korean Corn Dogs',
    chineseName: '韓式熱狗',
    description:
      'Korean-style corn dogs with various coatings including potato cubes, crushed ramen noodles, and traditional batter. Served with special Korean sauces and toppings.',
    specialties: ['Korean Corn Dogs', 'Potato Coating', 'Korean Sauces'],
    latitude: 25.0878,
    longitude: 121.5239,
    images: ['/images/vendors/IMG_1617.jpg'],
    operatingHours: '7:00 PM - 12:30 AM',
    researchNotes:
      'Modern addition to traditional night market, showing how international foods adapt to local tastes. Popular with younger customers.',
    culturalSignificance:
      'Demonstrates how night markets evolve to include international foods while maintaining local preparation styles.',
    marketId: 'shilin-night-market',
  },
  {
    name: 'Bubble Tea Corner',
    chineseName: '珍珠奶茶角落',
    description:
      'Traditional bubble tea stand offering classic milk tea with tapioca pearls, taro, and seasonal fruit flavors. Uses traditional brewing methods with modern presentation.',
    specialties: ['Bubble Tea', 'Tapioca Pearls', 'Fruit Teas'],
    latitude: 25.0876,
    longitude: 121.5242,
    images: ['/images/vendors/bubble_tea.jpg'],
    operatingHours: '6:30 PM - 1:30 AM',
    researchNotes:
      'Classic Taiwanese beverage with consistent quality. Serves both traditional preparations and modern variations for different customer preferences.',
    culturalSignificance:
      "Represents Taiwan's most famous beverage export, showing how local innovations become global phenomena.",
    marketId: 'shilin-night-market',
  },

  // Raohe Street Market vendors
  {
    name: 'Chinese Hamburger House',
    chineseName: '中式漢堡屋',
    description:
      'Traditional Chinese hamburger (rou jia mo) with slow-braised pork in crispy flatbread. Family recipe passed down through generations with authentic Shaanxi-style preparation.',
    specialties: ['Chinese Hamburger', 'Braised Pork', 'Traditional Flatbread'],
    latitude: 25.0515,
    longitude: 121.5769,
    images: ['/images/vendors/IMG_1225.jpg'],
    operatingHours: '6:00 PM - 11:30 PM',
    researchNotes:
      'Family-operated business maintaining traditional preparation methods. Uses time-intensive braising process that creates tender, flavorful meat.',
    culturalSignificance:
      'Preserves traditional Chinese regional cuisine, demonstrating how night markets serve as repositories for diverse culinary traditions.',
    marketId: 'raohe-street-market',
  },
  {
    name: 'Fresh Pancakes',
    chineseName: '新鮮煎餅',
    description:
      'Thin, crispy pancakes (jian bing) made fresh to order with eggs, scallions, and savory sauce. Traditional breakfast food adapted for evening night market dining.',
    specialties: ['Jian Bing Pancakes', 'Fresh Eggs', 'Scallion Sauce'],
    latitude: 25.0516,
    longitude: 121.5767,
    images: ['/images/vendors/IMG_9794.jpg'],
    operatingHours: '5:30 PM - 12:00 AM',
    researchNotes:
      'Skilled preparation requiring precise timing and temperature control. Popular comfort food that bridges breakfast and dinner dining.',
    culturalSignificance:
      'Shows how traditional breakfast foods find new life in night market settings, adapting to different dining schedules.',
    marketId: 'raohe-street-market',
  },
  {
    name: 'King Oyster Mushroom Grill',
    chineseName: '杏鮑菇燒烤',
    description:
      'Grilled king oyster mushrooms with various seasonings and sauces. Vegetarian-friendly option that showcases the natural umami flavors of premium mushrooms.',
    specialties: [
      'Grilled King Oyster Mushrooms',
      'Vegetarian Options',
      'Umami Seasonings',
    ],
    latitude: 25.0517,
    longitude: 121.5766,
    images: ['/images/vendors/IMG_2055.jpg'],
    operatingHours: '6:00 PM - 1:00 AM',
    researchNotes:
      'Specializes in vegetarian grilled foods, showing growing demand for plant-based options in traditional meat-heavy night market environment.',
    culturalSignificance:
      'Represents evolving dietary preferences while maintaining traditional grilling techniques and flavor profiles.',
    marketId: 'raohe-street-market',
  },

  // Huaxi Street Market vendors
  {
    name: 'Fried Bread Kitchen',
    chineseName: '炸麵包廚房',
    description:
      'Traditional fried bread (you tiao) and various fried dough items. Simple, affordable comfort food that serves the local working community with generous portions.',
    specialties: ['Fried Bread', 'You Tiao', 'Comfort Food'],
    latitude: 25.0376,
    longitude: 121.501,
    images: ['/images/vendors/IMG_1303.jpg'],
    operatingHours: '5:00 PM - 11:00 PM',
    researchNotes:
      'Focuses on affordable, filling foods for working-class customers. Maintains consistent quality and pricing despite rising ingredient costs.',
    culturalSignificance:
      "Provides essential affordable nutrition for local working community, demonstrating night markets' role in food security.",
    marketId: 'huaxi-street-market',
  },
  {
    name: 'Pork Bun Express',
    chineseName: '豬肉包快遞',
    description:
      'Steamed pork buns (baozi) with traditional filling recipes. Quick, affordable meals that serve construction workers, taxi drivers, and local residents.',
    specialties: ['Steamed Pork Buns', 'Traditional Fillings', 'Quick Service'],
    latitude: 25.0377,
    longitude: 121.5008,
    images: ['/images/vendors/IMG_2080.jpg'],
    operatingHours: '4:00 PM - 10:00 PM',
    researchNotes:
      'Efficient operation serving working-class customers who need quick, affordable meals. Known for generous portions and consistent quality.',
    culturalSignificance:
      'Essential food service for working community, showing how traditional foods meet modern urban needs.',
    marketId: 'huaxi-street-market',
  },
  {
    name: 'Simple Noodle Bowl',
    chineseName: '簡單麵碗',
    description:
      'Basic beef noodle soup and simple noodle dishes at affordable prices. No-frills preparation focusing on hearty, satisfying meals for local workers.',
    specialties: ['Beef Noodle Soup', 'Simple Noodles', 'Affordable Meals'],
    latitude: 25.0378,
    longitude: 121.5009,
    images: ['/images/vendors/simple_noodle.jpg'],
    operatingHours: '5:00 PM - 11:00 PM',
    researchNotes:
      'Straightforward operation with focus on value and nutrition rather than presentation. Regular customers include local workers and elderly residents.',
    culturalSignificance:
      'Maintains traditional noodle shop culture within night market setting, serving essential community dining needs.',
    marketId: 'huaxi-street-market',
  },

  // Kenting Night Market vendors
  {
    name: 'Beach Seafood Grill',
    chineseName: '海灘海鮮燒烤',
    description:
      'Fresh grilled seafood featuring local catches from Kenting waters. Specializes in fish, squid, and shellfish prepared with simple seasonings to highlight natural flavors.',
    specialties: ['Grilled Fish', 'Fresh Squid', 'Local Seafood'],
    latitude: 21.9588,
    longitude: 120.7943,
    images: ['/images/vendors/beach_seafood.jpg'],
    operatingHours: '6:00 PM - 1:00 AM',
    researchNotes:
      'Sources directly from local fishing boats. Preparation adapts to seasonal availability while maintaining traditional grilling methods.',
    culturalSignificance:
      'Connects night market dining to local fishing economy, showcasing regional coastal food culture.',
    marketId: 'kenting-night-market',
  },
  {
    name: 'Tropical Fruit Stand',
    chineseName: '熱帶水果攤',
    description:
      'Fresh tropical fruits including mango, dragon fruit, and local seasonal varieties. Serves both whole fruits and fresh-cut options for beach visitors.',
    specialties: ['Fresh Mango', 'Dragon Fruit', 'Seasonal Tropical Fruits'],
    latitude: 21.9587,
    longitude: 120.7944,
    images: ['/images/vendors/tropical_fruit.jpg'],
    operatingHours: '5:00 PM - 12:00 AM',
    researchNotes:
      'Adapts to tourist preferences while showcasing local agricultural products. Popular with visitors seeking healthy, refreshing options.',
    culturalSignificance:
      "Highlights southern Taiwan's agricultural abundance and adaptation to beach tourism economy.",
    marketId: 'kenting-night-market',
  },
  {
    name: 'Late Night Beef Noodles',
    chineseName: '深夜牛肉麵',
    description:
      'Traditional beef noodle soup adapted for late-night beach dining. Lighter broth and smaller portions suitable for warm coastal weather and late eating.',
    specialties: ['Light Beef Noodles', 'Clear Broth', 'Late Night Dining'],
    latitude: 21.9586,
    longitude: 120.7945,
    images: ['/images/vendors/beef_noodle.jpg'],
    operatingHours: '8:00 PM - 3:00 AM',
    researchNotes:
      'Adapts traditional heavy noodle soup for beach climate and late-night dining preferences. Popular with surfers and late-night beach visitors.',
    culturalSignificance:
      'Shows how traditional Taiwanese comfort food adapts to regional climate and tourism patterns.',
    marketId: 'kenting-night-market',
  },
]

async function main() {
  console.log('Starting database seeding with research data...')

  try {
    // First, delete all existing market-vendor relationships and vendors
    console.log('Cleaning up existing data...')
    await prisma.marketVendor.deleteMany({})
    await prisma.vendor.deleteMany({})
    console.log('✓ Cleaned up existing vendors and relationships')

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

      // Create vendor with a deterministic ID based on name and market
      const vendorId = `${vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${marketId}`

      const createdVendor = await prisma.vendor.create({
        data: {
          id: vendorId,
          ...vendorData,
        },
      })
      console.log(`✓ Created vendor: ${vendor.name}`)

      // Link vendor to market
      await prisma.marketVendor.create({
        data: {
          marketId: marketId,
          vendorId: createdVendor.id,
        },
      })
      console.log(`  → Linked to ${markets.find(m => m.id === marketId)?.name}`)
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
