'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Upload, Camera, Leaf, Sparkles, Info, MapPin, Sun, Droplets,
  Thermometer, Heart, Star, Clock, Shield, Menu, X, Users,
  Mail, BookOpen, Github, Twitter, Instagram, Zap, Globe, Eye, HomeIcon, Moon, SunIcon, Scan, Image, ArrowRight, Check, Award, TrendingUp
} from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { identifyPlant } from '../app/utils/gemini';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

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

export default function LeafLensApp() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)


  // Animation refs
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })

  // Start camera stream
  const startCamera = async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      setStream(mediaStream)
      setShowCamera(true)
      
      // Set the video stream after a small delay to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      }, 100)
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Unable to access camera. Please check permissions or try uploading an image instead.')
    }
  }

  // Stop camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        // Draw the video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convert canvas to blob and then to object URL
        canvas.toBlob((blob) => {
          if (blob) {
            const imageUrl = URL.createObjectURL(blob)
            setSelectedImage(imageUrl)
            stopCamera()
            
            // Process the image
            processImage(canvas.toDataURL())
          }
        }, 'image/jpeg', 0.9)
      }
    }
  }

  // Process captured or uploaded image
  const processImage = async (base64Image: string) => {
    setError(null)
    setIsLoading(true)

    try {
      const result = await identifyPlant(base64Image)
      setPlantInfo(result)
    } catch (err) {
      setError('Failed to identify plant. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64 = e.target?.result as string
      await processImage(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleCameraCapture = () => {
    startCamera()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetApp = () => {
    setSelectedImage(null)
    setPlantInfo(null)
    setError(null)
    setIsLoading(false)
    stopCamera()
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  // Advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50'
    }`}>
      {/* Enhanced Navigation */}
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
            {/* Enhanced Logo */}
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
                  AI Plant Identifier
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { icon: HomeIcon, label: 'Home', href: '#' },
                { icon: Scan, label: 'Scanner', href: '#scanner' },
                { icon: BookOpen, label: 'Plant Guide', href: '/guide' },
                { icon: Users, label: 'Community', href: '/community' },
                { icon: Mail, label: 'Contact', href: '/contact' }
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'
                  } transition-colors font-medium relative group`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
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
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
                    { icon: HomeIcon, label: 'Home', href: '#' },
                    { icon: Scan, label: 'Scanner', href: '#scanner' },
                    { icon: BookOpen, label: 'Plant Guide', href: '/guide' },
                    { icon: Users, label: 'Community', href: '/community' },
                    { icon: Mail, label: 'Contact', href: '/contact' }
                  ].map((item) => (
                    <a 
                      key={item.label}
                      href={item.href} 
                      className={`flex items-center gap-3 px-4 py-3 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-emerald-300 hover:bg-slate-800' 
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      } transition-colors rounded-lg mx-2`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </a>
                  ))}
                  <div className="px-4 pt-2">
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-64 h-64 ${
                isDarkMode ? 'text-emerald-800/20' : 'text-emerald-200/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: i * 0.5 }}
            >
              <Leaf className="w-full h-full rotate-12" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-16">
        {/* Enhanced Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="text-center mb-16"
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
                    <Leaf className="w-12 h-12 text-white" />
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
                    className={`text-7xl md:text-8xl font-black ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300' 
                        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600'
                    } bg-clip-text text-transparent leading-none`}
                  >
                    LeafLens
                  </motion.h1>
                  <motion.div
                    variants={itemVariants}
                    className={`text-xl font-semibold ${
                      isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                    } mt-2`}
                  >
                    AI-Powered Plant Recognition
                  </motion.div>
                </div>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className={`text-2xl md:text-3xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                } mb-6 font-light leading-relaxed max-w-4xl mx-auto`}
              >
                Instantly identify any plant species with cutting-edge AI technology
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className={`text-lg ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } leading-relaxed max-w-3xl mx-auto mb-12`}
              >
                Simply capture or upload a photo of any plant, and our advanced machine learning algorithms 
                will provide you with comprehensive species identification, detailed care instructions, 
                and fascinating botanical insights in seconds.
              </motion.p>

              {/* Enhanced Feature Pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4 mb-16"
              >
                {[
                  { icon: Camera, label: "Instant Recognition", color: "emerald" },
                  { icon: Info, label: "Detailed Analysis", color: "teal" },
                  { icon: Heart, label: "Care Guidelines", color: "green" },
                  { icon: Award, label: "99% Accuracy", color: "blue" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full ${
                      isDarkMode 
                        ? 'bg-slate-800/80 border border-emerald-700/50' 
                        : 'bg-white/80 border border-emerald-200/50'
                    } backdrop-blur-sm shadow-lg`}
                  >
                    <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                    <span className={`font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Upload Section */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="max-w-6xl mx-auto"
            >
              {!selectedImage ? (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {showCamera && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
    <div className="relative bg-white rounded-2xl p-4 shadow-2xl max-w-sm w-full flex flex-col items-center dark:bg-slate-900">
      <video
        ref={videoRef}
        autoPlay
        className="w-full rounded-xl object-cover mb-4"
        style={{ minHeight: 320 }}
      />
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      <div className="flex justify-between w-full gap-2">
        <button
          onClick={capturePhoto}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold shadow transition-colors"
        >
          Capture Photo
        </button>
        <button
          onClick={stopCamera}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold shadow transition-colors ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

                  {/* Upload Option */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUploadClick}
                    className={`${
                      isDarkMode 
                        ? 'bg-slate-800/60 border-emerald-600/30 hover:border-emerald-500/50' 
                        : 'bg-white/60 border-emerald-300/50 hover:border-emerald-400/70'
                    } backdrop-blur-xl border-2 border-dashed rounded-2xl p-12 cursor-pointer text-center transition-all duration-300 shadow-xl hover:shadow-2xl`}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-3`}>
                      Upload Image
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } text-lg leading-relaxed`}>
                      Choose a photo from your device gallery
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <div className="flex -space-x-1">
                        {['jpg', 'png', 'webp'].map((format) => (
                          <div key={format} className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-700">
                            {format}
                          </div>
                        ))}
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Supported formats
                      </span>
                    </div>
                  </motion.div>

                  {/* Camera Option */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCameraCapture}
                    className={`${
                      isDarkMode 
                        ? 'bg-slate-800/60 border-teal-600/30 hover:border-teal-500/50' 
                        : 'bg-white/60 border-teal-300/50 hover:border-teal-400/70'
                    } backdrop-blur-xl border-2 border-dashed rounded-2xl p-12 cursor-pointer text-center transition-all duration-300 shadow-xl hover:shadow-2xl`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mb-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-3`}>
                      Capture Photo
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } text-lg leading-relaxed`}>
                      Take a photo directly with your camera
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Real-time capture
                      </span>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className={`${
                    isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
                  } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                    isDarkMode ? 'border-slate-700' : 'border-emerald-200'
                  }`}
                >
                  <div className="relative mb-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={selectedImage}
                        alt="Selected plant"
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetApp}
                        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>

                      {!isLoading && plantInfo && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-gray-800">Identified Successfully</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUploadClick}
                      className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Image className="w-5 h-5" />
                      Upload Different Image
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCameraCapture}
                      className={`flex items-center justify-center gap-3 ${
                        isDarkMode 
                          ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      } py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <Camera className="w-5 h-5" />
                      Take New Photo
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Enhanced Loading State */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`${
                      isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'
                    } backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border ${
                      isDarkMode ? 'border-slate-700' : 'border-emerald-200'
                    } mt-8`}
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-20 h-20 mx-auto mb-6"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4`}>
                      Analyzing Your Plant
                    </h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } text-lg mb-6`}>
                      Our AI is processing the image and identifying the species...
                    </p>
                    <div className="relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="h-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full"
                      />
                      <div className={`absolute inset-0 ${
                        isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                      } rounded-full -z-10`} />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                          className="w-2 h-2 bg-emerald-400 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Error State */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8 dark:bg-red-900/20 dark:border-red-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-800/50">
                        <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-300">Identification Failed</h4>
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input References */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.div>
          </div>
        </motion.section>

         {/* Enhanced Results Section */}
        <AnimatePresence>
          {plantInfo && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="py-20 px-4"
            >
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700' 
                      : 'bg-white/80 border-emerald-200'
                  } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border`}
                >
                  {/* Plant Header */}
                  <div className="text-center mb-12 pb-8 border-b border-emerald-200/50 dark:border-slate-700/50">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="mb-6"
                    >
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                        <Award className="w-5 h-5" />
                        Plant Identified
                      </div>
                    </motion.div>
                    
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className={`text-4xl md:text-5xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      } mb-3`}
                    >
                      {plantInfo.name}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={`text-xl ${
                        isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                      } italic mb-4 font-medium`}
                    >
                      {plantInfo.scientificName}
                    </motion.p>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full"
                    >
                      <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                        Family: {plantInfo.family}
                      </span>
                    </motion.div>
                  </div>

                  {/* Plant Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={ { delay: 0.7 }}
                    className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50' 
                        : 'bg-gradient-to-r from-emerald-50/80 to-teal-50/80'
                    } rounded-2xl p-6 mb-8`}
                  >
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4 text-xl flex items-center gap-3`}>
                      <Info className="w-6 h-6 text-emerald-500" />
                      About This Plant
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed text-lg`}>
                      {plantInfo.description}
                    </p>
                  </motion.div>

                  {/* Care Information Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                  >
                    {[
                      { icon: Sun, label: "Sunlight", value: plantInfo.care.sunlight, color: "yellow" },
                      { icon: Droplets, label: "Water", value: plantInfo.care.water, color: "blue" },
                      { icon: Thermometer, label: "Temperature", value: plantInfo.care.temperature, color: "red" },
                      { icon: Globe, label: "Humidity", value: plantInfo.care.humidity, color: "cyan" }
                    ].map((care, index) => (
                      <motion.div
                        key={care.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
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
                  </motion.div>

                  {/* Native Region */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30' 
                        : 'bg-gradient-to-r from-indigo-50/80 to-purple-50/80'
                    } rounded-2xl p-6 mb-8`}
                  >
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4 text-xl flex items-center gap-3`}>
                      <MapPin className="w-6 h-6 text-indigo-500" />
                      Native Region
                    </h4>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } text-lg`}>
                      {plantInfo.nativeRegion}
                    </p>
                  </motion.div>

                  {/* Uses */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30' 
                        : 'bg-gradient-to-r from-green-50/80 to-emerald-50/80'
                    } rounded-2xl p-6 mb-8`}
                  >
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-6 text-xl flex items-center gap-3`}>
                      <Heart className="w-6 h-6 text-green-500" />
                      Common Uses & Benefits
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {plantInfo.uses.map((use, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800/50 dark:to-emerald-800/50 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold shadow-md cursor-default"
                        >
                          {use}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Fun Facts */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' 
                        : 'bg-gradient-to-r from-purple-50/80 to-pink-50/80'
                    } rounded-2xl p-6`}
                  >
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-6 text-xl flex items-center gap-3`}>
                      <Sparkles className="w-6 h-6 text-purple-500" />
                      Fascinating Facts
                    </h4>
                    <div className="space-y-4">
                      {plantInfo.funFacts.map((fact, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.6 + index * 0.1 }}
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
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Enhanced Default Content when no image */}
        {!selectedImage && !isLoading && !plantInfo && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-emerald-200/50'
                } backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border`}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1], 
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="w-32 h-32 mx-auto mb-8"
                >
                  <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Leaf className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
                
                <h3 className={`text-4xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                } mb-6`}>
                  Ready to Discover Plants?
                </h3>
                
                <p className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } leading-relaxed text-xl mb-12 max-w-3xl mx-auto`}>
                  Upload an image of any plant, and our advanced AI will instantly identify it for you. 
                  Get detailed information about care instructions, native regions, uses, and fascinating facts!
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Camera,
                      title: "Smart Recognition",
                      description: "Advanced AI analyzes leaf patterns, flowers, and structure",
                      color: "emerald"
                    },
                    {
                      icon: Sparkles,
                      title: "Instant Results",
                      description: "Get comprehensive plant data in under 3 seconds",
                      color: "teal"
                    },
                    {
                      icon: Heart,
                      title: "Care Guidance", 
                      description: "Receive personalized care tips for optimal plant health",
                      color: "cyan"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className={`${
                        isDarkMode ? 'bg-slate-700/50' : 'bg-white/50'
                      } backdrop-blur-sm rounded-2xl p-6 text-center`}
                    >
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <feature.icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                      </motion.div>
                      <h4 className={`font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      } mb-3 text-lg`}>
                        {feature.title}
                      </h4>
                      <p className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } text-sm leading-relaxed`}>
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-12"
                >
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
                  >
                    <Scan className="w-6 h-6" />
                    Start Identifying Plants
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Enhanced Features Section */}
        <motion.section
          ref={featuresRef}
          className="py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-5xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-6`}>
                How LeafLens Works
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed max-w-3xl mx-auto`}>
                Experience the future of plant identification with our revolutionary AI technology
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  step: "01",
                  icon: Upload,
                  title: "Capture or Upload",
                  description: "Take a clear photo of any plant or upload from your gallery",
                  color: "emerald",
                  delay: 0.1
                },
                {
                  step: "02", 
                  icon: Zap,
                  title: "AI Analysis",
                  description: "Our advanced neural networks analyze visual patterns and characteristics",
                  color: "teal",
                  delay: 0.2
                },
                {
                  step: "03",
                  icon: Eye,
                  title: "Instant Results",
                  description: "Get comprehensive plant information and care instructions instantly",
                  color: "cyan",
                  delay: 0.3
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`${
                    isDarkMode 
                      ? 'bg-slate-800/60 border-slate-700/50' 
                      : 'bg-white/60 border-white/50'
                  } backdrop-blur-xl rounded-3xl p-8 shadow-xl border relative overflow-hidden group cursor-pointer`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/10 to-${feature.color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className={`text-6xl font-black text-${feature.color}-200 dark:text-${feature.color}-800/50`}>
                        {feature.step}
                      </div>
                    </div>
                    
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4`}>
                      {feature.title}
                    </h3>
                    
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } leading-relaxed text-lg`}>
                      {feature.description}
                    </p>

                    <motion.div
                      className={`mt-6 flex items-center gap-2 text-${feature.color}-500 font-semibold group-hover:gap-3 transition-all duration-300`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Additional Info Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-5xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-6`}>
                Why Choose LeafLens?
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed max-w-3xl mx-auto`}>
                Join thousands of plant enthusiasts who trust our AI-powered identification system
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "99% Accuracy Rate",
                  description: "Our machine learning models are trained on millions of plant images for unmatched precision",
                  stats: "500K+ plants identified",
                  color: "emerald"
                },
                {
                  icon: Clock,
                  title: "Lightning Fast",
                  description: "Get results in under 3 seconds with our optimized AI processing pipeline",
                  stats: "< 3 second response time",
                  color: "blue"
                },
                {
                  icon: Globe,
                  title: "Global Coverage",
                  description: "Identify plants from every continent with our comprehensive botanical database",
                  stats: "50,000+ species covered",
                  color: "purple"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`${
                    isDarkMode 
                      ? 'bg-slate-800/60 border-slate-700/50' 
                      : 'bg-white/60 border-white/50'
                  } backdrop-blur-xl rounded-3xl p-8 shadow-xl border relative overflow-hidden group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${benefit.color}-500/10 to-${benefit.color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-br from-${benefit.color}-400 to-${benefit.color}-600 rounded-2xl flex items-center justify-center shadow-lg mb-6`}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    } mb-4`}>
                      {benefit.title}
                    </h3>
                    
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } leading-relaxed text-lg mb-6`}>
                      {benefit.description}
                    </p>

                    <div className={`inline-flex items-center gap-2 bg-${benefit.color}-100 dark:bg-${benefit.color}-900/30 px-4 py-2 rounded-full`}>
                      <div className={`w-2 h-2 bg-${benefit.color}-500 rounded-full animate-pulse`} />
                      <span className={`text-${benefit.color}-700 dark:text-${benefit.color}-300 font-semibold text-sm`}>
                        {benefit.stats}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enhanced Footer */}
        <footer className={`${
          isDarkMode 
            ? 'bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900' 
            : 'bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900'
        } text-white mt-20 relative overflow-hidden`}>
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Leaf className="w-32 h-32" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center"
                  >
                    <Leaf className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <span className="text-2xl font-bold">LeafLens</span>
                    <div className="text-sm text-emerald-300">AI Plant Identifier</div>
                  </div>
                </div>
                <p className="text-emerald-100 leading-relaxed">
                  Revolutionizing plant identification with cutting-edge AI technology. 
                  Discover, learn, and care for the green world around you with precision and ease.
                </p>
                <div className="flex space-x-4 pt-4">
                  {[
                    { icon: Twitter, color: "hover:bg-blue-600" },
                    { icon: Instagram, color: "hover:bg-pink-600" },
                    { icon: Github, color: "hover:bg-gray-600" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="https://github.com/heramb1221"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`bg-emerald-700/50 p-3 rounded-xl ${social.color} transition-all duration-300 backdrop-blur-sm`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold mb-6 text-emerald-200">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { icon: HomeIcon, label: "Home", href: "#" },
                    { icon: Scan, label: "Plant Scanner", href: "#scanner" },
                    { icon: BookOpen, label: "Plant Database", href: "/guide" },
                    { icon: Users, label: "Community", href: "/community" },
                    { icon: Award, label: "Premium", href: "#premium" }
                  ].map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href} 
                        whileHover={{ x: 5 }}
                        className="text-emerald-100 hover:text-white transition-colors flex items-center gap-3 py-1"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-bold mb-6 text-emerald-200">Features</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Sparkles, label: "99% AI Accuracy" },
                    { icon: Zap, label: "Instant Recognition" },
                    { icon: Heart, label: "Care Instructions" },
                    { icon: Globe, label: "Global Database" },
                    { icon: Shield, label: "Offline Mode" }
                  ].map((feature) => (
                    <li key={feature.label}>
                      <span className="text-emerald-100 flex items-center gap-3 py-1">
                        <feature.icon className="w-4 h-4 text-emerald-400" />
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact & Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-6 text-emerald-200">Connect With Us</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-emerald-100 font-medium">Email</p>
                      <p className="text-sm text-emerald-300">hello@leaflens.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-emerald-100 font-medium">Service</p>
                      <p className="text-sm text-emerald-300">Available Worldwide</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "500K+", label: "Plants ID'd" },
                    { number: "50K+", label: "Happy Users" },
                    { number: "99%", label: "Accuracy" },
                    { number: "24/7", label: "Support" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center bg-emerald-800/30 rounded-xl p-3 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-emerald-300">{stat.number}</div>
                      <div className="text-xs text-emerald-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-t border-emerald-700/50 mt-12 pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-emerald-200 text-sm">
                  <span>© 2025 LeafLens AI. All rights reserved.</span>
                  <span>•</span>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.05 }}
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </motion.a>
                  <span>•</span>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.05 }}
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </motion.a>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-emerald-200 text-sm"
                >
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <span>Made with passion for plant enthusiasts worldwide</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  )
}