'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Phone, ChevronDown, User, MapPin, Calendar, Globe, Users, Briefcase, Gift, Clock, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    setActiveMenu(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    // Handle escape key to close menu
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && activeMenu) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuRef, activeMenu]);

  // Navigation items with dropdown contents
  const navigationItems = [
    {
      name: 'India',
      href: '/india',
      hasDropdown: true,
      dropdownContent: {
        zones: [
          { name: 'North India', href: '/india/north' },
          { name: 'South India', href: '/india/south' },
          { name: 'East & North East India', href: '/india/east' },
          { name: 'West & Central India', href: '/india/west' },
        ],
        states: [
          { name: 'Rajasthan', tours: 52, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=120&fit=crop', href: '/india/rajasthan' },
          { name: 'Kerala', tours: 37, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&h=120&fit=crop', href: '/india/kerala' },
          { name: 'Himachal Pradesh', tours: 39, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop', href: '/india/himachal-pradesh' },
          { name: 'Uttarakhand', tours: 25, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=120&fit=crop', href: '/india/uttarakhand' },
          { name: 'Leh Ladakh', tours: 15, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=200&h=120&fit=crop', href: '/india/leh-ladakh' },
          { name: 'Jammu And Kashmir', tours: 15, image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=200&h=120&fit=crop', href: '/india/jammu-kashmir' },
          { name: 'Meghalaya', tours: 17, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=120&fit=crop', href: '/india/meghalaya' },
          { name: 'Karnataka', tours: 15, image: 'https://images.unsplash.com/photo-1618947882596-ff4834e35ab4?w=200&h=120&fit=crop', href: '/india/karnataka' },
          { name: 'Goa', tours: 8, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&h=120&fit=crop', href: '/india/goa' },
        ],
        interests: [
          { name: "Seniors' Special", href: '/india/seniors-special' },
          { name: "Women's Special", href: '/india/womens-special' },
          { name: "Honeymoon Special", href: '/india/honeymoon' },
        ],
        seasons: [
          { name: "Nov to Feb", href: '/india/winter' },
          { name: "Jul to Oct", href: '/india/monsoon' },
          { name: "Mar to Jun", href: '/india/summer' },
        ],
        durations: [
          { name: "More than 14 days", href: '/india/duration/long' },
          { name: "10 to 14 days", href: '/india/duration/medium' },
          { name: "6 to 9 days", href: '/india/duration/short' },
          { name: "Less than 5 days", href: '/india/duration/weekend' },
        ]
      }
    },
    {
      name: 'World',
      href: '/world',
      hasDropdown: true,
      dropdownContent: {
        continents: [
          { name: 'Europe', href: '/world/europe' },
          { name: 'Asia', href: '/world/asia' },
          { name: 'Africa', href: '/world/africa' },
          { name: 'North America', href: '/world/north-america' },
          { name: 'South America', href: '/world/south-america' },
          { name: 'Australia & Oceania', href: '/world/australia-oceania' },
          { name: 'Antarctica', href: '/world/antarctica' },
        ],
        countries: [
          { name: 'Switzerland', tours: 45, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop', href: '/world/switzerland' },
          { name: 'Japan', tours: 20, image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=200&h=120&fit=crop', href: '/world/japan' },
          { name: 'Thailand', tours: 32, image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=200&h=120&fit=crop', href: '/world/thailand' },
          { name: 'USA', tours: 25, image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=120&fit=crop', href: '/world/usa' },
          { name: 'Australia', tours: 18, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop', href: '/world/australia' },
          { name: 'Egypt', tours: 12, image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d44370?w=200&h=120&fit=crop', href: '/world/egypt' },
        ],
        durations: [
          { name: "More than 14 days", href: '/world/duration/long' },
          { name: "10 to 14 days", href: '/world/duration/medium' },
          { name: "6 to 9 days", href: '/world/duration/short' },
          { name: "Less than 5 days", href: '/world/duration/weekend' },
        ]
      }
    },
    {
      name: 'Speciality Tours',
      href: '/speciality-tours',
      hasDropdown: true,
      dropdownContent: {
        categories: [
          {
            name: "Seniors' Special",
            icon: <Clock className="w-5 h-5 mr-2" />,
            href: '/speciality-tours/seniors'
          },
          {
            name: "Women's Special",
            icon: <Users className="w-5 h-5 mr-2" />,
            href: '/speciality-tours/women'
          },
          {
            name: "Adventure Tours",
            icon: <MapPin className="w-5 h-5 mr-2" />,
            href: '/speciality-tours/adventure'
          },
          {
            name: "Cruise Holidays",
            icon: <Globe className="w-5 h-5 mr-2" />,
            href: '/speciality-tours/cruise'
          },
          {
            name: "Wellness Retreats",
            icon: <Users className="w-5 h-5 mr-2" />,
            href: '/speciality-tours/wellness'
          },
          {
            name: "Festival Tours",
            icon: <Calendar className="w-5 h-5 mr-2" />,
            href: '/speciality-tours/festival'
          },
        ]
      }
    },
    {
      name: 'Customized Holidays',
      href: '/customized-holidays',
      hasDropdown: true,
      dropdownContent: {
        categories: [
          {
            name: "Family Holidays",
            icon: <Users className="w-5 h-5 mr-2" />,
            href: '/customized-holidays/family'
          },
          {
            name: "Honeymoon Packages",
            icon: <Gift className="w-5 h-5 mr-2" />,
            href: '/customized-holidays/honeymoon'
          },
          {
            name: "Group Holidays",
            icon: <Users className="w-5 h-5 mr-2" />,
            href: '/customized-holidays/group'
          },
          {
            name: "Solo Traveler",
            icon: <User className="w-5 h-5 mr-2" />,
            href: '/customized-holidays/solo'
          },
        ]
      }
    },
    {
      name: 'Corporate Travel',
      href: '/corporate-travel',
      hasDropdown: true,
      dropdownContent: {
        categories: [
          {
            name: "MICE",
            icon: <Briefcase className="w-5 h-5 mr-2" />,
            href: '/corporate-travel/mice'
          },
          {
            name: "Team Outings",
            icon: <Users className="w-5 h-5 mr-2" />,
            href: '/corporate-travel/team-outings'
          },
          {
            name: "Corporate Retreats",
            icon: <Briefcase className="w-5 h-5 mr-2" />,
            href: '/corporate-travel/retreats'
          },
        ]
      }
    },
    { name: 'All Packages', href: '/packages', hasDropdown: false },
    { name: 'Inbound', href: '/inbound', hasDropdown: false },
    { name: 'Forex', href: '/forex', hasDropdown: false },
    { name: 'Gift a Tour', href: '/gift-a-tour', hasDropdown: false },
    { name: 'Contact Us', href: '/contact', hasDropdown: false },
  ];

  const handleMenuToggle = (itemName: string) => {
    // Toggle menu when clicked
    setActiveMenu(prevMenu => prevMenu === itemName ? null : itemName);
  };

  return (
    <header className="bg-slate-900 shadow-md relative" ref={menuRef}>
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/santos-logo.png"
                alt="Santos.travel"
                className="h-12 w-auto max-w-none"
                style={{ height: '48px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search &quot;Eiffel Tower&quot;"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 p-1">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Travel Planner */}
            <Link
              href="/travel-planner"
              className="hidden md:inline-block text-yellow-400 font-medium hover:text-yellow-300 transition-colors"
            >
              Travel Planner 2025
            </Link>

            {/* Phone */}
            <div className="hidden md:flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">1800 22 7979</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-white text-sm">
                  Welcome, {user?.name}
                </span>
                {isAdmin && (
                  <Link href="/admin/dashboard" className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/signin" className="flex items-center text-white hover:text-yellow-400 transition-colors">
                  <User className="h-5 w-5 mr-1" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signin?mode=signup"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white hover:text-yellow-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center justify-between border-t border-gray-700 mt-2">
          {navigationItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
            >
              {item.hasDropdown ? (
                <button
                  onClick={() => handleMenuToggle(item.name)}
                  className={`flex items-center text-white hover:text-yellow-400 font-medium transition-colors px-3 py-3 ${activeMenu === item.name ? 'text-yellow-400 bg-slate-800' : ''}`}
                  aria-expanded={activeMenu === item.name}
                  aria-controls={`menu-${item.name}`}
                  type="button"
                >
                  {item.name}
                  <ChevronDown className={`h-4 w-4 ml-1 opacity-70 transition-transform ${activeMenu === item.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center text-white hover:text-yellow-400 font-medium transition-colors px-3 py-3"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mega Menu Dropdowns */}
      {activeMenu && (
        <div
          id={`menu-${activeMenu}`}
          className="absolute top-full left-0 w-full bg-white shadow-xl border-t-4 border-yellow-500"
          style={{ display: 'block', zIndex: 9999 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeMenu === 'India' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Column 1: By Zone */}
                <div>
                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Tour Packages By Zone</h3>
                  <ul className="space-y-2">
                    {navigationItems[0].dropdownContent?.zones?.map((zone) => (
                      <li key={zone.name}>
                        <Link href={zone.href} className="text-gray-700 hover:text-yellow-600 block py-1">
                          {zone.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: By State */}
                <div className="col-span-2">
                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Tour Packages By State</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {navigationItems[0].dropdownContent?.states?.slice(0, 9).map((state) => (
                      <Link key={state.name} href={state.href} className="group">
                        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition duration-300 overflow-hidden">
                          <div className="relative h-24">
                            <Image
                              src={state.image}
                              alt={state.name}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=120&fit=crop';
                              }}
                            />
                          </div>
                          <div className="p-3">
                            <div className="font-medium text-gray-900 group-hover:text-yellow-600 text-sm">{state.name}</div>
                            <div className="text-xs text-gray-500">{state.tours} tours</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: By Interest & Season & Duration */}
                <div>
                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Tour Packages By Interest</h3>
                  <ul className="space-y-2 mb-4">
                    {navigationItems[0].dropdownContent?.interests?.map((interest) => (
                      <li key={interest.name}>
                        <Link href={interest.href} className="text-gray-700 hover:text-yellow-600 block py-1">
                          {interest.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Tour Packages By Season</h3>
                  <ul className="space-y-2 mb-4">
                    {navigationItems[0].dropdownContent?.seasons?.map((season) => (
                      <li key={season.name}>
                        <Link href={season.href} className="text-gray-700 hover:text-yellow-600 block py-1">
                          {season.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Tour Packages By Duration</h3>
                  <ul className="space-y-2">
                    {navigationItems[0].dropdownContent?.durations?.map((duration) => (
                      <li key={duration.name}>
                        <Link href={duration.href} className="text-gray-700 hover:text-yellow-600 block py-1">
                          {duration.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeMenu === 'World' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Column 1: By Continent */}
                <div>
                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Tour Packages By Continent</h3>
                  <ul className="space-y-2">
                    {navigationItems[1].dropdownContent?.continents?.map((continent) => (
                      <li key={continent.name}>
                        <Link href={continent.href} className="text-gray-700 hover:text-yellow-600 block py-1">
                          {continent.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-gray-900 font-bold mb-3 mt-6 text-lg border-b pb-2">Tour Packages By Duration</h3>
                  <ul className="space-y-2">
                    {navigationItems[1].dropdownContent?.durations?.map((duration) => (
                      <li key={duration.name}>
                        <Link href={duration.href} className="text-gray-700 hover:text-yellow-600 block py-1">
                          {duration.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2-4: Countries */}
                <div className="col-span-3">
                  <h3 className="text-gray-900 font-bold mb-3 text-lg border-b pb-2">Popular Countries</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {navigationItems[1].dropdownContent?.countries?.map((country) => (
                      <Link key={country.name} href={country.href} className="group">
                        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition duration-300 overflow-hidden">
                          <div className="relative h-24">
                            <Image
                              src={country.image}
                              alt={country.name}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=200&h=120&fit=crop';
                              }}
                            />
                          </div>
                          <div className="p-3">
                            <div className="font-medium text-gray-900 group-hover:text-yellow-600 text-sm">{country.name}</div>
                            <div className="text-xs text-gray-500">{country.tours} tours</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link href="/world/all-countries" className="inline-flex items-center text-yellow-600 hover:text-yellow-800">
                      Show all destinations
                      <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === 'Speciality Tours' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {navigationItems[2].dropdownContent?.categories?.map((category) => (
                  <Link key={category.name} href={category.href} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                    {category.icon}
                    <span className="text-gray-800 font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {activeMenu === 'Customized Holidays' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {navigationItems[3].dropdownContent?.categories?.map((category) => (
                  <Link key={category.name} href={category.href} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                    {category.icon}
                    <span className="text-gray-800 font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {activeMenu === 'Corporate Travel' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {navigationItems[4].dropdownContent?.categories?.map((category) => (
                  <Link key={category.name} href={category.href} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                    {category.icon}
                    <span className="text-gray-800 font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-700 bg-slate-900">
          <nav className="py-4 space-y-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div className="flex items-center justify-between px-4 py-2 text-white hover:text-yellow-400 hover:bg-slate-800 rounded">
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 opacity-70 transition-transform ${activeMenu === item.name ? 'rotate-180' : ''}`}
                      onClick={() => handleMenuToggle(item.name)}
                    />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-2 text-white hover:text-yellow-400 hover:bg-slate-800 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Mobile dropdown for each item */}
                {item.hasDropdown && activeMenu === item.name && (
                  <div className="pl-6 mt-1 space-y-1">
                    {item.name === 'India' && (
                      <>
                        <div className="py-1">
                          <div className="text-yellow-400 font-medium py-1">Tour Packages By Zone</div>
                          {navigationItems[0].dropdownContent?.zones?.map((zone) => (
                            <Link
                              key={zone.name}
                              href={zone.href}
                              className="block py-1 text-gray-300 hover:text-yellow-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {zone.name}
                            </Link>
                          ))}
                        </div>
                        <div className="py-1">
                          <div className="text-yellow-400 font-medium py-1">Popular States</div>
                          {navigationItems[0].dropdownContent?.states?.slice(0, 5).map((state) => (
                            <Link
                              key={state.name}
                              href={state.href}
                              className="block py-1 text-gray-300 hover:text-yellow-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {state.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {item.name === 'World' && (
                      <>
                        <div className="py-1">
                          <div className="text-yellow-400 font-medium py-1">Tour Packages By Continent</div>
                          {navigationItems[1].dropdownContent?.continents?.map((continent) => (
                            <Link
                              key={continent.name}
                              href={continent.href}
                              className="block py-1 text-gray-300 hover:text-yellow-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {continent.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {item.name === 'Speciality Tours' && (
                      <div className="py-1">
                        {navigationItems[2].dropdownContent?.categories?.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center py-1 text-gray-300 hover:text-yellow-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {item.name === 'Customized Holidays' && (
                      <div className="py-1">
                        {navigationItems[3].dropdownContent?.categories?.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center py-1 text-gray-300 hover:text-yellow-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {item.name === 'Corporate Travel' && (
                      <div className="py-1">
                        {navigationItems[4].dropdownContent?.categories?.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center py-1 text-gray-300 hover:text-yellow-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile search */}
            <div className="px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Mobile Authentication */}
            <div className="px-4 py-3 border-t border-gray-700">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-gray-300">
                    Welcome, <span className="text-yellow-400">{user?.name}</span>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center text-yellow-400 hover:text-yellow-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-300 hover:text-yellow-400"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/signin"
                    className="flex items-center text-gray-300 hover:text-yellow-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/signin?mode=signup"
                    className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile-only links */}
            <div className="px-4 py-2 flex justify-between border-t border-gray-700">
              <Link href="/travel-planner" className="text-yellow-400 font-medium">Travel Planner 2025</Link>
              <Link href="tel:18002279791" className="text-blue-400 font-medium">1800 22 7979</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
