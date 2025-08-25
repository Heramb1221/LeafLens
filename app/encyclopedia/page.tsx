'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Search, Filter, MapPin, Heart, Shield, Sun, Droplets } from 'lucide-react'
import Link from 'next/link'

const plantCategories = [
  { id: 'flowering', name: 'Flowering Plants', count: 120 },
  { id: 'succulents', name: 'Succulents & Cacti', count: 85 },
  { id: 'trees', name: 'Trees & Shrubs', count: 95 },
  { id: 'ferns', name: 'Ferns & Allies', count: 40 },
  { id: 'aquatic', name: 'Aquatic Plants', count: 30 },
  { id: 'grasses', name: 'Grasses & Bamboos', count: 45 },
  { id: 'climbers', name: 'Climbers & Vines', count: 35 },
  { id: 'herbs', name: 'Herbs & Spices', count: 75 },
];

const regions = [
  { id: 'tropical', name: 'Tropical', count: 150 },
  { id: 'mediterranean', name: 'Mediterranean', count: 80 },
  { id: 'temperate', name: 'Temperate', count: 120 },
  { id: 'desert', name: 'Desert', count: 60 },
  { id: 'alpine', name: 'Alpine', count: 40 },
  { id: 'coastal', name: 'Coastal', count: 70 },
];

const medicinalUses = [
  { id: 'digestive', name: 'Digestive Health', count: 45 },
  { id: 'respiratory', name: 'Respiratory System', count: 35 },
  { id: 'skin', name: 'Skin Conditions', count: 50 },
  { id: 'immune', name: 'Immune Support', count: 40 },
  { id: 'pain', name: 'Pain Relief', count: 30 },
  { id: 'stress', name: 'Stress & Anxiety', count: 25 },
];

const featuredPlants = [
  {
    id: 1,
    name: 'Aloe Vera',
    scientificName: 'Aloe vera',
    category: 'succulents',
    region: 'desert',
    medicinalUse: 'skin',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Aloe+Vera',
    description: 'A succulent plant species with thick, fleshy leaves that contain a gel-like substance used for medicinal purposes, particularly for skin conditions.'
  },
  {
    id: 2,
    name: 'Lavender',
    scientificName: 'Lavandula',
    category: 'flowering',
    region: 'mediterranean',
    medicinalUse: 'stress',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Lavender',
    description: 'An aromatic flowering plant in the mint family, known for its calming properties and used to reduce stress and anxiety.'
  },
  {
    id: 3,
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'herbs',
    region: 'tropical',
    medicinalUse: 'digestive',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Ginger',
    description: 'A flowering plant whose rhizome (underground stem) is widely used as a spice and folk medicine, particularly for digestive issues.'
  },
  {
    id: 4,
    name: 'Eucalyptus',
    scientificName: 'Eucalyptus globulus',
    category: 'trees',
    region: 'temperate',
    medicinalUse: 'respiratory',
    image: 'https://placehold.co/600x400/2F855A/FFFFFF/png?text=Eucalyptus',
    description: 'A fast-growing evergreen tree native to Australia. Its oil is used for respiratory conditions and as a natural insecticide.'
  },
];

export default function EncyclopediaPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('category');
  
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
              <Link href="/gallery" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'}`}>
                Gallery
              </Link>
              <Link href="/encyclopedia" className={`${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'} font-medium`}>
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
            Plant Encyclopedia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Explore plants by category, region, or medicinal use
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className={`flex items-center px-6 py-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg max-w-2xl mx-auto`}>
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search plants by name or scientific name..."
                className={`w-full bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <button
                onClick={() => setActiveFilter('category')}
                className={`px-6 py-2 rounded-lg font-medium ${activeFilter === 'category' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') : ''}`}
              >
                By Category
              </button>
              <button
                onClick={() => setActiveFilter('region')}
                className={`px-6 py-2 rounded-lg font-medium ${activeFilter === 'region' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') : ''}`}
              >
                By Region
              </button>
              <button
                onClick={() => setActiveFilter('medicinal')}
                className={`px-6 py-2 rounded-lg font-medium ${activeFilter === 'medicinal' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white') : ''}`}
              >
                By Medicinal Use
              </button>
            </div>
          </motion.div>
          
          {/* Filter Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            {activeFilter === 'category' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {plantCategories.map(category => (
                  <div 
                    key={category.id}
                    className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors cursor-pointer`}
                  >
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{category.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{category.count} plants</p>
                  </div>
                ))}
              </div>
            )}
            
            {activeFilter === 'region' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {regions.map(region => (
                  <div 
                    key={region.id}
                    className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors cursor-pointer flex items-center gap-3`}
                  >
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{region.name}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{region.count} plants</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeFilter === 'medicinal' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {medicinalUses.map(use => (
                  <div 
                    key={use.id}
                    className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors cursor-pointer flex items-center gap-3`}
                  >
                    <Heart className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{use.name}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{use.count} plants</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Featured Plants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Featured Plants</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPlants.map(plant => (
                <div 
                  key={plant.id}
                  className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {plant.name}
                    </h3>
                    <p className={`italic text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {plant.scientificName}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                        {plantCategories.find(c => c.id === plant.category)?.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                        {regions.find(r => r.id === plant.region)?.name}
                      </span>
                    </div>
                    <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {plant.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}