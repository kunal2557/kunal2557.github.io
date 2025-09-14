import { useState } from "react";
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

type AppState = 'landing' | 'auth' | 'userDashboard' | 'vendorDashboard' | 'booking';
type UserMode = 'user' | 'vendor';

function Router() {
  return (
    <Switch>
      <Route path="/" component={SmartParkApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function SmartParkApp() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userMode, setUserMode] = useState<UserMode>('user');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'wallet' | 'profile'>('home');

  const handleSelectMode = (mode: UserMode) => {
    setUserMode(mode);
    setAppState('auth');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
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

  const handleBackToLanding = () => {
    setAppState('landing');
    setIsAuthenticated(false);
  };

  const handleBackToDashboard = () => {
    setAppState(userMode === 'user' ? 'userDashboard' : 'vendorDashboard');
  };

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingPage onSelectMode={handleSelectMode} />;
      
      case 'auth':
        return (
          <AuthScreen 
            mode={userMode}
            onBack={() => setAppState('landing')}
            onLogin={handleLogin}
          />
        );
      
      case 'userDashboard':
        return (
          <>
            <UserDashboard 
              onShowBooking={handleShowBooking}
              onSwitchToVendor={handleSwitchMode}
            />
            <BottomNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              walletBalance={234}
              activeBookings={2}
            />
          </>
        );
      
      case 'vendorDashboard':
        return (
          <VendorDashboard 
            onSwitchToUser={handleSwitchMode}
            onBack={handleBackToLanding}
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
        return <LandingPage onSelectMode={handleSelectMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
