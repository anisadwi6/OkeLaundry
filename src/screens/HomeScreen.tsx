import React, { useMemo, useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import type { ScreenName, UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  unreadCount: number;
  onNavigate: (screen: ScreenName) => void;
}

const QUICK_FEATURES: Array<{
  title: string;
  subtitle: string;
  screen: ScreenName;
}> = [
  {
    title: 'Buat Pesanan',
    subtitle: 'Pesan jemput & cuci pakaian',
    screen: 'create-order',
  },
  {
    title: 'Status Laundry',
    subtitle: 'Pantau proses cucian real-time',
    screen: 'order-status-list',
  },
  {
    title: 'Riwayat Transaksi',
    subtitle: 'Lihat pesanan selesai',
    screen: 'transaction-history',
  },
  {
    title: 'Cek Harga',
    subtitle: 'Hitung estimasi biaya laundry',
    screen: 'check-price',
  },
  {
    title: 'Chat OkeLaundry',
    subtitle: 'Hubungi layanan pelanggan',
    screen: 'chat',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  unreadCount,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return QUICK_FEATURES.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <div className="flex-1 px-[24px] pb-6 pt-[28px]">
        {/* Header greeting */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] font-semibold leading-[1.45] text-[#62758a]">
              Selamat Pagi,
            </p>
            <h1 className="text-[26px] font-extrabold leading-[1.35] text-[#182e48]">
              {user.name || 'USER'}
            </h1>
          </div>
          <img
            src="/assets/logo-okelaundry.png"
            alt="Logo OkeLaundry"
            className="h-[51px] w-[60px] object-cover"
          />
        </div>

        {/* Search + Chat */}
        <div className="relative mt-[16px] flex items-center gap-[12px]">
          <div className="relative flex-1">
            <img
              src="/assets/icon-search.png"
              alt="Cari"
              className="pointer-events-none absolute left-[18px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 object-contain"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari"
              aria-label="Cari layanan"
              className="h-[44px] w-full rounded-[14px] border border-[#d5e1ed] bg-white pl-[50px] pr-4 text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigate('chat')}
            aria-label="Buka Chat OkeLaundry"
            className="flex h-[44px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-[14px] border border-[#dfe8f2] bg-white transition-colors hover:bg-[#e8f2fc]"
          >
            <img
              src="/assets/icon-messaging.png"
              alt="Chat"
              className="h-[26px] w-[26px] object-contain"
            />
          </button>

          {searchQuery.trim() ? (
            <div className="absolute left-0 right-0 top-[50px] z-20 rounded-[14px] border border-[#dfe8f2] bg-white p-2 shadow-lg">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    key={item.screen}
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      onNavigate(item.screen);
                    }}
                    className="flex w-full cursor-pointer flex-col rounded-[10px] px-3 py-2 text-left hover:bg-[#e8f2fc]"
                  >
                    <span className="text-[14px] font-bold text-[#182e48]">
                      {item.title}
                    </span>
                    <span className="text-[12px] text-[#62758a]">
                      {item.subtitle}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-[13px] font-medium text-[#62758a]">
                  Layanan tidak ditemukan.
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* Hero banner */}
        <div className="relative mt-[22px] flex h-[196px] w-full overflow-hidden rounded-[20px] bg-gradient-to-r from-[#164e87] to-[#287ab7]">
          <div className="z-10 flex w-[220px] flex-col justify-between p-[20px]">
            <h2 className="text-[24px] font-semibold leading-[1.25] text-white">
              Solusi laundry mudah!
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('create-order')}
              className="flex h-[48px] w-[174px] cursor-pointer items-center gap-[10px] rounded-[14px] bg-white px-[14px] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <img
                src="/assets/icon-plus.png"
                alt=""
                className="h-[22px] w-[22px] object-contain"
              />
              <span className="text-[14px] font-semibold text-[#1d64a9]">
                Buat Pesanan
              </span>
            </button>
          </div>
          <div className="ml-auto h-[196px] w-[134px] shrink-0 overflow-hidden">
            <img
              src="/assets/banner-laundry.png"
              alt="Foto pakaian dan mesin cuci"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* LaundryPoint card */}
        <div className="mt-[16px] flex h-[68px] items-center justify-between rounded-[18px] border border-[#dfe8f2] bg-white px-[19px]">
          <div className="flex items-center gap-[12px]">
            <img
              src="/assets/icon-coin-wallet.png"
              alt="LaundryPoint"
              className="h-[28px] w-[28px] object-contain"
            />
            <div>
              <p className="text-[22px] font-extrabold leading-tight text-[#182e48]">
                {user.points}
              </p>
              <p className="text-[12px] font-semibold leading-tight text-[#62758a]">
                LaundryPoint
              </p>
            </div>
          </div>

          <div className="flex h-[32px] items-center justify-center rounded-[10px] bg-[#e8f2fc] px-[12px]">
            <span className="text-[11.5px] font-semibold text-[#1d64a9]">
              Member OkeLaundry
            </span>
          </div>
        </div>

        {/* Layanan laundry shortcuts */}
        <section className="mt-[24px]">
          <h2 className="text-[16px] font-extrabold leading-[24px] text-[#182e48]">
            Layanan laundry
          </h2>
          <div className="mt-[14px] grid grid-cols-3 gap-[18px]">
            <button
              type="button"
              onClick={() => onNavigate('order-status-list')}
              className="flex h-[110px] cursor-pointer flex-col items-center justify-start rounded-[16px] border border-[#dfe8f2] bg-white px-2 pt-[14px] transition-colors hover:border-[#1d64a9]"
            >
              <img
                src="/assets/icon-mobile-order.png"
                alt="Status Laundry"
                className="h-[40px] w-[40px] object-contain"
              />
              <span className="mt-[11px] text-center text-[12px] font-semibold leading-[18px] text-[#182e48]">
                Status Laundry
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('transaction-history')}
              className="flex h-[110px] cursor-pointer flex-col items-center justify-start rounded-[16px] border border-[#dfe8f2] bg-white px-2 pt-[14px] transition-colors hover:border-[#1d64a9]"
            >
              <img
                src="/assets/icon-payment-history.png"
                alt="Riwayat Transaksi"
                className="h-[40px] w-[40px] object-contain"
              />
              <span className="mt-[11px] text-center text-[12px] font-semibold leading-[16px] text-[#182e48]">
                Riwayat Transaksi
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('check-price')}
              className="flex h-[110px] cursor-pointer flex-col items-center justify-start rounded-[16px] border border-[#dfe8f2] bg-white px-2 pt-[14px] transition-colors hover:border-[#1d64a9]"
            >
              <img
                src="/assets/icon-dollar-coin.png"
                alt="Cek Harga"
                className="h-[40px] w-[40px] object-contain"
              />
              <span className="mt-[11px] text-center text-[12px] font-semibold leading-[18px] text-[#182e48]">
                Cek Harga
              </span>
            </button>
          </div>
        </section>

        {/* Tentang OkeLaundry */}
        <section className="mt-[22px] rounded-[18px] border border-[#dfe8f2] bg-white px-[19px] py-[14px]">
          <h2 className="text-[16px] font-extrabold leading-[1.45] text-[#182e48]">
            OkeLaundry
          </h2>
          <p className="mt-[6px] text-[13px] leading-[1.42] text-[#62758a]">
            Nggak perlu khawatir baju hilang lagi! Setiap laundry di OKE Laundry
            difoto &amp; bisa dipantau real-time dari HP kamu
          </p>
        </section>
      </div>

      <BottomNav
        activeTab="home"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
