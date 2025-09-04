'use client';

import { useState } from 'react';
import { Play, Clock, Flame, Star, Bookmark } from 'lucide-react';
import Link from 'next/link';

// Mock data - In a real app, this would come from Appwrite
const workouts = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum fat burn",
    duration: "30 min",
    difficulty: "Intermediate",
    calories: "300-400",
    rating: 4.8,
    views: "12k",
    thumbnail: "/api/placeholder/400/300",
    category: "Cardio",
    instructor: "Sarah Johnson",
    isFree: true
  },
  {
    id: 2,
    title: "Strength & Power",
    description: "Build muscle and increase your overall strength",
    duration: "45 min",
    difficulty: "Advanced",
    calories: "250-350",
    rating: 4.9,
    views: "8.5k",
    thumbnail: "/api/placeholder/400/300",
    category: "Strength",
    instructor: "Mike Chen",
    isFree: false
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    description: "Gentle yoga sequence perfect for starting your day",
    duration: "20 min",
    difficulty: "Beginner",
    calories: "80-120",
    rating: 4.7,
    views: "15k",
    thumbnail: "/api/placeholder/400/300",
    category: "Yoga",
    instructor: "Emma Davis",
    isFree: true
  },
  {
    id: 4,
    title: "Core Crusher",
    description: "Intense ab workout for a stronger core",
    duration: "25 min",
    difficulty: "Intermediate",
    calories: "150-200",
    rating: 4.6,
    views: "9.2k",
    thumbnail: "/api/placeholder/400/300",
    category: "Core",
    instructor: "Alex Rivera",
    isFree: true
  },
  {
    id: 5,
    title: "Boxing Bootcamp",
    description: "High-energy boxing workout for total body conditioning",
    duration: "40 min",
    difficulty: "Advanced",
    calories: "400-500",
    rating: 4.9,
    views: "6.8k",
    thumbnail: "/api/placeholder/400/300",
    category: "Boxing",
    instructor: "Jordan Lee",
    isFree: false
  },
  {
    id: 6,
    title: "Pilates Fundamentals",
    description: "Master the basics of Pilates with proper form",
    duration: "35 min",
    difficulty: "Beginner",
    calories: "120-180",
    rating: 4.8,
    views: "11k",
    thumbnail: "/api/placeholder/400/300",
    category: "Pilates",
    instructor: "Lisa Wang",
    isFree: true
  }
];

export function WorkoutsList() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          {/* Thumbnail */}
          <div className="relative">
            <img 
              src={workout.thumbnail} 
              alt={workout.title}
              className="w-full h-48 object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={`/workouts/${workout.id}`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </Link>
            </div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {workout.category}
              </span>
              {!workout.isFree && (
                <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  PRO
                </span>
              )}
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(workout.id)}
              className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 ${
                  favorites.includes(workout.id) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-white'
                }`} 
              />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                {workout.title}
              </h3>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{workout.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {workout.description}
            </p>
            
            <div className="text-sm text-gray-400 mb-4">
              <span>by {workout.instructor}</span>
              <span className="mx-2">•</span>
              <span>{workout.views} views</span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workout.duration}
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {workout.calories} cal
              </div>
              <span className="px-2 py-1 bg-gray-700 rounded-full">
                {workout.difficulty}
              </span>
            </div>
            
            {/* Action Button */}
            <Link 
              href={`/workouts/${workout.id}`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              {workout.isFree ? 'Watch Now' : 'Upgrade to Watch'}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
