import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Shield, User, Building2 } from "lucide-react";

interface AuthScreenProps {
  mode: 'user' | 'vendor';
  onBack: () => void;
  onLogin: () => void;
}

export default function AuthScreen({ mode, onBack, onLogin }: AuthScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'register' | 'comprehensive-registration'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    vehicleType: 'Car'
  });

  // Use useEffect to handle navigation to avoid setState during render
  useEffect(() => {
    if (step === 'comprehensive-registration') {
      onLogin(); // This will trigger the comprehensive registration in App.tsx
    }
  }, [step, onLogin]);

  const isUser = mode === 'user';

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      console.log(`Sending OTP to ${phone}`);
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      console.log(`Verifying OTP: ${otp}`);
      // Simulate checking if user exists
      const isExistingUser = otp === '123456'; // Demo: 123456 = existing user, others = new user
      
      if (isExistingUser) {
        // Existing user - redirect to main dashboard
        onLogin();
      } else {
        // New user - go to registration
        setStep('register');
      }
    }
  };

  const handleCompleteRegistration = () => {
    console.log('Registration completed:', userData);
    // Navigate to comprehensive registration
    setStep('comprehensive-registration');
  };

  const content = {
    user: {
      title: "Find Your Perfect Parking Spot",
      icon: User,
      description: "Enter your mobile number to continue"
    },
    vendor: {
      title: "Start Earning from Your Parking Space", 
      icon: Building2,
      description: "Enter your mobile number to continue"
    }
  };

  const currentContent = content[mode];

  if (step === 'phone') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <currentContent.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl" data-testid="text-auth-title">
                {currentContent.title}
              </CardTitle>
              <CardDescription data-testid="text-auth-description">
                {currentContent.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex">
                  <div className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-sm">
                    +91
                  </div>
                  <Input
                    id="phone"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-l-none"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full"
                disabled={phone.length < 10}
                data-testid="button-send-otp"
              >
                <Phone className="h-4 w-4 mr-2" />
                Send OTP
              </Button>

              <div className="text-center space-y-2 text-sm">
                <p>New {isUser ? 'User' : 'Vendor'}?</p>
                <Button 
                  variant="ghost" 
                  className="text-primary p-0 h-auto" 
                  onClick={() => setStep('comprehensive-registration')}
                  data-testid="button-register"
                >
                  Register as {isUser ? 'User' : 'Vendor'}
                </Button>
                
                <p className="mt-4">Wrong choice?</p>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground p-0 h-auto" 
                  onClick={onBack}
                  data-testid="button-switch-mode"
                >
                  Go to {isUser ? 'Vendor' : 'User'} Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-8">
          <Button
            variant="ghost"
            onClick={() => setStep('phone')}
            className="mb-4"
            data-testid="button-back-to-phone"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <CardTitle data-testid="text-otp-title">OTP Verification</CardTitle>
              <CardDescription data-testid="text-otp-description">
                Enter OTP sent to +91-{phone}
              </CardDescription>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="font-medium text-blue-800">Demo Instructions:</p>
                <p className="text-blue-600">• Enter <strong>123456</strong> for existing user (direct login)</p>
                <p className="text-blue-600">• Enter any other 6-digit code for new user registration</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  data-testid="input-otp"
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full"
                disabled={otp.length !== 6}
                data-testid="button-verify-otp"
              >
                Verify OTP
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Didn't receive?</p>
                <Button variant="ghost" className="text-primary p-0 h-auto" data-testid="button-resend-otp">
                  Resend OTP (30s)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'comprehensive-registration') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button
          variant="ghost"
          onClick={() => setStep('otp')}
          className="mb-4"
          data-testid="button-back-to-otp"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle data-testid="text-register-title">Complete Profile</CardTitle>
            <CardDescription data-testid="text-register-description">
              Complete your {mode} profile to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                data-testid="input-email"
              />
            </div>

            {isUser && (
              <div className="space-y-2">
                <Label htmlFor="vehicle">Primary Vehicle</Label>
                <select
                  id="vehicle"
                  className="w-full p-2 border rounded-md"
                  value={userData.vehicleType}
                  onChange={(e) => setUserData({...userData, vehicleType: e.target.value})}
                  data-testid="select-vehicle"
                >
                  <option value="Two-Wheeler">Two-Wheeler</option>
                  <option value="Car">Car</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>
            )}

            <Button
              onClick={handleCompleteRegistration}
              className="w-full"
              disabled={!userData.name}
              data-testid="button-complete-registration"
            >
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}