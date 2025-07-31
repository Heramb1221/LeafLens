'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Search,ChevronDown, X, Sun, Droplets, MapPin, 
  Leaf, Sparkles, Heart, Bookmark, Eye, ArrowRight, Grid,
  List, Star, Award, Camera,
  Menu, Moon, BookOpen, Users,  Globe, Info, Share2
} from 'lucide-react'

// Mock plant data
const mockPlants = [
  {
    id: '1',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    family: 'Moraceae',
    description: 'The Fiddle Leaf Fig is a popular indoor plant known for its large, violin-shaped leaves and dramatic appearance. Native to western Africa, it has become a staple in modern interior design due to its sculptural quality and ability to make a bold statement in any room.',
    care: {
      sunlight: 'Bright Indirect Light',
      water: 'Medium',
      temperature: '65-75°F (18-24°C)',
      humidity: '30-65%'
    },
    nativeRegion: 'Western Africa',
    uses: ['Indoor Decoration', 'Air Purification', 'Statement Plant'],
    funFacts: [
      'Can grow up to 50 feet tall in its natural habitat',
      'The leaves can grow up to 18 inches long',
      'It\'s actually a type of fig tree, though it rarely produces fruit indoors'
    ],
    image: '',
    popularity: 95,
    difficulty: 'Moderate',
    category: 'Indoor'
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae',
    description: 'Known as the Swiss Cheese Plant, Monstera deliciosa is beloved for its distinctive split leaves with natural holes called fenestrations. This tropical climbing plant is native to Central America and has become one of the most Instagram-worthy houseplants.',
    care: {
      sunlight: 'Bright Indirect Light',
      water: 'Medium',
      temperature: '65-80°F (18-27°C)',
      humidity: '40-60%'
    },
    nativeRegion: 'Central America',
    uses: ['Indoor Decoration', 'Air Purification', 'Living Wall'],
    funFacts: [
      'Young plants don\'t have fenestrations - they develop as the plant matures',
      'Can produce edible fruit in its natural habitat',
      'The name "deliciosa" refers to the fruit, not the leaves'
    ],
    image: '',
    popularity: 92,
    difficulty: 'Easy',
    category: 'Indoor'
  },
  {
    id: '3',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    family: 'Asparagaceae',
    description: 'The Snake Plant, also known as Mother-in-Law\'s Tongue, is one of the most resilient houseplants. Its upright, sword-like leaves with yellow edges make it an architectural addition to any space, while its low-maintenance nature makes it perfect for beginners.',
    care: {
      sunlight: 'Low to Bright Light',
      water: 'Low',
      temperature: '60-80°F (15-27°C)',
      humidity: '30-50%'
    },
    nativeRegion: 'West Africa',
    uses: ['Indoor Decoration', 'Air Purification', 'Low Light Areas'],
    funFacts: [
      'Can survive in very low light conditions',
      'Releases oxygen at night, making it great for bedrooms',
      'Can go weeks without water'
    ],
    image: '',
    popularity: 88,
    difficulty: 'Very Easy',
    category: 'Indoor'
  },
  {
    id: '4',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    family: 'Araceae',
    description: 'The Peace Lily is an elegant houseplant known for its glossy green leaves and distinctive white blooms. Native to tropical regions of the Americas and southeastern Asia, it\'s prized for both its beauty and air-purifying qualities.',
    care: {
      sunlight: 'Low to Medium Light',
      water: 'Medium to High',
      temperature: '65-80°F (18-27°C)',
      humidity: '40-60%'
    },
    nativeRegion: 'Central America, Southeast Asia',
    uses: ['Indoor Decoration', 'Air Purification', 'Low Light Areas'],
    funFacts: [
      'The white "flowers" are actually modified leaves called spathes',
      'Can bloom multiple times per year with proper care',
      'Drooping leaves indicate it needs water'
    ],
    image: '',
    popularity: 85,
    difficulty: 'Easy',
    category: 'Indoor'
  },
  {
    id: '5',
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    family: 'Moraceae',
    description: 'The Rubber Plant is a classic houseplant with thick, glossy leaves that can range from deep green to burgundy. Originally from India, this robust plant can grow into an impressive indoor tree with proper care.',
    care: {
      sunlight: 'Bright Indirect Light',
      water: 'Medium',
      temperature: '60-75°F (15-24°C)',
      humidity: '40-50%'
    },
    nativeRegion: 'India, Southeast Asia',
    uses: ['Indoor Decoration', 'Air Purification', 'Statement Plant'],
    funFacts: [
      'Was once a major source of natural rubber',
      'Can grow up to 8 feet tall indoors',
      'The milky sap can be irritating to skin'
    ],
    image: '',
    popularity: 82,
    difficulty: 'Easy',
    category: 'Indoor'
  },
  {
    id: '6',
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    family: 'Araceae',
    description: 'Golden Pothos is one of the most popular trailing houseplants, known for its heart-shaped leaves with golden variegation. This fast-growing vine is incredibly forgiving and can thrive in various lighting conditions.',
    care: {
      sunlight: 'Low to Bright Light',
      water: 'Low to Medium',
      temperature: '60-80°F (15-27°C)',
      humidity: '30-60%'
    },
    nativeRegion: 'Southeast Asia',
    uses: ['Hanging Baskets', 'Trailing Plant', 'Air Purification'],
    funFacts: [
      'Can grow in water indefinitely',
      'Leaves lose variegation in low light',
      'One of the best plants for beginners'
    ],
    image: '',
    popularity: 90,
    difficulty: 'Very Easy',
    category: 'Indoor'
  },
  {
    id: '7',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    family: 'Asphodelaceae',
    description: 'Aloe Vera is a succulent plant known for its medicinal properties and thick, fleshy leaves. Native to the Arabian Peninsula, it has been cultivated worldwide for its healing gel and low-maintenance care requirements.',
    care: {
      sunlight: 'Bright Direct Light',
      water: 'Low',
      temperature: '60-75°F (15-24°C)',
      humidity: '10-30%'
    },
    nativeRegion: 'Arabian Peninsula',
    uses: ['Medicinal', 'Skincare', 'Drought-tolerant Landscaping'],
    funFacts: [
      'Gel inside leaves can soothe burns and cuts',
      'Can survive without water for months',
      'Produces yellow flowers on tall spikes'
    ],
    image: '',
    popularity: 87,
    difficulty: 'Very Easy',
    category: 'Succulent'
  },
  {
    id: '8',
    name: 'Jade Plant',
    scientificName: 'Crassula ovata',
    family: 'Crassulaceae',
    description: 'The Jade Plant is a popular succulent with thick, oval-shaped leaves and a tree-like appearance. Native to South Africa, it\'s often called the "money tree" and is believed to bring good luck and prosperity.',
    care: {
      sunlight: 'Bright Direct Light',
      water: 'Low',
      temperature: '65-75°F (18-24°C)',
      humidity: '30-50%'
    },
    nativeRegion: 'South Africa',
    uses: ['Indoor Decoration', 'Bonsai', 'Good Luck Charm'],
    funFacts: [
      'Can live for decades with proper care',
      'Produces small white or pink flowers',
      'Symbol of friendship in many cultures'
    ],
    image: '',
    popularity: 80,
    difficulty: 'Easy',
    category: 'Succulent'
  }
]

