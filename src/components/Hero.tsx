'use client';

import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Body</span>
            <br />
            Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> Life</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of fitness enthusiasts with our expert-led workouts, 
            personalized nutrition plans, and professional coaching services.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/workouts"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Start Working Out
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/coaching"
              className="group border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:bg-white/10"
            >
              Get Personal Coach
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">500+</div>
              <div className="text-gray-400 text-sm md:text-base">Workout Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">50k+</div>
              <div className="text-gray-400 text-sm md:text-base">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-400">24/7</div>
              <div className="text-gray-400 text-sm md:text-base">Expert Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [20, -20, 20],
          rotate: [360, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
      />
    </section>
  );
}