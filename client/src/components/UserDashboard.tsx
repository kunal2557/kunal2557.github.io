import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  User, 
  Mic, 
  Globe,
  Navigation,
  Star,
  Users,
  Clock,
  IndianRupee,
  ChevronUp,
  ChevronDown
} from "lucide-react";

interface UserDashboardProps {
  onShowBooking: () => void;
  onSwitchToVendor: () => void;
  onShowProfile: () => void;
}

// Mock parking spots data //todo: remove mock functionality
const parkingSpots = [
    {
      id: '1',
      name: 'Premium Spot - CP',
      distance: '50m away',
      price: 45,
      type: 'premium',
      rating: 4.8,
      reviews: 124,
      viewers: 3,
      availability: 'available'
    },
    {
      id: '2', 
      name: 'Saver Parking',
      distance: '300m away', 
      price: 25,
      type: 'saver',
      rating: 4.2,
      reviews: 67,
      viewers: 8,
      availability: 'limited'
    },
    {
      id: '3',
      name: 'Suggested Spot',
      distance: '150m away',
      price: 35,
      type: 'suggested', 
      rating: 4.6,
      reviews: 89,
      viewers: 2,
      availability: 'available'
    }
  ];

export default function UserDashboard({ onShowBooking, onSwitchToVendor, onShowProfile }: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [spotsExpanded, setSpotsExpanded] = useState(true);
  const [filteredSpots, setFilteredSpots] = useState(parkingSpots);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredSpots(parkingSpots);
    } else {
      const filtered = parkingSpots.filter(spot => 
        spot.name.toLowerCase().includes(query.toLowerCase()) ||
        spot.distance.toLowerCase().includes(query.toLowerCase()) ||
        spot.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSpots(filtered);
    }
  };

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
      <div className="bg-primary text-primary-foreground p-4">
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
          
          {/* Location Row with Cities */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium" data-testid="text-location">{currentContent.location}</span>
            </div>
            
            {/* City Columns */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-primary-foreground/10 rounded-lg p-2 text-center">
                <div className="font-medium">Delhi</div>
                <div className="text-xs opacity-80">234 spots</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-2 text-center">
                <div className="font-medium">Gurgaon</div>
                <div className="text-xs opacity-80">156 spots</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-2 text-center">
                <div className="font-medium">Noida</div>
                <div className="text-xs opacity-80">89 spots</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 bg-card border-b">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={currentContent.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12"
              data-testid="input-search"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" data-testid="button-voice">
              <Mic className="h-4 w-4 mr-2" />
              {currentContent.voice}
            </Button>
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
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="h-64 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20" />
        
        {/* Live Location Indicator */}
        <div className="absolute top-4 right-4 bg-card p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium text-green-600">Live</span>
          </div>
        </div>

        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping" />
          </div>
        </div>

        {/* Nearby Parking Spots */}
        <div className="absolute top-8 left-8">
          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
          <div className="bg-card px-2 py-1 rounded text-xs font-medium mt-1 shadow-sm">5 spots</div>
        </div>
        
        <div className="absolute bottom-12 right-12">
          <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-sm" />
          <div className="bg-card px-2 py-1 rounded text-xs font-medium mt-1 shadow-sm">2 spots</div>
        </div>

        <div className="absolute top-16 right-20">
          <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
          <div className="bg-card px-2 py-1 rounded text-xs font-medium mt-1 shadow-sm">Full</div>
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-card p-3 rounded-lg shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-parking-available" />
            <span>{currentContent.available} (5+)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-parking-limited" />
            <span>{currentContent.limited} (1-4)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-parking-unavailable" />
            <span>{currentContent.unavailable}</span>
          </div>
        </div>

        {/* Location Marker */}
        <div className="absolute bottom-4 right-4 bg-card p-2 rounded-full shadow-sm">
          <Navigation className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Parking Spots List - Sliding Section */}
      <div className="bg-background">
        {/* Sliding Header */}
        <div 
          className="p-4 border-t bg-card cursor-pointer hover-elevate"
          onClick={() => setSpotsExpanded(!spotsExpanded)}
          data-testid="button-toggle-spots"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-lg" data-testid="text-spots-header">
                Available Spots
              </h3>
              <Badge variant="secondary" data-testid="badge-spots-count">
                {filteredSpots.length} spots found
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {spotsExpanded ? 'Collapse' : 'Expand'}
              </span>
              {spotsExpanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            spotsExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 pt-0 space-y-3">
            {filteredSpots.map((spot) => (
              <Card 
                key={spot.id} 
                className={`hover-elevate cursor-pointer transition-all duration-200 ${
                  selectedSpot === spot.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSpot(spot.id)}
                data-testid={`card-spot-${spot.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`${getSpotColor(spot.type)} text-white`}
                          data-testid={`badge-type-${spot.type}`}
                        >
                          {spot.type === 'premium' ? currentContent.premium : 
                           spot.type === 'saver' ? currentContent.saver : 'Suggested'}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${
                            spot.availability === 'available' ? 'bg-parking-available' :
                            spot.availability === 'limited' ? 'bg-parking-limited' : 
                            'bg-parking-unavailable'
                          }`} />
                          <span className={`text-sm ${getAvailabilityColor(spot.availability)}`}>
                            {spot.availability}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium" data-testid={`text-spot-name-${spot.id}`}>
                          {spot.name}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center space-x-1" data-testid={`text-spot-distance-${spot.id}`}>
                          <MapPin className="h-3 w-3" />
                          <span>{spot.distance}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span data-testid={`text-spot-rating-${spot.id}`}>{spot.rating}</span>
                          <span className="text-muted-foreground">({spot.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span data-testid={`text-spot-viewers-${spot.id}`}>
                            {spot.viewers} {currentContent.viewingNow}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="h-4 w-4" />
                        <span className="text-xl font-bold" data-testid={`text-spot-price-${spot.id}`}>
                          {spot.price}
                        </span>
                        <span className="text-sm text-muted-foreground">/hour</span>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowBooking();
                        }}
                        size="sm"
                        className={`${getSpotColor(spot.type)} text-white hover:opacity-90`}
                        data-testid={`button-book-${spot.id}`}
                      >
                        {spot.type === 'premium' ? currentContent.reserveNow :
                         spot.type === 'saver' ? currentContent.bookSaver :
                         currentContent.bookNow}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-card border-t">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" data-testid="button-advance-booking">
            <Clock className="h-4 w-4 mr-2" />
            Advance Booking
          </Button>
          <Button className="flex-1" onClick={onShowBooking} data-testid="button-book-now">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}