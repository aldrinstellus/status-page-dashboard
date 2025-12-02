import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
}

export function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        variant === 'outline' && 'border',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
