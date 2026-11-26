import React, { useEffect, useRef, useState } from 'react';
import type { ChatMessage, LaundryOrder } from '../types';

interface ChatScreenProps {
  messages: ChatMessage[];
  activeOrder: LaundryOrder;
  onSendMessage: (text: string) => void;
  onViewOrderStatus: (orderId: string) => void;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  activeOrder,
  onSendMessage,
  onViewOrderStatus,
  onBack,
}) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      {/* Header percakapan */}
      <header className="flex h-[112px] shrink-0 items-center border-b border-[#dfe8f2] bg-white px-[16px] pt-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke beranda"
          className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[16px] hover:bg-[#e8f2fc]"
        >
          <img
            src="/assets/icon-left-arrow.png"
            alt="Kembali"
            className="h-[24px] w-[24px] object-contain"
          />
        </button>

        <img
          src="/assets/logo-okelaundry.png"
          alt="Logo OkeLaundry"
          className="ml-3 h-[44px] w-[52px] object-cover"
        />

        <div className="ml-3.5">
          <h1 className="text-[18px] font-extrabold leading-[1.3] text-[#182e48]">
            OkeLaundry
          </h1>
          <p className="text-[12px] font-semibold text-[#62758a]">
            Layanan pelanggan
          </p>
        </div>
      </header>

      {/* Ringkasan laundry & chat messages */}
      <div className="flex-1 overflow-y-auto px-[26px] pb-4 pt-[20px]">
        <button
          type="button"
          onClick={() => onViewOrderStatus(activeOrder.id)}
          className="flex h-[80px] w-full cursor-pointer items-center gap-[16px] rounded-[16px] border border-[#dfe8f2] bg-white px-[15px] text-left transition-colors hover:border-[#1d64a9]"
        >
          <img
            src="/assets/icon-mobile-order.png"
            alt=""
            className="h-[40px] w-[40px] shrink-0 object-contain"
          />
          <div>
            <p className="text-[16px] font-bold text-[#182e48]">
              {activeOrder.number}
            </p>
            <p className="text-[13px] font-semibold text-[#62758a]">
              {activeOrder.statusDescription}
            </p>
          </div>
        </button>

        <div className="mt-[18px] flex justify-center">
          <span className="flex h-[26px] w-[84px] items-center justify-center rounded-[13px] bg-[#e8f2fc] text-[11px] font-semibold text-[#62758a]">
            Hari ini
          </span>
        </div>

        <div className="mt-[20px] flex flex-col gap-[16px]">
          {messages.map((msg) =>
            msg.sender === 'user' ? (
              <div
                key={msg.id}
                className="ml-auto max-w-[286px] rounded-bl-[16px] rounded-br-[4px] rounded-tl-[16px] rounded-tr-[16px] bg-[#1d64a9] px-[16px] py-[13px] text-white"
              >
                <p className="text-[14px] leading-[1.45]">{msg.text}</p>
                <p className="mt-2 text-right text-[11px] font-semibold text-[#d7e7f4]">
                  {msg.time}
                </p>
              </div>
            ) : (
              <div
                key={msg.id}
                className="mr-auto max-w-[306px] rounded-bl-[4px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px] border border-[#dfe8f2] bg-white px-[15px] py-[13px]"
              >
                <p className="text-[14px] leading-[1.45] text-[#182e48]">
                  {msg.text}
                </p>
                <p className="mt-2 text-right text-[11px] font-semibold text-[#62758a]">
                  {msg.time}
                </p>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Shortcut + Composer */}
      <div className="px-[26px] pb-[14px] pt-2">
        <button
          type="button"
          onClick={() => onViewOrderStatus(activeOrder.id)}
          className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#e8f2fc] text-[14px] font-semibold text-[#1d64a9] transition-colors hover:bg-[#d7e7f4]"
        >
          Lihat status {activeOrder.number.toLowerCase()}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex h-[96px] shrink-0 items-center gap-[12px] border-t border-[#dfe8f2] bg-white px-[24px]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          aria-label="Ketik pesan"
          className="h-[52px] flex-1 rounded-[14px] border border-[#d5e1ed] bg-[#f5f8fc] px-[15px] text-[14px] text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
        />
        <button
          type="submit"
          className="h-[52px] w-[62px] shrink-0 cursor-pointer rounded-[14px] bg-[#1d64a9] text-[14px] font-semibold text-white transition-colors hover:bg-[#17538d]"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};
