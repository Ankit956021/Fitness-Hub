'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const benefits = [
  "Personalized workout plans",
  "1-on-1 video coaching sessions",
  "Custom nutrition guidance",
  "24/7 support and motivation",
  "Progress tracking and analytics",
  "Access to premium content"
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "My coach helped me lose 30 pounds and gain so much confidence!",
    image: "/api/placeholder/60/60"
  },
  {
    name: "Mike Chen",
    rating: 5,
    text: "Best investment I've made in my health. The results speak for themselves.",
    image: "/api/placeholder/60/60"
  },
  {
    name: "Emma Davis",
    rating: 5,
    text: "Professional, knowledgeable, and truly cares about my progress.",
    image: "/api/placeholder/60/60"
  }
];

export function CoachingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Personal Coach</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Transform your fitness journey with expert guidance, personalized plans, and unlimited support from certified professionals.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    $99<span className="text-xl text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-300">All-inclusive coaching package</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/coaching/signup"
                  className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  Start Coaching Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/coaching/consultation"
                  className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg text-center transition-all duration-300 hover:bg-white/10"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">What Our Clients Say</h3>
            </div>

            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white">{testimonial.name}</span>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{testimonial.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">1000+</div>
                <div className="text-gray-400 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">95%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-gray-400 text-sm">Expert Coaches</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
