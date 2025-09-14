import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Car, 
  IndianRupee, 
  Star,
  Users,
  Wallet,
  CreditCard,
  Smartphone,
  Check,
  Navigation,
  Phone,
  MessageCircle
} from "lucide-react";

interface BookingFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function BookingFlow({ onBack, onComplete }: BookingFlowProps) {
  const [step, setStep] = useState<'search' | 'payment' | 'confirmed' | 'active'>('search');
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  // Mock booking data //todo: remove mock functionality
  const searchData = {
    destination: "Connaught Place",
    date: "Today",
    time: "2:30 PM",
    duration: "2 hours",
    vehicle: "Car"
  };

  const spots = [
    {
      id: 'premium',
      type: 'PREMIUM',
      price: 90,
      distance: '50m away',
      rating: 4.8,
      reviews: 124,
      viewers: 3,
      features: ['Guaranteed reserved spot', 'CCTV coverage', 'Covered parking']
    },
    {
      id: 'saver', 
      type: 'SAVER',
      price: 50,
      distance: '300m away',
      rating: 4.2,
      reviews: 67,
      viewers: 8,
      features: ['First-come basis', 'Open parking', 'Security guard']
    },
    {
      id: 'suggested',
      type: 'SUGGESTED', 
      price: 70,
      distance: '150m away',
      rating: 4.6,
      reviews: 89,
      viewers: 2,
      features: ['Balanced choice', 'Partially covered', 'Easy access']
    }
  ];

  const getSpotColor = (type: string) => {
    switch (type) {
      case 'PREMIUM': return 'bg-parking-premium';
      case 'SAVER': return 'bg-parking-saver';
      default: return 'bg-primary';
    }
  };

  const calculateTotal = (basePrice: number) => {
    const platformFee = 10;
    const gst = Math.round((basePrice + platformFee) * 0.18);
    return basePrice + platformFee + gst;
  };

  if (step === 'search') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
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
              <h1 className="font-semibold" data-testid="text-destination">
                {searchData.destination}
              </h1>
              <p className="text-sm opacity-90" data-testid="text-search-details">
                {searchData.date}, {searchData.time} • {searchData.duration} • {searchData.vehicle}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Button variant="outline" className="w-full mb-4" data-testid="button-modify-search">
            Modify Search
          </Button>

