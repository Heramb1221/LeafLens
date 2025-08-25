'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Star, Clock, TrendingUp, Heart, Filter, Search, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

const mockGalleryItems = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Monstera',
    likes: 42,
    rating: 4.8,
    date: '2023-05-15',
    user: 'plantlover22'
  },
  {
    id: 2,
    name: 'Snake Plant',
    scientificName: 'Dracaena trifasciata',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Snake+Plant',
    likes: 36,
    rating: 4.5,
    date: '2023-05-20',
    user: 'greenthumb'
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Fiddle+Leaf',
    likes: 28,
    rating: 4.2,
    date: '2023-05-25',
    user: 'plantparent'
  },
  {
    id: 4,
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Peace+Lily',
    likes: 31,
    rating: 4.6,
    date: '2023-06-01',
    user: 'botanist101'
  },
  {
    id: 5,
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Pothos',
    likes: 25,
    rating: 4.3,
    date: '2023-06-05',
    user: 'indoorjungle'
  },
  {
    id: 6,
    name: 'Aloe Vera',
    scientificName: 'Aloe vera',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Aloe+Vera',
    likes: 39,
    rating: 4.7,
    date: '2023-06-10',
    user: 'succulentfan'
  }
];

export default function GalleryPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mockGalleryItems
    .filter(item => {
      if (!searchQuery) return true;
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'likes') return b.likes - a.likes;
      return 0;
    });

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-gray-800'
    }`}>
      {/* Navigation */}
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
            
            <div className="flex items-center gap-4">
              <Link href="/" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'}`}>
                Home
              </Link>
              <Link href="/gallery" className={`${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'} font-medium`}>
                Gallery
              </Link>
              <Link href="/encyclopedia" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'}`}>
                Encyclopedia
              </Link>
              <Link href="/quiz" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'}`}>
                Quiz
              </Link>
              <Link href="/exchange" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'}`}>
                Exchange
              </Link>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDarkMode ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Plant Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Explore beautiful plants shared by our community
          </motion.p>
          
          {/* Filters and Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <div className="flex-1">
              <div className={`flex items-center px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-white'} border ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search plants..."
                  className={`w-full bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('rating')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${sortBy === 'rating' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') : (isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-white text-gray-700')}`}
              >
                <Star className="w-4 h-4" />
                Top Rated
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${sortBy === 'recent' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') : (isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-white text-gray-700')}`}
              >
                <Clock className="w-4 h-4" />
                Recent
              </button>
              <button
                onClick={() => setSortBy('likes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${sortBy === 'likes' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') : (isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-white text-gray-700')}`}
              >
                <Heart className="w-4 h-4" />
                Most Liked
              </button>
            </div>
          </motion.div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.name}
                  </h3>
                  <p className={`italic mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.scientificName}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{item.likes}</span>
                      </div>
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      by {item.user}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}