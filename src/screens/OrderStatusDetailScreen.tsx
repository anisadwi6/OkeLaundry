import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import { formatRupiah } from '../data/mockData';
import type { LaundryOrder, OrderStepStatus, ScreenName } from '../types';

interface OrderStatusDetailScreenProps {
  order: LaundryOrder;
  unreadCount: number;
  onCompleteOrder: (orderId: string) => void;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

const STEPS: Array<{
  key: OrderStepStatus;
  label: string;
  icon: string;
}> = [
  {
    key: 'dijemput',
    label: 'Dijemput',
    icon: '/assets/icon-dirty-clothes.png',
  },
  {
    key: 'dibersihkan',
    label: 'Dibersihkan',
    icon: '/assets/icon-clothes-in-laundry.png',
  },
  {
    key: 'diantar',
    label: 'DIantar',
    icon: '/assets/icon-luggage-trolley.png',
  },
  {
    key: 'selesai',
    label: 'Selesai',
    icon: '/assets/icon-task-completed.png',
  },
];

export const OrderStatusDetailScreen: React.FC<
  OrderStatusDetailScreenProps
> = ({ order, unreadCount, onCompleteOrder, onBack, onNavigate }) => {
  const activeStepIndex = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Status Laundry" onBack={onBack} />

      <div className="flex-1 px-[26px] pb-6">
        <p className="mt-2 text-center text-[16px] font-bold text-[#2368ad]">
          {order.number}
        </p>

        {/* Progress Stepper Card */}
        <div className="mt-[22px] rounded-[16px] border border-[#dfe8f2] bg-white px-[14px] py-[16px]">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const isActiveOrDone = index <= activeStepIndex;
              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center">
                    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
                      {isActiveOrDone ? (
                        <img
                          src="/assets/ellipse-step-active.svg"
                          alt=""
                          width={40}
                          height={40}
                          className="absolute inset-0"
                        />
                      ) : null}
                      <img
                        src={step.icon}
                        alt={step.label}
                        className="relative z-10 h-[30px] w-[32px] object-contain"
                      />
                    </div>
                    <span className="mt-1.5 text-[10px] font-medium text-[#182e48]">
                      {step.label}
                    </span>
                  </div>

                  {index < STEPS.length - 1 ? (
                    <div className="mb-4 flex items-center">
                      <img
                        src="/assets/line-step.svg"
                        alt=""
                        width={40}
                        height={10}
                        className="h-[10px] w-[34px] object-contain"
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Detail Card */}
        <section className="mt-[26px]">
          <h2 className="text-[16px] font-semibold text-[#182e48]">Detail</h2>

          <div className="mt-[13px] rounded-[16px] border border-[#d5e1ed] bg-white px-[20px] py-[20px]">
            <div className="grid grid-cols-[140px_1fr] gap-y-3 text-[13px] leading-[1.45] text-[#182e48]">
              <span className="font-bold">Total Berat Pakaian</span>
              <span className="font-medium">: {order.weightKg} kg</span>

              <span className="font-bold">Layanan</span>
              <span className="font-medium">
                : {order.durationLabel} {order.serviceName}
              </span>

              <span className="font-bold">Tambahan</span>
              <span className="font-medium">: {order.addonLabel}</span>
            </div>

            <p className="mt-[28px] text-[18px] font-extrabold text-[#182e48]">
              Total Harga : {formatRupiah(order.totalPrice)}
            </p>
          </div>
        </section>

        {/* Foto pakaian yang didokumentasikan */}
        {order.photos.length > 0 ? (
          <section className="mt-[20px]">
            <h2 className="text-[14px] font-bold text-[#182e48]">
              Dokumentasi Foto Pakaian
            </h2>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {order.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="h-[88px] overflow-hidden rounded-[10px] border border-[#dfe8f2] bg-white p-1"
                >
                  <img
                    src={photo}
                    alt={`Dokumentasi pakaian ${idx + 1}`}
                    className="h-full w-full rounded-[6px] object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => onCompleteOrder(order.id)}
          className="mt-[24px] h-[50px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
        >
          Selesai
        </button>
      </div>

      <BottomNav
        activeTab="none"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
