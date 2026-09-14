import React, { useState } from 'react';
import { Menu, X, MapPin, Calculator, FileText, PhoneCall, Phone, ChevronDown, User, LogOut, ShieldCheck, Car, Sun, Moon } from 'lucide-react';
import { TaraNissanLogo } from './TaraNissanLogo';
import { UserProfile } from '../types';
import { trackCallTelemetry } from '../services/apiClient.ts';

interface HeaderProps {
  user: UserProfile | null;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onSignOut: () => void;
  onOpenEmi: () => void;
  onOpenDealer: () => void;
  onOpenTestDrive: () => void;
  onOpenBrochure: () => void;
  onSelectCar: (carId: string) => void;
  onOpenCustomerDashboard: () => void;
  onOpenAdminPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  darkMode = false,
  onToggleDarkMode,
  onOpenAuth,
  onSignOut,
  onOpenEmi,
  onOpenDealer,
  onOpenTestDrive,
  onOpenBrochure,
  onSelectCar,
  onOpenCustomerDashboard,
  onOpenAdminPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehiclesDropdownOpen, setVehiclesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setVehiclesDropdownOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#0d0d0d] border-b border-[#e5e5e5] dark:border-[#222222] shadow-xs transition-colors duration-200 w-full">
      {/* Top micro bar for dealer, tools & emergency helpline */}
      <div className="hidden lg:block bg-[#141414] dark:bg-[#080808] text-white py-1.5 px-4 xl:px-8 border-b border-[#222222] dark:border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10.5px] xl:text-[11px] tracking-wide uppercase font-nissan-regular min-w-0">
          {/* Left: Toll-Free 24x7 Helpline + Direct Showroom Line + Dealership Badge in attractive layout */}
          <div className="flex items-center gap-3.5 xl:gap-4 whitespace-nowrap shrink-0">
            <a 
              href="tel:18002093456" 
              className="inline-flex items-center gap-1.5 group text-neutral-300 hover:text-white transition-colors cursor-pointer py-0.5"
              title="Call Nissan Toll-Free Customer Care (24x7)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[#9e9e9e] text-[10px] tracking-wider uppercase font-nissan-regular">Toll-Free 24x7:</span>
              <strong className="text-white font-nissan-bold tracking-wide group-hover:text-[#c3002f] transition-colors">1800 209 3456</strong>
            </a>

            <span className="h-3 w-px bg-neutral-700" />

            <a
              href="tel:+919031005087"
              onClick={() => trackCallTelemetry('Top Bar Call Showroom')}
              className="inline-flex items-center gap-1.5 group text-neutral-300 hover:text-white transition-colors cursor-pointer py-0.5"
              title="Tara Nissan Direct Showroom Hotline: +91 9031005087"
            >
              <Phone className="w-3 h-3 text-[#c3002f] shrink-0" />
              <span className="text-[#9e9e9e] text-[10px] tracking-wider uppercase font-nissan-regular">Showroom:</span>
              <strong className="text-white font-nissan-bold tracking-wide group-hover:text-[#c3002f] transition-colors">+91 9031005087</strong>
            </a>

            <span className="hidden xl:inline-block h-3 w-px bg-neutral-700" />

            <span className="hidden xl:inline-flex items-center gap-1 text-[10px] tracking-wider text-neutral-400 uppercase font-nissan-regular">
              <span className="text-neutral-200 font-nissan-bold">Tara Nissan</span>
              <span>• Bankat Motihari</span>
            </span>
          </div>

          {/* Right: Essential customer tools with consistent spacing and dividers (No mode toggle) */}
          <div className="flex items-center gap-3 xl:gap-3.5 whitespace-nowrap shrink-0">
            <button 
              id="topbar-emi-btn"
              onClick={onOpenEmi}
              className="flex items-center gap-1 text-[#d6d6d6] hover:text-[#c3002f] transition-colors cursor-pointer whitespace-nowrap py-0.5"
              title="Calculate Monthly EMI"
            >
              <Calculator className="w-3 h-3 text-[#c3002f]" />
              <span>EMI Calculator</span>
            </button>

            <span className="h-3 w-px bg-neutral-700" />

