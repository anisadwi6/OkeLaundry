import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import type { LaundryOrder, ScreenName } from '../types';

interface OrderStatusListScreenProps {
  orders: LaundryOrder[];
  unreadCount: number;
  onSelectOrder: (orderId: string) => void;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const OrderStatusListScreen: React.FC<OrderStatusListScreenProps> = ({
  orders,
  unreadCount,
  onSelectOrder,
  onBack,
  onNavigate,
}) => {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Status Laundry" onBack={onBack} />

      <div className="flex-1 px-[26px] pb-6">
        <div className="mt-4 flex flex-col gap-[20px]">
          {orders.map((order) => {
            const iconSrc =
              order.status === 'diantar'
                ? '/assets/icon-luggage-trolley.png'
                : order.status === 'selesai'
                  ? '/assets/icon-task-completed.png'
                  : '/assets/icon-dirty-clothes.png';

            return (
              <button
                key={order.id}
                type="button"
                onClick={() => onSelectOrder(order.id)}
                className="flex min-h-[112px] w-full cursor-pointer items-start gap-[18px] rounded-[16px] border border-[#dfe8f2] bg-white px-[16px] py-[18px] text-left transition-colors hover:border-[#1d64a9]"
              >
                <img
                  src={iconSrc}
                  alt=""
                  className="h-[46px] w-[46px] shrink-0 object-contain"
                />
                <div className="flex flex-1 flex-col">
                  <h2 className="text-[16px] font-bold leading-[1.45] text-[#182e48]">
                    {order.number}
                  </h2>
                  <p className="mt-0.5 text-[14px] font-medium leading-[1.45] text-[#2368ad]">
                    {order.statusDescription}
                  </p>
                  <span className="mt-3 text-right text-[12px] font-medium text-[#62758a]">
                    Klik untuk detail
                  </span>
                </div>
              </button>
            );
          })}
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
