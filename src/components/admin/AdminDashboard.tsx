'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Video, 
  Calendar, 
  DollarSign, 
  Plus,
  Settings,
  Mail,
  TrendingUp
} from 'lucide-react';

const stats = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Active Subscriptions",
    value: "8,921",
    change: "+8.2%",
    icon: Calendar,
    color: "bg-green-500"
  },
  {
    title: "Monthly Revenue",
    value: "$89,234",
    change: "+15.3%",
    icon: DollarSign,
    color: "bg-purple-500"
  },
  {
    title: "Workout Videos",
    value: "542",
    change: "+23",
    icon: Video,
    color: "bg-orange-500"
  }
];

const recentActivities = [
  { type: "user", message: "New user registration", time: "2 min ago" },
  { type: "payment", message: "Payment received from John Doe", time: "5 min ago" },
  { type: "video", message: "New workout video uploaded", time: "1 hour ago" },
  { type: "coaching", message: "Coaching session booked", time: "2 hours ago" },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: Video },
    { id: 'coaching', label: 'Coaching', icon: Calendar },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your fitness platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} rounded-lg p-3`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart Placeholder */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Revenue Overview</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">Chart placeholder</p>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Content Management</h3>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Content
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">HIIT Cardio Blast</h4>
                    <p className="text-gray-400 text-sm">Cardio • 30 min • 4.8★</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                    <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Strength Training Basics</h4>
                    <p className="text-gray-400 text-sm">Strength • 45 min • 4.9★</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                    <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other tabs can be added similarly */}
        {activeTab !== 'overview' && activeTab !== 'content' && (
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label} Management
            </h3>
            <p className="text-gray-400">This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
}
