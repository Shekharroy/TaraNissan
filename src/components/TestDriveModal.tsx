import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Car, User, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CAR_MODELS, DEALERS_LIST } from '../data/nissanData';

interface TestDriveModalProps {
  initialCarId?: string;
  initialDealerName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  initialCarId,
  initialDealerName,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [selectedCarId, setSelectedCarId] = useState<string>(initialCarId || CAR_MODELS[0].id);
  const [selectedDealer, setSelectedDealer] = useState<string>(initialDealerName || DEALERS_LIST[0].name);
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('Morning (10:00 AM - 01:00 PM)');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const selectedCar = CAR_MODELS.find((c) => c.id === selectedCarId) || CAR_MODELS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'NIS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="test-drive-modal-container"
        className="bg-white w-full max-w-2xl my-8 overflow-hidden shadow-2xl relative border border-[#222222] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#222222] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c3002f] flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-nissan-bold text-[#c3002f] uppercase tracking-widest">
                DOORSTEP & DEALERSHIP EXPERIENCE
              </div>
              <h2 className="text-[20px] font-nissan-bold tracking-wider uppercase text-white">
                BOOK A NISSAN TEST DRIVE
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close test drive modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Car preview */}
              <div>
                <label className="nissan-label-text text-[#444444] block mb-2">
                  1. SELECT CAR TO DRIVE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CAR_MODELS.map((car) => (
                    <button
                      type="button"
                      key={car.id}
                      onClick={() => setSelectedCarId(car.id)}
                      className={`p-2.5 border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                        selectedCarId === car.id
                          ? 'border-[#c3002f] bg-red-50/50'
                          : 'border-[#e0e0e0] bg-[#fafafa] hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={car.cardImage}
                        alt={car.name}
                        className="w-12 h-8 object-contain shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate">
                        <div className="text-[13px] font-nissan-bold text-[#111111] truncate">{car.name}</div>
                        <div className="text-[10px] text-[#666666]">{car.priceDisplay.replace('Starting from ', '')}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dealership Selection */}
              <div>
                <label className="nissan-label-text text-[#444444] block mb-2">
                  2. SELECT PREFERRED DEALERSHIP
                </label>
                <select
                  value={selectedDealer}
                  onChange={(e) => setSelectedDealer(e.target.value)}
                  className="w-full py-2.5 px-3 border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                  required
                >
                  {DEALERS_LIST.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.city} - {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="nissan-label-text text-[#444444] block mb-2">
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full py-2.5 px-3 border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                    required
                  />
                </div>

                <div>
                  <label className="nissan-label-text text-[#444444] block mb-2">
                    TIME SLOT
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full py-2.5 px-3 border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                  >
                    <option>Morning (10:00 AM - 01:00 PM)</option>
                    <option>Afternoon (01:00 PM - 04:00 PM)</option>
                    <option>Evening (04:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-2 border-t border-[#f0f0f0]">
                <label className="nissan-label-text text-[#444444] block">
                  3. YOUR CONTACT DETAILS
                </label>

                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Mobile Number (+91) *"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit mobile number"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-test-drive-btn"
                  className="btn-nissan-primary w-full justify-center text-[14px] py-3.5"
                >
                  CONFIRM TEST DRIVE APPOINTMENT
                </button>
              </div>

              <p className="text-[11px] text-[#777777] text-center">
                By clicking Confirm, you authorize Nissan Motor India & authorized dealer partners to contact you via Phone/SMS/WhatsApp.
              </p>
            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-widest block mb-1">
                  APPOINTMENT CONFIRMED
                </span>
                <h3 className="text-[24px] font-nissan-bold text-[#111111]">
                  Thank You, {fullName || 'Valued Customer'}!
                </h3>
                <p className="text-[14px] text-[#555555] font-nissan-regular max-w-md mx-auto mt-2">
                  Your test drive for the <strong>{selectedCar.name}</strong> has been registered. Our dealership product specialist will reach out shortly to coordinate delivery of the vehicle.
                </p>
              </div>

              {/* Confirmation Card */}
              <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-5 max-w-md mx-auto text-left text-[13px] space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-[#666666]">Booking Reference:</span>
                  <span className="font-nissan-bold text-[#c3002f]">{bookingRef}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666666]">Vehicle:</span>
                  <span className="font-nissan-bold text-[#111111]">{selectedCar.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666666]">Dealership:</span>
                  <span className="font-nissan-bold text-[#111111]">{selectedDealer}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666666]">Date & Slot:</span>
                  <span className="font-nissan-bold text-[#111111]">{preferredDate} ({preferredTimeSlot.split(' ')[0]})</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="btn-nissan-primary px-8 py-3"
                >
                  DONE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
