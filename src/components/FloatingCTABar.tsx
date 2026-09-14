import React, { useState } from 'react';
import { Phone, MessageCircle, X, ExternalLink, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';
import { trackCallTelemetry, trackWhatsAppTelemetry } from '../services/apiClient.ts';

interface FloatingCTABarProps {
  selectedCarName?: string;
  onOpenAdminPortal?: () => void;
}

export const FloatingCTABar: React.FC<FloatingCTABarProps> = ({ 
  selectedCarName = 'Nissan Tekton',
  onOpenAdminPortal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const officialPhone = '+919031005087';
  const displayPhone = '+91 9031005087';

  // Handle phone call click
  const handlePhoneClick = (e?: React.MouseEvent) => {
    trackCallTelemetry(selectedCarName);
    try {
      // Safe fallback if not triggered via native <a>
      window.open(`tel:${officialPhone}`, '_self');
    } catch {
      // Ignored in restricted sandbox
    }
  };

  // Generate contextual WhatsApp message
  const getWhatsAppUrl = (customMsg?: string) => {
    const text = customMsg || 
      `Hello Tara Nissan, I am interested in knowing the on-road price and delivery timeline of the ${selectedCarName} in Motihari (845402).`;
    return `https://api.whatsapp.com/send?phone=919031005087&text=${encodeURIComponent(text)}`;
  };

  const handleWhatsAppDirect = (customMsg?: string) => {
    trackWhatsAppTelemetry(selectedCarName, customMsg);
    const url = getWhatsAppUrl(customMsg);
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 4.1 Bottom Left Floating Buttons: Staff Portal (RBAC) & Call Showroom */}
      <div 
        id="bottom-left-floating-container"
        className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-40 flex flex-col gap-2.5 sm:gap-3"
      >
        {/* Staff Portal (RBAC Management) - Formatted like btn CALL SHOWROOM */}
        {onOpenAdminPortal && (
          <div 
            id="staff-portal-floating-btn"
            className="flex items-center group"
          >
            <div className="relative">
              {/* Glowing pulse ring animation */}
              <span className="absolute -inset-1 rounded-full bg-amber-500/40 animate-ping opacity-75 duration-1000" />
              
              <button
                id="staff-portal-fab"
                onClick={onOpenAdminPortal}
                aria-label="Staff Portal (RBAC Management)"
                title="Staff Portal (RBAC Management)"
                className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#1c1c1c] to-[#2a2a2a] text-amber-400 rounded-full shadow-2xl hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-amber-500/40 border border-amber-500/40 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-amber-400" />
              </button>
            </div>

            {/* Mobile/Desktop badge formatted like CALL SHOWROOM */}
            <div 
              onClick={onOpenAdminPortal}
              className="hidden sm:flex ml-3 bg-white dark:bg-[#1c1c1c] text-[#111111] dark:text-white border border-[#e5e5e5] dark:border-[#333333] shadow-lg rounded-full py-1.5 px-3.5 items-center gap-2 cursor-pointer hover:border-amber-500 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <div className="text-left leading-tight">
                <p className="text-[12px] font-bold text-amber-600 dark:text-amber-400 tracking-wide">STAFF PORTAL</p>
                <p className="text-[11px] text-[#666666] dark:text-[#aaaaaa] font-medium">RBAC Management</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Dial Call Button */}
        <div 
          id="telephony-fab-container"
          className="flex items-center group"
        >
          <div className="relative">
            {/* Glowing pulse ring animation */}
            <span className="absolute -inset-1 rounded-full bg-[#c3002f]/40 animate-ping opacity-75 duration-1000" />
            
            <a
              id="mobile-phone-fab"
              href={`tel:${officialPhone}`}
              onClick={handlePhoneClick}
              aria-label="Call Tara Nissan Motihari Now"
              className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#c3002f] to-[#990024] text-white rounded-full shadow-2xl hover:shadow-[0_0_25px_rgba(195,0,47,0.6)] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#c3002f]/40 cursor-pointer"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            </a>
          </div>

          {/* Mobile/Desktop badge with timing */}
          <a 
            href={`tel:${officialPhone}`}
            onClick={handlePhoneClick}
            className="hidden sm:flex ml-3 bg-white dark:bg-[#1c1c1c] text-[#111111] dark:text-white border border-[#e5e5e5] dark:border-[#333333] shadow-lg rounded-full py-1.5 px-3.5 items-center gap-2 cursor-pointer hover:border-[#c3002f] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left leading-tight">
              <p className="text-[12px] font-bold text-[#c3002f] tracking-wide">CALL SHOWROOM</p>
              <p className="text-[11px] text-[#666666] dark:text-[#aaaaaa] font-medium">{displayPhone} (9 AM - 7:30 PM)</p>
            </div>
          </a>
        </div>
      </div>

      {/* 4.2 Floating WhatsApp Bubble - Bottom Right */}
      <div 
        id="whatsapp-widget-container"
        className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end"
      >
        {/* Quick Conversation Menu Popup */}
        {isMenuOpen && (
          <div className="mb-3 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-3rem)] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#e5e5e5] dark:border-[#333333] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/30">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">Tara Nissan Motihari</h4>
                  <p className="text-[11px] text-white/90 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Online • Official NH28 Dealership
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Context Prompt */}
            <div className="p-4 space-y-3 text-sm">
              <div className="bg-[#f8f9fa] dark:bg-[#242424] p-3 rounded-xl border border-[#eeeeee] dark:border-[#333333]">
                <p className="text-xs text-[#666666] dark:text-[#aaaaaa] mb-1 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c3002f]" /> Contextual Inquiry:
                </p>
                <p className="text-[13px] font-semibold text-[#111111] dark:text-white">
                  {selectedCarName}
                </p>
                <p className="text-xs text-[#777777] dark:text-[#999999] mt-0.5">
                  Request on-road quotation & delivery schedule for Motihari (845402).
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <button
                  onClick={() => handleWhatsAppDirect(`Hello Tara Nissan, I am interested in knowing the on-road price and delivery timeline of the ${selectedCarName} in Motihari (845402).`)}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#222222] dark:text-[#e0e0e0] hover:bg-[#e9f8ed] dark:hover:bg-[#173824] hover:text-[#25D366] transition-colors border border-transparent hover:border-[#25D366]/30 flex items-center justify-between"
                >
                  <span>💰 Get On-Road Price for {selectedCarName}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  onClick={() => handleWhatsAppDirect(`Hello Tara Nissan Motihari, I would like to schedule a doorstep test drive for the ${selectedCarName}.`)}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#222222] dark:text-[#e0e0e0] hover:bg-[#e9f8ed] dark:hover:bg-[#173824] hover:text-[#25D366] transition-colors border border-transparent hover:border-[#25D366]/30 flex items-center justify-between"
                >
                  <span>🔑 Book Doorstep Test Drive</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  onClick={() => handleWhatsAppDirect(`Hello Tara Nissan, I have an old vehicle and want to calculate the exchange value against the new ${selectedCarName}.`)}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#222222] dark:text-[#e0e0e0] hover:bg-[#e9f8ed] dark:hover:bg-[#173824] hover:text-[#25D366] transition-colors border border-transparent hover:border-[#25D366]/30 flex items-center justify-between"
                >
                  <span>🔄 Car Exchange & Valuation</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  onClick={() => handleWhatsAppDirect('Hello Tara Nissan, please share your showroom exact GPS location on NH28 Motihari.')}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#222222] dark:text-[#e0e0e0] hover:bg-[#e9f8ed] dark:hover:bg-[#173824] hover:text-[#25D366] transition-colors border border-transparent hover:border-[#25D366]/30 flex items-center justify-between"
                >
                  <span>📍 NH28 Showroom Location Map</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              {/* Direct Open Button */}
              <button
                onClick={() => handleWhatsAppDirect()}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                Start Chat with Motihari Advisor
              </button>

              <div className="pt-2 border-t border-[#eeeeee] dark:border-[#2b2b2b] flex items-center justify-between text-[11px] text-[#888888]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Authorized Nissan Hub
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 9:00 AM - 7:30 PM
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Prompt Bubble Badge */}
        {showTooltip && !isMenuOpen && (
          <div className="mb-2.5 hidden sm:flex items-center bg-white dark:bg-[#1f1f1f] text-[#111111] dark:text-white px-3.5 py-1.5 rounded-full shadow-xl border border-[#e5e5e5] dark:border-[#333333] text-xs font-semibold gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>Chat with Tara Nissan Motihari</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="text-[#999999] hover:text-[#111111] dark:hover:text-white ml-1"
            >
              ×
            </button>
          </div>
        )}

        {/* Persistent Floating WhatsApp Bubble */}
        <div className="relative">
          {/* Subtle pulse animation ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 duration-1000" />

          <button
            id="whatsapp-floating-bubble"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Chat with Tara Nissan Motihari on WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          >
            <MessageCircle className="w-7 h-7 fill-white text-white" />
          </button>
        </div>
      </div>
    </>
  );
};
