import React from 'react';
import { motion } from 'framer-motion';
import { Car, TrendingUp, Shield, Zap, MapPin, Users, Star, DollarSign, Search, CreditCard, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProfessionalLandingProps {
  onSelectMode: (mode: 'user' | 'vendor') => void;
}

const ProfessionalLanding: React.FC<ProfessionalLandingProps> = ({ onSelectMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Maximize Earnings",
      description: "Earn ₹500-₹50,000 monthly from your unused parking space. Dynamic pricing ensures maximum revenue.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Shield,
      title: "Safe & Reliable",
      description: "All bookings are verified with 24/7 support. CCTV monitoring and secure payments guaranteed.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Find and book parking in under 30 seconds. Real-time availability with smart navigation.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Thousands of parking spots near malls, offices, airports, and metro stations across India.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const stats = [
    { icon: Users, value: "2M+", label: "Active Users", color: "text-green-600" },
    { icon: Car, value: "50K+", label: "Parking Spots", color: "text-blue-600" },
    { icon: Star, value: "4.8★", label: "App Rating", color: "text-yellow-600" },
    { icon: DollarSign, value: "₹1Cr+", label: "Earned by Partners", color: "text-purple-600" }
  ];

  const steps = [
    {
      number: 1,
      title: "Search Location",
      description: "Enter your destination and find nearby parking spots with real-time availability",
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Book & Pay",
      description: "Reserve your spot instantly with secure UPI, card, or wallet payment",
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "Park with Peace",
      description: "Navigate to your spot, park safely, and enjoy your day worry-free",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8 space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">ParkEasy</h1>
          <p className="text-xl text-gray-300">Find & List Parking Spots Easily</p>
        </motion.div>

        {/* Main Action Buttons */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-md mx-auto">
          <Button
            onClick={() => onSelectMode('user')}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105"
          >
            <Car className="w-6 h-6" />
            I NEED PARKING
            <span className="text-sm opacity-80">Find parking spots</span>
          </Button>
          <Button
            onClick={() => onSelectMode('vendor')}
            className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105"
          >
            <TrendingUp className="w-6 h-6" />
            I HAVE PARKING
            <span className="text-sm opacity-80">Start earning money</span>
          </Button>
        </motion.div>

        {/* Why Choose ParkEasy Section */}
        <motion.div variants={itemVariants} className="bg-white text-gray-900 rounded-3xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Why Choose ParkEasy?</h2>
            <p className="text-gray-600">India's #1 parking solution with smart technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl p-6 space-y-4"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trusted by Millions */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Trusted by Millions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center space-y-2"
              >
                <stat.icon className={`w-8 h-8 mx-auto ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div variants={itemVariants} className="bg-white text-gray-900 rounded-3xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div className={`w-12 h-12 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ready to Get Started */}
        <motion.div variants={itemVariants} className="text-center space-y-6 bg-gray-900 rounded-3xl p-8">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg">Join millions of users who save time and earn money with ParkEasy</p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <Button
              onClick={() => onSelectMode('user')}
              className="w-full h-14 bg-white text-gray-900 hover:bg-gray-100 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              Find Parking Now
            </Button>
            <Button
              onClick={() => onSelectMode('vendor')}
              variant="outline"
              className="w-full h-14 border-white text-white hover:bg-white hover:text-gray-900 text-lg font-semibold rounded-xl transition-all duration-200"
            >
              Start Earning Today
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center text-gray-400 text-sm">
          <p>© 2024 ParkEasy. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfessionalLanding;
