'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Mail,
  Settings,
  Plus,
  Edit,
  Trash2,
  X,
  Star,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Coach } from '@/types/appwrite';
import { ID } from 'appwrite';

const stats = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Active Coaches",
    value: "324",
    change: "+8.2%",
    icon: Users,
    color: "bg-green-500"
  },
  {
    title: "Newsletter Subscribers",
    value: "8,921",
    change: "+23.1%",
    icon: Mail,
    color: "bg-purple-500"
  }
];

export function AdminDashboardSimplified() {
  const [activeTab, setActiveTab] = useState('overview');
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCoachForm, setShowCoachForm] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'coaches', label: 'Coaches', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.COACHES);
      setCoaches(response.documents as unknown as Coach[]);
    } catch (error) {
      console.error('Error fetching coaches:', error);
      showToast('Error fetching coaches', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCloseForm = () => {
    setShowCoachForm(false);
    setEditingCoach(null);
  };

  const handleCoachSaved = () => {
    fetchCoaches();
    handleCloseForm();
    showToast(editingCoach ? 'Coach updated successfully!' : 'Coach created successfully!', 'success');
  };

  const handleDeleteCoach = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coach?')) return;
    
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.COACHES, id);
      fetchCoaches();
      showToast('Coach deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting coach:', error);
      showToast('Error deleting coach', 'error');
    }
  };

  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg flex items-center gap-2 ${
            toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toastType === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {toastMessage}
        </motion.div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">{stat.title}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <p className="text-green-400 text-sm">{stat.change}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">New coach registration</span>
                    <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Newsletter subscriber joined</span>
                    <span className="text-gray-500 text-sm ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">New workout added</span>
                    <span className="text-gray-500 text-sm ml-auto">6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coaches' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Manage Coaches</h2>
                <button
                  onClick={() => setShowCoachForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Coach
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search coaches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Coaches List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.map((coach) => (
                  <motion.div
                    key={coach.$id}
                    layout
                    className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coach.imageUrl || '/api/placeholder/60/60'}
                          alt={coach.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white">{coach.name}</h3>
                          <p className="text-gray-400 text-sm">{coach.specialty}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCoach(coach);
                            setShowCoachForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCoach(coach.$id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Experience:</span>
                        <span className="text-white">{coach.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate:</span>
                        <span className="text-white">${coach.hourlyRate}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{coach.rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredCoaches.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No coaches found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Settings</h2>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Application Settings</h3>
                <p className="text-gray-400">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Coach Form Modal */}
      {showCoachForm && (
        <CoachForm 
          coach={editingCoach}
          onClose={handleCloseForm}
          onSave={handleCoachSaved}
        />
      )}
    </div>
  );
}

// Simple Coach Form Component
function CoachForm({ 
  coach, 
  onClose, 
  onSave 
}: { 
  coach: Coach | null; 
  onClose: () => void; 
  onSave: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: coach?.name || '',
    email: coach?.email || '',
    specialty: coach?.specialty || '',
    experience: coach?.experience || 0,
    hourlyRate: coach?.hourlyRate || 0,
    bio: coach?.bio || '',
    imageUrl: coach?.imageUrl || '',
    certifications: coach?.certifications || [],
    availability: coach?.availability || '',
    rating: coach?.rating || 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (coach) {
        // Update existing coach
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.COACHES,
          coach.$id,
          formData
        );
      } else {
        // Create new coach
        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.COACHES,
          ID.unique(),
          formData
        );
      }
      onSave();
    } catch (error) {
      console.error('Error saving coach:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">
            {coach ? 'Edit Coach' : 'Add New Coach'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Specialty *
              </label>
              <input
                type="text"
                required
                value={formData.specialty}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience (years) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hourly Rate ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.hourlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Availability
            </label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
              placeholder="e.g., Mon-Fri 9AM-5PM"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
            >
              {coach ? 'Update Coach' : 'Create Coach'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}