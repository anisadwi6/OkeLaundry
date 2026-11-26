import { DEFAULT_USER } from '../data/mockData';
import type { UserProfile } from '../types';

const ACCOUNTS_KEY = 'okelaundry_accounts_v1';
const SESSION_KEY = 'okelaundry_session_v1';

export function getStoredAccounts(): UserProfile[] {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }
    const parsed = JSON.parse(raw) as UserProfile[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }
    return parsed;
  } catch {
    return [DEFAULT_USER];
  }
}

function saveAccounts(accounts: UserProfile[]): void {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Ignore storage quota errors in restricted contexts
  }
}

export function getActiveSessionUser(): UserProfile | null {
  try {
    const email = window.localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const accounts = getStoredAccounts();
    return (
      accounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase()) ??
      null
    );
  } catch {
    return null;
  }
}

export function setActiveSessionEmail(email: string | null): void {
  try {
    if (email) {
      window.localStorage.setItem(SESSION_KEY, email);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export function registerAccount(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): { ok: true; user: UserProfile } | { ok: false; message: string } {
  const accounts = getStoredAccounts();
  const normalizedEmail = payload.email.trim().toLowerCase();

  const exists = accounts.some(
    (acc) => acc.email.toLowerCase() === normalizedEmail
  );
  if (exists) {
    return {
      ok: false,
      message: 'Email sudah terdaftar. Silakan login atau gunakan email lain.',
    };
  }

  const baseUsername =
    payload.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 10) || 'user';

  const newUser: UserProfile = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    username: `${baseUsername}${accounts.length + 1}`,
    password: payload.password,
    phone: payload.phone.trim(),
    points: 110,
  };

  saveAccounts([...accounts, newUser]);
  return { ok: true, user: newUser };
}

export function authenticateAccount(
  identifier: string,
  password: string
): { ok: true; user: UserProfile } | { ok: false; message: string } {
  const cleanId = identifier.trim().toLowerCase();
  if (!cleanId || !password) {
    return {
      ok: false,
      message: 'Masukkan email dan password terlebih dahulu.',
    };
  }

  const accounts = getStoredAccounts();
  const matched = accounts.find(
    (acc) =>
      acc.email.toLowerCase() === cleanId ||
      acc.username.toLowerCase() === cleanId
  );

  if (!matched) {
    return {
      ok: false,
      message: 'Akun belum terdaftar. Silakan daftar terlebih dahulu.',
    };
  }

  if (matched.password !== password) {
    return {
      ok: false,
      message: 'Password salah. Silakan periksa kembali.',
    };
  }

  return { ok: true, user: matched };
}

export function resetAccountPassword(
  email: string,
  newPassword: string
): { ok: true } | { ok: false; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    return { ok: false, message: 'Masukkan email yang terdaftar.' };
  }
  if (newPassword.length < 8) {
    return { ok: false, message: 'Password baru minimal 8 karakter.' };
  }

  const accounts = getStoredAccounts();
  const idx = accounts.findIndex(
    (acc) => acc.email.toLowerCase() === cleanEmail
  );
  if (idx === -1) {
    return { ok: false, message: 'Email tidak ditemukan di daftar akun.' };
  }

  const updated = accounts.map((acc, i) =>
    i === idx ? { ...acc, password: newPassword } : acc
  );
  saveAccounts(updated);
  return { ok: true };
}

export function updateStoredAccount(
  previousEmail: string,
  changes: Partial<UserProfile>
): UserProfile | null {
  const accounts = getStoredAccounts();
  const idx = accounts.findIndex(
    (acc) => acc.email.toLowerCase() === previousEmail.toLowerCase()
  );
  if (idx === -1) return null;

  const updatedUser: UserProfile = { ...accounts[idx], ...changes };
  const nextAccounts = accounts.map((acc, i) => (i === idx ? updatedUser : acc));
  saveAccounts(nextAccounts);
  setActiveSessionEmail(updatedUser.email);
  return updatedUser;
}

export function upsertSocialAccount(provider: 'Google' | 'Facebook'): UserProfile {
  const accounts = getStoredAccounts();
  const email = `${provider.toLowerCase()}@okelaundry.id`;
  const existing = accounts.find(
    (acc) => acc.email.toLowerCase() === email
  );
  if (existing) {
    return existing;
  }
  const socialUser: UserProfile = {
    name: `Pengguna ${provider}`,
    email,
    username: `${provider.toLowerCase()}user`,
    password: `${provider.toLowerCase()}1234`,
    phone: '08123456789',
    points: 110,
  };
  saveAccounts([...accounts, socialUser]);
  return socialUser;
}
