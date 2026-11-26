import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { PageHeader } from '../components/PageHeader';
import type { ScreenName, UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  unreadCount: number;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  onBack: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  unreadCount,
  onSaveProfile,
  onLogout,
  onBack,
  onNavigate,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [phone, setPhone] = useState(user.phone);
  const [showPassword, setShowPassword] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    onSaveProfile({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      username: username.trim() || user.username,
      password: password || user.password,
      phone: phone.trim() || user.phone,
    });
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f5f8fc]">
      <PageHeader
        title="Edit Profil"
        onBack={onBack}
        rightAction={
          <button
            type="button"
            onClick={handleSave}
            aria-label="Simpan profil"
            className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] transition-colors hover:bg-[#e8f2fc]"
          >
            <img
              src="/assets/icon-done.png"
              alt="Simpan"
              className="h-[24px] w-[24px] object-contain"
            />
          </button>
        }
      />

      <div className="flex-1 px-[26px] pb-6">
        <div className="mt-2 flex flex-col items-center">
          <div className="relative flex h-[121px] w-[121px] items-center justify-center">
            <img
              src="/assets/ellipse-profile.svg"
              alt=""
              width={121}
              height={121}
              className="absolute inset-0"
            />
            <img
              src="/assets/user-avatar.png"
              alt="Foto profil"
              className="relative z-10 h-[95px] w-[95px] object-contain"
            />
          </div>
        </div>

        {savedMessage ? (
          <div className="mt-3 rounded-[12px] bg-[#e8f2fc] px-3 py-2 text-center text-[13px] font-semibold text-[#1d64a9]">
            Perubahan profil berhasil disimpan!
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-[12px]">
          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px] font-bold text-[#182e48]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
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
                onChange={(e) => setPassword(e.target.value)}
                className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white pl-[20px] pr-[48px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Lihat atau sembunyikan password"
                className="absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer"
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
              Nomor Telepon
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[50px] w-full rounded-[12px] border border-[#d5e1ed] bg-white px-[20px] text-[14px] font-semibold text-[#182e48] focus:border-[#1d64a9] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onLogout}
            className="flex h-[48px] w-[150px] cursor-pointer items-center justify-center gap-3 rounded-[12px] border border-[#dfe8f2] bg-white text-[16px] font-bold text-[#182e48] transition-colors hover:border-[#1d64a9] hover:bg-[#e8f2fc]"
          >
            <img
              src="/assets/icon-logout.png"
              alt=""
              className="h-[26px] w-[26px] object-contain"
            />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      <BottomNav
        activeTab="profile"
        unreadCount={unreadCount}
        onNavigate={onNavigate}
      />
    </div>
  );
};
