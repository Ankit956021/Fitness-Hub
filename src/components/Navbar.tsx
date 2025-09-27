'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">FitnessHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/workouts" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Workouts
              </Link>
              <Link href="/plans" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Plans
              </Link>
              <Link href="/coaching" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Coaching
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/coaching" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Get Coached
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link href="/workouts" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Workouts
            </Link>
            <Link href="/plans" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Plans
            </Link>
            <Link href="/coaching" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Coaching
            </Link>
            <Link href="/coaching" className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium">
              Get Coached
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
