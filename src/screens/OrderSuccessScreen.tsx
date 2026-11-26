import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import { formatRupiah } from '../data/mockData';
import type { LaundryOrder, ScreenName } from '../types';

interface OrderSuccessScreenProps {
  order: LaundryOrder;
  unreadCount: number;
  onViewOrderStatus: (orderId: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  order,
  unreadCount,
  onViewOrderStatus,
  onNavigate,
}) => {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Konfirmasi pesanan" />

      <div className="flex-1 px-[26px] pb-8">
        <div className="mt-4 flex flex-col items-center text-center">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[44px] bg-[#e5f0fc]">
            <img
              src="/assets/icon-done.png"
              alt="Pesanan terkonfirmasi"
              className="h-[48px] w-[48px] object-contain"
            />
          </div>

          <h2 className="mt-[24px] text-[24px] font-extrabold leading-[1.35] text-[#182e48]">
            Pesanan berhasil dibuat!
          </h2>
          <p className="mt-2 max-w-[330px] text-[14px] font-semibold leading-[1.45] text-[#62758a]">
            Terima kasih sudah memilih Oke Laundry. Pantau perkembangan
            pesananmu melalui halaman status laundry.
          </p>
        </div>

        {/* Ringkasan konfirmasi */}
        <div className="mt-[28px] rounded-[16px] border border-[#dfe8f2] bg-white px-[19px] py-[17px]">
          <h3 className="text-[16px] font-bold text-[#182e48]">
            Detail pesanan
          </h3>
          <p className="mt-[12px] text-[14px] font-bold text-[#182e48]">
            {order.serviceName} · {order.weightKg} kg
          </p>
          <p className="mt-0.5 text-[13px] font-semibold text-[#62758a]">
            {order.durationLabel}
          </p>

          <div className="mt-[14px] flex h-[36px] items-center justify-center rounded-[10px] bg-[#fff4dc] px-3">
            <span className="text-[13px] font-semibold text-[#805615]">
              {order.paymentStatus}
            </span>
          </div>

          <div className="mt-[18px] flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#62758a]">
              Estimasi total
            </span>
            <span className="text-[20px] font-extrabold text-[#182e48]">
              {formatRupiah(order.totalPrice)}
            </span>
          </div>
        </div>

        <p className="mt-[20px] text-center text-[12px] font-semibold text-[#62758a]">
          Pembayaran diselesaikan sebelum pengantaran.
        </p>

        <div className="mt-[28px] flex flex-col items-center gap-[18px]">
          <button
            type="button"
            onClick={() => onViewOrderStatus(order.id)}
            className="h-[50px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
          >
            Lihat status laundry
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="cursor-pointer text-[14px] font-bold text-[#1d64a9] hover:underline"
          >
            Kembali ke beranda
          </button>
        </div>
      </div>

      <BottomNav
        activeTab="none"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
