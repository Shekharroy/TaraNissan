/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ShoppingToolsBar } from './components/ShoppingToolsBar';
import { VehicleLineup } from './components/VehicleLineup';
import { SpotlightSection } from './components/SpotlightSection';
import { NewsSection } from './components/NewsSection';
import { Footer } from './components/Footer';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { EmiCalculatorModal } from './components/EmiCalculatorModal';
import { BrochureModal } from './components/BrochureModal';
import { DealerLocatorModal } from './components/DealerLocatorModal';
import { TestDriveModal } from './components/TestDriveModal';
import { AuthModal } from './components/AuthModal';
import { CustomerDashboardModal } from './components/CustomerDashboardModal';
import { AdminRBACPortalModal } from './components/AdminRBACPortalModal';
import { FloatingCTABar } from './components/FloatingCTABar';
import { CAR_MODELS } from './data/nissanData';
import { CarModel, UserProfile } from './types';

export default function App() {
  // Global Dark Mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tara_nissan_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      try {
        localStorage.setItem('tara_nissan_theme', 'dark');
      } catch {}
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('tara_nissan_theme', 'light');
      } catch {}
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Authentication state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('tara_nissan_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      const actualUser = parsed?.user || parsed;
      if (!actualUser || typeof actualUser !== 'object') return null;
      const validName = actualUser.name || actualUser.fullName || (actualUser.email ? actualUser.email.split('@')[0] : 'Member');
      return {
        ...actualUser,
        name: validName,
        role: actualUser.role || 'customer',
      };
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [selectedCarModal, setSelectedCarModal] = useState<CarModel | null>(null);
  const [isEmiOpen, setIsEmiOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isDealerOpen, setIsDealerOpen] = useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isCustomerDashboardOpen, setIsCustomerDashboardOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  // Active target vehicle for modals
  const [activeCarId, setActiveCarId] = useState<string>(CAR_MODELS[0].id);
  const [activeDealerName, setActiveDealerName] = useState<string>('');

  const activeCar = CAR_MODELS.find((c) => c.id === activeCarId) || selectedCarModal || CAR_MODELS[0];

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    try {
      localStorage.setItem('tara_nissan_user', JSON.stringify(authenticatedUser));
    } catch (e) {
      console.error(e);
    }
    setToastMessage(`Welcome, ${authenticatedUser.name}! You are now signed in.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('tara_nissan_user');
    } catch (e) {
      console.error(e);
    }
    setToastMessage('You have been signed out successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCarDetail = (carId: string) => {
    const car = CAR_MODELS.find((c) => c.id === carId);
    if (car) {
      setSelectedCarModal(car);
    }
  };

  const handleOpenTestDrive = (carId?: string) => {
    if (carId) setActiveCarId(carId);
    setIsTestDriveOpen(true);
  };

  const handleOpenEmi = (carId?: string) => {
    if (carId) setActiveCarId(carId);
    setIsEmiOpen(true);
  };

  const handleOpenBrochure = (carId?: string) => {
    if (carId) setActiveCarId(carId);
    setIsBrochureOpen(true);
  };

  const handleOpenPrices = () => {
    const lineupEl = document.getElementById('vehicle-lineup-section');
    if (lineupEl) {
      lineupEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDealerSelectedForTestDrive = (dealerName: string) => {
    setActiveDealerName(dealerName);
    setIsTestDriveOpen(true);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white dark:bg-[#0d0d0d] text-[#111111] dark:text-[#f3f4f6] flex flex-col font-nissan-regular selection:bg-[#c3002f] selection:text-white transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] dark:bg-[#1a1a1a] text-white px-5 py-3 border-l-4 border-[#c3002f] shadow-2xl flex items-center gap-3 text-[14px] font-nissan-regular animate-in slide-in-from-bottom-3 border border-neutral-700/50">
          <div className="w-2 h-2 rounded-full bg-[#c3002f] animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 text-neutral-400 hover:text-white text-[12px] cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Header with brand logo, nav links, dark mode toggle and quick CTAs */}
      <Header
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        onOpenEmi={() => handleOpenEmi()}
        onOpenDealer={() => setIsDealerOpen(true)}
        onOpenTestDrive={() => handleOpenTestDrive()}
        onOpenBrochure={() => handleOpenBrochure()}
        onSelectCar={handleOpenCarDetail}
        onOpenCustomerDashboard={() => setIsCustomerDashboardOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 2. Hero Banner slider with verified Nissan.in CDN images */}
        <HeroBanner
          onSelectCar={handleOpenCarDetail}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenEmi={handleOpenEmi}
          onOpenBrochure={handleOpenBrochure}
          onOpenDealer={() => setIsDealerOpen(true)}
        />

        {/* 3. Official Shopping Tools strip */}
        <ShoppingToolsBar
          onOpenEmi={() => handleOpenEmi()}
          onOpenPrices={handleOpenPrices}
          onOpenBrochure={() => handleOpenBrochure()}
          onOpenDealer={() => setIsDealerOpen(true)}
          onOpenTestDrive={() => handleOpenTestDrive()}
        />

        {/* 4. Complete Vehicle Lineup showroom */}
        <VehicleLineup
          onSelectCar={handleOpenCarDetail}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenEmi={handleOpenEmi}
        />

        {/* 5. Spotlight: Safety, Level 2 ADAS & Nissan@HOME */}
        <SpotlightSection
          onExploreSafety={() => handleOpenCarDetail('nissan-magnite')}
          onExploreTech={() => handleOpenCarDetail('nissan-tekton')}
          onExploreDigital={() => setIsDealerOpen(true)}
        />

        {/* 6. Press & Announcements */}
        <NewsSection />
      </main>

      {/* 7. Comprehensive Footer */}
      <Footer
        onOpenEmi={() => handleOpenEmi()}
        onOpenDealer={() => setIsDealerOpen(true)}
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenTestDrive={() => handleOpenTestDrive()}
        onSelectCar={handleOpenCarDetail}
        onOpenAuth={handleOpenAuth}
      />

      {/* Modals */}
      {selectedCarModal && (
        <VehicleDetailModal
          car={selectedCarModal}
          onClose={() => setSelectedCarModal(null)}
          onOpenTestDrive={(id) => {
            setSelectedCarModal(null);
            handleOpenTestDrive(id);
          }}
          onOpenEmi={(id) => {
            setSelectedCarModal(null);
            handleOpenEmi(id);
          }}
          onOpenBrochure={(id) => {
            setSelectedCarModal(null);
            handleOpenBrochure(id);
          }}
        />
      )}

      {isEmiOpen && (
        <EmiCalculatorModal
          initialCarId={activeCarId}
          isOpen={isEmiOpen}
          onClose={() => setIsEmiOpen(false)}
          onBookNow={(id) => {
            setIsEmiOpen(false);
            handleOpenTestDrive(id);
          }}
        />
      )}

      {isBrochureOpen && (
        <BrochureModal
          initialCarId={activeCarId}
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
          onBookTestDrive={(id) => {
            setIsBrochureOpen(false);
            handleOpenTestDrive(id);
          }}
        />
      )}

      {isDealerOpen && (
        <DealerLocatorModal
          isOpen={isDealerOpen}
          onClose={() => setIsDealerOpen(false)}
          onSelectDealerForTestDrive={handleDealerSelectedForTestDrive}
        />
      )}

      {isTestDriveOpen && (
        <TestDriveModal
          initialCarId={activeCarId}
          initialDealerName={activeDealerName}
          isOpen={isTestDriveOpen}
          onClose={() => {
            setIsTestDriveOpen(false);
            setActiveDealerName('');
          }}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          initialMode={authInitialMode}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {isCustomerDashboardOpen && (
        <CustomerDashboardModal
          isOpen={isCustomerDashboardOpen}
          onClose={() => setIsCustomerDashboardOpen(false)}
          currentUser={user}
          onOpenTestDrive={(carId) => handleOpenTestDrive(carId)}
        />
      )}

      {isAdminPortalOpen && (
        <AdminRBACPortalModal
          isOpen={isAdminPortalOpen}
          onClose={() => setIsAdminPortalOpen(false)}
          currentUser={user}
          onRoleSwitched={(rawUser) => {
            const actualUser = (rawUser as any)?.user || rawUser;
            const normalizedUser: UserProfile = {
              ...actualUser,
              name: actualUser.name || actualUser.fullName || 'Staff User',
              role: actualUser.role || 'customer',
            };
            setUser(normalizedUser);
            try {
              localStorage.setItem('tara_nissan_user', JSON.stringify(normalizedUser));
            } catch (e) {
              console.error(e);
            }
            const roleDisplay = (normalizedUser.role || 'customer').replace('_', ' ').toUpperCase();
            setToastMessage(`Switched to ${roleDisplay} role`);
            setTimeout(() => setToastMessage(null), 3500);
          }}
        />
      )}

      {/* Direct Telephony FAB, Staff Portal FAB and Floating WhatsApp Instant Communication */}
      <FloatingCTABar 
        selectedCarName={activeCar?.name ? `Nissan ${activeCar.name}` : 'Nissan Tekton'} 
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />
    </div>
  );
}

