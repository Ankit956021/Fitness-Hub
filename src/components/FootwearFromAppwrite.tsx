'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Footwear } from '@/types/appwrite';

export function FootwearFromAppwrite() {
  const [footwear, setFootwear] = useState<Footwear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFootwear = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.FOOTWEAR
        );
        setFootwear(response.documents as unknown as Footwear[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFootwear();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading footwear...</p>
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
            <p className="text-red-400">Error loading footwear: {error}</p>
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
          <h2 className="text-4xl font-bold text-white mb-4">Athletic Footwear</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Step up your game with our recommended athletic footwear collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {footwear.map((shoe, index) => (
            <motion.div
              key={shoe.$id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-colors"
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={shoe.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'}
                  alt={shoe.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{shoe.name}</h3>
                    <p className="text-blue-400 font-medium">{shoe.brand}</p>
                  </div>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">
                    {shoe.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white">{shoe.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">${shoe.price}</span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{shoe.description}</p>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {(shoe.features && Array.isArray(shoe.features) ? shoe.features : []).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {(!shoe.features || !Array.isArray(shoe.features) || shoe.features.length === 0) && (
                      <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded text-xs">
                        No features listed
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Available Colors:</p>
                  <div className="flex flex-wrap gap-1">
                    {(shoe.colors && Array.isArray(shoe.colors) ? shoe.colors : []).map((color, colorIndex) => (
                      <span
                        key={colorIndex}
                        className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs"
                      >
                        {color}
                      </span>
                    ))}
                    {(!shoe.colors || !Array.isArray(shoe.colors) || shoe.colors.length === 0) && (
                      <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded text-xs">
                        No colors available
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Sizes Available:</p>
                  <div className="grid grid-cols-4 gap-1">
                    {(shoe.sizes && Array.isArray(shoe.sizes) ? shoe.sizes.slice(0, 8) : []).map((size, sizeIndex) => (
                      <span
                        key={sizeIndex}
                        className="bg-gray-700 text-white px-2 py-1 rounded text-xs text-center"
                      >
                        {size}
                      </span>
                    ))}
                    {(!shoe.sizes || !Array.isArray(shoe.sizes) || shoe.sizes.length === 0) && (
                      <span className="bg-gray-600/20 text-gray-400 px-2 py-1 rounded text-xs text-center">
                        No sizes available
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={shoe.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {footwear.length === 0 && (
          <div className="text-center">
            <p className="text-gray-400">No footwear available. Try seeding some data first.</p>
          </div>
        )}
      </div>
    </section>
  );
}
