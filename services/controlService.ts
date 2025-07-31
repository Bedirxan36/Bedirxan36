
import { CommandType } from '../types';

// This is a mock service. In a real application, this would use WebSockets
// or another protocol to communicate with a server on the target PC.

class ControlService {
  private isConnected: boolean = false;

  // Simulate a connection attempt to the PC server
  public connect(ip: string, key: string): Promise<boolean> {
    console.log(`Attempting to connect to ${ip} with key ${key}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demonstration, we use a hardcoded IP and a set of valid keys.
        // The PC app would generate and display one of these keys.
        const validKeys = ['KEY-A4B7', 'KEY-C9D2', 'KEY-E3F8'];
        if (ip === '192.168.1.100' && validKeys.includes(key.toUpperCase())) {
          console.log('Connection successful.');
          this.isConnected = true;
          resolve(true);
        } else {
          console.error('Connection failed: Invalid IP or Key.');
          this.isConnected = false;
          resolve(false);
        }
      }, 1500); // Simulate network latency
    });
  }

  // Simulate disconnecting
  public disconnect(): void {
    console.log('Disconnected.');
    this.isConnected = false;
  }

  // Simulate sending a command to the PC server
  public sendCommand(command: CommandType, value?: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        console.error('Cannot send command: Not connected.');
        return reject('Not connected');
      }
      
      console.log(`[COMMAND SENT] -> Type: ${command}`, value !== undefined ? `| Value: "${value}"` : '');
      
      // In a real app, you would send this over the network.
      // For now, we just resolve immediately.
      resolve();
    });
  }
}

export const controlService = new ControlService();
