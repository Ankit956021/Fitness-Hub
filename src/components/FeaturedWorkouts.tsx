'use client';

import { motion } from 'framer-motion';
import { Play, Clock, Flame, Users } from 'lucide-react';
import Link from 'next/link';

const workouts = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum fat burn",
    duration: "30 min",
    difficulty: "Intermediate",
    calories: "300-400",
    thumbnail: "/api/placeholder/400/300",
    category: "Cardio"
  },
  {
    id: 2,
    title: "Strength & Power",
    description: "Build muscle and increase your overall strength",
    duration: "45 min",
    difficulty: "Advanced",
    calories: "250-350",
    thumbnail: "/api/placeholder/400/300",
    category: "Strength"
  },
  {
    id: 3,
    title: "Yoga Flow",
    description: "Mindful movement for flexibility and peace",
    duration: "60 min",
    difficulty: "Beginner",
    calories: "150-200",
    thumbnail: "/api/placeholder/400/300",
    category: "Yoga"
  },
  {
    id: 4,
    title: "Core Crusher",
    description: "Targeted ab workout for a stronger core",
    duration: "20 min",
    difficulty: "Intermediate",
    calories: "150-200",
    thumbnail: "/api/placeholder/400/300",
    category: "Core"
  }
];

export function FeaturedWorkouts() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Workouts
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our most popular workouts designed by certified trainers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={workout.thumbnail} 
                  alt={workout.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {workout.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{workout.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{workout.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {workout.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {workout.calories} cal
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{workout.difficulty}</span>
                  <Link 
                    href={`/workouts/${workout.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            href="/workouts"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            <Users className="w-5 h-5" />
            View All Workouts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
