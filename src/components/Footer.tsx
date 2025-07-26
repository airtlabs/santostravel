'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Top Contact Section */}
      <div className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Our Offices */}
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Our Offices</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Located across the country, ready to plan your dream vacation today!
              </p>
              <Link href="/locations" className="text-blue-600 hover:text-blue-800 font-medium">
                Locate Us
              </Link>
            </div>

            {/* Call us */}
            <div>
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Call us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Request a quote or chat - we're here to help anytime!
              </p>
              <div className="space-y-1">
                <Link href="tel:18002279979" className="text-blue-600 hover:text-blue-800 font-medium block">
                  1800 22 7979
                </Link>
                <span className="text-gray-500">or</span>
                <Link href="tel:18003135555" className="text-blue-600 hover:text-blue-800 font-medium block">
                  1800 313 5555
                </Link>
              </div>
            </div>

            {/* Write to us */}
            <div>
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Write to us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                We're always happy to help!
              </p>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-500">For Feedback: </span>
                  <Link href="mailto:feedback@santos.travel" className="text-blue-600 hover:text-blue-800">
                    feedback@santos.travel
                  </Link>
                </div>
                <div>
                  <span className="text-gray-500">For Enquiries: </span>
                  <Link href="mailto:travel@santos.travel" className="text-blue-600 hover:text-blue-800">
                    travel@santos.travel
                  </Link>
                </div>
              </div>
            </div>

            {/* Connect with us */}
            <div>
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Connect with us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Reviews, podcasts, blogs and more...
              </p>
              <div className="flex space-x-3">
                <Link href="#" className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full">
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link href="#" className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                  <Youtube className="h-4 w-4" />
                </Link>
                <Link href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full">
                  <Instagram className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Company Logo and Newsletter */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-400 text-black px-3 py-2 rounded font-bold text-lg">
                    SANTOS.TRAVEL
                  </div>
                </div>
                <p className="text-sm text-gray-300 italic">Travel. Explore. Celebrate Life</p>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">Keep travelling all year round!</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Subscribe to our newsletter to find travel inspiration in your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name*"
                    className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email ID*"
                    className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded text-sm"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-gray-700 rounded px-2 py-1">
                      <span className="text-sm">🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="flex-1 px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded text-sm"
                    />
                  </div>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Association Badges */}
              <div className="mt-6">
                <p className="text-gray-400 text-xs mb-3">Associated with</p>
                <div className="flex space-x-2">
                  <div className="bg-white px-2 py-1 rounded text-xs text-gray-800 font-semibold">IATA</div>
                  <div className="bg-white px-2 py-1 rounded text-xs text-gray-800 font-semibold">TAAI</div>
                  <div className="bg-red-600 px-2 py-1 rounded text-xs text-white font-semibold">DELTA</div>
                  <div className="bg-blue-600 px-2 py-1 rounded text-xs text-white font-semibold">TAFL</div>
                </div>
              </div>
            </div>

            {/* Discover us */}
            <div>
              <h4 className="text-white font-semibold mb-4">Discover us</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/reviews" className="hover:text-white">Guests Reviews</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/team" className="hover:text-white">Our Team</Link></li>
                <li><Link href="/tour-managers" className="hover:text-white">Tour Managers</Link></li>
                <li><Link href="/sales-partners" className="hover:text-white">Sales Partners</Link></li>
                <li><Link href="/become-partner" className="hover:text-white">Become A Sales Partner</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers We're Hiring!</Link></li>
                <li><Link href="/csr" className="hover:text-white">CSR Policy</Link></li>
                <li><Link href="/portfolio" className="hover:text-white">Create Your Travel Portfolio</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/feedback" className="hover:text-white">Leave Your Feedback</Link></li>
                <li><Link href="/how-to-book" className="hover:text-white">How To Book</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/travel-deals" className="hover:text-white">Travel Deals</Link></li>
                <li><Link href="/covid-notice" className="hover:text-white">COVID-19 Public Notice</Link></li>
                <li><Link href="/singapore-visa" className="hover:text-white">Singapore Visa</Link></li>
                <li><Link href="/annual-return" className="hover:text-white">Annual Return</Link></li>
                <li><Link href="/corporate-governance" className="hover:text-white">Corporate Governance</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/tour-status" className="hover:text-white">Tour Status</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/podcasts" className="hover:text-white">Podcasts</Link></li>
                <li><Link href="/video-blogs" className="hover:text-white">Video Blogs</Link></li>
                <li><Link href="/articles-veena" className="hover:text-white">Articles By Veena Patil</Link></li>
                <li><Link href="/articles-sunita" className="hover:text-white">Articles By Sunita Patil</Link></li>
                <li><Link href="/articles-neil" className="hover:text-white">Articles By Neil Patil</Link></li>
                <li><Link href="/travel-planners" className="hover:text-white">Travel Planners</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-900 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Disclaimer */}
          <div className="mb-4">
            <p className="text-xs leading-relaxed">
              <strong>*Caution: Beware of Fake Promotions or Offers</strong> *Please do not believe or engage with any promotional emails, SMS or Web-link which ask you to click on a link and fill in your details. All Santos.travel authorized email
              communications are delivered from domain @santos.travel or SMS from SANTOS or 741334. *Santos.travel bears no liability or responsibility whatsoever for any communication which is fraudulent or
              misleading in nature and not received from registered domain.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-xs mb-4 md:mb-0">
              <p>© 2013 - 25 Santos Patil Hospitality Pvt Ltd. All Rights Reserved.</p>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
              <Link href="/sitemap" className="hover:text-white">Site Map</Link>
            </div>

            <div className="text-xs">🔒 Payments on website are secure</div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg px-4 py-2 shadow-lg cursor-pointer text-sm font-semibold transition-colors">
          📞 Quick Enquiry
        </div>
      </div>
    </footer>
  );
};

export default Footer;
