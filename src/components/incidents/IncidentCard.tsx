import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Incident } from '@/types/status';
import { INCIDENT_STATUS_CONFIG, SEVERITY_CONFIG } from '@/types/status';
import { formatDateTime, formatRelativeTime, cn } from '@/lib/utils';

interface IncidentCardProps {
  incident: Incident;
  showUpdates?: boolean;
}

export function IncidentCard({ incident, showUpdates = true }: IncidentCardProps) {
  const statusConfig = INCIDENT_STATUS_CONFIG[incident.status];
  const severityConfig = SEVERITY_CONFIG[incident.severity];

  return (
    <Card className="border-l-4 border-l-yellow-500/50">
      <article aria-label={`Incident: ${incident.title}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-zinc-100 light:text-zinc-900">
              {incident.title}
            </h4>
            <p className="text-sm text-zinc-500 light:text-zinc-600 mt-1">
              Started {formatRelativeTime(incident.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={cn(severityConfig.bgColor, severityConfig.color, 'border border-current/20')}>
              {severityConfig.label}
            </Badge>
            <Badge className={cn(statusConfig.bgColor, statusConfig.color, 'border border-current/20')}>
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {showUpdates && incident.updates.length > 0 && (
          <div className="mt-4 space-y-3 border-t border-zinc-800 light:border-zinc-200 pt-3">
            <h5 className="text-xs font-medium uppercase tracking-wider text-zinc-500 light:text-zinc-600">
              Updates
            </h5>
            <div className="space-y-3">
              {incident.updates.map((update, index) => (
                <div
                  key={update.id}
                  className={cn(
                    'relative pl-4 border-l-2',
                    index === 0 ? 'border-l-zinc-400' : 'border-l-zinc-700 light:border-l-zinc-300'
                  )}
                >
                  <p className="text-sm text-zinc-300 light:text-zinc-700">
                    {update.message}
                  </p>
                  <time
                    className="text-xs text-zinc-500 light:text-zinc-600 mt-1 block"
                    dateTime={update.timestamp}
                  >
                    {formatDateTime(update.timestamp)}
                  </time>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </Card>
  );
}
