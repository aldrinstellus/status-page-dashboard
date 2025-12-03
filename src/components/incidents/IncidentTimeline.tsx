import { IncidentCard } from './IncidentCard';
import type { Incident } from '@/types/status';

interface IncidentTimelineProps {
  incidents: Incident[];
  title?: string;
  emptyMessage?: string;
}

export function IncidentTimeline({
  incidents,
  title = 'Active Incidents',
  emptyMessage = 'No active incidents',
}: IncidentTimelineProps) {
  return (
    <section aria-labelledby="incidents-heading">
      <h2
        id="incidents-heading"
        className="text-lg font-semibold mb-4"
        style={{ color: 'var(--sp-text-primary)' }}
      >
        {title}
      </h2>

      {incidents.length === 0 ? (
        <div
          className="text-center py-8 rounded-xl border"
          style={{
            color: 'var(--sp-text-muted)',
            background: 'var(--sp-bg-muted)',
            borderColor: 'var(--sp-border)'
          }}
        >
          <div className="text-2xl mb-2">✓</div>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3" role="list" aria-label="Incident list">
          {incidents.map((incident) => (
            <div key={incident.id} role="listitem">
              <IncidentCard incident={incident} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
