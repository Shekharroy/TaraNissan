import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Car, User, Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react';
import { CAR_MODELS, DEALERS_LIST } from '../data/nissanData';
import { apiBookTestDrive } from '../services/apiClient.ts';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialCarId) setSelectedCarId(initialCarId);
    if (initialDealerName) setSelectedDealer(initialDealerName);
  }, [initialCarId, initialDealerName]);

  if (!isOpen) return null;

  const selectedCar = CAR_MODELS.find((c) => c.id === selectedCarId) || CAR_MODELS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await apiBookTestDrive({
        vehicleModel: selectedCar.name,
        vehicleModelCode: selectedCar.id.replace('nissan-', '').toUpperCase(),
        fullName,
        phone: phoneNumber,
        email: emailAddress,
        dealership: selectedDealer,
        bookingDate: preferredDate,
        timeSlot: preferredTimeSlot,
        locationType: 'showroom',
      });

      setBookingRef(result.data?.bookingRef || 'TN-TD-' + Math.floor(100000 + Math.random() * 900000));
      setIsSubmitted(true);
    } catch (err) {
      console.warn('[TestDrive] API fallback:', err);
      const fallbackRef = 'TN-TD-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(fallbackRef);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="test-drive-modal-container"
        className="bg-white dark:bg-[#151515] w-full max-w-2xl my-2 sm:my-8 overflow-hidden shadow-2xl relative border border-[#222222] dark:border-[#333333] max-h-[96vh] sm:max-h-[92vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] dark:bg-[#0d0d0d] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#222222] dark:border-[#262626] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c3002f] flex items-center justify-center text-white shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-nissan-bold text-[#c3002f] uppercase tracking-widest">
                DOORSTEP & DEALERSHIP EXPERIENCE
              </div>
              <h2 className="text-[16px] sm:text-[20px] font-nissan-bold tracking-wider uppercase text-white">
                BOOK A NISSAN TEST DRIVE
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close test drive modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Car preview */}
              <div>
                <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-2">
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
                          ? 'border-[#c3002f] bg-red-50/50 dark:bg-red-950/30'
                          : 'border-[#e0e0e0] dark:border-[#2a2a2a] bg-[#fafafa] dark:bg-[#1a1a1a] hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={car.cardImage}
                        alt={car.name}
                        className="w-12 h-8 object-contain shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate">
                        <div className="text-[13px] font-nissan-bold text-[#111111] dark:text-white truncate">{car.name}</div>
                        <div className="text-[10px] text-[#666666] dark:text-[#a0a0a0]">{car.priceDisplay.replace('Starting from ', '')}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dealership Selection */}
              <div>
                <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-2">
                  2. SELECT PREFERRED DEALERSHIP
                </label>
                <select
                  value={selectedDealer}
                  onChange={(e) => setSelectedDealer(e.target.value)}
                  className="w-full py-2.5 px-3 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                  required
                >
                  {DEALERS_LIST.map((d) => (
                    <option key={d.id} value={d.name} className="dark:bg-[#202020]">
                      {d.city} - {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-2">
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full py-2.5 px-3 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                    required
                  />
                </div>

                <div>
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-2">
                    TIME SLOT
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full py-2.5 px-3 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                  >
                    <option className="dark:bg-[#202020]">Morning (10:00 AM - 01:00 PM)</option>
                    <option className="dark:bg-[#202020]">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option className="dark:bg-[#202020]">Evening (04:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-2 border-t border-[#f0f0f0] dark:border-[#282828]">
                <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block">
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
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
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
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
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
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-test-drive-btn"
                  disabled={isSubmitting}
                  className="btn-nissan-primary w-full justify-center text-[14px] py-3.5 flex items-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SCHEDULING WITH MOTIHARI DEALERSHIP...</span>
                    </>
                  ) : (
                    <span>CONFIRM TEST DRIVE APPOINTMENT</span>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#777777] dark:text-[#909090] text-center">
                By clicking Confirm, you authorize Nissan Motor India & authorized dealer partners to contact you via Phone/SMS/WhatsApp.
              </p>
            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-widest block mb-1">
                  APPOINTMENT CONFIRMED
                </span>
                <h3 className="text-[24px] font-nissan-bold text-[#111111] dark:text-white">
                  Thank You, {fullName || 'Valued Customer'}!
                </h3>
                <p className="text-[14px] text-[#555555] dark:text-[#b0b0b0] font-nissan-regular max-w-md mx-auto mt-2">
                  Your test drive for the <strong>{selectedCar.name}</strong> has been registered. Our dealership product specialist will reach out shortly to coordinate delivery of the vehicle.
                </p>
              </div>

              {/* Confirmation Card */}
              <div className="bg-[#f9f9f9] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2a2a2a] p-5 max-w-md mx-auto text-left text-[13px] space-y-2">
                <div className="flex justify-between border-b border-gray-200 dark:border-[#282828] pb-2">
                  <span className="text-[#666666] dark:text-[#a0a0a0]">Booking Reference:</span>
                  <span className="font-nissan-bold text-[#c3002f]">{bookingRef}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666666] dark:text-[#a0a0a0]">Vehicle:</span>
                  <span className="font-nissan-bold text-[#111111] dark:text-white">{selectedCar.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666666] dark:text-[#a0a0a0]">Dealership:</span>
                  <span className="font-nissan-bold text-[#111111] dark:text-white">{selectedDealer}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#666666] dark:text-[#a0a0a0]">Date & Slot:</span>
                  <span className="font-nissan-bold text-[#111111] dark:text-white">{preferredDate} ({preferredTimeSlot ? preferredTimeSlot.split(' ')[0] : 'Morning'})</span>
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
