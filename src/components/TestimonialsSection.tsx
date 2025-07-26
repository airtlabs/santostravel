'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Renuka',
      location: 'Mumbai',
      tour: 'Highlights of Dubai Abu Dhabi',
      rating: 5,
      date: 'Jul, 2025',
      review: 'Overall it was a great experience with Santos.travel. The tour was well organized and our tour manager was very helpful throughout the journey.',
      tourManager: 'Swapnil Kadam',
      category: 'Family'
    },
    {
      name: 'Neha',
      location: 'Delhi',
      tour: 'Customized Holiday Mauritius',
      rating: 5,
      date: 'Jul, 2025',
      review: 'Santos.travel gave us a lifetime of an experience with their excellent service and attention to detail. Highly recommended!',
      tourManager: 'Rajesh Sharma',
      category: 'Family'
    },
    {
      name: 'Girish',
      location: 'Bangalore',
      tour: 'Highlights of Kerala',
      rating: 5,
      date: 'Jul, 2025',
      review: 'Awesome experience! The backwaters, hill stations, and cultural experiences were beyond our expectations.',
      tourManager: 'Pravin More',
      category: 'Family'
    },
    {
      name: 'Soumak',
      location: 'Kolkata',
      tour: 'Best of Switzerland',
      rating: 5,
      date: 'Jul, 2025',
      review: 'Our first trip with Santos.travel also happened to be our best international experience. Switzerland was magical!',
      tourManager: 'Sahil Patil',
      category: 'Family'
    },
    {
      name: 'Pradnya',
      location: 'Pune',
      tour: 'USA West Coast',
      rating: 5,
      date: 'Jul, 2025',
      review: 'Sight seeing, hotel booking, food all is too good, tour leader is very very cooperative and very care taking.',
      tourManager: 'Amol Salgar',
      category: 'Family'
    },
    {
      name: 'Asmita',
      location: 'Ahmedabad',
      tour: 'Best of Bali',
      rating: 5,
      date: 'Jul, 2025',
      review: 'We recently completed our tour to Bali with Santos.travel and it was an incredible experience with wonderful memories.',
      tourManager: 'Megha Shinde',
      category: 'Family'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Santos.travel tour reviews
          </h2>
          <p className="text-xl text-gray-600">
            What are you waiting for? Chalo Bag Bharo Nikal Pado!
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 mb-12 border border-blue-100 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < currentReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm bg-blue-600 text-white px-2 py-1 rounded">
                    {currentReview.category}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {currentReview.tour}
                </h3>

                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  &ldquo;{currentReview.review}&rdquo;
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {currentReview.name}
                    </p>
                    <p className="text-gray-600">
                      Travelled in {currentReview.date} • {currentReview.location}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-gray-600">Tour Manager:</p>
                    <p className="font-semibold text-blue-600">
                      {currentReview.tourManager}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex md:flex-col gap-4">
                <button
                  onClick={prevTestimonial}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-md transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-md transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all ${index === currentTestimonial
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {testimonial.category}
                </span>
              </div>

              <h4 className="font-bold text-gray-900 mb-2 text-sm">
                {testimonial.tour}
              </h4>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                &ldquo;{testimonial.review.substring(0, 100)}...&rdquo;
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="font-semibold">{testimonial.name}</span>
                <span>{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Read more Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
