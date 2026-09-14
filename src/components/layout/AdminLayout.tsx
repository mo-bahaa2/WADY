import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { NotificationsDrawer } from './NotificationsDrawer';
import { Modal } from '../ui/Modal';
import { notifications } from '../../data/notifications';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { logout } = useAuth();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div dir="rtl" className="flex w-full min-h-screen bg-canvas text-ink">
      <Sidebar collapsed={collapsed} onLogout={() => setLogoutOpen(true)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopHeader
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((v) => !v)}
          onOpenNotifications={() => setNotifOpen(true)}
          onLogout={() => setLogoutOpen(true)}
          unread={unread}
        />
        
        <main className="flex-1 p-8 min-w-0">
          <Outlet />
        </main>
      </div>

      <NotificationsDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="تسجيل الخروج"
        description="هل أنت متأكد من تسجيل الخروج من لوحة تحكم وِدي؟"
        tone="warning"
        confirmLabel="تسجيل الخروج"
        confirmVariant="danger"
        onConfirm={() => {
          setLogoutOpen(false);
          logout();
        }}
      />
    </div>
  );
}