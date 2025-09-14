import UserDashboard from '../UserDashboard';

export default function UserDashboardExample() {
  const handleShowBooking = () => {
    console.log('Show booking flow');
  };

  const handleSwitchToVendor = () => {
    console.log('Switch to vendor mode');
  };

  return <UserDashboard onShowBooking={handleShowBooking} onSwitchToVendor={handleSwitchToVendor} />;
}