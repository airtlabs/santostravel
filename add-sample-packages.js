// Script to add sample packages across all categories
const packageData = [
    // INDIA TOURS
    {
        title: "Golden Triangle - Delhi, Agra & Jaipur",
        description: "Experience India's most iconic destinations in this classic 7-day journey through the Golden Triangle. Visit the bustling capital Delhi, witness the magnificent Taj Mahal in Agra, and explore the royal heritage of Jaipur.",
        category: "india",
        duration: "7 Days / 6 Nights",
        destination: "Delhi, Agra, Jaipur",
        price: 25000,
        booking_deadline: "2025-12-31",
        max_participants: 15,
        difficulty_level: "easy",
        best_time: "October to March",
        pickup_location: "Delhi Airport",
        status: "active",
        highlights: [
            "Visit the iconic Taj Mahal at sunrise",
            "Explore Red Fort and Jama Masjid in Delhi",
            "Discover Amber Fort and City Palace in Jaipur",
            "Traditional Rajasthani dinner with cultural show",
            "Shopping at local bazaars and markets"
        ],
        inclusions: [
            "6 nights accommodation in 4-star hotels",
            "Daily breakfast and dinner",
            "Air-conditioned transportation",
            "Professional English-speaking guide",
            "All monument entrance fees",
            "Airport transfers"
        ],
        exclusions: [
            "International flights",
            "Personal expenses",
            "Tips and gratuities",
            "Travel insurance",
            "Lunch (unless specified)"
        ],
        images: [
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Kerala Backwaters & Hill Stations",
        description: "Discover God's Own Country with this enchanting journey through Kerala's backwaters, hill stations, and pristine beaches. Experience the serene beauty of Alleppey, the cool climate of Munnar, and the coastal charm of Kochi.",
        category: "india",
        duration: "8 Days / 7 Nights",
        destination: "Kochi, Munnar, Alleppey, Kovalam",
        price: 32000,
        booking_deadline: "2025-12-31",
        max_participants: 12,
        difficulty_level: "easy",
        best_time: "September to April",
        pickup_location: "Kochi Airport",
        status: "active",
        highlights: [
            "Houseboat stay in Alleppey backwaters",
            "Tea plantation visit in Munnar",
            "Ayurvedic spa treatments",
            "Chinese fishing nets at Fort Kochi",
            "Wildlife safari at Periyar National Park"
        ],
        inclusions: [
            "7 nights accommodation (including houseboat)",
            "All meals during houseboat stay",
            "Daily breakfast at hotels",
            "Air-conditioned transportation",
            "Boat rides and transfers",
            "All sightseeing as per itinerary"
        ],
        exclusions: [
            "Flights to/from Kochi",
            "Lunch and dinner (except houseboat)",
            "Personal expenses",
            "Optional activities",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Rajasthan Royal Heritage",
        description: "Step into the royal world of Rajasthan with this magnificent 10-day journey through palaces, forts, and desert landscapes. Experience the grandeur of Udaipur, the blue city of Jodhpur, and the golden city of Jaisalmer.",
        category: "india",
        duration: "10 Days / 9 Nights",
        destination: "Udaipur, Jodhpur, Jaisalmer, Mount Abu",
        price: 45000,
        booking_deadline: "2025-12-31",
        max_participants: 14,
        difficulty_level: "moderate",
        best_time: "October to March",
        pickup_location: "Udaipur Airport",
        status: "active",
        highlights: [
            "Stay in heritage palace hotels",
            "Camel safari in Thar Desert",
            "Boat ride on Lake Pichola",
            "Visit magnificent Mehrangarh Fort",
            "Traditional Rajasthani folk performances"
        ],
        inclusions: [
            "9 nights in heritage/luxury hotels",
            "Daily breakfast and dinner",
            "Private air-conditioned vehicle",
            "Expert local guides",
            "Camel safari with overnight camping",
            "All entrance fees and transfers"
        ],
        exclusions: [
            "Domestic flights",
            "Lunch (unless specified)",
            "Personal shopping",
            "Tips and gratuities",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=500&fit=crop"
        ]
    },

    // WORLD TOURS
    {
        title: "Dubai & Abu Dhabi Explorer",
        description: "Experience the glitz and glamour of the UAE with this exciting 6-day tour covering Dubai's modern marvels and Abu Dhabi's cultural treasures. From towering skyscrapers to pristine beaches and luxury shopping.",
        category: "world",
        duration: "6 Days / 5 Nights",
        destination: "Dubai, Abu Dhabi",
        price: 85000,
        booking_deadline: "2025-12-31",
        max_participants: 16,
        difficulty_level: "easy",
        best_time: "November to April",
        pickup_location: "Dubai Airport",
        status: "active",
        highlights: [
            "Burj Khalifa observation deck visit",
            "Desert safari with BBQ dinner",
            "Sheikh Zayed Grand Mosque tour",
            "Dubai Mall and Gold Souk shopping",
            "Luxury dhow cruise dinner"
        ],
        inclusions: [
            "5 nights in 4-star hotels",
            "Daily breakfast",
            "Airport transfers",
            "City tours with guide",
            "Desert safari experience",
            "Dhow cruise dinner"
        ],
        exclusions: [
            "International flights",
            "Lunch and dinner (except specified)",
            "Personal expenses",
            "Optional activities",
            "Travel insurance",
            "UAE visa fees"
        ],
        images: [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Thailand Paradise - Bangkok & Phuket",
        description: "Discover the magic of Thailand with this perfect blend of cultural exploration in Bangkok and tropical relaxation in Phuket. Experience temples, street food, pristine beaches, and vibrant nightlife.",
        category: "world",
        duration: "8 Days / 7 Nights",
        destination: "Bangkok, Phuket",
        price: 65000,
        booking_deadline: "2025-12-31",
        max_participants: 18,
        difficulty_level: "easy",
        best_time: "November to April",
        pickup_location: "Bangkok Airport",
        status: "active",
        highlights: [
            "Grand Palace and Wat Pho temple visits",
            "Floating market experience",
            "James Bond Island tour",
            "Phi Phi Islands by speedboat",
            "Traditional Thai massage",
            "Patong Beach activities"
        ],
        inclusions: [
            "7 nights accommodation (4 Bangkok + 3 Phuket)",
            "Daily breakfast",
            "Domestic flights Bangkok-Phuket",
            "Island hopping tours",
            "Airport and hotel transfers",
            "City tours with guide"
        ],
        exclusions: [
            "International flights",
            "Lunch and dinner",
            "Personal expenses",
            "Optional water sports",
            "Travel insurance",
            "Thailand visa fees"
        ],
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Singapore & Malaysia Twin Cities",
        description: "Explore the best of Southeast Asia with this exciting twin-city tour. Experience Singapore's modern skyline and diverse culture, then discover Malaysia's rich heritage and natural beauty in Kuala Lumpur.",
        category: "world",
        duration: "7 Days / 6 Nights",
        destination: "Singapore, Kuala Lumpur",
        price: 75000,
        booking_deadline: "2025-12-31",
        max_participants: 20,
        difficulty_level: "easy",
        best_time: "Year round",
        pickup_location: "Singapore Airport",
        status: "active",
        highlights: [
            "Marina Bay Sands SkyPark",
            "Universal Studios Singapore",
            "Petronas Twin Towers visit",
            "Gardens by the Bay",
            "Batu Caves exploration",
            "Clarke Quay night cruise"
        ],
        inclusions: [
            "6 nights in centrally located hotels",
            "Daily breakfast",
            "Singapore-KL transfers",
            "City tours and attractions",
            "Airport transfers",
            "Professional guide services"
        ],
        exclusions: [
            "International flights",
            "Meals (except breakfast)",
            "Personal shopping",
            "Optional activities",
            "Travel insurance",
            "Entry visa fees"
        ],
        images: [
            "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=500&fit=crop"
        ]
    },

    // SPECIALTY TOURS
    {
        title: "Wildlife Safari - Jim Corbett & Ranthambore",
        description: "Embark on an unforgettable wildlife adventure through India's premier national parks. Witness majestic tigers, diverse wildlife, and pristine forests in this nature lover's paradise.",
        category: "specialty",
        duration: "6 Days / 5 Nights",
        destination: "Jim Corbett, Ranthambore",
        price: 38000,
        booking_deadline: "2025-12-31",
        max_participants: 10,
        difficulty_level: "moderate",
        best_time: "October to April",
        pickup_location: "Delhi",
        status: "active",
        highlights: [
            "Multiple tiger safari opportunities",
            "Bird watching sessions",
            "Nature walks with expert guides",
            "Wildlife photography workshops",
            "Stay in jungle resorts",
            "Interaction with local communities"
        ],
        inclusions: [
            "5 nights in wildlife resorts",
            "All meals",
            "Safari jeep rides",
            "Professional naturalist guide",
            "Park entry fees",
            "Transportation between parks"
        ],
        exclusions: [
            "Transportation to/from Delhi",
            "Personal expenses",
            "Tips for guides and drivers",
            "Camera fees in parks",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Spiritual Journey - Char Dham Yatra",
        description: "Embark on a sacred pilgrimage to the four holy shrines of Uttarakhand. This spiritual journey takes you through breathtaking Himalayan landscapes to Yamunotri, Gangotri, Kedarnath, and Badrinath.",
        category: "specialty",
        duration: "12 Days / 11 Nights",
        destination: "Yamunotri, Gangotri, Kedarnath, Badrinath",
        price: 55000,
        booking_deadline: "2025-04-30",
        max_participants: 25,
        difficulty_level: "hard",
        best_time: "May to October",
        pickup_location: "Haridwar",
        status: "active",
        highlights: [
            "Visit all four sacred Char Dham shrines",
            "Helicopter services for Kedarnath",
            "Ganga Aarti at Gangotri",
            "Spiritual discourses and meditation",
            "Scenic Himalayan landscapes",
            "Traditional temple ceremonies"
        ],
        inclusions: [
            "11 nights accommodation",
            "All vegetarian meals",
            "Transportation in hill vehicles",
            "Helicopter for Kedarnath",
            "Religious guide services",
            "All temple fees and donations"
        ],
        exclusions: [
            "Personal expenses",
            "Tips and offerings",
            "Medical emergencies",
            "Porter charges",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1563968485-7c8722a0e7c1?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Adventure Himalayas - Manali & Leh",
        description: "Experience the ultimate Himalayan adventure with this thrilling journey through some of the world's highest motorable passes. Perfect for adventure enthusiasts seeking breathtaking landscapes and adrenaline-pumping activities.",
        category: "specialty",
        duration: "9 Days / 8 Nights",
        destination: "Manali, Leh, Nubra Valley",
        price: 48000,
        booking_deadline: "2025-05-31",
        max_participants: 12,
        difficulty_level: "hard",
        best_time: "June to September",
        pickup_location: "Manali",
        status: "active",
        highlights: [
            "Drive through Rohtang Pass and Khardung La",
            "Camel safari in Nubra Valley",
            "Visit Pangong Tso Lake",
            "Monasteries of Leh and Thiksey",
            "River rafting in Zanskar",
            "High altitude acclimatization"
        ],
        inclusions: [
            "8 nights accommodation",
            "All meals",
            "Road transportation",
            "Professional driver cum guide",
            "Inner line permits",
            "Oxygen cylinders and first aid"
        ],
        exclusions: [
            "Personal trekking equipment",
            "Medical emergencies",
            "Flight bookings",
            "Personal expenses",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1548063992-10bbc3d1d9e6?w=800&h=500&fit=crop"
        ]
    },

    // CUSTOMIZED HOLIDAYS
    {
        title: "Luxury Maldives Honeymoon",
        description: "Create magical memories with this ultra-luxury honeymoon package in the Maldives. Stay in overwater villas, enjoy private dining experiences, and indulge in world-class spa treatments in this tropical paradise.",
        category: "customized",
        duration: "5 Days / 4 Nights",
        destination: "Maldives",
        price: 180000,
        booking_deadline: "2025-12-31",
        max_participants: 2,
        difficulty_level: "easy",
        best_time: "November to April",
        pickup_location: "Male Airport",
        status: "active",
        highlights: [
            "Overwater villa accommodation",
            "Private beach dinners",
            "Couples spa treatments",
            "Sunset dolphin cruise",
            "Snorkeling and diving",
            "Champagne welcome and turndown service"
        ],
        inclusions: [
            "4 nights in overwater villa",
            "All meals and premium beverages",
            "Seaplane transfers",
            "Spa treatments for couple",
            "Water sports activities",
            "Private beach excursions"
        ],
        exclusions: [
            "International flights",
            "Personal expenses",
            "Premium alcoholic beverages",
            "Additional spa treatments",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Family Fun - Goa Beach Holiday",
        description: "Perfect family getaway to Goa's pristine beaches with activities for all ages. Enjoy water sports, cultural tours, and relaxation time while creating unforgettable family memories.",
        category: "customized",
        duration: "6 Days / 5 Nights",
        destination: "North & South Goa",
        price: 35000,
        booking_deadline: "2025-12-31",
        max_participants: 8,
        difficulty_level: "easy",
        best_time: "October to March",
        pickup_location: "Goa Airport",
        status: "active",
        highlights: [
            "Beach resorts with family amenities",
            "Water sports and beach activities",
            "Spice plantation tour",
            "Dudhsagar Falls excursion",
            "Cultural shows and performances",
            "Kids' club activities"
        ],
        inclusions: [
            "5 nights in family-friendly resort",
            "Daily breakfast and dinner",
            "Airport transfers",
            "Sightseeing tours",
            "Water sports activities",
            "Children's entertainment"
        ],
        exclusions: [
            "Flights to/from Goa",
            "Lunch (unless specified)",
            "Personal expenses",
            "Additional water sports",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop"
        ]
    },

    // CORPORATE TRAVEL
    {
        title: "Corporate Retreat - Rishikesh",
        description: "Enhance team bonding and productivity with this corporate retreat in the spiritual city of Rishikesh. Combine business meetings with adventure activities and wellness sessions for the perfect work-life balance.",
        category: "corporate",
        duration: "4 Days / 3 Nights",
        destination: "Rishikesh",
        price: 28000,
        booking_deadline: "2025-12-31",
        max_participants: 50,
        difficulty_level: "moderate",
        best_time: "September to April",
        pickup_location: "Dehradun Airport",
        status: "active",
        highlights: [
            "Professional conference facilities",
            "Team building activities",
            "River rafting adventure",
            "Yoga and meditation sessions",
            "Evening cultural programs",
            "Networking dinners"
        ],
        inclusions: [
            "3 nights in resort accommodation",
            "All meals",
            "Conference hall with AV equipment",
            "Team building facilitators",
            "Adventure activities",
            "Transportation for group"
        ],
        exclusions: [
            "Transportation to/from Dehradun",
            "Personal expenses",
            "Additional equipment rental",
            "Individual room supplements",
            "Travel insurance"
        ],
        images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fccd4c05cd24?w=800&h=500&fit=crop"
        ]
    },
    {
        title: "Business Convention - Mumbai & Pune",
        description: "Professional business travel package designed for corporate conventions and meetings. Includes premium accommodations, conference facilities, and strategic networking opportunities in India's business hubs.",
        category: "corporate",
        duration: "5 Days / 4 Nights",
        destination: "Mumbai, Pune",
        price: 42000,
        booking_deadline: "2025-12-31",
        max_participants: 100,
        difficulty_level: "easy",
        best_time: "October to March",
        pickup_location: "Mumbai Airport",
        status: "active",
        highlights: [
            "5-star business hotels",
            "State-of-the-art conference centers",
            "Business networking events",
            "City business tours",
            "Professional event management",
            "Executive transportation"
        ],
        inclusions: [
            "4 nights luxury accommodation",
            "Daily breakfast and lunch",
            "Conference facilities",
            "Airport and inter-city transfers",
            "Business center access",
            "Event coordination services"
        ],
        exclusions: [
            "Domestic/International flights",
            "Dinner (unless specified)",
            "Personal business expenses",
            "Additional equipment",
            "Individual requirements"
        ],
        images: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop",
            "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=500&fit=crop"
        ]
    }
];

console.log(`Created ${packageData.length} sample packages across all categories:`);
console.log(`- India Tours: ${packageData.filter(p => p.category === 'india').length}`);
console.log(`- World Tours: ${packageData.filter(p => p.category === 'world').length}`);
console.log(`- Specialty Tours: ${packageData.filter(p => p.category === 'specialty').length}`);
console.log(`- Customized Holidays: ${packageData.filter(p => p.category === 'customized').length}`);
console.log(`- Corporate Travel: ${packageData.filter(p => p.category === 'corporate').length}`);

// Export for use in API calls
if (typeof module !== 'undefined' && module.exports) {
    module.exports = packageData;
} else if (typeof window !== 'undefined') {
    window.samplePackages = packageData;
}
