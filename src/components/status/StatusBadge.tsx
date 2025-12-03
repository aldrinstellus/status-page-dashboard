'use client';

import { Badge } from '@/components/ui/badge';
import { STATUS_CONFIG, type ServiceStatus } from '@/types/status';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';

interface StatusBadgeProps {
  status: ServiceStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, showIcon = true, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <Badge
      className={cn('border', sizeClasses[size])}
      style={{
        color: isLight ? config.lightTextColor : config.darkTextColor,
        backgroundColor: isLight ? config.lightBgColor : config.darkBgColor,
        borderColor: isLight ? config.lightBorderColor : config.darkBorderColor,
      }}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {showIcon && <span aria-hidden="true">{config.icon}</span>}
      <span>{config.label}</span>
    </Badge>
  );
}
