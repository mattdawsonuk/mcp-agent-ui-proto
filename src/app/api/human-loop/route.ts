import { NextResponse } from 'next/server';
import { humanLoopExamples, humanLoopIntro } from '@/data/humanLoop';

export async function GET() {
  try {
    return NextResponse.json({ intro: humanLoopIntro, examples: humanLoopExamples });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch human-in-the-loop data' },
      { status: 500 }
    );
  }
} 