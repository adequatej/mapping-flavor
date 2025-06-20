# Mapping Flavor: Taiwan Night Markets Cultural Research

**A Critical Examination of Taiwanese Cultural Identity Through Night Market Food Culture**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Academic Research](https://img.shields.io/badge/Research-Taiwan%20Studies-red?style=flat-square)](https://example.com)
[![Digital Humanities](https://img.shields.io/badge/Digital-Humanities-purple?style=flat-square)](https://example.com)

## 🎓 **Academic Research Project**

This project investigates how Taiwan's night markets function as sites of cultural identity negotiation, examining the preservation of Taiwanese and Hakka culinary traditions within the broader context of post-colonial Taiwan. Through observational research and critical cultural analysis, this study explores how food vendors navigate authenticity, tourism pressures, and cultural preservation.

## 🔬 **Research Framework**

### **Central Research Questions**

1. **Cultural Authenticity**: How do vendors negotiate between preserving "authentic" Taiwanese flavors and adapting to tourism demands?
2. **Democratic Heritage**: How might digital tools democratize cultural documentation and amplify community voices?
3. **Identity Politics**: Which foods get promoted as "authentically Taiwanese" and whose cultural narratives remain marginalized?
4. **Postcolonial Context**: How do night markets function as sites of cultural resistance and adaptation in post-colonial Taiwan?

### **Methodology**

- **Observational Research**: Direct documentation of vendor-customer interactions, language patterns, and cultural performances
- **Photo Documentation**: Visual evidence of spatial organization, pricing strategies, and cultural markers
- **Critical Analysis**: Application of food studies theory, postcolonial analysis, and digital heritage scholarship

## 🏮 **Case Studies: Four Night Markets**

### **1. Shilin Night Market (士林夜市)**

- **Focus**: Tourism vs. Authenticity
- **Analysis**: How vendors create "attractiveness" for tourists through cultural commodification
- **Key Findings**: Language switching patterns, dual pricing strategies, spatial tourism infrastructure

### **2. Raohe Street Market (饒河街觀光夜市)**

- **Focus**: Hakka Heritage & Visibility
- **Analysis**: Minority culture preservation within mainstream commercial spaces
- **Key Findings**: Hakka cultural markers, intergenerational knowledge transfer, audience-specific marketing

### **3. Huaxi Street Market (華西街夜市)**

- **Focus**: Working Class Food Culture
- **Analysis**: Night markets as democratic cultural spaces transcending economic boundaries
- **Key Findings**: Economic accessibility patterns, traditional preparation methods, community formation

### **4. Kenting Night Market (墾丁夜市)**

- **Focus**: Tourism & Regional Identity
- **Analysis**: How beach resort tourism shapes regional food identity and cultural performance
- **Key Findings**: Seasonal tourism impacts, regional vs. tourist-oriented offerings, beach town adaptations

## 📚 **Theoretical Foundation**

### **Key Scholarly Sources**

- **Chen, Y.-J. (2011)**: Ethnic Politics in the Framing of National Cuisine - Framework for understanding state promotion of certain cuisines over others
- **Srinivasan, R. & Luther, A. (2016)**: Digital Museums and Diverse Cultural Knowledges - Participatory heritage and community-driven narratives
- **Chen, Y.-C. & Huang, H.-L. (2014)**: Tourism Night Markets Supply-Side Analysis - Vendor strategies and cultural commodification
- **Wu, C.-H. & Lin, Y.-H. (2013)**: Night Markets Culture and Tourism Experience - Democratic cultural spaces and social interactions

### **Disciplinary Integration**

- **Food Studies**: Cultural identity through culinary practices and food politics
- **Taiwan Studies**: Post-colonial context and cultural preservation strategies
- **Digital Heritage**: Community-centered approaches to cultural documentation
- **Tourism Studies**: Cultural commodification and authenticity performance

## 🗺️ **Digital Research Platform**

This research is presented through a modern digital humanities platform that includes:

- **Interactive Map**: Explore market locations and research findings geographically
- **Case Study Documentation**: Detailed analysis of each market with photo evidence
- **Annotated Bibliography**: Comprehensive academic sources with relevance explanations
- **Research Methodology**: Transparent documentation of observational approaches

### **Platform Features**

- Responsive design accessible across devices
- Academic citation standards throughout
- Cultural sensitivity in visual representation
- Multilingual content considerations (Traditional Chinese/English)

## 🌏 **Cultural and Academic Significance**

### **Contributions to Taiwan Studies**

- Examines night markets as contested cultural spaces rather than simple tourist destinations
- Analyzes how minority cultures (Hakka) navigate visibility within dominant narratives
- Documents intergenerational cultural transmission through family recipes and cooking methods

### **Digital Humanities Innovation**

- Demonstrates how digital tools can amplify community voices in heritage preservation
- Challenges traditional top-down museum cataloging approaches
- Explores participatory heritage models in Taiwanese cultural contexts

### **Methodological Contributions**

- Combines ethnographic observation with digital presentation
- Integrates critical theory with accessible public scholarship
- Models respectful cross-cultural research practices

## 🛠️ **Technical Implementation**

The research platform is built using:

- **Next.js 15**: Modern React framework for optimal performance
- **TypeScript**: Type-safe development for academic precision
- **Tailwind CSS**: Taiwan-inspired design with cultural color palette
- **Responsive Design**: Accessible across devices for diverse audiences

## 🎯 **Project Goals**

1. **Academic Rigor**: Contribute meaningful research to Taiwan studies and food studies scholarship
2. **Cultural Respect**: Present Taiwanese culture with nuance and community agency
3. **Digital Innovation**: Demonstrate how technology can enhance rather than replace traditional scholarship
4. **Public Engagement**: Make academic research accessible to broader audiences

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18+
- npm or yarn

### **Installation**

```bash
# Clone repository
git clone [repository-url]
cd mapping-flavor

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to explore the research platform.

## 📖 **Academic Context**

This project was developed as a capstone research project for the Humanities and Arts program, combining:

- Independent field research in Taiwan
- Critical engagement with academic scholarship
- Digital humanities methodology
- Cross-cultural research ethics

## 🤝 **Research Ethics & Acknowledgments**

This research was conducted with respect for Taiwanese culture and vendor privacy. All observations were conducted in public spaces with attention to cultural sensitivity and community agency in representation.

---

**Researcher**: Jed Geoghegan  
**Institution**: Humanities and Arts Program  
**Research Period**: 2025
**Methodology**: Observational Research with Critical Cultural Analysis

_This project demonstrates how digital humanities approaches can enhance traditional scholarship while maintaining academic rigor and cultural sensitivity._

Redux vs. React Local State

- Project is a mapping application with:
  Multiple interconnected features (markets, vendors, research)
  Complex state interactions
  Need for state persistence
  Multiple components sharing state
  Future scalability needs

  So..
  Redux would be better because:
  State is complex (markets, vendors, UI state, filters)
  Need to share state between many components
  Might need to implement features like:
  Saving/loading state
  Undo/redo for map interactions
  Complex filtering and sorting
  State persistence between page refreshes

React

- Using functional components and hooks (not class components)
