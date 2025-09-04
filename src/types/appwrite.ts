import { Models } from 'appwrite';

// Extend the base Document type from Appwrite
export interface Coach extends Models.Document {
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  hourlyRate: number;
  bio: string;
  image: string;
  certifications: string[];
  availability: string;
}

export interface Supplement extends Models.Document {
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  benefits: string[];
  ingredients: string;
  servingSize: string;
  servingsPerContainer: number;
  affiliateLink: string;
}

export interface Footwear extends Models.Document {
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  features: string[];
  sizes: string[];
  colors: string[];
  affiliateLink: string;
}

export interface Workout extends Models.Document {
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  category: string;
  instructor: string;
  videoUrl: string;
  thumbnail: string;
  equipment: string[];
  caloriesBurned: number;
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

export interface DietPlan extends Models.Document {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
  duration: number; // in weeks
  price: number;
  image: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
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
