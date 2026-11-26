import React from 'react';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onBack,
  rightAction,
}) => {
  return (
    <header className="relative flex items-center justify-center px-[26px] pb-4 pt-[44px]">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="absolute left-[22px] top-[42px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] transition-colors hover:bg-[#e8f2fc]"
        >
          <img
            src="/assets/icon-left-arrow.png"
            alt="Kembali"
            className="h-[24px] w-[24px] object-contain"
          />
        </button>
      ) : null}

      <h1 className="text-center text-[22px] font-extrabold leading-[1.35] text-[#182e48]">
        {title}
      </h1>

      {rightAction ? (
        <div className="absolute right-[22px] top-[42px]">{rightAction}</div>
      ) : null}
    </header>
  );
};
