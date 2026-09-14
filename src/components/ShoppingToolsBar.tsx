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
      className="bg-white dark:bg-[#141414] text-[#111111] dark:text-white border-b border-[#e5e5e5] dark:border-[#262626] relative z-20 shadow-xs transition-colors w-full"
      aria-label="Nissan Shopping Tools"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-l border-t border-[#e5e5e5] dark:border-[#262626]">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                id={t.id}
                onClick={t.onClick}
                className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-4 lg:p-5 group hover:bg-[#f8f8f8] dark:hover:bg-[#1f1f1f] transition-all text-center cursor-pointer relative border-r border-b border-[#e5e5e5] dark:border-[#262626] last:col-span-2 sm:last:col-span-1 md:last:col-span-1"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f0f0f0] dark:bg-[#222222] group-hover:bg-[#c3002f] flex items-center justify-center transition-colors mb-2 sm:mb-3 shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#333333] dark:text-white group-hover:text-white transition-transform group-hover:scale-110" />
                </div>
                <span className="nissan-cta-text text-[11px] sm:text-[12px] md:text-[12px] lg:text-[13px] text-[#111111] dark:text-white group-hover:text-[#c3002f] dark:group-hover:text-white tracking-wider mb-0.5 sm:mb-1 block leading-tight">
                  {t.title}
                </span>
                <span className="text-[10px] sm:text-[10.5px] md:text-[11px] text-[#666666] dark:text-[#999999] font-nissan-regular hidden sm:block">
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
