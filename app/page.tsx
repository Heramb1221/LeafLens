'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Camera, Leaf, Sparkles, Info, MapPin, Sun, Droplets, Thermometer } from 'lucide-react'
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
    <div className="min-h-screen p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-24 h-24 text-emerald-200"
        >
          <Leaf className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-16 h-16 text-teal-200"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Leaf className="w-12 h-12 text-emerald-600" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              PlantID
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Discover the world of plants with AI-powered identification
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
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
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Selected plant"
                      className="w-full h-64 object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetApp}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      ×
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUploadClick}
                    className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
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
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
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
                  <div className="text-center">
                    <motion.h3
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-bold text-gray-800 mb-2"
                    >
                      {plantInfo.name}
                    </motion.h3>
                    <p className="text-lg text-gray-600 italic">
                      {plantInfo.scientificName}
                    </p>
                    <p className="text-sm text-emerald-600 font-medium">
                      Family: {plantInfo.family}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-600" />
                      Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {plantInfo.description}
                    </p>
                  </div>

                  {/* Care Instructions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-gray-800">Sunlight</span>
                      </div>
                      <p className="text-sm text-gray-600">{plantInfo.care.sunlight}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-800">Water</span>
                      </div>
                      <p className="text-sm text-gray-600">{plantInfo.care.water}</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-gray-800">Temperature</span>
                      </div>
                      <p className="text-sm text-gray-600">{plantInfo.care.temperature}</p>
                    </div>
                    <div className="bg-teal-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-teal-600" />
                        <span className="font-medium text-gray-800">Humidity</span>
                      </div>
                      <p className="text-sm text-gray-600">{plantInfo.care.humidity}</p>
                    </div>
                  </div>

                  {/* Native Region */}
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      Native Region
                    </h4>
                    <p className="text-gray-700">{plantInfo.nativeRegion}</p>
                  </div>

                  {/* Uses */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Uses</h4>
                    <div className="flex flex-wrap gap-2">
                      {plantInfo.uses.map((use, index) => (
                        <span
                          key={index}
                          className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fun Facts */}
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      Fun Facts
                    </h4>
                    <ul className="space-y-1">
                      {plantInfo.funFacts.map((fact, index) => (
                        <li key={index} className="text-gray-700 text-sm">
                          • {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Default Content */}
            {!selectedImage && !isLoading && !plantInfo && (
              <div className="glass-effect rounded-2xl p-8 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 text-emerald-400"
                >
                  <Leaf className="w-full h-full" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ready to Identify Plants?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload an image of any plant, and our AI will instantly identify it for you. 
                  Get detailed information about care instructions, native regions, uses, and fascinating facts!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}