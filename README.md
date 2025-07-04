# Mapping Flavor: Taiwan Night Markets Cultural Research

**A Critical Examination of Taiwanese Cultural Identity Through Night Market Food Culture**

## 📖 Overview

This digital humanities project investigates how Taiwan's night markets function as sites of cultural identity negotiation. Through observational research and critical cultural analysis, this study explores how food vendors navigate authenticity, tourism pressures, and cultural preservation in post-colonial Taiwan.

## 🔬 Research Framework

### Central Research Questions

1. **Cultural Authenticity**: How do vendors balance preserving "authentic" Taiwanese flavors with adapting to tourism demands?
2. **Identity Politics**: Which foods get promoted as "authentically Taiwanese" and whose cultural narratives remain marginalized?
3. **Democratic Heritage**: How can digital tools democratize cultural documentation and amplify community voices?
4. **Postcolonial Context**: How do night markets function as sites of cultural resistance and adaptation?

### Methodology

- **Observational Research**: Direct documentation of vendor-customer interactions and cultural performances
- **Photo Documentation**: Visual evidence of spatial organization and cultural markers
- **Critical Analysis**: Application of food studies theory, postcolonial analysis, and digital heritage scholarship

## 🏮 Case Studies: Four Night Markets

| Market                   | Focus                       | Key Findings                                                        |
| ------------------------ | --------------------------- | ------------------------------------------------------------------- |
| **Shilin Night Market**  | Tourism vs. Authenticity    | Language switching patterns, dual pricing strategies                |
| **Raohe Street Market**  | Hakka Heritage & Visibility | Minority culture preservation, intergenerational knowledge transfer |
| **Huaxi Street Market**  | Working Class Food Culture  | Economic accessibility, community formation                         |
| **Kenting Night Market** | Regional Identity & Tourism | Seasonal impacts, regional vs. tourist-oriented offerings           |

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Next.js SSR routing, Node.js
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Database**: PostgreSQL with Prisma ORM
- **Maps**: Mapbox GL JS
- **Images**: Local files in `/public/images/`
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Mapbox API key

### Installation

```bash
# Clone repository
git clone [repository-url]
cd mapping-flavor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL, Mapbox token, etc.

# Set up database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to explore the research platform.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🗺️ Platform Features

- **Interactive Map**: Explore market locations and research findings geographically
- **Vendor Profiles**: Detailed analysis of individual vendors with theoretical connections
- **Market Analysis**: Comprehensive case studies for each night market
- **Academic Sources**: Annotated bibliography with Chicago author-date citations
- **Responsive Design**: Accessible across all devices
- **Multilingual Support**: Traditional Chinese and English content

## 🤝 Research Ethics

This research was conducted with respect for Taiwanese culture and vendor privacy. All observations were conducted in public spaces with attention to cultural sensitivity and community agency in representation.

## 📄 License

This project is for academic research purposes. Please respect the cultural content and cite appropriately if using for educational purposes.

---

**Researcher**: Jed Geoghegan  
**Institution**: Humanities and Arts Program  
**Research Period**: 2025  
**Methodology**: Observational Research with Critical Cultural Analysis
