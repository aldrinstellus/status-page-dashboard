import { ServiceCard } from './ServiceCard';
import type { Service } from '@/types/status';

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500 light:text-zinc-600">
        No services to display.
      </div>
    );
  }

  return (
    <div className="space-y-3" role="list" aria-label="Service status list">
      {services.map((service) => (
        <div key={service.id} role="listitem">
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );
}
