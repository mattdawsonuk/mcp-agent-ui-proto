import { NextResponse } from 'next/server';
import { initialWorkflowMetrics } from '@/data/workflowMetrics';

export async function GET() {
  try {
    return NextResponse.json(initialWorkflowMetrics);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch workflow metrics' },
      { status: 500 }
    );
  }
} 