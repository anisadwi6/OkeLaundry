import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import { ADDON_OPTIONS, SERVICE_OPTIONS, formatRupiah } from '../data/mockData';
import type { ScreenName } from '../types';

interface CheckPriceScreenProps {
  unreadCount: number;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const CheckPriceScreen: React.FC<CheckPriceScreenProps> = ({
  unreadCount,
  onBack,
  onNavigate,
}) => {
  const [weightInput, setWeightInput] = useState('10');
  const [selectedServiceId, setSelectedServiceId] = useState('cks-1');
  const [selectedAddonId, setSelectedAddonId] = useState('none');
  const [showResult, setShowResult] = useState(false);

  const parsedWeight = Math.max(
    1,
    parseFloat(weightInput.replace(/[^0-9.]/g, '')) || 10
  );
  const selectedService =
    SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) ??
    SERVICE_OPTIONS[0];
  const selectedAddon =
    ADDON_OPTIONS.find((a) => a.id === selectedAddonId) ?? ADDON_OPTIONS[0];

  const totalPrice =
    parsedWeight * selectedService.pricePerKg + selectedAddon.pricePerPcs;

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Cek Harga" onBack={onBack} />

      <div className="flex-1 px-[25px] pb-6">
        {/* Layanan & Harga card */}
        <section className="mt-3 rounded-[16px] border border-[#dfe8f2] bg-[#e8f2fc] px-[19px] py-[20px]">
          <h2 className="text-[16px] font-bold leading-[22px] text-[#182e48]">
            Layanan &amp; Harga
          </h2>

          <div className="mt-[18px] grid grid-cols-2 gap-4 text-[13px] leading-[18px] text-[#2368ad]">
            <div>
              <p className="font-bold">Cuci Kering Setrika</p>
              <p className="font-medium">paket 1 hari 7.000/kg</p>
              <p className="font-medium">paket 2 hari 5.000/kg</p>
              <p className="font-medium">paket 3 hari 4.000/kg</p>
            </div>
            <div>
              <p className="font-bold">Cuci Kering Lipat</p>
              <p className="font-medium">paket 1 hari 6.000/kg</p>
              <p className="font-medium">paket 2 hari 4.000/kg</p>
              <p className="font-medium">paket 3 hari 3.500/kg</p>
            </div>
          </div>

          <div className="mt-[22px] text-[13px] leading-[18px] text-[#2368ad]">
            <p className="font-bold">Tambahan</p>
            <p className="font-medium">Cuci Sprei mulai 5.000/pcs</p>
            <p className="font-medium">Cuci selimut mulai 10.000/pcs</p>
            <p className="font-medium">Cuci bed cover mulai 20.000/pcs</p>
          </div>
        </section>

        {!showResult ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowResult(true);
            }}
            className="mt-[22px] flex flex-col gap-[16px]"
          >
            <div>
              <label className="mb-2 block text-[16px] font-semibold text-[#182e48]">
                Total Berat Pakaian
              </label>
              <input
                type="text"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="Contoh: 10kg"
                className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-[16px] font-semibold text-[#182e48]">
                Layanan
              </label>
              <div className="relative">
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="h-[50px] w-full appearance-none rounded-[12px] border border-[#d5e1ed] bg-white pl-[20px] pr-[44px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.duration} {opt.category}
                    </option>
                  ))}
                </select>
                <img
                  src="/assets/icon-dropdown.png"
                  alt=""
                  className="pointer-events-none absolute right-[16px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 object-contain"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[16px] font-semibold text-[#182e48]">
                Tambahan
              </label>
              <div className="relative">
                <select
                  value={selectedAddonId}
                  onChange={(e) => setSelectedAddonId(e.target.value)}
                  className="h-[50px] w-full appearance-none rounded-[12px] border border-[#d5e1ed] bg-white pl-[20px] pr-[44px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
                >
                  {ADDON_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <img
                  src="/assets/icon-dropdown.png"
                  alt=""
                  className="pointer-events-none absolute right-[16px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 object-contain"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-3 h-[50px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
            >
              Hitung
            </button>
          </form>
        ) : (
          <section className="mt-[22px]">
            <h2 className="text-[16px] font-semibold text-[#182e48]">Detail</h2>

            <div className="mt-[13px] rounded-[16px] border border-[#d5e1ed] bg-white px-[20px] py-[20px]">
              <div className="grid grid-cols-[140px_1fr] gap-y-3 text-[13px] leading-[1.45] text-[#182e48]">
                <span className="font-bold">Total Berat Pakaian</span>
                <span className="font-medium">: {parsedWeight} kg</span>

                <span className="font-bold">Layanan</span>
                <span className="font-medium">
                  : {selectedService.duration} {selectedService.category}
                </span>

                <span className="font-bold">Tambahan</span>
                <span className="font-medium">: {selectedAddon.name}</span>
              </div>

              <p className="mt-[28px] text-[18px] font-extrabold text-[#182e48]">
                Total Harga : {formatRupiah(totalPrice)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="mt-[24px] h-[50px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
            >
              Selesai
            </button>
          </section>
        )}
      </div>

      <BottomNav
        activeTab="none"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
