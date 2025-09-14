import VendorDashboard from '../VendorDashboard';

export default function VendorDashboardExample() {
  const handleSwitchToUser = () => {
    console.log('Switch to user mode');
  };

  const handleBack = () => {
    console.log('Back pressed');
  };

  return <VendorDashboard onSwitchToUser={handleSwitchToUser} onBack={handleBack} />;
}