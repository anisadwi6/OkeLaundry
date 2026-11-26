import React, { useEffect } from 'react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const timer = window.setTimeout(onContinue, 1600);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <button
      type="button"
      onClick={onContinue}
      aria-label="Masuk ke OkeLaundry"
      className="flex min-h-full w-full flex-1 cursor-pointer flex-col items-center justify-center bg-[#eaf3fc] px-8 py-12 text-center transition-opacity"
    >
      <img
        src="/assets/logo-okelaundry.png"
        alt="Logo OkeLaundry"
        className="h-[243px] w-[282px] object-contain"
      />
      <p className="mt-6 text-[13px] font-semibold text-[#62758a]">
        Ketuk untuk melanjutkan
      </p>
    </button>
  );
};
