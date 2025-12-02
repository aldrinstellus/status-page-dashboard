import { NextResponse } from 'next/server';
import { mockServices, mockIncidents, calculateOverallStatus, getActiveIncidents, updateSupportPortalStatus } from '@/lib/mock-data';
import type { StatusResponse, Service } from '@/types/status';

// CORS headers for cross-origin requests from Support Portal
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Health check function to monitor Support Portal
async function checkSupportPortal(): Promise<Service['status']> {
  const supportPortalUrl = process.env.SUPPORT_PORTAL_URL || 'http://localhost:3022';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${supportPortalUrl}/api/health`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return res.ok ? 'operational' : 'outage';
  } catch {
    return 'outage';
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET /api/status - Fetch current system status
export async function GET(): Promise<NextResponse<StatusResponse>> {
  // Simulate realistic API latency (50-150ms)
  await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100));

  // Check Support Portal health and update its status
  const supportPortalStatus = await checkSupportPortal();
  updateSupportPortalStatus(supportPortalStatus);

  // Get current services with updated lastChecked timestamps
  const services = mockServices.map((service) => ({
    ...service,
    lastChecked: new Date().toISOString(),
  }));

  // Calculate overall status from all services
  const overall = calculateOverallStatus(services);

  // Get active (non-resolved) incidents only
  const activeIncidents = getActiveIncidents();

  const response: StatusResponse = {
    success: true,
    data: {
      overall,
      services,
      incidents: activeIncidents,
      lastUpdated: new Date().toISOString(),
    },
  };

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      ...corsHeaders,
    },
  });
}

// POST /api/status/simulate - Simulate status changes (for demo)
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { serviceId, newStatus } = body;

    // In a real app, this would update a database
    // For demo purposes, just return success
    return NextResponse.json({
      success: true,
      message: `Service ${serviceId} status updated to ${newStatus}`,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