const families = ['All Families', 'Moraceae', 'Araceae', 'Asparagaceae', 'Asphodelaceae', 'Crassulaceae']
const regions = ['All Regions', 'Western Africa', 'Central America', 'West Africa', 'Southeast Asia', 'India', 'Arabian Peninsula', 'South Africa']
const sunlightOptions = ['All Light Levels', 'Low to Bright Light', 'Bright Indirect Light', 'Bright Direct Light', 'Low to Medium Light']
const waterOptions = ['All Water Levels', 'Low', 'Low to Medium', 'Medium', 'Medium to High', 'High']

interface Plant {
  id: string
  name: string
  scientificName: string
  family: string
  description: string
  care: {
    sunlight: string
    water: string
    temperature: string
    humidity: string
  }
  nativeRegion: string
  uses: string[]
  funFacts: string[]
  image: string
  popularity: number
  difficulty: string
  category: string
}

export default function PlantGuidePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFamily, setSelectedFamily] = useState('All Families')
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [selectedSunlight, setSelectedSunlight] = useState('All Light Levels')
  const [selectedWater, setSelectedWater] = useState('All Water Levels')
  const [sortBy, setSortBy] = useState<'alphabetical' | 'popularity' | 'difficulty'>('alphabetical')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Filter and sort plants
  const filteredAndSortedPlants = useMemo(() => {
    let filtered = mockPlants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFamily = selectedFamily === 'All Families' || plant.family === selectedFamily
      const matchesRegion = selectedRegion === 'All Regions' || plant.nativeRegion.includes(selectedRegion.replace('All Regions', ''))
      const matchesSunlight = selectedSunlight === 'All Light Levels' || plant.care.sunlight === selectedSunlight
      const matchesWater = selectedWater === 'All Water Levels' || plant.care.water === selectedWater

      return matchesSearch && matchesFamily && matchesRegion && matchesSunlight && matchesWater
    })

    // Sort plants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity
        case 'difficulty':
          const difficultyOrder = { 'Very Easy': 1, 'Easy': 2, 'Moderate': 3, 'Hard': 4 }
          return (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 5) - 
                 (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 5)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedFamily, selectedRegion, selectedSunlight, selectedWater, sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const getSunlightIcon = (sunlight: string) => {
    if (sunlight.includes('Direct')) return { icon: Sun, color: 'text-yellow-500' }
    if (sunlight.includes('Indirect')) return { icon: Sun, color: 'text-orange-400' }
    return { icon: Sun, color: 'text-gray-400' }
  }

  const getWaterIcon = (water: string) => {
    if (water.includes('High')) return { icon: Droplets, color: 'text-blue-600' }
    if (water.includes('Medium')) return { icon: Droplets, color: 'text-blue-400' }
    return { icon: Droplets, color: 'text-blue-300' }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50'
    }`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 backdrop-blur-xl ${
          isDarkMode 
            ? 'bg-slate-900/90 border-emerald-800/50' 
            : 'bg-white/90 border-emerald-200/50'
        } border-b transition-colors duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className={`w-10 h-10 rounded-xl ${
                  isDarkMode ? 'bg-gradient-to-br from-emerald-400 to-teal-400' : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                } flex items-center justify-center shadow-lg`}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-2 h-2 text-yellow-800" />
                </motion.div>
              </motion.div>
              <div>
                <span className={`text-2xl font-bold bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-emerald-300 to-teal-300' 
                    : 'from-emerald-600 to-teal-600'
                } bg-clip-text text-transparent`}>
                  LeafLens
                </span>
                <div className={`text-xs ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'} font-medium`}>
                  Plant Guide
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Home', href: '/' },
                { label: 'Scanner', href: '/' },
                { label: 'Guide', href: '/guide' },
                { label: 'Community', href: '/community' }
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`${
                    isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'
                  } transition-colors font-medium relative group ${
                    item.href === '/guide' ? 'text-emerald-500' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                } hover:scale-110 transition-all duration-300`}
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              <motion.button
                className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden border-t ${
                  isDarkMode ? 'border-slate-700 bg-slate-900/95' : 'border-emerald-100 bg-white/95'
                } backdrop-blur-xl`}
              >
                <div className="py-4 space-y-3">
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Scanner', href: '/' },
                    { label: 'Guide', href: '/guide' },
                    { label: 'Community', href: '/community' }
                  ].map((item) => (
                    <a 
                      key={item.label}
                      href={item.href} 
                      className={`block px-4 py-3 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-emerald-300 hover:bg-slate-800' 
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      } transition-colors rounded-lg mx-2 ${
                        item.href === '/guide' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : ''
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-32 h-32 ${
                isDarkMode ? 'text-emerald-800/10' : 'text-emerald-200/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Leaf className="w-full h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="pt-16 pb-12 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="text-center mb-12"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-400 to-green-400 rounded-2xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
                
                <div className="text-left">
                  <motion.h1 
                    variants={itemVariants}
                    className={`text-6xl md:text-7xl font-black ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300' 
                        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600'
                    } bg-clip-text text-transparent leading-none`}
                  >
                    Plant Guide
                  </motion.h1>
                  <motion.div
                    variants={itemVariants}
                    className={`text-xl font-semibold ${
                      isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                    } mt-2`}
                  >
                    Explore 50,000+ Species
                  </motion.div>
                </div>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className={`text-xl md:text-2xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                } mb-6 font-light leading-relaxed max-w-4xl mx-auto`}
              >
                Discover comprehensive plant information powered by AI insights
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className={`text-lg ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } leading-relaxed max-w-3xl mx-auto mb-8`}
              >
                Browse our extensive database of plant species with detailed care instructions, 
                native habitat information, and expert growing tips for successful cultivation.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${
              isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
            } backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
              isDarkMode ? 'border-slate-700' : 'border-emerald-200'
            }`}
          >
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search plants by name or scientific name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg`}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Family Filter */}
                <div className="relative">
                  <select
                    value={selectedFamily}
                    onChange={(e) => setSelectedFamily(e.target.value)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer`}
                  >
                    {families.map(family => (
                      <option key={family} value={family}>{family}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* Region Filter */}
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer`}
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* Sunlight Filter */}
                <div className="relative">
                  <select
                    value={selectedSunlight}
                    onChange={(e) => setSelectedSunlight(e.target.value)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer`}
                  >
                    {sunlightOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* Water Filter */}
                <div className="relative">
                  <select
                    value={selectedWater}
                    onChange={(e) => setSelectedWater(e.target.value)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer`}
                  >
                    {waterOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`appearance-none px-4 py-2 pr-8 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer`}
                  >
                    <option value="alphabetical">A-Z</option>
                    <option value="popularity">Popularity</option>
                    <option value="difficulty">Difficulty</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                  <motion.button
                    onClick={() => setViewMode('grid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded ${
                      viewMode === 'grid' 
                        ? 'bg-emerald-500 text-white' 
                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-all`}
                  >
                    <Grid className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode('list')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded ${
                      viewMode === 'list' 
                        ? 'bg-emerald-500 text-white' 
                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-all`}
                  >
                    <List className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredAndSortedPlants.length} plants found
              </span>
              {(searchQuery || selectedFamily !== 'All Families' || selectedRegion !== 'All Regions' || 
                selectedSunlight !== 'All Light Levels' || selectedWater !== 'All Water Levels') && (
                <motion.button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedFamily('All Families')
                    setSelectedRegion('All Regions')
                    setSelectedSunlight('All Light Levels')
                    setSelectedWater('All Water Levels')
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-500 hover:text-emerald-600 font-semibold flex items-center gap-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Plant Grid */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          {filteredAndSortedPlants.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
              } backdrop-blur-xl rounded-2xl p-12 shadow-xl text-center border ${
                isDarkMode ? 'border-slate-700' : 'border-emerald-200'
              }`}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-4`}>
                No Plants Found
              </h3>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } text-lg max-w-md mx-auto`}>
                Try adjusting your search terms or filters to find the plants you're looking for.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              } gap-6`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredAndSortedPlants.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlant(plant)}
                  className={`${
                    isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
                  } backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border ${
                    isDarkMode ? 'border-slate-700' : 'border-emerald-200'
                  } cursor-pointer group transition-all duration-300 hover:shadow-2xl`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Plant Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Difficulty Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            plant.difficulty === 'Very Easy' ? 'bg-green-500 text-white' :
                            plant.difficulty === 'Easy' ? 'bg-blue-500 text-white' :
                            plant.difficulty === 'Moderate' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                          } backdrop-blur-sm`}>
                            {plant.difficulty}
                          </span>
                        </div>

                        {/* Popularity Score */}
                        <div className="absolute top-3 left-3">
                          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-white text-xs font-semibold">{plant.popularity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Plant Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`text-xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } mb-1 group-hover:text-emerald-500 transition-colors`}>
                              {plant.name}
                            </h3>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                            } italic mb-2`}>
                              {plant.scientificName}
                            </p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            } mb-4`}>
                              {plant.family}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle bookmark functionality
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <Bookmark className="w-4 h-4 text-gray-400 hover:text-yellow-500 transition-colors" />
                          </motion.button>
                        </div>

                        {/* Care Icons */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            {(() => {
                              const { icon: SunIcon, color } = getSunlightIcon(plant.care.sunlight)
                              return <SunIcon className={`w-4 h-4 ${color}`} />
                            })()}
                            <span className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {plant.care.sunlight}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {(() => {
                              const { icon: WaterIcon, color } = getWaterIcon(plant.care.water)
                              return <WaterIcon className={`w-4 h-4 ${color}`} />
                            })()}
                            <span className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {plant.care.water}
                            </span>
                          </div>
                        </div>

                        {/* Description Preview */}
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } line-clamp-3 mb-4`}>
                          {plant.description}
                        </p>

                        {/* Region */}
                        <div className="flex items-center gap-1 mb-4">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {plant.nativeRegion}
                          </span>
                        </div>

                        {/* Action Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg text-sm font-semibold text-center flex items-center justify-center gap-2 group-hover:shadow-lg transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center gap-6 p-6">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute -top-1 -right-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            plant.difficulty === 'Very Easy' ? 'bg-green-500 text-white' :
                            plant.difficulty === 'Easy' ? 'bg-blue-500 text-white' :
                            plant.difficulty === 'Moderate' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            {plant.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className={`text-xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } mb-1 group-hover:text-emerald-500 transition-colors`}>
                              {plant.name}
                            </h3>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                            } italic mb-1`}>
                              {plant.scientificName}
                            </p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {plant.family} • {plant.nativeRegion}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className={`text-sm font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {plant.popularity}
                            </span>
                          </div>
                        </div>

                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-3 line-clamp-2`}>
                          {plant.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1">
                              {(() => {
                                const { icon: SunIcon, color } = getSunlightIcon(plant.care.sunlight)
                                return <SunIcon className={`w-4 h-4 ${color}`} />
                              })()}
                              <span className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {plant.care.sunlight}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {(() => {
                                const { icon: WaterIcon, color } = getWaterIcon(plant.care.water)
                                return <WaterIcon className={`w-4 h-4 ${color}`} />
                              })()}
                              <span className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {plant.care.water} Water
                              </span>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg text-sm font-semibold flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Plant Detail Modal */}
        <AnimatePresence>
          {selectedPlant && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
              onClick={() => setSelectedPlant(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`${
                  isDarkMode ? 'bg-slate-800' : 'bg-white'
                } rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto`}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-inherit rounded-t-2xl border-b border-gray-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedPlant.image}
                      alt={selectedPlant.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h2 className={`text-2xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedPlant.name}
                      </h2>
                      <p className={`${
                        isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                      } italic`}>
                        {selectedPlant.scientificName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-yellow-500 transition-colors" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    </motion.button>
                    <motion.button
                      onClick={() => setSelectedPlant(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content - Reusing PlantInfo component structure */}
                <div className="p-6">
                  {/* Plant Header */}
                  <div className="text-center mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                        <Award className="w-4 h-4" />
                        Plant Identified
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-4">
                      <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                        Family: {selectedPlant.family}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        selectedPlant.difficulty === 'Very Easy' ? 'bg-green-500 text-white' :
                        selectedPlant.difficulty === 'Easy' ? 'bg-blue-500 text-white' :
                        selectedPlant.difficulty === 'Moderate' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {selectedPlant.difficulty}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold dark:bg-purple-900/30 dark:text-purple-300">
                        {selectedPlant.category}
                      </span>
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full dark:bg-yellow-900/30 dark:text-yellow-300">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-sm font-semibold">{selectedPlant.popularity}% Popular</span>
                      </div>
                    </div>
                  </div>

                  {/* Plant Description */}
                  <div className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50' 
                      : 'bg-gradient-to-r from-emerald-50/80 to-teal-50/80'
                  } rounded-2xl p-6 mb-8`}>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4 text-xl flex items-center gap-3`}>
                      <Info className="w-6 h-6 text-emerald-500" />
                      About This Plant
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed text-lg`}>
                      {selectedPlant.description}
                    </p>
                  </div>

                  {/* Care Information Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { icon: Sun, label: "Sunlight", value: selectedPlant.care.sunlight, color: "yellow" },
                      { icon: Droplets, label: "Water", value: selectedPlant.care.water, color: "blue" },
                      { icon: Globe, label: "Temperature", value: selectedPlant.care.temperature, color: "red" },
                      { icon: Globe, label: "Humidity", value: selectedPlant.care.humidity, color: "cyan" }
                    ].map((care, index) => (
                      <motion.div
                        key={care.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`${
                          isDarkMode 
                            ? 'bg-slate-700/60 border-slate-600/50' 
                            : 'bg-white/60 border-gray-200/50'
                        } backdrop-blur-sm rounded-2xl p-6 shadow-lg border text-center`}
                      >
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`w-12 h-12 bg-${care.color}-100 dark:bg-${care.color}-900/30 rounded-xl flex items-center justify-center mx-auto mb-4`}
                        >
                          <care.icon className={`w-6 h-6 text-${care.color}-600 dark:text-${care.color}-400`} />
                        </motion.div>
                        <h5 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        } mb-2`}>
                          {care.label}
                        </h5>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } leading-relaxed`}>
                          {care.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Native Region */}
                  <div className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30' 
                      : 'bg-gradient-to-r from-indigo-50/80 to-purple-50/80'
                  } rounded-2xl p-6 mb-8`}>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4 text-xl flex items-center gap-3`}>
                      <MapPin className="w-6 h-6 text-indigo-500" />
                      Native Region
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } text-lg`}>
                      {selectedPlant.nativeRegion}
                    </p>
                  </div>

                  {/* Uses */}
                  <div className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30' 
                      : 'bg-gradient-to-r from-green-50/80 to-emerald-50/80'
                  } rounded-2xl p-6 mb-8`}>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-6 text-xl flex items-center gap-3`}>
                      <Heart className="w-6 h-6 text-green-500" />
                      Common Uses & Benefits
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedPlant.uses.map((use, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800/50 dark:to-emerald-800/50 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold shadow-md cursor-default"
                        >
                          {use}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Fun Facts */}
                  <div className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' 
                      : 'bg-gradient-to-r from-purple-50/80 to-pink-50/80'
                  } rounded-2xl p-6 mb-8`}>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-6 text-xl flex items-center gap-3`}>
                      <Sparkles className="w-6 h-6 text-purple-500" />
                      Fascinating Facts
                    </h4>
                    <div className="space-y-4">
                      {selectedPlant.funFacts.map((fact, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                          className={`flex items-start gap-4 ${
                            isDarkMode ? 'bg-slate-800/40' : 'bg-white/40'
                          } p-4 rounded-xl backdrop-blur-sm`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 180 }}
                            className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          >
                            <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </motion.div>
                          <p className={`${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          } leading-relaxed`}>
                            {fact}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Heart className="w-5 h-5" />
                      Save to Favorites
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 ${
                        isDarkMode 
                          ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      } py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                    >
                      <Camera className="w-5 h-5" />
                      Scan Similar Plant
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-20 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`${
                isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
              } backdrop-blur-xl rounded-3xl p-12 shadow-2xl border ${
                isDarkMode ? 'border-slate-700' : 'border-emerald-200'
              }`}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1], 
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-8"
              >
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Camera className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <h3 className={`text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-6`}>
                Discover More Plants
              </h3>
              
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed text-xl mb-8 max-w-2xl mx-auto`}>
                Found a plant not in our guide? Use our AI scanner to identify it instantly 
              and help us expand our database with new species discoveries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Camera className="w-6 h-6" />
                  Use Plant Scanner
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/community'}
                  className={`${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3`}
                >
                  <Users className="w-6 h-6" />
                  Join Community
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
                {[
                  { number: "50K+", label: "Plant Species" },
                  { number: "99%", label: "AI Accuracy" },
                  { number: "24/7", label: "Available" },
                  { number: "500K+", label: "Identifications" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-emerald-500 mb-2">{stat.number}</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}