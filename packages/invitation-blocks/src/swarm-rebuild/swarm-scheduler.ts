import type { SwarmNode, SwarmCollaborator, SwarmWave, SwarmAssignment } from './types';

export function scheduleSwarmWaves(
  nodes: SwarmNode[],
  collaborators: SwarmCollaborator[]
): SwarmWave[] {
  if (nodes.length === 0 || collaborators.length === 0) return [];

  const waves: SwarmWave[] = [];
  const chunkSize = collaborators.length;

  for (let i = 0; i < nodes.length; i += chunkSize) {
    const slice = nodes.slice(i, i + chunkSize);
    const assignments: SwarmAssignment[] = [];
    let maxTextLen = 0;

    slice.forEach((node, idx) => {
      const collaborator = collaborators[idx % collaborators.length];
      const textPreview = node.text ? `"${node.text.slice(0, 24)}${node.text.length > 24 ? '...' : ''}"` : '';
      if (node.text && node.text.length > maxTextLen) {
        maxTextLen = node.text.length;
      }

      let dragLabel = `Tarik ${node.type}: ${node.rect.w}x${node.rect.h}px`;
      let settleLabel = `Validasi Posisi ${node.type}`;
      let clickLabel = `Klik Masuk Edit [${node.tagName.toUpperCase()}]`;
      let typeLabel = node.text ? `Mengetik ${textPreview}` : `Merender ${node.type}`;
      let inspectLabel = `Validasi ${node.type}`;

      if (node.type === 'heading') {
        dragLabel = `Tarik Frame Judul: ${node.rect.w}x${node.rect.h}px`;
        settleLabel = 'Validasi Posisi Judul';
        clickLabel = 'Klik Mode Teks Header [T]';
        inspectLabel = 'Validasi Tipografi Judul';
      } else if (node.type === 'image') {
        dragLabel = `Tarik Frame Gambar: ${node.rect.w}x${node.rect.h}px`;
        settleLabel = 'Validasi Aspek Rasio Gambar';
        clickLabel = 'Klik Pasang Media Gambar';
        typeLabel = 'Memasang Aset Visual...';
        inspectLabel = 'Validasi Resolusi Gambar';
      } else if (node.type === 'button') {
        dragLabel = `Tarik Tombol CTA: ${node.rect.w}x${node.rect.h}px`;
        settleLabel = 'Validasi Ukuran Tap Target';
        clickLabel = 'Klik Edit Aksi Tombol';
        typeLabel = `Mengetik Tombol ${textPreview}`;
        inspectLabel = 'Validasi Komponen Tombol';
      } else if (node.type === 'card') {
        dragLabel = `Tarik Kontainer Kartu: ${node.rect.w}x${node.rect.h}px`;
        settleLabel = 'Validasi Padding & Radius Kartu';
        clickLabel = 'Klik Format Layout Kartu';
        typeLabel = 'Merender Kontainer Kartu...';
        inspectLabel = 'Validasi Struktur Kartu';
      }

      assignments.push({
        collaboratorId: collaborator.id,
        node,
        actionDragLabel: dragLabel,
        actionSettleLabel: settleLabel,
        actionClickLabel: clickLabel,
        actionTypeLabel: typeLabel,
        actionInspectLabel: inspectLabel,
      });
    });

    // Duration is proportional to text length (between 1000ms and 1800ms)
    const durationMs = Math.min(1850, Math.max(1050, 1000 + maxTextLen * 12));

    waves.push({
      waveIndex: waves.length,
      assignments,
      durationMs,
    });
  }

  return waves;
}
