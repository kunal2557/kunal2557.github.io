import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  MapPin, 
  Car, 
  Clock, 
  Star, 
  Filter,
  Mic,
  Globe,
  User,
  Menu,
  Eye,
  Loader2,
  Wifi,
  WifiOff,
  ChevronUp,
  ChevronDown,
  IndianRupee,
  SlidersHorizontal,
  Crosshair,
  Zap,
  Navigation,
  Phone,
  MessageCircle,
  Camera,
  Shield,
  Award,
  X,
  Bike,
  Truck
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InteractiveMap from "./InteractiveMap";
import type { ParkingSpot } from "@shared/schema";
import { useWebSocket } from "@/hooks/useWebSocket";

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

interface UserDashboardProps {
  onShowBooking: () => void;
  onSwitchToVendor: () => void;
  onShowProfile: () => void;
  onShowSettings: () => void;
  onShowAdvancedSearch: () => void;
  searchFilters: SearchFilters;
}

// Helper function to determine availability status
const getAvailabilityStatus = (availableSpots: number) => {
  if (availableSpots <= 0) return 'unavailable';
  if (availableSpots <= 2) return 'limited';
  return 'available';
};

export default function UserDashboard({ onShowBooking, onSwitchToVendor, onShowProfile, onShowSettings, onShowAdvancedSearch, searchFilters }: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [spotsExpanded, setSpotsExpanded] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({lat: 28.6139, lng: 77.2090}); // Delhi center
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');
  const [viewerCounts, setViewerCounts] = useState<{[key: string]: number}>({});

  // WebSocket for real-time updates
  const { isConnected, connectionStatus } = useWebSocket('ws://localhost:8080/ws', {
    onMessage: (message) => {
      switch (message.type) {
        case 'SPOT_UPDATE':
          // Refetch spots when updates are received
          refetch && refetch();
          break;
        case 'VIEWER_COUNT':
          setViewerCounts(prev => ({
            ...prev,
            [message.data.spotId]: message.data.count
          }));
          break;
      }
    }
  });

  // Enhanced mock parking spots with live viewer counts
  const mockParkingSpots: any[] = [
    {
      id: 'spot-1',
      name: 'City Mall Parking',
      address: 'Connaught Place, Delhi',
      city: 'Delhi',
      latitude: '28.6315',
      longitude: '77.2167',
      pricePerHour: 45,
      availableSpots: 8,
      totalSpots: '15',
      rating: 4.8,
      reviews: 234,
      spotType: 'premium',
      amenities: ['CCTV', 'Security', 'Covered'],
      distance: 0.8,
      walkTime: 3,
      viewers: Math.floor(Math.random() * 25) + 15, // 15-40 viewers
      isOpen: true,
      openHours: '24/7'
    },
    {
      id: 'spot-2',
      name: 'Metro Station Parking',
      address: 'Rajiv Chowk Metro, Delhi',
      city: 'Delhi',
      latitude: '28.6328',
      longitude: '77.2197',
      pricePerHour: 25,
      availableSpots: 12,
      totalSpots: '20',
      rating: 4.2,
      reviews: 156,
      spotType: 'saver',
      amenities: ['Security', 'Metro Access'],
      distance: 1.2,
      walkTime: 5,
      viewers: Math.floor(Math.random() * 20) + 8,
      isOpen: true,
      openHours: '5:00 AM - 11:00 PM'
    },
    {
      id: 'spot-3',
      name: 'Office Complex Premium',
      address: 'Cyber City, Gurgaon',
      city: 'Gurgaon',
      latitude: '28.4949',
      longitude: '77.0787',
      pricePerHour: 60,
      availableSpots: 3,
      totalSpots: '25',
      rating: 4.9,
      reviews: 89,
      spotType: 'premium',
      amenities: ['Valet', 'EV Charging', 'Covered', 'Security'],
      distance: 2.1,
      walkTime: 8,
      viewers: Math.floor(Math.random() * 35) + 20,
      isOpen: true,
      openHours: '24/7'
    },
    {
      id: 'spot-4',
      name: 'Select City Walk',
      address: 'Saket, Delhi',
      city: 'Delhi',
      latitude: '28.5245',
      longitude: '77.2066',
      pricePerHour: 40,
      availableSpots: 0,
      totalSpots: '30',
      rating: 4.6,
      reviews: 312,
      spotType: 'premium',
      amenities: ['Mall Access', 'Food Court', 'CCTV'],
      distance: 3.5,
      walkTime: 12,
      viewers: Math.floor(Math.random() * 45) + 25,
      isOpen: true,
      openHours: '10:00 AM - 10:00 PM'
    },
    {
      id: 'spot-5',
      name: 'Khan Market Parking',
      address: 'Khan Market, Delhi',
      city: 'Delhi',
      latitude: '28.5984',
      longitude: '77.2319',
      pricePerHour: 35,
      availableSpots: 6,
      totalSpots: '18',
      rating: 4.3,
      reviews: 178,
      spotType: 'suggested',
      amenities: ['Market Access', 'Security'],
      distance: 1.8,
      walkTime: 7,
      viewers: Math.floor(Math.random() * 18) + 12,
      isOpen: true,
      openHours: '9:00 AM - 9:00 PM'
    },
    {
      id: 'spot-6',
      name: 'DLF Mall Parking',
      address: 'DLF Phase 1, Gurgaon',
      city: 'Gurgaon',
      latitude: '28.4817',
      longitude: '77.1025',
      pricePerHour: 50,
      availableSpots: 15,
      totalSpots: '40',
      rating: 4.7,
      reviews: 267,
      spotType: 'premium',
      amenities: ['Mall Access', 'Valet', 'EV Charging'],
      distance: 4.2,
      walkTime: 15,
      viewers: Math.floor(Math.random() * 30) + 18,
      isOpen: true,
      openHours: '10:00 AM - 11:00 PM'
    },
    {
      id: 'spot-7',
      name: 'Budget Parking Zone',
      address: 'Lajpat Nagar, Delhi',
      city: 'Delhi',
      latitude: '28.5677',
      longitude: '77.2436',
      pricePerHour: 20,
      availableSpots: 22,
      totalSpots: '35',
      rating: 3.9,
      reviews: 94,
      spotType: 'saver',
      amenities: ['Basic Security'],
      distance: 2.8,
      walkTime: 10,
      viewers: Math.floor(Math.random() * 12) + 5,
      isOpen: true,
      openHours: '6:00 AM - 10:00 PM'
    },
    {
      id: 'spot-8',
      name: 'Airport Express Parking',
      address: 'New Delhi Railway Station',
      city: 'Delhi',
      latitude: '28.6431',
      longitude: '77.2197',
      pricePerHour: 30,
      availableSpots: 9,
      totalSpots: '50',
      rating: 4.1,
      reviews: 445,
      spotType: 'suggested',
      amenities: ['Railway Access', 'Security', '24/7'],
      distance: 1.5,
      walkTime: 6,
      viewers: Math.floor(Math.random() * 28) + 15,
      isOpen: true,
      openHours: '24/7'
    }
  ];

  // Fetch parking spots from API with enhanced mock data fallback
  const { data: spots = mockParkingSpots, isLoading, error, refetch } = useQuery<ParkingSpot[]>({
    queryKey: ['/api/spots', selectedCity],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/spots?city=${selectedCity}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch spots: ${response.statusText}`);
        }
        return response.json();
      } catch (error) {
        // Return enhanced mock data if API fails
        return mockParkingSpots.filter(spot => spot.city === selectedCity);
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  // City coordinates mapping
  const cityCoordinates = {
    'Delhi': { lat: 28.6139, lng: 77.2090, spots: 234 },
    'Gurgaon': { lat: 28.4595, lng: 77.0266, spots: 156 },
    'Noida': { lat: 28.5355, lng: 77.3910, spots: 89 },
    'Mumbai': { lat: 19.0760, lng: 72.8777, spots: 312 },
    'Bangalore': { lat: 12.9716, lng: 77.5946, spots: 198 },
    'Pune': { lat: 18.5204, lng: 73.8567, spots: 145 }
  };

  // Calculate filtered spots based on search, city, and filters
  const filteredSpots = spots.filter((spot: ParkingSpot) => {
    const matchesSearch = !searchQuery || 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = spot.city === selectedCity;
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter !== 'all') {
      const price = typeof spot.pricePerHour === 'string' ? parseInt(spot.pricePerHour) : spot.pricePerHour;
      if (priceFilter === 'low' && price > 20) matchesPrice = false;
      if (priceFilter === 'medium' && (price <= 20 || price > 50)) matchesPrice = false;
      if (priceFilter === 'high' && price <= 50) matchesPrice = false;
    }
    
    return matchesSearch && matchesCity && matchesPrice;
  }).sort((a: ParkingSpot, b: ParkingSpot) => {
    const priceA = typeof a.pricePerHour === 'string' ? parseInt(a.pricePerHour) || 0 : Number(a.pricePerHour) || 0;
    const priceB = typeof b.pricePerHour === 'string' ? parseInt(b.pricePerHour) || 0 : Number(b.pricePerHour) || 0;
    if (sortBy === 'price') return priceA - priceB;
    if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
    return 0; // distance sorting would need coordinates
  });

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold">Unable to Load Parking Spots</h3>
            <p className="text-muted-foreground">
              We're having trouble connecting to our servers. Please check your internet connection and try again.
            </p>
            <Button onClick={() => refetch()} className="w-full">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">SmartPark</span>
                <span className="text-primary-foreground/80">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading skeleton */}
        <div className="p-4 space-y-4">
          <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Loading parking spots...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">SmartPark</span>
                <span className="text-primary-foreground/80">Delhi NCR</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <p className="text-red-600">Error loading parking spots</p>
            <Button onClick={refetch}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const content = {
    en: {
      location: "Delhi NCR",
      searchPlaceholder: "Where do you want to park?",
      voice: "Voice",
      available: "Available",
      limited: "Few Left", 
      unavailable: "Full",
      premium: "Premium",
      saver: "Saver",
      bookNow: "BOOK NOW",
      reserveNow: "RESERVE NOW",
      bookSaver: "BOOK SAVER",
      viewingNow: "people viewing"
    },
    hi: {
      location: "दिल्ली एनसीआर",
      searchPlaceholder: "आप कहाँ पार्क करना चाहते हैं?",
      voice: "आवाज़",
      available: "उपलब्ध",
      limited: "कम बचे",
      unavailable: "भरा हुआ",
      premium: "प्रीमियम", 
      saver: "बचत",
      bookNow: "अभी बुक करें",
      reserveNow: "रिज़र्व करें",
      bookSaver: "बचत बुक करें",
      viewingNow: "लोग देख रहे हैं"
    }
  };

  const currentContent = content[language];

  const getSpotColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-parking-premium';
      case 'saver': return 'bg-parking-saver';
      default: return 'bg-primary';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-parking-available';
      case 'limited': return 'text-parking-limited';
      case 'unavailable': return 'text-parking-unavailable';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-40">
        <div className="space-y-2">
          {/* Greeting Row */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold" data-testid="text-greeting">
                {language === 'en' ? 'Hello, Rahul!' : 'नमस्ते, राहुल!'}
              </h1>
              <p className="text-sm opacity-80" data-testid="text-time-greeting">
                {new Date().getHours() < 12 
                  ? (language === 'en' ? 'Good Morning' : 'सुप्रभात') 
                  : new Date().getHours() < 17 
                  ? (language === 'en' ? 'Good Afternoon' : 'शुभ दोपहर') 
                  : (language === 'en' ? 'Good Evening' : 'शुभ संध्या')}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowProfile}
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Input
                  placeholder={language === 'en' ? "Search parking spots..." : "पार्किंग स्पॉट खोजें..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-primary-foreground/10 border-none text-primary-foreground placeholder:text-primary-foreground/60"
                  data-testid="input-search"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-primary-foreground hover:bg-primary-foreground/10 ${showFilters ? 'bg-primary-foreground/20' : ''}`}
                data-testid="button-filters"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Filters' : 'फिल्टर'}
              </Button>
            </div>
            <Select value={selectedCity} onValueChange={(value) => {
              setSelectedCity(value);
              const coords = cityCoordinates[value as keyof typeof cityCoordinates];
              if (coords) {
                setMapCenter({ lat: coords.lat, lng: coords.lng });
              }
            }}>
              <SelectTrigger className="w-32 bg-primary-foreground/10 border-none text-primary-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(cityCoordinates).map(([city, data]) => (
                  <SelectItem key={city} value={city}>
                    <div className="flex flex-col">
                      <span className="font-medium">{city}</span>
                      <span className="text-xs opacity-70">{data.spots} spots</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick City Stats */}
          <div className="flex items-center justify-between text-xs opacity-80">
            <span>{cityCoordinates[selectedCity as keyof typeof cityCoordinates]?.spots || 0} parking spots available</span>
            <span>{filteredSpots.length} nearby</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 bg-card border-b">
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={currentContent.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-20 h-12 bg-background/95 backdrop-blur-sm text-sm md:text-base"
              data-testid="input-search"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="h-8 px-2 touch-manipulation">
                <Mic className="h-4 w-4" />
                <span className="ml-1 text-xs hidden sm:inline">{currentContent.voice}</span>
              </Button>
            </div>
          </div>  
          {/* Enhanced Filter Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" data-testid="button-voice">
                <Mic className="h-4 w-4 mr-2" />
                {currentContent.voice}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                      });
                      setMapCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                      });
                    });
                  }
                }}
              >
                <Crosshair className="h-4 w-4 mr-2" />
                {language === 'en' ? 'My Location' : 'मेरी स्थिति'}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              data-testid="button-language"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>

          {/* Advanced Filters - Fixed Overlay */}
          {showFilters && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg p-4 z-50">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <Select value={priceFilter} onValueChange={(value) => setPriceFilter(value as 'all' | 'low' | 'medium' | 'high')}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">₹0-20/hr</SelectItem>
                      <SelectItem value="medium">₹20-50/hr</SelectItem>
                      <SelectItem value="high">₹50+/hr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'distance' | 'price' | 'rating')}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setPriceFilter('all');
                    setSortBy('distance');
                  }}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="relative">
        <InteractiveMap
          center={mapCenter}
          userLocation={userLocation}
          parkingSpots={filteredSpots}
          onSpotClick={(spot) => {
            onShowBooking();
          }}
          selectedSpot={null}
          className="h-64 w-full rounded-lg"
        />

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
          <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
            <Zap className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="w-8 h-8 p-0"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  });
                  setMapCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  });
                });
              }
            }}
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Floating Spots Counter */}
        <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full shadow-sm z-10">
          <span className="text-sm font-medium">
            {filteredSpots.length} spots nearby
          </span>
        </div>
        <div className="absolute top-16 right-16">
          <div className="relative group">
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ₹25/hr • Full
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-card p-2 rounded-lg shadow-sm z-10">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-parking-premium rounded-full"></div>
              <span>Premium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-parking-saver rounded-full"></div>
              <span>Saver</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Suggested</span>
            </div>
          </div>
        </div>

        {/* Available Spots Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Available Spots</h3>
                <p className="text-sm text-muted-foreground">
                  {filteredSpots.length} spots found
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {filteredSpots.map((spot) => (
              <Card 
                key={spot.id} 
                className={`rounded-lg border transition-all duration-200 cursor-pointer hover-lift ${
                  spot.availableSpots <= 0 
                    ? 'border-red-200 bg-red-50' 
                    : spot.availableSpots <= 2 
                      ? 'border-yellow-200 bg-yellow-50' 
                      : 'border-green-200 bg-green-50'
                }`}
                onClick={() => {
                  setSelectedSpot(spot);
                  setShowVendorDetails(true);
                }}
                data-testid={`card-spot-${spot.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`${getSpotColor(spot.spotType)} text-white`}
                          data-testid={`badge-type-${spot.spotType}`}
                        >
                          {spot.spotType === 'premium' ? currentContent.premium : 
                           spot.spotType === 'saver' ? currentContent.saver : 'Suggested'}
                        </Badge>
                        
                        {/* Real-time viewer count */}
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{Math.floor(Math.random() * 20) + 5} viewing now</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-base" data-testid={`text-spot-name-${spot.id}`}>
                          {spot.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{spot.rating || '4.5'}</span>
                          <span className="text-xs text-muted-foreground">({spot.reviews || 89})</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground" data-testid={`text-spot-address-${spot.id}`}>
                        {spot.address}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">2 min walk</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Car className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{spot.availableSpots}/{spot.totalSpots} available</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="h-4 w-4" />
                            <span className="font-semibold text-lg">{spot.pricePerHour}</span>
                            <span className="text-sm text-muted-foreground">/hr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      <Badge 
                        className={`${getAvailabilityColor(getAvailabilityStatus(spot.availableSpots))} text-xs px-2 py-1`}
                        variant="outline"
                        data-testid={`badge-availability-${spot.id}`}
                      >
                        {getAvailabilityStatus(spot.availableSpots) === 'available' ? currentContent.available :
                         getAvailabilityStatus(spot.availableSpots) === 'limited' ? currentContent.limited :
                         currentContent.unavailable}
                      </Badge>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowBooking();
                        }}
                        disabled={spot.availableSpots <= 0}
                        data-testid={`button-book-${spot.id}`}
                      >
                        {spot.spotType === 'premium' ? currentContent.reserveNow :
                         spot.spotType === 'saver' ? currentContent.bookSaver :
                         currentContent.bookNow}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredSpots.length === 0 && (
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No parking spots found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Details Popup */}
      {showVendorDetails && selectedSpot && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowVendorDetails(false)}>
          <div 
            className="bg-background w-full max-h-[80vh] rounded-t-3xl p-6 space-y-6 overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{selectedSpot.name}</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowVendorDetails(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Vendor Profile */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Raj Kumar</h3>
                  <p className="text-sm text-muted-foreground">City Mall Parking</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">1,247 bookings</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-3">
                <h4 className="font-semibold">Parking Photos</h4>
                <div className="flex space-x-3 overflow-x-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-shrink-0 w-24 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="space-y-2">
                <h4 className="font-semibold">About This Parking</h4>
                <p className="text-sm text-muted-foreground">
                  Premium parking facility with 24/7 security, CCTV surveillance, and covered parking. 
                  Located in the heart of the city with easy access to shopping mall and metro station.
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h4 className="font-semibold">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>24/7 Security</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Camera className="h-3 w-3" />
                    <span>CCTV</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>EV Charging</span>
                  </Badge>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{selectedSpot.pricePerHour}
                    </div>
                    <div className="text-sm text-muted-foreground">per hour</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedSpot.availableSpots}
                    </div>
                    <div className="text-sm text-muted-foreground">spots available</div>
                  </CardContent>
                </Card>
              </div>

              {/* Vehicle Types */}
              <div className="space-y-3">
                <h4 className="font-semibold">Vehicle Types Supported</h4>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Cars</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bike className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Bikes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Trucks</span>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <Button 
                className="w-full h-12 text-lg"
                onClick={() => {
                  setShowVendorDetails(false);
                  onShowBooking();
                }}
              >
                Book Now - ₹{selectedSpot.pricePerHour}/hour
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}