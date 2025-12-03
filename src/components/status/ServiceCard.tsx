import { Card } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { UptimeBar } from './UptimeBar';
import type { Service } from '@/types/status';
import { formatRelativeTime } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="transition-all duration-200 hover:opacity-90">
      <article aria-label={`${service.name} status`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-semibold truncate"
              style={{ color: 'var(--sp-text-primary)' }}
            >
              {service.name}
            </h3>
            <p
              className="text-sm mt-0.5 line-clamp-1"
              style={{ color: 'var(--sp-text-muted)' }}
            >
              {service.description}
            </p>
          </div>
          <StatusBadge status={service.status} size="sm" />
        </div>

        <div className="space-y-2">
          <div
            className="flex items-center justify-between text-xs"
            style={{ color: 'var(--sp-text-muted)' }}
          >
            <span>Uptime (30 days)</span>
            <span>Last checked: {formatRelativeTime(service.lastChecked)}</span>
          </div>
          <UptimeBar uptime={service.uptime} height="sm" />
        </div>
      </article>
    </Card>
  );
}
