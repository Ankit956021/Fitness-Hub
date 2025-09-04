'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Users, Calendar, Trophy, Heart, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: "1-on-1 Personal Attention",
    description: "Dedicated coach focused entirely on your goals and progress"
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book sessions at times that work best for your lifestyle"
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "95% of our clients achieve their fitness goals within 3 months"
  },
  {
    icon: Heart,
    title: "Holistic Approach",
    description: "Nutrition, exercise, and lifestyle coaching all in one"
  },
  {
    icon: Zap,
    title: "Motivation & Accountability",
    description: "Stay on track with regular check-ins and encouragement"
  },
  {
    icon: CheckCircle,
    title: "Certified Professionals",
    description: "All coaches are certified and have years of experience"
  }
];

export function CoachingBenefits() {
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
            Why Choose Personal Coaching?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the difference that personalized guidance makes in your fitness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
              >
                <div className="bg-blue-600 rounded-lg p-3 w-fit mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
