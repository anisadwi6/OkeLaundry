import React, { useRef, useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import { ADDON_OPTIONS, SERVICE_OPTIONS } from '../data/mockData';
import type { DraftOrder, ScreenName } from '../types';

interface CreateOrderScreenProps {
  draft: DraftOrder;
  unreadCount: number;
  onChangeDraft: (updated: DraftOrder) => void;
  onProceedToPayment: (validatedDraft: DraftOrder) => void;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const CreateOrderScreen: React.FC<CreateOrderScreenProps> = ({
  draft,
  unreadCount,
  onChangeDraft,
  onProceedToPayment,
  onBack,
  onNavigate,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [activePhotoSlot, setActivePhotoSlot] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const nextPhotos = [...draft.photos];
        nextPhotos[activePhotoSlot] = reader.result;
        onChangeDraft({ ...draft, photos: nextPhotos });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.customerName.trim() || !draft.customerPhone.trim() || !draft.address.trim()) {
      setError('Mohon isi Nama Lengkap, Nomor Telepon, dan Alamat Lengkap.');
      return;
    }
    onProceedToPayment(draft);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader title="Buat Pesanan" onBack={onBack} />

      <form onSubmit={handleSubmit} className="flex-1 px-[25px] pb-8">
        {/* Catatan card */}
        <div className="mt-2 rounded-[16px] border border-[#dfe8f2] bg-[#e8f2fc] px-[19px] py-[18px]">
          <h2 className="text-[16px] font-bold text-[#182e48]">Catatan</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14px] font-semibold leading-[21px] text-[#2368ad]">
            <li>Pembayaran di lakukan sebelum proses pengantaran.</li>
            <li>Pakaian akan diantar setelah proses pembayaran selesai.</li>
          </ul>
        </div>

        {/* Profil Pelanggan */}
        <section className="mt-[20px]">
          <h2 className="text-[16px] font-semibold text-[#182e48]">
            Profil Pelanggan
          </h2>
          <div className="mt-[10px] flex flex-col gap-[8px]">
            <input
              type="text"
              value={draft.customerName}
              onChange={(e) => {
                setError(null);
                onChangeDraft({ ...draft, customerName: e.target.value });
              }}
              placeholder="Nama Lengkap"
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
            <input
              type="tel"
              value={draft.customerPhone}
              onChange={(e) => {
                setError(null);
                onChangeDraft({ ...draft, customerPhone: e.target.value });
              }}
              placeholder="Nomor Telepon"
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>
        </section>

        {/* Alamat Lengkap */}
        <section className="mt-[20px]">
          <h2 className="text-[16px] font-semibold text-[#182e48]">
            Alamat Lengkap
          </h2>
          <div className="mt-[10px] flex flex-col gap-[8px]">
            <input
              type="text"
              value={draft.address}
              onChange={(e) => {
                setError(null);
                onChangeDraft({ ...draft, address: e.target.value });
              }}
              placeholder="Alamat Lengkap"
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-[8px]">
              <input
                type="text"
                value={draft.addressDetail}
                onChange={(e) =>
                  onChangeDraft({ ...draft, addressDetail: e.target.value })
                }
                placeholder="Detail Tambahan"
                className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[16px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
              />
              <input
                type="text"
                value={draft.courierNote}
                onChange={(e) =>
                  onChangeDraft({ ...draft, courierNote: e.target.value })
                }
                placeholder="Catatan untuk kurir"
                className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[16px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Pilihan Paket & Berat */}
        <section className="mt-[20px]">
          <h2 className="text-[16px] font-semibold text-[#182e48]">
            Layanan &amp; Perkiraan Berat
          </h2>
          <div className="mt-[10px] flex flex-col gap-[8px]">
            <select
              value={draft.serviceId}
              onChange={(e) =>
                onChangeDraft({ ...draft, serviceId: e.target.value })
              }
              aria-label="Pilih Layanan"
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[16px] text-[13px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-[8px]">
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={draft.weightKg}
                  onChange={(e) =>
                    onChangeDraft({
                      ...draft,
                      weightKg: Math.max(1, Number(e.target.value) || 1),
                    })
                  }
                  aria-label="Perkiraan berat kg"
                  className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white pl-[16px] pr-[40px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
                />
                <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#62758a]">
                  kg
                </span>
              </div>

              <select
                value={draft.addonId}
                onChange={(e) =>
                  onChangeDraft({ ...draft, addonId: e.target.value })
                }
                aria-label="Tambahan"
                className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[12px] text-[13px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
              >
                {ADDON_OPTIONS.map((addon) => (
                  <option key={addon.id} value={addon.id}>
                    {addon.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Foto Pakaian */}
        <section className="mt-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#182e48]">
              Foto Pakaian
            </h2>
            <span className="text-[11px] font-semibold text-[#62758a]">
              Ketuk foto untuk ganti
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
            {draft.photos.map((photoSrc, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setActivePhotoSlot(index);
                  fileInputRef.current?.click();
                }}
                className="group relative flex h-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-[12px] border border-[#d5e1ed] bg-white p-1.5 transition-colors hover:border-[#1d64a9]"
              >
                <img
                  src={photoSrc}
                  alt={`Foto pakaian ${index + 1}`}
                  className="h-full w-full rounded-[8px] object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {error ? (
          <p className="mt-4 rounded-[12px] bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-[28px] h-[50px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
        >
          Bayar
        </button>
      </form>

      <BottomNav
        activeTab="none"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
