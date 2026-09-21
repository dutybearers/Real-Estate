import React, { useState } from 'react';
import { Property, LeadSubmission } from '../types';
import { X, Calendar, MapPin, CheckCircle2, Phone, Mail } from 'lucide-react';

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  selectedProperty?: Property | null;
  onCaptureTourLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  isOpen,
  onClose,
  properties,
  selectedProperty,
  onCaptureTourLead
}) => {
  if (!isOpen) return null;

  const [chosenPropertyId, setChosenPropertyId] = useState<string>(
    selectedProperty ? selectedProperty.id : properties[0]?.id || ''
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 12:00 PM)');
  const [buyerCategory, setBuyerCategory] = useState('Cash Buyer / Private Principal');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentProp = properties.find((p) => p.id === chosenPropertyId) || selectedProperty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCaptureTourLead({
      type: 'tour',
      name,
      email,
      phone,
      propertyId: currentProp?.id,
      propertyTitle: currentProp?.title || 'Private Advisory Tour',
      preferredDate: preferredDate || 'Flexible / As soon as possible',
      preferredTime,
      message: `[Buyer Category: ${buyerCategory}] Notes: ${notes}`
    });
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161513]/80 backdrop-blur-md animate-in fade-in"
      id="schedule-tour-modal"
    >
      <div className="relative w-full max-w-xl bg-white border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#555] hover:text-[#161513] hover:bg-[#FAF8F5] border border-transparent hover:border-[#E2DDD3] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-px bg-[#C5A880]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C8477]">
                Touch of Valentine Private Viewings
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161513] mb-2">
              Schedule Accompanied Tour
            </h3>
            <p className="text-xs text-[#6A6357] font-sans leading-relaxed mb-6">
              Experience our architectural residences through an exclusive in-person private inspection or live curated virtual walkthrough.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Select Property */}
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Selected Residence *
                </label>
                <select
                  value={chosenPropertyId}
                  onChange={(e) => setChosenPropertyId(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D5CDC0] text-xs font-medium text-[#161513] focus:outline-hidden focus:border-[#161513]"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.priceFormatted} • {p.location})
                    </option>
                  ))}
                  <option value="general">General Portfolio Overview / Multiple Homes</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Sinclair"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (310) 555-0198"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Preferred Viewing Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                  >
                    <option>Morning (10:00 AM - 12:00 PM)</option>
                    <option>Mid-Day (1:00 PM - 3:00 PM)</option>
                    <option>Sunset Golden Hour (5:00 PM - 7:00 PM)</option>
                    <option>Live Interactive Virtual Walkthrough</option>
                  </select>
                </div>
              </div>

              {/* Buyer Category */}
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Representation / Capacity
                </label>
                <select
                  value={buyerCategory}
                  onChange={(e) => setBuyerCategory(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                >
                  <option>Cash Buyer / Private Principal</option>
                  <option>Family Office Trustee</option>
                  <option>Pre-Approved Private Banking Facility</option>
                  <option>Architectural Designer on Behalf of Client</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Specific Requests / Chauffeur or Helicopter Transfer
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Interested in wine cellar provenance, private airport escort..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#161513] hover:bg-[#2C2926] text-white py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  Confirm Private Tour Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto mb-3" />
            <h3 className="font-editorial text-2xl text-[#161513] mb-2">
              Viewing Request Confirmed
            </h3>
            <p className="text-xs text-[#6A6357] max-w-md mx-auto leading-relaxed mb-6">
              Thank you, {name}. A dedicated Touch of Valentine advisor will contact you at {phone} to finalize private security and access clearance.
            </p>
            <button
              onClick={onClose}
              className="bg-[#161513] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
