@echo off
echo 🚀 Drift Bar Performance Setup
echo ================================
echo.

REM Step 1: Install dependencies
echo 📦 Step 1/3: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Error: npm install failed
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Step 2: Optimize images
echo 🖼️  Step 2/3: Optimizing images...
call npm run optimize-images
if %errorlevel% neq 0 (
    echo ❌ Error: Image optimization failed
    exit /b 1
)
echo ✅ Images optimized
echo.

REM Step 3: Build
echo 🏗️  Step 3/3: Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Error: Build failed
    exit /b 1
)
echo ✅ Build successful
echo.

echo 🎉 Performance setup complete!
echo.
echo Next steps:
echo 1. Test locally: npm run dev
echo 2. Deploy: git add . ^&^& git commit -m "perf: optimize images and performance" ^&^& git push
echo 3. Check PageSpeed Insights after 5-10 minutes
