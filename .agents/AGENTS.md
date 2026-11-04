# AGENTS.md: Local Project Governance & Agentic Guidelines (`NikahPlan Studio`)

> **Child Spoke Entry File**: File ini tersinkronisasi dengan [`../AGENTS.md`](../AGENTS.md) di root proyek. Baca [`README.md`](./README.md) di direktori ini untuk peta navigasi lengkap aturan, alur kerja, blueprint pengetahuan, skill, dan stubs.

---

## Ringkasan Cepat Konfigurasi Spoke `.agents`

- **Nama Proyek**: `NikahPlan Studio (wedding-plan)`
- **Arsitektur**: Turborepo Monorepo (`apps/web`, `apps/invite`, `packages/db`, `packages/ui`, `packages/invitation-blocks`)
- **Dokumen PRD**:
  - Core PRD: [`../PRD.md`](../PRD.md)
  - Frontend PRD (UI/UX Interaktif & Zero AI-Slop): [`../PRD-FRONTEND.md`](../PRD-FRONTEND.md)
  - Backend PRD (Safe Logic Flow, DB Views/RPCs & Security): [`../PRD-BACKEND.md`](../PRD-BACKEND.md)
- **Session State**: [`./session-state.json`](./session-state.json)
- **Git Branching**:
  - Development: `dev` (Commit & auto-push setiap perubahan ke `origin dev`)
  - Production: `main` (**DILARANG MERGE OTOMATIS** dari `dev` ke `main` — dilakukan manual oleh User)
