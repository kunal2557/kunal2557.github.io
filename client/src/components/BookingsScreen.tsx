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
  X
} from "lucide-react";

export default function BookingsScreen() {
  // Mock bookings data
  const activeBookings = [
    {
      id: 'BK001',
      spotName: 'Premium Spot - CP',
      address: 'Connaught Place, New Delhi',
      date: 'Today',
      time: '2:30 PM - 4:30 PM',
      duration: '2 hours',
      amount: 45,
      status: 'active',
      vehicleSpot: 'A-12',
      hostName: 'Amit Kumar',
      hostPhone: '+91 98765 43210'
    },
    {
      id: 'BK002', 
      spotName: 'Saver Parking',
      address: 'Sector 18, Noida',
      date: 'Tomorrow',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      amount: 25,
      status: 'confirmed',
      vehicleSpot: 'B-07',
      hostName: 'Priya Sharma',
      hostPhone: '+91 87654 32109'
    }
  ];

  const pastBookings = [
    {
      id: 'BK003',
      spotName: 'Mall Parking',
      address: 'DLF Mall, Gurgaon',
      date: 'Yesterday',
      time: '6:00 PM - 9:00 PM',
      duration: '3 hours',
      amount: 60,
      status: 'completed'
    }
  ];

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
                          {booking.spotName}
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
                        <span>{booking.address}</span>
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{booking.date} • {booking.time}</span>
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
                    <p className="text-sm font-medium mb-2">Host: {booking.hostName}</p>
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
                    <h3 className="font-medium">{booking.spotName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{booking.address}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{booking.date} • {booking.time}</span>
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