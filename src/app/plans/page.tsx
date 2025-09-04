import { WorkoutPlansFromAppwrite } from '@/components/WorkoutPlansFromAppwrite';

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Workout Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your body with structured workout plans designed by fitness experts. 
            From beginner to advanced, find the perfect plan for your fitness level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              Browse Plans
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              Free Trial
            </button>
          </div>
        </div>
      </section>

      <WorkoutPlansFromAppwrite />
    </div>
  );
}
