import sharp from 'sharp';

const SRC = 'assets/mascot/chichi-reference.jpg';

function isBg(r, g, b) {
  return r > 232 && g > 232 && b > 232;
}

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

function colDensity(x, y0, y1) {
  let n = 0;
  for (let y = y0; y <= y1; y++) {
    const i = (y * w + x) * 4;
    if (!isBg(data[i], data[i + 1], data[i + 2])) n++;
  }
  return n;
}

function splitFrames(xStart, xEnd, y0, y1, expected) {
  const threshold = 2;
  const minGap = 6;
  const segments = [];
  let inSeg = false;
  let segStart = 0;
  let gap = 0;

  for (let x = xStart; x <= xEnd; x++) {
    const d = colDensity(x, y0, y1);
    if (d > threshold) {
      if (!inSeg) {
        inSeg = true;
        segStart = x;
      }
      gap = 0;
    } else if (inSeg) {
      gap++;
      if (gap >= minGap) {
        inSeg = false;
        const end = x - gap;
        if (end - segStart >= 12) segments.push({ x: segStart, w: end - segStart + 1 });
        gap = 0;
      }
    }
  }
  if (inSeg) {
    const end = xEnd;
    if (end - segStart >= 12) segments.push({ x: segStart, w: end - segStart + 1 });
  }

  if (segments.length === expected) return segments;

  /* Fallback: equal slices across content bbox */
  let minX = xEnd, maxX = xStart;
  for (let x = xStart; x <= xEnd; x++) {
    if (colDensity(x, y0, y1) > threshold) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }
  if (maxX <= minX) return segments;

  const total = maxX - minX + 1;
  const slice = total / expected;
  const out = [];
  for (let i = 0; i < expected; i++) {
    const x = Math.round(minX + i * slice);
    const x2 = Math.round(minX + (i + 1) * slice) - 1;
    out.push({ x, w: x2 - x + 1 });
  }
  return out;
}

const ROWS = [
  { y0: 49, y1: 103, left: ['idle', 5], right: ['walk', 5] },
  { y0: 159, y1: 212, left: ['run', 4], right: ['jump', 3] },
  { y0: 263, y1: 314, left: ['play', 4], right: ['sleep', 3] },
  { y0: 361, y1: 413, left: ['groom', 4], right: ['stretch', 3] },
  { y0: 466, y1: 515, left: ['alert', 4], right: ['sad', 4] },
  { y0: 545, y1: 619, left: ['box', 7], right: ['misc', 4] },
];

const mid = Math.floor(w / 2);
for (const row of ROWS) {
  const left = splitFrames(96, mid - 8, row.y0, row.y1, row.left[1]);
  const right = splitFrames(mid + 8, w - 1, row.y0, row.y1, row.right[1]);
  console.log(`${row.left[0]}/${row.right[0]}: L=${left.length} R=${right.length}`);
  console.log('  L:', left.map((b) => `${b.x}+${b.w}`).join(' | '));
  console.log('  R:', right.map((b) => `${b.x}+${b.w}`).join(' | '));
}