            <button 
              id="topbar-brochure-btn"
              onClick={onOpenBrochure}
              className="flex items-center gap-1 text-[#d6d6d6] hover:text-[#c3002f] transition-colors cursor-pointer whitespace-nowrap py-0.5"
              title="Download Vehicle Brochure"
            >
              <FileText className="w-3 h-3 text-[#c3002f]" />
              <span>Brochure</span>
            </button>

            <span className="h-3 w-px bg-neutral-700" />

            <button 
              id="topbar-find-dealer-btn"
              onClick={onOpenDealer}
              className="flex items-center gap-1 text-[#d6d6d6] hover:text-[#c3002f] transition-colors cursor-pointer whitespace-nowrap py-0.5"
              title="Locate Showroom & Service Workshop"
            >
              <MapPin className="w-3 h-3 text-[#c3002f]" />
              <span>Find Dealer</span>
            </button>

            <span className="h-3 w-px bg-neutral-700" />

            <button 
              id="topbar-test-drive-btn"
              onClick={onOpenTestDrive}
              className="flex items-center gap-1 text-[#d6d6d6] hover:text-[#c3002f] transition-colors cursor-pointer whitespace-nowrap py-0.5"
              title="Schedule a Test Drive at Home or Showroom"
            >
              <PhoneCall className="w-3 h-3 text-[#c3002f]" />
              <span>Book Test Drive</span>
            </button>

            <span className="h-3 w-px bg-neutral-700" />

