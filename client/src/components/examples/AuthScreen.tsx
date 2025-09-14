import { useState } from 'react';
import AuthScreen from '../AuthScreen';

export default function AuthScreenExample() {
  const [mode, setMode] = useState<'user' | 'vendor'>('user');

  const handleBack = () => {
    console.log('Back pressed');
  };

  const handleLogin = () => {
    console.log('Login completed');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 p-4">
        <button
          onClick={() => setMode('user')}
          className={`px-4 py-2 rounded ${mode === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          User Mode
        </button>
        <button
          onClick={() => setMode('vendor')}
          className={`px-4 py-2 rounded ${mode === 'vendor' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Vendor Mode
        </button>
      </div>
      <AuthScreen mode={mode} onBack={handleBack} onLogin={handleLogin} />
    </div>
  );
}