import { NextResponse } from 'next/server';
import { mockUserProfile } from '@/data/userProfile';

export async function GET() {
  try {
    return NextResponse.json(mockUserProfile);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
} 