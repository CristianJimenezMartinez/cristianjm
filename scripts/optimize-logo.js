const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const assetsDir = path.resolve(__dirname, '../src/assets');
const masterOriginal = path.join(assetsDir, 'CJ-logo-Sage-Forest-Lime-1024.png');
const currentLogo = path.join(assetsDir, 'CJ-logo-Sage-Forest-Lime.png');

if (!fs.existsSync(masterOriginal)) {
  fs.copyFileSync(currentLogo, masterOriginal);
  console.log('✓ Master 1024x1024 backed up to CJ-logo-Sage-Forest-Lime-1024.png');
}

const psScript = `
Add-Type -AssemblyName System.Drawing
$src = '${masterOriginal.replace(/'/g, "''")}'
$dst = '${currentLogo.replace(/'/g, "''")}'
$bmp = [System.Drawing.Bitmap]::FromFile($src)
$newBmp = New-Object System.Drawing.Bitmap 256, 256, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($newBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.DrawImage($bmp, 0, 0, 256, 256)

$newBmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$newBmp.Dispose()
$g.Dispose()

Write-Output (Get-Item $dst).Length
`;

const tempPsFile = path.resolve(__dirname, 'temp-resize.ps1');
fs.writeFileSync(tempPsFile, psScript, 'utf8');

try {
  const result = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tempPsFile}"`, { encoding: 'utf8' });
  console.log(`✓ Optimized CJ-logo-Sage-Forest-Lime.png size: ${result.trim()} bytes (Original was ~118,000 bytes)`);
} finally {
  if (fs.existsSync(tempPsFile)) fs.unlinkSync(tempPsFile);
}
