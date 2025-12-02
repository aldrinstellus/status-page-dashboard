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
        className="text-lg font-semibold text-zinc-100 light:text-zinc-900 mb-4"
      >
        {title}
      </h2>

      {incidents.length === 0 ? (
        <div className="text-center py-8 text-zinc-500 light:text-zinc-600 bg-zinc-900/30 light:bg-zinc-100/50 rounded-xl border border-zinc-800 light:border-zinc-200">
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
