import { NextRequest, NextResponse } from 'next/server';
import {
  adminAuthConfigured,
  contentStoreConfigured,
  isAdminRequest,
} from '@/lib/server/adminSession';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      authConfigured: adminAuthConfigured(),
      contentStoreConfigured: contentStoreConfigured(),
      isAdmin: isAdminRequest(request),
    },
    {
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
