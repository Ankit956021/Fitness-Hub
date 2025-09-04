import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Dumbbell } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">FitnessHub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for fitness, nutrition, and personal coaching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Workouts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Workouts</h3>
            <ul className="space-y-2">
              <li><Link href="/workouts/strength" className="text-gray-400 hover:text-white text-sm">Strength Training</Link></li>
              <li><Link href="/workouts/cardio" className="text-gray-400 hover:text-white text-sm">Cardio</Link></li>
              <li><Link href="/workouts/yoga" className="text-gray-400 hover:text-white text-sm">Yoga</Link></li>
              <li><Link href="/workouts/hiit" className="text-gray-400 hover:text-white text-sm">HIIT</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/coaching" className="text-gray-400 hover:text-white text-sm">Personal Coaching</Link></li>
              <li><Link href="/plans" className="text-gray-400 hover:text-white text-sm">Workout Plans</Link></li>
              <li><Link href="/nutrition" className="text-gray-400 hover:text-white text-sm">Diet Plans</Link></li>
              <li><Link href="/supplements" className="text-gray-400 hover:text-white text-sm">Supplements</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 FitnessHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
