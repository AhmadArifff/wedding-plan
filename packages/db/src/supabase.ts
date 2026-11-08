import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { FullInvitationConfig } from './invitation-types';
import { DEFAULT_FULL_INVITATION_CONFIG } from './invitation-types';

declare const process: { env: Record<string, string | undefined> } | undefined;
declare const Buffer: { from: (data: any) => { toString: (encoding: string) => string } } | undefined;

let cachedSupabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedSupabaseClient) return cachedSupabaseClient;

  const supabaseUrl =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
      : undefined;
  const supabaseKey =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
      : undefined;

  if (supabaseUrl && supabaseKey) {
    try {
      cachedSupabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: true },
      });
      return cachedSupabaseClient;
    } catch {
      return null;
    }
  }

  return null;
}

// In-memory runtime storage for graceful fallback when Supabase credentials are not yet set in .env
let inMemoryConfig: FullInvitationConfig = { ...DEFAULT_FULL_INVITATION_CONFIG };

export async function fetchInvitationConfig(
  workspaceId: string = 'ws-demo-001',
  slug: string = 'arif-windi'
): Promise<FullInvitationConfig> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return inMemoryConfig;
  }

  try {
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      return inMemoryConfig;
    }

    return {
      id: data.id,
      workspaceId: data.workspace_id,
      slug: data.slug,
      isPublished: data.is_published ?? true,
      themeSlug: data.theme_slug || 'classic-sacred',
      hero: data.hero_data || DEFAULT_FULL_INVITATION_CONFIG.hero,
      couple: data.couple_data || DEFAULT_FULL_INVITATION_CONFIG.couple,
      quote: data.quote_data || DEFAULT_FULL_INVITATION_CONFIG.quote,
      events: data.events_data || DEFAULT_FULL_INVITATION_CONFIG.events,
      stories: data.stories_data || DEFAULT_FULL_INVITATION_CONFIG.stories,
      memories: data.memories_data || DEFAULT_FULL_INVITATION_CONFIG.memories,
      envelopes: data.envelopes_data || DEFAULT_FULL_INVITATION_CONFIG.envelopes,
      rsvp: data.rsvp_config || DEFAULT_FULL_INVITATION_CONFIG.rsvp,
      buttonTexts: data.button_texts || DEFAULT_FULL_INVITATION_CONFIG.buttonTexts,
      icons: data.icons_config || DEFAULT_FULL_INVITATION_CONFIG.icons,
      swarm: data.swarm_config || DEFAULT_FULL_INVITATION_CONFIG.swarm,
      musicUrl: data.music_url || DEFAULT_FULL_INVITATION_CONFIG.musicUrl,
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  } catch {
    return inMemoryConfig;
  }
}

export async function saveInvitationConfig(
  config: FullInvitationConfig
): Promise<{ success: boolean; data: FullInvitationConfig; error?: string }> {
  inMemoryConfig = { ...config, updatedAt: new Date().toISOString() };

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true, data: inMemoryConfig };
  }

  try {
    const payload = {
      workspace_id: config.workspaceId,
      slug: config.slug,
      is_published: config.isPublished,
      theme_slug: config.themeSlug,
      hero_data: config.hero,
      couple_data: config.couple,
      quote_data: config.quote,
      events_data: config.events,
      stories_data: config.stories,
      memories_data: config.memories,
      envelopes_data: config.envelopes,
      rsvp_config: config.rsvp,
      button_texts: config.buttonTexts,
      icons_config: config.icons,
      swarm_config: config.swarm,
      music_url: config.musicUrl,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('invitations')
      .upsert(payload, { onConflict: 'slug' })
      .select()
      .maybeSingle();

    if (error) {
      return { success: false, data: inMemoryConfig, error: error.message };
    }

    return { success: true, data: inMemoryConfig };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, data: inMemoryConfig, error: msg };
  }
}

export async function uploadAssetToSupabaseBucket(
  fileBuffer: ArrayBuffer | Uint8Array,
  fileName: string,
  contentType: string,
  category: 'hero' | 'couple' | 'memories' | 'qris' = 'memories',
  workspaceId: string = 'ws-demo-001'
): Promise<{ url: string; path: string }> {
  const supabase = getSupabaseClient();
  const bucketName = 'invitation-assets';
  const cleanFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const storagePath = `workspaces/${workspaceId}/${category}/${cleanFileName}`;

  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
        return { url: publicUrl, path: storagePath };
      }
    } catch {
      // Fallback below
    }
  }

  // Graceful Local Fallback: Convert to Base64 data URL if bucket is not yet connected
  const bytes = new Uint8Array(fileBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = typeof btoa !== 'undefined' ? btoa(binary) : (Buffer ? Buffer.from(bytes).toString('base64') : '');
  const dataUrl = `data:${contentType};base64,${base64}`;

  return { url: dataUrl, path: storagePath };
}
