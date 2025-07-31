
import React, { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { InfoIcon } from './icons/InfoIcon';

interface LoginScreenProps {
  onConnect: (ip: string, key: string) => void;
  isLoading: boolean;
  error: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onConnect, isLoading, error }) => {
  const [ip, setIp] = useState('192.168.1.100');
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ip && key) {
      onConnect(ip, key);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in">
      <h2 className="text-xl font-bold text-center text-gray-100 mb-2">Connect to PC</h2>
      <p className="text-center text-gray-400 text-sm mb-6">Enter details from your PC's server app.</p>
      
      <div className="bg-cyan-900/40 border border-cyan-700 text-cyan-200 text-xs rounded-lg p-3 mb-6 flex items-start space-x-3">
        <InfoIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p>For this demo, use IP <strong className="font-mono">192.168.1.100</strong> and one of these keys: <strong className="font-mono">KEY-A4B7</strong>, <strong className="font-mono">KEY-C9D2</strong>, or <strong className="font-mono">KEY-E3F8</strong>.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="ip-address"
          label="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="e.g., 192.168.1.100"
          type="text"
          disabled={isLoading}
        />
        <Input
          id="access-key"
          label="Access Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="e.g., KEY-A4B7"
          type="text"
          disabled={isLoading}
        />
        
        {error && <p className="text-sm text-red-400 text-center animate-shake">{error}</p>}
        
        <Button type="submit" isLoading={isLoading} disabled={!ip || !key || isLoading}>
          {isLoading ? 'Connecting...' : 'Connect'}
        </Button>
      </form>
    </div>
  );
};

export default LoginScreen;
