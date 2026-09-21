import React, { useState } from 'react';
import { LeadSubmission } from '../types';
import { X, Lock, ShieldCheck, CheckCircle2, Key } from 'lucide-react';

interface PrivateRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptureRegisterLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const PrivateRegisterModal: React.FC<PrivateRegisterModalProps> = ({
  isOpen,
  onClose,
  onCaptureRegisterLead
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetMarkets, setTargetMarkets] = useState('Beverly Hills & Bel Air');
  const [priceRange, setPriceRange] = useState('$25M - $50M');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCaptureRegisterLead({
      type: 'private-register',
      name,
      email,
      phone,
      budget: priceRange,
      message: `Off-market private register access requested for ${targetMarkets}. Budget range: ${priceRange}.`
    });
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161513]/85 backdrop-blur-md animate-in fade-in"
      id="private-register-modal"
    >
      <div className="relative w-full max-w-lg bg-white border border-[#E5DFD5] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#555] hover:text-[#161513] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-[#C5A880]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C8477]">
                Restricted Portfolio
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161513] mb-2">
              VIP Off-Market Register
            </h3>
            <p className="text-xs text-[#6A6357] font-sans leading-relaxed mb-6">
              Access unlisted architectural estates held under strict non-disclosure. Verified high-net-worth clients receive private previews 14–30 days prior to any public disclosure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Full Name / Principal *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Charles Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="principal@holding.com"
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

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Target Locations
                </label>
                <select
                  value={targetMarkets}
                  onChange={(e) => setTargetMarkets(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                >
                  <option>Beverly Hills & Bel Air</option>
                  <option>Manhattan Tribeca & West Village</option>
                  <option>Aspen Red Mountain</option>
                  <option>Palm Beach Oceanfront</option>
                  <option>Paris 8th & Rive Gauche</option>
                  <option>London Mayfair & Belgravia</option>
                  <option>Global Trophy Assets</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] block mb-1">
                  Acquisition Budget Bracket
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D5CDC0] text-xs focus:outline-hidden focus:border-[#161513]"
                >
                  <option>$15M - $25M</option>
                  <option>$25M - $50M</option>
                  <option>$50M - $80M</option>
                  <option>$80M - $150M+ (Legacy Compound)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#161513] hover:bg-[#2C2926] text-white py-3 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Key className="w-3.5 h-3.5 text-[#C5A880]" />
                  Request Private Treaty Credentials
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-[#EAE5DC] flex items-center gap-2 text-[10px] text-[#7B746B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span>
                Discretion guaranteed. No public marketing; direct principal-to-principal matchmaking.
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="w-10 h-10 text-[#C5A880] mx-auto mb-2" />
            <h4 className="font-editorial text-2xl text-[#161513] mb-1">
              Access Request Logged
            </h4>
            <p className="text-xs text-[#6A6357] leading-relaxed mb-4">
              Thank you, {name}. A senior managing partner will contact you privately to verify credentials and issue secure encrypted catalog access.
            </p>
            <button
              onClick={onClose}
              className="bg-[#161513] text-white px-6 py-2 text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
