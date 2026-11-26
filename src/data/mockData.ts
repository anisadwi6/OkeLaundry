import type {
  AddonOption,
  ChatMessage,
  LaundryOrder,
  NotificationItem,
  ServiceOption,
  UserProfile,
} from '../types';

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'cks-1',
    category: 'Cuci Kering Setrika',
    duration: 'Paket 1 hari',
    pricePerKg: 7000,
    label: 'Paket 1 hari Cuci Kering Setrika (Rp 7.000/kg)',
  },
  {
    id: 'cks-2',
    category: 'Cuci Kering Setrika',
    duration: 'Paket 2 hari',
    pricePerKg: 5000,
    label: 'Paket 2 hari Cuci Kering Setrika (Rp 5.000/kg)',
  },
  {
    id: 'cks-3',
    category: 'Cuci Kering Setrika',
    duration: 'Paket 3 hari',
    pricePerKg: 4000,
    label: 'Paket 3 hari Cuci Kering Setrika (Rp 4.000/kg)',
  },
  {
    id: 'ckl-1',
    category: 'Cuci Kering Lipat',
    duration: 'Paket 1 hari',
    pricePerKg: 6000,
    label: 'Paket 1 hari Cuci Kering Lipat (Rp 6.000/kg)',
  },
  {
    id: 'ckl-2',
    category: 'Cuci Kering Lipat',
    duration: 'Paket 2 hari',
    pricePerKg: 4000,
    label: 'Paket 2 hari Cuci Kering Lipat (Rp 4.000/kg)',
  },
  {
    id: 'ckl-3',
    category: 'Cuci Kering Lipat',
    duration: 'Paket 3 hari',
    pricePerKg: 3500,
    label: 'Paket 3 hari Cuci Kering Lipat (Rp 3.500/kg)',
  },
];

export const ADDON_OPTIONS: AddonOption[] = [
  { id: 'none', name: 'Tidak Ada', pricePerPcs: 0 },
  { id: 'sprei', name: 'Cuci Sprei (Rp 5.000/pcs)', pricePerPcs: 5000 },
  { id: 'selimut', name: 'Cuci Selimut (Rp 10.000/pcs)', pricePerPcs: 10000 },
  { id: 'bedcover', name: 'Cuci Bed Cover (Rp 20.000/pcs)', pricePerPcs: 20000 },
];

export const DEFAULT_USER: UserProfile = {
  name: 'USER',
  email: 'User@email.com',
  username: 'Use123',
  password: 'password123',
  phone: '08123456789',
  points: 110,
};

export const INITIAL_ORDERS: LaundryOrder[] = [
  {
    id: '1011',
    number: 'Laundry #1011',
    customerName: 'USER',
    customerPhone: '08123456789',
    address: 'Jl. Melati No. 12, Jakarta',
    addressDetail: 'Dekat Masjid Al-Ikhlas',
    courierNote: 'Hubungi saat tiba',
    weightKg: 10,
    serviceName: 'Cuci Kering Setrika',
    durationLabel: 'Paket 1 hari',
    pricePerKg: 7000,
    addonLabel: 'Tidak Ada',
    addonPrice: 0,
    totalPrice: 70000,
    paymentMethod: 'tunai',
    paymentStatus: 'Menunggu pembayaran',
    status: 'dibersihkan',
    statusDescription: 'Sedang dalam proses pembersihan',
    photos: [
      '/assets/photo-shirt-3.png',
      '/assets/photo-shirt-1.png',
      '/assets/photo-shirt-2.png',
    ],
    createdAt: 'Hari ini, 09.30',
  },
  {
    id: '1001',
    number: 'Laundry #1001',
    customerName: 'USER',
    customerPhone: '08123456789',
    address: 'Jl. Melati No. 12, Jakarta',
    addressDetail: 'Dekat Masjid Al-Ikhlas',
    courierNote: 'Titipkan di pos satpam jika tidak di rumah',
    weightKg: 6,
    serviceName: 'Cuci Kering Lipat',
    durationLabel: 'Paket 1 hari',
    pricePerKg: 6000,
    addonLabel: 'Cuci Sprei (1 pcs)',
    addonPrice: 5000,
    totalPrice: 41000,
    paymentMethod: 'transfer_bank',
    paymentStatus: 'Lunas',
    status: 'diantar',
    statusDescription: 'Sedang dalam proses pengantaran',
    photos: [
      '/assets/photo-shirt-3.png',
      '/assets/photo-shirt-1.png',
      '/assets/photo-shirt-2.png',
    ],
    createdAt: 'Kemarin, 14.15',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Status Laundry',
    message: 'Laundry akan segera di antar',
    read: false,
    targetScreen: 'order-status-detail',
    orderId: '1001',
  },
  {
    id: 'n2',
    title: 'Status Laundry',
    message: 'Laundry akan segera di antar',
    read: true,
    targetScreen: 'order-status-detail',
    orderId: '1001',
  },
  {
    id: 'n3',
    title: 'Pesanan berhasil dibuat',
    message: 'Pesanan laundry kamu berhasil dibuat.',
    read: true,
    targetScreen: 'order-status-detail',
    orderId: '1011',
  },
  {
    id: 'n4',
    title: 'Laundry telah diterima',
    message: 'Periksa kembali pakaian dan laporkan jika ada yang hilang.',
    read: true,
    targetScreen: 'transaction-history',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'user',
    text: 'Halo Kak, saya ingin menanyakan status laundry #1011.',
    time: '09.41',
  },
  {
    id: 'c2',
    sender: 'admin',
    text: 'Halo Kak! Laundry #1011 sedang dalam proses pembersihan. Kami akan mengabari setelah siap diantar.',
    time: '09.42',
  },
  {
    id: 'c3',
    sender: 'user',
    text: 'Baik, terima kasih.',
    time: '09.43',
  },
];

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}
