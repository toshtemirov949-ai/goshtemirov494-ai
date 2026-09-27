import React from 'react';

interface ZiyoTalimLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textSize?: string;
  textColorMode?: 'auto' | 'light' | 'dark';
}

/**
 * Ziyo Talim rasmiy logotipi (Aynan foydalanuvchi taqdim etgan dizayn asosida):
 * - Toʻq koʻk rangdagi akademik shlyapa (Mortarboard cap & Tassel)
 * - Zamonaviy yorqin koʻk rangdagi stilizatsiyalangan "Z" harfi va tillarang uchburchak
 * - Ochiq kitob: tilla/toʻq sariq va toʻq koʻk sahifalar
 * - "Ziyo" (toʻq koʻk) va "talim" (yorqin toʻq sariq) yozuvi
 */
export const ZiyoTalimLogo: React.FC<ZiyoTalimLogoProps> = ({
  className = '',
  size = 54,
  showText = true,
  textSize,
  textColorMode = 'auto',
}) => {
  const numericSize = typeof size === 'number' ? size : parseInt(size, 10) || 54;
  const isDarkClass = textColorMode === 'light' 
    ? 'text-white' 
    : textColorMode === 'dark' 
    ? 'text-[#0B2B63]' 
    : 'text-[#0B2B63] dark:text-white';

  // Dynamic font sizing based on emblem size if not explicitly provided
  const textClass = textSize 
    ? textSize 
    : numericSize >= 50 
    ? 'text-2xl sm:text-[28px]' 
    : numericSize >= 40 
    ? 'text-xl sm:text-2xl' 
    : 'text-lg';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Vector Emblem */}
      <svg
        width={numericSize}
        height={numericSize}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-label="Ziyo Talim Logo"
      >
        <defs>
          {/* Gradients matching the official brand colors */}
          <linearGradient id="capGrad" x1="100" y1="50" x2="400" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B2B63" />
            <stop offset="100%" stopColor="#003580" />
          </linearGradient>

          <linearGradient id="zGrad" x1="150" y1="140" x2="350" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0080FF" />
            <stop offset="100%" stopColor="#0052CC" />
          </linearGradient>

          <linearGradient id="orangeGrad" x1="100" y1="230" x2="400" y2="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF7700" />
          </linearGradient>

          <linearGradient id="navyBookGrad" x1="80" y1="280" x2="420" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#07204A" />
            <stop offset="100%" stopColor="#0B2B63" />
          </linearGradient>

          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.18" />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* 1. ACADEMIC GRADUATION CAP (MORTARBOARD) */}
          {/* Skull cap band under the mortarboard */}
          <path
            d="M175 125 C175 160 325 160 325 125 L320 115 C305 138 195 138 180 115 Z"
            fill="#061C40"
          />

          {/* Main Diamond Mortarboard */}
          <polygon
            points="250,55 405,118 250,172 95,118"
            fill="url(#capGrad)"
            stroke="#082250"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Top Button */}
          <circle cx="250" cy="118" r="8" fill="#0052CC" stroke="#FFFFFF" strokeWidth="2.5" />

          {/* Hanging Tassel */}
          <path
            d="M250 118 Q360 128 380 170"
            stroke="#003580"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tassel fringe */}
          <path
            d="M375 168 C368 185 368 215 372 235 C380 235 388 235 392 235 C392 215 390 185 385 168 Z"
            fill="#0B2B63"
            stroke="#003580"
            strokeWidth="1.5"
          />

          {/* 2. THE STYLIZED ELECTRIC BLUE "Z" */}
          {/* Upper bar & diagonal of Z */}
          <path
            d="M165 178 L335 178 C342 178 346 186 341 192 L230 300 L345 300 C352 300 356 308 350 316 L335 330 C331 334 325 336 320 336 L155 336 C148 336 144 328 149 320 L260 212 L160 212 C152 212 148 204 154 196 L165 178 Z"
            fill="url(#zGrad)"
            stroke="#0040A8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Orange Triangle inside right cavity of "Z" */}
          <polygon
            points="285,212 338,212 285,268"
            fill="url(#orangeGrad)"
          />

          {/* 3. OPEN BOOK BASE (PAGES & COVER) */}
          {/* Golden/Orange Left Top Page */}
          <path
            d="M250 332 Q185 272 108 288 Q185 240 250 292 Z"
            fill="url(#orangeGrad)"
          />

          {/* Golden/Orange Right Top Page */}
          <path
            d="M250 332 Q315 272 392 288 Q315 240 250 292 Z"
            fill="url(#orangeGrad)"
          />

          {/* Deep Navy Left Foundation Page / Cover */}
          <path
            d="M250 358 Q175 305 85 320 Q170 268 250 322 Z"
            fill="url(#navyBookGrad)"
            stroke="#051530"
            strokeWidth="2"
          />

          {/* Deep Navy Right Foundation Page / Cover */}
          <path
            d="M250 358 Q325 305 415 320 Q330 268 250 322 Z"
            fill="url(#navyBookGrad)"
            stroke="#051530"
            strokeWidth="2"
          />

          {/* Central Book Spine Notch */}
          <path
            d="M245 322 L250 366 L255 322 Z"
            fill="#051633"
          />
        </g>
      </svg>

      {/* Brand Text Typography: "Ziyo" (navy) & "talim" (orange) */}
      {showText && (
        <div className="flex items-baseline tracking-tight font-black font-sans leading-none">
          <span className={`font-black ${textClass} ${isDarkClass}`}>
            Ziyo
          </span>
          <span className={`font-black ${textClass} text-[#FF8800] ml-1`}>
            talim
          </span>
        </div>
      )}
    </div>
  );
};
