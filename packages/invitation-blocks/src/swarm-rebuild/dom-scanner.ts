import type { SwarmNode, SwarmNodeType, BoundingBox } from './types';

interface ScanOptions {
  minWidth?: number;
  minHeight?: number;
}

export function scanDOMForRebuild(
  rootEl: HTMLElement,
  options: ScanOptions = {}
): SwarmNode[] {
  const { minWidth = 16, minHeight = 12 } = options;
  const rootRect = rootEl.getBoundingClientRect();
  const rawNodes: SwarmNode[] = [];
  let counter = 0;

  const getRelativeRect = (el: HTMLElement): BoundingBox => {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.left - rootRect.left),
      y: Math.round(r.top - rootRect.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };

  const isVisible = (el: HTMLElement, style: CSSStyleDeclaration) => {
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    const r = el.getBoundingClientRect();
    return r.width >= minWidth && r.height >= minHeight;
  };

  const determineType = (
    el: HTMLElement,
    tag: string,
    style: CSSStyleDeclaration
  ): SwarmNodeType => {
    if (tag === 'img' || (el.children.length === 1 && el.firstElementChild?.tagName.toLowerCase() === 'img')) {
      return 'image';
    }
    if (/^h[1-6]$/.test(tag)) return 'heading';
    if (tag === 'button' || tag === 'a' || style.cursor === 'pointer') return 'button';
    if (
      el.classList.contains('badge') ||
      (style.borderRadius && parseInt(style.borderRadius, 10) >= 12 && el.clientHeight < 36)
    ) {
      return 'badge';
    }
    if (
      el.clientHeight <= 4 &&
      (style.backgroundColor || style.borderTopWidth || style.borderBottomWidth)
    ) {
      return 'divider';
    }
    if (
      (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') ||
      style.borderWidth !== '0px' ||
      style.boxShadow !== 'none'
    ) {
      if (el.children.length > 0 && el.clientHeight > 70) return 'card';
    }
    if (el.children.length === 0 && (el.textContent || '').trim().length > 0) return 'text';
    return 'container';
  };

  const candidates: Array<{ el: HTMLElement; depth: number }> = [];

  const walk = (node: HTMLElement, depth: number) => {
    const children = Array.from(node.children) as HTMLElement[];
    for (const child of children) {
      const tag = child.tagName.toLowerCase();
      if (['script', 'style', 'svg', 'path', 'noscript'].includes(tag)) continue;
      if (child.hasAttribute('data-swarm-ignore') || child.classList.contains('swarm-ignore')) continue;

      candidates.push({ el: child, depth });
      walk(child, depth + 1);
    }
  };

  walk(rootEl, 1);

  for (const { el, depth } of candidates) {
    const win = el.ownerDocument.defaultView || window;
    const style = win.getComputedStyle(el);

    if (!isVisible(el, style)) continue;

    const tag = el.tagName.toLowerCase();
    const type = determineType(el, tag, style);
    const rect = getRelativeRect(el);

    // Filter out huge whole-page wrappers
    if (rect.w >= rootRect.width * 0.98 && rect.h >= rootRect.height * 0.95 && depth <= 2) {
      continue;
    }

    // Extract text content if it is a text-focused node or heading
    let text = '';
    if (['heading', 'text', 'button', 'badge'].includes(type)) {
      text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    }

    let imgSrc: string | undefined;
    if (tag === 'img') {
      imgSrc = (el as HTMLImageElement).src;
    } else {
      const childImg = el.querySelector('img');
      if (childImg && el.children.length <= 2) imgSrc = childImg.src;
    }

    // Skip redundant container with no direct text and no visual frame
    if (
      type === 'container' &&
      !text &&
      !imgSrc &&
      style.backgroundColor === 'rgba(0, 0, 0, 0)' &&
      style.borderWidth === '0px' &&
      style.boxShadow === 'none'
    ) {
      continue;
    }

    const isCenterAligned =
      style.textAlign === 'center' ||
      style.justifyContent === 'center' ||
      Math.abs(rect.x + rect.w / 2 - rootRect.width / 2) < 14;

    counter += 1;
    rawNodes.push({
      id: el.getAttribute('data-craft-id') || el.id || `node-${counter}-${tag}`,
      type,
      tagName: tag,
      rect,
      text,
      domElement: el,
      imgSrc,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderRadius: style.borderRadius,
      isCenterAligned,
      depth,
      order: rect.y * 1000 + rect.x,
    });
  }

  // Deduplication: remove parent containers that have virtually identical bounding rect to an inner child
  const cleanNodes: SwarmNode[] = [];
  for (const node of rawNodes) {
    const isRedundantWrapper = rawNodes.some(
      (other) =>
        other !== node &&
        other.depth > node.depth &&
        Math.abs(other.rect.x - node.rect.x) < 4 &&
        Math.abs(other.rect.y - node.rect.y) < 4 &&
        Math.abs(other.rect.w - node.rect.w) < 8 &&
        Math.abs(other.rect.h - node.rect.h) < 8
    );
    if (!isRedundantWrapper) {
      cleanNodes.push(node);
    }
  }

  return cleanNodes.sort((a, b) => a.order - b.order);
}
