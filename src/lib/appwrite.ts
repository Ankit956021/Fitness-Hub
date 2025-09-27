import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id');

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'fitness-hub';
export const COLLECTIONS = {
  WORKOUTS: 'workouts',
  WORKOUT_PLANS: 'workout-plans',
  COACHES: 'coaches',
  NEWSLETTER: 'newsletter',
  BOOKINGS: 'bookings'
};

// Storage Bucket IDs
export const BUCKETS = {
  WORKOUT_VIDEOS: 'workout-videos',
  THUMBNAILS: 'thumbnails',
  PROFILE_IMAGES: 'profile-images',
  PRODUCT_IMAGES: 'product-images'
};

// Workout Service Functions
export async function getAllWorkouts() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.WORKOUTS
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
}

export async function getWorkoutById(workoutId: string) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.WORKOUTS,
      workoutId
    );
    return response;
  } catch (error) {
    console.error('Error fetching workout:', error);
    throw error;
  }
}

export async function getWorkoutsByCategory(category: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.WORKOUTS,
      [
        // Add query filters if needed
      ]
    );
    return response.documents.filter((workout: unknown) => 
      (workout as { category: string }).category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error fetching workouts by category:', error);
    throw error;
  }
}

// Utility function to extract YouTube video ID from URL
export function extractYouTubeVideoId(url: string): string {
  if (!url) return '';
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // If it's already just an ID, return as is
  if (url.length === 11 && /^[a-zA-Z0-9_-]+$/.test(url)) {
    return url;
  }
  
  return '';
}

export default client;
