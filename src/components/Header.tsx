import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Heart, Menu, X, Phone, Compass, Inbox, Calendar, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenScheduleTour: () => void;
  onOpenPrivateRegister: () => void;
  onOpenLeadInbox: () => void;
  leadsCount: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenScheduleTour,
  onOpenPrivateRegister,
  onOpenLeadInbox,
  leadsCount,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'listings', label: 'Properties' },
    { id: 'map-view', label: 'Interactive Map' },
    { id: 'neighborhoods', label: 'Destinations' },
    { id: 'services', label: 'Bespoke Advisory' },
    { id: 'valuation', label: 'Valuation' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none"
    >
      {/* Top Utility Ribbon */}
      <div className="hidden lg:block bg-[#161513] text-[#FAF8F5] text-[11px] font-sans border-b border-[#2C2926] py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-[#B0A99E]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
              Private Treaty & Off-Market Portfolio Open
            </span>
            <span className="text-[#555047]">•</span>
            <span>Global Desks: Beverly Hills • Manhattan • Mayfair • Paris 8th</span>
          </div>

          <div className="flex items-center gap-5 text-[#C5BEB3]">
            <button
              onClick={onOpenPrivateRegister}
              className="hover:text-[#C5A880] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              VIP Off-Market Register
              <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
            </button>
            <span className="text-[#555047]">•</span>
            <a
              href="tel:+13105550198"
              className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              Concierge: +1 (310) 555-0198
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-[#E5DFD5] py-3.5'
            : 'bg-[#FAF8F5]/90 backdrop-blur-xs border-transparent py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div onClick={() => handleLinkClick('hero')} role="button" tabIndex={0}>
            <Logo variant="dark" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-7">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-[13px] tracking-[0.08em] uppercase transition-colors py-1 cursor-pointer font-medium relative ${
                    isActive
                      ? 'text-[#161513] font-semibold'
                      : 'text-[#655F55] hover:text-[#161513]'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#161513]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Concierge Leads Inbox Button (demonstrates real-time lead capture) */}
            <button
              onClick={onOpenLeadInbox}
              className="relative p-2.5 text-[#4E473D] hover:text-[#161513] hover:bg-[#EFEBE3] transition-colors border border-[#E2DDD3] rounded-none cursor-pointer"
              title="Concierge Lead Inquiries"
              aria-label="View captured leads"
              id="lead-inbox-btn"
            >
              <Inbox className="w-4.5 h-4.5" />
              {leadsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-[#161513] text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#FAF8F5]">
                  {leadsCount}
                </span>
              )}
            </button>

            {/* Saved Properties Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 text-[#4E473D] hover:text-[#161513] hover:bg-[#EFEBE3] transition-colors border border-[#E2DDD3] rounded-none cursor-pointer"
              title="Saved Properties"
              aria-label="View saved favorites"
              id="favorites-btn"
            >
              <Heart
                className={`w-4.5 h-4.5 ${
                  favoriteCount > 0 ? 'fill-[#C5A880] text-[#C5A880]' : ''
                }`}
              />
              {favoriteCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#161513] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#FAF8F5]">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Schedule Tour CTA (Desktop) */}
            <button
              onClick={onOpenScheduleTour}
              className="hidden md:inline-flex items-center gap-2 bg-[#161513] hover:bg-[#2C2926] text-[#FAF8F5] text-xs uppercase tracking-[0.15em] font-medium py-2.5 px-4.5 transition-all duration-200 border border-[#161513] shadow-xs cursor-pointer"
              id="header-schedule-tour-btn"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              Schedule Private Tour
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#161513] hover:bg-[#EFEBE3] border border-[#E2DDD3] transition-colors"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E5DFD5] px-6 py-6 shadow-xl animate-in slide-in-from-top-3">
          <div className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="text-left py-2 text-base font-editorial text-[#161513] tracking-wider border-b border-[#EAE5DC]/60 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C8477]" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScheduleTour();
                }}
                className="w-full bg-[#161513] text-[#FAF8F5] py-3 text-xs uppercase tracking-widest font-medium text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                Schedule Private Tour
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrivateRegister();
                }}
                className="w-full bg-white border border-[#161513] text-[#161513] py-3 text-xs uppercase tracking-widest font-medium text-center"
              >
                VIP Off-Market Register
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
