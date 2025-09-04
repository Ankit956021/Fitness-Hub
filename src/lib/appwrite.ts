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
  DIET_PLANS: 'diet-plans',
  COACHES: 'coaches',
  SUPPLEMENTS: 'supplements',
  NEWSLETTER: 'newsletter',
  FOOTWEAR: 'footwear',
  BOOKINGS: 'bookings'
};

// Storage Bucket IDs
export const BUCKETS = {
  WORKOUT_VIDEOS: 'workout-videos',
  THUMBNAILS: 'thumbnails',
  PROFILE_IMAGES: 'profile-images',
  PRODUCT_IMAGES: 'product-images'
};

export default client;