          <div className="space-y-4">
            {spots.map((spot) => (
              <Card 
                key={spot.id}
                className={`hover-elevate cursor-pointer transition-all duration-200 ${
                  selectedSpot === spot.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSpot(spot.id)}
                data-testid={`card-spot-${spot.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`${getSpotColor(spot.type)} text-white`}
                          data-testid={`badge-type-${spot.id}`}
                        >
                          {spot.type}
                        </Badge>
                        {spot.type === 'SUGGESTED' && (
                          <Badge variant="secondary" className="bg-parking-booking text-white">
                            <Star className="h-3 w-3 mr-1" />
                            RECOMMENDED
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center space-x-1" data-testid={`text-distance-${spot.id}`}>
                        <MapPin className="h-3 w-3" />
                        <span>{spot.distance}</span>
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{spot.rating}</span>
                          <span className="text-muted-foreground">({spot.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{spot.viewers} people viewing</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-2">
                        <IndianRupee className="h-5 w-5" />
                        <span className="text-2xl font-bold" data-testid={`text-price-${spot.id}`}>
                          {spot.price}
                        </span>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSpot(spot.id);
                          setStep('payment');
                        }}
                        className={`${getSpotColor(spot.type)} text-white hover:opacity-90`}
                        data-testid={`button-book-${spot.id}`}
                      >
                        {spot.type === 'PREMIUM' ? 'RESERVE NOW' :
                         spot.type === 'SAVER' ? 'BOOK SAVER' : 'BOOK NOW'}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {spot.features.map((feature, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        • {feature}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    const selectedSpotData = spots.find(s => s.id === selectedSpot);
    if (!selectedSpotData) return null;

    const basePrice = selectedSpotData.price;
    const platformFee = 10;
    const gst = Math.round((basePrice + platformFee) * 0.18);
    const total = basePrice + platformFee + gst;

    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setStep('search')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-back-to-search"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold" data-testid="text-payment-title">Payment</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Booking Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg" data-testid="text-booking-summary">
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium" data-testid="text-spot-name">
                    {selectedSpotData.type} Spot - CP
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid="text-booking-time">
                    {searchData.time} - 4:30 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg" data-testid="text-bill-summary">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Parking Fee:</span>
                <span data-testid="text-parking-fee">₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee:</span>
                <span data-testid="text-platform-fee">₹{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST:</span>
                <span data-testid="text-gst">₹{gst}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span data-testid="text-total">₹{total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg" data-testid="text-payment-options">
                Payment Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div 
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer ${
                  paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setPaymentMethod('wallet')}
                data-testid="option-wallet"
              >
                <Wallet className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium">Wallet</p>
                  <p className="text-sm text-muted-foreground">Balance: ₹234</p>
                </div>
                {paymentMethod === 'wallet' && <Check className="h-5 w-5 text-primary" />}
              </div>

              <div 
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer ${
                  paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setPaymentMethod('upi')}
                data-testid="option-upi"
              >
                <Smartphone className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium">UPI</p>
                  <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
                </div>
                {paymentMethod === 'upi' && <Check className="h-5 w-5 text-primary" />}
              </div>

              <div 
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setPaymentMethod('card')}
                data-testid="option-card"
              >
                <CreditCard className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium">Card</p>
                  <p className="text-sm text-muted-foreground">Credit/Debit Cards</p>
                </div>
                {paymentMethod === 'card' && <Check className="h-5 w-5 text-primary" />}
              </div>
            </CardContent>
          </Card>

          {/* Offer */}
          <Card className="border-parking-booking/20 bg-parking-booking/5">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-parking-booking flex items-center space-x-2" data-testid="text-offer">
                <Star className="h-4 w-4" />
                <span>Save 20% with Weekly Pass for ₹299!</span>
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={() => setStep('confirmed')}
            className="w-full h-12 text-lg"
            data-testid="button-confirm-booking"
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8 space-y-6">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-confirmation-title">
                Booking Confirmed!
              </h2>
              <p className="text-muted-foreground" data-testid="text-booking-id">
                Booking ID: #SP001234
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Location:</strong> Connaught Place</p>
              <p><strong>Time:</strong> 2:30 PM - 4:30 PM</p>
              <p><strong>Amount:</strong> ₹118</p>
            </div>
            <Button
              onClick={() => setStep('active')}
              className="w-full"
              data-testid="button-view-booking"
            >
              View Active Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-accent text-accent-foreground p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-accent-foreground hover:bg-accent-foreground/10"
            data-testid="button-back-to-dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold" data-testid="text-active-booking-title">
              Booking #SP001234
            </h1>
            <p className="text-sm opacity-90">Active Booking</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status */}
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="font-semibold text-accent flex items-center space-x-1" data-testid="text-booking-status">
                  <Check className="h-4 w-4" />
                  <span>Booking Confirmed</span>
                </span>
              </div>
              <p className="text-lg font-bold" data-testid="text-time-remaining">
                Reserved for: 14:32 mins
              </p>
              <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1" data-testid="text-booking-duration">
                <Clock className="h-3 w-3" />
                <span>2:30 PM - 4:30 PM</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span data-testid="text-location-title">Parking Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium" data-testid="text-location-name">Connaught Place</p>
              <p className="text-sm text-muted-foreground" data-testid="text-location-details">
                Near Gate 3, Slot A-15
              </p>
            </div>
            <Button variant="outline" className="w-full" data-testid="button-get-directions">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle data-testid="text-contact-title">Contact Host</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" data-testid="button-call-host">
                <Phone className="h-4 w-4 mr-2" />
                Call Host
              </Button>
              <Button variant="outline" className="flex-1" data-testid="button-chat-host">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={onComplete}
            className="w-full bg-accent hover:bg-accent/90"
            data-testid="button-arrived"
          >
            I've Arrived
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-destructive border-destructive hover:bg-destructive/5"
            data-testid="button-cancel-booking"
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );
}