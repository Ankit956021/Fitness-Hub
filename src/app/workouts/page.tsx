import { WorkoutsList } from '@/components/WorkoutsList';
import { WorkoutFilters } from '@/components/WorkoutFilters';
import { Suspense } from 'react';

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Workout Videos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from 500+ professional workout videos designed to help you reach your fitness goals
          </p>
        </div>

        <Suspense fallback={<div className="text-white">Loading filters...</div>}>
          <WorkoutFilters />
        </Suspense>

        <Suspense fallback={<div className="text-white">Loading workouts...</div>}>
          <WorkoutsList />
        </Suspense>
      </div>
    </div>
  );
}
