'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Incident } from '@/types/status';
import { INCIDENT_STATUS_CONFIG, SEVERITY_CONFIG } from '@/types/status';
import { formatDateTime, formatRelativeTime, cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';

interface IncidentCardProps {
  incident: Incident;
  showUpdates?: boolean;
}

export function IncidentCard({ incident, showUpdates = true }: IncidentCardProps) {
  const statusConfig = INCIDENT_STATUS_CONFIG[incident.status];
  const severityConfig = SEVERITY_CONFIG[incident.severity];
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <Card className="border-l-4 border-l-yellow-500/50">
      <article aria-label={`Incident: ${incident.title}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h4
              className="text-base font-semibold"
              style={{ color: 'var(--sp-text-primary)' }}
            >
              {incident.title}
            </h4>
            <p
              className="text-sm mt-1"
              style={{ color: 'var(--sp-text-muted)' }}
            >
              Started {formatRelativeTime(incident.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className="border"
              style={{
                color: isLight ? severityConfig.lightTextColor : severityConfig.darkTextColor,
                backgroundColor: isLight ? severityConfig.lightBgColor : severityConfig.darkBgColor,
                borderColor: 'currentColor',
                borderOpacity: 0.2,
              }}
            >
              {severityConfig.label}
            </Badge>
            <Badge
              className="border"
              style={{
                color: isLight ? statusConfig.lightTextColor : statusConfig.darkTextColor,
                backgroundColor: isLight ? statusConfig.lightBgColor : statusConfig.darkBgColor,
                borderColor: 'currentColor',
                borderOpacity: 0.2,
              }}
            >
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        {showUpdates && incident.updates.length > 0 && (
          <div
            className="mt-4 space-y-3 border-t pt-3"
            style={{ borderColor: 'var(--sp-border)' }}
          >
            <h5
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: 'var(--sp-text-muted)' }}
            >
              Updates
            </h5>
            <div className="space-y-3">
              {incident.updates.map((update, index) => (
                <div
                  key={update.id}
                  className={cn(
                    'relative pl-4 border-l-2',
                    index === 0 ? 'border-l-zinc-400' : ''
                  )}
                  style={{
                    borderLeftColor: index === 0 ? undefined : 'var(--sp-border-light)'
                  }}
                >
                  <p
                    className="text-sm"
                    style={{ color: 'var(--sp-text-secondary)' }}
                  >
                    {update.message}
                  </p>
                  <time
                    className="text-xs mt-1 block"
                    style={{ color: 'var(--sp-text-muted)' }}
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
