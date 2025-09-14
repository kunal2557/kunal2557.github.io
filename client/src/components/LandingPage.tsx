import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Building2, Globe } from "lucide-react";

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
      userSubtext: "(USER LOGIN)",
      vendorButton: "I HAVE PARKING", 
      vendorSubtext: "(VENDOR LOGIN)",
      languageToggle: "🇮🇳 हिंदी | 🇬🇧 English"
    },
    hi: {
      title: "स्मार्टपार्क",
      subtitle: "पार्किंग स्थान खोजें और सूचीबद्ध करें",
      userButton: "मुझे पार्किंग चाहिए",
      userSubtext: "(उपयोगकर्ता लॉगिन)",
      vendorButton: "मेरे पास पार्किंग है",
      vendorSubtext: "(विक्रेता लॉगिन)",
      languageToggle: "🇬🇧 English | 🇮🇳 हिंदी"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center p-4">
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
            variant="outline"
            className="w-full h-16 text-lg border-2"
            data-testid="button-vendor-mode"
          >
            <Building2 className="h-6 w-6 mr-3" />
            <div className="text-center">
              <div className="font-semibold">{currentContent.vendorButton}</div>
              <div className="text-sm opacity-75">{currentContent.vendorSubtext}</div>
            </div>
          </Button>
        </div>

        {/* Language Toggle */}
        <Button
          onClick={toggleLanguage}
          variant="ghost"
          className="text-sm text-muted-foreground hover:text-foreground"
          data-testid="button-language-toggle"
        >
          <Globe className="h-4 w-4 mr-2" />
          {currentContent.languageToggle}
        </Button>
      </div>
    </div>
  );
}