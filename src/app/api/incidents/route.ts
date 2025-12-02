import { NextResponse } from 'next/server';
import { addIncident } from '@/lib/mock-data';

// POST /api/incidents - Create a new incident (from Support Portal tickets)
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { title, serviceId, severity } = body;

    // Validate required fields
    if (!title || !serviceId || !severity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, serviceId, severity' },
        { status: 400 }
      );
    }

    // Validate severity value
    if (!['minor', 'major', 'critical'].includes(severity)) {
      return NextResponse.json(
        { success: false, error: 'Invalid severity. Must be: minor, major, or critical' },
        { status: 400 }
      );
    }

    // Create the incident
    const incident = addIncident({
      title,
      serviceId,
      severity: severity as 'minor' | 'major' | 'critical',
    });

    return NextResponse.json(
      {
        success: true,
        data: incident,
        message: 'Incident created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
