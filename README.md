# FitnessHub - Complete Fitness Platform

A comprehensive fitness platform built with Next.js, TypeScript, Tailwind CSS, and Appwrite backend. Features workout videos, personal coaching, diet plans, supplements recommendations, and more.

## 🚀 Features

- **Workout Videos**: 500+ professional workout videos with filtering and search
- **Personal Coaching**: 1-on-1 coaching sessions with certified trainers
- **Diet Plans**: Customized nutrition guidance and meal planning
- **Supplement Store**: Premium supplement recommendations
- **Newsletter**: Weekly fitness tips and exclusive content
- **Fitness Gear**: Athletic footwear and equipment recommendations
- **Admin Dashboard**: Complete content management system
- **Responsive Design**: Mobile-first approach with beautiful animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Appwrite (Database, Auth, Storage)
- **Payments**: Stripe integration
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fit
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=fitness-hub

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Admin Configuration
ADMIN_EMAIL=admin@fitnesshub.com
ADMIN_PASSWORD=your-admin-password
```

4. Set up Appwrite:
   - Create an Appwrite account at [appwrite.io](https://appwrite.io)
   - Create a new project
   - Set up the following collections in your database:
     - `workouts`
     - `workout-plans`
     - `diet-plans`
     - `coaches`
     - `supplements`
     - `newsletter`
     - `footwear`
     - `bookings`
   - Create storage buckets:
     - `workout-videos`
     - `thumbnails`
     - `profile-images`
     - `product-images`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Appwrite Setup
1. Create collections with the following structure:

**Workouts Collection:**
- `title` (string)
- `description` (string)
- `duration` (integer)
- `difficulty` (string)
- `category` (string)
- `videoUrl` (string)
- `thumbnailUrl` (string)
- `instructor` (string)
- `calories` (string)
- `rating` (float)
- `isFree` (boolean)

**Coaches Collection:**
- `name` (string)
- `specialty` (string)
- `experience` (string)
- `bio` (string)
- `rating` (float)
- `pricePerSession` (integer)
- `imageUrl` (string)
- `certifications` (array)
- `availability` (string)

### Stripe Setup
1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhook endpoints for payment processing

## 📱 Features Overview

### Home Page
- Hero section with call-to-action
- Featured workouts carousel
- Services overview
- Coaching CTA
- Newsletter signup

### Workouts Page
- Video library with filtering
- Search functionality
- Category-based browsing
- Difficulty levels
- Duration filters

### Coaching Page
- Coach profiles
- Pricing plans
- Booking system
- Payment integration

### Admin Dashboard
- Content management
- User analytics
- Revenue tracking
- Subscription management

## 🎨 Customization

### Styling
- All styles are built with Tailwind CSS
- Custom animations using Framer Motion
- Responsive design principles
- Dark theme by default

### Content Management
- Admin dashboard for easy content updates
- File upload for videos and images
- Real-time content synchronization

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 📚 API Routes

- `/api/workouts` - Workout management
- `/api/coaches` - Coach management
- `/api/bookings` - Booking system
- `/api/newsletter` - Newsletter subscriptions
- `/api/payments` - Stripe payment processing

## 🔐 Admin Access

Access the admin dashboard at `/admin` with these demo credentials:
- Email: `admin@fitnesshub.com`
- Password: `admin123`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@fitnesshub.com
- Documentation: [Link to docs]
- GitHub Issues: [Link to issues]

---

Built with ❤️ for the fitness community
