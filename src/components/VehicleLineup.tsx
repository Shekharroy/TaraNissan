import React, { useState } from 'react';
import { ShieldCheck, Fuel, Gauge, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CAR_MODELS } from '../data/nissanData';
import { CarModel } from '../types';

interface VehicleLineupProps {
  onSelectCar: (carId: string) => void;
  onOpenTestDrive: (carId: string) => void;
  onOpenEmi: (carId: string) => void;
}

export const VehicleLineup: React.FC<VehicleLineupProps> = ({
  onSelectCar,
  onOpenTestDrive,
  onOpenEmi,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCars = CAR_MODELS.filter((car) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'compact-suv') return car.category === 'compact-suv';
    if (activeTab === 'luxury-suv') return car.category === 'luxury-suv';
    if (activeTab === 'cng') return car.category === 'cng';
    if (activeTab === 'special-edition') return car.category === 'special-edition';
    return true;
  });

  const tabs = [
    { id: 'all', label: 'ALL VEHICLES' },
    { id: 'compact-suv', label: 'COMPACT SUVs' },
    { id: 'cng', label: 'CNG & BI-FUEL' },
    { id: 'luxury-suv', label: '7-SEATER LUXURY' },
    { id: 'special-edition', label: 'SPECIAL EDITIONS' },
  ];

  return (
    <section 
      id="vehicle-lineup-section"
      className="py-16 sm:py-20 bg-[#ffffff] border-b border-[#e5e5e5]"
      aria-label="Nissan Vehicle Lineup"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="nissan-strapline text-[#c3002f] mb-2">
            DISCOVER YOUR NISSAN
          </div>
          <h2 className="nissan-section-title text-[#111111] tracking-wide mb-4">
            EXPLORE OUR VEHICLE RANGE
          </h2>
          <div className="w-16 h-1 bg-[#c3002f] mx-auto mb-4" />
          <p className="nissan-body-text">
            Designed in Japan and perfected for India. Choose from our award-winning lineup crafted for superior safety, thrilling dynamics, and unmatched efficiency.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex border-b border-[#e5e5e5] gap-2 sm:gap-6">
            {tabs.map((t) => (
              <button
                key={t.id}
                id={`filter-tab-${t.id}`}
                onClick={() => setActiveTab(t.id)}
                className={`pb-3 px-3 text-[13px] sm:text-[14px] font-nissan-bold uppercase tracking-[1.5px] transition-all relative cursor-pointer whitespace-nowrap ${
                  activeTab === t.id
                    ? 'text-[#c3002f] border-b-2 border-[#c3002f]'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car: CarModel) => (
            <div
              key={car.id}
              id={`car-card-${car.id}`}
              className="bg-white border border-[#e5e5e5] hover:border-[#111111] hover:shadow-xl transition-all duration-300 flex flex-col group relative"
            >
              {/* Badge */}
              {car.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1 bg-[#111111] text-white text-[11px] font-nissan-bold tracking-wider px-2.5 py-1 uppercase">
                    {car.id === 'nissan-magnite' && <ShieldCheck className="w-3.5 h-3.5 text-[#c3002f]" />}
                    {car.id === 'nissan-tekton' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{car.badge}</span>
                  </span>
                </div>
              )}

              {/* Car Image Container: authentic image directly from https://www.nissan.in/ */}
              <div 
                className="relative h-64 bg-[#f8f8f8] flex items-center justify-center p-6 overflow-hidden cursor-pointer"
                onClick={() => onSelectCar(car.id)}
              >
                <img
                  src={car.cardImage}
                  alt={car.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Floating "Click to Explore" button on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-white text-[#111111] text-[12px] font-nissan-bold uppercase px-4 py-2 shadow-sm tracking-wider">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category / Subtitle */}
                  <div className="text-[12px] font-nissan-bold text-[#888888] tracking-widest uppercase mb-1">
                    {car.subTagline}
                  </div>

                  {/* Car Model Title: 22px bold font-nissan-bold */}
                  <h3 className="nissan-card-title text-[#111111] mb-2 group-hover:text-[#c3002f] transition-colors">
                    {car.name}
                  </h3>

                  {/* Price */}
                  <div className="text-[18px] font-nissan-bold text-[#111111] mb-4">
                    {car.priceDisplay}
                  </div>

                  {/* Highlights Pill / Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-6 py-3 border-y border-[#f0f0f0]">
                    <div className="flex items-center gap-2 text-[12px] text-[#555555]">
                      <Fuel className="w-4 h-4 text-[#c3002f] shrink-0" />
                      <span className="truncate">{car.mileage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#555555]">
                      <Gauge className="w-4 h-4 text-[#c3002f] shrink-0" />
                      <span className="truncate">{car.engine}</span>
                    </div>
                  </div>

                  {/* Available Colors Swatches */}
                  <div className="mb-6">
                    <div className="text-[11px] font-nissan-bold text-[#777777] uppercase tracking-wider mb-2">
                      Available Colors ({car.colors.length})
                    </div>
                    <div className="flex items-center gap-2">
                      {car.colors.map((c) => (
                        <div
                          key={c.code}
                          title={c.name}
                          className="w-5 h-5 rounded-full border border-gray-300 shadow-xs transition-transform hover:scale-125 cursor-pointer"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`car-explore-${car.id}`}
                      onClick={() => onSelectCar(car.id)}
                      className="btn-mui-outlined text-[12px] py-2 px-3 w-full"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`car-testdrive-${car.id}`}
                      onClick={() => onOpenTestDrive(car.id)}
                      className="btn-mui-contained text-[12px] py-2 px-3 w-full"
                    >
                      TEST DRIVE
                    </button>
                  </div>

                  <button
                    id={`car-emi-${car.id}`}
                    onClick={() => onOpenEmi(car.id)}
                    className="btn-mui-text w-full text-[12px] py-2 text-[#666666] hover:text-[#c3002f]"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>CALCULATE MONTHLY EMI</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
