import { Shield, Wifi, WifiOff, Zap } from 'lucide-react';

interface StatusBarProps { isActive: boolean; isConnected: boolean; emailConfigured: boolean; captureCount: number; }

export const StatusBar = ({ isActive, captureCount }: StatusBarProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-card/50 backdrop-blur border-b border-border">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <span className="font-semibold">Motion Manager</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Zap className={`w-4 h-4 ${captureCount > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
          <span className="font-mono text-xs text-muted-foreground">{captureCount} captures</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
          {isActive ? (<><Wifi className="w-3 h-3" /><span>Active</span></>) : (<><WifiOff className="w-3 h-3" /><span>Inactive</span></>)}
        </div>
      </div>
    </div>
  );
};
