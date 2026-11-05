import type { SwarmNode, SwarmNodeType, BoundingBox } from './types';

interface ScanOptions {
  minWidth?: number;
  minHeight?: number;
}

export function scanDOMForRebuild(
  rootEl: HTMLElement,
  options: ScanOptions = {}
): SwarmNode[] {
  const { minWidth = 10, minHeight = 10 } = options;
  const rootRect = rootEl.getBoundingClientRect();
  const rawNodes: SwarmNode[] = [];
  let counter = 0;

  const getRelativeRect = (el: Element): BoundingBox => {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.left - rootRect.left),
      y: Math.round(r.top - rootRect.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };

  const isElementVisible = (el: Element): boolean => {
    // We do NOT check opacity or visibility here so elements masked with opacity: 0
    // on initial render are still accurately measured via getBoundingClientRect!
    if (el instanceof HTMLElement && el.style.display === 'none') {
      return false;
    }
    const r = el.getBoundingClientRect();
    return r.width >= minWidth && r.height >= minHeight;
  };

  const determineType = (
    el: Element,
    tag: string,
    style?: CSSStyleDeclaration
  ): SwarmNodeType => {
    // 1. Icon (SVG or single SVG wrapper)
    if (tag === 'svg' || el.classList.contains('lucide')) {
      return 'icon';
    }
    if (el.children.length === 1 && el.firstElementChild?.tagName.toLowerCase() === 'svg') {
      const r = el.getBoundingClientRect();
      if (r.width <= 48 && r.height <= 48) {
        return 'icon';
      }
    }

    // 2. Image
    if (tag === 'img' || (el.children.length === 1 && el.firstElementChild?.tagName.toLowerCase() === 'img')) {
      return 'image';
    }

    // 3. Form input / controls
    if (['input', 'select', 'textarea'].includes(tag)) {
      return 'input';
    }

    // 4. Headings
    if (/^h[1-6]$/.test(tag)) {
      return 'heading';
    }

    // 5. Buttons and Action CTA
    if (tag === 'button' || tag === 'a' || el.getAttribute('role') === 'button') {
      return 'button';
    }

    // Computed style based detections
    if (style) {
      // 6. Badges & Pills (small rounded capsules)
      const isPill = style.borderRadius && parseInt(style.borderRadius, 10) >= 12;
      const isSmall = el.clientHeight > 0 && el.clientHeight <= 36;
      const textTrim = (el.textContent || '').trim();
      if ((el.classList.contains('badge') || (isPill && isSmall)) && textTrim.length > 0 && el.children.length <= 1) {
        return 'badge';
      }

      // 7. Dividers
      if (
        el.clientHeight <= 4 &&
        (style.backgroundColor || style.borderTopWidth || style.borderBottomWidth)
      ) {
        return 'divider';
      }

      // 8. Card container (prominent background, border, or shadow with children)
      const hasBg =
        style.backgroundColor &&
        style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
        style.backgroundColor !== 'transparent';
      const hasBorder = style.borderWidth && style.borderWidth !== '0px';
      const hasShadow = style.boxShadow && style.boxShadow !== 'none';
      if ((hasBg || hasBorder || hasShadow) && el.children.length > 0 && el.clientHeight >= 46) {
        return 'card';
      }

      // 9. Heading-like bold text spans
      if (['span', 'div', 'p'].includes(tag) && el.children.length === 0) {
        const isBold = parseInt(style.fontWeight, 10) >= 600 || style.fontWeight === 'bold';
        const isLarge = parseInt(style.fontSize, 10) >= 17;
        if (isBold && isLarge) return 'heading';
      }
    }

    // 10. Leaf text
    if (el.children.length === 0 && (el.textContent || '').trim().length > 0) {
      return 'text';
    }

    return 'container';
  };

  const candidates: Array<{ el: Element; depth: number }> = [];

  const walk = (node: Element, depth: number) => {
    const children = Array.from(node.children);
    for (const child of children) {
      const tag = child.tagName.toLowerCase();
      if (['script', 'style', 'path', 'g', 'noscript', 'circle', 'line', 'rect', 'defs'].includes(tag)) {
        continue;
      }
      if (
        child.hasAttribute('data-swarm-overlay') ||
        child.hasAttribute('data-swarm-ignore') ||
        child.classList.contains('swarm-ignore') ||
        child.closest('[data-swarm-overlay]') ||
        child.closest('[data-swarm-ignore]')
      ) {
        continue;
      }

      candidates.push({ el: child, depth });

      // If it's an SVG, don't walk its inner vector paths
      if (tag !== 'svg') {
        walk(child, depth + 1);
      }
    }
  };

  walk(rootEl, 1);

  for (const { el, depth } of candidates) {
    if (!isElementVisible(el)) continue;

    const tag = el.tagName.toLowerCase();
    const win = el.ownerDocument.defaultView || window;
    const style = el instanceof HTMLElement ? win.getComputedStyle(el) : undefined;
    const type = determineType(el, tag, style);
    const rect = getRelativeRect(el);

    // Filter out huge whole-page wrappers
    if (rect.w >= rootRect.width * 0.98 && rect.h >= rootRect.height * 0.95 && depth <= 2) {
      continue;
    }

    // Skip empty containers with zero background or border
    if (type === 'container' && style) {
      const hasBg =
        style.backgroundColor &&
        style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
        style.backgroundColor !== 'transparent';
      const hasBorder = style.borderWidth && style.borderWidth !== '0px';
      const hasShadow = style.boxShadow && style.boxShadow !== 'none';
      if (!hasBg && !hasBorder && !hasShadow) {
        continue;
      }
    }

    // Extract text content for text-centric nodes
    let text = '';
    if (['heading', 'text', 'badge', 'button'].includes(type)) {
      text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    }

    let imgSrc: string | undefined;
    if (tag === 'img') {
      imgSrc = (el as HTMLImageElement).src;
    } else {
      const childImg = el.querySelector('img');
      if (childImg && el.children.length <= 2) {
        imgSrc = childImg.src;
      }
    }

    const isCenterAligned = style
      ? style.textAlign === 'center' ||
        style.justifyContent === 'center' ||
        Math.abs(rect.x + rect.w / 2 - rootRect.width / 2) < 14
      : false;

    // Tag the real DOM element with classes so CSS masking is 100% reliable
    el.classList.add('swarm-node');
    if (type === 'card' || type === 'container') {
      el.classList.add('swarm-node-container');
    }

    counter += 1;
    const id = el.getAttribute('data-swarm-id') || el.id || `node-${counter}-${tag}`;

    // Priority offset: Cards and Containers are scheduled slightly earlier (-15y)
    // so the container frame is drawn FIRST before the text/icons inside it!
    const containerOffset = (type === 'card' || type === 'container') ? -15 : 0;
    const order = (rect.y + containerOffset) * 1000 + rect.x;

    rawNodes.push({
      id,
      type,
      tagName: tag,
      rect,
      text,
      domElement: el as HTMLElement,
      imgSrc,
      fontFamily: style?.fontFamily,
      fontSize: style?.fontSize,
      fontWeight: style?.fontWeight,
      color: style?.color,
      backgroundColor: style?.backgroundColor,
      borderRadius: style?.borderRadius,
      isCenterAligned,
      depth,
      order,
    });
  }

  // Deduplication: remove transparent wrappers that have identical bounding box to their child
  const cleanNodes: SwarmNode[] = [];
  for (const node of rawNodes) {
    const isRedundantWrapper = rawNodes.some((other) => {
      if (other === node) return false;
      const isNested = other.depth > node.depth;
      const sameBounds =
        Math.abs(other.rect.x - node.rect.x) < 4 &&
        Math.abs(other.rect.y - node.rect.y) < 4 &&
        Math.abs(other.rect.w - node.rect.w) < 8 &&
        Math.abs(other.rect.h - node.rect.h) < 8;

      // Only drop if node is a generic container without distinct card style
      const isCardOrButton = node.type === 'card' || node.type === 'button';
      return isNested && sameBounds && !isCardOrButton;
    });

    if (!isRedundantWrapper) {
      cleanNodes.push(node);
    }
  }

  // Mark the root element as successfully scanned
  rootEl.classList.add('swarm-scanned');

  return cleanNodes.sort((a, b) => a.order - b.order);
}
