import React from 'react';
import { TaraNissanLogo } from './TaraNissanLogo';

interface FooterProps {
  onOpenEmi: () => void;
  onOpenDealer: () => void;
  onOpenBrochure: () => void;
  onOpenTestDrive: () => void;
  onSelectCar: (carId: string) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEmi,
  onOpenDealer,
  onOpenBrochure,
  onOpenTestDrive,
  onSelectCar,
  onOpenAuth,
}) => {
  return (
    <footer className="bg-[#111111] text-white border-t border-[#222222]">
      {/* Upper Footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div id="footer-tara-nissan-logo" className="py-1">
              <TaraNissanLogo theme="dark" size="lg" />
            </div>
            <p className="text-[14px] text-[#999999] font-nissan-regular max-w-sm leading-relaxed">
              Tara Nissan is an authorized flagship dealership partner for Nissan Motor India. Dedicated to delivering authentic Japanese engineering, transparent ownership, and world-class service experiences across India.
            </p>
            <div className="pt-2 text-[13px] text-[#cccccc]">
              Tara Nissan Customer Support: <strong className="text-white">1800 209 3456</strong> (Toll Free, 24x7)
            </div>
          </div>

          {/* Col 2: Nissan Vehicles */}
          <div>
            <h4 className="text-[13px] font-nissan-bold uppercase tracking-[1.5px] text-white mb-4 border-b border-[#333333] pb-2">
              VEHICLES
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#aaaaaa]">
              <li>
                <button
                  onClick={() => onSelectCar('nissan-tekton')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All-New Tekton (SUV)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCar('nissan-gravite')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nissan Gravite & CNG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCar('nissan-magnite')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Magnite (5-Star NCAP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCar('nissan-kuro')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Magnite KURO Special Edition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCar('nissan-x-trail')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nissan X-TRAIL (7-Seater)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Shopping Tools */}
          <div>
            <h4 className="text-[13px] font-nissan-bold uppercase tracking-[1.5px] text-white mb-4 border-b border-[#333333] pb-2">
              SHOPPING TOOLS
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#aaaaaa]">
              <li>
                <button
                  onClick={onOpenEmi}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Check Your EMI
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTestDrive}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Book A Test Drive
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrochure}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Download E-Brochure
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDealer}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Find A Dealership
                </button>
              </li>
              <li>
                <a
                  href="https://www.nissan.in/prices-list.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Price List Pan-India
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Owner Services */}
          <div>
            <h4 className="text-[13px] font-nissan-bold uppercase tracking-[1.5px] text-white mb-4 border-b border-[#333333] pb-2">
              OWNER SERVICES
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#aaaaaa]">
              <li>
                <a href="https://one.nissan.in/login?utm_source=bookaservice" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Book A Service
                </a>
              </li>
              <li>
                <a href="https://www.nissan.in/ownership/service-network.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Nissan Service Network
                </a>
              </li>
              <li>
                <a href="https://www.nissan.in/ownership/accessories.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Genuine Accessories
                </a>
              </li>
              <li>
                <a href="https://www.nissan.in/ownership/extended-warranty.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Extended Warranty & RSA
                </a>
              </li>
              <li>
                <a href="https://www.nissan.in/ownership/recall-information.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Recall Information
                </a>
              </li>
              {onOpenAuth && (
                <>
                  <li className="pt-2 border-t border-[#2a2a2a]">
                    <button
                      onClick={() => onOpenAuth('signin')}
                      className="text-[#c3002f] hover:underline font-nissan-bold uppercase tracking-wider text-[12px] block text-left cursor-pointer"
                    >
                      Tara Nissan Member Login &rarr;
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onOpenAuth('signup')}
                      className="text-white hover:text-[#c3002f] font-nissan-bold uppercase tracking-wider text-[12px] block text-left cursor-pointer"
                    >
                      Create Dealership Account
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimers Bar matching Nissan.in */}
      <div className="border-t border-[#262626] bg-[#0c0c0c] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-[11px] text-[#777777] leading-relaxed font-nissan-regular">
            *Prices mentioned are indicative ex-showroom prices for base variants and are subject to change without prior notice. Final on-road prices depend on statutory charges, RTO taxes, insurance, optional accessories, and logistics. Fuel efficiency figures mentioned are certified by test agencies under Rule 115 of CMVR 1989. Actual performance may vary based on driving behavior and traffic conditions. All car images used are official digital representations courtesy of Nissan Motor India (https://www.nissan.in/).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1a1a1a] text-[12px] text-[#888888]">
            <div>
              &copy; {new Date().getFullYear()} Nissan Motor India Pvt. Ltd. All Rights Reserved.
            </div>

            <div className="flex flex-wrap gap-4 text-[12px]">
              <a href="https://www.nissan.in/legal-privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="https://www.nissan.in/terms-and-conditions.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <span>|</span>
              <a href="https://www.nissan.in/sitemap.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Site Map
              </a>
              <span>|</span>
              <a href="https://www.nissan.in/contact-us.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
