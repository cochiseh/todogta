#!/bin/bash
# ============================================
# GTA 6 Portal - VPS Deployment Script
# Run this on your VPS after cloning the repo
# ============================================

set -e

echo "🚀 Deploying GTA 6 Portal..."

# Navigate to project
cd /var/www/gta6portal

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build production
echo "🔨 Building production..."
npm run build

# Restart PM2
echo "♻️ Restarting PM2 process..."
pm2 restart ecosystem.config.js --update-env || pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

echo "✅ Deployment complete!"
echo "🌐 Site running at http://localhost:3000"
