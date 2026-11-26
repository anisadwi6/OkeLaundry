import React from 'react';
import type { ScreenName } from '../types';

interface BottomNavProps {
  activeTab: 'notifications' | 'home' | 'profile' | 'none';
  unreadCount?: number;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  unreadCount = 0,
  onNavigate,
}) => {
  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky bottom-0 z-30 flex h-[88px] w-full shrink-0 items-center justify-around border-t border-[#dfe8f2] bg-white px-4 pb-2 pt-2"
    >
      <button
        type="button"
        onClick={() => onNavigate('notifications')}
        className={`relative flex h-[57px] w-[72px] cursor-pointer flex-col items-center justify-center rounded-[14px] transition-colors ${
          activeTab === 'notifications' ? 'bg-[#e5f0fc]' : 'hover:bg-[#f5f8fc]'
        }`}
      >
        <div className="relative h-[30px] w-[30px]">
          <img
            src="/assets/nav-notification.png"
            alt="Notifikasi"
            className="h-full w-full object-contain"
          />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1d64a9] px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="mt-0.5 text-[12px] font-semibold leading-normal text-[#182e48]">
          Notifikasi
        </span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex h-[57px] w-[68px] cursor-pointer flex-col items-center justify-center rounded-[14px] transition-colors ${
          activeTab === 'home' ? 'bg-[#e5f0fc]' : 'hover:bg-[#f5f8fc]'
        }`}
      >
        <img
          src="/assets/nav-home.png"
          alt="Home"
          className="h-[30px] w-[30px] object-contain"
        />
        <span className="mt-0.5 text-[12px] font-semibold leading-normal text-[#182e48]">
          Home
        </span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('profile')}
        className={`flex h-[57px] w-[68px] cursor-pointer flex-col items-center justify-center rounded-[14px] transition-colors ${
          activeTab === 'profile' ? 'bg-[#e5f0fc]' : 'hover:bg-[#f5f8fc]'
        }`}
      >
        <img
          src="/assets/nav-user.png"
          alt="Profil"
          className="h-[30px] w-[30px] object-contain"
        />
        <span className="mt-0.5 text-[12px] font-semibold leading-normal text-[#182e48]">
          Profil
        </span>
      </button>
    </nav>
  );
};
