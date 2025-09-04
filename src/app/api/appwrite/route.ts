import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// For client-side calls, we don't set the API key
const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Sample data
const sampleData = {
  coaches: [
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
  ],
  supplements: [
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
  ],
  footwear: [
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
  ]
};

type CollectionResult = {
  id: string;
  status: string;
  documentCount?: number;
  error?: string;
};

export async function GET() {
  try {
    const results: { collections: CollectionResult[]; message: string } = {
      collections: [],
      message: 'Connection test completed!'
    };

    // Test each collection
    const collections = ['coaches', 'supplements', 'footwear', 'bookings'];
    
    for (const collectionId of collections) {
      try {
        const documents = await databases.listDocuments(DATABASE_ID, collectionId);
        
        results.collections.push({
          id: collectionId,
          documentCount: documents.total,
          status: 'OK'
        });
      } catch (error) {
        results.collections.push({
          id: collectionId,
          status: 'ERROR',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Connection failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'seed') {
      const results: { collection: string; status: string; count?: number; error?: string }[] = [];

      // Seed each collection
      for (const [collectionId, items] of Object.entries(sampleData)) {
        try {
          for (const item of items) {
            await databases.createDocument(
              DATABASE_ID,
              collectionId,
              'unique()',
              item
            );
          }
          results.push({
            collection: collectionId,
            status: 'SUCCESS',
            count: items.length
          });
        } catch (error) {
          results.push({
            collection: collectionId,
            status: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return NextResponse.json({
        message: 'Seeding completed',
        results
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Seeding failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
