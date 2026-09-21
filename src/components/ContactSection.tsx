import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  Building 
} from 'lucide-react';
import { LeadSubmission } from '../types';

interface ContactSectionProps {
  onCaptureContactLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCaptureContactLead
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email' as 'email' | 'phone' | 'whatsapp',
    inquiryType: 'Buyer Representation',
    budget: '$20M - $35M',
    locationInterest: 'Beverly Hills / Bel Air',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const offices = [
    {
      city: 'Beverly Hills Desk',
      address: '9601 Wilshire Boulevard, Suite 1100',
      zip: 'Beverly Hills, CA 90210',
      phone: '+1 (310) 555-0198',
      email: 'beverlyhills@tovhomes.com'
    },
    {
      city: 'Manhattan Desk',
      address: '142 Franklin Street, Penthouse West',
      zip: 'New York, NY 10013',
      phone: '+1 (212) 555-0144',
      email: 'manhattan@tovhomes.com'
    },
    {
      city: 'London Mayfair Desk',
      address: '45 Mount Street, Berkeley Square',
      zip: 'London W1K 2SU, United Kingdom',
      phone: '+44 20 7946 0912',
      email: 'mayfair@tovhomes.com'
    },
    {
      city: 'Paris 8th Desk',
      address: '28 Avenue Montaigne',
      zip: '75008 Paris, France',
      phone: '+33 1 42 68 55 00',
      email: 'paris@tovhomes.com'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onCaptureContactLead({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredContact: formData.preferredContact,
        budget: formData.budget,
        message: `[Inquiry: ${formData.inquiryType}] [Location: ${formData.locationInterest}] ${formData.message}`
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        inquiryType: 'Buyer Representation',
        budget: '$20M - $35M',
        locationInterest: 'Beverly Hills / Bel Air',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8C8477]">
                Touch of Valentine Private Concierge
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#161513]">
              Contact Us & Advisory Inquiries
            </h2>
          </div>
          <p className="text-sm text-[#655F55] max-w-md mt-4 md:mt-0 font-sans font-light leading-relaxed">
            All inquiries are received directly by our senior partners and treated with the strictest institutional discretion.
          </p>
        </div>

        {/* Main Grid: Form Left, Office Locations Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Form Column (Lead Capture) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E5DFD5] p-6 sm:p-10">
            <div className="mb-6">
              <h3 className="font-editorial text-2xl text-[#161513] font-medium">
                Direct Private Consultation Request
              </h3>
              <p className="text-xs text-[#7B746B] mt-1 font-sans">
                Please provide your contact preferences. Our concierge team responds within two hours.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (310) 555-0198"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Preferred Channel
                    </label>
                    <select
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                      className="w-full p-2.5 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Direct Phone Call</option>
                      <option value="whatsapp">Encrypted WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    >
                      <option>Buyer Representation & Acquisition</option>
                      <option>Off-Market Property Listing</option>
                      <option>Confidential Valuation Request</option>
                      <option>Architectural & Heritage Advisory</option>
                      <option>Institutional Family Office Liaison</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                      Anticipated Capital / Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                    >
                      <option>$15,000,000 – $25,000,000</option>
                      <option>$25,000,000 – $40,000,000</option>
                      <option>$40,000,000 – $75,000,000+</option>
                      <option>Trophy Asset ($100,000,000+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Confidential Notes or Specific Residence Interest
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details regarding your architectural criteria, preferred locations, or timing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#161513] hover:bg-[#2C2926] text-white py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                    id="contact-form-submit-btn"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                    {isSubmitting ? 'Transmitting In Confidence...' : 'Transmit Confidential Inquiry'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 bg-white border border-[#C5A880] text-center">
                <CheckCircle2 className="w-10 h-10 text-[#C5A880] mx-auto mb-3" />
                <h4 className="font-editorial text-2xl text-[#161513] mb-2">
                  Inquiry Received in Confidence
                </h4>
                <p className="text-xs text-[#6A6357] max-w-md mx-auto leading-relaxed mb-6">
                  Thank you. Your inquiry has been routed directly to the Touch of Valentine senior advisory desk. A principal partner will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs uppercase tracking-wider text-[#161513] font-semibold underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Global Desks & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-[#EAE5DC] pb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C8477] block mb-1">
                Global Operations
              </span>
              <h3 className="font-editorial text-2xl text-[#161513]">
                Permanent Private Desks
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office, idx) => (
                <div key={idx} className="p-4 bg-[#FAF8F5] border border-[#EAE5DC]">
                  <h4 className="font-editorial text-lg font-medium text-[#161513] mb-1">
                    {office.city}
                  </h4>
                  <p className="text-[11px] text-[#5C5549] leading-relaxed mb-3">
                    {office.address}
                    <br />
                    {office.zip}
                  </p>
                  <div className="space-y-1 text-[11px]">
                    <a
                      href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-[#161513] hover:text-[#C5A880] block font-medium"
                    >
                      {office.phone}
                    </a>
                    <span className="text-[#8C8477] text-[10px] block truncate">
                      {office.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Concierge Ribbon */}
            <div className="p-5 bg-[#161513] text-[#FAF8F5] border border-[#2C2926]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span className="text-xs uppercase tracking-wider font-medium text-white">
                  24/7 Global Fiduciary Availability
                </span>
              </div>
              <p className="text-xs text-[#B0A99E] leading-relaxed">
                For time-sensitive private treaty contracts or immediate off-market transactions, our principal line is monitored around the clock.
              </p>
              <div className="mt-3 pt-3 border-t border-[#2C2926] flex items-center justify-between text-xs">
                <span className="text-[#AFA89E]">Principal Hotline:</span>
                <a href="tel:+13105550198" className="text-[#C5A880] font-semibold tracking-wider">
                  +1 (310) 555-0198
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
