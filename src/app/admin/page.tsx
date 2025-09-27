import { AdminDashboardSimplified } from '@/components/admin/AdminDashboardSimplified';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - FitnessHub',
  description: 'Manage your fitness content and users',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* In a real app, you'd check authentication here */}
      <AdminAuth>
        <AdminDashboardSimplified />
      </AdminAuth>
    </div>
  );
}
