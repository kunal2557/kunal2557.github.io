import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Building } from "lucide-react";

interface RoleSelectionProps {
  onSelectMode: (mode: 'user' | 'vendor') => void;
}

export default function RoleSelection({ onSelectMode }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SmartPark
          </h1>
          <p className="text-xl text-gray-600">
            Choose your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* User Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-500">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Car className="w-16 h-16 mx-auto text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                I'm a User
              </h2>
              <p className="text-gray-600 mb-6">
                Find and book parking spots near you
              </p>
              <Button 
                onClick={() => onSelectMode('user')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Continue as User
              </Button>
            </CardContent>
          </Card>

          {/* Vendor Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-500">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Building className="w-16 h-16 mx-auto text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                I'm a Vendor
              </h2>
              <p className="text-gray-600 mb-6">
                List your parking spaces and earn money
              </p>
              <Button 
                onClick={() => onSelectMode('vendor')}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Continue as Vendor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
