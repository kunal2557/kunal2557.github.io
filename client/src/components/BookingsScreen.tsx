import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Clock,
  MapPin,
  Car,
  Navigation,
  Phone,
  MessageCircle,
  Check,
  X,
  Loader2,
  Search,
  Filter,
  Star,
  IndianRupee,
  Calendar,
  Users,
  Send,
  Eye,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import type { Booking } from "@shared/schema";

interface BookingsScreenProps {
  userId?: string;
}

export default function BookingsScreen({ userId = "demo-user" }: BookingsScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  // Mock enhanced booking data
  const mockBookings: any[] = [
    {
      id: 'BK001',
      userId,
      spotId: 'P-A15',
      vehicleSpot: 'A-15',
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      amount: 120,
      status: 'active',
      duration: 2,
      hostContact: 'Raj Kumar (+91-9876543210)',
      spotName: 'City Mall Parking',
      spotAddress: 'Connaught Place, Delhi',
      vehicleType: 'car',
      rating: 4.8,
      createdAt: new Date()
    },
    {
      id: 'BK002',
      userId,
      spotId: 'P-B23',
      vehicleSpot: 'B-23',
      startTime: new Date(Date.now() + 60 * 60 * 1000),
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      amount: 90,
      status: 'confirmed',
      duration: 2,
      hostContact: 'Priya Sharma (+91-9876543211)',
      spotName: 'Office Complex Parking',
      spotAddress: 'Gurgaon, Haryana',
      vehicleType: 'car',
      createdAt: new Date()
    },
    {
      id: 'BK003',
      userId,
      spotId: 'P-C10',
      vehicleSpot: 'C-10',
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      amount: 160,
      status: 'completed',
      duration: 2,
      hostContact: 'Amit Gupta (+91-9876543212)',
      spotName: 'Select City Walk',
      spotAddress: 'Saket, Delhi',
      vehicleType: 'car',
      rating: 5.0,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  ];

  // Fetch bookings from API
  const { data: bookings = mockBookings, isLoading, error, refetch } = useQuery<Booking[]>({
    queryKey: ['/api/bookings/user', userId],
    enabled: !!userId,
    select: (data) => data || mockBookings
  });

  // Separate bookings by status
  const activeBookings = bookings.filter(booking => 
    booking.status === 'active'
  );
  
  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'confirmed'
  );
  
  const completedBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = 
      (selectedTab === 'active' && booking.status === 'active') ||
      (selectedTab === 'upcoming' && booking.status === 'confirmed') ||
      (selectedTab === 'completed' && (booking.status === 'completed' || booking.status === 'cancelled'));
    
    const matchesSearch = 
      booking.spotName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.spotAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vehicleSpot?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const stats = {
    active: activeBookings.length,
    upcoming: upcomingBookings.length,
    completed: completedBookings.length,
    totalSpent: completedBookings.reduce((sum, b) => sum + b.amount, 0),
    avgDuration: '2.5 hrs'
  };

  // Helper function to format date/time
  const formatDateTime = (startTime: Date, endTime: Date) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateStr = '';
    if (start.toDateString() === today.toDateString()) {
      dateStr = 'Today';
    } else if (start.toDateString() === tomorrow.toDateString()) {
      dateStr = 'Tomorrow';
    } else {
      dateStr = start.toLocaleDateString();
    }

    const timeStr = `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    return { date: dateStr, time: timeStr };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600">Error loading bookings</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const bookingDate = new Date(date);
    
    if (bookingDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (bookingDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return bookingDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-semibold" data-testid="text-bookings-header">
            F. My Bookings:
          </h1>
        </div>
        <p className="text-sm opacity-80 mt-1">
          Hello, Amit!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="p-4 bg-card border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">[CIRCLE] ACTIVE ({stats.active})</div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-sm">[PIN] City Mall</div>
              <div className="text-sm">Today 2:30-4:30 PM</div>
              <div className="text-sm">Slot: P-A15</div>
              <div className="text-sm">Status: Parked</div>
              <div className="text-xs text-blue-600">[View] [Extend] [CHAT]</div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-sm">[CALENDAR] UPCOMING (2)</div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-sm">[PIN] Office Complex</div>
              <div className="text-sm">Tomorrow 9:00-6:00</div>
              <div className="text-sm">₹120 • B-23</div>
              <div className="text-xs text-blue-600">[View] [Modify] [CHAT]</div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {(['active', 'upcoming', 'completed'] as const).map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTab(tab)}
              className="flex-1 capitalize"
            >
              {tab} ({tab === 'active' ? stats.active : tab === 'upcoming' ? stats.upcoming : stats.completed})
            </Button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4 space-y-4">
        {selectedTab === 'completed' && (
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm">[CHECK] COMPLETED (5)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">[PIN] Select City</span>
                  <span className="text-sm">Dec 12 • 2:30-5:30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">₹60 • Completed</span>
                  <div className="text-xs text-blue-600">[STAR] Rate Exp [Receipt] [Review]</div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Filter: [ALL] [Week] [Month] [Custom]
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm font-medium">[BAR_CHART] Stats:</div>
                <div className="text-sm">Total Bookings: 15</div>
                <div className="text-sm">Total Spent: ₹2,340</div>
                <div className="text-sm">Avg Duration: 3.2 hrs</div>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredBookings.map((booking: any) => (
          <AnimatedCard key={booking.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Booking Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{booking.spotName}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>Slot: {booking.vehicleSpot}</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-lg font-bold">
                      <IndianRupee className="h-4 w-4" />
                      {booking.amount}
                    </div>
                    {booking.rating && (
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{booking.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(booking.startTime)} • {formatTime(booking.startTime)}-{formatTime(booking.endTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Car className="h-3 w-3" />
                      <span>{booking.duration} hrs</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Host: </span>
                    <span>{booking.hostContact}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Navigation className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                </div>

                {/* Status-specific Actions */}
                {booking.status === 'active' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Check className="h-4 w-4 mr-1" />
                      Check Out
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Clock className="h-4 w-4 mr-1" />
                      Extend Time
                    </Button>
                  </div>
                )}

                {booking.status === 'confirmed' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Check className="h-4 w-4 mr-1" />
                      Check In
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Modify Booking
                    </Button>
                  </div>
                )}

                {booking.status === 'completed' && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Receipt
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="h-4 w-4 mr-1" />
                      Rate Experience
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </AnimatedCard>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No {selectedTab} bookings</h3>
            <p className="text-muted-foreground">
              {selectedTab === 'active' && "No active bookings at the moment."}
              {selectedTab === 'upcoming' && "No upcoming bookings scheduled."}
              {selectedTab === 'completed' && "No completed bookings found."}
            </p>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-background w-full max-w-md h-96 rounded-t-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-medium">G. Chat with Vendor:</h3>
                <p className="text-sm text-muted-foreground">{selectedBooking.spotName}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="bg-muted rounded-lg p-3 max-w-xs">
                <p className="text-sm">← Chat with Raj Kumar</p>
                <p className="text-sm">Vendor • Online</p>
              </div>
              
              <div className="space-y-2">
                <div className="bg-muted rounded-lg p-3 max-w-xs">
                  <p className="text-sm">[PIN] Active Booking</p>
                  <p className="text-sm">City Mall • P-A15</p>
                  <p className="text-sm">Time: 45 mins left</p>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Raj (3:25 PM)
                </div>
                <div className="bg-blue-100 rounded-lg p-3 max-w-xs ml-auto">
                  <p className="text-sm">Welcome to City Mall!</p>
                  <p className="text-sm">Your slot P-A15 is near the food court entrance</p>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Amit (3:26 PM)
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Thank you! I can see the slot now</p>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Raj (3:27 PM)
                </div>
                <div className="bg-blue-100 rounded-lg p-3 max-w-xs ml-auto">
                  <p className="text-sm">Great! Let me know if you need anything</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="space-y-3">
                <div className="text-sm font-medium">Quick Actions:</div>
                <div className="flex space-x-2 text-xs">
                  <Button variant="outline" size="sm">[Can't find slot]</Button>
                  <Button variant="outline" size="sm">[Need help]</Button>
                  <Button variant="outline" size="sm">[Running late]</Button>
                  <Button variant="outline" size="sm">[Thank you]</Button>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <Input
                  placeholder="Type message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline">[CAMERA]</Button>
                  <Button size="sm" variant="outline">[PIN]</Button>
                  <Button size="sm" variant="outline">[PHONE]</Button>
                  <Button size="sm">[SEND]</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}