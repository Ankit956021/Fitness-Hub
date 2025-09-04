// Sample data seeding script for Fitness Hub
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('68b99e68001451c188de')
  .setKey('standard_45a0bfe8ff85599501d663bc1df6e8c7fa2875c49a1c517b1087ab30eab6f8e43d2476e61b6c90f747473cabb01394a891d2dfd406460f6e235e3047712ab7ea4b1656b11ab97cbf6d5aa7e25d4e2ec2b358d6357cfc8e05396cf29a366eed79a0656f66e0cd2565fb0d090116541e58cea63adf01cca1ef88a40de7ee771abd');

const databases = new Databases(client);
const DATABASE_ID = 'fitness-hub';

// Sample coaches data
const sampleCoaches = [
  {
    name: 'Sarah Johnson',
    specialty: 'Strength Training',
    experience: 8,
    rating: 4.9,
    hourlyRate: 80,
    bio: 'Certified personal trainer specializing in strength training and functional fitness.',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&crop=face',
    certifications: ['ACSM-CPT', 'NASM-PES'],
    availability: 'Mon-Fri 6AM-8PM'
  },
  {
    name: 'Mike Rodriguez',
    specialty: 'HIIT & Cardio',
    experience: 6,
    rating: 4.8,
    hourlyRate: 75,
    bio: 'High-intensity interval training expert with a passion for cardiovascular fitness.',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face',
    certifications: ['NASM-CPT', 'HIIT Specialist'],
    availability: 'Tue-Sat 7AM-9PM'
  }
];

// Sample supplements data
const sampleSupplements = [
  {
    name: 'Whey Protein Isolate',
    brand: 'Premium Nutrition',
    category: 'Protein',
    price: 49.99,
    rating: 4.7,
    description: 'High-quality whey protein isolate for muscle building and recovery.',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
    benefits: ['Muscle Growth', 'Post-Workout Recovery', 'High Bioavailability'],
    ingredients: 'Whey Protein Isolate, Natural Flavors, Stevia',
    servingSize: '30g',
    servingsPerContainer: 30,
    affiliateLink: 'https://example.com/whey-protein'
  },
  {
    name: 'Creatine Monohydrate',
    brand: 'Pure Performance',
    category: 'Performance',
    price: 24.99,
    rating: 4.8,
    description: 'Micronized creatine monohydrate for enhanced strength and power.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    benefits: ['Increased Strength', 'Enhanced Power Output', 'Faster Recovery'],
    ingredients: 'Creatine Monohydrate',
    servingSize: '5g',
    servingsPerContainer: 60,
    affiliateLink: 'https://example.com/creatine'
  }
];

// Sample footwear data
const sampleFootwear = [
  {
    name: 'Nike Air Max 270',
    brand: 'Nike',
    category: 'Running',
    price: 150.00,
    rating: 4.6,
    description: 'Comfortable running shoes with maximum Air cushioning.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    features: ['Air Max cushioning', 'Breathable mesh upper', 'Durable rubber outsole'],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Black', 'White', 'Blue', 'Red'],
    affiliateLink: 'https://example.com/nike-air-max-270'
  },
  {
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    category: 'Training',
    price: 180.00,
    rating: 4.7,
    description: 'High-performance training shoes with responsive cushioning.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
    features: ['Boost midsole', 'Primeknit upper', 'Continental rubber outsole'],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Black', 'White', 'Gray'],
    affiliateLink: 'https://example.com/adidas-ultraboost-22'
  }
];

async function seedData() {
  try {
    console.log('Starting data seeding...');

    // Seed coaches
    console.log('Seeding coaches...');
    for (const coach of sampleCoaches) {
      try {
        await databases.createDocument(
          DATABASE_ID,
          'coaches',
          'unique()',
          coach
        );
        console.log(`✓ Added coach: ${coach.name}`);
      } catch (error) {
        console.log(`✗ Failed to add coach ${coach.name}:`, error.message);
      }
    }

    // Seed supplements
    console.log('Seeding supplements...');
    for (const supplement of sampleSupplements) {
      try {
        await databases.createDocument(
          DATABASE_ID,
          'supplements',
          'unique()',
          supplement
        );
        console.log(`✓ Added supplement: ${supplement.name}`);
      } catch (error) {
        console.log(`✗ Failed to add supplement ${supplement.name}:`, error.message);
      }
    }

    // Seed footwear
    console.log('Seeding footwear...');
    for (const shoe of sampleFootwear) {
      try {
        await databases.createDocument(
          DATABASE_ID,
          'footwear',
          'unique()',
          shoe
        );
        console.log(`✓ Added footwear: ${shoe.name}`);
      } catch (error) {
        console.log(`✗ Failed to add footwear ${shoe.name}:`, error.message);
      }
    }

    console.log('Data seeding completed!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Run the seeding
seedData();
