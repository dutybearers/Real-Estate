/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PROPERTIES } from './data/properties';
import { Property, FilterState, LeadSubmission } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { InteractiveMap } from './components/InteractiveMap';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { NeighborhoodsSection } from './components/NeighborhoodsSection';
import { ValuationCalculator } from './components/ValuationCalculator';
import { AdvisoryServices } from './components/AdvisoryServices';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { PrivateRegisterModal } from './components/PrivateRegisterModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { LeadInboxModal } from './components/LeadInboxModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Sparkles, ArrowRight, SlidersHorizontal, Map, Compass } from 'lucide-react';

export default function App() {
  // Properties State
  const [properties] = useState<Property[]>(PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    propertyType: 'all',
    location: 'all',
    minPrice: 0,
    maxPrice: 65000000,
    beds: 'any',
    status: 'all',
    sortBy: 'featured'
  });

  // View Mode: 'grid' | 'split' | 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'split' | 'map'>('grid');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Favorites (persisted in localStorage)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tov_favorites');
      return saved ? JSON.parse(saved) : ['tov-01', 'tov-02'];
    } catch {
      return ['tov-01', 'tov-02'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tov_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const isFav = prev.includes(id);
      const updated = isFav ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(
        'info',
        isFav ? 'Removed from Wishlist' : 'Saved to Wishlist',
        isFav ? 'Residence removed from your private saved collection.' : 'Residence bookmarked to your private saved collection.'
      );
      return updated;
    });
  };

  const favoriteProperties = useMemo(() => {
    return properties.filter((p) => favoriteIds.includes(p.id));
  }, [properties, favoriteIds]);

  // Lead Generation Capture System (persisted in localStorage)
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('tov_leads');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed realistic initial leads
    return [
      {
        id: 'LEAD-901',
        type: 'tour',
        createdAt: 'Just now',
        name: 'Lord Arthur Abernathy',
        email: 'abernathy@familyoffice.uk',
        phone: '+44 20 7946 0988',
        preferredDate: 'Upcoming Weekend',
        preferredTime: 'Sunset Viewing (5:00 PM - 7:00 PM)',
        propertyId: 'tov-01',
        propertyTitle: 'The Bel Air Horizon Sanctuary',
        message: '[Buyer Category: Cash Buyer / Private Principal] Accompanied inspection with private security detail.',
        status: 'New'
      },
      {
        id: 'LEAD-902',
        type: 'valuation',
        createdAt: '2 hours ago',
        name: 'Elena Rostova',
        email: 'elena@rostovaventures.com',
        phone: '+1 (310) 555-0914',
        propertyDetails: {
          address: 'North Carolwood Drive, Holmby Hills',
          propertyType: 'Architectural Villa',
          sqft: 12500,
          estimatedValue: 34500000
        },
        timeframe: 'Planning Stage (3-6 Months)',
        message: 'Annual portfolio valuation and discretionary off-market sale feasibility analysis.',
        status: 'Contacted'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tov_leads', JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modal Visibility States
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isScheduleTourOpen, setIsScheduleTourOpen] = useState(false);
  const [tourModalProperty, setTourModalProperty] = useState<Property | null>(null);
  const [isPrivateRegisterOpen, setIsPrivateRegisterOpen] = useState(false);
  const [isLeadInboxOpen, setIsLeadInboxOpen] = useState(false);

  // Filter Update Helper
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      propertyType: 'all',
      location: 'all',
      minPrice: 0,
      maxPrice: 65000000,
      beds: 'any',
      status: 'all',
      sortBy: 'featured'
    });
  };

  // Filtered and Sorted Properties Calculation
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Keyword search
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSub = p.subtitle.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        const matchesArch = p.architect?.toLowerCase().includes(query);
        const matchesType = p.propertyType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSub && !matchesLoc && !matchesArch && !matchesType) {
          return false;
        }
      }

      // Property type
      if (filterState.propertyType !== 'all' && p.propertyType !== filterState.propertyType) {
        return false;
      }

      // Location match
      if (filterState.location !== 'all') {
        const locLower = filterState.location.toLowerCase();
        const pLoc = `${p.location} ${p.neighborhood} ${p.city} ${p.stateOrCountry}`.toLowerCase();
        if (!pLoc.includes(locLower)) {
          return false;
        }
      }

      // Price range
      if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filterState.beds !== 'any') {
        if (p.beds < filterState.beds) {
          return false;
        }
      }

      // Status
      if (filterState.status !== 'all' && p.status !== filterState.status) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'sqft-desc') return b.sqft - a.sqft;
      // Default: featured first, then price desc
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.price - a.price;
    });
  }, [properties, filterState]);

  // Lead capture handlers
  const recordLead = (newLead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const fullLead: LeadSubmission = {
      ...newLead,
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'New'
    };
    setLeads((prev) => [fullLead, ...prev]);
    return fullLead;
  };

  const handleCaptureContact = (data: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const created = recordLead(data);
    addToast(
      'success',
      'Inquiry Transmitted to Private Desk',
      `Thank you, ${created.name}. Your confidential request is registered under #${created.id}. Our concierge will respond shortly.`
    );
  };

  const handleCaptureTour = (data: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const created = recordLead(data);
    addToast(
      'success',
      'Accompanied Inspection Requested',
      `Private viewing confirmed for ${created.propertyTitle || 'residence'}. Reference #${created.id}. An advisor will reach out to verify clearance.`
    );
    setIsScheduleTourOpen(false);
  };

  const handleCaptureValuation = (data: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const created = recordLead(data);
    addToast(
      'success',
      'Valuation Dossier Scheduled',
      `Full 24-page market intelligence report requested for ${created.propertyDetails?.address || 'your address'}. Saved under #${created.id}.`
    );
  };

  const handleCaptureRegister = (data: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const created = recordLead(data);
    addToast(
      'success',
      'Off-Market Registry Request Confirmed',
      `Your credentials have been submitted for discretionary private treaty access under #${created.id}.`
    );
    setIsPrivateRegisterOpen(false);
  };

  const handleUpdateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    addToast('info', 'Lead Status Updated', `Lead #${id} status changed to ${status}.`);
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    addToast('info', 'Record Removed', `Lead record #${id} removed from concierge database.`);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNeighborhoodSelect = (name: string) => {
    if (name.includes('Bel Air')) {
      handleFilterChange({ location: 'Bel Air' });
    } else if (name.includes('Tribeca')) {
      handleFilterChange({ location: 'Tribeca' });
    } else if (name.includes('Aspen')) {
      handleFilterChange({ location: 'Aspen' });
    } else if (name.includes('Palm Beach')) {
      handleFilterChange({ location: 'Palm Beach' });
    } else if (name.includes('Paris')) {
      handleFilterChange({ location: 'Paris' });
    } else if (name.includes('Mayfair')) {
      handleFilterChange({ location: 'Mayfair' });
    }
    scrollToSection('listings');
  };

  const handleOpenTourForProperty = (prop: Property) => {
    setTourModalProperty(prop);
    setIsScheduleTourOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#161513]">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main Refined Header */}
      <Header
        favoriteCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenScheduleTour={() => {
          setTourModalProperty(null);
          setIsScheduleTourOpen(true);
        }}
        onOpenPrivateRegister={() => setIsPrivateRegisterOpen(true)}
        onOpenLeadInbox={() => setIsLeadInboxOpen(true)}
        leadsCount={leads.length}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section with Quick Search Bar */}
        <Hero
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => scrollToSection('listings')}
          onOpenPrivateRegister={() => setIsPrivateRegisterOpen(true)}
        />

        {/* Listings Section Anchor */}
        <section id="listings" className="scroll-mt-28">
          {/* Sticky Granular Filter Bar */}
          <FilterBar
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={filteredProperties.length}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            
            {/* View Mode 1: Curated Card Grid */}
            {viewMode === 'grid' && (
              <div>
                {filteredProperties.length === 0 ? (
                  <div className="bg-white border border-[#E5DFD5] p-16 text-center">
                    <h3 className="font-editorial text-2xl text-[#161513] mb-2">
                      No Residences Match Current Parameters
                    </h3>
                    <p className="text-xs text-[#7B746B] max-w-md mx-auto mb-6">
                      Try broadening your search criteria or reset filters to view our full collection of architectural properties.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="bg-[#161513] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favoriteIds.includes(property.id)}
                        onToggleFavorite={toggleFavorite}
                        onSelectProperty={setSelectedProperty}
                        onScheduleTour={handleOpenTourForProperty}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View Mode 2: Split Screen Map + Side List */}
            {viewMode === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Interactive Map */}
                <div className="lg:col-span-6 sticky top-36">
                  <div className="border border-[#E5DFD5] bg-white p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#161513] flex items-center gap-1.5">
                        <Map className="w-3.5 h-3.5 text-[#C5A880]" />
                        Interactive Map Explorer
                      </span>
                      <span className="text-[11px] text-[#8C8477]">
                        Click any price pin to focus
                      </span>
                    </div>
                  </div>
                  <InteractiveMap
                    properties={filteredProperties}
                    selectedProperty={selectedProperty}
                    onSelectProperty={setSelectedProperty}
                    onScheduleTour={handleOpenTourForProperty}
                    heightClass="h-[600px]"
                  />
                </div>

                {/* Right Scrollable Residences List */}
                <div className="lg:col-span-6 space-y-6">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => setSelectedProperty(property)}
                      className={`bg-white border p-4 flex flex-col sm:flex-row gap-4 transition-all duration-200 cursor-pointer ${
                        selectedProperty?.id === property.id
                          ? 'border-[#161513] shadow-md ring-1 ring-[#161513]'
                          : 'border-[#EAE5DC] hover:border-[#C5A880]'
                      }`}
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full sm:w-44 h-36 object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8C8477] font-semibold">
                            <span>{property.location}</span>
                            <span>{property.status}</span>
                          </div>
                          <h4 className="font-editorial text-xl font-medium text-[#161513] truncate mt-1">
                            {property.title}
                          </h4>
                          <p className="font-editorial text-2xl font-semibold text-[#161513] mt-0.5">
                            {property.priceFormatted}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#555] mt-2">
                            <span>{property.beds} Beds</span>
                            <span>•</span>
                            <span>{property.baths} Baths</span>
                            <span>•</span>
                            <span>{property.sqft.toLocaleString()} sq ft</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#EAE5DC] flex items-center justify-between mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenTourForProperty(property);
                            }}
                            className="text-[10px] uppercase tracking-wider font-semibold text-[#161513] hover:text-[#C5A880] cursor-pointer"
                          >
                            Book Accompanied Tour →
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(property.id);
                            }}
                            className="text-xs text-[#8C8477] hover:text-[#C5A880] cursor-pointer"
                          >
                            {favoriteIds.includes(property.id) ? 'Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Mode 3: Dedicated Full Interactive Map */}
            {viewMode === 'map' && (
              <div className="space-y-6" id="map-view">
                <div className="bg-white border border-[#E5DFD5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#161513] font-medium">
                      Global Map Exploration
                    </h3>
                    <p className="text-xs text-[#7B746B] font-sans">
                      Displaying {filteredProperties.length} active residences across Beverly Hills, Manhattan, Aspen, Palm Beach, and Europe.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setViewMode('grid')}
                      className="bg-[#161513] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 cursor-pointer"
                    >
                      Return to Grid View
                    </button>
                  </div>
                </div>

                <InteractiveMap
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={setSelectedProperty}
                  onScheduleTour={handleOpenTourForProperty}
                  heightClass="h-[650px]"
                />
              </div>
            )}

          </div>
        </section>

        {/* Neighborhoods & Prime Destinations Section */}
        <NeighborhoodsSection onSelectNeighborhood={handleNeighborhoodSelect} />

        {/* Interactive Asset Valuation Lead Capture Tool */}
        <ValuationCalculator onCaptureValuationLead={handleCaptureValuation} />

        {/* Advisory Services (Maison Fav Bespoke Pillars) */}
        <AdvisoryServices
          onOpenContact={() => scrollToSection('contact')}
          onOpenPrivateRegister={() => setIsPrivateRegisterOpen(true)}
        />

        {/* Client Testimonials & Discretion */}
        <TestimonialsSection />

        {/* Comprehensive Contact & Global Desks */}
        <ContactSection onCaptureContactLead={handleCaptureContact} />
      </main>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favoriteIds.includes(selectedProperty.id) : false}
        onToggleFavorite={toggleFavorite}
        onBookTourSubmit={(tourData) => {
          handleCaptureTour({
            type: 'tour',
            name: tourData.name,
            email: tourData.email,
            phone: tourData.phone,
            propertyId: selectedProperty?.id,
            propertyTitle: selectedProperty?.title,
            preferredDate: tourData.preferredDate,
            preferredTime: tourData.preferredTime,
            message: `[Buyer Status: ${tourData.buyerStatus}] Notes: ${tourData.notes}`
          });
          setSelectedProperty(null);
        }}
      />

      {/* Schedule Tour Modal (Global) */}
      <ScheduleTourModal
        isOpen={isScheduleTourOpen}
        onClose={() => setIsScheduleTourOpen(false)}
        properties={properties}
        selectedProperty={tourModalProperty}
        onCaptureTourLead={handleCaptureTour}
      />

      {/* VIP Off-Market Register Modal */}
      <PrivateRegisterModal
        isOpen={isPrivateRegisterOpen}
        onClose={() => setIsPrivateRegisterOpen(false)}
        onCaptureRegisterLead={handleCaptureRegister}
      />

      {/* Saved Wishlist Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        onRemoveFavorite={toggleFavorite}
        onSelectProperty={setSelectedProperty}
        onScheduleTour={handleOpenTourForProperty}
      />

      {/* Real-Time Lead Generation Capture System Inbox */}
      <LeadInboxModal
        isOpen={isLeadInboxOpen}
        onClose={() => setIsLeadInboxOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
      />

      {/* Editorial Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPrivateRegister={() => setIsPrivateRegisterOpen(true)}
        onOpenScheduleTour={() => setIsScheduleTourOpen(true)}
      />
    </div>
  );
}
