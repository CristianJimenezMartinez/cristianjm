/**
 * Script de Procesamiento y Optimización de Vídeo para Scroll World
 * 
 * ¿Por qué es necesario este paso?
 * Los vídeos crudos generados por IA (Kling, MiniMax, Luma, Veo) tienen fotogramas clave (keyframes/GOP)
 * cada 100-250 frames. Si se usan directamente para hacer scroll, el navegador se congela y da tirones.
 * 
 * Este script optimiza los vídeos aplicando:
 * 1. GOP = 6 (un keyframe cada 6 fotogramas para scrub ultra fluido a 60 FPS).
 * 2. Eliminación de pista de audio (-an) para reducir un 30% el peso.
 * 3. Formato web estándar H.264 (yuv420p).
 * 4. Extracción automática del primer fotograma como póster WebP para evitar parpadeos de carga.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.resolve(__dirname, '../raw-videos');
const OUTPUT_VIDEOS_DIR = path.resolve(__dirname, '../public/videos');
const OUTPUT_POSTERS_DIR = path.resolve(__dirname, '../public/photos');

// 1. Verificar si ffmpeg está disponible
function getFfmpegCommand() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return 'ffmpeg';
  } catch (e) {
    // Buscar en ruta común de winget
    const wingetFfmpeg = 'C:\\Users\\Cayse\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe';
    if (fs.existsSync(wingetFfmpeg)) {
      process.env.PATH = `${path.dirname(wingetFfmpeg)};${process.env.PATH}`;
      return `"${wingetFfmpeg}"`;
    }
    return null;
  }
}

async function processAll() {
  console.log('=====================================================');
  console.log(' 🎥 PROCESADOR DE VÍDEOS PARA SCROLL WORLD');
  console.log('=====================================================\n');

  const ffmpegCmd = getFfmpegCommand();
  if (!ffmpegCmd) {
    console.error('❌ ERROR: ffmpeg no está instalado en el sistema.');
    console.log('\n👉 Para instalarlo en Windows en 30 segundos, ejecuta en PowerShell:');
    console.log('   winget install Gyan.FFmpeg\n');
    console.log('(Una vez instalado, reinicia la terminal y vuelve a ejecutar este script).');
    process.exit(1);
  }

  if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_VIDEOS_DIR)) {
    fs.mkdirSync(OUTPUT_VIDEOS_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_POSTERS_DIR)) {
    fs.mkdirSync(OUTPUT_POSTERS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.webm'));

  if (files.length === 0) {
    console.log('ℹ️  No hay vídeos en la carpeta raw-videos/');
    console.log(`📁 Coloca aquí los vídeos crudos generados con IA:\n   ${RAW_DIR}`);
    return;
  }

  console.log(`Encontrados ${files.length} vídeos para optimizar:\n`);

  for (const file of files) {
    const inputPath = path.join(RAW_DIR, file);
    const baseName = path.parse(file).name;
    const outputVideoPath = path.join(OUTPUT_VIDEOS_DIR, `${baseName}.mp4`);
    const outputPosterPath = path.join(OUTPUT_POSTERS_DIR, `${baseName}-poster.webp`);

    console.log(`⏳ Procesando: ${file} ...`);

    // 1. Recodificación de vídeo con GOP 6 y eliminación de marca de agua (delogo)
    const videoCmd = `${ffmpegCmd} -y -i "${inputPath}" -vf "delogo=x=1110:y=665:w=165:h=45" -c:v libx264 -crf 22 -preset medium -g 6 -keyint_min 6 -sc_threshold 0 -an -pix_fmt yuv420p "${outputVideoPath}"`;
    execSync(videoCmd, { stdio: 'inherit' });

    // 2. Extracción de póster inicial
    const posterCmd = `${ffmpegCmd} -y -ss 00:00:00.000 -i "${outputVideoPath}" -vframes 1 -q:v 2 "${outputPosterPath}"`;
    execSync(posterCmd, { stdio: 'inherit' });

    console.log(`  ✓ Vídeo optimizado: public/videos/${baseName}.mp4`);
    console.log(`  ✓ Póster generado:  public/photos/${baseName}-poster.webp\n`);
  }

  console.log('✨ Todos los vídeos han sido procesados y optimizados para Scroll World.');
}

processAll();
