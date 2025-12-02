import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes intelligently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date relative to now
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

// Format date for display
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Format uptime percentage
export function formatUptime(uptime: number): string {
  return `${uptime.toFixed(2)}%`;
}

// Get uptime color based on percentage
export function getUptimeColor(uptime: number): string {
  if (uptime >= 99.9) return 'text-green-400';
  if (uptime >= 99.0) return 'text-yellow-400';
  if (uptime >= 95.0) return 'text-orange-400';
  return 'text-red-400';
}

// Get uptime bar color based on percentage
export function getUptimeBarColor(uptime: number): string {
  if (uptime >= 99.9) return 'bg-green-500';
  if (uptime >= 99.0) return 'bg-yellow-500';
  if (uptime >= 95.0) return 'bg-orange-500';
  return 'bg-red-500';
}
