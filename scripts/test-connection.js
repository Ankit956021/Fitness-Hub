// Test Appwrite connection and collections
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('68b99e68001451c188de')
  .setKey('standard_45a0bfe8ff85599501d663bc1df6e8c7fa2875c49a1c517b1087ab30eab6f8e43d2476e61b6c90f747473cabb01394a891d2dfd406460f6e235e3047712ab7ea4b1656b11ab97cbf6d5aa7e25d4e2ec2b358d6357cfc8e05396cf29a366eed79a0656f66e0cd2565fb0d090116541e58cea63adf01cca1ef88a40de7ee771abd');

const databases = new Databases(client);
const DATABASE_ID = 'fitness-hub';

async function testConnection() {
  try {
    console.log('Testing Appwrite connection...');
    
    // Test basic connection
    const health = await client.call('get', '/health');
    console.log('✓ Appwrite server is healthy');

    // Test database access
    const database = await databases.get(DATABASE_ID);
    console.log('✓ Database connection successful:', database.name);

    // Test collections
    const collections = ['coaches', 'supplements', 'footwear', 'bookings'];
    
    for (const collectionId of collections) {
      try {
        const collection = await databases.getCollection(DATABASE_ID, collectionId);
        console.log(`✓ Collection '${collectionId}' exists:`, collection.name);
        
        // Try to list documents
        const documents = await databases.listDocuments(DATABASE_ID, collectionId);
        console.log(`  - Documents count: ${documents.total}`);
      } catch (error) {
        console.log(`✗ Collection '${collectionId}' error:`, error.message);
      }
    }

  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testConnection();
