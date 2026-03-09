const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Images to optimize
const images = [
    { input: 'logo.png', output: 'logo.webp', quality: 85, maxWidth: 300 },
    { input: 'assets/enhanced_crowd-seating-night-event.png', output: 'assets/enhanced_crowd-seating-night-event.webp', quality: 80, maxWidth: 1200 },
    { input: 'assets/enhanced_live-performance-stage-close.png', output: 'assets/enhanced_live-performance-stage-close.webp', quality: 80, maxWidth: 1200 },
    { input: 'assets/enhanced_lounge-seating-night-lights.png', output: 'assets/enhanced_lounge-seating-night-lights.webp', quality: 80, maxWidth: 1200 },
    { input: 'assets/enhanced_lounge-tables-atmospheric.png', output: 'assets/enhanced_lounge-tables-atmospheric.webp', quality: 80, maxWidth: 1200 },
    { input: 'assets/enhanced_stage-drum-kit-lights.png', output: 'assets/enhanced_stage-drum-kit-lights.webp', quality: 80, maxWidth: 1200 },
];

async function optimizeImage(inputPath, outputPath, quality, maxWidth) {
    const inputFullPath = path.join(publicDir, inputPath);
    const outputFullPath = path.join(publicDir, outputPath);

    if (!fs.existsSync(inputFullPath)) {
        console.log(`⚠️  Skipping ${inputPath} - file not found`);
        return;
    }

    try {
        const inputStats = fs.statSync(inputFullPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        await sharp(inputFullPath)
            .resize(maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality, effort: 6 })
            .toFile(outputFullPath);

        const outputStats = fs.statSync(outputFullPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(2);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${inputPath}`);
        console.log(`   ${inputSizeKB} KB → ${outputSizeKB} KB (${savings}% smaller)\n`);
    } catch (error) {
        console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');

    for (const img of images) {
        await optimizeImage(img.input, img.output, img.quality, img.maxWidth);
    }

    console.log('✨ Image optimization complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Update image paths in app/page.tsx (.png → .webp)');
    console.log('2. Update app/layout.tsx OpenGraph image (.png → .webp)');
    console.log('3. Test with: npm run build && npm run dev');
    console.log('4. Check PageSpeed Insights again\n');
}

main();
