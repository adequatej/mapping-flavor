import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const marketsData = [
  {
    id: 'shilin',
    name: 'Shilin Night Market',
    chineseName: '士林夜市',
    location: 'Shilin District, Taipei',
    latitude: 25.0881,
    longitude: 121.524,
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
    latitude: 25.0515,
    longitude: 121.5768,
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
    latitude: 25.0364,
    longitude: 121.5009,
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
    latitude: 21.9426,
    longitude: 120.7967,
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

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.vendor.deleteMany()
  await prisma.market.deleteMany()
  await prisma.user.deleteMany()

  // Create markets
  for (const market of marketsData) {
    const result = await prisma.market.create({
      data: market,
    })
    console.log(`Created market: ${result.name}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
