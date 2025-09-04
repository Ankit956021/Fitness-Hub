'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Coach } from '@/types/appwrite';

export function CoachesFromAppwrite() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.COACHES
        );
        setCoaches(response.documents as unknown as Coach[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading coaches...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error loading coaches: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our Expert Coaches</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Work with certified professionals who will guide you to achieve your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.$id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors"
            >
              <div className="text-center mb-6">
                <Image
                  src={coach.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'}
                  alt={coach.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                <p className="text-blue-400 font-medium">{coach.specialty}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white">{typeof coach.experience === 'number' ? coach.experience : parseInt(coach.experience) || 5} years</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white">{typeof coach.rating === 'number' ? coach.rating.toFixed(1) : parseFloat(coach.rating).toFixed(1) || '4.8'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rate</span>
                  <span className="text-white">${coach.hourlyRate || 75}/hr</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{coach.bio}</p>

              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Certifications:</p>
                <div className="flex flex-wrap gap-1">
                  {(coach.certifications && Array.isArray(coach.certifications) ? coach.certifications : []).map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                  {(!coach.certifications || !Array.isArray(coach.certifications) || coach.certifications.length === 0) && (
                    <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded text-xs">
                      No certifications listed
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                <Clock className="w-4 h-4" />
                <span>{coach.availability}</span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Book Session
              </button>
            </motion.div>
          ))}
        </div>

        {coaches.length === 0 && (
          <div className="text-center">
            <p className="text-gray-400">No coaches available. Try seeding some data first.</p>
          </div>
        )}
      </div>
    </section>
  );
}
