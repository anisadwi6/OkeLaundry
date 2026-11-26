import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import { ADDON_OPTIONS, SERVICE_OPTIONS, formatRupiah } from '../data/mockData';
import type { DraftOrder, PaymentMethod, ScreenName } from '../types';

interface PaymentScreenProps {
  draft: DraftOrder;
  unreadCount: number;
  onConfirmOrder: (method: PaymentMethod) => void;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  title: string;
  subtitle: string;
  infoTitle: string;
  infoBody: string;
}> = [
  {
    id: 'tunai',
    title: 'Tunai',
    subtitle: 'Bayar langsung kepada petugas',
    infoTitle: 'Sebelum pengantaran',
    infoBody:
      'Bayar kepada petugas sebelum pakaian diantar. Pastikan pembayaran sudah dikonfirmasi.',
  },
  {
    id: 'transfer_bank',
    title: 'Transfer bank',
    subtitle: 'Bayar melalui rekening bank',
    infoTitle: 'Pembayaran transfer bank',
    infoBody:
      'Transfer sesuai total tagihan. Simpan bukti transaksi untuk konfirmasi petugas.',
  },
  {
    id: 'dompet_digital',
    title: 'Dompet digital',
    subtitle: 'GoPay, OVO, DANA, ShopeePay',
    infoTitle: 'Pembayaran dompet digital',
    infoBody:
      'Bayar sesuai total tagihan. Simpan bukti transaksi untuk konfirmasi petugas.',
  },
];

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  draft,
  unreadCount,
  onConfirmOrder,
  onBack,
  onNavigate,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('tunai');

  const service =
    SERVICE_OPTIONS.find((s) => s.id === draft.serviceId) ?? SERVICE_OPTIONS[0];
  const addon =
    ADDON_OPTIONS.find((a) => a.id === draft.addonId) ?? ADDON_OPTIONS[0];

  const serviceSubtotal = draft.weightKg * service.pricePerKg;
  const addonPrice = addon.pricePerPcs;
  const totalPrice = serviceSubtotal + addonPrice;

  const activeInfo =
    PAYMENT_METHODS.find((m) => m.id === selectedMethod) ?? PAYMENT_METHODS[0];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Pembayaran" onBack={onBack} />

      <div className="flex-1 px-[26px] pb-8">
        <p className="text-center text-[12px] font-semibold text-[#1d64a9]">
          1. Pesanan &nbsp;&nbsp;/&nbsp;&nbsp; 2. Pembayaran &nbsp;&nbsp;/&nbsp;&nbsp; 3. Selesai
        </p>

        {/* Ringkasan pesanan */}
        <section className="mt-[22px] rounded-[16px] border border-[#dfe8f2] bg-white px-[19px] py-[17px]">
          <h2 className="text-[16px] font-bold text-[#182e48]">
            Ringkasan pesanan
          </h2>

          <p className="mt-[13px] text-[16px] font-bold text-[#182e48]">
            {service.category}
          </p>
          <p className="mt-0.5 text-[13px] font-semibold text-[#62758a]">
            {service.duration}
          </p>

          <div className="mt-[18px] flex items-center justify-between text-[14px]">
            <span className="font-semibold text-[#62758a]">
              {draft.weightKg} kg × {formatRupiah(service.pricePerKg)}
            </span>
            <span className="font-bold text-[#182e48]">
              {formatRupiah(serviceSubtotal)}
            </span>
          </div>

          <div className="mt-[10px] flex items-center justify-between text-[14px]">
            <span className="font-semibold text-[#62758a]">Tambahan</span>
            <span className="font-semibold text-[#182e48]">
              {addon.id === 'none' ? 'Tidak ada' : formatRupiah(addonPrice)}
            </span>
          </div>

          <p className="mt-[14px] text-[12px] font-semibold text-[#62758a]">
            Biaya mengikuti berat akhir dari petugas.
          </p>
        </section>

        {/* Metode pembayaran */}
        <section className="mt-[24px]">
          <h2 className="text-[16px] font-bold text-[#182e48]">
            Metode pembayaran
          </h2>
          <p className="mt-1 text-[13px] font-semibold text-[#62758a]">
            Pilih satu metode pembayaran
          </p>

          <div className="mt-[14px] flex flex-col gap-[12px]">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex h-[68px] w-full cursor-pointer items-center justify-between rounded-[14px] px-[17px] text-left transition-colors ${
                    isSelected
                      ? 'border-[1.5px] border-[#1d64a9] bg-[#e8f2fc]'
                      : 'border border-[#dfe8f2] bg-white hover:border-[#b7cde3]'
                  }`}
                >
                  <div>
                    <p
                      className={`text-[15px] font-bold ${
                        isSelected ? 'text-[#1d64a9]' : 'text-[#182e48]'
                      }`}
                    >
                      {method.title}
                    </p>
                    <p className="mt-0.5 text-[12px] font-semibold text-[#62758a]">
                      {method.subtitle}
                    </p>
                  </div>

                  <div className="relative flex h-[22px] w-[22px] shrink-0 items-center justify-center">
                    <img
                      src={
                        isSelected
                          ? '/assets/radio-ring-selected.svg'
                          : '/assets/radio-ring-unselected.svg'
                      }
                      alt=""
                      width={22}
                      height={22}
                    />
                    {isSelected ? (
                      <img
                        src="/assets/radio-dot-selected.svg"
                        alt=""
                        width={12}
                        height={12}
                        className="absolute"
                      />
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Informasi pembayaran */}
        <section className="mt-[24px] rounded-[14px] bg-[#e8f2fc] px-[18px] py-[15px] text-[#1d64a9]">
          <h3 className="text-[14px] font-bold">{activeInfo.infoTitle}</h3>
          <p className="mt-1 text-[13px] font-semibold leading-[1.45]">
            {activeInfo.infoBody}
          </p>
        </section>

        {/* Konfirmasi pesanan */}
        <section className="mt-[26px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#62758a]">
              Estimasi total
            </span>
            <span className="text-[22px] font-extrabold text-[#182e48]">
              {formatRupiah(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onConfirmOrder(selectedMethod)}
            className="mt-[14px] h-[50px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
          >
            Konfirmasi pesanan
          </button>
        </section>
      </div>

      <BottomNav
        activeTab="none"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
