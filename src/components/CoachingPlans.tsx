'use client';

import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: "Starter",
    price: 79,
    duration: "month",
    description: "Perfect for beginners starting their fitness journey",
    features: [
      "2 sessions per month",
      "Basic nutrition guidance",
      "Workout plan creation",
      "Email support",
      "Progress tracking"
    ],
    popular: false,
    color: "from-gray-600 to-gray-700"
  },
  {
    name: "Professional",
    price: 149,
    duration: "month",
    description: "Most popular choice for serious fitness enthusiasts",
    features: [
      "4 sessions per month",
      "Comprehensive nutrition plan",
      "Custom workout programs",
      "Priority support",
      "Progress tracking & analytics",
      "Meal planning assistance",
      "Form technique videos"
    ],
    popular: true,
    color: "from-blue-600 to-purple-600"
  },
  {
    name: "Elite",
    price: 249,
    duration: "month",
    description: "Ultimate coaching experience for maximum results",
    features: [
      "8 sessions per month",
      "Complete nutrition overhaul",
      "Personalized meal prep",
      "24/7 WhatsApp support",
      "Advanced analytics",
      "Supplement recommendations",
      "Recovery & sleep optimization",
      "Monthly body composition analysis"
    ],
    popular: false,
    color: "from-yellow-500 to-orange-500"
  }
];

export function CoachingPlans() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Coaching Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select the perfect coaching package that fits your goals and budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-gray-900 rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-blue-500 scale-105' 
                  : 'border-gray-700'
              } hover:border-gray-600 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/{plan.duration}</span>
                </div>

                <Link 
                  href={`/coaching/signup?plan=${plan.name.toLowerCase()}`}
                  className={`inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r ${plan.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 group`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              30-Day Money Back Guarantee
            </h3>
            <p className="text-gray-400">
              Not satisfied with your coaching experience? Get a full refund within 30 days, no questions asked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
