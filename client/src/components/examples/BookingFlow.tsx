import BookingFlow from '../BookingFlow';

export default function BookingFlowExample() {
  const handleBack = () => {
    console.log('Back to dashboard');
  };

  const handleComplete = () => {
    console.log('Booking completed');
  };

  return <BookingFlow onBack={handleBack} onComplete={handleComplete} />;
}