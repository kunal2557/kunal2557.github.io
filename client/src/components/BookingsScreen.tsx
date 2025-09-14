import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Loader2
} from "lucide-react";
import type { Booking } from "@shared/schema";

interface BookingsScreenProps {
  userId?: string;
}

export default function BookingsScreen({ userId = "demo-user" }: BookingsScreenProps) {
  // Fetch bookings from API
  const { data: bookings = [], isLoading, error, refetch } = useQuery<Booking[]>({
    queryKey: ['/api/bookings/user', userId],
    enabled: !!userId,
    select: (data) => data || []
  });

  // Separate active and past bookings
  const activeBookings = bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'active'
  );
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-semibold" data-testid="text-bookings-header">
            My Bookings
          </h1>
        </div>
        <p className="text-sm opacity-80 mt-1">
          Manage your parking reservations
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Active Bookings */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg" data-testid="text-active-bookings">
            Active Bookings ({activeBookings.length})
          </h2>
          
          {activeBookings.map((booking) => (
            <Card key={booking.id} data-testid={`card-booking-${booking.id}`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium" data-testid={`text-spot-name-${booking.id}`}>
                          Parking Booking #{booking.id.slice(-4)}
                        </h3>
                        <Badge 
                          variant={booking.status === 'active' ? 'default' : 'secondary'}
                          data-testid={`badge-status-${booking.id}`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>Spot ID: {booking.spotId}</span>
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDateTime(booking.startTime, booking.endTime).date} • {formatDateTime(booking.startTime, booking.endTime).time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Car className="h-3 w-3" />
                          <span>Spot {booking.vehicleSpot}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{booking.amount}</p>
                      <p className="text-sm text-muted-foreground">{booking.duration}</p>
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium mb-2">Host Contact: {booking.hostContact || 'Not provided'}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {booking.status === 'active' && (
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Check className="h-4 w-4 mr-1" />
                        Check In
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Extend Time
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Past Bookings */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg" data-testid="text-past-bookings">
            Past Bookings
          </h2>
          
          {pastBookings.map((booking) => (
            <Card key={booking.id} className="opacity-75" data-testid={`card-past-booking-${booking.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Parking Booking #{booking.id.slice(-4)}</h3>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>Spot ID: {booking.spotId}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDateTime(booking.startTime, booking.endTime).date} • {formatDateTime(booking.startTime, booking.endTime).time}</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{booking.amount}</p>
                    <Badge variant="secondary">
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}