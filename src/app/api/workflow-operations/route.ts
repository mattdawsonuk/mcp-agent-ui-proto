import { NextResponse } from 'next/server';
import { readOperations, createOperations, modifyDeleteOperations, chainedOperations } from '@/data/workflowOperations';

export async function GET() {
  try {
    const operations = {
      read: readOperations,
      create: createOperations,
      modifyDelete: modifyDeleteOperations,
      chained: chainedOperations
    };

    return NextResponse.json(operations);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch workflow operations' },
      { status: 500 }
    );
  }
} 