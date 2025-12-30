import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings, Volume2, Mail } from 'lucide-react';

interface ControlPanelProps {
  sensitivity: number;
  minMotionArea: number;
  emailEnabled: boolean;
  soundEnabled: boolean;
  onSensitivityChange: (value: number) => void;
  onMinMotionAreaChange: (value: number) => void;
  onEmailEnabledChange: (enabled: boolean) => void;
  onSoundEnabledChange: (enabled: boolean) => void;
}

export const ControlPanel = ({ sensitivity, minMotionArea, emailEnabled, soundEnabled, onSensitivityChange, onMinMotionAreaChange, onEmailEnabledChange, onSoundEnabledChange }: ControlPanelProps) => {
  return (
    <div className="p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-lg">Detection Settings</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Sensitivity</label>
            <span className="font-mono text-xs text-muted-foreground">{sensitivity}%</span>
          </div>
          <Slider value={[sensitivity]} onValueChange={([val]) => onSensitivityChange(val)} min={10} max={100} step={5} className="w-full" />
          <p className="text-xs text-muted-foreground">Higher values detect smaller movements</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Motion Threshold</label>
            <span className="font-mono text-xs text-muted-foreground">{minMotionArea}%</span>
          </div>
          <Slider value={[minMotionArea]} onValueChange={([val]) => onMinMotionAreaChange(val)} min={1} max={30} step={1} className="w-full" />
          <p className="text-xs text-muted-foreground">Minimum area that must change to trigger alert</p>
        </div>
        <div className="h-px bg-border my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary" />
            <div>
              <label className="text-sm font-medium">Email Alerts</label>
              <p className="text-xs text-muted-foreground">Send captures via email</p>
            </div>
          </div>
          <Switch checked={emailEnabled} onCheckedChange={onEmailEnabledChange} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-primary" />
            <div>
              <label className="text-sm font-medium">Sound Alerts</label>
              <p className="text-xs text-muted-foreground">Play sound on motion</p>
            </div>
          </div>
          <Switch checked={soundEnabled} onCheckedChange={onSoundEnabledChange} />
        </div>
      </div>
    </div>
  );
};
