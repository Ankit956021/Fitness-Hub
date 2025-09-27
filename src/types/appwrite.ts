import { Models } from 'appwrite';

// Extend the base Document type from Appwrite
export interface Coach extends Models.Document {
  name: string;
  email: string;
  specialty: string;
  experience: number;
  rating: number;
  hourlyRate: number;
  bio: string;
  image: string;
  imageUrl?: string;
  certifications: string[];
  availability: string;
}



export interface Workout extends Models.Document {
  title: string;
  description: string;
  duration: string; // stored as string like "30 min"
  difficulty: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  instructor: string;
  calories: string; // stored as string like "300-400"
  rating: number;
  isFree: boolean;
}

export interface WorkoutPlan extends Models.Document {
  name: string;
  description: string;
  duration: number; // in weeks
  difficulty: string;
  category: string;
  workouts: string[]; // array of workout IDs
  price: number;
  image: string;
}



export interface Newsletter extends Models.Document {
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface Booking extends Models.Document {
  coachId: string;
  clientName: string;
  clientEmail: string;
  sessionDate: string;
  sessionTime: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}
