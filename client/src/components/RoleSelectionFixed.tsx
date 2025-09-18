import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Building } from "lucide-react";

interface RoleSelectionProps {
  onSelectMode: (mode: 'user' | 'vendor') => void;
}

export default function RoleSelection({ onSelectMode }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">SmartPark</h1>
              <p className="text-gray-600">Choose your journey</p>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to SmartPark
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          India's #1 Smart Parking Solution
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* User Card */}
        <Card className="relative overflow-hidden border shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white h-80 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => onSelectMode('user')}>
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">I NEED PARKING</h3>
                <p className="text-white/80 text-sm">पार्किंग खोजें व तुरंत बुक करें</p>
              </div>
            </div>
            
            <div className="mb-6 space-y-2">
              <p className="text-white/90 text-sm">✓ 2M+ verified parking spots</p>
              <p className="text-white/90 text-sm">✓ Book in 30 seconds</p>
              <p className="text-white/90 text-sm">✓ Starting from ₹20/hour</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">📍 Find spots instantly</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">⏱️ Book in 30 seconds</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">💰 From ₹20/hour</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">🛡️ Secure & verified</span>
              </div>
            </div>

            <Button className="w-full h-12 text-sm bg-white/20 hover:bg-white/30 text-white border-0">
              <Car className="h-4 w-4 mr-2" />
              Find Parking Now
            </Button>
          </CardContent>
        </Card>

        {/* Vendor Card */}
        <Card className="relative overflow-hidden border shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white h-80 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => onSelectMode('vendor')}>
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">I HAVE SPACE</h3>
                <p className="text-white/80 text-sm">अपनी पार्किंग से पैसे कमाएं</p>
              </div>
            </div>
            
            <div className="mb-6 space-y-2">
              <p className="text-white/90 text-sm">✓ Earn ₹500-2000/month</p>
              <p className="text-white/90 text-sm">✓ 2M+ active users</p>
              <p className="text-white/90 text-sm">✓ Instant payouts & 24/7 support</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">📈 Earn ₹500-2000/month</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">👥 2M+ active users</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">⭐ 24/7 support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-white/90">⚡ Instant payouts</span>
              </div>
            </div>

            <Button className="w-full h-12 text-sm bg-white/20 hover:bg-white/30 text-white border-0">
              <Building className="h-4 w-4 mr-2" />
              Start Earning Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-blue-600">2M+</div>
          <p className="text-sm text-gray-600">Happy Users</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-green-600">50K+</div>
          <p className="text-sm text-gray-600">Parking Spots</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-blue-600">24/7</div>
          <p className="text-sm text-gray-600">Support</p>
        </div>
      </div>
    </div>
  );
}
