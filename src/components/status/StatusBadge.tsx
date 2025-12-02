import { Badge } from '@/components/ui/badge';
import { STATUS_CONFIG, type ServiceStatus } from '@/types/status';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ServiceStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, showIcon = true, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <Badge
      className={cn(
        config.bgColor,
        config.color,
        config.borderColor,
        'border',
        sizeClasses[size]
      )}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {showIcon && <span aria-hidden="true">{config.icon}</span>}
      <span>{config.label}</span>
    </Badge>
  );
}
