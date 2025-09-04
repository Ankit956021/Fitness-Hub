import { Hero } from '@/components/Hero';
import { FeaturedWorkouts } from '@/components/FeaturedWorkouts';
import { ServicesOverview } from '@/components/ServicesOverview';
import { CoachingCTA } from '@/components/CoachingCTA';
import { Newsletter } from '@/components/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedWorkouts />
      <ServicesOverview />
      <CoachingCTA />
      <Newsletter />
    </div>
  );
}