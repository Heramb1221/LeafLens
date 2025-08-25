'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Award, Check, X, HelpCircle, ArrowRight, Clock, Star, Trophy, Brain } from 'lucide-react'
import Link from 'next/link'

interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'identification'
  question: string
  imageUrl?: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export default function QuizPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // seconds per question
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  useEffect(() => {
    const mockQuestions: QuizQuestion[] = [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'Which of these plants is known for its air-purifying qualities?',
        options: ['Rose', 'Snake Plant', 'Tulip', 'Sunflower'],
        correctAnswer: 'Snake Plant',
        explanation: 'Snake Plants are excellent air purifiers, removing toxins like formaldehyde and benzene from the air.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: '2',
        type: 'true-false',
        question: 'Cacti are only native to desert regions in North America.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'While many cacti are native to North American deserts, they can also be found in South America and other parts of the world.',
        difficulty: 'medium',
        points: 15
      },
      {
        id: '3',
        type: 'multiple-choice',
        question: 'Which part of a plant conducts photosynthesis?',
        options: ['Roots', 'Stem', 'Leaves', 'Flowers'],
        correctAnswer: 'Leaves',
        explanation: 'Leaves are the primary site of photosynthesis in most plants, containing chlorophyll that captures sunlight.',
        difficulty: 'easy',
        points: 10
      },
      {
        id: '4',
        type: 'identification',
        question: 'What is this plant commonly known as?',
        imageUrl: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb',
        correctAnswer: 'Monstera',
        explanation: 'This is a Monstera Deliciosa, also known as the Swiss Cheese Plant due to its distinctive leaf holes.',
        difficulty: 'medium',
        points: 20
      },
      {
        id: '5',
        type: 'multiple-choice',
        question: 'Which of these is NOT a common method of plant reproduction?',
        options: ['Seeds', 'Spores', 'Cuttings', 'Crystallization'],
        correctAnswer: 'Crystallization',
        explanation: 'Crystallization is not a method of plant reproduction. Plants reproduce through seeds, spores, cuttings, and other methods.',
        difficulty: 'hard',
        points: 25
      },
    ]
    
    setQuestions(mockQuestions)
  }, [])

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (quizStarted && !isAnswerSubmitted && !quizCompleted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && !isAnswerSubmitted) {
      handleSubmitAnswer()
    }
    
    return () => clearTimeout(timer)
  }, [quizStarted, timeLeft, isAnswerSubmitted, quizCompleted])
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
  }
  
  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizCompleted(false)
    setTimeLeft(30)
  }
  
  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer)
    }
  }
  
  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points)
    }
  }
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
    }
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-gray-800'
    }`}>
      {/* Navigation Bar - Similar to main page */}
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
              <Link href="/quiz" className={`${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'} font-medium`}>
                Quiz
              </Link>
              <Link href="/exchange" className={`${isDarkMode ? 'text-gray-300 hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}>
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
      <div className="pt-24 px-4 pb-12 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!quizStarted && !quizCompleted && (
            <motion.div
              key="quiz-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Plant Knowledge Quiz
                </h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
                  Test your knowledge about plants with our daily quiz challenge. Answer questions correctly to earn points and badges!
                </p>
              </div>
              
              <div className={`${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-gray-200'} border rounded-xl p-6 shadow-lg mb-8`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Quiz Rules
                </h2>
                <ul className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-left mb-6`}>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Answer 5 questions about plants and botany</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Each question has a 30-second time limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Points are awarded based on question difficulty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Earn badges for high scores and streaks</span>
                  </li>
                </ul>
                
                <div className="flex justify-center">
                  <button
                    onClick={startQuiz}
                    className={`px-6 py-3 rounded-xl ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'} text-white font-semibold transition-colors flex items-center gap-2`}
                  >
                    Start Quiz <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: <Trophy className="w-6 h-6 text-yellow-500" />, title: 'Leaderboard', description: 'Compete with other plant enthusiasts' },
                  { icon: <Award className="w-6 h-6 text-emerald-500" />, title: 'Earn Badges', description: 'Collect achievements as you learn' },
                  { icon: <Brain className="w-6 h-6 text-purple-500" />, title: 'Daily Challenges', description: 'New questions every day' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white/60 border-gray-200'} border rounded-xl p-4 shadow-md`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {feature.icon}
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {feature.title}
                      </h3>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {quizStarted && !quizCompleted && currentQuestion && (
            <motion.div
              key="quiz-question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Question {currentQuestionIndex + 1}/{questions.length}
                  </span>
                </div>
                
                <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md flex items-center gap-2`}>
                  <Clock className={`w-4 h-4 ${timeLeft < 10 ? 'text-red-500' : isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className={`font-medium ${timeLeft < 10 ? 'text-red-500' : isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {timeLeft}s
                  </span>
                </div>
                
                <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md flex items-center gap-2`}>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Score: {score}
                  </span>
                </div>
              </div>
              
              <div className={`${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-gray-200'} border rounded-xl p-6 shadow-lg mb-6`}>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' : currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                      {currentQuestion.points} points
                    </span>
                  </div>
                  
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                    {currentQuestion.question}
                  </h2>
                  
                  {currentQuestion.imageUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <img
                        src={currentQuestion.imageUrl}
                        alt="Quiz question image"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-lg transition-all ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-emerald-50'} ${
                        selectedAnswer === option
                          ? isAnswerSubmitted
                            ? option === currentQuestion.correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-red-100 border-red-500 text-red-800'
                            : isDarkMode
                              ? 'bg-emerald-800/50 border-emerald-500'
                              : 'bg-emerald-100 border-emerald-500'
                          : isDarkMode
                            ? 'bg-slate-700/30 border-slate-600'
                            : 'bg-white border-gray-200'
                      } border`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswerSubmitted && (
                          option === currentQuestion.correctAnswer
                            ? <Check className="w-5 h-5 text-green-600" />
                            : selectedAnswer === option
                              ? <X className="w-5 h-5 text-red-600" />
                              : null
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {isAnswerSubmitted && (
                  <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
                        {selectedAnswer === currentQuestion.correctAnswer
                          ? <Check className="w-5 h-5 text-green-600" />
                          : <X className="w-5 h-5 text-red-600" />
                        }
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
                          {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'} text-white font-medium transition-colors flex items-center gap-2`}
                      >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {quizCompleted && (
            <motion.div
              key="quiz-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Quiz Completed!
                </h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
                  You've completed the plant knowledge quiz. Here's how you did:
                </p>
              </div>
              
              <div className={`${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-gray-200'} border rounded-xl p-6 shadow-lg mb-8`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <div className="text-4xl font-bold text-emerald-500 mb-2">{score}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Score</div>
                  </div>
                  
                  <div className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <div className="text-4xl font-bold text-emerald-500 mb-2">
                      {Math.round((score / questions.reduce((acc, q) => acc + q.points, 0)) * 100)}%
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</div>
                  </div>
                  
                  <div className={`${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <div className="text-4xl font-bold text-emerald-500 mb-2">
                      {score >= 70 ? 'Expert' : score >= 40 ? 'Intermediate' : 'Beginner'}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Knowledge Level</div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={startQuiz}
                    className={`px-6 py-3 rounded-xl ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'} text-white font-semibold transition-colors flex items-center gap-2`}
                  >
                    Try Again <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <Link href="/">
                    <button
                      className={`px-6 py-3 rounded-xl ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold transition-colors`}
                    >
                      Back to Home
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}