'use client';

import { motion } from 'framer-motion';
import { Mail, Gift, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Weekly Fitness Tips",
      description: "Expert advice to maximize your workouts"
    },
    {
      icon: Gift,
      title: "Exclusive Content",
      description: "Free workout plans and nutrition guides"
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join our private fitness community"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Mail className="w-4 h-4" />
            Join 50,000+ Fitness Enthusiasts
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Fit With Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Newsletter</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Weekly fitness tips, exclusive workouts, nutrition advice, and early access to new features. 
            All delivered straight to your inbox.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Content - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey</h3>
                  <p className="text-gray-400">Join thousands of fitness enthusiasts worldwide</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Get Free Fitness Tips'
                    )}
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to FitnessHub!</h3>
                <p className="text-gray-400">
                  Check your email for a welcome message and your first fitness tip.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-sm">Subscribers</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-sm">Rating</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Weekly</div>
              <div className="text-sm">Tips</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
