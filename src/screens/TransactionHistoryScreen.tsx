import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import { formatRupiah } from '../data/mockData';
import type { LaundryOrder, ScreenName } from '../types';

interface TransactionHistoryScreenProps {
  completedOrders: LaundryOrder[];
  unreadCount: number;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const TransactionHistoryScreen: React.FC<
  TransactionHistoryScreenProps
> = ({ completedOrders, unreadCount, onBack, onNavigate }) => {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Riwayat Transaksi" onBack={onBack} />

      <div className="flex-1 px-[26px] pb-6">
        <div className="mt-4 flex flex-col gap-[14px]">
          <div className="flex min-h-[124px] items-start gap-[16px] rounded-[16px] border border-[#dfe8f2] bg-white px-[18px] py-[18px]">
            <img
              src="/assets/icon-task-completed.png"
              alt="Selesai"
              className="mt-0.5 h-[46px] w-[46px] shrink-0 object-contain"
            />
            <div>
              <h2 className="text-[16px] font-bold leading-[1.45] text-[#182e48]">
                Laundry Telah Di Terima
              </h2>
              <p className="mt-1 text-[14px] font-medium leading-[1.45] text-[#2368ad]">
                Jangan lupa untuk cek kembali laundry dan laporkan jika pakaian
                ada yang hilang
              </p>
            </div>
          </div>

          {completedOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-start gap-[16px] rounded-[16px] border border-[#dfe8f2] bg-white px-[18px] py-[18px]"
            >
              <img
                src="/assets/icon-task-completed.png"
                alt="Selesai"
                className="mt-0.5 h-[46px] w-[46px] shrink-0 object-contain"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] font-bold leading-[1.45] text-[#182e48]">
                    {order.number}
                  </h2>
                  <span className="rounded-[8px] bg-[#e8f2fc] px-2 py-0.5 text-[11px] font-bold text-[#1d64a9]">
                    Selesai
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-medium text-[#2368ad]">
                  {order.durationLabel} {order.serviceName} · {order.weightKg} kg
                </p>
                <p className="mt-1 text-[14px] font-extrabold text-[#182e48]">
                  {formatRupiah(order.totalPrice)}
                </p>
              </div>
            </div>
          ))}
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
