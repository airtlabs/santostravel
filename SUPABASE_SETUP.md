# Supabase Setup Guide for Santos Travel

## Prerequisites
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Setup Steps

### 1. Get Your Supabase Credentials
After creating your project, go to Settings → API and copy:
- Project URL
- Anon (public) key  
- Service role key

### 2. Update Environment Variables
Update the `.env.local` file with your actual Supabase credentials:

```env
# Replace with your actual Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Replace with your actual Supabase anon key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Replace with your actual Supabase service role key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Run Database Migrations
In your Supabase project dashboard:

1. Go to SQL Editor
2. Copy and run the content from `supabase/migrations/001_initial_schema.sql`
3. Copy and run the content from `supabase/migrations/002_sample_data.sql`

### 4. Verify Setup
After running the migrations, you should see the following tables in your Supabase dashboard:
- `packages`
- `bookings` 
- `blog_posts`

### 5. Test the Connection
1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/admin/dashboard`
3. Check if the dashboard loads with sample data

## Database Schema

### Packages Table
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text)
- `price` (Decimal)
- `duration` (String)
- `destination` (String)
- `category` (String)
- `status` (Enum: draft, published, archived)
- `images` (Array of strings)
- `itinerary` (JSON)
- `inclusions` (Array of strings)
- `exclusions` (Array of strings)
- `booking_deadline` (Date)
- `max_participants` (Integer)
- `difficulty_level` (Enum: easy, moderate, challenging)
- `best_time` (String)
- `pickup_location` (String)
- `highlights` (Array of strings)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Bookings Table
- `id` (UUID, Primary Key)
- `package_id` (UUID, Foreign Key)
- `user_name` (String)
- `user_email` (String)
- `user_phone` (String)
- `travel_date` (Date)
- `participants` (Integer)
- `total_amount` (Decimal)
- `status` (Enum: pending, confirmed, cancelled)
- `payment_status` (Enum: pending, paid, failed)
- `special_requests` (Text)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Blog Posts Table
- `id` (UUID, Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `content` (Text)
- `excerpt` (Text)
- `featured_image` (String)
- `author` (String)
- `category` (String)
- `tags` (Array of strings)
- `status` (Enum: draft, published)
- `published_at` (Timestamp)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## API Endpoints

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create new package
- `GET /api/packages/[id]` - Get package by ID
- `PUT /api/packages/[id]` - Update package
- `DELETE /api/packages/[id]` - Delete package

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking by ID
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Delete booking

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Security Features
- Row Level Security (RLS) enabled
- Public read access to published content
- Authenticated access for admin operations
- Policies for data protection

## Next Steps
1. Customize the database schema as needed
2. Add authentication for admin users
3. Implement image upload functionality
4. Set up email notifications for bookings
5. Add payment integration
