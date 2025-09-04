# Appwrite Setup Instructions for FitnessHub

This guide will walk you through setting up Appwrite for your FitnessHub application.

## 🚀 Quick Setup

### Step 1: Create Appwrite Account
1. Go to [https://appwrite.io](https://appwrite.io)
2. Click "Get Started" and create a free account
3. Verify your email address

### Step 2: Create New Project
1. In the Appwrite console, click "Create Project"
2. Enter project name: `FitnessHub`
3. Enter project ID: `fitness-hub`
4. Select your preferred region
5. Click "Create"

### Step 3: Get Project Credentials
1. In your project dashboard, go to "Settings" → "General"
2. Copy your **Project ID** and **API Endpoint**
3. Update your `.env.local` file:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=fitness-hub
```

## 📊 Database Setup

### Step 4: Create Database
1. Go to "Databases" in the left sidebar
2. Click "Create Database"
3. Database ID: `fitness-hub`
4. Name: `FitnessHub Database`
5. Click "Create"

### Step 5: Create Collections

#### Collection 1: Workouts
1. Click "Create Collection"
2. Collection ID: `workouts`
3. Name: `Workouts`
4. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| title | String | 255 | ✅ | - |
| description | String | 1000 | ✅ | - |
| duration | Integer | - | ✅ | - |
| difficulty | String | 50 | ✅ | - |
| category | String | 50 | ✅ | - |
| videoUrl | String | 500 | ✅ | - |
| thumbnailUrl | String | 500 | ✅ | - |
| instructor | String | 100 | ✅ | - |
| calories | String | 50 | ✅ | - |
| rating | Float | - | ✅ | 0 |
| views | Integer | - | ✅ | 0 |
| isFree | Boolean | - | ✅ | true |
| tags | String | 500 | ❌ | - |

#### Collection 2: Coaches
1. Click "Create Collection"
2. Collection ID: `coaches`
3. Name: `Coaches`
4. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| name | String | 100 | ✅ | - |
| specialty | String | 100 | ✅ | - |
| experience | String | 50 | ✅ | - |
| bio | String | 1000 | ✅ | - |
| rating | Float | - | ✅ | 0 |
| pricePerSession | Integer | - | ✅ | - |
| imageUrl | String | 500 | ✅ | - |
| certifications | String | 500 | ✅ | - |
| availability | String | 200 | ✅ | - |
| languages | String | 200 | ❌ | - |
| reviews | Integer | - | ✅ | 0 |

#### Collection 3: Diet Plans
1. Collection ID: `diet-plans`
2. Name: `Diet Plans`
3. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| title | String | 255 | ✅ | - |
| description | String | 1000 | ✅ | - |
| category | String | 50 | ✅ | - |
| duration | Integer | - | ✅ | - |
| meals | String | 2000 | ✅ | - |
| calories | Integer | - | ✅ | - |
| macros | String | 500 | ✅ | - |
| price | Integer | - | ✅ | 0 |
| imageUrl | String | 500 | ✅ | - |

#### Collection 4: Supplements
1. Collection ID: `supplements`
2. Name: `Supplements`
3. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| name | String | 255 | ✅ | - |
| description | String | 1000 | ✅ | - |
| category | String | 50 | ✅ | - |
| price | Float | - | ✅ | - |
| rating | Float | - | ✅ | 0 |
| imageUrl | String | 500 | ✅ | - |
| benefits | String | 1000 | ✅ | - |
| ingredients | String | 1000 | ✅ | - |
| affiliateLink | String | 500 | ✅ | - |
| inStock | Boolean | - | ✅ | true |

#### Collection 5: Newsletter
1. Collection ID: `newsletter`
2. Name: `Newsletter Subscribers`
3. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| email | String | 255 | ✅ | - |
| name | String | 100 | ❌ | - |
| subscribed | Boolean | - | ✅ | true |
| subscribedAt | DateTime | - | ✅ | - |

#### Collection 6: Bookings
1. Collection ID: `bookings`
2. Name: `Coaching Bookings`
3. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| userId | String | 50 | ✅ | - |
| coachId | String | 50 | ✅ | - |
| sessionDate | DateTime | - | ✅ | - |
| duration | Integer | - | ✅ | 60 |
| status | String | 20 | ✅ | pending |
| price | Float | - | ✅ | - |
| notes | String | 1000 | ❌ | - |
| paymentId | String | 100 | ❌ | - |

#### Collection 7: Footwear
1. Collection ID: `footwear`
2. Name: `Footwear & Gear`
3. Add these attributes:

| Attribute | Type | Size | Required | Default |
|-----------|------|------|----------|---------|
| name | String | 255 | ✅ | - |
| description | String | 1000 | ✅ | - |
| category | String | 50 | ✅ | - |
| brand | String | 100 | ✅ | - |
| price | Float | - | ✅ | - |
| rating | Float | - | ✅ | 0 |
| imageUrl | String | 500 | ✅ | - |
| sizes | String | 200 | ✅ | - |
| colors | String | 200 | ✅ | - |
| affiliateLink | String | 500 | ✅ | - |
| inStock | Boolean | - | ✅ | true |

### Step 6: Set Collection Permissions
For each collection, set these permissions:

1. Go to each collection → "Settings" → "Permissions"
2. **Read Access**: 
   - Add role: `any` (for public content)
   - Add role: `users` (for user-specific content)
3. **Create Access**: 
   - Add role: `users` (for user-generated content like bookings)
4. **Update Access**: 
   - Add role: `users` (for user updates)
5. **Delete Access**: 
   - Add role: `users` (for user deletions)

## 📁 Storage Setup

### Step 7: Create Storage Buckets
1. Go to "Storage" in the left sidebar
2. Create these buckets:

#### Bucket 1: Workout Videos
- Bucket ID: `workout-videos`
- Name: `Workout Videos`
- File Size Limit: `500MB`
- Allowed File Extensions: `mp4,mov,avi,webm`
- Compression: `gzip`
- Encryption: ✅

#### Bucket 2: Thumbnails
- Bucket ID: `thumbnails`
- Name: `Thumbnails`
- File Size Limit: `5MB`
- Allowed File Extensions: `jpg,jpeg,png,webp`
- Compression: `gzip`
- Encryption: ✅

#### Bucket 3: Profile Images
- Bucket ID: `profile-images`
- Name: `Profile Images`
- File Size Limit: `5MB`
- Allowed File Extensions: `jpg,jpeg,png,webp`
- Compression: `gzip`
- Encryption: ✅

#### Bucket 4: Product Images
- Bucket ID: `product-images`
- Name: `Product Images`
- File Size Limit: `5MB`
- Allowed File Extensions: `jpg,jpeg,png,webp`
- Compression: `gzip`
- Encryption: ✅

### Step 8: Set Storage Permissions
For each bucket:
1. Go to bucket → "Settings" → "Permissions"
2. **File Read**: Add role `any`
3. **File Create**: Add role `users`
4. **File Update**: Add role `users`
5. **File Delete**: Add role `users`

## 🔐 Authentication Setup

### Step 9: Configure Authentication
1. Go to "Authentication" → "Settings"
2. Enable these providers:
   - **Email/Password**: ✅
   - **Google** (optional): Configure OAuth
   - **Apple** (optional): Configure OAuth
3. Set session length: `30 days`
4. Enable email verification: ✅

### Step 10: Set Auth Preferences
1. **Password Policy**:
   - Minimum length: 8 characters
   - Require uppercase: ✅
   - Require lowercase: ✅
   - Require numbers: ✅
   - Require symbols: ❌

## 🔑 API Keys Setup

### Step 11: Create API Key (for Admin Functions)
1. Go to "Overview" → "Integrate with your server"
2. Click "API Keys"
3. Create new key:
   - Name: `FitnessHub Admin`
   - Scopes: Select all (for admin functions)
4. Copy the API key
5. Add to your `.env.local`:

```env
APPWRITE_API_KEY=your-server-api-key-here
```

## 📝 Sample Data

### Step 12: Add Sample Data
You can add sample data through the Appwrite console or via your admin dashboard once it's running.

#### Sample Workout:
```json
{
  "title": "HIIT Cardio Blast",
  "description": "High-intensity interval training for maximum fat burn",
  "duration": 30,
  "difficulty": "Intermediate",
  "category": "Cardio",
  "videoUrl": "https://example.com/video.mp4",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "instructor": "Sarah Johnson",
  "calories": "300-400",
  "rating": 4.8,
  "views": 1250,
  "isFree": true,
  "tags": "cardio,hiit,fat-burn"
}
```

#### Sample Coach:
```json
{
  "name": "Sarah Johnson",
  "specialty": "Weight Loss & HIIT",
  "experience": "8 years",
  "bio": "Certified personal trainer specializing in high-intensity workouts",
  "rating": 4.9,
  "pricePerSession": 80,
  "imageUrl": "https://example.com/coach.jpg",
  "certifications": "NASM-CPT,HIIT Specialist",
  "availability": "Mon-Fri 6AM-8PM",
  "languages": "English,Spanish",
  "reviews": 156
}
```

## ✅ Testing Connection

### Step 13: Test Your Setup
1. Start your development server: `npm run dev`
2. Check browser console for any Appwrite connection errors
3. Try creating a newsletter subscription
4. Test admin login functionality

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Go to "Settings" → "Domains"
   - Add `localhost:3000` for development
   - Add your production domain when deploying

2. **Permission Errors**:
   - Check collection permissions
   - Ensure proper roles are assigned

3. **Storage Upload Errors**:
   - Check file size limits
   - Verify allowed extensions
   - Check bucket permissions

## 🚀 Production Setup

When deploying to production:

1. **Update CORS domains**:
   - Add your production domain
   - Remove localhost

2. **Update Environment Variables**:
   - Use production Appwrite endpoint if using self-hosted
   - Update project credentials

3. **Backup Strategy**:
   - Enable automatic backups in Appwrite console
   - Set up regular data exports

---

## 📞 Support

If you encounter issues:
- Check Appwrite documentation: [docs.appwrite.io](https://appwrite.io/docs)
- Join Appwrite Discord: [discord.gg/appwrite](https://discord.gg/appwrite)
- GitHub issues: [github.com/appwrite/appwrite](https://github.com/appwrite/appwrite)

Your FitnessHub platform is now ready to rock! 🎉
