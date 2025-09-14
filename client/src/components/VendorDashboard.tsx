import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Plus,
  Star,
  IndianRupee,
  Calendar,
  MapPin,
  Car,
  Clock,
  Bike,
  Truck,
  Users,
  Phone,
  MessageCircle,
  Check,
  BarChart3,
  Settings,
  Camera
} from "lucide-react";

interface VendorDashboardProps {
  onSwitchToUser: () => void;
  onBack: () => void;
}

export default function VendorDashboard({ onSwitchToUser, onBack }: VendorDashboardProps) {
  const [view, setView] = useState<'dashboard' | 'addSpace' | 'bookings'>('dashboard');
  const [spaceData, setSpaceData] = useState({
    name: '',
    address: '',
    capacity: { car: 1, bike: 0, truck: 0 },
    hourlyRate: 20,
    description: ''
  });

  // Mock data //todo: remove mock functionality
  const todayStats = {
    earnings: 456,
    bookings: 12,
    rating: 4.6
  };

  const activeBookings = [
    {
      id: '1234',
      customerName: 'Rajesh K.',
      vehicle: 'Maruti Swift',
      time: '2:30 PM - 4:30 PM',
      amount: 90,
      status: 'active'
    },
    {
      id: '1235', 
      customerName: 'Priya S.',
      vehicle: 'Honda City',
      time: '3:00 PM - 5:00 PM',
      amount: 80,
      status: 'confirmed'
    }
  ];

  const mySpaces = [
    {
      id: '1',
      name: 'Premium Parking - CP',
      address: 'Connaught Place, Delhi',
      capacity: '5 Cars, 10 Bikes',
      rate: 45,
      availability: 'Available',
      bookings: 23
    }
  ];

  if (view === 'addSpace') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-back-to-dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold" data-testid="text-add-space-title">
              List New Parking Space
            </h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Basic Details */}
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-basic-details">Basic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spaceName">Space Name</Label>
                <Input
                  id="spaceName"
                  placeholder="e.g., Premium Parking - CP"
                  value={spaceData.name}
                  onChange={(e) => setSpaceData({...spaceData, name: e.target.value})}
                  data-testid="input-space-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address with landmarks"
                  value={spaceData.address}
                  onChange={(e) => setSpaceData({...spaceData, address: e.target.value})}
                  data-testid="input-address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Easy entry/exit, CCTV available, Watchman on duty"
                  value={spaceData.description}
                  onChange={(e) => setSpaceData({...spaceData, description: e.target.value})}
                  data-testid="input-description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Capacity */}
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-capacity-title">Parking Capacity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Cars</span>
                  </Label>
                  <Input
                    type="number"
                    value={spaceData.capacity.car}
                    onChange={(e) => setSpaceData({
                      ...spaceData, 
                      capacity: {...spaceData.capacity, car: parseInt(e.target.value) || 0}
                    })}
                    data-testid="input-car-capacity"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Bike className="h-4 w-4" />
                    <span>Bikes</span>
                  </Label>
                  <Input
                    type="number"
                    value={spaceData.capacity.bike}
                    onChange={(e) => setSpaceData({
                      ...spaceData,
                      capacity: {...spaceData.capacity, bike: parseInt(e.target.value) || 0}
                    })}
                    data-testid="input-bike-capacity"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Trucks</span>
                  </Label>
                  <Input
                    type="number"
                    value={spaceData.capacity.truck}
                    onChange={(e) => setSpaceData({
                      ...spaceData,
                      capacity: {...spaceData.capacity, truck: parseInt(e.target.value) || 0}
                    })}
                    data-testid="input-truck-capacity"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-pricing-title">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={spaceData.hourlyRate}
                    onChange={(e) => setSpaceData({...spaceData, hourlyRate: parseInt(e.target.value) || 0})}
                    data-testid="input-hourly-rate"
                  />
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-sm">
                <p><strong>Revenue Breakdown:</strong></p>
                <p>Your Rate: ₹{spaceData.hourlyRate}/hour</p>
                <p>Platform Fee: ₹{Math.round(spaceData.hourlyRate * 0.15)} (15%)</p>
                <p><strong>Your Earning: ₹{spaceData.hourlyRate - Math.round(spaceData.hourlyRate * 0.15)}/hour</strong></p>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-photos-title">Photos (Minimum 3)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-24 flex-col" data-testid="button-add-photo-1">
                  <Camera className="h-6 w-6 mb-2" />
                  <span className="text-xs">Entry Gate</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col" data-testid="button-add-photo-2">
                  <Camera className="h-6 w-6 mb-2" />
                  <span className="text-xs">Space View</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col" data-testid="button-add-photo-3">
                  <Camera className="h-6 w-6 mb-2" />
                  <span className="text-xs">Add More</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => {
              console.log('Space added:', spaceData);
              setView('dashboard');
            }}
            className="w-full h-12 text-lg"
            disabled={!spaceData.name || !spaceData.address}
            data-testid="button-submit-space"
          >
            List Parking Space
          </Button>
        </div>
      </div>
    );
  }

  if (view === 'bookings') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-back-from-bookings"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold" data-testid="text-bookings-title">
              Manage Bookings
            </h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-lg" data-testid="text-active-bookings">
            Active Bookings ({activeBookings.length})
          </h3>

          {activeBookings.map((booking) => (
            <Card key={booking.id} data-testid={`card-booking-${booking.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <p className="font-medium" data-testid={`text-booking-id-${booking.id}`}>
                      Booking #{booking.id}
                    </p>
                    <p className="text-sm flex items-center space-x-1" data-testid={`text-customer-${booking.id}`}>
                      <Car className="h-3 w-3" />
                      <span>{booking.customerName} - {booking.vehicle}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1" data-testid={`text-booking-time-${booking.id}`}>
                      <Clock className="h-3 w-3" />
                      <span>{booking.time}</span>
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-lg font-bold" data-testid={`text-booking-amount-${booking.id}`}>
                      ₹{booking.amount}
                    </p>
                    <Badge 
                      variant={booking.status === 'active' ? 'default' : 'secondary'}
                      data-testid={`badge-status-${booking.id}`}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-call-${booking.id}`}>
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-chat-${booking.id}`}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm" className="flex-1" data-testid={`button-confirm-${booking.id}`}>
                    <Check className="h-4 w-4 mr-1" />
                    Confirm Arrival
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold" data-testid="text-vendor-dashboard">Host Dashboard</h1>
              <p className="text-sm opacity-90">Manage your parking spaces</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSwitchToUser}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            data-testid="button-switch-user"
          >
            Switch to User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 bg-card border-b">
        <h2 className="font-semibold mb-3" data-testid="text-today-stats">Today's Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <IndianRupee className="h-4 w-4 text-accent" />
                <span className="text-lg font-bold" data-testid="text-earnings">
                  {todayStats.earnings}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 text-primary mr-1" />
                <span className="text-lg font-bold" data-testid="text-bookings-count">
                  {todayStats.bookings}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-lg font-bold" data-testid="text-rating">
                  {todayStats.rating}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-4">
        <h3 className="font-semibold" data-testid="text-quick-actions">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setView('addSpace')}
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-list-space"
          >
            <Plus className="h-6 w-6" />
            <span>List New Space</span>
          </Button>
          <Button
            onClick={() => setView('bookings')}
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-manage-bookings"
          >
            <Calendar className="h-6 w-6" />
            <span>Manage Bookings</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-view-earnings"
          >
            <BarChart3 className="h-6 w-6" />
            <span>View Earnings</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-update-pricing"
          >
            <Settings className="h-6 w-6" />
            <span>Update Pricing</span>
          </Button>
        </div>
      </div>

      {/* My Spaces */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold" data-testid="text-my-spaces">My Parking Spaces</h3>
          <Badge variant="secondary" data-testid="badge-spaces-count">
            {mySpaces.length} space(s)
          </Badge>
        </div>

        {mySpaces.map((space) => (
          <Card key={space.id} className="hover-elevate" data-testid={`card-space-${space.id}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h4 className="font-medium" data-testid={`text-space-name-${space.id}`}>
                    {space.name}
                  </h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span data-testid={`text-space-address-${space.id}`}>{space.address}</span>
                    </p>
                    <p className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span data-testid={`text-space-capacity-${space.id}`}>{space.capacity}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="h-4 w-4" />
                    <span className="font-bold" data-testid={`text-space-rate-${space.id}`}>
                      {space.rate}
                    </span>
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </div>
                  <Badge 
                    className="bg-parking-available text-white"
                    data-testid={`badge-availability-${space.id}`}
                  >
                    {space.availability}
                  </Badge>
                  <p className="text-xs text-muted-foreground" data-testid={`text-space-bookings-${space.id}`}>
                    {space.bookings} bookings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}