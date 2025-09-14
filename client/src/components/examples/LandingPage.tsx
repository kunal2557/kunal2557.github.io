import LandingPage from '../LandingPage';

export default function LandingPageExample() {
  const handleSelectMode = (mode: 'user' | 'vendor') => {
    console.log(`Selected ${mode} mode`);
  };

  return <LandingPage onSelectMode={handleSelectMode} />;
}