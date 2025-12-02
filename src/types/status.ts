// Service Status Types
export type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';
export type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';
export type IncidentSeverity = 'minor' | 'major' | 'critical';

// Service Interface
export interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  uptime: number; // 0-100 percentage
  lastChecked: string;
}

// Incident Update Interface
export interface IncidentUpdate {
  id: string;
  message: string;
  timestamp: string;
}

// Incident Interface
export interface Incident {
  id: string;
  serviceId: string;
  title: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdAt: string;
  updatedAt: string;
  updates: IncidentUpdate[];
}

// API Response Interface
export interface StatusResponse {
  success: boolean;
  data: {
    overall: ServiceStatus;
    services: Service[];
    incidents: Incident[];
    lastUpdated: string;
  };
}

// Status Configuration for UI
export const STATUS_CONFIG: Record<ServiceStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}> = {
  operational: {
    label: 'Operational',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    icon: '✓'
  },
  degraded: {
    label: 'Degraded Performance',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: '⚠'
  },
  outage: {
    label: 'Major Outage',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: '✕'
  },
  maintenance: {
    label: 'Under Maintenance',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: '🔧'
  },
};

// Incident Status Configuration
export const INCIDENT_STATUS_CONFIG: Record<IncidentStatus, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  investigating: { label: 'Investigating', color: 'text-red-400', bgColor: 'bg-red-500/20' },
  identified: { label: 'Identified', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  monitoring: { label: 'Monitoring', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  resolved: { label: 'Resolved', color: 'text-green-400', bgColor: 'bg-green-500/20' },
};

// Severity Configuration
export const SEVERITY_CONFIG: Record<IncidentSeverity, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  minor: { label: 'Minor', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  major: { label: 'Major', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  critical: { label: 'Critical', color: 'text-red-400', bgColor: 'bg-red-500/20' },
};
