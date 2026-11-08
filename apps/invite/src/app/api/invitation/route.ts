import { NextRequest, NextResponse } from 'next/server';
import {
  fetchInvitationConfig,
  saveInvitationConfig,
  type FullInvitationConfig,
} from '@nikahplan/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || 'arif-windi';
    const workspaceId = searchParams.get('workspaceId') || 'ws-demo-001';

    const config = await fetchInvitationConfig(workspaceId, slug);
    return NextResponse.json({ success: true, data: config });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch invitation config';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: FullInvitationConfig = await req.json();
    if (!body || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Invalid invitation payload' },
        { status: 400 }
      );
    }

    const result = await saveInvitationConfig(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to save invitation config';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