            {user ? (
              <div className="relative shrink-0">
                <button
                  id="topbar-user-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:text-[#c3002f] transition-colors cursor-pointer whitespace-nowrap font-nissan-bold py-0.5"
                  title="My Account"
                >
                  <User className="w-3 h-3 text-[#c3002f]" />
                  <span>My Account</span>
                  <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-[#161616] text-[#111111] dark:text-white border border-[#e5e5e5] dark:border-[#2e2e2e] shadow-xl py-2 z-50 normal-case">
                    <div className="px-4 py-2 border-b border-[#f0f0f0] dark:border-[#252525]">
                      <div className="text-[13px] font-nissan-bold">My Account</div>
                      <div className="text-[11px] text-[#777777] dark:text-[#a0a0a0] truncate">{user.email || 'Authorized Member'}</div>
                    </div>
                    <button
                      onClick={() => {
                        onOpenCustomerDashboard();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[12px] text-[#c3002f] hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-between font-nissan-bold border-b border-[#f0f0f0] dark:border-[#252525] cursor-pointer"
                    >
                      <span>Invoices & Bookings</span>
                      <Car className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onOpenTestDrive();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#f9f9f9] dark:hover:bg-[#202020] flex items-center justify-between cursor-pointer"
                    >
                      <span>Bookings & Test Drives</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => {
                        onOpenEmi();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#f9f9f9] dark:hover:bg-[#202020] flex items-center justify-between border-b border-[#f0f0f0] dark:border-[#252525] cursor-pointer"
                    >
                      <span>EMI Calculator</span>
                      <Calculator className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => {
                        onSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[12px] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-between font-nissan-bold cursor-pointer"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                <button
                  id="topbar-signin-btn"
                  onClick={() => onOpenAuth('signin')}
                  className="flex items-center gap-1 hover:text-[#c3002f] transition-colors cursor-pointer font-nissan-bold whitespace-nowrap py-0.5"
                >
                  <User className="w-3 h-3 text-[#c3002f]" />
                  <span>Sign In</span>
                </button>
                <span className="text-[#555555]">/</span>
                <button
                  id="topbar-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="text-[#c3002f] hover:underline transition-colors cursor-pointer font-nissan-bold whitespace-nowrap py-0.5"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation header (Subheader) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16 lg:h-[84px]">
          {/* Brand Logo on Left */}
          <div className="flex items-center shrink-0">
            <a 
              href="#" 
              id="header-tara-nissan-logo-link"
              className="flex items-center focus:outline-none shrink-0 py-1"
              title="Tara Nissan - Authorized Dealer"
            >
              <TaraNissanLogo theme={darkMode ? 'dark' : 'light'} size="md" />
            </a>
          </div>

          {/* Desktop Right Side: Menu Options AND Book Online Button grouped together with cohesive spacing */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <nav className="flex items-center space-x-1 shrink-0" aria-label="Main Navigation">
              {/* Vehicles dropdown */}
              <div className="relative shrink-0">
                <button
                  id="nav-vehicles-dropdown-btn"
                  onClick={() => setVehiclesDropdownOpen(!vehiclesDropdownOpen)}
                  onMouseEnter={() => setVehiclesDropdownOpen(true)}
                  className="btn-mui-text text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] dark:text-neutral-100 hover:text-[#c3002f] dark:hover:text-[#ff3b5c] py-1.5 px-3 flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Vehicles</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${vehiclesDropdownOpen ? 'rotate-180 text-[#c3002f]' : ''}`} />
                </button>

                {vehiclesDropdownOpen && (
                  <div 
                    onMouseLeave={() => setVehiclesDropdownOpen(false)}
                    className="absolute left-0 top-full w-72 bg-white dark:bg-[#161616] shadow-xl border border-[#e5e5e5] dark:border-[#2b2b2b] py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    <div className="px-4 py-2 border-b border-[#f0f0f0] dark:border-[#262626] text-[11px] font-nissan-bold tracking-widest text-[#888888] dark:text-[#a0a0a0] uppercase">
                      ALL NISSAN CARS
                    </div>
                    <button
                      onClick={() => { onSelectCar('nissan-tekton'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] dark:hover:bg-[#202020] transition-colors border-b border-[#f5f5f5] dark:border-[#242424]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] dark:text-white flex items-center justify-between">
                        <span>Tekton</span>
                        <span className="text-[10px] bg-red-100 dark:bg-red-950 dark:text-red-300 text-[#c3002f] px-1.5 py-0.5 rounded-xs font-nissan-bold">NEW</span>
                      </div>
                      <div className="text-[12px] text-[#666666] dark:text-[#a3a3a3]">All-New Compact SUV</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-gravite'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] dark:hover:bg-[#202020] transition-colors border-b border-[#f5f5f5] dark:border-[#242424]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] dark:text-white flex items-center justify-between">
                        <span>Gravite & CNG</span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 text-emerald-800 px-1.5 py-0.5 rounded-xs font-nissan-bold">28.5 km/kg</span>
                      </div>
                      <div className="text-[12px] text-[#666666] dark:text-[#a3a3a3]">Dual-Cylinder Bi-Fuel SUV</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-magnite'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] dark:hover:bg-[#202020] transition-colors border-b border-[#f5f5f5] dark:border-[#242424]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] dark:text-white flex items-center justify-between">
                        <span>New Magnite</span>
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-950 dark:text-amber-300 text-amber-900 px-1.5 py-0.5 rounded-xs font-nissan-bold">5-STAR NCAP</span>
                      </div>
                      <div className="text-[12px] text-[#666666] dark:text-[#a3a3a3]">Compact SUV (6 Airbags)</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-kuro'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] dark:hover:bg-[#202020] transition-colors border-b border-[#f5f5f5] dark:border-[#242424]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] dark:text-white">
                        Magnite KURO Edition
                      </div>
                      <div className="text-[12px] text-[#666666] dark:text-[#a3a3a3]">All-Black Special Edition</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-x-trail'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] dark:hover:bg-[#202020] transition-colors"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] dark:text-white">
                        X-TRAIL
                      </div>
                      <div className="text-[12px] text-[#666666] dark:text-[#a3a3a3]">Premium 7-Seater VC-Turbo</div>
                    </button>
                    <div className="p-3 bg-[#fcfcfc] dark:bg-[#1a1a1a] border-t border-[#f0f0f0] dark:border-[#282828]">
                      <button
                        onClick={() => scrollToSection('vehicle-lineup-section')}
                        className="text-[12px] text-[#c3002f] font-nissan-bold hover:underline block text-center uppercase tracking-wider"
                      >
                        View Full Showroom &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                id="nav-showroom-btn"
                onClick={() => scrollToSection('vehicle-lineup-section')}
                className="btn-mui-text text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] dark:text-neutral-100 hover:text-[#c3002f] dark:hover:text-[#ff3b5c] py-1.5 px-3 cursor-pointer whitespace-nowrap shrink-0"
              >
                Showroom
              </button>

              <button
                id="nav-emi-btn"
                onClick={onOpenEmi}
                className="btn-mui-text text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] dark:text-neutral-100 hover:text-[#c3002f] dark:hover:text-[#ff3b5c] py-1.5 px-3 cursor-pointer whitespace-nowrap shrink-0"
              >
                Check EMI
              </button>

              <button
                id="nav-brochure-btn"
                onClick={onOpenBrochure}
                className="btn-mui-text text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] dark:text-neutral-100 hover:text-[#c3002f] dark:hover:text-[#ff3b5c] py-1.5 px-3 cursor-pointer whitespace-nowrap shrink-0"
              >
                Brochure
              </button>

              <button
                id="nav-dealers-btn"
                onClick={onOpenDealer}
                className="btn-mui-text text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] dark:text-neutral-100 hover:text-[#c3002f] dark:hover:text-[#ff3b5c] py-1.5 px-3 cursor-pointer whitespace-nowrap shrink-0"
              >
                Dealers
              </button>
            </nav>

            <span className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 shrink-0" />

            {/* Book Online CTA - directly adjacent with balanced spacing */}
            <button
              id="header-cta-book"
              onClick={onOpenTestDrive}
              className="btn-mui-contained text-[11.5px] tracking-[0.2px] px-4 py-2 min-h-[36px] whitespace-nowrap shrink-0 leading-tight cursor-pointer font-nissan-bold shadow-xs hover:shadow-sm transition-all"
            >
              Book Online
            </button>
          </div>

          {/* Tablet & Mobile Header Action: Menu Icon required for both Tablet Portrait & Landscape (<1280px) */}
          <div className="xl:hidden flex items-center shrink-0">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[#111111] dark:text-white hover:text-[#c3002f] hover:bg-neutral-100 dark:hover:bg-[#202020] transition-colors cursor-pointer rounded-xs"
              aria-label="Toggle navigation menu"
            >
              <span className="text-[12px] sm:text-[13px] font-nissan-bold uppercase tracking-wider">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#c3002f]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu - Required across all viewports < 1280px (Tablet Landscape & Portrait) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#121212] border-t border-[#e5e5e5] dark:border-[#262626] px-4 sm:px-8 pt-4 pb-8 space-y-3.5 shadow-xl max-h-[calc(100dvh-64px)] overflow-y-auto">
          {/* Primary Book Online Action Button placed directly in Menu section */}
          <button
            id="menu-book-online-btn"
            onClick={() => {
              onOpenTestDrive();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 sm:py-3.5 px-4 bg-[#c3002f] hover:bg-[#a00026] text-white font-nissan-bold text-[13px] sm:text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <Car className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>Book Online / Test Drive</span>
          </button>

          {/* Theme switch row in mobile/tablet drawer (accessible in preferences without cluttering menubar) */}
          <div className="p-3 bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-[#e8e8e8] dark:border-[#2a2a2a] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] font-nissan-bold text-[#111111] dark:text-white uppercase tracking-wider">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
              <span>{darkMode ? 'Dark Mode: Active' : 'Light Mode: Active'}</span>
            </div>
            <button
              id="mobile-drawer-theme-toggle"
              onClick={onToggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                darkMode ? 'bg-[#c3002f]' : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 24x7 Helpline Banner */}
          <div className="p-2.5 bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-[#e8e8e8] dark:border-[#2a2a2a] flex items-center justify-between text-[11px] font-nissan-regular">
            <a href="tel:18002093456" className="flex items-center gap-1.5 text-[#555555] dark:text-[#a0a0a0]">
              <PhoneCall className="w-3.5 h-3.5 text-[#c3002f]" />
              <span>Toll Free: <strong className="text-[#111111] dark:text-white font-nissan-bold">1800 209 3456</strong></span>
            </a>
            <span className="text-[#c3002f] font-nissan-bold uppercase text-[10px] tracking-wider">24x7</span>
          </div>

          {/* User Mobile Card */}
          {user ? (
            <div className="bg-[#f6f6f6] dark:bg-[#1a1a1a] p-3 border border-[#e5e5e5] dark:border-[#2a2a2a] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#c3002f] text-white flex items-center justify-center font-nissan-bold text-[12px]">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[13px] font-nissan-bold text-[#111111] dark:text-white">My Account</div>
                  <div className="text-[10.5px] text-[#666666] dark:text-[#a0a0a0]">{user.email || 'Tara Nissan Member'}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onSignOut();
                  setMobileMenuOpen(false);
                }}
                className="text-[11px] font-nissan-bold text-red-600 dark:text-red-400 uppercase tracking-wider px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-2 pb-1">
              <button
                onClick={() => {
                  onOpenAuth('signin');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 btn-mui-outlined text-[11.5px] py-2 justify-center"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 btn-mui-contained text-[11.5px] py-2 justify-center"
              >
                Create Account
              </button>
            </div>
          )}

          <div className="text-[11px] font-nissan-bold tracking-wider text-[#888888] dark:text-[#a0a0a0] uppercase pt-1">
            Nissan Lineup
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-1">
            <button
              onClick={() => { onSelectCar('nissan-tekton'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] dark:bg-[#1a1a1a] hover:bg-[#f2f2f2] dark:hover:bg-[#252525] border border-[#eeeeee] dark:border-[#2c2c2c] text-[12.5px] font-nissan-bold text-[#111111] dark:text-white cursor-pointer rounded-xs"
            >
              Tekton (New)
            </button>
            <button
              onClick={() => { onSelectCar('nissan-gravite'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] dark:bg-[#1a1a1a] hover:bg-[#f2f2f2] dark:hover:bg-[#252525] border border-[#eeeeee] dark:border-[#2c2c2c] text-[12.5px] font-nissan-bold text-[#111111] dark:text-white cursor-pointer rounded-xs"
            >
              Gravite & CNG
            </button>
            <button
              onClick={() => { onSelectCar('nissan-magnite'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] dark:bg-[#1a1a1a] hover:bg-[#f2f2f2] dark:hover:bg-[#252525] border border-[#eeeeee] dark:border-[#2c2c2c] text-[12.5px] font-nissan-bold text-[#111111] dark:text-white cursor-pointer rounded-xs"
            >
              New Magnite
            </button>
            <button
              onClick={() => { onSelectCar('nissan-x-trail'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] dark:bg-[#1a1a1a] hover:bg-[#f2f2f2] dark:hover:bg-[#252525] border border-[#eeeeee] dark:border-[#2c2c2c] text-[12.5px] font-nissan-bold text-[#111111] dark:text-white cursor-pointer rounded-xs"
            >
              X-TRAIL 7-Seater
            </button>
          </div>

          <button
            onClick={() => { scrollToSection('vehicle-lineup-section'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2.5 border-b border-[#f0f0f0] dark:border-[#262626] text-[13px] font-nissan-bold text-[#111111] dark:text-white hover:text-[#c3002f] dark:hover:text-[#ff3b5c] transition-colors cursor-pointer"
          >
            Showroom & All Vehicles
          </button>

          <button
            onClick={() => { onOpenEmi(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2.5 border-b border-[#f0f0f0] dark:border-[#262626] text-[13px] font-nissan-bold text-[#111111] dark:text-white hover:text-[#c3002f] dark:hover:text-[#ff3b5c] transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Check EMI</span>
            <Calculator className="w-4 h-4 text-[#c3002f]" />
          </button>

          <button
            onClick={() => { onOpenBrochure(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2.5 border-b border-[#f0f0f0] dark:border-[#262626] text-[13px] font-nissan-bold text-[#111111] dark:text-white hover:text-[#c3002f] dark:hover:text-[#ff3b5c] transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Download Brochure</span>
            <FileText className="w-4 h-4 text-[#c3002f]" />
          </button>

          <button
            onClick={() => { onOpenDealer(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2.5 border-b border-[#f0f0f0] dark:border-[#262626] text-[13px] font-nissan-bold text-[#111111] dark:text-white hover:text-[#c3002f] dark:hover:text-[#ff3b5c] transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Find A Dealer</span>
            <MapPin className="w-4 h-4 text-[#c3002f]" />
          </button>
        </div>
      )}
    </header>
  );
};
