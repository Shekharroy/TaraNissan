import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { CAR_MODELS } from '../data/nissanData';

interface EmiCalculatorModalProps {
  initialCarId?: string;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (carId: string) => void;
}

export const EmiCalculatorModal: React.FC<EmiCalculatorModalProps> = ({
  initialCarId,
  isOpen,
  onClose,
  onBookNow,
}) => {
  if (!isOpen) return null;

  const [selectedCarId, setSelectedCarId] = useState<string>(initialCarId || CAR_MODELS[0].id);
  const selectedCar = CAR_MODELS.find((c) => c.id === selectedCarId) || CAR_MODELS[0];

  const carPrice = selectedCar.priceRaw * 100000; // in Rupees

  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(8.75);

  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const principal = carPrice - downPaymentAmount;

  // Monthly EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;
  const monthlyEmi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
  );

  const totalPayable = monthlyEmi * numberOfMonths + downPaymentAmount;
  const totalInterest = monthlyEmi * numberOfMonths - principal;

  const formatRupees = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="emi-calculator-modal"
        className="bg-white w-full max-w-4xl my-8 overflow-hidden shadow-2xl relative border border-[#222222] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#222222] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c3002f] flex items-center justify-center text-white">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-nissan-bold text-[#c3002f] uppercase tracking-widest">
                NISSAN FINANCIAL SERVICES
              </div>
              <h2 className="text-[20px] font-nissan-bold tracking-wider uppercase text-white">
                CAR LOAN & EMI CALCULATOR
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close EMI calculator"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Select Car Model */}
          <div>
            <label className="nissan-label-text text-[#444444] block mb-3">
              1. SELECT NISSAN VEHICLE MODEL
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CAR_MODELS.map((car) => (
                <button
                  key={car.id}
                  id={`emi-select-${car.id}`}
                  onClick={() => setSelectedCarId(car.id)}
                  className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCarId === car.id
                      ? 'border-[#c3002f] bg-red-50/40 shadow-xs'
                      : 'border-[#e0e0e0] hover:border-gray-400 bg-[#fafafa]'
                  }`}
                >
                  <div className="h-16 flex items-center justify-center mb-2">
                    <img
                      src={car.cardImage}
                      alt={car.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-nissan-bold text-[#111111] truncate">
                      {car.name}
                    </div>
                    <div className="text-[11px] text-[#c3002f] font-nissan-bold">
                      {car.priceDisplay.replace('Starting from ', '')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Down payment */}
              <div className="p-4 bg-[#f9f9f9] border border-[#eeeeee]">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-nissan-bold text-[#222222] uppercase tracking-wider">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span className="text-[15px] font-nissan-bold text-[#c3002f]">
                    {formatRupees(downPaymentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#c3002f] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#888888] mt-1">
                  <span>10% (Min)</span>
                  <span>30%</span>
                  <span>60%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="p-4 bg-[#f9f9f9] border border-[#eeeeee]">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-nissan-bold text-[#222222] uppercase tracking-wider">
                    Loan Tenure ({tenureYears} Years / {tenureYears * 12} Months)
                  </label>
                  <span className="text-[15px] font-nissan-bold text-[#111111]">
                    {tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-[#c3002f] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#888888] mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                  <span>7 Years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="p-4 bg-[#f9f9f9] border border-[#eeeeee]">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-nissan-bold text-[#222222] uppercase tracking-wider">
                    Annual Interest Rate
                  </label>
                  <span className="text-[15px] font-nissan-bold text-[#111111]">
                    {interestRate.toFixed(2)}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="14.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#c3002f] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#888888] mt-1">
                  <span>7.00%</span>
                  <span>8.75% (Nissan Standard)</span>
                  <span>14.00%</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-[#141414] text-white p-6 flex flex-col justify-between border border-[#222222]">
              <div>
                <span className="text-[11px] text-[#a0a0a0] uppercase font-nissan-bold tracking-widest block mb-1">
                  ESTIMATED MONTHLY INSTALLMENT
                </span>
                <div className="text-[36px] font-nissan-bold text-white mb-4 text-[#ffffff]">
                  {formatRupees(monthlyEmi)}
                  <span className="text-[14px] text-[#a0a0a0] font-nissan-regular"> / month*</span>
                </div>

                <div className="space-y-3 border-t border-[#333333] pt-4 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Ex-Showroom Price:</span>
                    <span className="font-nissan-bold text-white">{formatRupees(carPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Principal Loan Amount:</span>
                    <span className="font-nissan-bold text-white">{formatRupees(principal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Total Interest:</span>
                    <span className="font-nissan-bold text-amber-400">{formatRupees(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#333333] pt-2">
                    <span className="text-[#a0a0a0]">Total Payable:</span>
                    <span className="font-nissan-bold text-white">{formatRupees(totalPayable)}</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-[#1e1e1e] border border-[#2a2a2a] text-[11px] text-[#a0a0a0] flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#c3002f] shrink-0 mt-0.5" />
                  <span>
                    Special zero-down payment options, tenure flexibility, and fast approvals via Nissan Finance partners.
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#333333]">
                <button
                  id="emi-apply-finance-btn"
                  onClick={() => onBookNow(selectedCar.id)}
                  className="w-full btn-nissan-primary justify-center text-[13px] py-3"
                >
                  <span>PROCEED WITH THIS PLAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="bg-[#f5f5f5] px-6 py-3 border-t border-[#e5e5e5] text-[11px] text-[#777777] shrink-0">
          *Disclaimer: The calculated EMI is indicative and calculated at current partner rates. Actual loan terms, interest rates, processing fees, and taxes are subject to banking partner underwriting.
        </div>
      </div>
    </div>
  );
};
