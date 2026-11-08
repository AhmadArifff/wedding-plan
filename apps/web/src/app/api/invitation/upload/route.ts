import { NextRequest, NextResponse } from 'next/server';
import { uploadAssetToSupabaseBucket } from '@nikahplan/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as 'hero' | 'couple' | 'memories' | 'qris') || 'memories';
    const workspaceId = (formData.get('workspaceId') as string) || 'ws-demo-001';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate mime type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedMimes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Format file tidak didukung. Harap unggah gambar JPG, PNG, atau WebP.' },
        { status: 400 }
      );
    }

    // Validate size (max 5MB)
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { success: false, error: 'Ukuran file melebihi batas maksimum 5MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // 1. Save locally to public/uploads in both apps so they can be loaded immediately without internet
    try {
      const publicUploadsWeb = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(publicUploadsWeb)) {
        fs.mkdirSync(publicUploadsWeb, { recursive: true });
      }
      fs.writeFileSync(path.join(publicUploadsWeb, cleanName), buffer);

      // Also copy to apps/invite/public/uploads if it exists
      const inviteUploads = path.resolve(process.cwd(), '..', 'invite', 'public', 'uploads');
      if (fs.existsSync(path.resolve(process.cwd(), '..', 'invite'))) {
        if (!fs.existsSync(inviteUploads)) {
          fs.mkdirSync(inviteUploads, { recursive: true });
        }
        fs.writeFileSync(path.join(inviteUploads, cleanName), buffer);
      }
    } catch {
      // Ignore local file write errors in edge/serverless environments
    }

    // 2. Upload to Supabase Storage Bucket
    const bucketResult = await uploadAssetToSupabaseBucket(
      buffer,
      file.name,
      file.type,
      category,
      workspaceId
    );

    // If bucket returned a data URL (fallback), prefer local static URL `/uploads/cleanName` if available
    const finalUrl = bucketResult.url.startsWith('data:') ? `/uploads/${cleanName}` : bucketResult.url;

    return NextResponse.json({
      success: true,
      url: finalUrl,
      path: bucketResult.path,
      fileName: cleanName,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
