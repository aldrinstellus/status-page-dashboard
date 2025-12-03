import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 backdrop-blur-sm',
        className
      )}
      style={{
        borderColor: 'var(--sp-border)',
        background: 'var(--sp-bg-card)'
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn('mb-3', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3
      className={cn('text-lg font-semibold', className)}
      style={{ color: 'var(--sp-text-primary)' }}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div
      className={cn('', className)}
      style={{ color: 'var(--sp-text-secondary)' }}
    >
      {children}
    </div>
  );
}
