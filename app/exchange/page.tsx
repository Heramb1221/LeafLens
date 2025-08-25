'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Search, Filter, Plus, MapPin, MessageCircle, Calendar, Heart, Share2, Bookmark, ArrowRight, Clock, Star } from 'lucide-react'
import Link from 'next/link'

const mockListings = [
  {
    id: 1,
    title: 'Monstera Deliciosa Cuttings',
    description: 'Healthy cuttings from my 3-year-old Monstera. Well-rooted and ready for potting.',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Monstera+Cuttings',
    location: 'Seattle, WA',
    user: {
      name: 'Alex Green',
      avatar: 'https://placehold.co/100/2F855A/FFFFFF/png?text=AG',
      rating: 4.8
    },
    postedDate: '2 days ago',
    type: 'Offering',
    exchangeFor: ['Pothos', 'Snake Plant', 'ZZ Plant'],
    likes: 12,
    comments: 5
  },
  {
    id: 2,
    title: 'Looking for Fiddle Leaf Fig',
    description: 'Searching for a healthy Fiddle Leaf Fig. Can exchange with my Pothos or Spider Plant.',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Wanted:+Fiddle+Leaf',
    location: 'Portland, OR',
    user: {
      name: 'Jamie Lee',
      avatar: 'https://placehold.co/100/2F855A/FFFFFF/png?text=JL',
      rating: 4.5
    },
    postedDate: '5 days ago',
    type: 'Wanted',
    exchangeFor: ['Pothos', 'Spider Plant'],
    likes: 8,
    comments: 3
  },
  {
    id: 3,
    title: 'Aloe Vera Pups for Exchange',
    description: 'Several Aloe Vera pups available for exchange. All healthy and ready for new homes.',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Aloe+Pups',
    location: 'San Francisco, CA',
    user: {
      name: 'Taylor Kim',
      avatar: 'https://placehold.co/100/2F855A/FFFFFF/png?text=TK',
      rating: 4.9
    },
    postedDate: '1 week ago',
    type: 'Offering',
    exchangeFor: ['Any indoor plants', 'Succulents', 'Herbs'],
    likes: 15,
    comments: 7
  },
  {
    id: 4,
    title: 'Snake Plant Division',
    description: 'Healthy Snake Plant division available. Perfect for beginners and low-light areas.',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Snake+Plant',
    location: 'Austin, TX',
    user: {
      name: 'Morgan Chen',
      avatar: 'https://placehold.co/100/2F855A/FFFFFF/png?text=MC',
      rating: 4.7
    },
    postedDate: '3 days ago',
    type: 'Offering',
    exchangeFor: ['Philodendron', 'Pothos', 'Air Plants'],
    likes: 10,
    comments: 4
  },
];

export default function ExchangePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  
  // Check for dark mode preference
  useState(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
  })
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
  }
  
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'All' || listing.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-gray-800'
    }`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-slate-900/90 border-emerald-800/50' 
          : 'bg-white/90 border-emerald-200/50'
      } border-b transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${
                isDarkMode ? 'bg-gradient-to-br from-emerald-400 to-teal-400' : 'bg-gradient-to-br from-emerald-500 to-teal-500'
              } flex items-center justify-center shadow-lg`}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-2xl font-bold bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-emerald-300 to-teal-300' 
                    : 'from-emerald-600 to-teal-600'
                } bg-clip-text text-transparent`}>
                  LeafLens
                </span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}>
                Home
              </Link>
              <Link href="/gallery" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}>
                Gallery
              </Link>
              <Link href="/encyclopedia" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}>
                Encyclopedia
              </Link>
              <Link href="/quiz" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}>
                Quiz
              </Link>
              <Link href="/exchange" className={`${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'} font-medium`}>
                Exchange
              </Link>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Plant Exchange Community
          </h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Connect with fellow plant enthusiasts to trade, share, and exchange plants and cuttings in your local area.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex-1 flex items-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl px-4 py-2`}>
              <Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
              <input
                type="text"
                placeholder="Search for plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-none focus:outline-none ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-gray-800 placeholder:text-gray-400'}`}
              />
            </div>
            
            <div className="flex gap-2">
              {['All', 'Offering', 'Wanted'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-xl transition-colors ${filterType === type
                    ? isDarkMode
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
                >
                  {type}
                </button>
              ))}
              
              <button className={`px-4 py-2 rounded-xl ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'} text-white flex items-center gap-2`}>
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">New Listing</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden shadow-lg`}
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${listing.type === 'Offering' ? 'bg-emerald-500' : 'bg-purple-500'} text-white`}>
                  {listing.type}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Heart className={`w-4 h-4 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} cursor-pointer`} />
                    <span className="text-xs text-gray-500">{listing.likes}</span>
                  </div>
                </div>
                
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {listing.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {listing.location}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {listing.postedDate}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Exchange for:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {listing.exchangeFor.map((item, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}">
                  <div className="flex items-center gap-2">
                    <img
                      src={listing.user.avatar}
                      alt={listing.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {listing.user.name}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-500 ml-1">{listing.user.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className={`px-3 py-1 rounded-lg ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'} text-white text-xs font-medium flex items-center gap-1`}>
                    Contact <MessageCircle className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}