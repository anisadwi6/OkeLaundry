import { useCallback, useMemo, useState } from 'react';
import {
  ADDON_OPTIONS,
  DEFAULT_USER,
  INITIAL_CHAT_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  SERVICE_OPTIONS,
} from './data/mockData';
import { ChatScreen } from './screens/ChatScreen';
import { CheckPriceScreen } from './screens/CheckPriceScreen';
import { CreateOrderScreen } from './screens/CreateOrderScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { OrderStatusDetailScreen } from './screens/OrderStatusDetailScreen';
import { OrderStatusListScreen } from './screens/OrderStatusListScreen';
import { OrderSuccessScreen } from './screens/OrderSuccessScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { SplashScreen } from './screens/SplashScreen';
import { TransactionHistoryScreen } from './screens/TransactionHistoryScreen';
import type {
  ChatMessage,
  DraftOrder,
  LaundryOrder,
  NotificationItem,
  PaymentMethod,
  ScreenName,
  UserProfile,
} from './types';
import {
  authenticateAccount,
  getActiveSessionUser,
  registerAccount,
  resetAccountPassword,
  setActiveSessionEmail,
  updateStoredAccount,
  upsertSocialAccount,
} from './utils/authStorage';

function createInitialDraft(user: UserProfile): DraftOrder {
  return {
    customerName: user.name === 'USER' ? '' : user.name,
    customerPhone: user.phone,
    address: '',
    addressDetail: '',
    courierNote: '',
    weightKg: 10,
    serviceId: 'cks-1',
    addonId: 'none',
    addonQty: 1,
    photos: [
      '/assets/photo-shirt-3.png',
      '/assets/photo-shirt-1.png',
      '/assets/photo-shirt-2.png',
    ],
  };
}

