import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Building2, 
  Globe, 
  Search, 
  CreditCard, 
  MapPin, 
  Shield, 
  Zap, 
  Clock,
  TrendingUp,
  Users,
  Star,
  IndianRupee
} from "lucide-react";

interface LandingPageProps {
  onSelectMode: (mode: 'user' | 'vendor') => void;
}

export default function LandingPage({ onSelectMode }: LandingPageProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const content = {
    en: {
      title: "SmartPark",
      subtitle: "Find & List Parking Spots Easily",
      userButton: "I NEED PARKING",
      userSubtext: "Find parking spots",
      vendorButton: "I HAVE PARKING", 
      vendorSubtext: "Start earning money",
      languageToggle: "हिंदी",
      whyChoose: "Why Choose SmartPark?",
      whySubtitle: "India's #1 parking solution with smart technology",
      trustedBy: "Trusted by Millions",
      howItWorks: "How It Works",
      readyToStart: "Ready to Get Started?",
      readySubtitle: "Join millions of users who save time and earn money with SmartPark",
      findParkingNow: "Find Parking Now",
      startEarning: "Start Earning Today"
    },
    hi: {
      title: "स्मार्टपार्क",
      subtitle: "पार्किंग स्थान खोजें और सूचीबद्ध करें",
      userButton: "मुझे पार्किंग चाहिए",
      userSubtext: "पार्किंग स्थान खोजें",
      vendorButton: "मेरे पास पार्किंग है",
      vendorSubtext: "पैसे कमाना शुरू करें",
      languageToggle: "English",
      whyChoose: "स्मार्टपार्क क्यों चुनें?",
      whySubtitle: "स्मार्ट तकनीक के साथ भारत का #1 पार्किंग समाधान",
      trustedBy: "लाखों लोगों का भरोसा",
      howItWorks: "यह कैसे काम करता है",
      readyToStart: "शुरू करने के लिए तैयार हैं?",
      readySubtitle: "लाखों उपयोगकर्ताओं से जुड़ें जो स्मार्टपार्क के साथ समय बचाते हैं और पैसे कमाते हैं",
      findParkingNow: "अभी पार्किंग खोजें",
      startEarning: "आज ही कमाई शुरू करें"
    }
  };

  const currentContent = content[language];

  const features = [
    {
      icon: TrendingUp,
      title: language === 'en' ? 'Maximize Earnings' : 'कमाई बढ़ाएं',
      description: language === 'en' ? 'Earn ₹500-₹50,000 monthly from your unused parking space. Dynamic pricing ensures maximum revenue.' : 'अपनी अप्रयुक्त पार्किंग स्पेस से ₹500-₹50,000 मासिक कमाएं। डायनामिक प्राइसिंग अधिकतम आय सुनिश्चित करती है।',
      bgColor: 'bg-green-50 dark:bg-green-950',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Safe & Reliable' : 'सुरक्षित और भरोसेमंद',
      description: language === 'en' ? 'All bookings are verified with 24/7 support. CCTV monitoring and secure payments guaranteed.' : 'सभी बुकिंग 24/7 सहायता के साथ सत्यापित हैं। सीसीटीवी निगरानी और सुरक्षित भुगतान की गारंटी।',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Zap,
      title: language === 'en' ? 'Instant Booking' : 'तुरंत बुकिंग',
      description: language === 'en' ? 'Find and book parking in under 30 seconds. Real-time availability with smart navigation.' : '30 सेकंड से कम में पार्किंग खोजें और बुक करें। स्मार्ट नेवीगेशन के साथ रीयल-टाइम उपलब्धता।',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: MapPin,
      title: language === 'en' ? 'Prime Locations' : 'प्रमुख स्थान',
      description: language === 'en' ? 'Thousands of parking spots near malls, offices, airports, and metro stations across India.' : 'भारत भर में मॉल, कार्यालय, हवाई अड्डे और मेट्रो स्टेशनों के पास हजारों पार्किंग स्पॉट।',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const stats = [
    { 
      icon: Users, 
      number: '2M+', 
      label: language === 'en' ? 'Active Users' : 'सक्रिय उपयोगकर्ता',
      color: 'text-green-600'
    },
    { 
      icon: MapPin, 
      number: '50K+', 
      label: language === 'en' ? 'Parking Spots' : 'पार्किंग स्पॉट',
      color: 'text-blue-600'
    },
    { 
      icon: Star, 
      number: '4.8★', 
      label: language === 'en' ? 'App Rating' : 'ऐप रेटिंग',
      color: 'text-yellow-600'
    },
    { 
      icon: IndianRupee, 
      number: '₹1Cr+', 
      label: language === 'en' ? 'Earned by Partners' : 'पार्टनर्स की कमाई',
      color: 'text-purple-600'
    }
  ];

  const steps = [
    {
      number: 1,
      title: language === 'en' ? 'Search Location' : 'स्थान खोजें',
      description: language === 'en' ? 'Enter your destination and find nearby parking spots with real-time availability' : 'अपना गंतव्य दर्ज करें और रीयल-टाइम उपलब्धता के साथ आसपास के पार्किंग स्पॉट खोजें',
      color: 'bg-blue-500'
    },
    {
      number: 2,
      title: language === 'en' ? 'Book & Pay' : 'बुक करें और भुगतान करें',
      description: language === 'en' ? 'Reserve your spot instantly with secure UPI, card, or wallet payment' : 'सुरक्षित UPI, कार्ड या वॉलेट भुगतान के साथ अपना स्पॉट तुरंत रिज़र्व करें',
      color: 'bg-green-500'
    },
    {
      number: 3,
      title: language === 'en' ? 'Park with Peace' : 'चैन से पार्क करें',
      description: language === 'en' ? 'Navigate to your spot, park safely, and enjoy your day worry-free' : 'अपने स्पॉट पर नेवीगेट करें, सुरक्षित रूप से पार्क करें और बेफिक्र होकर अपना दिन बिताएं',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Language Toggle Header */}
      <div className="fixed top-4 right-4 z-50">
        <Badge 
          onClick={toggleLanguage}
          className="cursor-pointer hover:bg-primary/90"
          data-testid="button-language-toggle"
        >
          <Globe className="h-3 w-3 mr-1" />
          {currentContent.languageToggle}
        </Badge>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
                <Car className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary" data-testid="text-app-title">
              {currentContent.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-app-subtitle">
              {currentContent.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => onSelectMode('user')}
              className="w-full h-16 text-lg bg-primary hover:bg-primary/90"
              data-testid="button-user-mode"
            >
              <Car className="h-6 w-6 mr-3" />
              <div className="text-center">
                <div className="font-semibold">{currentContent.userButton}</div>
                <div className="text-sm opacity-90">{currentContent.userSubtext}</div>
              </div>
            </Button>

            <Button
              onClick={() => onSelectMode('vendor')}
              className="w-full h-16 text-lg bg-accent hover:bg-accent/90 text-white"
              data-testid="button-vendor-mode"
            >
              <Building2 className="h-6 w-6 mr-3" />
              <div className="text-center">
                <div className="font-semibold">{currentContent.vendorButton}</div>
                <div className="text-sm opacity-90">{currentContent.vendorSubtext}</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-why-choose">
              {currentContent.whyChoose}
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-why-subtitle">
              {currentContent.whySubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.bgColor} border-0`} data-testid={`card-feature-${index}`}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted by Millions Section */}
      <div className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12" data-testid="text-trusted-by">
            {currentContent.trustedBy}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-3" data-testid={`stat-${index}`}>
                <div className="flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-full">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" data-testid="text-how-it-works">
              {currentContent.howItWorks}
            </h2>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4" data-testid={`step-${index}`}>
                <div className={`${step.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0`}>
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ready to Get Started Section */}
      <div className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold" data-testid="text-ready-title">
              {currentContent.readyToStart}
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto" data-testid="text-ready-subtitle">
              {currentContent.readySubtitle}
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <Button
              onClick={() => onSelectMode('user')}
              className="w-full h-12 bg-white text-primary hover:bg-gray-100"
              data-testid="button-find-parking"
            >
              {currentContent.findParkingNow}
            </Button>
            <Button
              onClick={() => onSelectMode('vendor')}
              variant="outline"
              className="w-full h-12 border-white text-white hover:bg-white hover:text-primary"
              data-testid="button-start-earning"
            >
              {currentContent.startEarning}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}