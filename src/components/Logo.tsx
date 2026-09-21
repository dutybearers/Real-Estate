import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true
}) => {
  const isDark = variant === 'dark';

  const badgeSize = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-13 h-13 text-base'
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  }[size];

  const subSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  }[size];

  return (
    <div className="flex items-center gap-3 select-none cursor-pointer group" id="tov-brand-logo">
      {/* TOV Monogram Crest */}
      <div
        className={`${badgeSize} flex items-center justify-center font-editorial font-medium tracking-widest border transition-transform duration-300 group-hover:scale-105 ${
          isDark
            ? 'border-[#161513] text-[#161513] bg-[#FAF8F5] shadow-xs'
            : 'border-[#EAE5DC]/80 text-[#FAF8F5] bg-[#161513]'
        }`}
        style={{ letterSpacing: '0.15em' }}
      >
        <span className="translate-x-[0.5px]">TOV</span>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col">
        <span
          className={`font-editorial font-medium tracking-[0.18em] uppercase transition-colors leading-tight ${titleSize} ${
            isDark ? 'text-[#161513]' : 'text-[#FAF8F5]'
          }`}
        >
          Touch of Valentine
        </span>
        {showSubtitle && (
          <span
            className={`font-sans font-medium tracking-[0.26em] uppercase transition-colors ${subSize} ${
              isDark ? 'text-[#7B746B]' : 'text-[#AFA89E]'
            }`}
          >
            Homes • Private Advisory
          </span>
        )}
      </div>
    </div>
  );
};
