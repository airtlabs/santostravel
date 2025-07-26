-- Insert sample packages
INSERT INTO packages (
    title,
    description,
    price,
    duration,
    destination,
    category,
    status,
    images,
    itinerary,
    inclusions,
    exclusions,
    booking_deadline,
    max_participants,
    difficulty_level,
    best_time,
    pickup_location,
    highlights
) VALUES 
(
    'Golden Triangle Tour',
    'Experience the magnificent Golden Triangle circuit covering Delhi, Agra, and Jaipur. Witness the iconic Taj Mahal, explore the grandeur of Red Fort, and discover the pink city of Jaipur.',
    25999.00,
    '6 Days / 5 Nights',
    'Delhi, Agra, Jaipur',
    'India',
    'published',
    ARRAY['https://images.unsplash.com/photo-1564507592333-c60657eea523', 'https://images.unsplash.com/photo-1587474260584-136574528ed5'],
    '[
        {
            "day": 1,
            "title": "Arrival in Delhi",
            "description": "Welcome to the capital city of India",
            "activities": ["Airport pickup", "Hotel check-in", "Red Fort visit"],
            "meals": ["Dinner"],
            "accommodation": "4-star hotel in Delhi"
        },
        {
            "day": 2,
            "title": "Delhi Sightseeing",
            "description": "Explore Old and New Delhi",
            "activities": ["India Gate", "Lotus Temple", "Chandni Chowk"],
            "meals": ["Breakfast", "Lunch", "Dinner"],
            "accommodation": "4-star hotel in Delhi"
        }
    ]',
    ARRAY['Accommodation', 'Daily breakfast', 'Air-conditioned transport', 'English speaking guide'],
    ARRAY['Flight tickets', 'Personal expenses', 'Tips and gratuities'],
    '2025-12-31',
    20,
    'easy',
    'October to March',
    'Delhi Airport / Railway Station',
    ARRAY['Visit to Taj Mahal', 'Explore Red Fort', 'Jaipur City Palace', 'Shopping in local markets']
),
(
    'Kerala Backwaters Cruise',
    'Sail through the serene backwaters of Kerala on a traditional houseboat. Experience the tranquil beauty of Alleppey and Kumarakom.',
    18999.00,
    '4 Days / 3 Nights',
    'Alleppey, Kumarakom',
    'India',
    'published',
    ARRAY['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'],
    '[
        {
            "day": 1,
            "title": "Arrival in Kochi",
            "description": "Welcome to Gods Own Country",
            "activities": ["Airport pickup", "Drive to Alleppey", "Houseboat boarding"],
            "meals": ["Lunch", "Dinner"],
            "accommodation": "Deluxe houseboat"
        }
    ]',
    ARRAY['Houseboat accommodation', 'All meals', 'Pick-up and drop', 'Backwater cruise'],
    ARRAY['Flight tickets', 'Personal expenses', 'Additional activities'],
    '2025-11-30',
    15,
    'easy',
    'September to May',
    'Kochi Airport',
    ARRAY['Houseboat stay', 'Backwater cruise', 'Traditional Kerala cuisine', 'Village visits']
),
(
    'Switzerland Alps Adventure',
    'Discover the breathtaking beauty of Swiss Alps with visits to Jungfraujoch, Interlaken, and Lucerne.',
    89999.00,
    '8 Days / 7 Nights',
    'Zurich, Interlaken, Lucerne',
    'World',
    'published',
    ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'https://images.unsplash.com/photo-1527004760525-e45166c1e9c0'],
    '[
        {
            "day": 1,
            "title": "Arrival in Zurich",
            "description": "Welcome to Switzerland",
            "activities": ["Airport pickup", "City tour", "Hotel check-in"],
            "meals": ["Dinner"],
            "accommodation": "4-star hotel in Zurich"
        }
    ]',
    ARRAY['Accommodation', 'Daily breakfast', 'Swiss Travel Pass', 'Airport transfers'],
    ARRAY['International flights', 'Lunch and dinner', 'Personal expenses'],
    '2025-10-31',
    25,
    'moderate',
    'May to October',
    'Zurich Airport',
    ARRAY['Jungfraujoch visit', 'Lake Lucerne cruise', 'Rhine Falls', 'Alpine train rides']
);
