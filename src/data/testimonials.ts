import { Testimonial, Service } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    quote: 'Touch of Valentine Homes navigated our off-market acquisition in Bel Air with absolute discretion. In an industry of noise, TOV represents refined precision, architectural understanding, and rare integrity.',
    clientName: 'Julian & Elena Vance',
    clientTitle: 'Founders, Vance Capital Management',
    location: 'Bel Air, California',
    transaction: 'Acquired $38.5M Architectural Horizon Villa',
    year: '2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80'
  },
  {
    id: 'test-02',
    quote: 'When selling our historic Tribeca loft, we demanded a buyer who honored its original cast-iron soul. TOV secured a private treaty contract in 18 days at 102% of asking value without ever having a public sign.',
    clientName: 'Marcus Sterling',
    clientTitle: 'Architectural Historian & Tech Principal',
    location: 'Tribeca, New York',
    transaction: 'Represented Seller, $24.7M Penthouse',
    year: '2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80'
  },
  {
    id: 'test-03',
    quote: 'Their cross-continental team facilitated our family office relocation between Mayfair and Palm Beach seamlessly. Their legal and architectural diligence is simply unmatched.',
    clientName: 'Lady Beatrice Montgomery',
    clientTitle: 'Private Collector & Philanthropist',
    location: 'London & Palm Beach',
    transaction: 'Dual Acquisition, £36M Mayfair & $52M Oceanfront',
    year: '2025',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Private Treaty & Confidential Acquisitions',
    tagline: 'Access to unlisted legacy estates',
    description: 'Over 60% of prime trophy assets transact off-market. TOV provides confidential, fiduciary buyer representation with strict NDA protocols.',
    deliverables: ['Global off-market catalog', 'Architectural structural audits', 'Discreet negotiation', 'Anonymous title structuring'],
    icon: 'Shield'
  },
  {
    id: 'srv-2',
    title: 'Bespoke Architectural Advisory',
    tagline: 'Preserving and elevating design integrity',
    description: 'We collaborate with world-renowned architects, interior decorators, and landscape masters to evaluate development potential and preservation value.',
    deliverables: ['Zoning & build envelope analysis', 'Master interior consultation', 'Heritage commission navigation', 'Contractor vetting'],
    icon: 'Compass'
  },
  {
    id: 'srv-3',
    title: 'Global High-Net-Worth Relocation',
    tagline: 'Seamless multi-jurisdictional transfers',
    description: 'From cross-border tax considerations to international art transportation and estate staffing, our concierge team orchestrates turnkey transitions.',
    deliverables: ['Multi-currency escrow guidance', 'Family office liaison', 'White-glove moving & fine art curation', 'Private school admissions placement'],
    icon: 'Globe'
  },
  {
    id: 'srv-4',
    title: 'Precision Asset Valuation & Intelligence',
    tagline: 'Data-calibrated private wealth appraisals',
    description: 'Bespoke comparative valuation incorporating micro-neighborhood comps, architectural pedigree multipliers, and replacement cost modeling.',
    deliverables: ['24-page comprehensive prospectus', 'Dynamic yield & appreciation modeling', 'Market sentiment analytics', 'Executive summary presentation'],
    icon: 'TrendingUp'
  }
];
