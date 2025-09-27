'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, Clock, Flame, Bookmark, Share2, ArrowLeft, Users } from 'lucide-react';
import { YoutubeEmbed } from '@/components/YoutubeEmbed';
import { getWorkoutById, extractYouTubeVideoId } from '@/lib/appwrite';
import { Workout } from '@/types/appwrite';
export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const workoutId = params.id as string;

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setLoading(true);
        const data = await getWorkoutById(workoutId);
        setWorkout(data as unknown as Workout);
      } catch (err) {
        setError('Failed to load workout');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (workoutId) {
      fetchWorkout();
    }
  }, [workoutId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-white text-lg mt-4">Loading workout...</p>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || 'Workout Not Found'}
          </h1>
          <button 
            onClick={() => router.push('/workouts')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Workout Not Found</h1>
          <button 
            onClick={() => router.push('/workouts')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-yellow-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Workouts
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <YoutubeEmbed
                videoId={extractYouTubeVideoId(workout.videoUrl)}
                title={workout.title}
                className="aspect-video"
                showControls={true}
              />
            </div>

            {/* Video Title and Description */}
            <div className="mt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{workout.title}</h1>
                  <p className="text-gray-400 text-lg">{workout.description}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Bookmark 
                      className={`w-6 h-6 ${isFavorite ? 'text-yellow-400 fill-current' : 'text-white'}`} 
                    />
                  </button>
                  <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{workout.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Rating: {workout.rating}/5</span>
                </div>
                <span>•</span>
                <span>Instructor: {workout.instructor}</span>
              </div>

              {/* Extended Description */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">About This Workout</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {workout.description} This comprehensive workout is designed to help you achieve your fitness goals 
                  with professional guidance and proven techniques.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Perfect for {workout.difficulty.toLowerCase()} level fitness enthusiasts looking to improve their 
                  strength, endurance, and overall health. Follow along with expert instructor {workout.instructor} 
                  for the best results.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Workout Info Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Workout Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Duration</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">{workout.duration}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Difficulty</span>
                  <span className={`font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Calories Burned</span>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-medium">{workout.calories}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Category</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {workout.category}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Access</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    workout.isFree 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {workout.isFree ? 'Free' : 'PRO'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {workout.isFree ? 'Start Workout' : 'Upgrade to PRO'}
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                {workout.isFree 
                  ? 'This workout is completely free. Start now!'
                  : 'Get access to premium workouts and exclusive content'
                }
              </p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {workout.isFree ? 'Start Now' : 'Upgrade Now'}
              </button>
            </div>

            {/* Equipment Needed */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Equipment Needed</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Yoga Mat</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Water Bottle</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Towel</span>
                </div>
                {workout.category === 'Strength' && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Dumbbells</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}