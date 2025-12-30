import { useState, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useMotionDetection } from '@/hooks/useMotionDetection';
import { CameraView } from '@/components/CameraView';
import { ControlPanel } from '@/components/ControlPanel';
import { MotionHistory } from '@/components/MotionHistory';
import { StatusBar } from '@/components/StatusBar';
import { EmailConfig } from '@/components/EmailConfig';
import { toast } from 'sonner';

const Index = () => {
  const [sensitivity, setSensitivity] = useState(60);
  const [minMotionArea, setMinMotionArea] = useState(5);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertEmail, setAlertEmail] = useState('');

  const playAlertSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  const handleMotionDetected = useCallback((event: any) => {
    if (soundEnabled) playAlertSound();
    toast.warning('Motion Detected!', { description: `Captured at ${event.timestamp.toLocaleTimeString()}`, duration: 3000 });
    if (emailEnabled && alertEmail) console.log('Would send email to:', alertEmail, 'with image data');
  }, [soundEnabled, emailEnabled, alertEmail, playAlertSound]);

  const { videoRef, canvasRef, isActive, isMotionDetected, motionLevel, cameraError, motionHistory, startCamera, stopCamera, clearHistory } = useMotionDetection({ sensitivity, minMotionArea, onMotionDetected: handleMotionDetected });

  return (
    <HelmetProvider>
      <Helmet>
        <title>Motion Manager - AI Security Camera</title>
        <meta name="description" content="Web-based motion detection security system with email alerts and real-time monitoring" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <StatusBar isActive={isActive} isConnected={true} emailConfigured={!!alertEmail} captureCount={motionHistory.length} />
        <main className="flex-1 container max-w-7xl mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-scale-in">
                <CameraView videoRef={videoRef} canvasRef={canvasRef} isActive={isActive} isMotionDetected={isMotionDetected} motionLevel={motionLevel} cameraError={cameraError} onStart={startCamera} onStop={stopCamera} />
              </div>
              <MotionHistory events={motionHistory} onClear={clearHistory} />
            </div>
            <div className="space-y-6">
              <ControlPanel sensitivity={sensitivity} minMotionArea={minMotionArea} emailEnabled={emailEnabled} soundEnabled={soundEnabled} onSensitivityChange={setSensitivity} onMinMotionAreaChange={setMinMotionArea} onEmailEnabledChange={setEmailEnabled} onSoundEnabledChange={setSoundEnabled} />
              <EmailConfig email={alertEmail} onEmailChange={setAlertEmail} isConfigured={!!alertEmail} />
              <div className="p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" />Session Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary/50 rounded-lg text-center"><p className="text-2xl font-bold font-mono text-primary">{motionHistory.length}</p><p className="text-xs text-muted-foreground">Captures</p></div>
                  <div className="p-3 bg-secondary/50 rounded-lg text-center"><p className="text-2xl font-bold font-mono text-foreground">{Math.round(motionLevel)}%</p><p className="text-xs text-muted-foreground">Current Motion</p></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t border-border py-4"><div className="container max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground"><span className="font-mono">Motion Manager v1.0</span><span>Built with Lovable</span></div></footer>
      </div>
    </HelmetProvider>
  );
};

export default Index;
