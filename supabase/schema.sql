-- Supabase SQL Schema for Itinerary Planner

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Activities table (predefined activities users can add to their itinerary)
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- e.g., 'sightseeing', 'dining', 'adventure', 'culture'
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  duration INTEGER NOT NULL, -- duration in minutes
  cost DECIMAL(10, 2) DEFAULT 0,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Itineraries table (user-created itineraries)
CREATE TABLE itineraries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL DEFAULT 'My Itinerary',
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  start_date DATE,
  end_date DATE,
  total_days INTEGER DEFAULT 1,
  total_cost DECIMAL(10, 2) DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Itinerary items (activities added to specific days in an itinerary)
CREATE TABLE itinerary_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  day_number INTEGER NOT NULL,
  order_index INTEGER NOT NULL,
  start_time TIME,
  notes TEXT,
  custom_name VARCHAR(255), -- for custom activities
  custom_location VARCHAR(255),
  custom_duration INTEGER,
  custom_cost DECIMAL(10, 2),
  is_custom BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) policies
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;

-- Policies for itineraries
CREATE POLICY "Users can view their own itineraries" ON itineraries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own itineraries" ON itineraries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries" ON itineraries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries" ON itineraries
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public itineraries are viewable by everyone" ON itineraries
  FOR SELECT USING (is_public = true);

-- Policies for itinerary_items
CREATE POLICY "Users can view items from their own itineraries" ON itinerary_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM itineraries 
      WHERE itineraries.id = itinerary_items.itinerary_id 
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create items for their own itineraries" ON itinerary_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM itineraries 
      WHERE itineraries.id = itinerary_items.itinerary_id 
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items from their own itineraries" ON itinerary_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM itineraries 
      WHERE itineraries.id = itinerary_items.itinerary_id 
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their own itineraries" ON itinerary_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM itineraries 
      WHERE itineraries.id = itinerary_items.itinerary_id 
      AND itineraries.user_id = auth.uid()
    )
  );

-- Public items viewable for public itineraries
CREATE POLICY "Public itinerary items are viewable by everyone" ON itinerary_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM itineraries 
      WHERE itineraries.id = itinerary_items.itinerary_id 
      AND itineraries.is_public = true
    )
  );

-- Insert sample activities
INSERT INTO activities (name, category, location, latitude, longitude, duration, cost, description) VALUES
('Taj Mahal Tour', 'sightseeing', 'Agra, India', 27.1751, 78.0421, 180, 500.00, 'Visit the iconic symbol of love'),
('Red Fort Exploration', 'culture', 'Delhi, India', 28.6562, 77.2410, 120, 30.00, 'Explore the historic Mughal fort'),
('Ganga Aarti', 'culture', 'Varanasi, India', 25.3176, 82.9739, 60, 0.00, 'Evening prayer ceremony at the ghats'),
('Backwater Cruise', 'adventure', 'Alleppey, India', 9.4981, 76.3388, 240, 1200.00, 'Peaceful houseboat journey'),
('Palace of Winds', 'sightseeing', 'Jaipur, India', 26.9239, 75.8267, 90, 200.00, 'Marvel at the pink city architecture'),
('Spice Market Walk', 'culture', 'Kochi, India', 9.9312, 76.2673, 120, 100.00, 'Explore aromatic spice markets'),
('Tiger Safari', 'adventure', 'Ranthambore, India', 26.0173, 76.5026, 300, 2000.00, 'Wildlife safari in national park'),
('Cooking Class', 'culture', 'Udaipur, India', 24.5854, 73.7125, 180, 800.00, 'Learn traditional Rajasthani cuisine');

-- Create function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug()
RETURNS TRIGGER AS $$
BEGIN
  NEW.slug = LOWER(REPLACE(NEW.name, ' ', '-')) || '-' || SUBSTRING(NEW.id::TEXT FROM 1 FOR 8);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-generating slugs
CREATE TRIGGER generate_slug_trigger
  BEFORE INSERT ON itineraries
  FOR EACH ROW
  EXECUTE FUNCTION generate_unique_slug();

-- Create function to update total cost
CREATE OR REPLACE FUNCTION update_itinerary_total_cost()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE itineraries
  SET total_cost = (
    SELECT COALESCE(SUM(
      CASE 
        WHEN ii.is_custom THEN ii.custom_cost
        ELSE a.cost
      END
    ), 0)
    FROM itinerary_items ii
    LEFT JOIN activities a ON ii.activity_id = a.id
    WHERE ii.itinerary_id = COALESCE(NEW.itinerary_id, OLD.itinerary_id)
  )
  WHERE id = COALESCE(NEW.itinerary_id, OLD.itinerary_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating total cost
CREATE TRIGGER update_cost_trigger_insert
  AFTER INSERT ON itinerary_items
  FOR EACH ROW
  EXECUTE FUNCTION update_itinerary_total_cost();

CREATE TRIGGER update_cost_trigger_update
  AFTER UPDATE ON itinerary_items
  FOR EACH ROW
  EXECUTE FUNCTION update_itinerary_total_cost();

CREATE TRIGGER update_cost_trigger_delete
  AFTER DELETE ON itinerary_items
  FOR EACH ROW
  EXECUTE FUNCTION update_itinerary_total_cost();
