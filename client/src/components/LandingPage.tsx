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
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md space-y-8 text-center relative z-10">
          {/* Logo and Title */}
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Car className="h-10 w-10" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="text-app-title">
                {currentContent.title}
              </h1>
              <p className="text-xl text-muted-foreground font-medium" data-testid="text-app-subtitle">
                {currentContent.subtitle}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live in 50+ Cities</span>
                </div>
                <span>•</span>
                <span>2M+ Users</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => onSelectMode('user')}
              className="w-full h-18 text-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              data-testid="button-user-mode"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Car className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{currentContent.userButton}</div>
                  <div className="text-sm opacity-90">{currentContent.userSubtext}</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => onSelectMode('vendor')}
              className="w-full h-18 text-lg bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              data-testid="button-vendor-mode"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{currentContent.vendorButton}</div>
                  <div className="text-sm opacity-90">{currentContent.vendorSubtext}</div>
                </div>
              </div>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">30s</div>
              <div className="text-xs text-muted-foreground">Avg Booking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹20</div>
              <div className="text-xs text-muted-foreground">Starting From</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
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

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`} data-testid={`card-feature-${index}`}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-lg`}>
                      <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted by Millions Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="text-trusted-by">
              {currentContent.trustedBy}
            </h2>
            <p className="text-xl text-muted-foreground">Join the parking revolution across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4 group" data-testid={`stat-${index}`}>
                <div className="flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">"SmartPark saved me 30 minutes every day. Best parking app!"</p>
              <p className="text-sm font-semibold mt-2">- Priya Sharma, Mumbai</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">"Earning ₹15,000 monthly from my parking space!"</p>
              <p className="text-sm font-semibold mt-2">- Rajesh Kumar, Delhi</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">"Super reliable and secure. Highly recommended!"</p>
              <p className="text-sm font-semibold mt-2">- Anita Singh, Bangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="text-how-it-works">
              {currentContent.howItWorks}
            </h2>
            <p className="text-xl text-muted-foreground">Simple steps to park smarter</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-6 group" data-testid={`step-${index}`}>
                <div className="relative">
                  <div className={`${step.color} text-white rounded-3xl w-20 h-20 flex items-center justify-center font-bold text-2xl mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 transform -translate-y-1/2"></div>
                  )}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* App Preview Mockup */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">SmartPark App</div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-primary/20 rounded-full w-3/4"></div>
                  <div className="h-4 bg-accent/20 rounded-full w-1/2"></div>
                  <div className="h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
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