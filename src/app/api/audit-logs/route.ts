import { NextResponse } from 'next/server';
import { initialAuditLogs } from '@/data/auditLogs';

export async function GET() {
  try {
    return NextResponse.json(initialAuditLogs);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
} 