import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Star, 
  Shield, 
  Car, 
  Bike, 
  Truck,
  Zap,
  Camera,
  Home,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle
} from "lucide-react";

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: SearchFilters) => void;
}

interface SearchFilters {
  location: string;
  priceRange: [number, number];
  duration: string;
  rating: number;
  amenities: string[];
  vehicleTypes: string[];
  availability: string;
  security: string[];
}

export default function AdvancedSearch({ isOpen, onClose, onApplyFilters }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    priceRange: [10, 100],
    duration: 'any',
    rating: 0,
    amenities: [],
    vehicleTypes: [],
    availability: 'any',
    security: []
  });

  const [activeTab, setActiveTab] = useState('location');

  const amenities = [
    { id: 'covered', label: 'Covered Parking', icon: Home, color: 'bg-blue-500' },
    { id: 'ev-charging', label: 'EV Charging', icon: Zap, color: 'bg-green-500' },
    { id: 'valet', label: 'Valet Service', icon: Car, color: 'bg-purple-500' },
    { id: 'wash', label: 'Car Wash', icon: Camera, color: 'bg-orange-500' }
  ];

  const securityFeatures = [
    { id: 'cctv', label: 'CCTV Surveillance', icon: Camera },
    { id: 'security-guard', label: 'Security Guard', icon: Shield },
    { id: 'well-lit', label: 'Well Lit Area', icon: Zap }
  ];

  const vehicleTypes = [
    { id: 'car', label: 'Car', icon: Car, color: 'text-blue-500' },
    { id: 'bike', label: 'Motorcycle', icon: Bike, color: 'text-green-500' },
    { id: 'truck', label: 'Truck/Van', icon: Truck, color: 'text-orange-500' }
  ];

  const durations = [
    { id: 'any', label: 'Any Duration' },
    { id: '1hr', label: '1 Hour' },
    { id: '2hr', label: '2 Hours' },
    { id: '4hr', label: '4 Hours' },
    { id: 'day', label: 'Full Day' }
  ];

  const availabilityOptions = [
    { id: 'any', label: 'Any Time' },
    { id: 'instant', label: 'Available Now' },
    { id: 'advance', label: 'Advance Booking' },
    { id: '24-7', label: '24/7 Available' }
  ];

  const tabs = [
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'price', label: 'Price', icon: IndianRupee },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'vehicle', label: 'Vehicle', icon: Car }
  ];

  const toggleAmenity = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const toggleSecurity = (securityId: string) => {
    setFilters(prev => ({
      ...prev,
      security: prev.security.includes(securityId)
        ? prev.security.filter(id => id !== securityId)
        : [...prev.security, securityId]
    }));
  };

  const toggleVehicleType = (vehicleId: string) => {
    setFilters(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(vehicleId)
        ? prev.vehicleTypes.filter(id => id !== vehicleId)
        : [...prev.vehicleTypes, vehicleId]
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      priceRange: [10, 100],
      duration: 'any',
      rating: 0,
      amenities: [],
      vehicleTypes: [],
      availability: 'any',
      security: []
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-background rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                    >
                      <SlidersHorizontal className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold">Advanced Search</h2>
                      <p className="text-primary-foreground/80 text-sm">Find perfect parking spots</p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-primary-foreground hover:bg-white/20 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>

                {/* Tab Navigation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex space-x-2 mt-4 overflow-x-auto"
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                          activeTab === tab.id
                            ? 'bg-white/20 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/15'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* Location Tab */}
                  {activeTab === 'location' && (
                    <motion.div
                      key="location"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>Location & Distance</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search location..."
                              value={filters.location}
                              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                              className="pl-10"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Maximum Distance</label>
                            <div className="px-3">
                              <Slider
                                value={[5]}
                                max={20}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>500m</span>
                                <span>5km</span>
                                <span>20km</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span>Availability</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            {availabilityOptions.map((option) => (
                              <motion.div
                                key={option.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant={filters.availability === option.id ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setFilters(prev => ({ ...prev, availability: option.id }))}
                                  className="w-full"
                                >
                                  {option.label}
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Price Tab */}
                  {activeTab === 'price' && (
                    <motion.div
                      key="price"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <IndianRupee className="h-5 w-5 text-primary" />
                            <span>Price Range</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <div className="px-3">
                              <Slider
                                value={filters.priceRange}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                                max={200}
                                min={5}
                                step={5}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm font-medium mt-2">
                                <span>₹{filters.priceRange[0]}/hr</span>
                                <span>₹{filters.priceRange[1]}/hr</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" size="sm" onClick={() => setFilters(prev => ({ ...prev, priceRange: [5, 25] }))}>
                              Budget
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setFilters(prev => ({ ...prev, priceRange: [25, 60] }))}>
                              Standard
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setFilters(prev => ({ ...prev, priceRange: [60, 200] }))}>
                              Premium
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span>Duration</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            {durations.map((duration) => (
                              <motion.div
                                key={duration.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant={filters.duration === duration.id ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setFilters(prev => ({ ...prev, duration: duration.id }))}
                                  className="w-full"
                                >
                                  {duration.label}
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Features Tab */}
                  {activeTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Star className="h-5 w-5 text-primary" />
                            <span>Minimum Rating</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex space-x-2">
                            {[0, 3, 4, 4.5].map((rating) => (
                              <motion.div
                                key={rating}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  variant={filters.rating === rating ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setFilters(prev => ({ ...prev, rating }))}
                                  className="flex items-center space-x-1"
                                >
                                  <Star className="h-3 w-3" />
                                  <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Home className="h-5 w-5 text-primary" />
                            <span>Amenities</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            {amenities.map((amenity) => {
                              const Icon = amenity.icon;
                              const isSelected = filters.amenities.includes(amenity.id);
                              return (
                                <motion.div
                                  key={amenity.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleAmenity(amenity.id)}
                                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                    isSelected
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${amenity.color}`}>
                                      <Icon className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium">{amenity.label}</span>
                                    {isSelected && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto"
                                      >
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                      </motion.div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <span>Security Features</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {securityFeatures.map((feature) => {
                              const Icon = feature.icon;
                              const isSelected = filters.security.includes(feature.id);
                              return (
                                <motion.div
                                  key={feature.id}
                                  whileHover={{ scale: 1.01 }}
                                  className="flex items-center justify-between p-3 rounded-lg border"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{feature.label}</span>
                                  </div>
                                  <Switch
                                    checked={isSelected}
                                    onCheckedChange={() => toggleSecurity(feature.id)}
                                  />
                                </motion.div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Vehicle Tab */}
                  {activeTab === 'vehicle' && (
                    <motion.div
                      key="vehicle"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Car className="h-5 w-5 text-primary" />
                            <span>Vehicle Types</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {vehicleTypes.map((vehicle) => {
                              const Icon = vehicle.icon;
                              const isSelected = filters.vehicleTypes.includes(vehicle.id);
                              return (
                                <motion.div
                                  key={vehicle.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleVehicleType(vehicle.id)}
                                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                    isSelected
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <Icon className={`h-6 w-6 ${vehicle.color}`} />
                                    <span className="font-medium">{vehicle.label}</span>
                                    {isSelected && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto"
                                      >
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                      </motion.div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border-t bg-muted/30"
              >
                <div className="flex space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="w-full"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset All
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-2"
                  >
                    <Button
                      onClick={handleApplyFilters}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                    >
                      <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex items-center space-x-2"
                      >
                        <Filter className="h-4 w-4" />
                        <span>Apply Filters</span>
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
