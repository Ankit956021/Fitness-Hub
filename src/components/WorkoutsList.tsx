'use client';

import { useState, useMemo, useEffect } from 'react';
import { Play, Clock, Flame, Star, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { YoutubeThumbnail } from './YoutubeEmbed';
import { getAllWorkouts, extractYouTubeVideoId } from '@/lib/appwrite';
import { Workout } from '@/types/appwrite';

interface WorkoutsListProps {
  selectedCategory: string;
  selectedDifficulty: string;
  selectedDuration: string;
  searchTerm: string;
}

export function WorkoutsList({
  selectedCategory,
  selectedDifficulty,
  selectedDuration,
  searchTerm
}: WorkoutsListProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch workouts from Appwrite
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await getAllWorkouts();
        setWorkouts(data as unknown as Workout[]);
      } catch (err) {
        setError('Failed to load workouts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Filter workouts based on selected filters
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout: Workout) => {
      // Category filter
      if (selectedCategory !== 'All' && workout.category !== selectedCategory) {
        return false;
      }
      
      // Difficulty filter
      if (selectedDifficulty && workout.difficulty !== selectedDifficulty) {
        return false;
      }
      
      // Duration filter
      if (selectedDuration) {
        const duration = parseInt(workout.duration);
        switch (selectedDuration) {
          case '< 15 min':
            if (duration >= 15) return false;
            break;
          case '15-30 min':
            if (duration < 15 || duration > 30) return false;
            break;
          case '30-45 min':
            if (duration < 30 || duration > 45) return false;
            break;
          case '45+ min':
            if (duration < 45) return false;
            break;
        }
      }
      
      // Search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return workout.title.toLowerCase().includes(term) ||
               workout.description.toLowerCase().includes(term) ||
               workout.category.toLowerCase().includes(term);
      }
      
      return true;
    });
  }, [selectedCategory, selectedDifficulty, selectedDuration, searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-400 text-lg mt-4">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No workouts found matching your criteria.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => {
            const videoId = extractYouTubeVideoId(workout.videoUrl);
            return (
        <div
          key={workout.$id}
          className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          {/* YouTube Thumbnail */}
          <div className="relative">
            <YoutubeThumbnail
              videoId={videoId}
              title={workout.title}
              className="h-48"
              duration={workout.duration}
              onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
            />
            
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
              onClick={() => toggleFavorite(workout.$id)}
              className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 ${
                  favorites.includes(workout.$id) 
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
              <span className="text-xs text-gray-500">Rating: {workout.rating}/5</span>
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
              href={`/workouts/${workout.$id}`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              {workout.isFree ? 'Watch Now' : 'Upgrade to Watch'}
            </Link>
          </div>
        </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
