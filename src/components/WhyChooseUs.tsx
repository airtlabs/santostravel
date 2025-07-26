import {
  Hotel,
  Utensils,
  Bus,
  Users,
  MapPin,
  Plane,
  Shield,
  Award
} from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Hotel,
      title: 'Accommodation',
      description: 'Comfortable & convenient hotels cherry picked by our hotel management team'
    },
    {
      icon: Utensils,
      title: 'All meals',
      description: 'Eat to your heart&apos;s content Breakfast. Lunch. Dinner.'
    },
    {
      icon: Bus,
      title: 'On-tour transport',
      description: 'Our itineraries include all rail, sea and road transport as part of the itinerary so you can enjoy tension free'
    },
    {
      icon: Users,
      title: 'Tour managers',
      description: 'We have an exclusive team of 350 tour managers specialising in India and World tours'
    },
    {
      icon: MapPin,
      title: 'Best value itinerary',
      description: 'Our dedicated product & destination research team spends hours curating the best value for money itineraries'
    },
    {
      icon: Plane,
      title: 'To and fro airfare',
      description: 'Santos.travel tours are inclusive of airfare from many hubs within India unless you pick the joining-leaving option'
    }
  ];

  const stats = [
    {
      icon: Award,
      number: '8,68,294',
      label: 'Happy guests'
    },
    {
      icon: MapPin,
      number: '67,228',
      label: 'Tours completed'
    },
    {
      icon: Users,
      number: '325+',
      label: 'Tour Experts'
    },
    {
      icon: Shield,
      number: '2500+',
      label: 'Tour destinations'
    }
  ];

  return (
    <section className="py-16 bg-blue-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dbeafe' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All inclusive tours, Chalo Bag Bharo Nikal Pado!
          </h2>
          <p className="text-xl text-gray-600">
            We&apos;re curating experiences that win hearts and make you Celebrate Life!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              We&apos;re curating experiences that win hearts and make you Celebrate Life!
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-md">
                    <IconComponent className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="bg-orange-500 text-white rounded-2xl p-6 inline-block shadow-lg">
              <h4 className="text-xl font-bold mb-2">Our Lakshya</h4>
              <p className="text-lg">Bharat Ki Sabse Behtareen Travel Company</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Trusted & Safe</h4>
              <p className="text-gray-600">
                Your safety and satisfaction is our top priority
              </p>
            </div>

            <div>
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Award Winning</h4>
              <p className="text-gray-600">
                Recognized as one of India&apos;s leading travel companies
              </p>
            </div>

            <div>
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Expert Team</h4>
              <p className="text-gray-600">
                Experienced travel professionals at your service
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
