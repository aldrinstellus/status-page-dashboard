import { cn } from '@/lib/utils';
import { formatUptime, getUptimeColor, getUptimeBarColor } from '@/lib/utils';

interface UptimeBarProps {
  uptime: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function UptimeBar({ uptime, showLabel = true, height = 'md' }: UptimeBarProps) {
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex-1 rounded-full bg-zinc-800 light:bg-zinc-200 overflow-hidden',
          heightClasses[height]
        )}
        role="progressbar"
        aria-valuenow={uptime}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Uptime: ${formatUptime(uptime)}`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            getUptimeBarColor(uptime)
          )}
          style={{ width: `${Math.min(uptime, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn('text-sm font-medium tabular-nums', getUptimeColor(uptime))}>
          {formatUptime(uptime)}
        </span>
      )}
    </div>
  );
}
