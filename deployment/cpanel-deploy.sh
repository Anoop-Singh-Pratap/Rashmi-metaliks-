#!/bin/bash

# Rashmi Metaliks - cPanel Deployment Script
# This script deploys both frontend and backend from the same repository

echo "🚀 Starting Rashmi Metaliks deployment..."
echo "📍 Repository: Single repo with frontend + backend"

# Navigate to project root
cd /home/rashmimetalik/public_html/rashmi-app

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed. Please check your repository connection."
    exit 1
fi

# Install dependencies for both frontend and backend
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed."
    exit 1
fi

# Build both frontend and backend
echo "🏗️ Building frontend and backend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build process failed."
    exit 1
fi

# Deploy frontend (copy built files to public_html)
echo "🌐 Deploying frontend..."
rm -rf /home/rashmimetalik/public_html/assets
rm -rf /home/rashmimetalik/public_html/static
rm -f /home/rashmimetalik/public_html/index.html

cp -r frontend/dist/* /home/rashmimetalik/public_html/

if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed."
    exit 1
fi

# Backend is already in place, just needs restart via cPanel
echo "🔧 Backend files ready for cPanel Node.js restart..."
echo "⚠️  Please restart the Node.js application in cPanel:"
echo "   1. Go to Node.js Selector"
echo "   2. Click 'Restart' on your application"
echo "   3. Check logs for any errors"

# Set proper permissions
echo "🔒 Setting proper file permissions..."
find /home/rashmimetalik/public_html -type f -exec chmod 644 {} \;
find /home/rashmimetalik/public_html -type d -exec chmod 755 {} \;

echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Next Steps:"
echo "   🌐 Frontend: https://rashmimetaliks.com"
echo "   🔧 Backend: Restart Node.js app in cPanel"
echo "   📋 Logs: Check cPanel Node.js logs"
echo "   🔍 Test: Verify all features work"
echo ""
echo "🎉 Your website is updated!" 