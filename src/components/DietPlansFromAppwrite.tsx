'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { DietPlan } from '@/types/appwrite';

export function DietPlansFromAppwrite() {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample data for demonstration (since diet-plans collection may not exist yet)
  const sampleDietPlans: DietPlan[] = [
    {
      $id: '1',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      name: 'Weight Loss Pro',
      description: 'A comprehensive diet plan designed for sustainable weight loss with balanced nutrition.',
      calories: 1800,
      protein: 120,
      carbs: 180,
      fat: 60,
      meals: [
        {
          name: 'Protein Power Breakfast',
          calories: 400,
          protein: 25,
          carbs: 35,
          fat: 15,
          ingredients: ['Oats', 'Greek Yogurt', 'Berries', 'Almonds'],
          instructions: 'Mix oats with Greek yogurt, top with berries and almonds'
        },
        {
          name: 'Lean & Green Lunch',
          calories: 500,
          protein: 35,
          carbs: 45,
          fat: 20,
          ingredients: ['Grilled Chicken', 'Quinoa', 'Mixed Vegetables', 'Olive Oil'],
          instructions: 'Grill chicken, serve with quinoa and steamed vegetables'
        }
      ],
      duration: 12,
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop'
    },
    {
      $id: '2',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      name: 'Muscle Building Diet',
      description: 'High-protein nutrition plan to support muscle growth and strength training.',
      calories: 2500,
      protein: 180,
      carbs: 280,
      fat: 85,
      meals: [
        {
          name: 'Power Breakfast',
          calories: 600,
          protein: 35,
          carbs: 55,
          fat: 20,
          ingredients: ['Eggs', 'Whole Grain Toast', 'Avocado', 'Turkey Bacon'],
          instructions: 'Scramble eggs, serve with toast and avocado'
        }
      ],
      duration: 16,
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&h=300&fit=crop'
    },
    {
      $id: '3',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      name: 'Keto Transformation',
      description: 'Low-carb, high-fat ketogenic diet plan for rapid fat loss and mental clarity.',
      calories: 2000,
      protein: 100,
      carbs: 50,
      fat: 150,
      meals: [],
      duration: 8,
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    }
  ];

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          'diet-plans'
        );
        if (response.documents.length > 0) {
          setDietPlans(response.documents as unknown as DietPlan[]);
        } else {
          // Use sample data if no documents found
          setDietPlans(sampleDietPlans);
        }
      } catch (err) {
        // Use sample data if collection doesn't exist
        setDietPlans(sampleDietPlans);
        console.log('Using sample diet plans data');
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlans();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading diet plans...</p>
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
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Nutrition Plan</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scientifically designed meal plans to support your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dietPlans.map((plan, index) => (
            <motion.div
              key={plan.$id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-colors"
            >
              <div className="relative">
                <Image
                  src={plan.image}
                  alt={plan.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${plan.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>

                {/* Nutrition Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <p className="text-green-400 font-bold text-lg">{plan.calories}</p>
                    <p className="text-gray-400 text-xs">Calories</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <p className="text-blue-400 font-bold text-lg">{plan.protein}g</p>
                    <p className="text-gray-400 text-xs">Protein</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <p className="text-yellow-400 font-bold text-lg">{plan.carbs}g</p>
                    <p className="text-gray-400 text-xs">Carbs</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <p className="text-purple-400 font-bold text-lg">{plan.fat}g</p>
                    <p className="text-gray-400 text-xs">Fat</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration} weeks program</span>
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
                  Start Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Expert Nutritionists</h3>
            <p className="text-gray-400">Plans designed by certified nutrition experts</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
            <p className="text-gray-400">Thousands of successful transformations</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Personalized</h3>
            <p className="text-gray-400">Customized to your goals and preferences</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
