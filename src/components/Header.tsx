import React, { useState } from 'react';
import { Menu, X, MapPin, Calculator, FileText, PhoneCall, ChevronDown, User, LogOut, ShieldCheck, Car } from 'lucide-react';
import { TaraNissanLogo } from './TaraNissanLogo';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onSignOut: () => void;
  onOpenEmi: () => void;
  onOpenDealer: () => void;
  onOpenTestDrive: () => void;
  onOpenBrochure: () => void;
  onSelectCar: (carId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onSignOut,
  onOpenEmi,
  onOpenDealer,
  onOpenTestDrive,
  onOpenBrochure,
  onSelectCar,
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#e5e5e5] shadow-xs">
      {/* Top micro bar for dealer, tools & emergency helpline */}
      <div className="hidden lg:block bg-[#141414] text-white py-1 px-4 xl:px-8 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10.5px] xl:text-[11px] tracking-wide uppercase font-nissan-regular">
          <div className="flex items-center gap-4 xl:gap-5 whitespace-nowrap shrink-0">
            <span className="text-[#9e9e9e]">Tara Nissan Helpdesk: <strong className="text-white font-nissan-bold">1800 209 3456</strong> (24x7 Toll Free)</span>
            <span className="text-[#444444]">|</span>
            <span className="text-[#9e9e9e]">Authorized Dealership Network</span>
          </div>
          <div className="flex items-center gap-3.5 xl:gap-5 whitespace-nowrap shrink-0">
            <button 
              id="topbar-emi-btn"
              onClick={onOpenEmi}
              className="flex items-center gap-1.5 hover:text-[#c3002f] transition-colors cursor-pointer text-[#d6d6d6] hover:text-white whitespace-nowrap"
              title="Calculate Monthly EMI"
            >
              <Calculator className="w-3 h-3 text-[#c3002f]" />
              <span>EMI Calculator</span>
            </button>
            <button 
              id="topbar-brochure-btn"
              onClick={onOpenBrochure}
              className="flex items-center gap-1.5 hover:text-[#c3002f] transition-colors cursor-pointer text-[#d6d6d6] hover:text-white whitespace-nowrap"
              title="Download Vehicle Brochure"
            >
              <FileText className="w-3 h-3 text-[#c3002f]" />
              <span>Download Brochure</span>
            </button>
            <button 
              id="topbar-find-dealer-btn"
              onClick={onOpenDealer}
              className="flex items-center gap-1.5 hover:text-[#c3002f] transition-colors cursor-pointer text-[#d6d6d6] hover:text-white whitespace-nowrap"
            >
              <MapPin className="w-3 h-3 text-[#c3002f]" />
              <span>Find A Dealer</span>
            </button>
            <button 
              id="topbar-test-drive-btn"
              onClick={onOpenTestDrive}
              className="flex items-center gap-1.5 hover:text-[#c3002f] transition-colors cursor-pointer text-[#d6d6d6] hover:text-white whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3 text-[#c3002f]" />
              <span>Book Test Drive</span>
            </button>

            {user ? (
              <div className="relative shrink-0">
                <button
                  id="topbar-user-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:text-[#c3002f] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#c3002f] text-white text-[8.5px] flex items-center justify-center font-nissan-bold">
                    {user.name.charAt(0)}
                  </span>
                  <span>Hi, {user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                <button
                  id="topbar-signin-btn"
                  onClick={() => onOpenAuth('signin')}
                  className="flex items-center gap-1 hover:text-[#c3002f] transition-colors cursor-pointer font-nissan-bold whitespace-nowrap"
                >
                  <User className="w-3 h-3 text-[#c3002f]" />
                  <span>Sign In</span>
                </button>
                <span className="text-[#555555]">/</span>
                <button
                  id="topbar-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="text-[#c3002f] hover:underline transition-colors cursor-pointer font-nissan-bold whitespace-nowrap"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-[86px]">
          {/* Custom Tara Nissan Brand Logo */}
          <div className="flex items-center gap-6 xl:gap-8">
            <a 
              href="#" 
              id="header-tara-nissan-logo-link"
              className="flex items-center focus:outline-none shrink-0 py-1"
              title="Tara Nissan"
            >
              <TaraNissanLogo theme="light" size="md" />
            </a>

            {/* Desktop Navigation Links - Refined compact font size & strictly one-line */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0" aria-label="Main Navigation">
              {/* Vehicles dropdown */}
              <div className="relative shrink-0">
                <button
                  id="nav-vehicles-dropdown-btn"
                  onClick={() => setVehiclesDropdownOpen(!vehiclesDropdownOpen)}
                  onMouseEnter={() => setVehiclesDropdownOpen(true)}
                  className="btn-mui-text text-[11px] xl:text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] hover:text-[#c3002f] py-1 px-2.5 flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Vehicles</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${vehiclesDropdownOpen ? 'rotate-180 text-[#c3002f]' : ''}`} />
                </button>

                {vehiclesDropdownOpen && (
                  <div 
                    onMouseLeave={() => setVehiclesDropdownOpen(false)}
                    className="absolute left-0 top-full w-72 bg-white shadow-xl border border-[#e5e5e5] py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    <div className="px-4 py-2 border-b border-[#f0f0f0] text-[11px] font-nissan-bold tracking-widest text-[#888888] uppercase">
                      ALL NISSAN CARS
                    </div>
                    <button
                      onClick={() => { onSelectCar('nissan-tekton'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] transition-colors border-b border-[#f5f5f5]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] flex items-center justify-between">
                        <span>Tekton</span>
                        <span className="text-[10px] bg-red-100 text-[#c3002f] px-1.5 py-0.5 rounded-xs font-nissan-bold">NEW</span>
                      </div>
                      <div className="text-[12px] text-[#666666]">All-New Compact SUV</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-gravite'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] transition-colors border-b border-[#f5f5f5]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] flex items-center justify-between">
                        <span>Gravite & CNG</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-xs font-nissan-bold">28.5 km/kg</span>
                      </div>
                      <div className="text-[12px] text-[#666666]">Dual-Cylinder Bi-Fuel SUV</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-magnite'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] transition-colors border-b border-[#f5f5f5]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111] flex items-center justify-between">
                        <span>New Magnite</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-xs font-nissan-bold">5-STAR NCAP</span>
                      </div>
                      <div className="text-[12px] text-[#666666]">Compact SUV (6 Airbags)</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-kuro'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] transition-colors border-b border-[#f5f5f5]"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111]">
                        Magnite KURO Edition
                      </div>
                      <div className="text-[12px] text-[#666666]">All-Black Special Edition</div>
                    </button>
                    <button
                      onClick={() => { onSelectCar('nissan-x-trail'); setVehiclesDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f9f9f9] transition-colors"
                    >
                      <div className="text-[14px] font-nissan-bold text-[#111111]">
                        X-TRAIL
                      </div>
                      <div className="text-[12px] text-[#666666]">Premium 7-Seater VC-Turbo</div>
                    </button>
                    <div className="p-3 bg-[#fcfcfc] border-t border-[#f0f0f0]">
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
                className="btn-mui-text text-[11px] xl:text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] hover:text-[#c3002f] py-1 px-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                Showroom
              </button>

              <button
                id="nav-emi-btn"
                onClick={onOpenEmi}
                className="btn-mui-text text-[11px] xl:text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] hover:text-[#c3002f] py-1 px-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                Check EMI
              </button>

              <button
                id="nav-brochure-btn"
                onClick={onOpenBrochure}
                className="btn-mui-text text-[11px] xl:text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] hover:text-[#c3002f] py-1 px-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                Brochure
              </button>

              <button
                id="nav-dealers-btn"
                onClick={onOpenDealer}
                className="btn-mui-text text-[11px] xl:text-[11.5px] font-nissan-bold tracking-[0.2px] text-[#111111] hover:text-[#c3002f] py-1 px-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                Dealers
              </button>
            </nav>
          </div>

          {/* Action CTAs - Shrunk, single-line buttons */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {/* Account Profile if signed in */}
            {user && (
              <div className="relative shrink-0">
                <button
                  id="header-user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 py-1 px-2 border border-[#e5e5e5] hover:border-[#c3002f] transition-colors cursor-pointer bg-[#fafafa] whitespace-nowrap shrink-0"
                >
                  <div className="w-5 h-5 rounded-full bg-[#c3002f] text-white flex items-center justify-center text-[10px] font-nissan-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-nissan-bold text-[#111111] whitespace-nowrap">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${userDropdownOpen ? 'rotate-180 text-[#c3002f]' : 'text-gray-500'}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-64 bg-white border border-[#e5e5e5] shadow-xl py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2.5 border-b border-[#f0f0f0]">
                      <div className="text-[14px] font-nissan-bold text-[#111111]">{user.name}</div>
                      <div className="text-[12px] text-[#777777] truncate">{user.email}</div>
                      <div className="text-[11px] text-[#c3002f] font-nissan-bold mt-1 uppercase">
                        Tara Nissan Privileged Member
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onOpenTestDrive();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-[#333333] hover:bg-[#f9f9f9] hover:text-[#c3002f] flex items-center justify-between"
                    >
                      <span>Bookings & Test Drives</span>
                      <ShieldCheck className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                      onClick={() => {
                        onOpenEmi();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-[#333333] hover:bg-[#f9f9f9] hover:text-[#c3002f] flex items-center justify-between border-b border-[#f0f0f0]"
                    >
                      <span>My EMI Quotes</span>
                      <Calculator className="w-4 h-4 text-gray-400" />
                    </button>

                    <button
                      onClick={() => {
                        onSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2 font-nissan-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>SIGN OUT</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Book Test Drive Icon Button with Hover Tooltip */}
            <div className="relative group/testdrive shrink-0">
              <button
                id="header-cta-testdrive"
                onClick={onOpenTestDrive}
                className="w-8 h-8 rounded-full border border-[#111111] hover:border-[#c3002f] bg-white hover:bg-[#c3002f] text-[#111111] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
                title="Book Test Drive"
                aria-label="Book Test Drive"
              >
                <Car className="w-4 h-4 transition-transform group-hover/testdrive:scale-110" />
              </button>

              {/* Tooltip on hover */}
              <div 
                role="tooltip"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[#111111] text-white text-[10.5px] font-nissan-bold tracking-wide rounded-xs shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover/testdrive:opacity-100 transition-all duration-200 z-50 pointer-events-none"
              >
                Book Test Drive
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111] rotate-45" />
              </div>
            </div>

            <button
              id="header-cta-book"
              onClick={onOpenTestDrive}
              className="btn-mui-contained text-[10.5px] xl:text-[11px] tracking-[0.2px] px-2.5 py-1 min-h-[32px] whitespace-nowrap shrink-0 leading-tight"
            >
              Book Online
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="mobile-testdrive-quick-btn"
              onClick={onOpenTestDrive}
              className="btn-nissan-primary text-[12px] py-2 px-3"
            >
              TEST DRIVE
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#c3002f] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e5e5e5] px-4 pt-3 pb-6 space-y-3">
          {/* User Mobile Card */}
          {user ? (
            <div className="bg-[#f6f6f6] p-3.5 border border-[#e5e5e5] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c3002f] text-white flex items-center justify-center font-nissan-bold text-[13px]">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-nissan-bold text-[#111111]">{user.name}</div>
                  <div className="text-[11px] text-[#666666]">{user.city || 'Tara Nissan Member'}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onSignOut();
                  setMobileMenuOpen(false);
                }}
                className="text-[12px] font-nissan-bold text-red-600 uppercase tracking-wider px-2 py-1 hover:bg-red-50"
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
                className="flex-1 btn-nissan-secondary text-[12px] py-2.5 justify-center"
              >
                SIGN IN
              </button>
              <button
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 btn-nissan-primary text-[12px] py-2.5 justify-center"
              >
                CREATE ACCOUNT
              </button>
            </div>
          )}

          <div className="text-[11px] font-nissan-bold tracking-widest text-[#888888] uppercase pt-2">
            NISSAN CARS
          </div>
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => { onSelectCar('nissan-tekton'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] border border-[#eeeeee] text-[13px] font-nissan-bold text-[#111111]"
            >
              Tekton (New)
            </button>
            <button
              onClick={() => { onSelectCar('nissan-gravite'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] border border-[#eeeeee] text-[13px] font-nissan-bold text-[#111111]"
            >
              Gravite & CNG
            </button>
            <button
              onClick={() => { onSelectCar('nissan-magnite'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] border border-[#eeeeee] text-[13px] font-nissan-bold text-[#111111]"
            >
              New Magnite
            </button>
            <button
              onClick={() => { onSelectCar('nissan-x-trail'); setMobileMenuOpen(false); }}
              className="text-left p-2.5 bg-[#f9f9f9] border border-[#eeeeee] text-[13px] font-nissan-bold text-[#111111]"
            >
              X-TRAIL 7-Seater
            </button>
          </div>

          <button
            onClick={() => scrollToSection('vehicle-lineup-section')}
            className="w-full text-left py-3 border-b border-[#f0f0f0] text-[14px] font-nissan-bold uppercase tracking-[1.5px] text-[#111111]"
          >
            VIEW ALL VEHICLES
          </button>

          <button
            onClick={() => { onOpenEmi(); setMobileMenuOpen(false); }}
            className="w-full text-left py-3 border-b border-[#f0f0f0] text-[14px] font-nissan-bold uppercase tracking-[1.5px] text-[#111111] flex items-center justify-between"
          >
            <span>CHECK YOUR EMI</span>
            <Calculator className="w-4 h-4 text-[#c3002f]" />
          </button>

          <button
            onClick={() => { onOpenBrochure(); setMobileMenuOpen(false); }}
            className="w-full text-left py-3 border-b border-[#f0f0f0] text-[14px] font-nissan-bold uppercase tracking-[1.5px] text-[#111111] flex items-center justify-between"
          >
            <span>DOWNLOAD BROCHURE</span>
            <FileText className="w-4 h-4 text-[#c3002f]" />
          </button>

          <button
            onClick={() => { onOpenDealer(); setMobileMenuOpen(false); }}
            className="w-full text-left py-3 border-b border-[#f0f0f0] text-[14px] font-nissan-bold uppercase tracking-[1.5px] text-[#111111] flex items-center justify-between"
          >
            <span>FIND A DEALER</span>
            <MapPin className="w-4 h-4 text-[#c3002f]" />
          </button>

          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => { onOpenTestDrive(); setMobileMenuOpen(false); }}
              className="w-full btn-nissan-primary justify-center"
            >
              BOOK A TEST DRIVE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
