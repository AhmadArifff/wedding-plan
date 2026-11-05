export type SwarmNodeType =
  | 'container'
  | 'heading'
  | 'text'
  | 'image'
  | 'button'
  | 'badge'
  | 'card'
  | 'divider';

export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SwarmNode {
  id: string;
  type: SwarmNodeType;
  tagName: string;
  rect: BoundingBox;
  text: string;
  domElement?: HTMLElement;
  imgSrc?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  isCenterAligned?: boolean;
  depth: number;
  order: number;
}

export interface SwarmCollaborator {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  accentRing: string;
}

export interface SwarmAssignment {
  collaboratorId: string;
  node: SwarmNode;
  actionDragLabel: string;
  actionSettleLabel: string;
  actionClickLabel: string;
  actionTypeLabel: string;
  actionInspectLabel: string;
}

export interface SwarmWave {
  waveIndex: number;
  assignments: SwarmAssignment[];
  durationMs: number;
}

export type SwarmSubPhase =
  | 'idle'
  | 'traveling'
  | 'dragging'
  | 'settling'
  | 'clicking'
  | 'typing'
  | 'inspecting'
  | 'deselecting'
  | 'scattering'
  | 'celebrating'
  | 'finished';

export interface SwarmCursorLiveState {
  x: number;
  y: number;
  isClicking: boolean;
  isStill: boolean;
  isDragging: boolean;
  action: string;
  visible: boolean;
  opacity?: number;
  scale?: number;
}
