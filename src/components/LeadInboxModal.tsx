import React, { useState } from 'react';
import { LeadSubmission } from '../types';
import { X, Inbox, Filter, Phone, Mail, Calendar, Calculator, CheckCircle2, Clock, Trash2, ArrowUpRight } from 'lucide-react';

interface LeadInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onUpdateStatus: (id: string, status: LeadSubmission['status']) => void;
  onDeleteLead: (id: string) => void;
}

export const LeadInboxModal: React.FC<LeadInboxModalProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onDeleteLead
}) => {
  if (!isOpen) return null;

  const [filterType, setFilterType] = useState<string>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');

  const filteredLeads = leads.filter((lead) => {
    if (filterType === 'all') return true;
    return lead.type === filterType;
  });

  const activeLead = leads.find((l) => l.id === selectedLeadId) || filteredLeads[0];

  const getTypeBadge = (type: LeadSubmission['type']) => {
    switch (type) {
      case 'tour':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200">
            <Calendar className="w-2.5 h-2.5" />
            Tour Booking
          </span>
        );
      case 'valuation':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Calculator className="w-2.5 h-2.5" />
            Home Valuation
          </span>
        );
      case 'private-register':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-200">
            VIP Off-Market
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-stone-100 text-stone-800 border border-stone-200">
            <Mail className="w-2.5 h-2.5" />
            General Inquiry
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#161513]/85 backdrop-blur-md animate-in fade-in"
      id="lead-inbox-modal"
    >
      <div className="relative w-full max-w-5xl bg-white border border-[#E5DFD5] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Bar */}
        <div className="bg-[#FAF8F5] border-b border-[#EAE5DC] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#161513] text-[#FAF8F5] flex items-center justify-center">
              <Inbox className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl text-[#161513] font-medium leading-none">
                Touch of Valentine Concierge Desk • Lead Capture System
              </h3>
              <p className="text-[11px] text-[#7B746B] mt-1 font-sans">
                Real-time central database of private inquiries, tour bookings, valuations, and VIP register requests ({leads.length} active)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#555] hover:text-[#161513] hover:bg-[#EFEBE3] border border-[#E2DDD3] transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-[#EAE5DC] bg-[#FCFBF9] overflow-x-auto text-xs font-sans">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#C5A880]" /> Filter By:
          </span>
          {[
            { id: 'all', label: `All Leads (${leads.length})` },
            { id: 'tour', label: `Tours (${leads.filter((l) => l.type === 'tour').length})` },
            { id: 'valuation', label: `Valuations (${leads.filter((l) => l.type === 'valuation').length})` },
            { id: 'contact', label: `Contact Inquiries (${leads.filter((l) => l.type === 'contact').length})` },
            { id: 'private-register', label: `VIP Register (${leads.filter((l) => l.type === 'private-register').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-[#161513] text-white'
                  : 'bg-white border border-[#E2DDD3] text-[#555] hover:text-[#161513]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content: Master / Detail View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left List Column */}
          <div className="md:col-span-5 border-r border-[#EAE5DC] overflow-y-auto max-h-[62vh] p-4 space-y-2 bg-[#FAF8F5]">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-xs text-[#8C8477]">
                No leads recorded in this category yet. Submit an inquiry through the website to see it appear here immediately!
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = activeLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3.5 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#161513] shadow-sm'
                        : 'bg-white/80 border-[#EAE5DC] hover:border-[#C5A880]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      {getTypeBadge(lead.type)}
                      <span className="text-[10px] text-[#8C8477]">{lead.createdAt}</span>
                    </div>

                    <h4 className="font-editorial text-base text-[#161513] font-semibold truncate">
                      {lead.name}
                    </h4>

                    <p className="text-xs text-[#555] truncate font-sans mt-0.5">
                      {lead.email} • {lead.phone}
                    </p>

                    {lead.propertyTitle && (
                      <span className="text-[10px] text-[#846332] font-medium block truncate mt-1">
                        Re: {lead.propertyTitle}
                      </span>
                    )}

                    <div className="mt-2 pt-2 border-t border-[#EAE5DC]/60 flex items-center justify-between text-[10px]">
                      <span className="text-[#8C8477]">Status:</span>
                      <span className="font-semibold text-[#161513] bg-[#FAF8F5] px-2 py-0.5 border border-[#E2DDD3]">
                        {lead.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Detail Column */}
          <div className="md:col-span-7 overflow-y-auto max-h-[62vh] p-6 bg-white flex flex-col justify-between">
            {activeLead ? (
              <div className="space-y-6">
                
                {/* Detail Header */}
                <div className="border-b border-[#EAE5DC] pb-4">
                  <div className="flex items-center justify-between mb-2">
                    {getTypeBadge(activeLead.type)}
                    <span className="text-xs text-[#8C8477]">{activeLead.createdAt}</span>
                  </div>

                  <h3 className="font-editorial text-3xl text-[#161513] font-medium">
                    {activeLead.name}
                  </h3>
                  <p className="text-xs text-[#7B746B] font-sans mt-0.5">
                    Lead ID: #{activeLead.id}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-1">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${activeLead.email}`}
                      className="font-medium text-[#161513] hover:text-[#C5A880] flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                      {activeLead.email}
                    </a>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-1">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${activeLead.phone}`}
                      className="font-medium text-[#161513] hover:text-[#C5A880] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      {activeLead.phone}
                    </a>
                  </div>
                </div>

                {/* Specific Details based on Lead Type */}
                {activeLead.propertyTitle && (
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EAE5DC] text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-1">
                      Associated Property
                    </span>
                    <p className="font-editorial text-xl font-medium text-[#161513]">
                      {activeLead.propertyTitle}
                    </p>
                    {activeLead.preferredDate && (
                      <p className="text-xs text-[#555] mt-1">
                        Requested Inspection: <strong>{activeLead.preferredDate}</strong> ({activeLead.preferredTime})
                      </p>
                    )}
                  </div>
                )}

                {activeLead.propertyDetails && (
                  <div className="p-3.5 bg-[#F8F5EE] border border-[#C5A880]/60 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#846332] block mb-1 font-semibold">
                      Automated Valuation Details
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-[#8C8477] text-[10px] block">Address</span>
                        <span className="font-semibold text-[#161513]">{activeLead.propertyDetails.address}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8477] text-[10px] block">Type</span>
                        <span className="font-semibold text-[#161513]">{activeLead.propertyDetails.propertyType}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8477] text-[10px] block">Living Area</span>
                        <span className="font-semibold text-[#161513]">{activeLead.propertyDetails.sqft.toLocaleString()} sq ft</span>
                      </div>
                      <div>
                        <span className="text-[#8C8477] text-[10px] block">Estimated Valuation</span>
                        <span className="font-editorial text-lg font-bold text-[#161513]">
                          ${(activeLead.propertyDetails.estimatedValue / 1000000).toFixed(2)}M
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeLead.budget && (
                  <div className="p-3 bg-[#FAF8F5] border border-[#EAE5DC] text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-0.5">
                      Target Capital / Budget Bracket
                    </span>
                    <span className="font-semibold text-[#161513]">{activeLead.budget}</span>
                  </div>
                )}

                {activeLead.message && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8477] block mb-1 font-semibold">
                      Client Message & Criteria
                    </span>
                    <p className="text-xs text-[#444] p-3 bg-[#FAF8F5] border border-[#EAE5DC] leading-relaxed whitespace-pre-line font-sans">
                      {activeLead.message}
                    </p>
                  </div>
                )}

                {/* Status Update Controls */}
                <div className="pt-4 border-t border-[#EAE5DC] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C8477] font-semibold">Update Status:</span>
                    <select
                      value={activeLead.status}
                      onChange={(e) => onUpdateStatus(activeLead.id, e.target.value as any)}
                      className="p-1.5 bg-[#FAF8F5] border border-[#D5CDC0] text-xs font-medium cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Private Tour Scheduled">Private Tour Scheduled</option>
                      <option value="Report Sent">Report Sent</option>
                    </select>
                  </div>

                  <button
                    onClick={() => onDeleteLead(activeLead.id)}
                    className="text-xs text-[#A13A3A] hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Record
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-xs text-[#8C8477]">
                Select a lead to view complete details.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
