export type ScreenName =
  | 'splash'
  | 'login'
  | 'register'
  | 'home'
  | 'profile'
  | 'notifications'
  | 'create-order'
  | 'payment'
  | 'order-success'
  | 'transaction-history'
  | 'check-price'
  | 'order-status-list'
  | 'order-status-detail'
  | 'chat';

export type OrderStepStatus = 'dijemput' | 'dibersihkan' | 'diantar' | 'selesai';

export type PaymentMethod = 'tunai' | 'transfer_bank' | 'dompet_digital';

export interface ServiceOption {
  id: string;
  category: 'Cuci Kering Setrika' | 'Cuci Kering Lipat';
  duration: 'Paket 1 hari' | 'Paket 2 hari' | 'Paket 3 hari';
  pricePerKg: number;
  label: string;
}

export interface AddonOption {
  id: string;
  name: string;
  pricePerPcs: number;
}

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  points: number;
}

export interface LaundryOrder {
  id: string;
  number: string;
  customerName: string;
  customerPhone: string;
  address: string;
  addressDetail: string;
  courierNote: string;
  weightKg: number;
  serviceName: string;
  durationLabel: string;
  pricePerKg: number;
  addonLabel: string;
  addonPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Menunggu pembayaran' | 'Lunas';
  status: OrderStepStatus;
  statusDescription: string;
  photos: string[];
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  targetScreen?: ScreenName;
  orderId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  time: string;
}

export interface DraftOrder {
  customerName: string;
  customerPhone: string;
  address: string;
  addressDetail: string;
  courierNote: string;
  weightKg: number;
  serviceId: string;
  addonId: string;
  addonQty: number;
  photos: string[];
}
