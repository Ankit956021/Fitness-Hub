import { CoachesFromAppwrite } from '@/components/CoachesFromAppwrite';
import { CoachingPlans } from '@/components/CoachingPlans';
import { CoachingBenefits } from '@/components/CoachingBenefits';

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Personal Coaching
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get personalized fitness guidance from certified trainers. 
            1-on-1 coaching sessions designed to help you reach your goals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              Book Free Consultation
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors">
              View Plans
            </button>
          </div>
        </div>
      </section>

      <CoachingBenefits />
      <CoachingPlans />
      <CoachesFromAppwrite />
    </div>
  );
}
