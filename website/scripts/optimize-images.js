/**
 * Image Optimization Script for Drift Bar Plovdiv
 *
 * This script converts large PNG images to WebP format with compression.
 * Run with: node scripts/optimize-images.js
 *
 * Requirements: npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

// Images to optimize (PNG files larger than 500KB)
const imagesToOptimize = [
    { input: 'enhanced_crowd-seating-night-event.png', output: 'enhanced_crowd-seating-night-event.webp' },
    { input: 'enhanced_live-performance-stage-close.png', output: 'enhanced_live-performance-stage-close.webp' },
    { input: 'enhanced_lounge-seating-night-lights.png', output: 'enhanced_lounge-seating-night-lights.webp' },
    { input: 'enhanced_lounge-tables-atmospheric.png', output: 'enhanced_lounge-tables-atmospheric.webp' },
    { input: 'enhanced_stage-drum-kit-lights.png', output: 'enhanced_stage-drum-kit-lights.webp' },
];

const logoFile = { input: 'logo.png', output: 'logo.webp' };

async function optimizeImage(inputPath, outputPath, quality = 85) {
    try {
        const stats = fs.statSync(inputPath);
        const originalSize = (stats.size / 1024 / 1024).toFixed(2);

        console.log(`📸 Processing: ${path.basename(inputPath)} (${originalSize} MB)`);

        await sharp(inputPath)
            .webp({ quality, effort: 6 })
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSize = (newStats.size / 1024 / 1024).toFixed(2);
        const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        console.log(`   ✅ Saved to: ${path.basename(outputPath)} (${newSize} MB) - ${savings}% smaller\n`);
    } catch (error) {
        console.error(`   ❌ Error processing ${inputPath}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');

    // Check if sharp is installed
    try {
        require.resolve('sharp');
    } catch (e) {
        console.error('❌ Error: sharp is not installed.');
        console.error('   Run: npm install sharp --save-dev');
        process.exit(1);
    }

    // Optimize hero/gallery images
    console.log('🖼️  Optimizing hero and gallery images...\n');
    for (const img of imagesToOptimize) {
        const inputPath = path.join(ASSETS_DIR, img.input);
        const outputPath = path.join(ASSETS_DIR, img.output);

        if (fs.existsSync(inputPath)) {
            await optimizeImage(inputPath, outputPath, 85);
        } else {
            console.log(`⚠️  Skipping ${img.input} (not found)\n`);
        }
    }

    // Optimize logo with higher quality
    console.log('🏷️  Optimizing logo...\n');
    const logoInputPath = path.join(PUBLIC_DIR, logoFile.input);
    const logoOutputPath = path.join(PUBLIC_DIR, logoFile.output);

    if (fs.existsSync(logoInputPath)) {
        await optimizeImage(logoInputPath, logoOutputPath, 90);
    }

    console.log('✨ Image optimization complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update image paths in your code from .png to .webp');
    console.log('   2. Keep .png files as fallback for older browsers');
    console.log('   3. Test the site to ensure all images load correctly');
}

main().catch(console.error);
