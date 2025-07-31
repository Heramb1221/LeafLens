'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Users, MessageCircle, Search, Filter, Plus, TrendingUp,
  ArrowUp, ArrowDown, Eye, Star, Award, Flag, Share2,
  Bookmark, MoreHorizontal, Send, Image as ImageIcon, Hash,
  CheckCircle, X, Github, Mail, 
  Shield, MessageSquare, Tag, Flame, Zap,
  Crown, Medal, Trophy, Sparkles, Leaf,
  Sun, Moon, Menu
} from 'lucide-react'

// Mock data
const mockUser = {
  id: '1',
  name: 'Alex Green',
  username: '@alexgreen',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  isAuthenticated: true,
  badges: ['Plant Expert', 'Community Helper'],
  joinDate: '2024-01-15',
  postsCount: 47,
  reputation: 1250
}

const mockPosts = [
  {
    id: '1',
    title: 'Help! My fiddle leaf fig leaves are turning brown',
    content: 'I\'ve had this beautiful fiddle leaf fig for about 6 months now, and recently I\'ve noticed the leaves are starting to turn brown around the edges. I water it once a week and it gets indirect sunlight. What could be causing this?',
    author: {
      id: '2',
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      badges: ['New Member']
    },
    timestamp: '2 hours ago',
    upvotes: 12,
    downvotes: 1,
    comments: 8,
    views: 156,
    tags: ['fiddle-leaf-fig', 'help', 'brown-leaves', 'watering'],
    image: 'https://images.unsplash.com/photo-1586625623060-806b7cfab8e7?w=400&h=300&fit=crop',
    solved: false,
    trending: true
  },
  {
    id: '2',
    title: 'Amazing propagation success with my pothos!',
    content: 'Just wanted to share my excitement - I successfully propagated 12 pothos cuttings and they\'re all thriving! Here are some tips that worked for me...',
    author: {
      id: '3',
      name: 'Mike Chen',
      username: '@mikec',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      badges: ['Plant Expert', 'Propagation Master']
    },
    timestamp: '5 hours ago',
    upvotes: 28,
    downvotes: 0,
    comments: 15,
    views: 324,
    tags: ['pothos', 'propagation', 'success', 'tips'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    solved: false,
    trending: true
  },
  {
    id: '3',
    title: 'Best soil mix for succulents?',
    content: 'I\'m new to succulents and want to make sure I get the soil right. What\'s the best commercial mix, or should I make my own? Looking for recommendations!',
    author: {
      id: '4',
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      badges: ['New Member']
    },
    timestamp: '1 day ago',
    upvotes: 15,
    downvotes: 2,
    comments: 12,
    views: 289,
    tags: ['succulents', 'soil', 'beginner', 'recommendations'],
    solved: true,
    trending: false
  },
  {
    id: '4',
    title: 'My monstera deliciosa just got its first fenestration!',
    content: 'I\'m so excited! After 8 months of caring for my monstera, it finally produced its first leaf with holes. The wait was so worth it!',
    author: {
      id: '5',
      name: 'David Park',
      username: '@davidp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      badges: ['Plant Enthusiast']
    },
    timestamp: '1 day ago',
    upvotes: 42,
    downvotes: 0,
    comments: 18,
    views: 567,
    tags: ['monstera', 'fenestration', 'milestone', 'excitement'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    solved: false,
    trending: true
  },
  {
    id: '5',
    title: 'Winter care tips for outdoor plants',
    content: 'With winter approaching, I wanted to share some tips for protecting your outdoor plants from frost and cold temperatures...',
    author: {
      id: '6',
      name: 'Lisa Rodriguez',
      username: '@lisar',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      badges: ['Outdoor Expert', 'Seasonal Specialist']
    },
    timestamp: '2 days ago',
    upvotes: 35,
    downvotes: 1,
    comments: 22,
    views: 445,
    tags: ['winter', 'outdoor', 'care', 'tips', 'frost'],
    solved: false,
    trending: false
  }
]

const mockTopContributors = [
  {
    id: '3',
    name: 'Mike Chen',
    username: '@mikec',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    reputation: 2480,
    posts: 78,
    badges: ['Plant Expert', 'Propagation Master']
  },
  {
    id: '6',
    name: 'Lisa Rodriguez',
    username: '@lisar',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    reputation: 1920,
    posts: 65,
    badges: ['Outdoor Expert', 'Seasonal Specialist']
  },
  {
    id: '7',
    name: 'James Wilson',
    username: '@jamesw',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    reputation: 1650,
    posts: 52,
    badges: ['Indoor Specialist']
  }
]

const trendingTags = [
  { name: 'fiddle-leaf-fig', count: 124, trending: true },
  { name: 'propagation', count: 98, trending: true },
  { name: 'succulents', count: 186, trending: false },
  { name: 'monstera', count: 142, trending: true },
  { name: 'watering', count: 203, trending: false },
  { name: 'soil', count: 167, trending: false },
  { name: 'beginner', count: 89, trending: false },
  { name: 'help', count: 256, trending: false },
  { name: 'winter', count: 67, trending: true },
  { name: 'outdoor', count: 134, trending: false }
]

interface Post {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    username: string
    avatar: string
    badges: string[]
  }
  timestamp: string
  upvotes: number
  downvotes: number
  comments: number
  views: number
  tags: string[]
  image?: string
  solved: boolean
  trending: boolean
}

export default function CommunityPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest')
  const [showGuidelines, setShowGuidelines] = useState(false)
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

  // Filter posts based on search and selected tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      default:
        return 0 // newest - would need real timestamps in production
    }
  })

  const handleUpvote = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ))
  }

  const handleDownvote = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post
    ))
  }

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
                  Community
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Home', href: '/' },
                { label: 'Community', href: '/community' },
                { label: 'Guide', href: '/guide' }
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`${
                    isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'
                  } transition-colors font-medium relative group ${
                    item.href === '/community' ? 'text-emerald-500' : ''
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
                    { label: 'Community', href: '/community' },
                    { label: 'Guide', href: '/guide' }
                  ].map((item) => (
                    <a 
                      key={item.label}
                      href={item.href} 
                      className={`block px-4 py-3 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-emerald-300 hover:bg-slate-800' 
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      } transition-colors rounded-lg mx-2 ${
                        item.href === '/community' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : ''
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
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-16 px-4"
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
                  <Users className="w-12 h-12 text-white" />
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
                  Community
                </motion.h1>
                <motion.div
                  variants={itemVariants}
                  className={`text-xl font-semibold ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                  } mt-2`}
                >
                  Join thousands of plant lovers
                </motion.div>
              </div>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className={`text-2xl md:text-3xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-6 font-light leading-relaxed max-w-4xl mx-auto`}
            >
              Connect, share, and grow together with fellow plant enthusiasts
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className={`text-lg ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } leading-relaxed max-w-3xl mx-auto mb-12`}
            >
              Share your plant journey, ask questions, get expert advice, and discover new species 
              with our vibrant community of gardeners, botanists, and plant lovers from around the world.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <motion.button
                onClick={() => setShowCreateModal(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Plus className="w-6 h-6" />
                Post Your First Question
              </motion.button>
            </motion.div>
          </motion.div>

          {/* User Profile Widget */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="max-w-2xl mx-auto mb-12"
          >
            {mockUser.isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`${
                  isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
                } backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                  isDarkMode ? 'border-slate-700' : 'border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        Welcome back, {mockUser.name}!
                      </h3>
                      <p className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {mockUser.username} • {mockUser.reputation} reputation
                      </p>
                      <div className="flex gap-2 mt-2">
                        {mockUser.badges.map((badge) => (
                          <span
                            key={badge}
                            className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold dark:bg-emerald-900/30 dark:text-emerald-300"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setShowCreateModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    New Post
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`${
                  isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
                } backdrop-blur-xl rounded-2xl p-8 shadow-xl text-center border ${
                  isDarkMode ? 'border-slate-700' : 'border-emerald-200'
                }`}
              >
                <Users className={`w-16 h-16 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                } mx-auto mb-4`} />
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                } mb-4`}>
                  Join the Community
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } mb-6`}>
                  Sign in to share your plant journey and connect with fellow enthusiasts
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Sign in with GitHub
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Sign in with Google
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trending Tags */}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                } flex items-center gap-3`}>
                  <Flame className="w-6 h-6 text-orange-500" />
                  Trending Topics
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTag(null)}
                  className={`text-sm ${
                    isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                  } font-semibold transition-colors`}
                >
                  Clear Filter
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
                {trendingTags.map((tag) => (
                  <motion.button
                    key={tag.name}
                    onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                      selectedTag === tag.name
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Hash className="w-4 h-4" />
                    {tag.name}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedTag === tag.name
                        ? 'bg-white/20'
                        : 'bg-black/10 dark:bg-white/10'
                    }`}>
                      {tag.count}
                    </span>
                    {tag.trending && (
                      <TrendingUp className="w-3 h-3 text-orange-400" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Search and Filter */}
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
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`px-4 py-3 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-3 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' 
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    } transition-all`}
                  >
                    <Filter className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Post Feed */}
            <div className="space-y-6">
              <AnimatePresence>
                {sortedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className={`${
                      isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
                    } backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                      isDarkMode ? 'border-slate-700' : 'border-emerald-200'
                    } cursor-pointer group`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>

                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {post.author.name}
                              </h3>
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {post.author.username}
                              </span>
                              {post.author.badges.map((badge) => (
                                <span
                                  key={badge}
                                  className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-semibold dark:bg-emerald-900/30 dark:text-emerald-300"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {post.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {post.trending && (
                              <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 dark:bg-orange-900/30 dark:text-orange-300">
                                <Flame className="w-3 h-3" />
                                Trending
                              </div>
                            )}
                            {post.solved && (
                              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 dark:bg-green-900/30 dark:text-green-300">
                                <CheckCircle className="w-3 h-3" />
                                Solved
                              </div>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`p-2 rounded-full ${
                                isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                              } transition-colors`}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>

                        <h2 className={`text-xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } mb-3 group-hover:text-emerald-500 transition-colors`}>
                          {post.title}
                        </h2>

                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-4 line-clamp-3`}>
                          {post.content}
                        </p>

                        {/* Post Image */}
                        {post.image && (
                          <div className="mb-4">
                            <img
                              src={post.image}
                              alt="Post image"
                              className="w-full h-48 object-cover rounded-xl"
                            />
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <motion.button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              whileHover={{ scale: 1.05 }}
                              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                selectedTag === tag
                                  ? 'bg-emerald-500 text-white'
                                  : isDarkMode
                                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              } transition-all`}
                            >
                              #{tag}
                            </motion.button>
                          ))}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => handleUpvote(post.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-1 text-gray-500 hover:text-emerald-500 transition-colors"
                              >
                                <ArrowUp className="w-4 h-4" />
                                <span className="text-sm font-semibold">{post.upvotes}</span>
                              </motion.button>
                              <motion.button
                                onClick={() => handleDownvote(post.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                              >
                                <ArrowDown className="w-4 h-4" />
                                <span className="text-sm font-semibold">{post.downvotes}</span>
                              </motion.button>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm font-semibold">{post.comments}</span>
                            </motion.button>

                            <div className="flex items-center gap-2 text-gray-500">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">{post.views}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all"
                            >
                              <Bookmark className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                            >
                              <Share2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600' 
                    : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300'
                } px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-300 shadow-lg`}
              >
                Load More Posts
              </motion.button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${
                isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
              } backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                isDarkMode ? 'border-slate-700' : 'border-emerald-200'
              }`}
            >
              <h3 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-6 flex items-center gap-3`}>
                <Trophy className="w-6 h-6 text-yellow-500" />
                Top Contributors
              </h3>
              <div className="space-y-4">
                {mockTopContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                    } transition-all cursor-pointer`}
                  >
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {index === 1 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <Medal className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {index === 2 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      } truncate`}>
                        {contributor.name}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } truncate`}>
                        {contributor.username}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {contributor.reputation}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Follow
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Community Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${
                isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
              } backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                isDarkMode ? 'border-slate-700' : 'border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                } flex items-center gap-3`}>
                  <Shield className="w-6 h-6 text-blue-500" />
                  Guidelines
                </h3>
                <motion.button
                  onClick={() => setShowGuidelines(!showGuidelines)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  } font-semibold transition-colors`}
                >
                  {showGuidelines ? 'Hide' : 'Show'}
                </motion.button>
              </div>
              <AnimatePresence>
                {showGuidelines && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className={`space-y-3 text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Be respectful and kind to all community members
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Share accurate information and cite sources when possible
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Use clear, descriptive titles for your posts
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Include high-quality photos when asking for plant ID
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Search before posting to avoid duplicates
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        No spam, self-promotion, or off-topic content
                      </li>
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300"
                    >
                      <Flag className="w-4 h-4" />
                      Report Violation
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${
                isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
              } backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                isDarkMode ? 'border-slate-700' : 'border-emerald-200'
              }`}
            >
              <h3 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-6 flex items-center gap-3`}>
                <Zap className="w-6 h-6 text-purple-500" />
                Community Stats
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Active Members', value: '12.5K', icon: Users, color: 'blue' },
                  { label: 'Posts This Week', value: '248', icon: MessageSquare, color: 'green' },
                  { label: 'Plants Identified', value: '5.2K', icon: Leaf, color: 'emerald' },
                  { label: 'Questions Solved', value: '89%', icon: CheckCircle, color: 'purple' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                      <span className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } text-sm`}>
                        {stat.label}
                      </span>
                    </div>
                    <span className={`font-bold text-lg ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              } rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Create New Post
                </h2>
                <motion.button
                  onClick={() => setShowCreateModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                  } transition-colors`}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className={`block text-sm font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Title *
                  </label>
                  <input
                    type="text"
                    placeholder="What's your question or topic?"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Content *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your question or share your knowledge..."
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Add tags separated by commas (e.g., succulent, watering, help)"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Add Image (Optional)
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`border-2 border-dashed ${
                      isDarkMode 
                        ? 'border-slate-600 bg-slate-700/50' 
                        : 'border-gray-300 bg-gray-50'
                    } rounded-xl p-8 text-center cursor-pointer transition-all`}
                  >
                    <ImageIcon className={`w-12 h-12 mx-auto mb-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } font-semibold mb-2`}>
                      Click to upload or drag and drop
                    </p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </motion.div>
                </div>

                <div className="flex gap-4 pt-6">
                  <motion.button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 rounded-xl font-semibold border-2 ${
                      isDarkMode 
                        ? 'border-slate-600 text-gray-300 hover:bg-slate-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } transition-all`}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Post Question
                  </motion.button>
                </div>
              </form>
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
                <Users className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <h3 className={`text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            } mb-6`}>
              Grow Your Network
            </h3>
            
            <p className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } leading-relaxed text-xl mb-8 max-w-2xl mx-auto`}>
              Invite your friends to join our thriving plant community. Share knowledge, 
              discover new species, and grow together!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Users className="w-6 h-6" />
                Invite Friends
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}