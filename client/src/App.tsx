import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Import all SmartPark components
import LandingPage from "@/components/LandingPage";
import AuthScreen from "@/components/AuthScreen";
import UserDashboard from "@/components/UserDashboard";
import VendorDashboard from "@/components/VendorDashboard";
import BookingFlow from "@/components/BookingFlow";
import BottomNavigation from "@/components/BottomNavigation";
import ProfileScreen from "@/components/ProfileScreen";
import UserRegistration from "@/components/UserRegistration";
import VendorRegistration from "@/components/VendorRegistration";
import BookingsScreen from "@/components/BookingsScreen";
import WalletScreen from "@/components/WalletScreen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { storage } from "@/lib/utils";
import { useWebVitals } from "@/hooks/usePerformance";
import { useAnalytics } from "@/hooks/useAnalytics";
import RoleSelection from "@/components/LandingPage";
import GlobalSettings from "@/components/GlobalSettings";
import AdvancedSearch from "@/components/AdvancedSearch";
import { usePWA } from "@/hooks/usePWA";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

type AppState = 'roleSelection' | 'auth' | 'userDashboard' | 'vendorDashboard' | 'booking' | 'userRegistration' | 'vendorRegistration';
type UserMode = 'user' | 'vendor';
type Language = 'en' | 'hi';
type Theme = 'light' | 'dark';

interface SearchFilters {
  location: string;
  priceRange: [number, number];
  duration: string;
  rating: number;
  amenities: string[];
  vehicleTypes: string[];
  availability: string;
  security: string[];
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={SmartParkApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function SmartParkApp() {
  const { toast } = useToast();
  const { installPromptEvent, updateAvailable, promptInstall, reloadToUpdate } = usePWA();

  useEffect(() => {
    if (installPromptEvent) {
      toast({ 
        title: "Install SmartPark?", 
        description: "Get app-like experience.", 
        action: (
          <ToastAction altText="Install" onClick={async () => {
            try {
              const outcome = await installPromptEvent.prompt();
              toast({ title: 'App installed successfully!' });
            } catch (error) {
              toast({ title: 'Installation cancelled' });
            }
          }}>
            Install
          </ToastAction>
        )
      });
    }
  }, [installPromptEvent]);

  useEffect(() => {
    if (updateAvailable) {
      toast({ 
        title: "Update available", 
        description: "Reload to get the latest.", 
        action: (
          <ToastAction altText="Reload" onClick={reloadToUpdate}>
            Reload
          </ToastAction>
        )
      });
    }
  }, [updateAvailable]);
  const [appState, setAppState] = useState<AppState>('roleSelection');
  const [userMode, setUserMode] = useState<UserMode>('user');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'wallet' | 'profile'>('home');
  const [showProfile, setShowProfile] = useState(false);
  const [language, setLanguage] = useState<Language>(storage.get<Language>('lang', 'en'));
  const [theme, setTheme] = useState<Theme>(storage.get<Theme>('theme', 'light'));
  const [showSettings, setShowSettings] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    priceRange: [10, 100],
    duration: 'any',
    rating: 0,
    amenities: [],
    vehicleTypes: [],
    availability: 'any',
    security: []
  });


  // Persist preferences
  useEffect(() => { storage.set('lang', language); }, [language]);
  useEffect(() => { storage.set('theme', theme); }, [theme]);

  // Basic analytics and web vitals
  useWebVitals();
  useAnalytics(appState);

  const handleSelectMode = (mode: UserMode) => {
    setUserMode(mode);
    setAppState('auth');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Navigate to comprehensive registration first
    setAppState(userMode === 'user' ? 'userRegistration' : 'vendorRegistration');
  };

  const handleRegistrationComplete = () => {
    setAppState(userMode === 'user' ? 'userDashboard' : 'vendorDashboard');
  };

  const handleSwitchMode = () => {
    const newMode = userMode === 'user' ? 'vendor' : 'user';
    setUserMode(newMode);
    setAppState(newMode === 'user' ? 'userDashboard' : 'vendorDashboard');
  };

  const handleShowBooking = () => {
    setAppState('booking');
  };

  const handleShowProfile = () => {
    setActiveTab('profile');
    setShowProfile(true);
  };

  const handleBackToLanding = () => {
    setAppState('roleSelection');
    setIsAuthenticated(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleShowAdvancedSearch = () => {
    setShowAdvancedSearch(true);
  };

  const handleApplyFilters = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleBackToDashboard = () => {
    setAppState(userMode === 'user' ? 'userDashboard' : 'vendorDashboard');
    setShowProfile(false);
  };

  const handleTabChange = (tab: 'home' | 'bookings' | 'wallet' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'profile') {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  };

  const handleLogout = () => {
    setAppState('roleSelection');
    setIsAuthenticated(false);
    setShowProfile(false);
  };

  const renderContent = () => {
    switch (appState) {
      case 'roleSelection':
        return <RoleSelection onSelectMode={handleSelectMode} />;
      
      case 'auth':
        return (
          <AuthScreen 
            mode={userMode}
            onBack={() => setAppState('roleSelection')}
            onLogin={handleLogin}
          />
        );
      
      case 'userDashboard':
        return (
          <>
            {showProfile ? (
              <ProfileScreen
                onBack={() => setShowProfile(false)}
                onSwitchToVendor={handleSwitchMode}
                onLogout={handleLogout}
              />
            ) : activeTab === 'bookings' ? (
              <BookingsScreen />
            ) : activeTab === 'wallet' ? (
              <WalletScreen />
            ) : (
              <UserDashboard 
                onShowBooking={handleShowBooking}
                onSwitchToVendor={handleSwitchMode}
                onShowProfile={handleShowProfile}
                onShowSettings={handleShowSettings}
                onShowAdvancedSearch={handleShowAdvancedSearch}
                searchFilters={searchFilters}
              />
            )}
            <BottomNavigation 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              walletBalance={234}
              activeBookings={2}
            />
          </>
        );
      
      case 'userRegistration':
        return (
          <UserRegistration 
            onBack={() => setAppState('auth')}
            onComplete={handleRegistrationComplete}
          />
        );

      case 'vendorRegistration':
        return (
          <VendorRegistration 
            onBack={() => setAppState('auth')}
            onComplete={handleRegistrationComplete}
          />
        );
      
      case 'vendorDashboard':
        return (
          <VendorDashboard 
            onSwitchToUser={handleSwitchMode}
            onBack={handleBackToLanding}
            onShowSettings={handleShowSettings}
          />
        );
      
      case 'booking':
        return (
          <BookingFlow 
            onBack={handleBackToDashboard}
            onComplete={handleBackToDashboard}
          />
        );
      
      default:
        return <RoleSelection onSelectMode={handleSelectMode} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="min-h-screen bg-background text-foreground">
          {renderContent()}
          <GlobalSettings
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            currentLanguage={language}
            currentTheme={theme}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
          />
          <AdvancedSearch
            isOpen={showAdvancedSearch}
            onClose={() => setShowAdvancedSearch(false)}
            onApplyFilters={handleApplyFilters}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
