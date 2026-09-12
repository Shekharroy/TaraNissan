import React, { useState } from 'react';
import { X, FileDown, CheckCircle2, Download, Printer } from 'lucide-react';
import { CAR_MODELS } from '../data/nissanData';

interface BrochureModalProps {
  initialCarId?: string;
  isOpen: boolean;
  onClose: () => void;
  onBookTestDrive: (carId: string) => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  initialCarId,
  isOpen,
  onClose,
  onBookTestDrive,
}) => {
  if (!isOpen) return null;

  const [selectedCarId, setSelectedCarId] = useState<string>(initialCarId || CAR_MODELS[0].id);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedCar = CAR_MODELS.find((c) => c.id === selectedCarId) || CAR_MODELS[0];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      // Simulate file download
      const blob = new Blob([
        `Nissan India Official Specifications Brochure\nModel: ${selectedCar.name}\nTagline: ${selectedCar.tagline}\nStarting Price: ${selectedCar.priceDisplay}\nEngine: ${selectedCar.engine}\nMileage: ${selectedCar.mileage}\nSafety: ${selectedCar.safetyRating}\nGround Clearance: ${selectedCar.groundClearance}\n\nOfficial Website: https://www.nissan.in`
      ], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Nissan_${selectedCar.name.replace(/\s+/g, '_')}_Brochure.txt`;
      link.click();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="brochure-modal-container"
        className="bg-white w-full max-w-4xl my-8 overflow-hidden shadow-2xl relative border border-[#222222] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#222222] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c3002f] flex items-center justify-center text-white">
              <FileDown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-nissan-bold text-[#c3002f] uppercase tracking-widest">
                OFFICIAL DIGITAL ARCHIVES
              </div>
              <h2 className="text-[20px] font-nissan-bold tracking-wider uppercase text-white">
                DOWNLOAD NISSAN E-BROCHURE
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close brochure modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Select Car */}
          <div>
            <label className="nissan-label-text text-[#444444] block mb-3">
              SELECT VEHICLE MODEL
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CAR_MODELS.map((car) => (
                <button
                  key={car.id}
                  onClick={() => { setSelectedCarId(car.id); setDownloadSuccess(false); }}
                  className={`p-3 text-center border transition-all cursor-pointer ${
                    selectedCarId === car.id
                      ? 'border-[#c3002f] bg-red-50/50 shadow-xs'
                      : 'border-[#e0e0e0] hover:border-gray-400 bg-[#fafafa]'
                  }`}
                >
                  <div className="text-[13px] font-nissan-bold text-[#111111]">
                    {car.name}
                  </div>
                  <div className="text-[11px] text-[#666666] mt-0.5">
                    {car.badge || 'Official'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Brochure Preview Card */}
          <div className="border border-[#e0e0e0] bg-[#f9f9f9] p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 border border-[#eeeeee]">
              <img
                src={selectedCar.heroBanner}
                alt={selectedCar.name}
                className="max-h-52 w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-3">
              <div className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-wider">
                COMPREHENSIVE BUYER GUIDE
              </div>
              <h3 className="text-[22px] font-nissan-bold text-[#111111]">
                {selectedCar.name} Technical E-Brochure
              </h3>
              <p className="text-[13px] text-[#555555] font-nissan-regular">
                Includes full technical specifications, variant-wise standard equipment, exterior color palettes, warranty details, and genuine accessories portfolio.
              </p>

              <div className="space-y-1.5 text-[12px] text-[#333333] pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Engine:</span>
                  <span className="font-nissan-bold">{selectedCar.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span>Safety NCAP:</span>
                  <span className="font-nissan-bold text-[#16a34a]">{selectedCar.safetyRating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mileage:</span>
                  <span className="font-nissan-bold">{selectedCar.mileage}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="download-brochure-submit-btn"
                  onClick={handleDownload}
                  className="btn-nissan-primary w-full justify-center text-[13px] py-3"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD INSTANT E-BROCHURE</span>
                </button>
              </div>

              {downloadSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[12px] flex items-center gap-2 font-nissan-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Brochure package prepared and downloaded successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f4f4f4] border-t border-[#e5e5e5] px-6 py-4 flex items-center justify-between shrink-0">
          <span className="text-[12px] text-[#666666]">
            Questions about {selectedCar.name}?
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn-nissan-secondary text-[12px] py-2 px-4"
            >
              CLOSE
            </button>
            <button
              onClick={() => { onClose(); onBookTestDrive(selectedCar.id); }}
              className="btn-nissan-primary text-[12px] py-2 px-5"
            >
              BOOK A TEST DRIVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
