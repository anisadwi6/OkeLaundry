import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import type { NotificationItem, ScreenName } from '../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onOpenNotification: (item: NotificationItem) => void;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAsRead,
  onOpenNotification,
  onBack,
  onNavigate,
}) => {
  const [tab, setTab] = useState<'unread' | 'read'>('unread');

  const unreadList = notifications.filter((n) => !n.read);
  const readList = notifications.filter((n) => n.read);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Notifikasi" onBack={onBack} />

      <div className="flex-1 px-[26px] pb-6">
        {/* Segmented control */}
        <div className="mt-3 flex h-[42px] w-full items-center rounded-[12px] bg-[#1d64a9] p-[4px]">
          <button
            type="button"
            onClick={() => setTab('unread')}
            className={`h-[34px] flex-1 cursor-pointer rounded-[10px] text-[13px] font-semibold transition-colors ${
              tab === 'unread'
                ? 'border border-[#dfe8f2] bg-white text-[#2368ad]'
                : 'text-[#d7e7f4] hover:text-white'
            }`}
          >
            Belum dibaca
          </button>
          <button
            type="button"
            onClick={() => setTab('read')}
            className={`h-[34px] flex-1 cursor-pointer rounded-[10px] text-[13px] font-semibold transition-colors ${
              tab === 'read'
                ? 'border border-[#dfe8f2] bg-white text-[#1d64a9]'
                : 'text-[#d7e7f4] hover:text-white'
            }`}
          >
            Sudah dibaca
          </button>
        </div>

        {tab === 'unread' ? (
          <div className="mt-[28px] flex flex-col gap-[14px]">
            {unreadList.length === 0 ? (
              <div className="rounded-[16px] border border-[#dfe8f2] bg-white px-5 py-8 text-center">
                <p className="text-[14px] font-bold text-[#182e48]">
                  Tidak ada notifikasi baru
                </p>
                <p className="mt-1 text-[13px] text-[#62758a]">
                  Semua notifikasi terbaru sudah kamu baca.
                </p>
              </div>
            ) : (
              unreadList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onMarkAsRead(item.id);
                    onOpenNotification(item);
                  }}
                  className="flex min-h-[96px] w-full cursor-pointer items-center gap-[18px] rounded-[16px] border border-[#cedff1] bg-[#e8f2fc] px-[18px] py-4 text-left transition-colors hover:border-[#1d64a9]"
                >
                  <img
                    src="/assets/icon-mobile-order.png"
                    alt=""
                    className="h-[46px] w-[46px] shrink-0 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-[16px] font-bold leading-[1.45] text-[#182e48]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[14px] font-medium leading-[1.45] text-[#2368ad]">
                      {item.message}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="mt-[28px]">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-bold text-[#182e48]">
                Riwayat notifikasi
              </p>
              <p className="text-[12px] font-semibold text-[#62758a]">
                {readList.length} notifikasi
              </p>
            </div>

            <div className="mt-[14px] flex flex-col gap-[14px]">
              {readList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenNotification(item)}
                  className="flex min-h-[136px] w-full cursor-pointer items-start gap-[16px] rounded-[16px] border border-[#dfe8f2] bg-white px-[15px] py-[16px] text-left transition-colors hover:border-[#1d64a9]"
                >
                  <img
                    src="/assets/icon-mobile-order.png"
                    alt=""
                    className="mt-0.5 h-[40px] w-[40px] shrink-0 object-contain"
                  />
                  <div className="flex min-h-[102px] flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[16px] font-bold leading-[1.45] text-[#182e48]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[14px] font-medium leading-[1.45] text-[#62758a]">
                        {item.message}
                      </p>
                    </div>
                    <p className="mt-3 text-[12px] font-semibold text-[#62758a]">
                      Sudah dibaca
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-[26px] text-center text-[13px] font-semibold text-[#62758a]">
              Semua notifikasi di sini sudah kamu baca.
            </p>
          </div>
        )}
      </div>

      <BottomNav
        activeTab="notifications"
        unreadCount={unreadList.length}
        onNavigate={onNavigate}
      />
    </div>
  );
};
