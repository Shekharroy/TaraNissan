import React from 'react';
import { ShieldCheck, Cpu, Home, ArrowRight } from 'lucide-react';

interface SpotlightSectionProps {
  onExploreSafety: () => void;
  onExploreTech: () => void;
  onExploreDigital: () => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  onExploreSafety,
  onExploreTech,
  onExploreDigital,
}) => {
  return (
    <section 
      id="spotlight-section"
      className="py-16 sm:py-24 bg-[#f6f6f6] dark:bg-[#0f0f0f] border-b border-[#e5e5e5] dark:border-[#222222] transition-colors duration-200"
      aria-label="Nissan Spotlight & Innovation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Nissan India */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="nissan-strapline text-[#c3002f] mb-2">
            NISSAN INNOVATION
          </div>
          <h2 className="nissan-section-title text-[#111111] dark:text-white tracking-wide mb-4">
            SPOTLIGHT & BRAND TECHNOLOGIES
          </h2>
          <div className="w-16 h-1 bg-[#c3002f] mx-auto mb-4" />
          <p className="nissan-body-text dark:text-[#b5b5b5]">
            Pioneering Japanese engineering, smart safety systems, and seamless ownership designed to enrich everyday mobility across India.
          </p>
        </div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: 5-Star NCAP Safety */}
          <div className="bg-white dark:bg-[#181818] border border-[#e5e5e5] dark:border-[#2a2a2a] p-8 flex flex-col justify-between hover:shadow-lg dark:hover:border-neutral-500 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 text-[#c3002f] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-widest mb-1">
                UNCOMPROMISED PROTECTION
              </div>
              <h3 className="text-[22px] font-nissan-bold text-[#111111] dark:text-white mb-3">
                5-Star NCAP Crash Safety Standard
              </h3>
              <p className="text-[15px] text-[#555555] dark:text-[#a8a8a8] font-nissan-regular leading-relaxed mb-6">
                Safety without compromise. Every New Magnite comes standard with 6 airbags, electronic stability control, and vehicle dynamic control to keep you and your loved ones secure.
              </p>

              {/* Real vehicle image from nissan.in */}
              <div className="h-44 overflow-hidden mb-6 bg-[#fcfcfc] dark:bg-[#202020] flex items-center justify-center border border-[#eeeeee] dark:border-[#2a2a2a]">
                <img
                  src="https://www.nissan.in/content/dam/Nissan/in/vehicles/new-magnite/Images/2-Nissan-MC-Image-300x159-v1.jpg.ximg.l_3_m.smart.jpg"
                  alt="Nissan 5-Star Safety"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button
              onClick={onExploreSafety}
              className="text-[13px] font-nissan-bold text-[#111111] dark:text-white group-hover:text-[#c3002f] dark:group-hover:text-[#ff3b5c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            >
              <span>Explore Safety Standards</span>
              <ArrowRight className="w-4 h-4 text-[#c3002f]" />
            </button>
          </div>

          {/* Card 2: Nissan Intelligent Mobility */}
          <div className="bg-white dark:bg-[#181818] border border-[#e5e5e5] dark:border-[#2a2a2a] p-8 flex flex-col justify-between hover:shadow-lg dark:hover:border-neutral-500 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-[#252525] text-[#111111] dark:text-white flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-[#c3002f]" />
              </div>

              <div className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-widest mb-1">
                INTELLIGENT MOBILITY
              </div>
              <h3 className="text-[22px] font-nissan-bold text-[#111111] dark:text-white mb-3">
                Next-Gen Level 2 ADAS & VC-Turbo
              </h3>
              <p className="text-[15px] text-[#555555] dark:text-[#a8a8a8] font-nissan-regular leading-relaxed mb-6">
                From Variable Compression Turbo technology on the X-TRAIL to intelligent Level 2 ADAS on Tekton, experience cutting-edge autonomy and connected drive intelligence.
              </p>

              {/* Real vehicle image from nissan.in */}
              <div className="h-44 overflow-hidden mb-6 bg-[#fcfcfc] dark:bg-[#202020] flex items-center justify-center border border-[#eeeeee] dark:border-[#2a2a2a]">
                <img
                  src="https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/images/Homepage-Desktop-&-Mobile-Banner-320x188.jpg.ximg.l_3_m.smart.jpg"
                  alt="Nissan Intelligent Mobility"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button
              onClick={onExploreTech}
              className="text-[13px] font-nissan-bold text-[#111111] dark:text-white group-hover:text-[#c3002f] dark:group-hover:text-[#ff3b5c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            >
              <span>Explore Intelligence</span>
              <ArrowRight className="w-4 h-4 text-[#c3002f]" />
            </button>
          </div>

          {/* Card 3: Nissan@HOME */}
          <div className="bg-white dark:bg-[#181818] border border-[#e5e5e5] dark:border-[#2a2a2a] p-8 flex flex-col justify-between hover:shadow-lg dark:hover:border-neutral-500 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-[#252525] text-[#111111] dark:text-white flex items-center justify-center mb-6">
                <Home className="w-6 h-6 text-[#c3002f]" />
              </div>

              <div className="text-[12px] font-nissan-bold text-[#c3002f] uppercase tracking-widest mb-1">
                DIGITAL BUYING EXPERIENCE
              </div>
              <h3 className="text-[22px] font-nissan-bold text-[#111111] dark:text-white mb-3">
                Nissan@HOME Doorstep Services
              </h3>
              <p className="text-[15px] text-[#555555] dark:text-[#a8a8a8] font-nissan-regular leading-relaxed mb-6">
                Book, configure, test drive, and finance your favorite Nissan right from your living room. Transparent exchange appraisals and doorstep vehicle handovers guaranteed.
              </p>

              {/* Real vehicle image from nissan.in */}
              <div className="h-44 overflow-hidden mb-6 bg-[#fcfcfc] dark:bg-[#202020] flex items-center justify-center border border-[#eeeeee] dark:border-[#2a2a2a]">
                <img
                  src="https://www.nissan.in/content/dam/Nissan/in/vehicles/gravite/overview/320x188-Dealer-Website-Vehicle-Image-25febv1.jpg.ximg.l_3_m.smart.jpg"
                  alt="Nissan@HOME Experience"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button
              onClick={onExploreDigital}
              className="text-[13px] font-nissan-bold text-[#111111] dark:text-white group-hover:text-[#c3002f] dark:group-hover:text-[#ff3b5c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            >
              <span>Learn About Nissan@HOME</span>
              <ArrowRight className="w-4 h-4 text-[#c3002f]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
