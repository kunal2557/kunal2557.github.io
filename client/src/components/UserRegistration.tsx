import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Car, 
  Bike, 
  Truck, 
  Upload,
  Check,
  Clock,
  Shield,
  Navigation,
  Zap,
  Star,
  Loader2,
  AlertCircle
} from "lucide-react";

interface UserRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function UserRegistration({ onBack, onComplete }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    vehicleType: 'Car',
    vehicleNumber: '',
    rcUploaded: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const vehicleOptions = [
    { 
      id: 'Two-Wheeler', 
      label: 'Two-Wheeler', 
      icon: Bike,
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
    },
    { 
      id: 'Car', 
      label: 'Car', 
      icon: Car,
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
    },
    { 
      id: 'SUV', 
      label: 'SUV', 
      icon: Truck,
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      text: 'Instant booking confirmation in under 30 seconds'
    },
    {
      icon: Shield,
      text: 'Secure payments with 24/7 customer support'
    },
    {
      icon: Navigation,
      text: 'Smart navigation to your reserved parking spot'
    }
  ];

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.vehicleNumber && !/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(formData.vehicleNumber.replace(/\s/g, ''))) {
      newErrors.vehicleNumber = 'Please enter a valid vehicle number (e.g., MH12AB1234)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email || `user${Date.now()}@smartpark.com`,
          phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          vehicleType: formData.vehicleType,
          vehicleNumber: formData.vehicleNumber,
          isVerified: formData.rcUploaded
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        toast({
          title: "Registration Successful!",
          description: "Welcome to SmartPark! You've received ₹100 welcome bonus.",
        });
        onComplete();
      } else {
        const errorData = await response.json();
        toast({
          title: "Registration Failed",
          description: errorData.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="font-semibold text-lg" data-testid="text-complete-profile">
              COMPLETE PROFILE
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl" data-testid="text-profile-title">
              Complete Your Profile
            </CardTitle>
            <p className="text-muted-foreground text-sm" data-testid="text-profile-subtitle">
              Set up your account to start finding parking spots
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Rahul Sharma"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({...formData, fullName: e.target.value});
                  if (errors.fullName) {
                    setErrors({...errors, fullName: ''});
                  }
                }}
                className={errors.fullName ? 'border-red-500' : ''}
                data-testid="input-full-name"
              />
              {errors.fullName && (
                <div className="flex items-center space-x-1 text-red-500 text-sm">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email (Optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                data-testid="input-email"
              />
            </div>

            {/* Primary Vehicle */}
            <div className="space-y-3">
              <Label className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Primary Vehicle *</span>
              </Label>
              <div className="space-y-3">
                {vehicleOptions.map((vehicle) => {
                  const Icon = vehicle.icon;
                  const isSelected = formData.vehicleType === vehicle.id;
                  return (
                    <div
                      key={vehicle.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : `${vehicle.color} hover:border-gray-300`
                      }`}
                      onClick={() => setFormData({...formData, vehicleType: vehicle.id})}
                      data-testid={`option-vehicle-${vehicle.id.toLowerCase()}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>
                          {vehicle.label}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-primary ml-auto" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber" className="flex items-center space-x-2">
                <span>Vehicle Details (Optional)</span>
              </Label>
              <Input
                id="vehicleNumber"
                placeholder="DL01AB1234"
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                data-testid="input-vehicle-number"
              />
              <p className="text-xs text-muted-foreground">
                Adding vehicle number helps hosts identify your vehicle
              </p>
            </div>

            {/* Upload RC */}
            <div className="space-y-3">
              <Label className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload RC (Optional)</span>
              </Label>
              <Button 
                variant="outline" 
                className="w-full h-12 border-dashed"
                onClick={() => setFormData({...formData, rcUploaded: true})}
                data-testid="button-upload-rc"
              >
                <Upload className="h-4 w-4 mr-2" />
                {formData.rcUploaded ? 'RC Uploaded' : 'Choose File'}
              </Button>
              <p className="text-xs text-muted-foreground">
                Uploading RC helps verify your vehicle for faster bookings
              </p>
            </div>

            <Separator />

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">What You Get:</span>
              </div>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <benefit.icon className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-lg"
              disabled={!formData.fullName || isLoading}
              data-testid="button-create-account"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  CREATE ACCOUNT
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}