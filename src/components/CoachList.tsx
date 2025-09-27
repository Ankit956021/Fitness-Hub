'use client';

import { motion } from 'framer-motion';
import { Star, Calendar, MessageCircle, Award } from 'lucide-react';

const coaches = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Weight Loss & HIIT",
    experience: "8 years",
    rating: 4.9,
    reviews: 156,
    image: "/api/placeholder/300/300",
    bio: "Certified personal trainer specializing in high-intensity workouts and sustainable weight loss programs.",
    certifications: ["NASM-CPT", "HIIT Specialist"],
    languages: ["English", "Spanish"],
    availability: "Mon-Fri 6AM-8PM"
  },
  {
    id: 2,
    name: "Mike Chen",
    specialty: "Strength Training",
    experience: "12 years",
    rating: 4.8,
    reviews: 203,
    image: "/api/placeholder/300/300",
    bio: "Former competitive powerlifter with expertise in building muscle mass and increasing strength.",
    certifications: ["CSCS", "Powerlifting Coach"],
    languages: ["English", "Mandarin"],
    availability: "Tue-Sat 5AM-9PM"
  },
  {
    id: 3,
    name: "Emma Davis",
    specialty: "Yoga & Flexibility",
    experience: "6 years",
    rating: 4.9,
    reviews: 127,
    image: "/api/placeholder/300/300",
    bio: "Registered yoga instructor focusing on mindful movement and stress reduction through yoga practice.",
    certifications: ["RYT-500", "Yin Yoga Certified"],
    languages: ["English", "French"],
    availability: "Mon-Thu 7AM-7PM"
  },
  {
    id: 4,
    name: "Alex Rivera",
    specialty: "Functional Training",
    experience: "10 years",
    rating: 4.7,
    reviews: 89,
    image: "/api/placeholder/300/300",
    bio: "Movement specialist helping clients improve everyday activities through functional fitness training.",
    certifications: ["FMS", "TRX Instructor"],
    languages: ["English"],
    availability: "Mon-Fri 6AM-10PM"
  }
];

export function CoachList() {
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
            Meet Our Expert Coaches
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from our team of certified fitness professionals, each bringing unique expertise and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all duration-300 hover:scale-105"
            >
              {/* Coach Image */}
              <div className="relative">
                <img 
                  src={coach.image} 
                  alt={coach.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/70 rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{coach.rating}</span>
                </div>
              </div>

              {/* Coach Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                <p className="text-blue-400 font-medium mb-2">{coach.specialty}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{coach.bio}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {coach.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {coach.reviews} reviews
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {coach.certifications.map((cert, certIndex) => (
                      <span 
                        key={certIndex}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{coach.availability}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
                    Book Session
                  </button>
                  <button className="w-full border border-gray-600 hover:border-gray-500 text-gray-300 py-2 rounded-lg font-semibold transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Can&apos;t decide which coach is right for you?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a free 15-minute consultation call to discuss your goals and find the perfect match.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-bold text-lg transition-colors">
              Book Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
