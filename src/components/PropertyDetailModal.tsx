import React, { useState } from 'react';
import { Property } from '../types';
import { 
  X, 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Calculator, 
  Phone, 
  Mail, 
  Check, 
  Compass, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBookTourSubmit: (tourData: {
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    buyerStatus: string;
    notes: string;
  }) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onBookTourSubmit
}) => {
  if (!property) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'financials'>('overview');
  const [copied, setCopied] = useState(false);

  // Mortgage Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.2);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Tour Booking Form State
  const [tourForm, setTourForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 12:00 PM)',
    buyerStatus: 'Pre-Approved / Private Client',
    notes: ''
  });
  const [isSubmittingTour, setIsSubmittingTour] = useState(false);

  // Calculate monthly mortgage estimate
  const loanAmount = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  const monthlyPrincipalAndInterest =
    loanAmount > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : 0;
  const estimatedMonthlyTaxes = (property.propertyTaxAnnual || property.price * 0.012) / 12;
  const estimatedHoa = property.hoaMonthly || 0;
  const totalMonthlyCarrying = monthlyPrincipalAndInterest + estimatedMonthlyTaxes + estimatedHoa;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTour(true);
    setTimeout(() => {
      onBookTourSubmit({
        name: tourForm.name,
        email: tourForm.email,
        phone: tourForm.phone,
        preferredDate: tourForm.preferredDate || 'Earliest Available',
        preferredTime: tourForm.preferredTime,
        buyerStatus: tourForm.buyerStatus,
        notes: tourForm.notes
      });
      setIsSubmittingTour(false);
      setTourForm({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: 'Morning (10:00 AM - 12:00 PM)',
        buyerStatus: 'Pre-Approved / Private Client',
        notes: ''
      });
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#161513]/85 backdrop-blur-md overflow-y-auto animate-in fade-in"
      id="property-detail-modal"
    >
      <div className="relative w-full max-w-5xl bg-white border border-[#E5DFD5] shadow-2xl my-auto overflow-hidden">
        {/* Modal Top Header Bar */}
        <div className="bg-[#FAF8F5] border-b border-[#EAE5DC] px-5 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#161513] text-[#FAF8F5]">
              {property.status}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#8C8477] font-medium hidden sm:inline">
              Ref: {property.id.toUpperCase()} • Touch of Valentine Register
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#555] hover:text-[#161513] hover:bg-[#EFEBE3] border border-[#E2DDD3] transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 text-[#555] hover:text-[#161513] hover:bg-[#EFEBE3] border border-[#E2DDD3] transition-colors cursor-pointer"
              title="Save to favorites"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#C5A880] text-[#C5A880]' : ''
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#161513] hover:bg-[#EFEBE3] border border-[#E2DDD3] transition-colors cursor-pointer"
              aria-label="Close modal"
              id="close-property-detail"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto p-5 sm:p-8">
          
          {/* Main Photo Showcase */}
          <div className="mb-8">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#161513] overflow-hidden">
              <img
                src={property.images[activeImageIdx]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIdx((prev) => (prev + 1) % property.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 text-white text-xs font-sans tracking-widest">
                {activeImageIdx + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-2">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`aspect-[16/10] overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIdx === i ? 'border-[#161513] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Price Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#EAE5DC]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C8477] mb-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{property.location}</span>
                {property.architect && <span>• Architecture by {property.architect}</span>}
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161513]">
                {property.title}
              </h2>
              <p className="text-sm sm:text-base text-[#655F55] font-light mt-1 max-w-2xl font-sans">
                {property.subtitle}
              </p>
            </div>

            <div className="flex flex-col lg:items-end">
              <span className="text-[11px] uppercase tracking-widest text-[#8C8477] font-medium">
                Offered At
              </span>
              <span className="font-editorial text-3xl sm:text-4xl font-medium text-[#161513]">
                {property.priceFormatted}
              </span>
              <span className="text-xs text-[#7B746B] mt-0.5">
                Est. ${(Math.round(totalMonthlyCarrying)).toLocaleString()} / month carrying
              </span>
            </div>
          </div>

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 py-6 border-b border-[#EAE5DC] text-center">
            <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C8477] block">Bedrooms</span>
              <span className="font-editorial text-2xl font-medium text-[#161513]">{property.beds} Suites</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C8477] block">Bathrooms</span>
              <span className="font-editorial text-2xl font-medium text-[#161513]">{property.baths} Baths</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C8477] block">Living Space</span>
              <span className="font-editorial text-2xl font-medium text-[#161513]">{property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C8477] block">Lot / Grounds</span>
              <span className="font-editorial text-2xl font-medium text-[#161513]">{property.lotSize || 'Private Parcel'}</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C8477] block">Year Built</span>
              <span className="font-editorial text-2xl font-medium text-[#161513]">{property.yearBuilt}</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
              <span className="text-[10px] uppercase tracking-widest text-[#8C8477] block">Architecture</span>
              <span className="font-editorial text-lg font-medium text-[#161513] truncate block" title={property.propertyType}>
                {property.propertyType}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-6 border-b border-[#EAE5DC] my-6">
            {[
              { id: 'overview', label: 'Architectural Narrative' },
              { id: 'amenities', label: 'Curated Amenities & Specs' },
              { id: 'financials', label: 'Investment & Carrying Costs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-xs uppercase tracking-widest font-semibold transition-colors relative cursor-pointer ${
                  activeTab === tab.id ? 'text-[#161513]' : 'text-[#8C8477] hover:text-[#161513]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#161513]" />
                )}
              </button>
            ))}
          </div>

          {/* Two-Column Body: Content Left, Tour Booking Form Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#161513] mb-3">
                      The Residence
                    </h3>
                    <p className="text-sm text-[#4E483E] leading-relaxed font-sans">
                      {property.description}
                    </p>
                  </div>

                  {/* Curator's Note */}
                  <div className="bg-[#F8F5EE] border-l-2 border-[#C5A880] p-4 text-xs leading-relaxed text-[#5C5549]">
                    <span className="font-semibold text-[#161513] uppercase tracking-wider block mb-1">
                      Touch of Valentine Advisory Perspective
                    </span>
                    {property.curatorNote}
                  </div>

                  {/* Key Features List */}
                  <div>
                    <h4 className="font-editorial text-lg text-[#161513] mb-3">
                      Design Highlights & Finishes
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                      {property.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-[#EAE5DC]">
                          <span className="text-[#8C8477] uppercase tracking-wider text-[10px]">{feat.label}</span>
                          <span className="font-medium text-[#161513]">{feat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h3 className="font-editorial text-2xl text-[#161513] mb-4">
                    Exclusive Property Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
                        <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#2A2723] font-medium leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#161513] mb-2">
                      Carrying Cost & Mortgage Estimator
                    </h3>
                    <p className="text-xs text-[#6A6357]">
                      Estimated based on current jumbo and private bank private treaty lending parameters.
                    </p>
                  </div>

                  {/* Calculator Controls */}
                  <div className="space-y-4 bg-[#FAF8F5] p-4 border border-[#EAE5DC]">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#8C8477] uppercase tracking-wider">Down Payment ({downPaymentPercent}%)</span>
                        <span className="font-medium text-[#161513]">${((property.price * downPaymentPercent) / 100).toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full accent-[#161513]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-1">Interest Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full p-2 bg-white border border-[#E2DDD3] text-xs font-medium text-[#161513]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-1">Loan Term</label>
                        <select
                          value={loanTermYears}
                          onChange={(e) => setLoanTermYears(Number(e.target.value))}
                          className="w-full p-2 bg-white border border-[#E2DDD3] text-xs font-medium text-[#161513]"
                        >
                          <option value={30}>30 Years Fixed</option>
                          <option value={15}>15 Years Fixed</option>
                          <option value={10}>10/1 ARM Jumbo</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EAE5DC] flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#161513]">Estimated Total Monthly:</span>
                      <span className="font-editorial text-2xl text-[#161513] font-medium">
                        ${Math.round(totalMonthlyCarrying).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Lead Generation Capture Form (Schedule Private Viewing) */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-6 border border-[#E5DFD5]">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#161513]">
                  Schedule Private Tour
                </span>
              </div>
              <p className="text-xs text-[#6A6357] leading-relaxed mb-4 font-sans">
                Confidential accompanied inspection with Touch of Valentine principal partner.
              </p>

              <form onSubmit={handleTourSubmit} className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne Montgomery"
                    value={tourForm.name}
                    onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@familyoffice.com"
                      value={tourForm.email}
                      onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (310) 555-0198"
                      value={tourForm.phone}
                      onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={tourForm.preferredDate}
                      onChange={(e) => setTourForm({ ...tourForm, preferredDate: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Time of Day
                    </label>
                    <select
                      value={tourForm.preferredTime}
                      onChange={(e) => setTourForm({ ...tourForm, preferredTime: e.target.value })}
                      className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    >
                      <option>Morning (10:00 AM - 12:00 PM)</option>
                      <option>Afternoon (1:00 PM - 3:00 PM)</option>
                      <option>Sunset Viewing (5:00 PM - 7:00 PM)</option>
                      <option>Live High-Res Virtual Walkthrough</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Buyer Category
                  </label>
                  <select
                    value={tourForm.buyerStatus}
                    onChange={(e) => setTourForm({ ...tourForm, buyerStatus: e.target.value })}
                    className="w-full p-2 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  >
                    <option>Private Principal / Cash Buyer</option>
                    <option>Family Office Representative</option>
                    <option>Pre-Approved Jumbo Financing</option>
                    <option>Architect / Decorator on Behalf of Client</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingTour}
                  className="w-full bg-[#161513] hover:bg-[#2C2926] text-white py-3 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  {isSubmittingTour ? 'Confirming Tour...' : 'Request Private Viewing'}
                </button>
              </form>

              {/* Concierge Direct Box */}
              <div className="mt-5 pt-4 border-t border-[#EAE5DC] flex items-center justify-between text-xs text-[#5C5549]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#161513] text-white flex items-center justify-center font-editorial text-xs">
                    TOV
                  </div>
                  <div>
                    <span className="font-semibold text-[#161513] block text-[11px]">Private Desk</span>
                    <span className="text-[10px] text-[#7B746B]">Discreet Response &lt; 2 hrs</span>
                  </div>
                </div>
                <a
                  href="tel:+13105550198"
                  className="hover:text-[#161513] font-medium flex items-center gap-1 text-[11px]"
                >
                  <Phone className="w-3 h-3 text-[#C5A880]" />
                  Call Concierge
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
