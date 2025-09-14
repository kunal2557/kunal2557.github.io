import { useState } from 'react';
import BottomNavigation from '../BottomNavigation';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'wallet' | 'profile'>('home');

  const handleTabChange = (tab: 'home' | 'bookings' | 'wallet' | 'profile') => {
    console.log(`Switched to ${tab} tab`);
    setActiveTab(tab);
  };

  return (
    <div className="h-20">
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        walletBalance={234}
        activeBookings={2}
      />
    </div>
  );
}