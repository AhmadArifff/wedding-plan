-- ==============================================================================
-- Migration: 20261108000001_invitations_and_storage.sql
-- Description: Table schema for digital invitations, JSONB content blocks,
--              Supabase Storage Bucket for assets, and RLS policies.
-- Ground Truth: PRD-BACKEND.md, PRD-FRONTEND.md
-- ==============================================================================

-- 1. Create table public.invitations
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    theme_slug TEXT NOT NULL DEFAULT 'classic-sacred',
    is_published BOOLEAN NOT NULL DEFAULT TRUE,

    -- Structured JSONB Content Blocks
    hero_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    couple_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    quote_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    events_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    stories_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    memories_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    envelopes_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    rsvp_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    button_texts JSONB NOT NULL DEFAULT '{}'::jsonb,
    icons_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    swarm_config JSONB NOT NULL DEFAULT '{}'::jsonb,

    music_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for high-throughput public view lookups by slug
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_workspace ON public.invitations(workspace_id);

-- 2. Row Level Security (RLS) on public.invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Anonymous & authenticated users can read published invitations by slug
CREATE POLICY "Public read published invitations"
    ON public.invitations
    FOR SELECT
    USING (is_published IS TRUE);

-- Workspace members (OWNER, EDITOR) can select, insert, update, delete their own invitations
CREATE POLICY "Workspace members manage invitations"
    ON public.invitations
    FOR ALL
    USING (
        public.has_workspace_role(workspace_id, ARRAY['OWNER', 'EDITOR'])
    )
    WITH CHECK (
        public.has_workspace_role(workspace_id, ARRAY['OWNER', 'EDITOR'])
    );

-- 3. Setup Supabase Storage Bucket: invitation-assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'invitation-assets',
    'invitation-assets',
    TRUE,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = TRUE,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- Storage RLS Policies for invitation-assets
CREATE POLICY "Public Access Invitation Assets"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'invitation-assets');

CREATE POLICY "Authenticated Upload Invitation Assets"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'invitation-assets');

CREATE POLICY "Authenticated Update/Delete Invitation Assets"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'invitation-assets');

CREATE POLICY "Authenticated Delete Invitation Assets"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'invitation-assets');

-- ==============================================================================
-- Rollback Script:
-- DROP POLICY IF EXISTS "Public read published invitations" ON public.invitations;
-- DROP POLICY IF EXISTS "Workspace members manage invitations" ON public.invitations;
-- DROP TABLE IF EXISTS public.invitations CASCADE;
-- DELETE FROM storage.buckets WHERE id = 'invitation-assets';
-- ==============================================================================
