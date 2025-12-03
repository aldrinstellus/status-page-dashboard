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
// Note: Dark mode is default, .light class enables light mode
// Uses CSS variable-based colors for theme-aware styling
export const STATUS_CONFIG: Record<ServiceStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  // Theme-aware inline style colors
  darkTextColor: string;
  lightTextColor: string;
  darkBgColor: string;
  lightBgColor: string;
  darkBorderColor: string;
  lightBorderColor: string;
}> = {
  operational: {
    label: 'Operational',
    color: '',
    bgColor: '',
    borderColor: '',
    icon: '✓',
    darkTextColor: '#4ade80',
    lightTextColor: '#15803d',
    darkBgColor: 'rgba(34, 197, 94, 0.2)',
    lightBgColor: '#dcfce7',
    darkBorderColor: 'rgba(34, 197, 94, 0.3)',
    lightBorderColor: '#86efac',
  },
  degraded: {
    label: 'Degraded Performance',
    color: '',
    bgColor: '',
    borderColor: '',
    icon: '⚠',
    darkTextColor: '#facc15',
    lightTextColor: '#b45309',
    darkBgColor: 'rgba(234, 179, 8, 0.2)',
    lightBgColor: '#fef3c7',
    darkBorderColor: 'rgba(234, 179, 8, 0.3)',
    lightBorderColor: '#fcd34d',
  },
  outage: {
    label: 'Major Outage',
    color: '',
    bgColor: '',
    borderColor: '',
    icon: '✕',
    darkTextColor: '#f87171',
    lightTextColor: '#b91c1c',
    darkBgColor: 'rgba(239, 68, 68, 0.2)',
    lightBgColor: '#fee2e2',
    darkBorderColor: 'rgba(239, 68, 68, 0.3)',
    lightBorderColor: '#fca5a5',
  },
  maintenance: {
    label: 'Under Maintenance',
    color: '',
    bgColor: '',
    borderColor: '',
    icon: '🔧',
    darkTextColor: '#60a5fa',
    lightTextColor: '#1d4ed8',
    darkBgColor: 'rgba(59, 130, 246, 0.2)',
    lightBgColor: '#dbeafe',
    darkBorderColor: 'rgba(59, 130, 246, 0.3)',
    lightBorderColor: '#93c5fd',
  },
};

// Incident Status Configuration
// Note: Dark mode is default, .light class enables light mode
export const INCIDENT_STATUS_CONFIG: Record<IncidentStatus, {
  label: string;
  color: string;
  bgColor: string;
  darkTextColor: string;
  lightTextColor: string;
  darkBgColor: string;
  lightBgColor: string;
}> = {
  investigating: {
    label: 'Investigating',
    color: '',
    bgColor: '',
    darkTextColor: '#f87171',
    lightTextColor: '#b91c1c',
    darkBgColor: 'rgba(239, 68, 68, 0.2)',
    lightBgColor: '#fee2e2',
  },
  identified: {
    label: 'Identified',
    color: '',
    bgColor: '',
    darkTextColor: '#fb923c',
    lightTextColor: '#c2410c',
    darkBgColor: 'rgba(249, 115, 22, 0.2)',
    lightBgColor: '#ffedd5',
  },
  monitoring: {
    label: 'Monitoring',
    color: '',
    bgColor: '',
    darkTextColor: '#facc15',
    lightTextColor: '#b45309',
    darkBgColor: 'rgba(234, 179, 8, 0.2)',
    lightBgColor: '#fef3c7',
  },
  resolved: {
    label: 'Resolved',
    color: '',
    bgColor: '',
    darkTextColor: '#4ade80',
    lightTextColor: '#15803d',
    darkBgColor: 'rgba(34, 197, 94, 0.2)',
    lightBgColor: '#dcfce7',
  },
};

// Severity Configuration
// Note: Dark mode is default, .light class enables light mode
export const SEVERITY_CONFIG: Record<IncidentSeverity, {
  label: string;
  color: string;
  bgColor: string;
  darkTextColor: string;
  lightTextColor: string;
  darkBgColor: string;
  lightBgColor: string;
}> = {
  minor: {
    label: 'Minor',
    color: '',
    bgColor: '',
    darkTextColor: '#facc15',
    lightTextColor: '#b45309',
    darkBgColor: 'rgba(234, 179, 8, 0.2)',
    lightBgColor: '#fef3c7',
  },
  major: {
    label: 'Major',
    color: '',
    bgColor: '',
    darkTextColor: '#fb923c',
    lightTextColor: '#c2410c',
    darkBgColor: 'rgba(249, 115, 22, 0.2)',
    lightBgColor: '#ffedd5',
  },
  critical: {
    label: 'Critical',
    color: '',
    bgColor: '',
    darkTextColor: '#f87171',
    lightTextColor: '#b91c1c',
    darkBgColor: 'rgba(239, 68, 68, 0.2)',
    lightBgColor: '#fee2e2',
  },
};
