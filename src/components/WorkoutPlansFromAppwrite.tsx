'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, Star, Play, Dumbbell } from 'lucide-react';
import Image from 'next/image';
import { databases, DATABASE_ID } from '@/lib/appwrite';
import { WorkoutPlan } from '@/types/appwrite';

export function WorkoutPlansFromAppwrite() {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  const sampleWorkoutPlans = useMemo(() => [
    {
      $id: '1',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      $sequence: 0,
      name: 'Beginner Strength',
      description: 'Perfect starting point for building strength and muscle. 3 workouts per week focusing on compound movements.',
      duration: 8,
      difficulty: 'Beginner',
      category: 'Strength',
      workouts: ['workout1', 'workout2', 'workout3'],
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      $id: '2',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      $sequence: 0,
      name: 'HIIT Fat Burn',
      description: 'High-intensity interval training program designed to maximize fat loss in minimal time. 4 workouts per week.',
      duration: 6,
      difficulty: 'Intermediate',
      category: 'Cardio',
      workouts: ['hiit1', 'hiit2', 'hiit3', 'hiit4'],
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop'
    },
    {
      $id: '3',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      $sequence: 0,
      name: 'Advanced Powerlifting',
      description: 'Elite-level powerlifting program for serious athletes. Focus on squat, bench, and deadlift mastery.',
      duration: 12,
      difficulty: 'Advanced',
      category: 'Powerlifting',
      workouts: ['power1', 'power2', 'power3', 'power4', 'power5'],
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop'
    },
    {
      $id: '4',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      $databaseId: '',
      $collectionId: '',
      $sequence: 0,
      name: 'Bodyweight Mastery',
      description: 'Complete bodyweight training program. Build strength and muscle using just your body weight.',
      duration: 10,
      difficulty: 'Intermediate',
      category: 'Bodyweight',
      workouts: ['bw1', 'bw2', 'bw3'],
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    }
  ], []);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          'workout-plans'
        );
        if (response.documents.length > 0) {
          setWorkoutPlans(response.documents as unknown as WorkoutPlan[]);
        } else {
          setWorkoutPlans(sampleWorkoutPlans);
        }
      } catch {
        setWorkoutPlans(sampleWorkoutPlans);
        console.log('Using sample workout plans data');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlans();
  }, [sampleWorkoutPlans]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading workout plans...</p>
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
          <h2 className="text-4xl font-bold text-white mb-4">Transform with Proven Plans</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Structured workout programs designed by fitness experts for every level
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium">
            All Plans
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
            Strength
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
            Cardio
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
            Bodyweight
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {workoutPlans.map((plan, index) => (
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
                <div className="absolute top-4 left-4">
                  <span className={`${getDifficultyColor(plan.difficulty)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {plan.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${plan.price}
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">
                    {plan.category}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>

                {/* Plan Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{plan.duration} weeks</p>
                    <p className="text-gray-400 text-xs">Duration</p>
                  </div>
                  <div className="text-center">
                    <Dumbbell className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{plan.workouts.length}</p>
                    <p className="text-gray-400 text-xs">Workouts</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">5.0</p>
                    <p className="text-gray-400 text-xs">Rating</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">What&apos;s included:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      Video demonstrations
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      Progress tracking
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      Nutrition guidance
                    </div>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors">
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
            <div className="bg-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Expert Trainers</h3>
            <p className="text-gray-400">Programs created by certified fitness professionals</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Progressive Training</h3>
            <p className="text-gray-400">Systematic progression to maximize your results</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Proven Methods</h3>
            <p className="text-gray-400">Science-based approaches for optimal fitness</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
