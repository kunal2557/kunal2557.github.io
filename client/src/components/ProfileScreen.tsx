import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  User, 
  Mail, 
  Phone, 
  Car,
  MapPin,
  Star,
  IndianRupee,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Building2,
  Globe,
  ChevronRight
} from "lucide-react";

interface ProfileScreenProps {
  onBack: () => void;
  onSwitchToVendor: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onBack, onSwitchToVendor, onLogout }: ProfileScreenProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      profile: "Profile",
      accountInfo: "Account Information",
      preferences: "Preferences",
      support: "Support & Help",
      switchToVendor: "Switch to Vendor Mode",
      switchDesc: "Start earning from your parking space",
      language: "Language",
      notifications: "Notifications",
      privacy: "Privacy & Security",
      helpCenter: "Help Center",
      logout: "Logout"
    },
    hi: {
      profile: "प्रोफाइल",
      accountInfo: "खाता जानकारी",
      preferences: "प्राथमिकताएं",
      support: "सहायता और मदद",
      switchToVendor: "विक्रेता मोड पर स्विच करें",
      switchDesc: "अपनी पार्किंग स्पेस से कमाई शुरू करें",
      language: "भाषा",
      notifications: "सूचनाएं",
      privacy: "गोपनीयता और सुरक्षा",
      helpCenter: "सहायता केंद्र",
      logout: "लॉगआउट"
    }
  };

  const currentContent = content[language];

  // Mock user data //todo: remove mock functionality
  const userData = {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    vehicle: "Maruti Swift - DL01AB1234",
    totalBookings: 24,
    rating: 4.8,
    walletBalance: 234
  };

  const menuItems = [
    {
      category: currentContent.accountInfo,
      items: [
        { icon: User, label: "Personal Information", action: () => {} },
        { icon: Car, label: "Vehicle Details", action: () => {} },
        { icon: MapPin, label: "Saved Locations", action: () => {} }
      ]
    },
    {
      category: currentContent.preferences,
      items: [
        { 
          icon: Globe, 
          label: currentContent.language, 
          action: () => setLanguage(prev => prev === 'en' ? 'hi' : 'en'),
          value: language === 'en' ? 'English' : 'हिंदी'
        },
        { icon: Bell, label: currentContent.notifications, action: () => {} },
        { icon: Shield, label: currentContent.privacy, action: () => {} }
      ]
    },
    {
      category: currentContent.support,
      items: [
        { icon: HelpCircle, label: currentContent.helpCenter, action: () => {} },
        { icon: Phone, label: "Contact Support", action: () => {} },
        { icon: Star, label: "Rate App", action: () => {} }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          <h1 className="font-semibold text-lg" data-testid="text-profile-title">
            {currentContent.profile}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold" data-testid="text-user-name">
                  {userData.name}
                </h2>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3" />
                    <span data-testid="text-user-email">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span data-testid="text-user-phone">{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="h-3 w-3" />
                    <span data-testid="text-user-vehicle">{userData.vehicle}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold" data-testid="text-total-bookings">
                  {userData.totalBookings}
                </div>
                <div className="text-xs text-muted-foreground">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span data-testid="text-user-rating">{userData.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold flex items-center justify-center space-x-1">
                  <IndianRupee className="h-4 w-4" />
                  <span data-testid="text-wallet-balance">{userData.walletBalance}</span>
                </div>
                <div className="text-xs text-muted-foreground">Wallet</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Switch to Vendor Mode */}
        <Card className="border-accent/50 bg-accent/5">
          <CardContent 
            className="p-4 cursor-pointer hover-elevate"
            onClick={onSwitchToVendor}
            data-testid="button-switch-vendor"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-accent" data-testid="text-switch-vendor">
                  {currentContent.switchToVendor}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="text-switch-desc">
                  {currentContent.switchDesc}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-accent" />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        {menuItems.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{section.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <div 
                      className="flex items-center space-x-3 p-3 rounded-lg hover-elevate cursor-pointer"
                      onClick={item.action}
                      data-testid={`menu-item-${sectionIndex}-${itemIndex}`}
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="flex-1">{item.label}</span>
                      {item.value && (
                        <Badge variant="secondary" className="text-xs">
                          {item.value}
                        </Badge>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {itemIndex < section.items.length - 1 && (
                      <Separator className="ml-11" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Logout */}
        <Card className="border-destructive/50">
          <CardContent 
            className="p-4 cursor-pointer hover-elevate"
            onClick={onLogout}
            data-testid="button-logout"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="h-5 w-5 text-destructive" />
              <span className="text-destructive font-medium">
                {currentContent.logout}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}