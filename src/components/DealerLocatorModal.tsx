import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Search, Wrench, CheckCircle } from 'lucide-react';
import { DEALERS_LIST } from '../data/nissanData';

interface DealerLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDealerForTestDrive: (dealerName: string) => void;
}

export const DealerLocatorModal: React.FC<DealerLocatorModalProps> = ({
  isOpen,
  onClose,
  onSelectDealerForTestDrive,
}) => {
  if (!isOpen) return null;

  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['all', 'New Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Kolkata', 'Pune'];

  const filteredDealers = DEALERS_LIST.filter((d) => {
    const matchesCity = selectedCity === 'all' || d.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesQuery =
      searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="dealer-locator-modal"
        className="bg-white w-full max-w-5xl my-8 overflow-hidden shadow-2xl relative border border-[#222222] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#222222] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c3002f] flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-nissan-bold text-[#c3002f] uppercase tracking-widest">
                NISSAN AUTHORIZED NETWORK
              </div>
              <h2 className="text-[20px] font-nissan-bold tracking-wider uppercase text-white">
                FIND AN AUTHORIZED NISSAN DEALERSHIP
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dealer locator"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-5 bg-[#f6f6f6] border-b border-[#e5e5e5] space-y-4 shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by city, dealer name, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
              />
            </div>

            {/* City Selector */}
            <div className="sm:w-64">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-[#d5d5d5] text-[14px] font-nissan-bold uppercase tracking-wider focus:outline-none focus:border-[#c3002f] cursor-pointer"
              >
                <option value="all">ALL METROS & CITIES</option>
                {cities.filter(c => c !== 'all').map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick city pills */}
          <div className="flex flex-wrap gap-2 items-center text-[12px]">
            <span className="font-nissan-bold text-[#666666] uppercase tracking-wider">Top Hubs:</span>
            {['New Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 text-[11px] font-nissan-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#c3002f] text-white'
                    : 'bg-white border border-[#e0e0e0] text-[#444444] hover:border-black'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Dealers List */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="text-[13px] font-nissan-bold text-[#666666] uppercase tracking-wider mb-4">
            Showing {filteredDealers.length} Authorized Showrooms & Service Centers
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                className="p-5 bg-white border border-[#e0e0e0] hover:border-[#111111] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-nissan-bold text-[#111111]">
                      {dealer.name}
                    </h3>
                    {dealer.isServiceCenter && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-nissan-bold bg-gray-100 text-gray-700 px-2 py-0.5 uppercase tracking-wider shrink-0">
                        <Wrench className="w-3 h-3 text-[#c3002f]" />
                        Sales & Service
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 text-[13px] text-[#444444]">
                    <MapPin className="w-4 h-4 text-[#c3002f] shrink-0 mt-0.5" />
                    <span>{dealer.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[13px] text-[#444444]">
                    <Phone className="w-4 h-4 text-[#c3002f] shrink-0" />
                    <span className="font-nissan-bold">{dealer.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[13px] text-[#444444]">
                    <Clock className="w-4 h-4 text-[#c3002f] shrink-0" />
                    <span>{dealer.timing}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#f0f0f0] flex items-center justify-between gap-3">
                  <a
                    href={`tel:${dealer.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-[12px] font-nissan-bold text-[#111111] hover:text-[#c3002f] uppercase tracking-wider flex items-center gap-1"
                  >
                    Call Showroom
                  </a>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectDealerForTestDrive(dealer.name);
                    }}
                    className="btn-nissan-primary text-[12px] py-2 px-4"
                  >
                    BOOK VISIT / DRIVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDealers.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <div className="text-[16px] font-nissan-bold text-[#111111]">No dealerships found in this location</div>
              <p className="text-[13px] text-[#666666] mt-1">Please try searching another city or resetting your filters.</p>
              <button
                onClick={() => { setSelectedCity('all'); setSearchQuery(''); }}
                className="mt-4 btn-nissan-secondary text-[12px] py-2 px-4"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#f5f5f5] px-6 py-3 border-t border-[#e5e5e5] text-[12px] text-[#666666] flex justify-between items-center shrink-0">
          <span>Nissan India Toll-Free Assistance: <strong>1800 209 3456</strong></span>
          <button
            onClick={onClose}
            className="btn-nissan-secondary text-[12px] py-1.5 px-4"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
