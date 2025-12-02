import type { Service, Incident } from '@/types/status';

// Mock Services Data (mutable for runtime updates)
export const mockServices: Service[] = [
  {
    id: 'api',
    name: 'API Gateway',
    description: 'Core REST API endpoints and GraphQL services',
    status: 'operational',
    uptime: 99.98,
    lastChecked: new Date().toISOString(),
  },
  {
    id: 'web',
    name: 'Web Application',
    description: 'Main web interface and dashboard',
    status: 'operational',
    uptime: 99.95,
    lastChecked: new Date().toISOString(),
  },
  {
    id: 'db',
    name: 'Database Cluster',
    description: 'PostgreSQL primary and replica nodes',
    status: 'degraded',
    uptime: 99.50,
    lastChecked: new Date().toISOString(),
  },
  {
    id: 'cdn',
    name: 'CDN & Assets',
    description: 'Global content delivery network',
    status: 'operational',
    uptime: 100.00,
    lastChecked: new Date().toISOString(),
  },
  {
    id: 'support-portal',
    name: 'Support Portal',
    description: 'Customer support ticket system',
    status: 'operational',
    uptime: 99.99,
    lastChecked: new Date().toISOString(),
  },
];

// Mock Incidents Data (mutable for runtime additions)
export const mockIncidents: Incident[] = [
  {
    id: 'inc-001',
    serviceId: 'db',
    title: 'Database Performance Degradation',
    status: 'monitoring',
    severity: 'minor',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    updates: [
      {
        id: 'upd-3',
        message: 'Monitoring improvements. Query latency returning to normal levels. Will continue to observe.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: 'upd-2',
        message: 'Identified slow queries causing increased latency. Applying index optimizations.',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'upd-1',
        message: 'Investigating reports of increased database query latency. Some users may experience slower load times.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 'inc-002',
    serviceId: 'api',
    title: 'Scheduled Maintenance Completed',
    status: 'resolved',
    severity: 'minor',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    updates: [
      {
        id: 'upd-2',
        message: 'Maintenance completed successfully. All systems operating normally.',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'upd-1',
        message: 'Beginning scheduled maintenance window. API may be briefly unavailable.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];

// Helper to get active (non-resolved) incidents
export function getActiveIncidents(): Incident[] {
  return mockIncidents.filter((inc) => inc.status !== 'resolved');
}

// Helper to get resolved incidents (for history)
export function getResolvedIncidents(): Incident[] {
  return mockIncidents.filter((inc) => inc.status === 'resolved');
}

// Calculate overall status from services
export function calculateOverallStatus(services: Service[]): Service['status'] {
  const hasOutage = services.some((s) => s.status === 'outage');
  if (hasOutage) return 'outage';

  const hasDegraded = services.some((s) => s.status === 'degraded');
  if (hasDegraded) return 'degraded';

  const hasMaintenance = services.some((s) => s.status === 'maintenance');
  if (hasMaintenance) return 'maintenance';

  return 'operational';
}

// Add a new incident (called from /api/incidents POST)
export function addIncident(data: {
  title: string;
  serviceId: string;
  severity: 'minor' | 'major' | 'critical';
}): Incident {
  const incident: Incident = {
    id: `inc-${Date.now()}`,
    serviceId: data.serviceId,
    title: data.title,
    status: 'investigating',
    severity: data.severity,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updates: [
      {
        id: `upd-${Date.now()}`,
        message: 'Investigating the reported issue. We are aware and working on it.',
        timestamp: new Date().toISOString(),
      },
    ],
  };
  mockIncidents.unshift(incident); // Add to beginning for visibility
  return incident;
}

// Update Support Portal service status (called from health check)
export function updateSupportPortalStatus(status: Service['status']): void {
  const supportPortal = mockServices.find((s) => s.id === 'support-portal');
  if (supportPortal) {
    supportPortal.status = status;
    supportPortal.lastChecked = new Date().toISOString();
  }
}
