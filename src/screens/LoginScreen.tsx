import React, { useEffect, useState } from 'react';
import type { ScreenName } from '../types';

interface LoginScreenProps {
  defaultEmail?: string;
  noticeMessage?: string | null;
  onClearNotice?: () => void;
  onLogin: (email: string, password: string) => { ok: boolean; message?: string };
  onResetPassword: (
    email: string,
    newPassword: string
  ) => { ok: boolean; message?: string };
  onSocialLogin: (provider: 'Google' | 'Facebook') => void;
  onNavigate: (screen: ScreenName) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  defaultEmail = '',
  noticeMessage = null,
  onClearNotice,
  onLogin,
  onResetPassword,
  onSocialLogin,
  onNavigate,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showResetBox, setShowResetBox] = useState(false);
  const [resetEmail, setResetEmail] = useState(defaultEmail);
  const [resetNewPass, setResetNewPass] = useState('');
  const [resetFeedback, setResetFeedback] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
      setResetEmail(defaultEmail);
    }
  }, [defaultEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClearNotice?.();
    const res = onLogin(email.trim(), password);
    if (!res.ok && res.message) {
      setErrorMessage(res.message);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onResetPassword(resetEmail.trim(), resetNewPass);
    if (res.ok) {
      setEmail(resetEmail.trim());
      setPassword('');
      setResetNewPass('');
      setResetFeedback({
        ok: true,
        text: 'Password berhasil diperbarui! Silakan login dengan password baru.',
      });
    } else {
      setResetFeedback({
        ok: false,
        text: res.message ?? 'Gagal memperbarui password.',
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc] px-[32px] pb-8 pt-[78px]">
      <div className="mx-auto flex h-[160px] w-[160px] items-center justify-center rounded-full">
        <div className="relative flex h-[160px] w-[160px] items-center justify-center">
          <img
            src="/assets/ellipse-login.svg"
            alt=""
            width={160}
            height={160}
            className="absolute inset-0"
          />
          <img
            src="/assets/user-avatar.png"
            alt="User"
            className="relative z-10 h-[125px] w-[125px] object-contain"
          />
        </div>
      </div>

      <h1 className="mt-[32px] text-center text-[30px] font-extrabold leading-tight text-[#2368ad]">
        Selamat Datang!
      </h1>

      {noticeMessage ? (
        <div className="mt-4 rounded-[12px] border border-[#b9d7f4] bg-[#e8f2fc] px-3.5 py-2.5 text-center text-[13px] font-semibold text-[#1d64a9]">
          {noticeMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-[28px] flex flex-col">
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(null);
            onClearNotice?.();
          }}
          placeholder="Email atau Username"
          aria-label="Email"
          className="h-[54px] w-full rounded-[16px] border border-[#d5e1ed] bg-white px-[18px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
        />

        <div className="relative mt-[18px]">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(null);
              onClearNotice?.();
            }}
            placeholder="Password"
            aria-label="Password"
            className="h-[54px] w-full rounded-[16px] border border-[#d5e1ed] bg-white pl-[18px] pr-[46px] text-[14px] font-semibold text-[#182e48] placeholder:text-[#62758a] focus:border-[#1d64a9] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 cursor-pointer p-1 opacity-75 hover:opacity-100"
          >
            <img
              src="/assets/icon-blind.png"
              alt=""
              className="h-[20px] w-[20px] object-contain"
            />
          </button>
        </div>

        <div className="mt-[14px] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setShowResetBox((prev) => !prev);
              setResetFeedback(null);
            }}
            className="cursor-pointer text-[13px] font-semibold text-[#182e48] hover:text-[#1d64a9]"
          >
            Lupa Password?
          </button>
        </div>

        {errorMessage ? (
          <p className="mt-3 rounded-[12px] border border-red-200 bg-red-50 px-3 py-2 text-center text-[12px] font-semibold text-red-600">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-[22px] h-[54px] w-full cursor-pointer rounded-[16px] bg-[#1d64a9] text-[16px] font-semibold text-white transition-colors hover:bg-[#17538d] active:scale-[0.99]"
        >
          Login
        </button>
      </form>

      {showResetBox ? (
        <form
          onSubmit={handleResetSubmit}
          className="mt-4 rounded-[16px] border border-[#dfe8f2] bg-white p-4"
        >
          <p className="text-[13px] font-bold text-[#182e48]">
            Atur Ulang Password
          </p>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Email terdaftar"
            className="mt-2 h-[42px] w-full rounded-[10px] border border-[#d5e1ed] px-3 text-[13px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
          />
          <input
            type="password"
            value={resetNewPass}
            onChange={(e) => setResetNewPass(e.target.value)}
            placeholder="Password baru (min. 8 karakter)"
            className="mt-2 h-[42px] w-full rounded-[10px] border border-[#d5e1ed] px-3 text-[13px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
          />
          {resetFeedback ? (
            <p
              className={`mt-2 text-[12px] font-semibold ${
                resetFeedback.ok ? 'text-[#1d64a9]' : 'text-red-600'
              }`}
            >
              {resetFeedback.text}
            </p>
          ) : null}
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="h-[38px] flex-1 cursor-pointer rounded-[10px] bg-[#1d64a9] text-[13px] font-semibold text-white hover:bg-[#17538d]"
            >
              Simpan Password
            </button>
            <button
              type="button"
              onClick={() => setShowResetBox(false)}
              className="h-[38px] cursor-pointer rounded-[10px] border border-[#dfe8f2] px-3 text-[13px] font-semibold text-[#62758a]"
            >
              Tutup
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-[32px] flex items-center justify-center gap-4">
        <img src="/assets/line-left.svg" alt="" width={62} height={2} />
        <span className="text-[13px] font-semibold text-[#62758a]">
          Atau login menggunakan
        </span>
        <img src="/assets/line-right.svg" alt="" width={62} height={2} />
      </div>

      <div className="mt-[22px] flex items-center justify-center gap-[35px]">
        <button
          type="button"
          onClick={() => onSocialLogin('Facebook')}
          aria-label="Login menggunakan Facebook"
          className="flex h-[55px] w-[53px] cursor-pointer items-center justify-center rounded-[12px] bg-white shadow-xs transition-transform hover:scale-105"
        >
          <img
            src="/assets/icon-facebook.png"
            alt="Facebook"
            className="h-[36px] w-[36px] object-cover"
          />
        </button>
        <button
          type="button"
          onClick={() => onSocialLogin('Google')}
          aria-label="Login menggunakan Google"
          className="flex h-[55px] w-[53px] cursor-pointer items-center justify-center rounded-[12px] bg-white shadow-xs transition-transform hover:scale-105"
        >
          <img
            src="/assets/icon-google.png"
            alt="Google"
            className="h-[46px] w-[46px] object-cover"
          />
        </button>
      </div>

      <p className="mt-auto pt-6 text-center text-[13px] font-bold text-[#9f9f9f]">
        Belum punya akun?{' '}
        <button
          type="button"
          onClick={() => onNavigate('register')}
          className="cursor-pointer font-bold text-[#2368ad] hover:underline"
        >
          Daftar Sekarang
        </button>
      </p>
    </div>
  );
};
