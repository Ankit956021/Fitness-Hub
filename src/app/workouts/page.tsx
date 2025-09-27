'use client';

import { WorkoutsList } from '@/components/WorkoutsList';
import { WorkoutFilters } from '@/components/WorkoutFilters';
import { useState } from 'react';

export default function WorkoutsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

        <WorkoutFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <WorkoutsList 
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          selectedDuration={selectedDuration}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
