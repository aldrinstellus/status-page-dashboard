import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm',
        'light:border-zinc-200 light:bg-white/80',
        className
      )}
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
    <h3 className={cn('text-lg font-semibold text-zinc-100 light:text-zinc-900', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn('text-zinc-400 light:text-zinc-600', className)}>
      {children}
    </div>
  );
}
