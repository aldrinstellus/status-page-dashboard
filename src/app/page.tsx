'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, RefreshCw, ExternalLink } from 'lucide-react';
import { useTheme } from '@/components/providers';
import { ServiceList, StatusBadge } from '@/components/status';
import { IncidentTimeline } from '@/components/incidents';
import type { StatusResponse, ServiceStatus } from '@/types/status';
import { formatRelativeTime, cn } from '@/lib/utils';

export default function StatusPage() {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<StatusResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  const supportPortalUrl = process.env.NEXT_PUBLIC_SUPPORT_PORTAL_URL || 'http://localhost:3022';

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      if (!response.ok) throw new Error('Failed to fetch status');
      const result: StatusResponse = await response.json();
      setData(result.data);
      setLastRefresh(new Date().toISOString());
      setError(null);
    } catch (err) {
      setError('Unable to load status. Please try again.');
      console.error('Status fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Poll every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getOverallMessage = (status: ServiceStatus): string => {
    switch (status) {
      case 'operational':
        return 'All systems operational';
      case 'degraded':
        return 'Some systems experiencing issues';
      case 'outage':
        return 'Major service disruption';
      case 'maintenance':
        return 'Scheduled maintenance in progress';
      default:
        return 'Status unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3" style={{ color: 'var(--sp-text-muted)' }}>
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Loading status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchStatus}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ background: 'var(--sp-bg-hover)', color: 'var(--sp-text-primary)' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header
        className="border-b backdrop-blur-sm sticky top-0 z-10"
        style={{
          borderColor: 'var(--sp-border)',
          background: 'var(--sp-bg-card)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                JL
              </div>
              <h1
                className="text-xl font-bold"
                style={{ color: 'var(--sp-text-primary)' }}
              >
                System Status
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchStatus}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--sp-text-secondary)' }}
                aria-label="Refresh status"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--sp-text-secondary)' }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Overall Status Banner */}
        {data && (
          <section
            className={cn(
              'rounded-xl border p-6 text-center',
              data.overall === 'operational' && 'border-green-500/30 bg-green-500/10',
              data.overall === 'degraded' && 'border-yellow-500/30 bg-yellow-500/10',
              data.overall === 'outage' && 'border-red-500/30 bg-red-500/10',
              data.overall === 'maintenance' && 'border-blue-500/30 bg-blue-500/10'
            )}
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-3">
              <StatusBadge status={data.overall} size="lg" />
              <p
                className="text-lg"
                style={{ color: 'var(--sp-text-secondary)' }}
              >
                {getOverallMessage(data.overall)}
              </p>
              <p style={{ color: 'var(--sp-text-muted)', fontSize: '0.75rem' }}>
                Last updated: {formatRelativeTime(data.lastUpdated)}
              </p>
            </div>
          </section>
        )}

        {/* Services Section */}
        {data && (
          <section aria-labelledby="services-heading">
            <h2
              id="services-heading"
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--sp-text-primary)' }}
            >
              Services
            </h2>
            <ServiceList services={data.services} />
          </section>
        )}

        {/* Active Incidents Section */}
        {data && (
          <IncidentTimeline
            incidents={data.incidents}
            title="Active Incidents"
            emptyMessage="All systems are operating normally. No incidents to report."
          />
        )}

        {/* Footer */}
        <footer
          className="text-center pt-8 border-t"
          style={{
            borderColor: 'var(--sp-border)',
            color: 'var(--sp-text-muted)',
            fontSize: '0.75rem'
          }}
        >
          <a
            href={supportPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 mb-4 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: 'var(--sp-bg-hover)',
              color: 'var(--sp-text-secondary)'
            }}
          >
            <ExternalLink className="h-4 w-4" />
            Back to Support Portal
          </a>
          <p>Built with Justice League SDLC Pipeline</p>
          <p className="mt-1">
            9 Agents • Full SDLC • ~$1.50 Total Cost
          </p>
        </footer>
      </div>
    </main>
  );
}
