import React from 'react';

interface TaraNissanLogoProps {
  theme?: 'light' | 'dark';
  className?: string;
  svgClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
}

export const TaraNissanLogo: React.FC<TaraNissanLogoProps> = ({
  theme = 'light',
  className = '',
  svgClassName = '',
  size = 'md',
  showText = true,
  showSubtitle = false,
}) => {
  const isDark = theme === 'dark';

  const heights = {
    sm: 'h-8',
    md: 'h-11 lg:h-[54px] xl:h-[58px]',
    lg: 'h-13 lg:h-[64px] xl:h-[70px]',
    xl: 'h-16 lg:h-20 xl:h-24',
  }[size];

  const primaryTextColor = isDark ? '#FFFFFF' : '#111111';
  const subTextColor = isDark ? '#A3A3A3' : '#666666';
  const ringColor = isDark ? '#E5E5E5' : '#1F2428';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 460 110"
        className={`${heights} ${svgClassName} w-auto max-w-full transition-all duration-200`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Tara Nissan Brand Logo"
      >
        <defs>
          {/* Crimson Red Gradient */}
          <linearGradient id="taraRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E00034" />
            <stop offset="60%" stopColor="#C3002F" />
            <stop offset="100%" stopColor="#8C0022" />
          </linearGradient>

          {/* Platinum Ring Gradient */}
          <linearGradient id="taraMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#FFFFFF' : '#2D3436'} />
            <stop offset="50%" stopColor={isDark ? '#D1D5DB' : '#111111'} />
            <stop offset="100%" stopColor={isDark ? '#9CA3AF' : '#374151'} />
          </linearGradient>

          {/* Subtle Glow */}
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C3002F" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ========================================================= */}
        {/* ORIGINAL BESPOKE EMBLEM: "TARA" (THE GUIDING STAR) + "NISSAN" SPEED WING */}
        {/* ========================================================= */}
        <g transform="translate(10, 10)">
          {/* Outer Horizon Ring / Speed Arc */}
          <path
            d="M 45 6
               A 39 39 0 1 0 81 55
               L 72 52
               A 31 31 0 1 1 45 14
               A 31 31 0 0 1 73 27
               L 81 22
               A 39 39 0 0 0 45 6 Z"
            fill="url(#taraMetalGrad)"
          />

          {/* Left Wing Horizon Streak */}
          <path
            d="M 6 45
               C 18 43, 30 45, 39 45
               L 37 49
               C 27 49, 15 48, 6 45 Z"
            fill="url(#taraMetalGrad)"
          />

          {/* Right Aerodynamic Speed Trail (cutting through the circle) */}
          <path
            d="M 51 45
               L 88 45
               C 80 49, 68 49, 53 49
               L 51 45 Z"
            fill="url(#taraMetalGrad)"
          />

          {/* TARA STAR & DYNAMIC 'T' MONOGRAM IN NISSAN RED */}
          <g filter="url(#subtleGlow)">
            {/* Upper Star Apex & Crossbar Wing of 'T' */}
            <path
              d="M 45 10
                 C 47 24, 53 32, 70 34
                 C 56 36, 49 42, 45 54
                 C 41 42, 34 36, 20 34
                 C 37 32, 43 24, 45 10 Z"
              fill="url(#taraRedGrad)"
            />

            {/* Central Vertical Pillar of the 'T' with Diamond Facet */}
            <path
              d="M 42 34
                 L 48 34
                 L 46 72
                 C 46 76, 44 76, 44 76
                 L 42 72
                 Z"
              fill="#C3002F"
            />

            {/* Center Core Spark / Diamond Accent */}
            <polygon
              points="45,26 49,34 45,42 41,34"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>

          {/* Red Horizon Indicator Line under Star */}
          <path
            d="M 28 66
               L 62 66
               C 56 68, 34 68, 28 66 Z"
            fill="#C3002F"
          />
        </g>

        {/* ========================================================= */}
        {/* TYPOGRAPHY: TARA NISSAN */}
        {/* ========================================================= */}
        {showText && (
          <g transform="translate(115, 0)">
            {/* Main Brand Title: TARA NISSAN */}
            <text
              x="0"
              y="56"
              fill={primaryTextColor}
              style={{
                fontFamily: '"Nissan Bold", "Montserrat", "Segoe UI", sans-serif',
                fontWeight: 800,
                fontSize: '36px',
                letterSpacing: '3.5px',
                textTransform: 'uppercase',
              }}
            >
              TARA <tspan fill="#C3002F">NISSAN</tspan>
            </text>

            {/* Subtitle / Tagline */}
            <text
              x="2"
              y="78"
              fill={subTextColor}
              style={{
                fontFamily: '"Nissan Regular", Verdana, sans-serif',
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
              }}
            >
              {showSubtitle ? 'DEALERSHIP NETWORK • INNOVATION THAT EXCITES' : 'AUTHORIZED DEALERSHIP'}
            </text>

            {/* Sleek red baseline accent line */}
            <rect
              x="2"
              y="85"
              width="60"
              height="2.5"
              fill="#C3002F"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
