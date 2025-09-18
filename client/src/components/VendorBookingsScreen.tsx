import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Clock,
  MapPin,
  Car,
  Phone,
  MessageCircle,
  Check,
  X,
  Star,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  Users,
  IndianRupee,
  Eye,
  Edit,
  Send,
  Camera,
  Navigation,
  Loader2
} from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";

interface VendorBookingsScreenProps {
  onBack: () => void;
  vendorId?: string;
}

interface VendorBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicle: string;
  vehicleNumber: string;
  spotId: string;
  spotName: string;
  startTime: Date;
  endTime: Date;
  amount: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  duration: string;
  customerRating?: number;
  specialRequests?: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export default function VendorBookingsScreen({ onBack, vendorId = "demo-vendor" }: VendorBookingsScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<VendorBooking | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  // Mock data - replace with actual API calls
  const mockBookings: VendorBooking[] = [
    {
      id: 'BK001',
      customerName: 'Amit Kumar',
      customerPhone: '+91-9876543210',
      vehicle: 'Honda City',
      vehicleNumber: 'DL01AB1234',
      spotId: 'P-A15',
      spotName: 'City Mall Parking',
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      amount: 120,
      status: 'active',
      duration: '2 hours',
      customerRating: 4.8,
      paymentStatus: 'paid'
    },
    {
      id: 'BK002',
      customerName: 'Priya Sharma',
      customerPhone: '+91-9876543211',
      vehicle: 'Maruti Swift',
      vehicleNumber: 'DL02CD5678',
      spotId: 'P-B23',
      spotName: 'City Mall Parking',
      startTime: new Date(Date.now() + 60 * 60 * 1000),
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      amount: 90,
      status: 'upcoming',
      duration: '2 hours',
      paymentStatus: 'paid'
    },
    {
      id: 'BK003',
      customerName: 'Rajesh Gupta',
      customerPhone: '+91-9876543212',
      vehicle: 'Toyota Innova',
      vehicleNumber: 'DL03EF9012',
      spotId: 'P-C10',
      spotName: 'City Mall Parking',
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      amount: 160,
      status: 'completed',
      duration: '2 hours',
      customerRating: 5.0,
      paymentStatus: 'paid'
    }
  ];

  const { data: bookings = mockBookings, isLoading, error } = useQuery<VendorBooking[]>({
    queryKey: [`/api/vendor/${vendorId}/bookings`],
    enabled: !!vendorId,
    select: (data) => data || mockBookings
  });

  const filteredBookings = bookings.filter((booking: VendorBooking) => {
    const matchesTab = booking.status === selectedTab;
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const stats = {
    active: bookings.filter((b: VendorBooking) => b.status === 'active').length,
    upcoming: bookings.filter((b: VendorBooking) => b.status === 'upcoming').length,
    completed: bookings.filter((b: VendorBooking) => b.status === 'completed').length,
    totalEarnings: bookings.filter((b: VendorBooking) => b.status === 'completed').reduce((sum: number, b: VendorBooking) => sum + b.amount, 0),
    avgDuration: '2.5 hrs'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConfirmArrival = (bookingId: string) => {
    // API call to confirm customer arrival
    console.log('Confirming arrival for booking:', bookingId);
  };

  const handleExtendBooking = (bookingId: string) => {
    // API call to extend booking
    console.log('Extending booking:', bookingId);
  };

  const handleSendMessage = (bookingId: string, message: string) => {
    // API call to send message to customer
    console.log('Sending message to booking:', bookingId, message);
    setChatMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">My Bookings</h1>
            <p className="text-sm opacity-90">Manage customer reservations</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="p-4 bg-card border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center text-2xl font-bold text-primary">
                <IndianRupee className="h-5 w-5" />
                {stats.totalEarnings}
              </div>
              <div className="text-sm text-muted-foreground">Total Earned</div>
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
              placeholder="Search by customer name, vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
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
              {tab} ({bookings.filter(b => b.status === tab).length})
            </Button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4 space-y-4">
        {filteredBookings.map((booking) => (
          <AnimatedCard key={booking.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Booking Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">Booking #{booking.id}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>Slot: {booking.spotId}</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-lg font-bold">
                      <IndianRupee className="h-4 w-4" />
                      {booking.amount}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                      </div>
                    </div>
                    {booking.customerRating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{booking.customerRating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Car className="h-3 w-3" />
                      <span>{booking.vehicle} • {booking.vehicleNumber}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(booking.startTime)} • {formatTime(booking.startTime)}-{formatTime(booking.endTime)}</span>
                    </div>
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
                {booking.status === 'upcoming' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" onClick={() => handleConfirmArrival(booking.id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Confirm Arrival
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Modify
                    </Button>
                  </div>
                )}

                {booking.status === 'active' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Check className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleExtendBooking(booking.id)}>
                      <Clock className="h-4 w-4 mr-1" />
                      Extend Time
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
                      Rate Customer
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
                <h3 className="font-medium">Chat with {selectedBooking.customerName}</h3>
                <p className="text-sm text-muted-foreground">Booking #{selectedBooking.id}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="bg-muted rounded-lg p-3 max-w-xs">
                <p className="text-sm">Hi, I'm looking for slot {selectedBooking.spotId}. Where exactly is it?</p>
                <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2 mb-3">
                <Button variant="outline" size="sm">Can't find slot</Button>
                <Button variant="outline" size="sm">Running late</Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage(selectedBooking.id, chatMessage)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
