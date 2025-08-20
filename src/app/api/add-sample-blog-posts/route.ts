import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const sampleBlogPosts = [
            {
                title: "10 Essential Travel Tips for First-Time India Visitors",
                slug: "10-essential-travel-tips-first-time-india-visitors",
                content: `Traveling to India for the first time can be both exciting and overwhelming. This incredible country offers a sensory overload of colors, sounds, flavors, and experiences that you'll never forget. To help you make the most of your journey, we've compiled 10 essential tips that every first-time visitor to India should know.

1. Get Your Visa Early
Make sure to apply for your Indian visa well in advance of your travel dates. The e-visa process has made this much easier, but it's still important to plan ahead.

2. Pack Light and Smart
India's diverse climate means you'll need different clothes for different regions. Pack lightweight, breathable fabrics and always carry a light jacket for air-conditioned spaces.

3. Stay Hydrated
Always drink bottled water and avoid ice in drinks. Carry a water bottle with you at all times, especially during the hot summer months.

4. Respect Local Customs
India is a country rich in traditions. Dress modestly when visiting temples, remove your shoes when required, and always ask permission before photographing people.

5. Try the Street Food (Carefully)
Indian street food is delicious but choose busy stalls with high turnover for the freshest food. Start slowly to let your stomach adjust.

6. Bargain at Markets
Bargaining is expected at most markets and with auto-rickshaw drivers. Don't be afraid to negotiate, but do so respectfully.

7. Use Reputable Transport
Book taxis through your hotel or use apps like Ola and Uber in cities. For longer distances, trains are generally reliable and comfortable.

8. Keep Copies of Documents
Always carry photocopies of your passport, visa, and other important documents separately from the originals.

9. Be Patient
Things move at a different pace in India. Embrace the chaos and go with the flow – it's all part of the incredible experience.

10. Stay Open-Minded
India will challenge your preconceptions and comfort zone. Stay open to new experiences, and you'll create memories that will last a lifetime.`,
                excerpt: "Planning your first trip to India? These 10 essential tips will help you navigate this incredible country with confidence and make the most of your journey.",
                featured_image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
                author: "Santos Travel Team",
                category: "travel-tips",
                tags: ["India", "first-time", "travel tips", "guide"],
                status: "published",
                published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                title: "Exploring Rajasthan: A Journey Through the Land of Kings",
                slug: "exploring-rajasthan-journey-through-land-of-kings",
                content: `Rajasthan, the largest state in India, is a mesmerizing tapestry of vibrant colors, magnificent palaces, imposing forts, and golden sand dunes. Known as the "Land of Kings," this desert state offers travelers an unforgettable journey through India's rich history and culture.

The Golden City of Jaisalmer
Start your Rajasthan adventure in Jaisalmer, where the golden sandstone architecture glows in the desert sun. The Jaisalmer Fort, also known as Sonar Quila, is a living fort where families still reside within its walls. Don't miss a camel safari into the Thar Desert for a magical sunset experience.

The Pink City of Jaipur
Jaipur, the capital of Rajasthan, is famous for its pink-hued buildings and royal heritage. Visit the majestic Amber Fort, explore the City Palace, and marvel at the intricate architecture of Hawa Mahal (Palace of Winds). The bustling bazaars offer everything from jewelry to textiles.

The Blue City of Jodhpur
Jodhpur is dominated by the magnificent Mehrangarh Fort, one of the largest forts in India. The old city below the fort is painted in various shades of blue, creating a stunning visual contrast against the arid landscape.

The City of Lakes - Udaipur
Often called the "Venice of the East," Udaipur is renowned for its beautiful lakes, palaces, and romantic ambiance. The City Palace complex and a boat ride on Lake Pichola are must-do experiences.

The Holy City of Pushkar
This sacred town is home to one of the few Brahma temples in the world and the famous Pushkar Camel Fair (if you visit in November). The ghats around Pushkar Lake offer a peaceful spiritual experience.

When to Visit
The best time to visit Rajasthan is from October to March when the weather is pleasant. Avoid the summer months (April to June) as temperatures can soar above 45°C.

Cultural Experiences
- Stay in a heritage hotel converted from a palace or fort
- Attend a traditional Rajasthani folk dance performance
- Take a cooking class to learn about local cuisine
- Shop for handicrafts, textiles, and jewelry in local markets

Tips for Traveling in Rajasthan
- Carry plenty of water and sunscreen
- Dress modestly and respect local customs
- Book accommodations in advance, especially during peak season
- Be prepared for some long travel distances between cities

Rajasthan is a photographer's paradise and a history lover's dream. Every city tells a different story, and every palace holds centuries of royal legacy. This magical state will leave you with memories to cherish for a lifetime.`,
                excerpt: "Discover the magic of Rajasthan, India's Land of Kings. From golden Jaisalmer to pink Jaipur, explore palaces, forts, and vibrant culture in this comprehensive guide.",
                featured_image: "https://images.unsplash.com/photo-1518271785928-33dbb66ccc5c",
                author: "Priya Sharma",
                category: "destination-guides",
                tags: ["Rajasthan", "India", "palaces", "forts", "culture"],
                status: "published",
                published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                title: "Kerala Backwaters: A Serene Journey Through God's Own Country",
                slug: "kerala-backwaters-serene-journey-gods-own-country",
                content: `Kerala, aptly nicknamed "God's Own Country," is a tropical paradise in South India known for its pristine backwaters, lush hill stations, and rich cultural heritage. The backwaters of Kerala offer one of the most serene and unique travel experiences in India.

What are the Kerala Backwaters?
The backwaters are a network of interconnected canals, rivers, lakes, and inlets along the Kerala coast. These waterways stretch over 900 kilometers and are fed by 38 rivers. The most popular backwater destinations include Alleppey (Alappuzha), Kumarakom, and Kollam.

Houseboat Experience
The highlight of any backwater trip is staying overnight on a traditional houseboat called a 'kettuvallam.' These boats were originally used to transport rice and spices but have been converted into floating hotels with modern amenities. Drifting along the waterways while enjoying freshly prepared Kerala cuisine is an experience like no other.

Best Time to Visit
The ideal time to visit Kerala's backwaters is from October to March when the weather is pleasant and rainfall is minimal. The monsoon season (June to September) brings heavy rains, making navigation difficult.

Top Backwater Destinations

Alleppey (Alappuzha)
Known as the "Venice of the East," Alleppey is the most popular backwater destination. The town offers numerous houseboat options and beautiful canal cruises.

Kumarakom
Located on Vembanad Lake, Kumarakom is famous for its bird sanctuary and luxury resorts. It's perfect for those seeking a more upscale backwater experience.

Kollam
Often considered the gateway to the backwaters, Kollam offers the longest backwater cruise to Alleppey (8 hours) and beautiful Chinese fishing nets.

Things to Do
- Houseboat cruise through the backwaters
- Village walks to experience local life
- Birdwatching at Kumarakom Bird Sanctuary
- Ayurvedic spa treatments
- Fishing with local fishermen
- Visit spice plantations
- Explore ancient temples and churches

Local Cuisine
Kerala's backwater region offers incredible seafood and traditional dishes. Don't miss:
- Karimeen (Pearl Spot fish) curry
- Appam with stew
- Coconut-based curries
- Fresh toddy (palm wine)
- Banana chips and jack fruit

Sustainable Tourism
When visiting the backwaters, choose eco-friendly tour operators and houseboats that practice sustainable tourism. This helps preserve the delicate ecosystem and supports local communities.

Tips for Your Backwater Journey
- Book houseboats in advance, especially during peak season
- Pack light cotton clothes and mosquito repellent
- Carry a good camera for stunning sunset shots
- Respect local customs and traditions
- Don't litter in the waterways

The Kerala backwaters offer a perfect blend of natural beauty, cultural richness, and tranquil experiences. Whether you're seeking relaxation, adventure, or cultural immersion, this tropical paradise has something for everyone.`,
                excerpt: "Experience the tranquil beauty of Kerala's backwaters. From houseboat cruises to village walks, discover why this tropical paradise is called God's Own Country.",
                featured_image: "https://images.unsplash.com/photo-1582645300787-b318b6c08be8",
                author: "Rajesh Kumar",
                category: "destination-guides",
                tags: ["Kerala", "backwaters", "houseboat", "nature", "South India"],
                status: "published",
                published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                title: "My Solo Adventure Through the Himalayas: Lessons Learned",
                slug: "solo-adventure-himalayas-lessons-learned",
                content: `Last month, I embarked on a solo trek through the Himalayas, and it turned out to be one of the most transformative experiences of my life. Here's my story and the valuable lessons I learned along the way.

The Decision to Go Solo
After months of planning group trips that never materialized, I decided to take matters into my own hands. The mountains had been calling, and I couldn't wait any longer. Solo travel, especially in the Himalayas, seemed daunting at first, but it ended up being the best decision I made.

The Route: Manali to Spiti Valley
I chose the Manali to Spiti Valley route, known for its stunning landscapes and Buddhist monasteries. The journey took me through high-altitude passes, remote villages, and some of the most breathtaking scenery I've ever witnessed.

Day 1-3: Acclimatization in Manali
I spent the first three days in Manali, getting used to the altitude and finalizing my gear. The town is bustling with fellow travelers, making it easy to connect with other adventurers.

Day 4-7: The Journey Begins
Crossing Rohtang Pass marked the real beginning of my adventure. The landscape dramatically changed from lush green valleys to barren, moon-like terrain. Each day brought new challenges and incredible vistas.

Day 8-12: Heart of Spiti
The ancient monasteries of Key and Tashigang, the highest post office in the world at Hikkim, and the surreal beauty of Chandratal Lake were the highlights of this leg.

Lessons Learned

1. Trust Yourself
Solo travel teaches you to rely on your instincts and make decisions independently. Every choice, from which route to take to where to stay, builds confidence.

2. Embrace Uncertainty
Mountain weather can change in minutes, and roads can become impassable. Learning to adapt and find alternative solutions is invaluable.

3. Connect with Locals
Some of my most memorable moments came from conversations with locals who shared stories about their life in the mountains and offered incredible hospitality.

4. Respect the Mountains
The Himalayas demand respect. Proper preparation, appropriate gear, and understanding weather patterns are crucial for safety.

5. Solitude is Powerful
Being alone with your thoughts in such magnificent surroundings is meditative. It's an opportunity for deep self-reflection that's hard to find in our busy lives.

Challenges Faced
- Altitude sickness in the first few days
- Language barriers in remote villages
- Unpredictable weather conditions
- Limited connectivity and navigation challenges
- Finding reliable accommodation in some areas

Essential Gear for Himalayan Solo Travel
- High-quality trekking boots
- Layered clothing system
- Sleeping bag rated for low temperatures
- First aid kit with altitude sickness medication
- Portable charger and emergency communication device
- Good quality backpack and rain gear

Safety Considerations
- Always inform someone about your itinerary
- Carry emergency contact numbers
- Have backup plans for accommodation
- Understand signs of altitude sickness
- Carry sufficient cash as ATMs are rare

The Transformation
By the end of my 12-day journey, I felt like a different person. The mountains had taught me patience, resilience, and the beauty of simplicity. The silence of the high altitudes and the warmth of the local people created memories I'll cherish forever.

Would I Recommend Solo Himalayan Travel?
Absolutely! While it requires careful planning and a good level of fitness, the rewards are immense. The sense of accomplishment, the connections you make, and the personal growth you experience make every challenge worthwhile.

If you're considering a solo adventure in the Himalayas, start with shorter, well-marked trails and gradually build up to more challenging routes. The mountains will always be there, waiting to share their wisdom with those brave enough to venture alone.`,
                excerpt: "A personal account of a solo trek through the Himalayas, sharing the challenges, discoveries, and life lessons learned along the way in this transformative journey.",
                featured_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
                author: "Ankit Verma",
                category: "travel-stories",
                tags: ["Himalayas", "solo travel", "trekking", "Spiti Valley", "adventure"],
                status: "published",
                published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                title: "Sustainable Tourism: How to Travel Responsibly in 2025",
                slug: "sustainable-tourism-travel-responsibly-2025",
                content: `As travelers become more conscious of their environmental impact, sustainable tourism has evolved from a niche concept to a mainstream movement. In 2025, responsible travel isn't just an option—it's a necessity for preserving the destinations we love for future generations.

What is Sustainable Tourism?
Sustainable tourism is about making simple choices that ensure our travels have a positive impact on local communities, economies, and environments. It involves minimizing negative impacts while maximizing the benefits for local people and places.

Why Sustainable Tourism Matters More Than Ever
Climate change, overtourism, and environmental degradation have made sustainable travel practices crucial. Popular destinations worldwide are implementing measures to protect their natural and cultural heritage, and travelers play a vital role in this effort.

How to Travel Sustainably

Choose Eco-Friendly Accommodations
- Look for hotels with green certifications
- Stay in locally-owned guesthouses and homestays
- Choose accommodations that use renewable energy
- Support properties with water conservation programs

Transportation Choices
- Opt for direct flights when possible to reduce carbon emissions
- Use public transportation, bicycles, or walk when exploring destinations
- Consider train travel for medium-distance journeys
- If renting a car, choose hybrid or electric vehicles

Support Local Communities
- Buy from local markets and eat at locally-owned restaurants
- Choose tour operators that employ local guides
- Purchase authentic handicrafts directly from artisans
- Respect local customs and traditions

Minimize Environmental Impact
- Carry a reusable water bottle and shopping bag
- Avoid single-use plastics
- Dispose of waste properly and recycle when possible
- Stay on designated trails and respect wildlife

Sustainable Tourism Trends in 2025

Regenerative Tourism
Going beyond "doing no harm," regenerative tourism actively improves destinations by contributing to conservation efforts and community development.

Digital Nomadism with Purpose
Remote workers are choosing destinations where they can contribute skills to local projects while exploring new places.

Slow Travel Movement
Travelers are spending more time in fewer places, reducing transportation emissions and developing deeper connections with destinations.

Technology for Good
Apps and platforms now help travelers make sustainable choices by providing information about eco-friendly options and carbon footprint tracking.

Sustainable Destinations to Consider

Costa Rica
A pioneer in sustainable tourism with extensive national parks and eco-lodges.

Bhutan
The world's only carbon-negative country with a focus on "high value, low impact" tourism.

New Zealand
Leading the way in conservation tourism and protecting indigenous Maori culture.

Kerala, India
Promoting responsible tourism through community-based initiatives and eco-friendly practices.

Tips for Planning Your Sustainable Trip

Research Before You Go
- Learn about local environmental challenges
- Understand cultural norms and etiquette
- Find certified sustainable tour operators
- Plan activities that benefit local communities

Pack Responsibly
- Bring reef-safe sunscreen
- Pack reusable items
- Choose biodegradable toiletries
- Bring a portable water filter

Offset Your Carbon Footprint
- Calculate your trip's carbon emissions
- Invest in verified carbon offset programs
- Choose direct flights and efficient routes
- Consider staying longer to maximize your travel investment

Making a Difference
Every traveler has the power to make a positive impact. By making conscious choices about where we stay, how we travel, what we eat, and what activities we choose, we can help preserve the world's most beautiful destinations while supporting the communities that call them home.

The Future of Travel
Sustainable tourism isn't just a trend—it's the future of travel. As destinations implement new policies and travelers become more conscious, the tourism industry is transforming to become more responsible and regenerative.

Start your sustainable travel journey today by making one small change at a time. Together, we can ensure that the wonders of our world remain accessible and pristine for generations to come.`,
                excerpt: "Learn how to travel responsibly in 2025 with our comprehensive guide to sustainable tourism practices that benefit both travelers and destinations.",
                featured_image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                author: "Green Travel Team",
                category: "travel-tips",
                tags: ["sustainable travel", "eco-tourism", "responsible travel", "environment"],
                status: "published",
                published_at: new Date().toISOString()
            }
        ];

        // Insert blog posts
        const { data, error } = await supabase
            .from('blog_posts')
            .insert(sampleBlogPosts)
            .select();

        if (error) {
            console.error('Error inserting sample blog posts:', error);
            return NextResponse.json(
                { error: 'Failed to add sample blog posts', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Sample blog posts added successfully',
            count: data.length,
            posts: data
        });
    } catch (error) {
        console.error('Error in add sample blog posts API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
