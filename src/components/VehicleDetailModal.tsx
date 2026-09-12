import React, { useState } from 'react';
import { X, Check, ShieldCheck, Fuel, Gauge, SlidersHorizontal, FileText, PhoneCall, Calendar } from 'lucide-react';
import { CarModel } from '../types';

interface VehicleDetailModalProps {
  car: CarModel | null;
  onClose: () => void;
  onOpenTestDrive: (carId: string) => void;
  onOpenEmi: (carId: string) => void;
  onOpenBrochure: (carId: string) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  car,
  onClose,
  onOpenTestDrive,
  onOpenEmi,
  onOpenBrochure,
}) => {
  if (!car) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'variants' | 'specs'>('overview');

  const selectedColor = car.colors[selectedColorIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="vehicle-detail-modal-container"
        className="bg-white dark:bg-[#151515] w-full max-w-5xl my-8 overflow-hidden shadow-2xl relative border border-[#222222] dark:border-[#333333] max-h-[92vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#111111] dark:bg-[#0d0d0d] text-white px-6 py-4 flex items-center justify-between border-b border-[#222222] dark:border-[#262626] shrink-0">
          <div>
            <div className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-widest">
              NISSAN SHOWROOM SPECIFICATIONS
            </div>
            <h2 className="text-[24px] font-nissan-bold tracking-wider uppercase text-white">
              {car.name}
            </h2>
          </div>
          <button
            id="close-vehicle-modal-btn"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close vehicle details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Subnav Tabs */}
        <div className="bg-[#f6f6f6] dark:bg-[#1c1c1c] border-b border-[#e5e5e5] dark:border-[#2a2a2a] px-6 flex space-x-8 shrink-0">
          <button
            id="modal-tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 text-[13px] font-nissan-bold uppercase tracking-[1.5px] transition-colors border-b-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#c3002f] text-[#c3002f]'
                : 'border-transparent text-[#666666] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            OVERVIEW & HIGHLIGHTS
          </button>
          <button
            id="modal-tab-variants"
            onClick={() => setActiveTab('variants')}
            className={`py-3.5 text-[13px] font-nissan-bold uppercase tracking-[1.5px] transition-colors border-b-2 cursor-pointer ${
              activeTab === 'variants'
                ? 'border-[#c3002f] text-[#c3002f]'
                : 'border-transparent text-[#666666] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            VARIANTS & PRICING ({car.variants.length})
          </button>
          <button
            id="modal-tab-specs"
            onClick={() => setActiveTab('specs')}
            className={`py-3.5 text-[13px] font-nissan-bold uppercase tracking-[1.5px] transition-colors border-b-2 cursor-pointer ${
              activeTab === 'specs'
                ? 'border-[#c3002f] text-[#c3002f]'
                : 'border-transparent text-[#666666] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            TECHNICAL SPECIFICATIONS
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Main Visual showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#fafafa] dark:bg-[#1a1a1a] p-6 border border-[#eeeeee] dark:border-[#2a2a2a]">
                {/* Car Image direct from https://www.nissan.in/ */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                  <div className="relative w-full h-72 flex items-center justify-center p-4">
                    <img
                      src={car.cardImage}
                      alt={`${car.name} - ${selectedColor.name}`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[13px] font-nissan-bold text-[#333333] dark:text-[#d0d0d0] mt-2">
                    Color: <span className="text-[#c3002f]">{selectedColor.name}</span>
                  </div>
                </div>

                {/* Info & Price */}
                <div className="lg:col-span-5 space-y-4">
                  {car.badge && (
                    <span className="inline-block bg-[#111111] dark:bg-[#252525] text-white text-[11px] font-nissan-bold tracking-widest px-3 py-1 uppercase shadow-xs">
                      {car.badge}
                    </span>
                  )}
                  <h3 className="text-[26px] font-nissan-bold text-[#111111] dark:text-white leading-tight">
                    {car.tagline}
                  </h3>
                  <div className="text-[24px] font-nissan-bold text-[#c3002f]">
                    {car.priceDisplay}
                  </div>
                  <p className="nissan-body-text dark:text-[#b5b5b5] text-[14px]">
                    {car.description}
                  </p>

                  {/* Color Selector */}
                  <div className="pt-2">
                    <label className="nissan-label-text text-[#666666] dark:text-[#a0a0a0] block mb-2">
                      SELECT EXTERIOR COLOR ({car.colors.length} Available)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {car.colors.map((color, idx) => (
                        <button
                          key={color.code}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                            selectedColorIndex === idx
                              ? 'border-[#c3002f] scale-110 shadow-md ring-2 ring-red-200 dark:ring-red-900/50'
                              : 'border-gray-300 dark:border-neutral-600 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColorIndex === idx && (
                            <Check className={`w-3.5 h-3.5 ${color.hex === '#f0f0f0' || color.hex === '#eaeaea' || color.hex === '#f7f7f7' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="nissan-label-text text-[#111111] dark:text-white mb-4 text-[14px]">
                  ENGINEERING & TECHNOLOGY HIGHLIGHTS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.keyHighlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2a2a2a] flex items-start gap-3 hover:border-[#c3002f] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-950/40 text-[#c3002f] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[14px] font-nissan-regular text-[#222222] dark:text-[#e0e0e0]">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#141414] dark:bg-[#101010] text-white">
                <div>
                  <span className="text-[11px] text-[#999999] uppercase font-nissan-bold block">FUEL EFFICIENCY</span>
                  <span className="text-[16px] font-nissan-bold text-white mt-1 block">{car.mileage}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#999999] uppercase font-nissan-bold block">ENGINE POWERTRAIN</span>
                  <span className="text-[16px] font-nissan-bold text-white mt-1 block">{car.engine}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#999999] uppercase font-nissan-bold block">GROUND CLEARANCE</span>
                  <span className="text-[16px] font-nissan-bold text-white mt-1 block">{car.groundClearance}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#999999] uppercase font-nissan-bold block">SAFETY RATING</span>
                  <span className="text-[16px] font-nissan-bold text-[#4ade80] mt-1 block">{car.safetyRating}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VARIANTS */}
          {activeTab === 'variants' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[18px] font-nissan-bold text-[#111111] dark:text-white">
                    {car.name} All Variants & Ex-Showroom Pricing
                  </h4>
                  <p className="text-[13px] text-[#666666] dark:text-[#a0a0a0]">
                    *Prices are ex-showroom, Pan-India. Local taxes and registrations apply.
                  </p>
                </div>
                <button
                  onClick={() => onOpenBrochure(car.id)}
                  className="btn-nissan-secondary text-[12px] py-2 px-3 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Price Sheet</span>
                </button>
              </div>

              <div className="border border-[#e5e5e5] dark:border-[#2a2a2a] overflow-hidden">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#f4f4f4] dark:bg-[#1e1e1e] border-b border-[#e5e5e5] dark:border-[#2a2a2a] text-[12px] font-nissan-bold uppercase tracking-wider text-[#444444] dark:text-[#bbbbbb]">
                    <tr>
                      <th className="p-4">Variant Name</th>
                      <th className="p-4">Powertrain / Fuel</th>
                      <th className="p-4">Transmission</th>
                      <th className="p-4">Ex-Showroom Price</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eeeeee] dark:divide-[#262626]">
                    {car.variants.map((v, i) => (
                      <tr key={i} className="hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] transition-colors">
                        <td className="p-4 font-nissan-bold text-[#111111] dark:text-white">
                          {v.name}
                          <div className="text-[12px] font-nissan-regular text-[#777777] dark:text-[#a0a0a0] mt-1 space-x-2">
                            {v.keyFeatures.slice(0, 3).map((feat, idx) => (
                              <span key={idx} className="inline-block bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded-xs text-[11px]">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-[#444444] dark:text-[#cccccc] font-nissan-regular">{v.fuel}</td>
                        <td className="p-4 text-[#444444] dark:text-[#cccccc] font-nissan-regular">{v.transmission}</td>
                        <td className="p-4 font-nissan-bold text-[#c3002f] text-[16px]">{v.price}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => onOpenTestDrive(car.id)}
                            className="text-[12px] font-nissan-bold text-[#c3002f] hover:underline uppercase tracking-wider"
                          >
                            Book Variant &rarr;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h4 className="text-[18px] font-nissan-bold text-[#111111] dark:text-white">
                Comprehensive Technical Specifications
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] p-5 space-y-4">
                  <h5 className="nissan-label-text text-[#c3002f] border-b border-[#e5e5e5] dark:border-[#2a2a2a] pb-2">
                    ENGINE & PERFORMANCE
                  </h5>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-[#262626]">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Engine Configuration:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.engine}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-[#262626]">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Maximum Power:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.power}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-[#262626]">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Fuel Economy:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.mileage}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Fuel Options:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.fuelTypes.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-[#e5e5e5] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] p-5 space-y-4">
                  <h5 className="nissan-label-text text-[#c3002f] border-b border-[#e5e5e5] dark:border-[#2a2a2a] pb-2">
                    DIMENSIONS & SAFETY
                  </h5>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-[#262626]">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Ground Clearance:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.groundClearance}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-[#262626]">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Seating Capacity:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.seatingCapacity}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-[#262626]">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Crash Safety Rating:</span>
                      <span className="font-nissan-bold text-[#15803d] dark:text-[#4ade80]">{car.safetyRating}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#666666] dark:text-[#a0a0a0]">Transmissions Available:</span>
                      <span className="font-nissan-bold text-[#111111] dark:text-white">{car.transmission.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="bg-[#f4f4f4] dark:bg-[#181818] border-t border-[#e5e5e5] dark:border-[#2a2a2a] px-6 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenEmi(car.id)}
              className="text-[13px] font-nissan-bold text-[#111111] dark:text-white hover:text-[#c3002f] dark:hover:text-[#ff3b5c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c3002f]" />
              <span>Calculate EMI</span>
            </button>
            <span className="text-gray-300 dark:text-neutral-600">|</span>
            <button
              onClick={() => onOpenBrochure(car.id)}
              className="text-[13px] font-nissan-bold text-[#111111] dark:text-white hover:text-[#c3002f] dark:hover:text-[#ff3b5c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#c3002f]" />
              <span>Download E-Brochure</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn-nissan-secondary text-[12px] py-2 px-4"
            >
              CLOSE
            </button>
            <button
              onClick={() => onOpenTestDrive(car.id)}
              className="btn-nissan-primary text-[12px] py-2 px-6"
            >
              BOOK TEST DRIVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
