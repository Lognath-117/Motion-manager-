import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface EmailConfigProps { email: string; onEmailChange: (email: string) => void; isConfigured: boolean; }

export const EmailConfig = ({ email, onEmailChange, isConfigured }: EmailConfigProps) => {
  const [inputValue, setInputValue] = useState(email);
  const [isEditing, setIsEditing] = useState(!isConfigured);

  const handleSave = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) { toast.error('Please enter a valid email address'); return; }
    onEmailChange(inputValue);
    setIsEditing(false);
    toast.success('Email configured successfully');
  };

  return (
    <div className="p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-lg">Alert Destination</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Motion captures will be sent to this email address</p>
      {isEditing ? (
        <div className="space-y-3">
          <Input type="email" placeholder="your@email.com" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="bg-secondary border-border" />
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1"><Check className="w-4 h-4 mr-2" />Save</Button>
            {isConfigured && (<Button variant="outline" onClick={() => { setInputValue(email); setIsEditing(false); }}>Cancel</Button>)}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-primary" /></div>
            <span className="font-mono text-sm">{email}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
        </div>
      )}
      <div className="mt-4 flex items-start gap-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
        <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-warning/80">Email sending requires backend configuration. Connect to Lovable Cloud to enable this feature.</p>
      </div>
    </div>
  );
};
