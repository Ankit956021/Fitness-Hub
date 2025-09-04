'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Supplement } from '@/types/appwrite';

export function SupplementsFromAppwrite() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.SUPPLEMENTS
        );
        setSupplements(response.documents as unknown as Supplement[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading supplements...</p>
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
            <p className="text-red-400">Error loading supplements: {error}</p>
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
          <h2 className="text-4xl font-bold text-white mb-4">Recommended Supplements</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fuel your fitness journey with our carefully selected supplement recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supplements.map((supplement, index) => (
            <motion.div
              key={supplement.$id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-colors"
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={supplement.image || 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop'}
                  alt={supplement.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{supplement.name}</h3>
                    <p className="text-blue-400 font-medium">{supplement.brand}</p>
                  </div>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">
                    {supplement.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white">{supplement.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">${supplement.price}</span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{supplement.description}</p>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Key Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {(supplement.benefits && Array.isArray(supplement.benefits) ? supplement.benefits : []).map((benefit, benefitIndex) => (
                      <span
                        key={benefitIndex}
                        className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                    {(!supplement.benefits || !Array.isArray(supplement.benefits) || supplement.benefits.length === 0) && (
                      <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded text-xs">
                        No benefits listed
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-400 mb-6">
                  <div className="flex justify-between">
                    <span>Serving Size:</span>
                    <span className="text-white">{supplement.servingSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Servings:</span>
                    <span className="text-white">{supplement.servingsPerContainer}</span>
                  </div>
                </div>

                <a
                  href={supplement.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {supplements.length === 0 && (
          <div className="text-center">
            <p className="text-gray-400">No supplements available. Try seeding some data first.</p>
          </div>
        )}
      </div>
    </section>
  );
}
