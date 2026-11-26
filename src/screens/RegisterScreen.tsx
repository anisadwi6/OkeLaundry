import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import type { ScreenName } from '../types';

interface RegisterScreenProps {
  onRegister: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => { ok: boolean; message?: string };
  onNavigate: (screen: ScreenName) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onNavigate,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !password) {
      setError('Mohon lengkapi semua data pendaftaran.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Format email tidak valid.');
      return;
    }
    if (password.length < 8) {
      setError('Password minimal terdiri dari 8 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    const res = onRegister({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password,
    });
    if (!res.ok && res.message) {
      setError(res.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc] pb-8">
      <PageHeader title="Daftar akun" onBack={() => onNavigate('login')} />

      <div className="px-[32px]">
        <div className="flex flex-col items-center text-center">
          <img
            src="/assets/logo-okelaundry.png"
            alt="Logo OkeLaundry"
            className="h-[54px] w-[64px] object-cover"
          />
          <h2 className="mt-3 text-[28px] font-extrabold leading-[1.3] text-[#1d64a9]">
            Buat akun baru
          </h2>
          <p className="mt-1 text-[14px] leading-[1.45] text-[#62758a]">
            Daftar untuk pesan laundry dan pantau pakaianmu dengan mudah.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-[22px] flex flex-col gap-[12px]">
          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Nama lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="Masukkan nama lengkap"
              className="h-[48px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[15px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              placeholder="Masukkan email"
              className="h-[48px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[15px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Nomor telepon
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError(null);
              }}
              placeholder="Masukkan nomor telepon"
              className="h-[48px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[15px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Buat password"
                className="h-[48px] w-full rounded-[12px] border border-[#d5e1ed] bg-white pl-[15px] pr-[44px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password"
                className="absolute right-[13px] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img
                  src="/assets/icon-blind.png"
                  alt=""
                  className="h-[20px] w-[20px] object-contain"
                />
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Konfirmasi password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Ulangi password"
                className="h-[48px] w-full rounded-[12px] border border-[#d5e1ed] bg-white pl-[15px] pr-[44px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label="Toggle konfirmasi password"
                className="absolute right-[13px] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img
                  src="/assets/icon-blind.png"
                  alt=""
                  className="h-[20px] w-[20px] object-contain"
                />
              </button>
            </div>
          </div>

          <p className="mt-1 text-[12px] font-semibold text-[#62758a]">
            Gunakan minimal 8 karakter untuk password.
          </p>

          {error ? (
            <p className="rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-2 h-[52px] w-full cursor-pointer rounded-[14px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d]"
          >
            Daftar
          </button>
        </form>

        <p className="mt-6 text-center text-[14px] font-bold text-[#1d64a9]">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="cursor-pointer hover:underline"
          >
            Sudah punya akun? Login
          </button>
        </p>
      </div>
    </div>
  );
};
