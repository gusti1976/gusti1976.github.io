#!/bin/bash

# Secure script to push website updates to GitHub using Personal Access Token
# This script reads the token from .env file for security

echo "🚀 Pushing website updates to GitHub..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with your GitHub token first."
    exit 1
fi

# Load the GitHub token from .env file
source .env

# Check if token is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN not found in .env file!"
    echo "Please add your GitHub Personal Access Token to .env file."
    exit 1
fi

# Show current status
echo "📋 Current status:"
git status --short

# Push to GitHub using the token
echo "⬆️  Pushing to GitHub..."
git push https://$GITHUB_TOKEN@github.com/gusti1976/gusti1976.github.io.git

# Check if push was successful
if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your website will update at www.gusti.com in 1-10 minutes"
    echo "📝 Changes pushed:"
    git log --oneline -5
else
    echo "❌ Push failed!"
    exit 1
fi