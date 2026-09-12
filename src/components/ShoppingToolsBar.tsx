import React from 'react';
import { Calculator, Tag, FileDown, MapPin, Calendar } from 'lucide-react';

interface ShoppingToolsBarProps {
  onOpenEmi: () => void;
  onOpenPrices: () => void;
  onOpenBrochure: () => void;
  onOpenDealer: () => void;
  onOpenTestDrive: () => void;
}

export const ShoppingToolsBar: React.FC<ShoppingToolsBarProps> = ({
  onOpenEmi,
  onOpenPrices,
  onOpenBrochure,
  onOpenDealer,
  onOpenTestDrive,
}) => {
  const tools = [
    {
      id: 'tool-emi',
      title: 'CHECK YOUR EMI',
      subtitle: 'Calculate monthly loan installments',
      icon: Calculator,
      onClick: onOpenEmi,
    },
    {
      id: 'tool-prices',
      title: 'PRICES & VARIANTS',
      subtitle: 'Explore full price range across models',
      icon: Tag,
      onClick: onOpenPrices,
    },
    {
      id: 'tool-brochure',
      title: 'DOWNLOAD BROCHURE',
      subtitle: 'Official e-brochure & specifications',
      icon: FileDown,
      onClick: onOpenBrochure,
    },
    {
      id: 'tool-dealer',
      title: 'FIND A DEALER',
      subtitle: 'Locate authorized showrooms & service',
      icon: MapPin,
      onClick: onOpenDealer,
    },
    {
      id: 'tool-test-drive',
      title: 'BOOK A TEST DRIVE',
      subtitle: 'Experience your preferred Nissan car',
      icon: Calendar,
      onClick: onOpenTestDrive,
    },
  ];

  return (
    <section 
      id="shopping-tools-strip"
      className="bg-[#141414] text-white border-b border-[#262626] relative z-20 shadow-md"
      aria-label="Nissan Shopping Tools"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-[#262626]">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                id={t.id}
                onClick={t.onClick}
                className="flex flex-col items-center justify-center p-5 group hover:bg-[#1f1f1f] transition-all text-center cursor-pointer relative"
              >
                <div className="w-10 h-10 rounded-full bg-[#222222] group-hover:bg-[#c3002f] flex items-center justify-center transition-colors mb-3">
                  <Icon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                </div>
                <span className="nissan-cta-text text-[13px] text-white group-hover:text-[#ffffff] tracking-wider mb-1 block">
                  {t.title}
                </span>
                <span className="text-[11px] text-[#999999] font-nissan-regular hidden sm:block">
                  {t.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
