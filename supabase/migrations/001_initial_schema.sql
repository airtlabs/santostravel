-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    images TEXT[] DEFAULT '{}',
    itinerary JSONB DEFAULT '[]',
    inclusions TEXT[] DEFAULT '{}',
    exclusions TEXT[] DEFAULT '{}',
    booking_deadline DATE NOT NULL,
    max_participants INTEGER NOT NULL,
    difficulty_level VARCHAR DEFAULT 'easy' CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
    best_time VARCHAR NOT NULL,
    pickup_location VARCHAR NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
    user_name VARCHAR NOT NULL,
    user_email VARCHAR NOT NULL,
    user_phone VARCHAR NOT NULL,
    travel_date DATE NOT NULL,
    participants INTEGER NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    payment_status VARCHAR DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    featured_image VARCHAR,
    author VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    tags TEXT[] DEFAULT '{}',
    status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);
CREATE INDEX IF NOT EXISTS idx_packages_destination ON packages(destination);
CREATE INDEX IF NOT EXISTS idx_packages_created_at ON packages(created_at);

CREATE INDEX IF NOT EXISTS idx_bookings_package_id ON bookings(package_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Enable Row Level Security (RLS) - Temporarily disabled for development
-- ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for packages (commented out for development)
-- CREATE POLICY "Allow public read access to published packages" ON packages
--     FOR SELECT USING (status = 'published');

-- CREATE POLICY "Allow authenticated users to manage packages" ON packages
--     FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for bookings (commented out for development)
-- CREATE POLICY "Allow users to create bookings" ON bookings
--     FOR INSERT WITH CHECK (true);

-- CREATE POLICY "Allow authenticated users to manage bookings" ON bookings
--     FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for blog posts (commented out for development)  
-- CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
--     FOR SELECT USING (status = 'published');

-- CREATE POLICY "Allow authenticated users to manage blog posts" ON blog_posts
--     FOR ALL USING (auth.role() = 'authenticated');
