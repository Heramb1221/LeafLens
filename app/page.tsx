'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Camera, Leaf, Sparkles, Info, MapPin, Sun, Droplets, Thermometer, Heart, Star, Clock, Shield, Menu, X, Home, Users, Mail, BookOpen, Github, Twitter, Instagram, Zap, Target, Globe, Palette, FileText, Eye, HomeIcon } from 'lucide-react'
import { identifyPlant } from './utils/gemini'

interface PlantInfo {
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
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Display the image immediately
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
    setError(null)
    setIsLoading(true)

    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string
        const result = await identifyPlant(base64)
        setPlantInfo(result)
        setIsLoading(false)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError('Failed to identify plant. Please try again.')
      setIsLoading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetApp = () => {
    setSelectedImage(null)
    setPlantInfo(null)
    setError(null)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="relative z-50 bg-white/95 backdrop-blur-lg border-b border-emerald-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                PlantID
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                <Users className="w-4 h-4" />
                About
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                <BookOpen className="w-4 h-4" />
                Plant Guide
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                <Mail className="w-4 h-4" />
                Contact
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-lg"
              >
                <div className="py-4 space-y-3">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                    <HomeIcon className="w-4 h-4" />
                    Home
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                    <Users className="w-4 h-4" />
                    About
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    Plant Guide
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                  <div className="px-4 pt-2">
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium">
                      Get Started
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-32 h-32 text-emerald-200 opacity-30"
        >
          <Leaf className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-20 h-20 text-teal-200 opacity-40"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: 180, x: [0, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-20 w-16 h-16 text-cyan-200 opacity-25"
        >
          <Heart className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: -180, scale: [1, 1.3, 1] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-10 w-12 h-12 text-emerald-300 opacity-35"
        >
          <Star className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative"
            >
              <Leaf className="w-16 h-16 text-emerald-600" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400"
              >
                <Sparkles className="w-full h-full" />
              </motion.div>
            </motion.div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              PlantID
            </h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-600 mb-4"
          >
            Discover the world of plants with AI-powered identification
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-500 leading-relaxed">
              Simply upload a photo of any plant, and our advanced AI will instantly identify the species, 
              providing you with comprehensive care instructions, fascinating facts, and everything you need 
              to know about your green companion.
            </p>
          </motion.div>
          
          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
              <Camera className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Instant Recognition</span>
            </div>
            <div className="flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
              <Info className="w-5 h-5 text-teal-600" />
              <span className="text-teal-700 font-medium">Detailed Information</span>
            </div>
            <div className="flex items-center gap-2 bg-cyan-100 px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-cyan-600" />
              <span className="text-cyan-700 font-medium">Care Tips</span>
            </div>
          </motion.div>
        </motion.header>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Upload Section - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-emerald-600" />
                Upload Plant Image
              </h2>

              {!selectedImage ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUploadClick}
                  className="upload-area rounded-xl p-12 cursor-pointer text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Upload className="w-16 h-16 text-emerald-500 mx-auto" />
                  </motion.div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-sm text-gray-500">
                    Support for JPG, PNG, WEBP files
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {/* Enhanced Image Display */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-xl overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img
                      src={selectedImage}
                      alt="Selected plant"
                      className="w-full h-80 object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#dc2626' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetApp}
                      className="absolute top-4 right-4 z-20 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg"
                    >
                      ×
                    </motion.button>
                    {!isLoading && plantInfo && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2"
                      >
                        <p className="text-sm font-medium text-gray-800">✓ Identified Successfully</p>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUploadClick}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Different Image
                  </motion.button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Loading State */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-effect rounded-2xl p-8 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-4"
                  >
                    <Sparkles className="w-full h-full text-emerald-500" />
                  </motion.div>
                  <p className="text-lg font-medium text-gray-700">
                    Analyzing your plant...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Our AI is identifying the species
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-4"
                  ></motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error State */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-6"
                >
                  <p className="text-red-700 font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* How to Use Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">How PlantID Works</h2>
                <p className="text-gray-600 text-lg">
                  Discover the power of AI-driven plant identification in three simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Upload Image</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Simply capture or upload a clear photo of your plant from any angle
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-emerald-500/30 rounded-full flex items-center justify-center">
                    <span className="text-emerald-400 font-bold text-sm">1</span>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">AI Analysis</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Our advanced AI instantly analyzes and identifies your plant species
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-blue-500/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">2</span>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer md:col-span-2 lg:col-span-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Get Results</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Receive comprehensive plant information and care instructions instantly
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-purple-500/30 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-sm">3</span>
                  </div>
                </motion.div>
              </div>

              {/* Information Cards */}
              <div className="mt-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">What You'll Discover</h3>
                  <p className="text-gray-600">
                    Get comprehensive information about every plant you identify
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Plant Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">Plant Details</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Scientific name, family classification, and detailed descriptions
                      </p>
                    </div>
                  </motion.div>

                  {/* Care Instructions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Sun className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">Care Guide</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Sunlight, water, temperature, and humidity requirements
                      </p>
                    </div>
                  </motion.div>

                  {/* Native Habitat */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">Native Habitat</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Origin regions and natural growing environments
                      </p>
                    </div>
                  </motion.div>

                  {/* Plant Uses */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">Uses & Benefits</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Medicinal, culinary, and decorative applications
                      </p>
                    </div>
                  </motion.div>

                  {/* Fun Facts */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">Fun Facts</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Interesting trivia and fascinating plant knowledge
                      </p>
                    </div>
                  </motion.div>

                  {/* Detailed Table */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold text-lg mb-2">Detailed Report</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Comprehensive information table with all plant data
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Results Section - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 space-y-6"
          >
            <AnimatePresence>
              {plantInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-effect rounded-2xl p-8 space-y-6"
                >
                  {/* Plant Name */}
                  <div className="text-center border-b border-emerald-100 pb-6">
                    <motion.h3
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-bold text-gray-800 mb-2"
                    >
                      {plantInfo.name}
                    </motion.h3>
                    <p className="text-xl text-gray-600 italic mb-2">
                      {plantInfo.scientificName}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">
                        Family: {plantInfo.family}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6"
                  >
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                      <Info className="w-6 h-6 text-emerald-600" />
                      About This Plant
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {plantInfo.description}
                    </p>
                  </motion.div>

                  {/* Plant Information Table */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4">
                      <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Plant Information Summary
                      </h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50 w-1/3">
                              <div className="flex items-center gap-2">
                                <Leaf className="w-4 h-4 text-emerald-600" />
                                Common Name
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 font-medium">{plantInfo.name}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-purple-600" />
                                Scientific Name
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 italic">{plantInfo.scientificName}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-indigo-600" />
                                Plant Family
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{plantInfo.family}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Sun className="w-4 h-4 text-yellow-600" />
                                Sunlight Needs
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{plantInfo.care.sunlight}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-blue-600" />
                                Watering
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{plantInfo.care.water}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Thermometer className="w-4 h-4 text-red-600" />
                                Temperature
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{plantInfo.care.temperature}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-teal-600" />
                                Humidity
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{plantInfo.care.humidity}</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-600" />
                                Native Region
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{plantInfo.nativeRegion}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>

                  {/* Uses */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6"
                  >
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
                      <Heart className="w-5 h-5 text-green-600" />
                      Common Uses
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {plantInfo.uses.map((use, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="bg-gradient-to-r from-green-200 to-emerald-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                        >
                          {use}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Fun Facts */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6"
                  >
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      Fascinating Facts
                    </h4>
                    <div className="space-y-3">
                      {plantInfo.funFacts.map((fact, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="flex items-start gap-3 bg-white/50 p-3 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-indigo-600 text-sm font-bold">{index + 1}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{fact}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Default Content */}
            {!selectedImage && !isLoading && !plantInfo && (
              <div className="glass-effect rounded-2xl p-12 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-32 h-32 mx-auto mb-8 text-emerald-400"
                >
                  <Leaf className="w-full h-full" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Ready to Identify Plants?
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
                  Upload an image of any plant, and our AI will instantly identify it for you. 
                  Get detailed information about care instructions, native regions, uses, and fascinating facts!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Quick Upload</h4>
                    <p className="text-sm text-gray-600">Simply click and upload any plant photo</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">AI Analysis</h4>
                    <p className="text-sm text-gray-600">Advanced AI identifies your plant instantly</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Info className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Detailed Info</h4>
                    <p className="text-sm text-gray-600">Get comprehensive plant care details</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <Leaf className="w-8 h-8 text-emerald-400" />
                  <span className="text-2xl font-bold">PlantID</span>
                </div>
                <p className="text-emerald-100 leading-relaxed">
                  Revolutionizing plant identification with cutting-edge AI technology. 
                  Discover, learn, and care for the green world around you.
                </p>
                <div className="flex space-x-4 pt-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-emerald-700 p-2 rounded-full hover:bg-emerald-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-emerald-700 p-2 rounded-full hover:bg-emerald-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-emerald-700 p-2 rounded-full hover:bg-emerald-600 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-emerald-200">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-2">
                      <HomeIcon className="w-4 h-4" />
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Plant Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Plant Scanner
                    </a>
                  </li>
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-emerald-200">Features</h3>
                <ul className="space-y-3">
                  <li>
                    <span className="text-emerald-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      AI Plant Recognition
                    </span>
                  </li>
                  <li>
                    <span className="text-emerald-100 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-emerald-400" />
                      Care Instructions
                    </span>
                  </li>
                  <li>
                    <span className="text-emerald-100 flex items-center gap-2">
                      <Info className="w-4 h-4 text-emerald-400" />
                      Detailed Information
                    </span>
                  </li>
                  <li>
                    <span className="text-emerald-100 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      Instant Results
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-emerald-200">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-emerald-100">Email</p>
                      <p className="text-sm text-emerald-200">hello@plantid.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-emerald-100">Location</p>
                      <p className="text-sm text-emerald-200">Global Service</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-emerald-100">Support</p>
                      <p className="text-sm text-emerald-200">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-emerald-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-emerald-200 text-sm">
                  <span>© 2025 PlantID. All rights reserved.</span>
                  <span>•</span>
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
                <div className="flex items-center gap-2 text-emerald-200 text-sm">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <span>Made with love for plant enthusiasts worldwide</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-emerald-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">50K+</div>
                <div className="text-emerald-200 text-sm">Plants Identified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">10K+</div>
                <div className="text-emerald-200 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">95%</div>
                <div className="text-emerald-200 text-sm">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">24/7</div>
                <div className="text-emerald-200 text-sm">Service</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </div>
  )
}