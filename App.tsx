
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import ControlPanel from './components/ControlPanel';
import { controlService } from './services/controlService';
import { AppLogo } from './components/icons/AppLogo';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedIp, setConnectedIp] = useState<string>('');

  const handleConnect = useCallback(async (ip: string, key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await controlService.connect(ip, key);
      if (success) {
        setIsConnected(true);
        setConnectedIp(ip);
      } else {
        setError('Connection failed. Check IP address and access key.');
      }
    } catch (e) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setConnectedIp('');
    setError(null);
    controlService.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
       <div className="absolute top-6 flex items-center space-x-3">
            <AppLogo className="h-10 w-10 text-cyan-400" />
            <h1 className="text-2xl font-bold text-gray-200 tracking-tight">PC Remote Control</h1>
        </div>
      <div className="w-full max-w-md">
        {isConnected ? (
          <ControlPanel onDisconnect={handleDisconnect} connectedIp={connectedIp} />
        ) : (
          <LoginScreen onConnect={handleConnect} isLoading={isLoading} error={error} />
        )}
      </div>
       <footer className="absolute bottom-4 text-center text-gray-500 text-xs">
          <p>This is a UI demonstration. The server-side application must be running on the target PC.</p>
        </footer>
    </div>
  );
};

export default App;
