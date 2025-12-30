import { Clock, Download, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MotionEvent { id: string; timestamp: Date; imageData: string; motionLevel: number; }
interface MotionHistoryProps { events: MotionEvent[]; onClear: () => void; }

export const MotionHistory = ({ events, onClear }: MotionHistoryProps) => {
  const downloadImage = (event: MotionEvent) => {
    const link = document.createElement('a');
    link.href = event.imageData;
    link.download = `motion-${event.timestamp.toISOString()}.jpg`;
    link.click();
  };

  return (
    <div className="p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Motion History</h2>
          <span className="px-2 py-0.5 bg-secondary rounded-full text-xs font-mono text-muted-foreground">{events.length}</span>
        </div>
        {events.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground hover:text-danger">
            <Trash2 className="w-4 h-4 mr-1" />Clear
          </Button>
        )}
      </div>
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Image className="w-10 h-10 mb-3 opacity-50" />
          <p className="text-sm">No motion events captured</p>
          <p className="text-xs mt-1">Events will appear here when motion is detected</p>
        </div>
      ) : (
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {events.map((event, index) => (
              <div key={event.id} className="flex gap-3 p-3 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <img src={event.imageData} alt={`Motion at ${event.timestamp.toLocaleTimeString()}`} className="w-20 h-14 object-cover rounded border border-border" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm text-foreground">{event.timestamp.toLocaleTimeString()}</p>
                  <p className="text-xs text-muted-foreground">{event.timestamp.toLocaleDateString()}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-danger" style={{ width: `${event.motionLevel}%` }} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{Math.round(event.motionLevel)}%</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => downloadImage(event)} className="shrink-0 text-muted-foreground hover:text-primary">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
