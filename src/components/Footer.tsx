import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowRight, Mail, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivateRegister: () => void;
  onOpenScheduleTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivateRegister,
  onOpenScheduleTour
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#161513] text-[#FAF8F5] border-t border-[#2C2926] pt-16 pb-12 select-none" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Manifesto Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#2C2926] items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              Private Circulation
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-snug">
              The Touch of Valentine Private Gazette
            </h3>
            <p className="text-xs sm:text-sm text-[#AFA89E] font-sans mt-2 max-w-md leading-relaxed">
              Curated bi-weekly architectural commentary, off-market transaction intelligence, and invitations to private salon viewings.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!subscribed ? (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your confidential email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#24211D] border border-[#3A352F] px-4 py-3 text-xs text-white placeholder-[#857E74] focus:outline-hidden focus:border-[#C5A880]"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-[#B39366] text-[#161513] px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer shrink-0"
                  id="newsletter-submit-btn"
                >
                  Join Register
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#24211D] border border-[#C5A880]/50 text-xs text-[#EAE5DC] flex items-center gap-2">
                <span className="text-[#C5A880]">✓</span>
                <span>You are registered for Touch of Valentine private dispatches.</span>
              </div>
            )}
            <span className="text-[10px] text-[#706A60] mt-2 block">
              We respect your inbox. Strict non-disclosure; unsubscribe with one click.
            </span>
          </div>
        </div>

        {/* Middle Multi-column Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-[#2C2926]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-xs text-[#9E9689] font-sans leading-relaxed pt-2 max-w-sm">
              Touch of Valentine Homes (TOV) is an international luxury real estate brokerage and bespoke architectural advisory firm representing pedigree estates and discerning clientele worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-7 h-7 border border-[#3A352F] flex items-center justify-center text-[10px] font-editorial text-[#C5A880]">
                TOV
              </div>
              <span className="text-[11px] text-[#AFA89E] tracking-wider uppercase font-medium">
                Licensed Real Estate Brokerage
              </span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 space-y-3 text-xs font-sans">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-3">
              Portfolio
            </span>
            <ul className="space-y-2 text-[#C5BEB3]">
              <li>
                <button onClick={() => onNavigate('listings')} className="hover:text-white transition-colors cursor-pointer">
                  Architectural Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('listings')} className="hover:text-white transition-colors cursor-pointer">
                  Penthouse Suites
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('listings')} className="hover:text-white transition-colors cursor-pointer">
                  Waterfront Estates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('listings')} className="hover:text-white transition-colors cursor-pointer">
                  Historic Townhouses
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivateRegister} className="text-[#C5A880] hover:underline transition-colors cursor-pointer">
                  Exclusive Off-Market
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3 text-xs font-sans">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-3">
              Destinations
            </span>
            <ul className="space-y-2 text-[#C5BEB3]">
              <li>
                <button onClick={() => onNavigate('neighborhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Bel Air & Beverly Hills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighborhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Tribeca, Manhattan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighborhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Aspen Snowmass
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighborhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Palm Beach Oceanfront
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighborhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Paris 8th & London Mayfair
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3 text-xs font-sans">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-3">
              Advisory
            </span>
            <ul className="space-y-2 text-[#C5BEB3]">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Private Treaty Acquisitions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Architectural Advisory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('valuation')} className="hover:text-white transition-colors cursor-pointer">
                  Instant Asset Valuation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white transition-colors cursor-pointer">
                  Client Endorsements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Concierge Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Desks */}
          <div className="lg:col-span-2 space-y-3 text-xs font-sans">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block mb-3">
              Direct Desks
            </span>
            <div className="space-y-2 text-[#AFA89E] text-[11px]">
              <div>
                <strong className="text-white block font-medium">Beverly Hills Desk</strong>
                <span>+1 (310) 555-0198</span>
              </div>
              <div>
                <strong className="text-white block font-medium">Manhattan Desk</strong>
                <span>+1 (212) 555-0144</span>
              </div>
              <div>
                <strong className="text-white block font-medium">London Mayfair</strong>
                <span>+44 20 7946 0912</span>
              </div>
              <div>
                <strong className="text-white block font-medium">Paris 8th</strong>
                <span>+33 1 42 68 55 00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Equal Housing & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-[#706A60] font-sans">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Touch of Valentine Homes LLC (TOV). All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>Equal Housing Opportunity</span>
            <span className="hidden md:inline">•</span>
            <span>Licensed Real Estate Brokerage California DRE #02194821 • NY DOS #10491209</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="#hero" className="hover:text-[#C5A880] transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-[#C5A880] transition-colors">Terms of Representation</a>
            <a href="#hero" className="hover:text-[#C5A880] transition-colors">Brokerage Disclosures</a>
            <a href="#hero" className="hover:text-[#C5A880] transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
