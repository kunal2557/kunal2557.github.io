import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Calendar, 
  Wallet, 
  User, 
  IndianRupee
} from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavigationProps {
  activeTab: 'home' | 'bookings' | 'wallet' | 'profile';
  onTabChange: (tab: 'home' | 'bookings' | 'wallet' | 'profile') => void;
  walletBalance?: number;
  activeBookings?: number;
}

export default function BottomNavigation({ 
  activeTab, 
  onTabChange, 
  walletBalance = 234,
  activeBookings = 2 
}: BottomNavigationProps) {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home,
      testId: 'tab-home'
    },
    {
      id: 'bookings' as const,
      label: 'Bookings',
      icon: Calendar,
      testId: 'tab-bookings',
      badge: activeBookings > 0 ? activeBookings : undefined
    },
    {
      id: 'wallet' as const,
      label: 'Wallet',
      icon: Wallet,
      testId: 'tab-wallet'
    },
    {
      id: 'profile' as const,
      label: 'Profile', 
      icon: User,
      testId: 'tab-profile'
    }
  ];

  return (
    <div className="bg-card border-t border-border px-2 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex-col h-16 space-y-1 relative ${
                isActive 
                  ? 'text-primary bg-primary/5' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid={tab.testId}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                </motion.div>
                {tab.badge && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-destructive text-destructive-foreground"
                    data-testid={`badge-${tab.id}`}
                  >
                    {tab.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'font-medium text-primary' : ''}`}>
                {tab.label}
              </span>
              {tab.id === 'wallet' && (
                <div className="flex items-center space-x-0.5 text-xs">
                  <IndianRupee className="h-3 w-3" />
                  <span data-testid="text-wallet-balance">{walletBalance}</span>
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}