export function App() {
  const [initialSessionUser] = useState<UserProfile | null>(() =>
    getActiveSessionUser()
  );
  const [screen, setScreen] = useState<ScreenName>('splash');
  const [user, setUser] = useState<UserProfile>(
    () => initialSessionUser ?? DEFAULT_USER
  );
  const [loginPrefillEmail, setLoginPrefillEmail] = useState<string>('');
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [orders, setOrders] = useState<LaundryOrder[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    INITIAL_CHAT_MESSAGES
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string>('1011');
  const [latestOrderId, setLatestOrderId] = useState<string>('1011');
  const [draftOrder, setDraftOrder] = useState<DraftOrder>(() =>
    createInitialDraft(initialSessionUser ?? DEFAULT_USER)
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const activeOrders = useMemo(
    () => orders.filter((o) => o.status !== 'selesai'),
    [orders]
  );

  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === 'selesai'),
    [orders]
  );

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selectedOrderId) ?? orders[0],
    [orders, selectedOrderId]
  );

  const latestOrder = useMemo(
    () => orders.find((o) => o.id === latestOrderId) ?? orders[0],
    [orders, latestOrderId]
  );

  const handleSplashContinue = useCallback(() => {
    setScreen((prev) => {
      if (prev !== 'splash') return prev;
      return getActiveSessionUser() ? 'home' : 'login';
    });
  }, []);

  const handleLogin = (emailOrUsername: string, password: string) => {
    const res = authenticateAccount(emailOrUsername, password);
    if (!res.ok) {
      return { ok: false, message: res.message };
    }
    setUser(res.user);
    setActiveSessionEmail(res.user.email);
    setDraftOrder(createInitialDraft(res.user));
    setLoginNotice(null);
    setScreen('home');
    return { ok: true };
  };

  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    const socialUser = upsertSocialAccount(provider);
    setUser(socialUser);
    setActiveSessionEmail(socialUser.email);
    setDraftOrder(createInitialDraft(socialUser));
    setLoginNotice(null);
    setScreen('home');
  };

  const handleRegister = (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const res = registerAccount(payload);
    if (!res.ok) {
      return { ok: false, message: res.message };
    }
    setLoginPrefillEmail(res.user.email);
    setLoginNotice(
      'Pendaftaran berhasil! Silakan login dengan email dan password yang baru kamu buat.'
    );
    setScreen('login');
    return { ok: true };
  };

  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    const saved = updateStoredAccount(user.email, updated);
    if (saved) {
      setUser(saved);
    } else {
      setUser((prev) => ({ ...prev, ...updated }));
    }
  };

  const handleLogout = () => {
    setActiveSessionEmail(null);
    setLoginPrefillEmail(user.email);
    setLoginNotice('Kamu telah keluar dari akun.');
    setScreen('login');
  };

  const handleConfirmOrder = (method: PaymentMethod) => {
    const service =
      SERVICE_OPTIONS.find((s) => s.id === draftOrder.serviceId) ??
      SERVICE_OPTIONS[0];
    const addon =
      ADDON_OPTIONS.find((a) => a.id === draftOrder.addonId) ??
      ADDON_OPTIONS[0];

    const totalPrice =
      draftOrder.weightKg * service.pricePerKg + addon.pricePerPcs;

    const newId = String(1012 + orders.length);
    const newOrder: LaundryOrder = {
      id: newId,
      number: `Laundry #${newId}`,
      customerName: draftOrder.customerName || user.name,
      customerPhone: draftOrder.customerPhone || user.phone,
      address: draftOrder.address,
      addressDetail: draftOrder.addressDetail,
      courierNote: draftOrder.courierNote,
      weightKg: draftOrder.weightKg,
      serviceName: service.category,
      durationLabel: service.duration,
      pricePerKg: service.pricePerKg,
      addonLabel: addon.name,
      addonPrice: addon.pricePerPcs,
      totalPrice,
      paymentMethod: method,
      paymentStatus: 'Menunggu pembayaran',
      status: 'dijemput',
      statusDescription: 'Menunggu penjemputan kurir',
      photos: draftOrder.photos,
      createdAt: 'Baru saja',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderId(newId);
    setSelectedOrderId(newId);
    const updatedUser = updateStoredAccount(user.email, {
      points: user.points + 10,
    });
    setUser((prev) => updatedUser ?? { ...prev, points: prev.points + 10 });
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Pesanan berhasil dibuat',
        message: `${newOrder.number} (${newOrder.serviceName}) sedang menunggu penjemputan.`,
        read: false,
        targetScreen: 'order-status-detail',
        orderId: newId,
      },
      ...prev,
    ]);
    setDraftOrder(createInitialDraft(user));
    setScreen('order-success');
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'selesai',
              paymentStatus: 'Lunas',
              statusDescription: 'Laundry telah diterima pelanggan',
            }
          : order
      )
    );
    setScreen('transaction-history');
  };

  const handleSendChat = (text: string) => {
    const now = new Date();
    const timeLabel = `${String(now.getHours()).padStart(2, '0')}.${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: timeLabel,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'admin',
        text: `Terima kasih sudah menghubungi OkeLaundry! Pesanan ${
          selectedOrder?.number ?? 'Laundry #1011'
        } terus kami pantau dan akan segera kami perbarui statusnya.`,
        time: timeLabel,
      };
      setChatMessages((prev) => [...prev, reply]);
    }, 650);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onContinue={handleSplashContinue} />;
      case 'login':
        return (
          <LoginScreen
            defaultEmail={loginPrefillEmail}
            noticeMessage={loginNotice}
            onClearNotice={() => setLoginNotice(null)}
            onLogin={handleLogin}
            onResetPassword={resetAccountPassword}
            onSocialLogin={handleSocialLogin}
            onNavigate={(target) => {
              setLoginNotice(null);
              setScreen(target);
            }}
          />
        );
      case 'register':
        return (
          <RegisterScreen onRegister={handleRegister} onNavigate={setScreen} />
        );
      case 'home':
        return (
          <HomeScreen
            user={user}
            unreadCount={unreadCount}
            onNavigate={(target) => {
              if (target === 'create-order') {
                setDraftOrder(createInitialDraft(user));
              }
              setScreen(target);
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            unreadCount={unreadCount}
            onSaveProfile={handleSaveProfile}
            onLogout={handleLogout}
            onBack={() => setScreen('home')}
            onNavigate={setScreen}
          />
        );
      case 'notifications':
        return (
          <NotificationsScreen
            notifications={notifications}
            onMarkAsRead={(id) =>
              setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
              )
            }
            onOpenNotification={(item) => {
              if (item.orderId) setSelectedOrderId(item.orderId);
              if (item.targetScreen) setScreen(item.targetScreen);
            }}
            onBack={() => setScreen('home')}
            onNavigate={setScreen}
          />
        );
      case 'create-order':
        return (
          <CreateOrderScreen
            draft={draftOrder}
            unreadCount={unreadCount}
            onChangeDraft={setDraftOrder}
            onProceedToPayment={() => setScreen('payment')}
            onBack={() => setScreen('home')}
            onNavigate={setScreen}
          />
        );
      case 'payment':
        return (
          <PaymentScreen
            draft={draftOrder}
            unreadCount={unreadCount}
            onConfirmOrder={handleConfirmOrder}
            onBack={() => setScreen('create-order')}
            onNavigate={setScreen}
          />
        );
      case 'order-success':
        return (
          <OrderSuccessScreen
            order={latestOrder}
            unreadCount={unreadCount}
            onViewOrderStatus={(orderId) => {
              setSelectedOrderId(orderId);
              setScreen('order-status-detail');
            }}
            onNavigate={setScreen}
          />
        );
      case 'transaction-history':
        return (
          <TransactionHistoryScreen
            completedOrders={completedOrders}
            unreadCount={unreadCount}
            onBack={() => setScreen('home')}
            onNavigate={setScreen}
          />
        );
      case 'check-price':
        return (
          <CheckPriceScreen
            unreadCount={unreadCount}
            onBack={() => setScreen('home')}
            onNavigate={setScreen}
          />
        );
      case 'order-status-list':
        return (
          <OrderStatusListScreen
            orders={activeOrders.length > 0 ? activeOrders : orders}
            unreadCount={unreadCount}
            onSelectOrder={(orderId) => {
              setSelectedOrderId(orderId);
              setScreen('order-status-detail');
            }}
            onBack={() => setScreen('home')}
            onNavigate={setScreen}
          />
        );
      case 'order-status-detail':
        return (
          <OrderStatusDetailScreen
            order={selectedOrder}
            unreadCount={unreadCount}
            onCompleteOrder={handleCompleteOrder}
            onBack={() => setScreen('order-status-list')}
            onNavigate={setScreen}
          />
        );
      case 'chat':
        return (
          <ChatScreen
            messages={chatMessages}
            activeOrder={selectedOrder}
            onSendMessage={handleSendChat}
            onViewOrderStatus={(orderId) => {
              setSelectedOrderId(orderId);
              setScreen('order-status-detail');
            }}
            onBack={() => setScreen('home')}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#dce7f3] sm:py-6">
      <main className="no-scrollbar relative flex min-h-screen w-full max-w-[402px] flex-col overflow-y-auto bg-[#f5f8fc] shadow-2xl sm:min-h-[874px] sm:max-h-[92vh] sm:rounded-[28px] sm:border sm:border-[#d5e1ed]">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
