import { Neighborhood } from '../types';

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'bel-air',
    name: 'Bel Air & Beverly Hills',
    region: 'Southern California',
    description: 'The global benchmark for secluded grandeur, pedigree architectural compounds, and private security.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    averagePrice: '$18.4M',
    propertyCount: 14,
    coordinates: [34.0837, -118.4487]
  },
  {
    id: 'tribeca',
    name: 'Tribeca & West Village',
    region: 'Manhattan, New York',
    description: 'Historic cobblestone streets, private cast-iron lofts, and rare landscaped penthouses along the Hudson.',
    image: 'https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=1200&q=80',
    averagePrice: '$14.2M',
    propertyCount: 9,
    coordinates: [40.7188, -74.0089]
  },
  {
    id: 'aspen',
    name: 'Aspen & Snowmass',
    region: 'Colorado Rockies',
    description: 'High-altitude architectural pavilions, ski-in retreats, and world-class mountain cultural society.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    averagePrice: '$22.8M',
    propertyCount: 7,
    coordinates: [39.1950, -106.8200]
  },
  {
    id: 'palm-beach',
    name: 'Palm Beach Oceanfront',
    region: 'South Florida',
    description: 'Timeless Bermudian and Mediterranean Revival compounds fringed by direct Atlantic seawalls.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    averagePrice: '$34.5M',
    propertyCount: 6,
    coordinates: [26.7153, -80.0364]
  },
  {
    id: 'paris-triangle',
    name: 'Paris 8th & Rive Gauche',
    region: 'Île-de-France, France',
    description: 'Haussmannian private mansions, gilded reception salons, and rare courtyards near Avenue Montaigne.',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    averagePrice: '€21.0M',
    propertyCount: 8,
    coordinates: [48.8686, 2.3086]
  },
  {
    id: 'mayfair',
    name: 'Mayfair & Belgravia',
    region: 'Prime Central London',
    description: 'Grade-listed Georgian townhouses, private garden squares, and bespoke family offices.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    averagePrice: '£26.5M',
    propertyCount: 11,
    coordinates: [51.5095, -0.1500]
  }
];
