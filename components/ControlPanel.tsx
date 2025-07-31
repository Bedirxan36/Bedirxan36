
import React, { useState, useCallback } from 'react';
import { controlService } from '../services/controlService';
import { CommandType } from '../types';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { PowerIcon, RestartIcon, SleepIcon } from './icons/PowerIcons';
import { PlayPauseIcon, NextIcon, PrevIcon, VolumeUpIcon, VolumeDownIcon, MuteIcon } from './icons/MediaIcons';
import { BrowserIcon, TerminalIcon } from './icons/ShortcutIcons';


interface ControlPanelProps {
  onDisconnect: () => void;
  connectedIp: string;
}

interface ControlButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    label: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, className = '', label }) => (
    <div className="flex flex-col items-center space-y-2">
        <button
            onClick={onClick}
            className={`w-20 h-20 bg-gray-700 hover:bg-cyan-500 active:bg-cyan-600 rounded-2xl flex items-center justify-center transition-all duration-150 transform hover:scale-105 shadow-lg ${className}`}
        >
            {children}
        </button>
        <span className="text-xs text-gray-400">{label}</span>
    </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ onDisconnect, connectedIp }) => {
  const [textToSend, setTextToSend] = useState('');

  const handleCommand = useCallback((command: CommandType, value?: any) => {
    controlService.sendCommand(command, value).catch(err => console.error(err));
  }, []);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if(textToSend.trim()){
      handleCommand(CommandType.KEYBOARD_TYPE, textToSend);
      setTextToSend('');
    }
  };
  
  const handlePowerCommand = (command: CommandType) => {
      const commandName = command.split('_')[1].toLowerCase();
      if(window.confirm(`Are you sure you want to ${commandName} the computer?`)){
          handleCommand(command);
      }
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-100">Control Panel</h2>
          <p className="text-xs text-green-400 font-mono">Connected to {connectedIp}</p>
        </div>
        <button onClick={onDisconnect} className="text-sm bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Disconnect
        </button>
      </header>

      <section>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 ml-1">Media Controls</h3>
        <div className="grid grid-cols-3 gap-4">
            <ControlButton onClick={() => handleCommand(CommandType.MEDIA_PREVIOUS)} label="Previous">
                <PrevIcon className="h-8 w-8 text-gray-300" />
            </ControlButton>
            <ControlButton onClick={() => handleCommand(CommandType.MEDIA_PLAY_PAUSE)} label="Play/Pause" className="bg-cyan-600 hover:bg-cyan-500">
                <PlayPauseIcon className="h-8 w-8 text-white" />
            </ControlButton>
            <ControlButton onClick={() => handleCommand(CommandType.MEDIA_NEXT)} label="Next">
                <NextIcon className="h-8 w-8 text-gray-300" />
            </ControlButton>
            <ControlButton onClick={() => handleCommand(CommandType.MEDIA_VOLUME_DOWN)} label="Vol Down">
                <VolumeDownIcon className="h-8 w-8 text-gray-300" />
            </ControlButton>
            <ControlButton onClick={() => handleCommand(CommandType.MEDIA_MUTE)} label="Mute">
                <MuteIcon className="h-8 w-8 text-gray-300" />
            </ControlButton>
            <ControlButton onClick={() => handleCommand(CommandType.MEDIA_VOLUME_UP)} label="Vol Up">
                <VolumeUpIcon className="h-8 w-8 text-gray-300" />
            </ControlButton>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 ml-1">Keyboard Input</h3>
        <form onSubmit={handleSendText} className="flex space-x-2">
            <Input id="keyboard-input" value={textToSend} onChange={e => setTextToSend(e.target.value)} placeholder="Type here and send..." className="flex-grow" />
            <Button type="submit" disabled={!textToSend.trim()} className="h-12">Send</Button>
        </form>
      </section>
      
      <section>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 ml-1">Shortcuts</h3>
        <div className="grid grid-cols-3 gap-4">
           <ControlButton onClick={() => handleCommand(CommandType.OPEN_BROWSER)} label="Browser">
              <BrowserIcon className="h-8 w-8 text-gray-300"/>
           </ControlButton>
            <ControlButton onClick={() => handleCommand(CommandType.OPEN_TERMINAL)} label="Terminal">
              <TerminalIcon className="h-8 w-8 text-gray-300"/>
           </ControlButton>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-red-400 mb-3 ml-1">Power Controls</h3>
        <div className="grid grid-cols-3 gap-4">
            <ControlButton onClick={() => handlePowerCommand(CommandType.POWER_SLEEP)} label="Sleep" className="bg-gray-700 hover:bg-yellow-500">
                <SleepIcon className="h-7 w-7 text-gray-300" />
            </ControlButton>
            <ControlButton onClick={() => handlePowerCommand(CommandType.POWER_RESTART)} label="Restart" className="bg-gray-700 hover:bg-orange-500">
                <RestartIcon className="h-7 w-7 text-gray-300" />
            </ControlButton>
            <ControlButton onClick={() => handlePowerCommand(CommandType.POWER_SHUTDOWN)} label="Shutdown" className="bg-gray-700 hover:bg-red-600">
                <PowerIcon className="h-7 w-7 text-gray-300" />
            </ControlButton>
        </div>
      </section>
    </div>
  );
};

export default ControlPanel;
