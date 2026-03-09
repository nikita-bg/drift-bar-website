#!/bin/bash
echo "🚀 Drift Bar Performance Setup"
echo "================================"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1/3: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: npm install failed"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Step 2: Optimize images
echo "🖼️  Step 2/3: Optimizing images..."
npm run optimize-images

if [ $? -ne 0 ]; then
    echo "❌ Error: Image optimization failed"
    exit 1
fi

echo "✅ Images optimized"
echo ""

# Step 3: Build
echo "🏗️  Step 3/3: Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""
echo "🎉 Performance setup complete!"
echo ""
echo "Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Deploy: git add . && git commit -m 'perf: optimize images and performance' && git push"
echo "3. Check PageSpeed Insights after 5-10 minutes"
