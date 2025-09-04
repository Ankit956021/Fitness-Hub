'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Apple, Users, ShoppingBag, Mail, Footprints } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Dumbbell,
    title: "Workout Videos",
    description: "Access 500+ professional workout videos from beginner to expert level",
    link: "/workouts",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Personal Coaching",
    description: "1-on-1 coaching sessions with certified fitness professionals",
    link: "/coaching",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Apple,
    title: "Nutrition Plans",
    description: "Customized diet plans tailored to your goals and preferences",
    link: "/nutrition",
    color: "from-green-500 to-green-600"
  },
  {
    icon: ShoppingBag,
    title: "Supplements",
    description: "Premium supplement recommendations for optimal performance",
    link: "/supplements",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Footprints,
    title: "Fitness Gear",
    description: "Top-quality footwear and equipment for your fitness journey",
    link: "/gear",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Mail,
    title: "Newsletter",
    description: "Weekly fitness tips, nutrition advice, and exclusive content",
    link: "/newsletter",
    color: "from-indigo-500 to-indigo-600"
  }
];

export function ServicesOverview() {
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
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From workouts to nutrition, coaching to gear - we've got your complete fitness journey covered
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Link href={service.link}>
                  <div className="bg-gray-900 rounded-2xl p-8 h-full hover:bg-gray-800 transition-all duration-300 border border-gray-800 hover:border-gray-700">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                    
                    <div className="mt-6 text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Join the FitnessHub Community
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get access to exclusive content, connect with fellow fitness enthusiasts, 
              and transform your health with our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signup"
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/about"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
