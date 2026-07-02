/**
 * Build individual transparent PNG frames from the reference sheet.
 * Run: node scripts/build-chichi-atlas.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'assets/mascot/chichi-reference.jpg';
const OUT_DIR = 'assets/mascot/cat';
const META_PATH = 'assets/mascot/chichi-atlas.json';
const FRAME = 80;

// xLeft/xRight: first x column with actual cat content (skips row label text)
const ROW_LAYOUT = [
  { y0: 49, y1: 103, xLeft: 113, left: { key: 'idle' }, right: { key: 'walk' } },
  { y0: 159, y1: 212, xLeft: 158, left: { key: 'run' }, right: { key: 'jump' } },
  { y0: 263, y1: 314, xLeft: 148, left: { key: 'play' }, right: { key: 'sleep' } },
  { y0: 361, y1: 413, xLeft: 154, left: { key: 'groom' }, right: { key: 'stretch' } },
  { y0: 466, y1: 515, xLeft: 165, left: { key: 'alert' }, right: { key: 'sad' } },
  { y0: 545, y1: 619, xLeft: 206, xRight: 599, left: { key: 'box' }, right: { key: 'misc' } },
];

const EXTRA_FRAMES = [
  { key: 'wave', row: 0, side: 'left', index: 1 },
  { key: 'read', row: 3, side: 'left', index: 2 },
  { key: 'roll', row: 5, side: 'left', index: 2 },
  { key: 'eat', row: 2, side: 'left', index: 2 },
  { key: 'love', row: 5, side: 'right', index: 2 },
  { key: 'shake', row: 5, side: 'right', index: 0 },
  { key: 'lookup', row: 5, side: 'right', index: 3 },
];

const FRAME_RATES = {
  idle: 4, walk: 9, run: 12, jump: 8, play: 8, sleep: 3, groom: 5,
  stretch: 4, alert: 6, sad: 4, box: 5, misc: 4,
  shake: 6, love: 4, lookup: 4, wave: 4, read: 4, roll: 4, eat: 4,
};

const ONE_SHOT = { jump: true, stretch: true };

function isBg(r, g, b) {
  return r > 232 && g > 232 && b > 232;
}

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: imgW, height: imgH } = info;
const mid = Math.floor(imgW / 2);

function colDensity(x, y0, y1) {
  let n = 0;
  for (let y = y0; y <= y1; y++) {
    const i = (y * imgW + x) * 4;
    if (!isBg(data[i], data[i + 1], data[i + 2])) n++;
  }
  return n;
}

// Returns only segments where the cat is clearly present as a unit.
// No even-split fallback — that caused frames to straddle natural pose boundaries,
// splitting the cat's body into disconnected pieces.
function splitFrames(xStart, xEnd, y0, y1) {
  const threshold = 2;
  const minGap = 8;   // columns of background required to separate two frames
  const minWidth = 30; // minimum column width for a valid frame segment
  const segments = [];
  let inSeg = false;
  let segStart = 0;
  let gap = 0;

  for (let x = xStart; x <= xEnd; x++) {
    const d = colDensity(x, y0, y1);
    if (d > threshold) {
      if (!inSeg) { inSeg = true; segStart = x; }
      gap = 0;
    } else if (inSeg) {
      gap++;
      if (gap >= minGap) {
        inSeg = false;
        const end = x - gap;
        if (end - segStart + 1 >= minWidth) segments.push({ x: segStart, w: end - segStart + 1 });
        gap = 0;
      }
    }
  }
  if (inSeg) {
    const end = xEnd;
    if (end - segStart + 1 >= minWidth) segments.push({ x: segStart, w: end - segStart + 1 });
  }

  return segments;
}

function trimBounds(sx, sy, sw, sh) {
  let minX = sw, minY = sh, maxX = 0, maxY = 0;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const px = sx + x;
      const py = sy + y;
      const i = (py * imgW + px) * 4;
      if (!isBg(data[i], data[i + 1], data[i + 2])) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX) return null;
  return { sx: sx + minX, sy: sy + minY, sw: maxX - minX + 1, sh: maxY - minY + 1 };
}

async function normalizeFrame(rect) {
  const trimmed = trimBounds(rect.sx, rect.sy, rect.sw, rect.sh);
  if (!trimmed) return null;

  const pad = 6;
  const maxW = FRAME - pad * 2;
  const maxH = FRAME - pad * 2;
  const scale = Math.min(maxW / trimmed.sw, maxH / trimmed.sh);
  const dw = Math.max(1, Math.round(trimmed.sw * scale));
  const dh = Math.max(1, Math.round(trimmed.sh * scale));
  const ox = Math.round((FRAME - dw) / 2);
  const oy = Math.round(FRAME - dh - 4);

  const extracted = await sharp(data, { raw: { width: imgW, height: imgH, channels: 4 } })
    .extract({ left: trimmed.sx, top: trimmed.sy, width: trimmed.sw, height: trimmed.sh })
    .resize(dw, dh, { kernel: sharp.kernel.nearest })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const frame = Buffer.alloc(FRAME * FRAME * 4, 0);
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const si = (y * dw + x) * 4;
      const r = extracted[si], g = extracted[si + 1], b = extracted[si + 2];
      if (isBg(r, g, b)) continue;
      const dx = ox + x;
      const dy = oy + y;
      const di = (dy * FRAME + dx) * 4;
      frame[di] = r;
      frame[di + 1] = g;
      frame[di + 2] = b;
      frame[di + 3] = 255;
    }
  }
  return frame;
}

const rowBlobs = ROW_LAYOUT.map((row) => ({
  left: splitFrames(row.xLeft, mid - 8, row.y0, row.y1),
  right: splitFrames(row.xRight || mid + 8, imgW - 1, row.y0, row.y1),
}));

function getRect(rowIndex, side, frameIndex) {
  const row = ROW_LAYOUT[rowIndex];
  const blobs = side === 'left' ? rowBlobs[rowIndex].left : rowBlobs[rowIndex].right;
  const blob = blobs[frameIndex];
  if (!blob) return null;
  return { sx: blob.x, sy: row.y0, sw: blob.w, sh: row.y1 - row.y0 + 1 };
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

async function saveFramePng(buf, animKey, frameNum) {
  const dir = path.join(OUT_DIR, animKey);
  fs.mkdirSync(dir, { recursive: true });
  const file = `${animKey}-${pad2(frameNum)}.png`;
  const outPath = path.join(dir, file);
  await sharp(buf, { raw: { width: FRAME, height: FRAME, channels: 4 } }).png().toFile(outPath);
  return `${animKey}/${file}`;
}

const animations = {};
const animBuffers = {};

for (const row of ROW_LAYOUT) {
  const ri = ROW_LAYOUT.indexOf(row);
  for (const side of ['left', 'right']) {
    const def = side === 'left' ? row.left : row.right;
    const blobs = side === 'left' ? rowBlobs[ri].left : rowBlobs[ri].right;
    const files = [];
    const buffers = [];
    for (let i = 0; i < blobs.length; i++) {
      const rect = getRect(ri, side, i);
      const buf = rect ? await normalizeFrame(rect) : null;
      const fallback = buffers[buffers.length - 1] || animBuffers.idle?.[0] || Buffer.alloc(FRAME * FRAME * 4, 0);
      const finalBuf = buf || fallback;
      buffers.push(finalBuf);
      const rel = await saveFramePng(finalBuf, def.key, i + 1);
      files.push(rel);
    }
    animBuffers[def.key] = buffers;
    animations[def.key] = {
      files,
      frameRate: FRAME_RATES[def.key] || 6,
      loop: !ONE_SHOT[def.key],
    };
  }
}

for (const extra of EXTRA_FRAMES) {
  const rect = getRect(extra.row, extra.side, extra.index);
  const buf = rect ? await normalizeFrame(rect) : animBuffers.idle?.[0];
  const rel = await saveFramePng(buf || Buffer.alloc(FRAME * FRAME * 4, 0), extra.key, 1);
  animations[extra.key] = {
    files: [rel],
    frameRate: FRAME_RATES[extra.key] || 6,
    loop: true,
  };
}

const meta = {
  basePath: 'assets/mascot/cat',
  frameWidth: FRAME,
  frameHeight: FRAME,
  animations,
};

fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));

let totalFiles = 0;
Object.values(animations).forEach((a) => { totalFiles += a.files.length; });
console.log(`Wrote ${totalFiles} frames to ${OUT_DIR}/`);
console.log(`Wrote ${META_PATH}`);
ROW_LAYOUT.forEach((row, i) => {
  console.log(`Row ${i}: ${row.left.key}(${rowBlobs[i].left.length}) | ${row.right.key}(${rowBlobs[i].right.length})`);
});
