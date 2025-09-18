import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VendorBookingsScreen from "@/components/VendorBookingsScreen";
import VendorWalletScreen from "@/components/VendorWalletScreen";
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
  Camera,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Upload,
  User,
  Mail,
  Edit,
  Save,
  X,
  Send,
  Image as ImageIcon,
  Award,
  Shield
} from "lucide-react";

interface VendorDashboardProps {
  onSwitchToUser: () => void;
  onBack: () => void;
  onShowSettings: () => void;
}

export default function VendorDashboard({ onSwitchToUser, onBack, onShowSettings }: VendorDashboardProps) {
  const [view, setView] = useState<'dashboard' | 'addSpace' | 'bookings' | 'earnings' | 'pricing' | 'profile' | 'chat' | 'vendorBookings' | 'vendorWallet'>('dashboard');
  const [spaceData, setSpaceData] = useState({
    name: '',
    address: '',
    capacity: { car: 1, bike: 0, truck: 0 },
    hourlyRate: 20,
    description: ''
  });

  const [vendorProfile, setVendorProfile] = useState({
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '+91-9876543210',
    businessName: 'City Mall Parking',
    about: 'Premium parking facility with 24/7 security, CCTV surveillance, and covered parking. Located in the heart of the city with easy access.',
    photos: [
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200'
    ],
    rating: 4.8,
    totalBookings: 1247,
    responseTime: '2 min',
    completionRate: 98.5
  });

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'user', message: 'Hi, I booked slot A-15. Where exactly is it?', time: '2:30 PM', userName: 'Amit Kumar' },
    { id: 2, sender: 'vendor', message: 'Hello Amit! Slot A-15 is near the main entrance, right side. Look for the blue sign.', time: '2:32 PM' },
    { id: 3, sender: 'user', message: 'Found it, thank you!', time: '2:35 PM', userName: 'Amit Kumar' }
  ]);

  const [newMessage, setNewMessage] = useState('');

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

  // Earnings View
  if (view === 'earnings') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Earnings Dashboard</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Total Earnings */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-green-600">₹18,450</h2>
                <p className="text-muted-foreground">Total Earnings This Month</p>
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+23% from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Week 1</span>
                  <span className="font-semibold">₹3,680</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Week 2</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">₹4,120</span>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Week 3</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">₹5,890</span>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Week 4</span>
                  <span className="font-semibold">₹4,760</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peak Hours Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Peak Hours Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>9-11 AM</span>
                  <span className="font-semibold">₹120/day avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>6-8 PM</span>
                  <span className="font-semibold text-green-600">₹180/day avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weekdays</span>
                  <span className="font-semibold">80% of income</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weekends</span>
                  <span className="font-semibold">20% of income</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout Section */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available for Payout</span>
                <span className="font-semibold text-green-600">₹15,682</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Platform Fee (15%)</span>
                <span className="text-red-600">₹2,768</span>
              </div>
              <Button className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pricing View
  if (view === 'pricing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Update Pricing</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="carRate">Car Parking Rate (₹/hour)</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="carRate"
                      type="number"
                      defaultValue="45"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bikeRate">Bike Parking Rate (₹/hour)</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bikeRate"
                      type="number"
                      defaultValue="20"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="truckRate">Truck Parking Rate (₹/hour)</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="truckRate"
                      type="number"
                      defaultValue="80"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Revenue Breakdown (Car Rate)</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Your Rate:</span>
                    <span>₹45/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (15%):</span>
                    <span>₹7/hour</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Your Earning:</span>
                    <span>₹38/hour</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Update Pricing
              </Button>
            </CardContent>
          </Card>

          {/* Dynamic Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Peak Hours (6-8 PM)</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">+20%</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Weekend Premium</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">+15%</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>High Demand Surge</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">+30%</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Vendor Profile View
  if (view === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Vendor Profile</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{vendorProfile.name}</h2>
                  <p className="text-muted-foreground">{vendorProfile.businessName}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{vendorProfile.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{vendorProfile.totalBookings} bookings</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{vendorProfile.phone}</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{vendorProfile.email}</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Your Parking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={vendorProfile.about}
                onChange={(e) => setVendorProfile({...vendorProfile, about: e.target.value})}
                rows={4}
                placeholder="Describe your parking facility, amenities, and special features..."
              />
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Description
              </Button>
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card>
            <CardHeader>
              <CardTitle>Parking Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {vendorProfile.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button size="sm" variant="outline" className="absolute top-2 right-2 h-8 w-8 rounded-full p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="aspect-video flex-col space-y-2">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Add Photo</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{vendorProfile.responseTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{vendorProfile.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Chat View
  if (view === 'chat') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Customer Chat</h1>
          </div>
        </div>

        {/* Active Booking Info */}
        <div className="p-4 bg-card border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Amit Kumar</p>
              <p className="text-sm text-muted-foreground">Slot A-15 • Active Booking</p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'vendor'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.sender === 'user' && (
                  <p className="text-xs font-semibold mb-1">{message.userName}</p>
                )}
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t">
          <div className="flex space-x-2 mb-3">
            <Button variant="outline" size="sm">Can't find slot</Button>
            <Button variant="outline" size="sm">Need help</Button>
            <Button variant="outline" size="sm">Running late</Button>
          </div>
          
          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              onClick={() => {
                if (newMessage.trim()) {
                  setChatMessages([...chatMessages, {
                    id: chatMessages.length + 1,
                    sender: 'vendor',
                    message: newMessage,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                  setNewMessage('');
                }
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // New comprehensive vendor bookings screen
  if (view === 'vendorBookings') {
    return <VendorBookingsScreen onBack={() => setView('dashboard')} vendorId="demo-vendor" />;
  }

  // New comprehensive vendor wallet screen
  if (view === 'vendorWallet') {
    return <VendorWalletScreen onBack={() => setView('dashboard')} vendorId="demo-vendor" />;
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
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setView('addSpace')}
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-add-space"
          >
            <Plus className="h-6 w-6" />
            <span>Add Space</span>
          </Button>
          <Button
            onClick={() => setView('vendorBookings')}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-blue-50 border-blue-200"
            data-testid="button-comprehensive-bookings"
          >
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-blue-600 font-medium">My Bookings</span>
          </Button>
          <Button
            onClick={() => setView('vendorWallet')}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-green-50 border-green-200"
            data-testid="button-comprehensive-wallet"
          >
            <IndianRupee className="h-6 w-6 text-green-600" />
            <span className="text-green-600 font-medium">SmartWallet</span>
          </Button>
          <Button
            onClick={() => setView('earnings')}
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-view-earnings"
          >
            <BarChart3 className="h-6 w-6" />
            <span>View Earnings</span>
          </Button>
          <Button
            onClick={() => setView('pricing')}
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-update-pricing"
          >
            <Settings className="h-6 w-6" />
            <span>Update Pricing</span>
          </Button>
          <Button
            onClick={() => setView('profile')}
            variant="outline"
            className="h-20 flex-col space-y-2"
            data-testid="button-vendor-profile"
          >
            <User className="h-6 w-6" />
            <span>My Profile</span>
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