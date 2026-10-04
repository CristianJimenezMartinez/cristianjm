const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const assetsDir = path.join(srcDir, 'assets');
const logoPath = path.join(assetsDir, 'CJ-logo-Sage-Forest-Lime.png');

console.log('[favicon-builder] 1. Generating SVG favicon with embedded base64 Data URI...');
if (!fs.existsSync(logoPath)) {
  console.error('[favicon-builder] ERROR: Logo not found at', logoPath);
  process.exit(1);
}

const logoBuffer = fs.readFileSync(logoPath);
const base64Logo = 'data:image/png;base64,' + logoBuffer.toString('base64');

// Notice: Explicit viewBox and both href and xlink:href for maximum browser & legacy compatibility
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- Dark background container for crisp browser tab contrast -->
  <rect width="512" height="512" rx="110" fill="#090d0a"/>
  <!-- Official logo zoomed 2.25x to eliminate margins and maximize mark visibility -->
  <image href="${base64Logo}" xlink:href="${base64Logo}" x="-320" y="-320" width="1152" height="1152" />
</svg>
`;

fs.writeFileSync(path.join(srcDir, 'favicon.svg'), svgContent, 'utf8');
console.log(`[favicon-builder] ✓ src/favicon.svg created (${svgContent.length} chars, UTF-8 clean)`);

console.log('[favicon-builder] 2. Rendering high-quality raster frames via System.Drawing...');

// Temporary directory for rendered PNG frames
const tempDir = path.join(rootDir, '.temp-favicons');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// PowerShell script to render master squircle and resize to all required resolutions
const psScript = `
Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

$srcImg = [System.Drawing.Bitmap]::FromFile("${logoPath.replace(/\\/g, '\\\\')}")
$masterBmp = New-Object System.Drawing.Bitmap 512, 512, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($masterBmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Background squircle #090d0a with rx=110
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#090d0a"))
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$d = 220
$path.AddArc(0, 0, $d, $d, 180, 90)
$path.AddArc(512 - $d, 0, $d, $d, 270, 90)
$path.AddArc(512 - $d, 512 - $d, $d, $d, 0, 90)
$path.AddArc(0, 512 - $d, $d, $d, 90, 90)
$path.CloseFigure()
$g.FillPath($brush, $path)

# Draw mark zoomed
$g.DrawImage($srcImg, -320, -320, 1152, 1152)
$g.Dispose()
$brush.Dispose()
$path.Dispose()
$srcImg.Dispose()

function Save-Resized($master, [int]$targetSize, [string]$outputPath) {
    $targetBmp = New-Object System.Drawing.Bitmap $targetSize, $targetSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $tg = [System.Drawing.Graphics]::FromImage($targetBmp)
    $tg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $tg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $tg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $tg.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $tg.DrawImage($master, 0, 0, $targetSize, $targetSize)
    $tg.Dispose()
    $targetBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $targetBmp.Dispose()
}

$temp = "${tempDir.replace(/\\/g, '\\\\')}"
Save-Resized $masterBmp 256 (Join-Path $temp "icon-256.png")
Save-Resized $masterBmp 180 (Join-Path $temp "icon-180.png")
Save-Resized $masterBmp 128 (Join-Path $temp "icon-128.png")
Save-Resized $masterBmp 64  (Join-Path $temp "icon-64.png")
Save-Resized $masterBmp 48  (Join-Path $temp "icon-48.png")
Save-Resized $masterBmp 32  (Join-Path $temp "icon-32.png")
Save-Resized $masterBmp 16  (Join-Path $temp "icon-16.png")
$masterBmp.Dispose()
`;

const psScriptPath = path.join(tempDir, 'render.ps1');
fs.writeFileSync(psScriptPath, psScript, 'utf8');

execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}"`, { stdio: 'inherit' });

console.log('[favicon-builder] 3. Copying raster assets for Web and Apple devices...');

const icon180 = fs.readFileSync(path.join(tempDir, 'icon-180.png'));
const icon32 = fs.readFileSync(path.join(tempDir, 'icon-32.png'));
const icon16 = fs.readFileSync(path.join(tempDir, 'icon-16.png'));

// apple-touch-icon at root and assets
fs.writeFileSync(path.join(srcDir, 'apple-touch-icon.png'), icon180);
fs.writeFileSync(path.join(assetsDir, 'apple-touch-icon.png'), icon180);

// Crisp raster fallbacks
fs.writeFileSync(path.join(assetsDir, 'favicon-32x32.png'), icon32);
fs.writeFileSync(path.join(assetsDir, 'favicon-16x16.png'), icon16);

console.log('[favicon-builder] 4. Assembling multi-resolution Windows/Browser favicon.ico...');

const sizes = [256, 128, 64, 48, 32, 16];
const frames = sizes.map(sz => ({
  width: sz,
  height: sz,
  buffer: fs.readFileSync(path.join(tempDir, `icon-${sz}.png`))
}));

function buildIco(icoFrames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(icoFrames.length, 4); // count

  const entrySize = 16;
  let offset = 6 + icoFrames.length * entrySize;
  const entries = [];

  for (const frame of icoFrames) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(frame.width >= 256 ? 0 : frame.width, 0);
    entry.writeUInt8(frame.height >= 256 ? 0 : frame.height, 1);
    entry.writeUInt8(0, 2); // colors (0 for 32bpp)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(frame.buffer.length, 8); // image byte size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += frame.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...icoFrames.map(f => f.buffer)]);
}

const icoBuffer = buildIco(frames);
fs.writeFileSync(path.join(srcDir, 'favicon.ico'), icoBuffer);
console.log(`[favicon-builder] ✓ src/favicon.ico created (${icoBuffer.length} bytes, 6 frames: 256, 128, 64, 48, 32, 16)`);

// Cleanup temp files
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {
  // ignore
}

console.log('[favicon-builder] ✨ Favicon generation completed successfully!');
