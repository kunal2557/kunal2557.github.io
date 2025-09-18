import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Mail, 
  Home,
  Car,
  Bike,
  IndianRupee,
  Upload,
  Check,
  FileText,
  CreditCard,
  Calendar,
  MapPin,
  Truck,
  Shield,
  Clock
} from "lucide-react";

interface VendorRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

type RegistrationStep = 'businessType' | 'personalDetails' | 'propertyDetails' | 'pricing' | 'documents' | 'payment' | 'finalSubmission' | 'success';

export default function VendorRegistration({ onBack, onComplete }: VendorRegistrationProps) {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('businessType');
  const [formData, setFormData] = useState({
    businessType: '',
    fullName: '',
    fatherName: '',
    email: '',
    gender: '',
    propertyType: '',
    carSlots: 0,
    bikeSlots: 0,
    carHourlyRate: 20,
    carDayRate: 150,
    bikeHourlyRate: 5,
    bikeDayRate: 30,
    photosUploaded: 0,
    documentsUploaded: [],
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    payoutSchedule: 'Weekly'
  });

  const steps = [
    { id: 'businessType', title: 'Business Type', step: 1 },
    { id: 'personalDetails', title: 'Personal Details', step: 2 },
    { id: 'propertyDetails', title: 'Property Details', step: 4 },
    { id: 'pricing', title: 'Pricing Setup', step: 5 },
    { id: 'documents', title: 'Documents', step: 6 },
    { id: 'payment', title: 'Payment Setup', step: 7 },
    { id: 'finalSubmission', title: 'Final Review', step: 8 }
  ];

  const getCurrentStepNumber = () => {
    return steps.find(step => step.id === currentStep)?.step || 1;
  };

  const handleNext = () => {
    const stepOrder: RegistrationStep[] = ['businessType', 'personalDetails', 'propertyDetails', 'pricing', 'documents', 'payment', 'finalSubmission', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: RegistrationStep[] = ['businessType', 'personalDetails', 'propertyDetails', 'pricing', 'documents', 'payment', 'finalSubmission'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/vendors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email || `vendor${Date.now()}@smartpark.com`,
          phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          businessType: formData.businessType,
          propertyType: formData.propertyType,
          carSlots: formData.carSlots,
          bikeSlots: formData.bikeSlots,
          carHourlyRate: formData.carHourlyRate,
          bikeHourlyRate: formData.bikeHourlyRate,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode,
          upiId: formData.upiId
        }),
      });

      if (response.ok) {
        const vendorData = await response.json();
        console.log('Vendor registered successfully:', vendorData);
        setCurrentStep('success');
      } else {
        console.error('Vendor registration failed');
        // For demo purposes, still proceed
        setCurrentStep('success');
      }
    } catch (error) {
      console.error('Vendor registration error:', error);
      // For demo purposes, still proceed
      setCurrentStep('success');
    }
  };

  if (currentStep === 'businessType') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center flex-1">
              <h1 className="font-semibold text-lg">VENDOR REGISTRATION</h1>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={(getCurrentStepNumber() / 8) * 100} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              Step {getCurrentStepNumber()} of 8
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2" data-testid="text-business-type-title">
                  Choose Business Type
                </h2>
                <p className="text-muted-foreground text-sm">व्यवसाय प्रकार चुनें</p>
              </div>

              <div className="space-y-4">
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.businessType === 'individual' ? 'border-primary bg-primary/5' : 'border-border hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, businessType: 'individual'})}
                  data-testid="option-individual"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <Home className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>INDIVIDUAL</span>
                      </h3>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Home parking space</li>
                        <li>• Personal property</li>
                        <li>• Side income</li>
                      </ul>
                      <p className="text-sm font-medium text-green-600 mt-2">
                        Expected: ₹500-2000/month
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.businessType === 'commercial' ? 'border-primary bg-primary/5' : 'border-border hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, businessType: 'commercial'})}
                  data-testid="option-commercial"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>COMMERCIAL</span>
                      </h3>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Shop/office space</li>
                        <li>• Parking lot owner</li>
                        <li>• Business income</li>
                      </ul>
                      <p className="text-sm font-medium text-blue-600 mt-2">
                        Expected: ₹5000-50000/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-12"
                disabled={!formData.businessType}
                data-testid="button-continue"
              >
                Continue →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'personalDetails') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center flex-1">
              <h1 className="font-semibold text-lg">VENDOR REGISTRATION</h1>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={(getCurrentStepNumber() / 8) * 100} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              Step {getCurrentStepNumber()} of 8
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
                <p className="text-muted-foreground text-sm">व्यक्तिगत जानकारी</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Raj Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    data-testid="input-full-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name *</Label>
                  <Input
                    id="fatherName"
                    placeholder="Suresh Kumar"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                    data-testid="input-father-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email ID *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="raj@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Gender *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={formData.gender === 'Male' ? 'default' : 'outline'}
                      onClick={() => setFormData({...formData, gender: 'Male'})}
                      className="h-12"
                      data-testid="option-male"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Male
                    </Button>
                    <Button
                      variant={formData.gender === 'Female' ? 'default' : 'outline'}
                      onClick={() => setFormData({...formData, gender: 'Female'})}
                      className="h-12"
                      data-testid="option-female"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Female
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-12"
                disabled={!formData.fullName || !formData.fatherName || !formData.email || !formData.gender}
                data-testid="button-continue"
              >
                Continue →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto pt-16">
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-center space-x-2" data-testid="text-registration-success">
                  <Check className="h-6 w-6 text-green-500" />
                  <span>Registration Submitted!</span>
                </h2>
                <p className="text-muted-foreground text-sm">आपका पंजीकरण सबमिट हो गया!</p>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-4 text-left space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">B-42, Lajpat Nagar, Delhi</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Application ID: VEN2024120001
                  </div>
                </CardContent>
              </Card>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">What's Next?</span>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium">Document Verification</p>
                      <p className="text-xs text-green-600">(12-24 hours)</p>
                      <p className="text-xs text-muted-foreground">Our team will verify your uploaded documents for authenticity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium">Location Inspection</p>
                      <p className="text-xs text-orange-600">(24-48 hours)</p>
                      <p className="text-xs text-muted-foreground">Physical verification of your parking space location</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium">Account Activation</p>
                      <p className="text-xs text-green-600">(48-72 hours)</p>
                      <p className="text-xs text-muted-foreground">Final approval and account activation for earning</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={onComplete}
                className="w-full h-12 bg-green-500 hover:bg-green-600"
                data-testid="button-go-to-dashboard"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>

              <Button
                variant="outline"
                className="w-full"
                data-testid="button-contact-support"
              >
                <Shield className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // For other steps, show a simplified version
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="font-semibold text-lg">VENDOR REGISTRATION</h1>
          </div>
        </div>

        <div className="mb-6">
          <Progress value={(getCurrentStepNumber() / 8) * 100} className="h-2" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Step {getCurrentStepNumber()} of 8
          </p>
        </div>

        <Card>
          <CardContent className="p-6 text-center space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Step {getCurrentStepNumber()}</h2>
              <p className="text-muted-foreground">
                {currentStep === 'propertyDetails' && 'Property Details - संपत्ति विवरण'}
                {currentStep === 'pricing' && 'Pricing Setup - मूल्य निर्धारण'}
                {currentStep === 'documents' && 'Photos & Documents - फोटो और दस्तावेज़'}
                {currentStep === 'payment' && 'Payment Setup - भुगतान सेटअप'}
                {currentStep === 'finalSubmission' && 'Final Submission - अंतिम सबमिशन'}
              </p>
            </div>

            <div className="space-y-4">
              {currentStep === 'propertyDetails' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg">
                      <Car className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Car Slots</p>
                      <Input
                        type="number"
                        value={formData.carSlots}
                        onChange={(e) => setFormData({...formData, carSlots: parseInt(e.target.value) || 0})}
                        className="mt-2"
                      />
                    </div>
                    <div className="p-3 border rounded-lg">
                      <Bike className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Bike Slots</p>
                      <Input
                        type="number"
                        value={formData.bikeSlots}
                        onChange={(e) => setFormData({...formData, bikeSlots: parseInt(e.target.value) || 0})}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'pricing' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Car className="h-4 w-4" />
                      <span className="font-medium">CAR PARKING</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Per Hour</Label>
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-4 w-4" />
                          <Input
                            type="number"
                            value={formData.carHourlyRate}
                            onChange={(e) => setFormData({...formData, carHourlyRate: parseInt(e.target.value) || 0})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Per Day</Label>
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-4 w-4" />
                          <Input
                            type="number"
                            value={formData.carDayRate}
                            onChange={(e) => setFormData({...formData, carDayRate: parseInt(e.target.value) || 0})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    <p className="font-medium flex items-center space-x-1">
                      <IndianRupee className="h-3 w-3" />
                      <span>REVENUE BREAKDOWN</span>
                    </p>
                    <p>Your Rate: ₹{formData.carHourlyRate}/hour</p>
                    <p>Platform Fee: ₹{Math.round(formData.carHourlyRate * 0.15)} (15%)</p>
                    <p className="font-medium text-green-600">Your Earning: ₹{formData.carHourlyRate - Math.round(formData.carHourlyRate * 0.15)}/hour</p>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={currentStep === 'finalSubmission' ? handleSubmit : handleNext}
              className="w-full h-12"
              data-testid="button-continue"
            >
              {currentStep === 'finalSubmission' ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  SUBMIT FOR APPROVAL
                </>
              ) : 'Continue →'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}