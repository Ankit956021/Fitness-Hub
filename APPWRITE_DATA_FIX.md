🔧 APPWRITE COLLECTION DATA FIX

Problem: आपके Appwrite collections में data का structure सही नहीं है।

SOLUTION: Niche दिए गए proper JSON format को copy करके Appwrite Dashboard में manually add करें।

=================================================================

📋 COACHES Collection - Proper Format:

Go to: https://cloud.appwrite.io/console
Project: 68b99e68001451c188de  
Database: fitness-hub
Collection: coaches

DELETE existing document और नए add करें:

Document 1:
{
  "name": "Sarah Johnson",
  "specialty": "Strength Training", 
  "experience": 8,
  "rating": 4.9,
  "hourlyRate": 80,
  "bio": "Certified personal trainer specializing in strength training and functional fitness.",
  "image": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&crop=face",
  "certifications": ["ACSM-CPT", "NASM-PES"],
  "availability": "Mon-Fri 6AM-8PM"
}

Document 2:
{
  "name": "Mike Rodriguez",
  "specialty": "HIIT & Cardio",
  "experience": 6,
  "rating": 4.8, 
  "hourlyRate": 75,
  "bio": "High-intensity interval training expert with a passion for cardiovascular fitness.",
  "image": "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face",
  "certifications": ["NASM-CPT", "HIIT Specialist"],
  "availability": "Tue-Sat 7AM-9PM"
}

=================================================================

💊 SUPPLEMENTS Collection:

Document 1:
{
  "name": "Whey Protein Isolate",
  "brand": "Premium Nutrition",
  "category": "Protein",
  "price": 49.99,
  "rating": 4.7,
  "description": "High-quality whey protein isolate for muscle building and recovery.",
  "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
  "benefits": ["Muscle Growth", "Post-Workout Recovery", "High Bioavailability"],
  "ingredients": "Whey Protein Isolate, Natural Flavors, Stevia",
  "servingSize": "30g",
  "servingsPerContainer": 30,
  "affiliateLink": "https://example.com/whey-protein"
}

=================================================================

👟 FOOTWEAR Collection:

Document 1:
{
  "name": "Nike Air Max 270",
  "brand": "Nike", 
  "category": "Running",
  "price": 150.00,
  "rating": 4.6,
  "description": "Comfortable running shoes with maximum Air cushioning.",
  "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  "features": ["Air Max cushioning", "Breathable mesh upper", "Durable rubber outsole"],
  "sizes": ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  "colors": ["Black", "White", "Blue", "Red"],
  "affiliateLink": "https://example.com/nike-air-max-270"
}

=================================================================

⚠️ IMPORTANT NOTES:

1. Data Types Matter:
   - experience: NUMBER (8, not "8")
   - rating: NUMBER (4.9, not "4.9")
   - price: NUMBER (49.99, not "49.99")
   - certifications: ARRAY ["item1", "item2"]
   - benefits: ARRAY ["benefit1", "benefit2"]

2. Required Fields:
   - All fields shown above are required
   - Don't skip any field
   - Arrays should have at least 1 item

3. Copy-Paste Exactly:
   - Copy exactly as shown
   - Don't modify the structure
   - Use double quotes for strings

=================================================================

STEPS:
1. Go to Appwrite Dashboard
2. Delete existing incorrect documents  
3. Add new documents with exact JSON above
4. Save each document
5. Refresh website at http://localhost:3000/coaching

=================================================================
